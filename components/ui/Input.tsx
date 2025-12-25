"use client";

import React from "react";

type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

export default function Input({ className = "", ...props }: InputProps) {
    return (
        <input
            {...props}
            className={`
                text-[16px]
                w-full
                px-4 py-2
                rounded-lg
                border border-blue-200
                bg-white
                text-gray-800
                placeholder-gray-400
                focus:outline-none
                focus:ring-2
                focus:ring-blue-400
                focus:border-blue-400
                transition
                ${className}
            `}
        />
    );
}
