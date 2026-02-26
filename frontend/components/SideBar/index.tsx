'use client';

export default function Sidebar() {
    return (
        <aside className="w-64 h-screen bg-gray-100 p-4">
            <nav>
                <ul>
                    <li className="mb-2">
                        <a href="#" className="text-gray-700 hover:text-gray-900">Home</a>
                    </li>
                    <li className="mb-2">
                        <a href="#" className="text-gray-700 hover:text-gray-900">About</a>
                    </li>
                    <li className="mb-2">
                        <a href="#" className="text-gray-700 hover:text-gray-900">Services</a>
                    </li>
                    <li className="mb-2">
                        <a href="#" className="text-gray-700 hover:text-gray-900">Contact</a>
                    </li>
                </ul>
            </nav>
        </aside>
    );
}