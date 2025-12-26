"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import StatusBadge from "@/components/ui/statusbadge";
import FieldDisplay from "@/components/ui/Fielddisplay";
import SectionTitle from "@/components/ui/SectionTitle";


export default function StaffPage() {
    const [form, setForm] = useState<any>({});

    const PATIENT_ID = "demo-patient"; // ใช้ค่าเดียวกับใน PatientForm.tsx (สำหรับ demo)

    useEffect(() => {
        const channel = supabase
            .channel(`patient-${PATIENT_ID}`)
            .on(
                "postgres_changes",
                {
                    event: "*",
                    schema: "public",
                    table: "patients",
                    filter: `id=eq.${PATIENT_ID}`,
                },
                (payload: any) => {
                    if (payload.eventType === "DELETE") {
                        // patient ปิดหน้าให้ล้างข้อมูล
                        setForm({});
                    } else {
                        // INSERT / UPDATE
                        setForm(payload.new || {});
                    }
                }
            )
            .subscribe();

        const fetchData = async () => {
            const { data } = await supabase
                .from("patients")
                .select("*")
                .eq("id", PATIENT_ID)
                .maybeSingle();

            setForm(data || {});
        };

        fetchData();

        return () => {
            supabase.removeChannel(channel);
        };
    }, []);

    return (
        <div className="mx-auto max-w-4xl bg-white p-6 rounded-xl shadow-sm space-y-10 text-sm">

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                <h1 className="text-2xl font-semibold">Staff View</h1>
                <div className="flex items-center gap-2">
                    <span className="text-gray-500 text-sm">Patient Status</span>
                    <StatusBadge status={form.status} />
                </div>
            </div>

            {/* Personal Information */}
            <section className="space-y-4">
                <SectionTitle title="Personal Information" />

                <div className="grid grid-cols-1 md:grid-cols-7 gap-4">
                    <div className="md:col-span-1">
                        <FieldDisplay label="Prefix" value={form.prefix} />
                    </div>

                    <div className="md:col-span-2">
                        <FieldDisplay label="First Name" value={form.first_name} />
                    </div>

                    <div className="md:col-span-2">
                        <FieldDisplay label="Middle Name" value={form.middle_name} />
                    </div>

                    <div className="md:col-span-2">
                        <FieldDisplay label="Last Name" value={form.last_name} />
                    </div>
                </div>


                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FieldDisplay label="Gender" value={form.gender} />
                    <FieldDisplay
                        label="Date of Birth"
                        value={`${form.birth_day || ""}/${form.birth_month || ""}/${form.birth_year || ""}`}
                    />
                    <FieldDisplay label="Nationality" value={form.nationality} />
                    <FieldDisplay label="Religion" value={form.religion} />
                </div>
            </section>

            {/* Contact Information */}
            <section className="space-y-4">
                <SectionTitle title="Contact Information" />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FieldDisplay label="Phone Number" value={form.phone} />
                    <FieldDisplay label="Email" value={form.email} />
                </div>

                <FieldDisplay label="Address" value={form.address_line} />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FieldDisplay label="City" value={form.city} />
                    <FieldDisplay label="State" value={form.state} />
                    <FieldDisplay label="Postal Code" value={form.postal_code} />
                    <FieldDisplay label="Country" value={form.country} />
                </div>
            </section>

            {/* Emergency Contact */}
            <section className="space-y-4">
                <SectionTitle title="Emergency Contact" />

                <FieldDisplay label="Contact Name" value={form.emergency_name} />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FieldDisplay
                        label="Relationship"
                        value={form.emergency_relationship}
                    />
                    <FieldDisplay
                        label="Phone Number"
                        value={form.emergency_phone}
                    />
                </div>
            </section>

            {/* Preferences */}

            <section className="space-y-4">
                <div className="bg-gray-300 h-[1px] w-full"></div>
                <FieldDisplay
                    label="Preferred Language"
                    value={form.preferred_language}
                />
            </section>
        </div>
    );
}
