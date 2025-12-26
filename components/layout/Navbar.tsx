"use client";
import { usePathname } from "next/navigation";

function Navbar() {
    const pathname = usePathname();

    const linkClass = (path: string) =>
        `hover:text-blue-600 transition ${pathname === path ? "text-blue-600 font-semibold" : "text-gray-700"
        }`;

    return (
        <div className="bg-white px-6 py-4 sticky top-0 z-50 shadow-sm">
            <div className="mx-auto flex justify-between items-center">
                <h1 className="text-xl font-bold ">
                    Realtime Form
                </h1>

                <nav>
                    <ul className="flex space-x-6">
                        <li>
                            <a href="/" className={linkClass("/")}>
                                Patient
                            </a>
                        </li>
                        <li>
                            <a href="/staff" className={linkClass("/staff")}>
                                Staff View
                            </a>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
    );
}

export default Navbar;
