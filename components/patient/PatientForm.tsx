// PatientForm.tsx
"use client";


import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { Patient } from "@/types/patient";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import Select from "@/components/ui/Select";
import Label from "@/components/ui/Labelinput";
import { validatePatientForm, PatientFormType } from "@/utils/validation";

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
        status: "inactive",
    });

    const PATIENT_ID = "demo-patient";

    const [errors, setErrors] = useState<Record<string, string>>({}); // เก็บข้อความ error

    const handleChange = async (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        const updatedForm = { ...form, [name]: value };

        // ตรวจสอบว่า form มีค่ากรอกหรือไม่
        const hasValue = Object.entries(updatedForm).some(
            ([key, val]) =>
                key !== "status" && val !== "" && val !== null && val !== undefined
        );
        updatedForm.status = hasValue ? "active" : "inactive";

        setForm(updatedForm);

        await supabase.from("patients").upsert({
            id: PATIENT_ID,
            ...updatedForm,
            updated_at: new Date().toISOString(),
        });
    };


    useEffect(() => {
        const setActive = async (active: boolean) => {
            setForm(prev => {
                if (prev.status === "submitted") return prev;
                return { ...prev, status: active ? "active" : "inactive" };
            });

            if (form.status !== "submitted") {
                await supabase
                    .from("patients")
                    .update({ status: active ? "active" : "inactive" })
                    .eq("id", PATIENT_ID);
            }
        };

        const handleVisibilityChange = () => {
            if (document.visibilityState === "visible") {
                setActive(true);
            } else if (document.visibilityState === "hidden") {
                // ใช้ sendBeacon แทน async เพื่อให้ browser ปิด tab ได้ทัน
                const url = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/patients?id=eq.${PATIENT_ID}`;
                const payload = JSON.stringify({ status: "inactive" });
                navigator.sendBeacon(url, payload);

                setActive(false); // update local state
            }
        };

        document.addEventListener("visibilitychange", handleVisibilityChange);

        // set initial
        setActive(document.visibilityState === "visible");

        return () => {
            document.removeEventListener("visibilitychange", handleVisibilityChange);
            setActive(false);
        };
    }, []);

    const handleSubmit = async () => {
        const { valid, errors: validationErrors } = validatePatientForm(form);

        if (!valid) {
            setErrors(validationErrors); // แสดง error บน UI
            return;
        }

        setErrors({}); // เคลียร์ error

        await supabase
            .from("patients")
            .update({ ...form, status: "submitted" })
            .eq("id", PATIENT_ID);

        setForm(prev => ({ ...prev, status: "submitted" }));
    };

    const inputClass = (field: string) =>
        errors[field] ? "border-red-500" : "";

    return (
        <div className="mx-auto max-w-4xl bg-white p-6 rounded-xl shadow-sm space-y-8 text-sm">
            <h1 className="text-2xl font-semibold">Patient Information</h1>

            {/* Personal Information */}
            <section className="space-y-4">
                <div className="flex gap-2 text-gray-500 items-center">
                    <p className="whitespace-nowrap">Personal Information</p>
                    <div className="bg-gray-300 h-[1px] w-full"></div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <div>
                        <Label required> Prefix </Label>
                        <Select
                            name="prefix"
                            value={form.prefix}
                            onChange={handleChange}
                            className={inputClass("prefix")}
                        >
                            <option value="Mr.">Mr.</option>
                            <option value="Mrs.">Mrs.</option>
                            <option value="Ms.">Ms.</option>
                        </Select>
                        {errors.prefix && (
                            <p className="text-red-500 text-xs mt-1">{errors.prefix}</p>
                        )}
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
                            className={inputClass("first_name")}
                        />
                        {errors.first_name && (
                            <p className="text-red-500 text-xs mt-1">{errors.first_name}</p>
                        )}
                    </div>

                    <div>
                        <Label> Middle Name </Label>
                        <Input
                            name="middle_name"
                            value={form.middle_name}
                            placeholder="Middle Name"
                            onChange={handleChange}
                            className={inputClass("middle_name")}
                        />
                        {errors.middle_name && (
                            <p className="text-red-500 text-xs mt-1">{errors.middle_name}</p>
                        )}
                    </div>

                    <div>
                        <Label required> Last Name </Label>
                        <Input
                            name="last_name"
                            value={form.last_name}
                            placeholder="Last Name"
                            onChange={handleChange}
                            className={inputClass("last_name")}
                        />
                        {errors.last_name && (
                            <p className="text-red-500 text-xs mt-1">{errors.last_name}</p>
                        )}
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div>
                        <Label required> Gender </Label>
                        <Select
                            name="gender"
                            value={form.gender}
                            onChange={handleChange}
                            className={inputClass("gender")}
                        >
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                        </Select>
                        {errors.gender && (
                            <p className="text-red-500 text-xs mt-1">{errors.gender}</p>
                        )}
                    </div>

                    <div>
                        <Label required> Date of Birth </Label>
                        <div className="grid grid-cols-3 gap-3">
                            <div>
                                <Input
                                    name="birth_day"
                                    maxLength={2}
                                    value={form.birth_day}
                                    placeholder="DD"
                                    onChange={handleChange}
                                    className={inputClass("birth_day")}
                                />
                                {(errors.birth_day) && (
                                    <p className="text-red-500 text-xs mt-1">
                                        {errors.birth_day}
                                    </p>
                                )}
                            </div>
                            <div>
                                <Input
                                    name="birth_month"
                                    maxLength={2}
                                    value={form.birth_month}
                                    placeholder="MM"
                                    onChange={handleChange}
                                    className={inputClass("birth_month")}
                                />
                                {(errors.birth_month) && (
                                    <p className="text-red-500 text-xs mt-1">
                                        {errors.birth_month}
                                    </p>
                                )}
                            </div>
                            <div>
                                <Input
                                    name="birth_year"
                                    maxLength={4}
                                    value={form.birth_year}
                                    placeholder="YYYY"
                                    onChange={handleChange}
                                    className={inputClass("birth_year")}
                                />
                                {(errors.birth_year) && (
                                    <p className="text-red-500 text-xs mt-1">
                                        {errors.birth_year}
                                    </p>
                                )}
                            </div>
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
                            className={inputClass("nationality")}
                        />
                        {errors.nationality && (
                            <p className="text-red-500 text-xs mt-1">{errors.nationality}</p>
                        )}
                    </div>

                    <div>
                        <Label> Religion </Label>
                        <Select
                            name="religion"
                            value={form.religion}
                            onChange={handleChange}
                            className={inputClass("religion")}
                        >
                            <option value="">Religion</option>
                            <option value="buddhist">Buddhist</option>
                            <option value="christian">Christian</option>
                        </Select>
                        {errors.religion && (
                            <p className="text-red-500 text-xs mt-1">{errors.religion}</p>
                        )}
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
                            maxLength={10}
                            value={form.phone}
                            placeholder="Phone Number"
                            onChange={handleChange}
                            className={inputClass("phone")}
                        />
                        {errors.phone && (
                            <p className="text-red-500 text-xs mt-1">{errors.phone}</p>
                        )}
                    </div>

                    <div>
                        <Label required> Email </Label>
                        <Input
                            name="email"
                            value={form.email}
                            placeholder="a@example.com"
                            onChange={handleChange}
                            className={inputClass("email")}
                        />
                        {errors.email && (
                            <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                        )}
                    </div>
                </div>
                <div className="space-y-3">
                    <Label required> Address </Label>
                    <div>

                        <Input
                            name="address_line"
                            value={form.address_line}
                            placeholder="Address Line"
                            onChange={handleChange}
                            className={inputClass("address_line")}
                        />
                        {errors.address_line && (
                            <p className="text-red-500 text-xs mt-1">{errors.address_line}</p>
                        )}
                    </div>


                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">

                        <div>
                            <Input
                                name="city"
                                value={form.city}
                                placeholder="City"
                                onChange={handleChange}
                                className={inputClass("city")}
                            />
                            {errors.city && (
                                <p className="text-red-500 text-xs mt-1">{errors.city}</p>
                            )}
                        </div>

                        <div>
                            <Input
                                name="state"
                                value={form.state}
                                placeholder="State / Province"
                                onChange={handleChange}
                                className={inputClass("state")}
                            />
                            {errors.state && (
                                <p className="text-red-500 text-xs mt-1">{errors.state}</p>
                            )}
                        </div>

                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div>
                            <Input
                                name="postal_code"
                                maxLength={5}
                                value={form.postal_code}
                                placeholder="Postal Code"
                                onChange={handleChange}
                                className={inputClass("postal_code")}
                            />
                            {errors.postal_code && (
                                <p className="text-red-500 text-xs mt-1">{errors.postal_code}</p>
                            )}
                        </div>

                        <div>
                            <Input
                                name="country"
                                value={form.country}
                                placeholder="Country"
                                onChange={handleChange}
                                className={inputClass("country")}
                            />
                            {errors.country && (
                                <p className="text-red-500 text-xs mt-1">{errors.country}</p>
                            )}
                        </div>

                    </div>
                </div>

                {/* Emergency Contact */}
                <Label> Emergency Contact </Label>
                <div>
                    <Input
                        name="emergency_name"
                        value={form.emergency_name}
                        placeholder="Contact Name"
                        onChange={handleChange}
                        className={inputClass("emergency_name")}
                    />
                    {errors.emergency_name && (
                        <p className="text-red-500 text-xs mt-1">{errors.emergency_name}</p>
                    )}
                </div>


                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div>
                        <Select
                            name="emergency_relationship"
                            value={form.emergency_relationship}
                            onChange={handleChange}
                            className={inputClass("emergency_relationship")}
                        >
                            <option value="">Relationship</option>
                            <option value="parent">Parent</option>
                            <option value="spouse">Spouse</option>
                            <option value="friend">Friend</option>
                        </Select>
                        {errors.emergency_relationship && (
                            <p className="text-red-500 text-xs mt-1">{errors.emergency_relationship}</p>
                        )}
                    </div>

                    <div>
                        <Input
                            name="emergency_phone"
                            value={form.emergency_phone}
                            placeholder="Emergency Phone"
                            onChange={handleChange}
                            className={inputClass("emergency_phone")}
                        />
                        {errors.emergency_phone && (
                            <p className="text-red-500 text-xs mt-1">{errors.emergency_phone}</p>
                        )}
                    </div>

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
                    className={inputClass("preferred_language")}
                >
                    <option value="">Preferred Language</option>
                    <option value="english">English</option>
                    <option value="thai">Thai</option>
                </Select>
                {errors.preferred_language && (
                    <p className="text-red-500 text-xs mt-1">{errors.preferred_language}</p>
                )}
            </section>

            <Button onClick={handleSubmit} className="w-full">
                Submit
            </Button>
        </div>
    );
}
