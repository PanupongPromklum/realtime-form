"use client";

import React from "react";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

export default function Button({ className = "", ...props }: ButtonProps) {
    return (
        <button
            {...props}
            className={`
                w-full
                bg-blue-500
                hover:bg-blue-600
                text-white
                font-medium
                py-2.5
                rounded-lg
                transition
                shadow-sm
                ${className}
            `}
        />
    );
}
