
"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

export default function Navbar() {
  const router = useRouter();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const { data: session, isPending } = authClient.useSession();

  const user = session?.user;

  const handleLogout = async () => {
    const { error } = await authClient.signOut();

    if (error) {
      console.error("Logout failed:", error.message);
      return;
    }

    setDropdownOpen(false);
    router.push("/login");
    router.refresh();
  };

  return (
    <nav className="sticky top-0 z-50 border-b bg-white shadow-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">

        <Link href="/" className="text-2xl font-bold text-blue-600">
          StudioSpace
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          <Link href="/">Home</Link>
          <Link href="/studios">Explore Studios</Link>
          <Link href="/#how-it-works">How It Works</Link>
          <Link href="/#about">About Us</Link>
        </div>

        <div className="relative flex items-center gap-3">

          {isPending ? (
            <span className="text-sm text-gray-500">Loading...</span>
          ) : user ? (
            <div className="relative">

              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-2 rounded-lg border px-3 py-2 hover:bg-gray-50"
              >
                {user.image ? (
                  <img
                    src={user.image}
                    alt="Profile"
                    className="h-9 w-9 rounded-full object-cover"
                  />
                ) : (
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-100 font-bold text-blue-600">
                    {user.name?.charAt(0).toUpperCase() || "U"}
                  </div>
                )}

                <span className="font-medium">{user.name}</span>

                <span>⌄</span>
              </button>

              {dropdownOpen && (
                <div className="absolute right-0 mt-3 w-64 rounded-xl border bg-white p-3 shadow-lg">

                  <div className="border-b px-3 py-2">
                    <p className="font-semibold text-gray-800">
                      {user.name}
                    </p>
                    <p className="break-all text-sm text-gray-500">
                      {user.email}
                    </p>
                  </div>

                  <button
                    onClick={handleLogout}
                    className="mt-2 w-full rounded-lg px-3 py-2 text-left text-red-600 hover:bg-red-50"
                  >
                    Logout
                  </button>

                </div>
              )}

            </div>
          ) : (
            <>
              <Link
                href="/login"
                className="rounded-lg border border-blue-600 px-4 py-2 text-blue-600"
              >
                Login
              </Link>

              <Link
                href="/register"
                className="rounded-lg bg-blue-600 px-4 py-2 text-white"
              >
                Register
              </Link>
            </>
          )}

        </div>
      </div>
    </nav>
  );
}
