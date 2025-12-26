"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import Select from "@/components/ui/Select";
import Label from "@/components/ui/Labelinput";
import SectionTitle from "@/components/ui/SectionTitle";
import Toast from "@/components/ui/Toast";

import { validatePatientForm } from "@/utils/validation";

const PATIENT_ID = "demo-patient"; // ใช้ค่าเดียวกับใน StaffDashboard.tsx (สำหรับ demo)

export default function PatientForm() {

    // Success Toast State
    const [showSuccess, setShowSuccess] = useState(false);
    const [isDirty, setIsDirty] = useState(false); // ใช้เช็คว่ามีการแก้ไขหลัง submit

    // Error State (Validation)
    const [errors, setErrors] = useState<Record<string, string>>({});

    //Form State เก็บข้อมูล patient ทั้งหมด
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
        status: "inactive",
    });

    // ล้างข้อมูลเมื่อปิดหน้า
    useEffect(() => {
        const clearPatientData = async () => {
            await supabase
                .from("patients")
                .delete()
                .eq("id", PATIENT_ID);
        };

        const handleBeforeUnload = () => {
            clearPatientData();
        };

        window.addEventListener("beforeunload", handleBeforeUnload);

        return () => {
            handleBeforeUnload();
            window.removeEventListener("beforeunload", handleBeforeUnload);
        };
    }, []);



    // เช็ค event การเปลี่ยนแปลง input ทุกตัว
    const handleChange = async (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;

        const updatedForm = { ...form, [name]: value };

        const hasValue = Object.entries(updatedForm).some(
            ([key, val]) => key !== "status" && String(val).trim() !== ""
        );

        updatedForm.status = hasValue ? "active" : "inactive";

        setForm(updatedForm);
        setIsDirty(true);

        // 👇 ลบ error ของ field ที่กำลังแก้
        setErrors(prev => {
            if (!prev[name]) return prev;
            const newErrors = { ...prev };
            delete newErrors[name];
            return newErrors;
        });

        await supabase.from("patients").upsert({
            id: PATIENT_ID,
            ...updatedForm,
            updated_at: new Date().toISOString(),
        });
    };


    // เช็ค Validation และ Submit ข้อมูล

    const handleSubmit = async () => {
        const { valid, errors: validationErrors } = validatePatientForm(form);

        if (!valid) {
            setErrors(validationErrors);
            return;
        }

        setErrors({});

        await supabase
            .from("patients")
            .update({
                ...form,
                status: "submitted",
                updated_at: new Date().toISOString(),
            })
            .eq("id", PATIENT_ID);

        setForm(prev => ({ ...prev, status: "submitted" }));
        setIsDirty(false);        // reset dirty
        setShowSuccess(true);     // แสดง popup
    };


    // error style ไม่แยกเพราะใช้หน้าเดียว
    const inputClass = (field: string) =>
        errors[field] ? "border-red-500" : "";

    return (
        <div className="mx-auto max-w-4xl bg-white p-6 rounded-xl shadow-sm space-y-8 text-sm">
            <h1 className="text-2xl font-semibold">Patient Information</h1>

            {/* Personal Information */}
            <section className="space-y-4">
                <SectionTitle title="Personal Information" />
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <div>
                        <Label required> Prefix </Label>
                        <Select
                            name="prefix"
                            value={form.prefix}
                            onChange={handleChange}
                            className={inputClass("prefix")}
                        >
                            <option value="">Prefix</option>
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
                            <option value="">Gender</option>
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

                <SectionTitle title="Contact Information" />
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
                        <Label > Email </Label>
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
            </section>

            {/* Emergency Contact */}
            <section className="space-y-3">
                <SectionTitle title="Emergency Contact" />
                <div>
                    <Label> Contact Name </Label>
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
                        <Label> Relationship </Label>
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
                        <Label> Phone Number</Label>
                        <Input
                            name="emergency_phone"
                            value={form.emergency_phone}
                            placeholder="Phone Number"
                            onChange={handleChange}
                            className={inputClass("emergency_phone")}
                        />
                        {errors.emergency_phone && (
                            <p className="text-red-500 text-xs mt-1">{errors.emergency_phone}</p>
                        )}
                    </div>

                </div>
            </section>

            {/* Preferred Language */}
            <div className="bg-gray-300 h-[1px] w-full"></div>
            <section className="space-y-3">
                <Label required> Preferred Language </Label>
                <div>
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
                </div>

            </section>


            {/* แจ้งเตือนว่าส่งสำเร็จ */}
            <Toast
                show={showSuccess}
                onClose={() => setShowSuccess(false)}
            />

            <Button
                onClick={handleSubmit}
                className="w-full"
                disabled={form.status === "submitted" && !isDirty}
            >
                {form.status === "submitted" && !isDirty ? "Submitted" : "Submit"}
            </Button>



        </div>
    );
}
