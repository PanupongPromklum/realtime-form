import { SelectHTMLAttributes } from "react";
import { FaAngleDown } from "react-icons/fa6";

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
    className?: string;
}

export default function Select({ className = "", children, ...props }: SelectProps) {
    return (
        <div className="relative">
            <select
                {...props}
                className={`
                appearance-none
                text-[16px]
                w-full
                px-4 py-2
                pr-10
                rounded-lg
                border border-blue-200
                bg-white
                text-gray-800
                focus:outline-none
                focus:ring-2
                focus:ring-blue-400
                transition
                ${className}
            `}
            >
                {children}
            </select>

            <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                <FaAngleDown />
            </span>
        </div>
    );
}
