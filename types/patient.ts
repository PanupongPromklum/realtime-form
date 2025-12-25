export type Patient = {

    prefix: string;
    first_name: string;
    middle_name: string;
    last_name: string;
    gender: string;

    birth_day: string;
    birth_month: string;
    birth_year: string;

    nationality: string;
    religion: string;

    phone: string;
    email: string;

    address_line: string;
    city: string;
    state: string;
    postal_code: string;
    country: string;

    emergency_name: string;
    emergency_relationship: string;
    emergency_phone: string;

    preferred_language: string;
    status: "typing" | "inactive" | "submitted";
};
