// import { Patient } from "@/types/patient";
export interface PatientFormType {
    prefix: string;
    first_name: string;
    middle_name?: string;
    last_name: string;
    gender: string;
    birth_day: string;
    birth_month: string;
    birth_year: string;
    nationality: string;
    religion?: string;
    phone: string;
    email: string;
    address_line: string;
    city: string;
    state: string;
    postal_code: string;
    country: string;
    emergency_name?: string;
    emergency_relationship?: string;
    emergency_phone?: string;
    preferred_language: string;
    status: string;
}

export interface ValidationResult {
    valid: boolean;
    errors: { [key in keyof Partial<PatientFormType>]: string };
}

export function validatePatientForm(form: PatientFormType): ValidationResult {
    const errors: ValidationResult["errors"] = {};
    const currentYear = new Date().getFullYear();


    if (!form.prefix) errors.prefix = "Prefix is required";

    if (!form.first_name) errors.first_name = "First name is required";
    else if (!/^[A-Za-z]+$/.test(form.first_name))
        errors.first_name = "First name must contain only letters";

    if (form.middle_name && !/^[A-Za-z]+$/.test(form.middle_name))
        errors.middle_name = "Middle name must contain only letters";

    if (!form.last_name) errors.last_name = "Last name is required";
    else if (!/^[A-Za-z]+$/.test(form.last_name))
        errors.last_name = "Last name must contain only letters";

    if (!form.gender) errors.gender = "Gender is required";

    // Birth date
    const day = parseInt(form.birth_day);
    const month = parseInt(form.birth_month);
    const year = parseInt(form.birth_year);

    if (!form.birth_day || !/^\d{1,2}$/.test(form.birth_day) || day < 1 || day > 31)
        errors.birth_day = "Invalid day (1-31)";

    if (!form.birth_month || !/^\d{1,2}$/.test(form.birth_month) || month < 1 || month > 12)
        errors.birth_month = "Invalid month (1-12)";

    if (!form.birth_year || !/^\d{4}$/.test(form.birth_year) || year > currentYear)
        errors.birth_year = `Invalid year (up to ${currentYear})`;

    // Check if date exists in calendar
    if (!errors.birth_day && !errors.birth_month && !errors.birth_year) {
        const birthDate = new Date(year, month - 1, day);
        if (
            birthDate.getFullYear() !== year ||
            birthDate.getMonth() + 1 !== month ||
            birthDate.getDate() !== day
        ) {
            errors.birth_day = "Invalid date";
        }
    }

    // Nationality
    if (!form.nationality) errors.nationality = "Nationality is required";
    else if (!/^[A-Za-z ]+$/.test(form.nationality))
        errors.nationality = "Nationality must contain only letters";

    // Phone
    if (!form.phone) errors.phone = "Phone number is required";
    else if (!/^\d+$/.test(form.phone)) errors.phone = "Phone number must contain only digits";

    // Email
    if (form.email && !/\S+@\S+\.\S+/.test(form.email)) errors.email = "Invalid email";

    // Address
    if (!form.address_line) errors.address_line = "Address is required";

    // City / State / Postal / Country
    if (!form.city) errors.city = "City is required";
    else if (!/^[A-Za-z ]+$/.test(form.city)) errors.city = "City must contain only letters";

    if (!form.state) errors.state = "State is required";
    else if (!/^[A-Za-z ]+$/.test(form.state)) errors.state = "State must contain only letters";

    if (!form.postal_code) errors.postal_code = "Postal code is required";
    else if (!/^\d+$/.test(form.postal_code)) errors.postal_code = "Postal code must contain only digits";

    if (!form.country) errors.country = "Country is required";
    else if (!/^[A-Za-z ]+$/.test(form.country)) errors.country = "Country must contain only letters";

    // Preferred language
    if (!form.preferred_language)
        errors.preferred_language = "Preferred language is required";

    // Emergency contact validation (all or none)
    const emergencyFilled =
        form.emergency_name || form.emergency_relationship || form.emergency_phone;

    if (emergencyFilled) {
        if (!form.emergency_name)
            errors.emergency_name = "Emergency name is required";
        else if (!/^[A-Za-z ]+$/.test(form.emergency_name))
            errors.emergency_name = "Emergency name must contain only letters";

        if (!form.emergency_relationship)
            errors.emergency_relationship = "Relationship is required";

        if (!form.emergency_phone)
            errors.emergency_phone = "Emergency phone is required";
        else if (!/^\d+$/.test(form.emergency_phone))
            errors.emergency_phone = "Emergency phone must contain only digits";
    }

    return {
        valid: Object.keys(errors).length === 0,
        errors,
    };
}
