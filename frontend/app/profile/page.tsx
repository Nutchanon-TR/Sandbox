'use client';

import { TITLE } from "@/constants/Title";
import { useChangeTitle } from "@/utils/breadCrumbUtil";
import { useSession, signOut } from "next-auth/react";

export default function ProfilePage() {
    useChangeTitle(TITLE.PROFILE);
    const { data: session, status } = useSession();

    return (
        <div className="p-6 max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold mb-8 text-gray-800 dark:text-gray-100">User Profile (Messages)</h1>

            {status === "loading" ? (
                <div className="animate-pulse space-y-4">
                    <div className="h-24 w-24 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
                    <div className="h-6 w-48 bg-gray-200 dark:bg-gray-700 rounded"></div>
                    <div className="h-4 w-64 bg-gray-200 dark:bg-gray-700 rounded"></div>
                </div>
            ) : session?.user ? (
                <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-sm border border-gray-100 dark:border-gray-700 flex flex-col md:flex-row gap-8 items-start">
                    {session.user.image && (
                        <img
                            src={session.user.image}
                            alt="Profile"
                            className="w-32 h-32 rounded-full shadow-md border-4 border-white dark:border-gray-700"
                        />
                    )}
                    <div className="flex flex-col gap-3">
                        <div>
                            <p className="text-sm text-gray-500 dark:text-gray-400 font-medium uppercase tracking-wider">Name</p>
                            <p className="text-xl font-semibold text-gray-800 dark:text-gray-100">{session.user.name}</p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-500 dark:text-gray-400 font-medium uppercase tracking-wider">Email</p>
                            <p className="text-lg text-gray-700 dark:text-gray-300">{session.user.email}</p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-500 dark:text-gray-400 font-medium uppercase tracking-wider">User ID</p>
                            <code className="text-sm bg-gray-100 dark:bg-gray-900 px-3 py-1.5 rounded-md text-gray-800 dark:text-gray-200 block mt-1 break-all">
                                {session.user.id || "N/A"}
                            </code>
                        </div>
                        <div className="mt-4">
                            <button
                                onClick={() => signOut({ callbackUrl: '/login' })}
                                className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg font-medium transition-colors shadow-sm active:scale-95"
                            >
                                Logout
                            </button>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="bg-yellow-50 text-yellow-800 p-4 rounded-lg border border-yellow-200">
                    <p>You are not logged in. Please go to the home page to log in.</p>
                </div>
            )}
        </div>
    );
}
