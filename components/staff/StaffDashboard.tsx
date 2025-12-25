"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Patient } from "@/types/patient";

export default function StaffPage() {
    const [patient, setPatient] = useState<Patient | null>(null);

    useEffect(() => {
        const channel = supabase
            .channel("realtime-patient")
            .on(
                "postgres_changes",
                {
                    event: "*",
                    schema: "public",
                    table: "patients",
                },
                (payload) => {
                    setPatient(payload.new as Patient);
                }
            )
            .subscribe();

        return () => {
            supabase.removeChannel(channel);
        };
    }, []);

    if (!patient) return <p className="p-6">Waiting for patient data...</p>;

    return (
        <div className="p-6 space-y-4">
            <h1 className="text-2xl font-bold">Staff View - Patient Details</h1>

            <section className="space-y-2">
                <h2 className="font-semibold">Personal Information</h2>
                <p>Prefix: {patient.prefix || "-"}</p>
                <p>First Name: {patient.first_name || "-"}</p>
                <p>Middle Name: {patient.middle_name || "-"}</p>
                <p>Last Name: {patient.last_name || "-"}</p>
                <p>Gender: {patient.gender || "-"}</p>
                <p>Date of Birth: {patient.birth_day}/{patient.birth_month}/{patient.birth_year}</p>
                <p>Nationality: {patient.nationality || "-"}</p>
                <p>Religion: {patient.religion || "-"}</p>
            </section>

            <section className="space-y-2">
                <h2 className="font-semibold">Contact Information</h2>
                <p>Phone: {patient.phone || "-"}</p>
                <p>Email: {patient.email || "-"}</p>
                <p>Address: {patient.address_line || "-"}, {patient.city || "-"}, {patient.state || "-"}, {patient.postal_code || "-"}, {patient.country || "-"}</p>
            </section>

            <section className="space-y-2">
                <h2 className="font-semibold">Emergency Contact</h2>
                <p>Name: {patient.emergency_name || "-"}</p>
                <p>Relationship: {patient.emergency_relationship || "-"}</p>
                <p>Phone: {patient.emergency_phone || "-"}</p>
            </section>

            <section className="space-y-2">
                <h2 className="font-semibold">Preferences</h2>
                <p>Preferred Language: {patient.preferred_language || "-"}</p>
            </section>

            <section className="space-y-2">
                <h2 className="font-semibold">Status</h2>
                <p>{patient.status}</p>
            </section>
        </div>
    );
}
