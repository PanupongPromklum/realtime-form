// PatientForm.tsx
"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import Select from "@/components/ui/Select";
import Label from "@/components/ui/Labelinput";

export default function PatientForm() {
    const [form, setForm] = useState({
        prefix: "Mr.",
        first_name: "",
        middle_name: "",
        last_name: "",
        gender: "male",
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
        country: "Thailand",
        emergency_name: "",
        emergency_relationship: "",
        emergency_phone: "",
        preferred_language: "",
        status: "typing",
    });

    const PATIENT_ID = "demo-patient";

    const handleChange = async (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        const updatedForm = { ...form, [name]: value };
        setForm(updatedForm);

        await supabase.from("patients").upsert({
            id: PATIENT_ID,
            ...updatedForm,
            updated_at: new Date().toISOString(),
        });
    };

    const handleSubmit = async () => {
        await supabase
            .from("patients")
            .update({ status: "submitted" })
            .eq("id", PATIENT_ID);
    };

    return (
        <div className="mx-auto max-w-4xl bg-white p-6 rounded-xl shadow-sm space-y-8 text-sm">
            <h1 className="text-2xl font-semibold ">Patient Information</h1>

            {/* Personal Information */}
            <section className="space-y-4">
                <div className="flex gap-2 text-gray-500 items-center ">
                    <p className="whitespace-nowrap">Personal Information</p>
                    <div className="bg-gray-300 h-[1px] w-full"></div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <div>
                        <Label required> Prefix </Label>
                        <Select name="prefix" value={form.prefix} onChange={handleChange}>
                            <option value="Mr.">Mr.</option>
                            <option value="Mrs.">Mrs.</option>
                            <option value="Ms.">Ms.</option>
                        </Select>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <div>
                        <Label required> First Name </Label>
                        <Input
                            name="first_name"
                            value={form.first_name}
                            placeholder="First Name"
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <Label> Middle Name </Label>
                        <Input
                            name="middle_name"
                            value={form.middle_name}
                            placeholder="Middle Name"
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <Label required> Last Name </Label>
                        <Input
                            name="last_name"
                            value={form.last_name}
                            placeholder="Last Name"
                            onChange={handleChange}
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div>
                        <Label required> Gender </Label>
                        <Select
                            name="gender"
                            value={form.gender}
                            onChange={handleChange}
                        >
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                        </Select>
                    </div>
                    <div>
                        <Label required> Date of Birth </Label>
                        <div className="grid grid-cols-3 gap-3">
                            <Input
                                name="birth_day"
                                value={form.birth_day}
                                placeholder="DD"
                                onChange={handleChange}
                            />
                            <Input
                                name="birth_month"
                                value={form.birth_month}
                                placeholder="MM"
                                onChange={handleChange}
                            />
                            <Input
                                name="birth_year"
                                value={form.birth_year}
                                placeholder="YYYY"
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div>
                        <Label required> Nationality </Label>
                        <Input
                            name="nationality"
                            value={form.nationality}
                            placeholder="Nationality"
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <Label> Religion </Label>
                        <Select
                            name="religion"
                            value={form.religion}
                            onChange={handleChange}
                        >
                            <option value="">Religion</option>
                            <option value="buddhist">Buddhist</option>
                            <option value="christian">Christian</option>
                        </Select>
                    </div>
                </div>
            </section>

            {/* Contact */}
            <section className="space-y-3">
                <div className="flex gap-2 text-gray-500 items-center ">
                    <p className="whitespace-nowrap">Contact Information</p>
                    <div className="bg-gray-300 h-[1px] w-full"></div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div>
                        <Label required> Phone Number </Label>
                        <Input
                            name="phone"
                            value={form.phone}
                            placeholder="Phone Number"
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <Label required> Email </Label>
                        <Input
                            name="email"
                            value={form.email}
                            placeholder="a@example.com"
                            onChange={handleChange}
                        />
                    </div>
                </div>

                <Label required> Address </Label>
                <Input
                    name="address_line"
                    value={form.address_line}
                    placeholder="Address Line"
                    onChange={handleChange}
                />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <Input
                        name="city"
                        value={form.city}
                        placeholder="City"
                        onChange={handleChange}
                    />
                    <Input
                        name="state"
                        value={form.state}
                        placeholder="State / Province"
                        onChange={handleChange}
                    />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <Input
                        name="postal_code"
                        value={form.postal_code}
                        placeholder="Postal Code"
                        onChange={handleChange}
                    />
                    <Input
                        name="country"
                        value={form.country}
                        placeholder="Country"
                        onChange={handleChange}
                    />
                </div>

                {/* Emergency Contact */}
                <Label> Emergency Contact </Label>
                <Input
                    name="emergency_name"
                    value={form.emergency_name}
                    placeholder="Contact Name"
                    onChange={handleChange}
                />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <Select
                        name="emergency_relationship"
                        value={form.emergency_relationship}
                        onChange={handleChange}
                    >
                        <option value="">Relationship</option>
                        <option value="parent">Parent</option>
                        <option value="spouse">Spouse</option>
                        <option value="friend">Friend</option>
                    </Select>
                    <Input
                        name="emergency_phone"
                        value={form.emergency_phone}
                        placeholder="Emergency Phone"
                        onChange={handleChange}
                    />
                </div>
            </section>

            {/* Preferences */}
            <div className="bg-gray-300 h-[1px] w-full"></div>
            <section className="space-y-3">
                <Label required> Preferred Language </Label>
                <Select
                    name="preferred_language"
                    value={form.preferred_language}
                    onChange={handleChange}
                >
                    <option value="">Preferred Language</option>
                    <option value="english">English</option>
                    <option value="thai">Thai</option>
                </Select>
            </section>

            <Button onClick={handleSubmit} className="w-full">
                Submit
            </Button>
        </div>
    );
}
