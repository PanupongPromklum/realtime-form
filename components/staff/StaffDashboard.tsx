"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Patient } from "@/types/patient";
import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";
import Label from "@/components/ui/Labelinput";
import StatusBadge from "@/components/ui/statusbadge";

export default function StaffPage() {

    const [form, setForm] = useState({
        prefix: "",
        first_name: "",
        middle_name: "",
        last_name: "",
        gender: "",
        birth_day: "",
        birth_month: "",
        birth_year: "",
        nationality: "",
        religion: "",
        phone: "",
        email: "",
        address_line: "",
        city: "",
        state: "",
        postal_code: "",
        country: "",
        emergency_name: "",
        emergency_relationship: "",
        emergency_phone: "",
        preferred_language: "",
        status: "",
    });

    const PATIENT_ID = "demo-patient";

    // Fetch data from Supabase in realtime
    useEffect(() => {
        // Realtime subscription
        const channel = supabase
            .channel(`patient-${PATIENT_ID}`)
            .on(
                "postgres_changes",
                {
                    event: "UPDATE",
                    schema: "public",
                    table: "patients",
                    filter: `id=eq.${PATIENT_ID}`,
                },
                (event: any) => {
                    // event.new มีค่า row ใหม่
                    setForm(event.new || {});
                }
            )
            .subscribe();

        // Fetch initial data
        const fetchData = async () => {
            const { data } = await supabase
                .from("patients")
                .select("*")
                .eq("id", PATIENT_ID)
                .single();
            if (data) setForm(data);
        };
        fetchData();

        return () => {
            supabase.removeChannel(channel);
        };
    }, []);


    return (


        <div className="mx-auto max-w-4xl bg-white p-6 rounded-xl shadow-sm space-y-8 text-sm">
            <div className="block sm:flex items-center justify-between ">
                <h1 className="text-2xl font-semibold  ">Staff View</h1>
                <div className="flex gap-2 items-center mt-2 justify-between">Patient Status: <StatusBadge status={form.status} /></div>
            </div>


            {/* Personal Information */}
            <section className="space-y-4">
                <div className="flex gap-2 text-gray-500 items-center ">
                    <p className="whitespace-nowrap">Personal Information</p>
                    <div className="bg-gray-300 h-[1px] w-full"></div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <div>
                        <Label> Prefix </Label>
                        <Select name="prefix" value={form.prefix || ""} disabled>
                            <option value="">Select Prefix</option>
                            <option value="Mr.">Mr.</option>
                            <option value="Mrs.">Mrs.</option>
                            <option value="Ms.">Ms.</option>
                        </Select>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <div>
                        <Label> First Name </Label>
                        <Input value={form.first_name || ""} disabled />
                    </div>
                    <div>
                        <Label> Middle Name </Label>
                        <Input value={form.middle_name || ""} disabled />
                    </div>
                    <div>
                        <Label> Last Name </Label>
                        <Input value={form.last_name || ""} disabled />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div>
                        <Label> Gender </Label>
                        <Select value={form.gender || ""} disabled>
                            <option value="">Select Gender</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                        </Select>
                    </div>
                    <div>
                        <Label> Date of Birth </Label>
                        <div className="grid grid-cols-3 gap-3">
                            <Input value={form.birth_day || ""} disabled placeholder="DD" />
                            <Input value={form.birth_month || ""} disabled placeholder="MM" />
                            <Input value={form.birth_year || ""} disabled placeholder="YYYY" />
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div>
                        <Label> Nationality </Label>
                        <Input value={form.nationality || ""} disabled />
                    </div>
                    <div>
                        <Label> Religion </Label>
                        <Select value={form.religion || ""} disabled>
                            <option value="">Religion</option>
                            <option value="buddhist">Buddhist</option>
                            <option value="christian">Christian</option>
                        </Select>
                    </div>
                </div>
            </section>

            {/* Contact Information */}
            <section className="space-y-3">
                <div className="flex gap-2 text-gray-500 items-center ">
                    <p className="whitespace-nowrap">Contact Information</p>
                    <div className="bg-gray-300 h-[1px] w-full"></div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div>
                        <Label> Phone Number </Label>
                        <Input value={form.phone || ""} disabled />
                    </div>
                    <div>
                        <Label> Email </Label>
                        <Input value={form.email || ""} disabled />
                    </div>
                </div>

                <Label> Address </Label>
                <Input value={form.address_line || ""} disabled />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <Input value={form.city || ""} disabled />
                    <Input value={form.state || ""} disabled />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <Input value={form.postal_code || ""} disabled />
                    <Input value={form.country || ""} disabled />
                </div>

                {/* Emergency Contact */}
                <Label> Emergency Contact </Label>
                <Input value={form.emergency_name || ""} disabled />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <Select value={form.emergency_relationship || ""} disabled>
                        <option value="">Relationship</option>
                        <option value="parent">Parent</option>
                        <option value="spouse">Spouse</option>
                        <option value="friend">Friend</option>
                    </Select>
                    <Input value={form.emergency_phone || ""} disabled />
                </div>
            </section>

            {/* Preferences */}
            <div className="bg-gray-300 h-[1px] w-full"></div>
            <section className="space-y-3">
                <Label> Preferred Language </Label>
                <Select value={form.preferred_language || ""} disabled>
                    <option value="">Preferred Language</option>
                    <option value="english">English</option>
                    <option value="thai">Thai</option>
                </Select>
            </section>
        </div>
    );
}
