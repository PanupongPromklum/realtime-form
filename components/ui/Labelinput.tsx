import { ReactNode } from "react";

interface LabelProps {
    children: ReactNode;
    required?: boolean;
    optional?: boolean;
    className?: string;
    htmlFor?: string;
}

export default function Labelinput({
    children,
    required,
    optional,
    className = "",
    htmlFor,
}: LabelProps) {
    return (
        <label
            htmlFor={htmlFor}
            className={`block text-sm font-medium text-gray-700 mb-1 ${className}`}
        >
            <span className="flex items-center gap-1">
                {children}

                {required && (
                    <span className="text-red-500">*</span>
                )}
            </span>
        </label>
    );
}
