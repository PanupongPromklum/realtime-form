import React from 'react'

function Navbar() {
    return (
        <div className="bg-white px-6 py-4 sticky top-0 z-50">
            <div className=" mx-auto flex justify-between items-center">
                <h1 className="text-xl font-bold text-blue-600">Realtime Form</h1>
                <nav>
                    <ul className="flex space-x-6">
                        <li><a href="/" className="text-gray-700 hover:text-blue-600">Patients</a></li>
                        <li><a href="/staff" className="text-gray-700 hover:text-blue-600">Staff</a></li>
                    </ul>
                </nav>
            </div>
        </div>
    )
}

export default Navbar