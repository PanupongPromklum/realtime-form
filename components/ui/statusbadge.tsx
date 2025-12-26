// StatusBadge.tsx
"use client";

interface StatusBadgeProps {
    status: string;
}

export default function StatusBadge({ status }: StatusBadgeProps) {
    let bgColor = "";
    let text = "";

    switch (status) {
        case "inactrive":
            bgColor = "bg-gray-200 text-gray-800";
            text = "Inactive";
            break;
        case "active":
            bgColor = "bg-yellow-200 text-yellow-700";
            text = "Active";
            break;
        case "submitted":
            bgColor = "bg-green-200 text-green-800";
            text = "Submitted";
            break;
        case "error":
            bgColor = "bg-red-200 text-red-800";
            text = "Error";
            break;
        default:
            bgColor = "bg-gray-100 text-gray-600";
            text = "Inactive";
            break;
    }

    return (
        <div
            className={`${bgColor} inline-block px-3 py-1 rounded-full text-sm font-medium`}
        >
            {text}
        </div>
    );
}
