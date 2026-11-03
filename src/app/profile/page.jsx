"use client";

import { authClient } from "@/lib/auth-client";
import Link from "next/link";

export default function ProfilePage() {
    const { data: session, isPending } = authClient.useSession();

    const user = session?.user;

    // Loading State
    if (isPending) {
        return (
            <main className="flex min-h-[70vh] items-center justify-center bg-gray-50 dark:bg-slate-950">
                <div className="text-center">
                    <div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-4 border-blue-600 border-t-transparent"></div>

                    <p className="text-gray-600 dark:text-slate-300">
                        Loading your profile...
                    </p>
                </div>
            </main>
        );
    }

    // Login Required
    if (!user) {
        return (
            <main className="flex min-h-[70vh] items-center justify-center bg-gray-50 px-4 dark:bg-slate-950">
                <div className="w-full max-w-md rounded-2xl border border-gray-200 bg-white p-8 text-center shadow-sm dark:border-slate-800 dark:bg-slate-900">
                    <div className="mb-4 text-5xl">👤</div>

                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                        Login Required
                    </h1>

                    <p className="mt-3 text-gray-600 dark:text-slate-400">
                        Please login to view your profile.
                    </p>

                    <Link
                        href="/login"
                        className="mt-6 inline-block rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
                    >
                        Login Now
                    </Link>
                </div>
            </main>
        );
    }

    const initial = user.name?.charAt(0)?.toUpperCase() || "U";

    return (
        <main className="min-h-screen bg-gray-50 px-4 py-12 transition-colors duration-300 dark:bg-slate-950 sm:px-6">

            <div className="mx-auto max-w-4xl">

                {/* Page Heading */}
                <div className="mb-8">
                    <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                        Account Settings
                    </p>

                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl">
                        My Profile
                    </h1>

                    <p className="mt-2 text-gray-600 dark:text-slate-400">
                        View your personal information and account details.
                    </p>
                </div>

                {/* Profile Card */}
                <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">

                    {/* Profile Banner */}
                    <div className="h-36 bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600 sm:h-44"></div>

                    <div className="px-6 pb-8 sm:px-8">

                        {/* Profile Image */}
                        <div className="-mt-16 flex flex-col items-center sm:-mt-20 sm:flex-row sm:items-end sm:gap-5">

                            {user.image ? (
                                <img
                                    src={user.image}
                                    alt={user.name || "Profile"}
                                    className="h-32 w-32 rounded-full border-4 border-white bg-white object-cover shadow-lg dark:border-slate-900 dark:bg-slate-800"
                                />
                            ) : (
                                <div className="flex h-32 w-32 items-center justify-center rounded-full border-4 border-white bg-blue-100 text-5xl font-bold text-blue-700 shadow-lg dark:border-slate-900 dark:bg-blue-500/20 dark:text-blue-400">
                                    {initial}
                                </div>
                            )}

                            <div className="mt-4 text-center sm:mb-2 sm:mt-0 sm:text-left">
                                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                                    {user.name || "User"}
                                </h2>

                                <p className="mt-1 text-sm text-gray-500 dark:text-slate-400">
                                    {user.email}
                                </p>
                            </div>

                        </div>

                        {/* Account Information */}
                        <div className="mt-10">

                            <h3 className="mb-5 text-lg font-bold text-gray-900 dark:text-white">
                                Personal Information
                            </h3>

                            <div className="grid gap-5 sm:grid-cols-2">

                                {/* Full Name */}
                                <div className="rounded-xl border border-gray-100 bg-gray-50 p-4 dark:border-slate-700 dark:bg-slate-800">
                                    <p className="text-sm text-gray-500 dark:text-slate-400">
                                        Full Name
                                    </p>

                                    <p className="mt-2 font-semibold text-gray-900 dark:text-white">
                                        {user.name || "Not available"}
                                    </p>
                                </div>

                                {/* Email */}
                                <div className="rounded-xl border border-gray-100 bg-gray-50 p-4 dark:border-slate-700 dark:bg-slate-800">
                                    <p className="text-sm text-gray-500 dark:text-slate-400">
                                        Email Address
                                    </p>

                                    <p className="mt-2 break-all font-semibold text-gray-900 dark:text-white">
                                        {user.email || "Not available"}
                                    </p>
                                </div>

                                {/* Role */}
                                <div className="rounded-xl border border-gray-100 bg-gray-50 p-4 dark:border-slate-700 dark:bg-slate-800">
                                    <p className="text-sm text-gray-500 dark:text-slate-400">
                                        Account Role
                                    </p>

                                    <span className="mt-2 inline-flex rounded-full bg-blue-100 px-3 py-1 text-sm font-semibold capitalize text-blue-700 dark:bg-blue-500/10 dark:text-blue-400">
                                        {user.role || "User"}
                                    </span>
                                </div>

                                {/* Email Verification */}
                                <div className="rounded-xl border border-gray-100 bg-gray-50 p-4 dark:border-slate-700 dark:bg-slate-800">
                                    <p className="text-sm text-gray-500 dark:text-slate-400">
                                        Email Verification
                                    </p>

                                    <span className={`mt-2 inline-flex rounded-full px-3 py-1 text-sm font-semibold ${
                                        user.emailVerified
                                            ? "bg-green-100 text-green-700 dark:bg-green-500/10 dark:text-green-400"
                                            : "bg-yellow-100 text-yellow-700 dark:bg-yellow-500/10 dark:text-yellow-400"
                                    }`}>
                                        {user.emailVerified ? "Verified" : "Not Verified"}
                                    </span>
                                </div>

                            </div>
                        </div>

                        {/* Account Status */}
                        <div className="mt-8 rounded-xl border border-blue-100 bg-blue-50 p-5 dark:border-blue-900/50 dark:bg-blue-950/20">
                            <h3 className="font-semibold text-blue-800 dark:text-blue-400">
                                Your StudioSpace Account
                            </h3>

                            <p className="mt-2 text-sm leading-6 text-blue-700 dark:text-slate-300">
                                Your account is ready! You can explore studios,
                                manage your bookings, and enjoy the StudioSpace
                                platform.
                            </p>
                        </div>

                    </div>
                </div>

                {/* Back Button */}
                <div className="mt-6">
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 font-semibold text-blue-600 transition hover:text-blue-700 dark:text-blue-400"
                    >
                        ← Back to Home
                    </Link>
                </div>

            </div>
        </main>
    );
}