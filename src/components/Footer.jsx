"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
const quickLinks = [
    { name: "Home", href: "/" },
    { name: "Explore Studios", href: "/studios" },
    { name: "How It Works", href: "/#how-it-works" },
    { name: "About Us", href: "/#about" },
];

const accountLinks = [
    { name: "Login", href: "/login" },
    { name: "Register", href: "/register" },
];

export default function Footer() {
    const [year, setYear] = useState("2006");

    useEffect(() => {
        setYear(new Date().getFullYear());
    }, []);
    return (
        <footer className="bg-gray-950 text-gray-300">
            <div className="mx-auto max-w-7xl px-4 py-14">
                <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">

                    {/* Brand */}
                    <div>
                        <Link href="/" className="text-2xl font-bold text-white">
                            Studio<span className="text-indigo-400">Space</span>
                        </Link>

                        <p className="mt-4 max-w-xs text-sm leading-7 text-gray-400">
                            Discover and book the perfect creative studio space
                            for photography, content creation, events, and more.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="mb-5 text-lg font-semibold text-white">
                            Quick Links
                        </h3>

                        <ul className="space-y-3 text-sm">
                            {quickLinks.map((link) => (
                                <li key={link.name}>
                                    <Link
                                        href={link.href}
                                        className="transition hover:text-indigo-400"
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Account */}
                    <div>
                        <h3 className="mb-5 text-lg font-semibold text-white">
                            Account
                        </h3>

                        <ul className="space-y-3 text-sm">
                            {accountLinks.map((link) => (
                                <li key={link.name}>
                                    <Link
                                        href={link.href}
                                        className="transition hover:text-indigo-400"
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h3 className="mb-5 text-lg font-semibold text-white">
                            Contact Us
                        </h3>

                        <ul className="space-y-4 text-sm text-gray-400">
                            <li>📍 Sylhet, Bangladesh</li>
                            <li>
                                ✉️{" "}
                                <a
                                    href="mailto:support@studiospace.com"
                                    className="hover:text-indigo-400"
                                >
                                    support@studiospace.com
                                </a>
                            </li>
                            <li>🌐 www.studiospace.com</li>
                        </ul>
                    </div>
                </div>

                {/* Bottom */}
                <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-gray-800 pt-7 text-center sm:flex-row">
                    <p className="text-sm text-gray-500">
                        © {year || "2026"} StudioSpace. All rights reserved.
                    </p>

                    <p className="text-sm text-gray-500">
                        Made with ❤️ for creative people.
                    </p>
                </div>
            </div>
        </footer>
    );
}
