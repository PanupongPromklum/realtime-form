"use client";

import { useEffect, useState } from "react";

interface Props {
    show: boolean;
    onClose: () => void;
}

export default function Toast({ show, onClose }: Props) {
    const [visible, setVisible] = useState(show);

    useEffect(() => {
        if (show) {
            setVisible(true);
        } else {
            // เล่น animation ออกก่อน unmount
            const timer = setTimeout(() => setVisible(false), 200);
            return () => clearTimeout(timer);
        }
    }, [show]);

    useEffect(() => {
        if (!show) return;

        const timer = setTimeout(() => {
            onClose();
        }, 2500);

        return () => clearTimeout(timer);
    }, [show, onClose]);

    if (!visible) return null;

    return (
        <div
            className={`fixed bottom-4 left-1/2 -translate-x-1/2
            sm:left-auto sm:translate-x-0 sm:right-4 z-50
            bg-green-500 text-white px-6 py-3 rounded-lg shadow-md
            transition-all duration-200 ease-out
            ${show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"}
        `}
        >
            Submit completed successfully
        </div>
    );
}
