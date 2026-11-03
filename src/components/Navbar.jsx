
"use client";

import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

export default function Navbar() {
  const router = useRouter();

  const { theme, resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    const currentTheme = resolvedTheme || theme;
    setTheme(currentTheme === "dark" ? "light" : "dark");
  };

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  const isAdmin = user?.role === "admin";
  const isSubAdmin = user?.role === "sub-admin";
  const isStaff = isAdmin || isSubAdmin;

  const handleLogout = async () => {
    const { error } = await authClient.signOut();

    if (error) {
      console.error("Logout failed:", error.message);
      return;
    }

    setDropdownOpen(false);
    setMobileMenuOpen(false);
    router.push("/login");
    router.refresh();
  };

  const closeMenus = () => {
    setDropdownOpen(false);
    setMobileMenuOpen(false);
  };

  return (
    <nav className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/95 shadow-sm backdrop-blur-xl transition-colors dark:border-slate-700 dark:bg-slate-950/95">

      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">

        {/* Logo */}
        <Link
          href="/"
          onClick={closeMenus}
          className="group flex items-center gap-2"
        >
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-600 text-xl font-extrabold text-white shadow-md shadow-blue-600/20 transition group-hover:bg-blue-700">
            S
          </div>

          <div>
            <h1 className="text-xl font-extrabold tracking-tight text-slate-900 transition-colors dark:text-white sm:text-2xl">
              Studio<span className="text-blue-600">Space</span>
            </h1>

            <p className="hidden text-[10px] font-medium tracking-[2px] text-slate-500 dark:text-slate-400 sm:block">
              FIND YOUR CREATIVE SPACE
            </p>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-7 lg:flex">

          <Link
            href="/"
            className="text-sm font-semibold text-slate-600 transition hover:text-blue-600 dark:text-slate-300 dark:hover:text-blue-400"
          >
            Home
          </Link>

          <Link
            href="/studios"
            className="text-sm font-semibold text-slate-600 transition hover:text-blue-600 dark:text-slate-300 dark:hover:text-blue-400"
          >
            Explore Studios
          </Link>

          <Link
            href="/#how-it-works"
            className="text-sm font-semibold text-slate-600 transition hover:text-blue-600 dark:text-slate-300 dark:hover:text-blue-400"
          >
            How It Works
          </Link>

          <Link
            href="/#about"
            className="text-sm font-semibold text-slate-600 transition hover:text-blue-600 dark:text-slate-300 dark:hover:text-blue-400"
          >
            About Us
          </Link>

        </div>

        {/* Right Side */}
        <div className="flex items-center gap-3">

          {/* Dark / Light Mode Toggle */}
          <button
            onClick={toggleTheme}
            disabled={!mounted}
            aria-label="Toggle dark and light mode"
            title={
              mounted
                ? resolvedTheme === "dark"
                  ? "Switch to Light Mode"
                  : "Switch to Dark Mode"
                : "Change Theme"
            }
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-xl text-slate-700 shadow-sm transition hover:scale-105 hover:bg-slate-100 disabled:cursor-wait dark:border-slate-700 dark:bg-slate-800 dark:text-yellow-400 dark:hover:bg-slate-700"
          >
            {mounted ? (
              resolvedTheme === "dark" ? "☀️" : "🌙"
            ) : (
              <span className="text-lg">🌙</span>
            )}
          </button>

          {isPending ? (
            <div className="h-10 w-24 animate-pulse rounded-lg bg-slate-100 dark:bg-slate-800" />
          ) : user ? (

            <div className="relative">

              {/* Dashboard + Profile */}
              <div className="hidden items-center gap-3 sm:flex">

                {isStaff && (
                  <Link
                    href="/dashboard"
                    onClick={closeMenus}
                    className="block rounded-xl px-3 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-blue-50 hover:text-blue-700 dark:text-slate-200 dark:hover:bg-slate-800 dark:hover:text-blue-400"
                  >
                    Dashboard
                  </Link>
                )}

                {!isStaff && (
                  <Link
                    href="/my-bookings"
                    onClick={closeMenus}
                    className="block rounded-xl px-3 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-blue-50 hover:text-blue-700 dark:text-slate-200 dark:hover:bg-slate-800 dark:hover:text-blue-400"
                  >
                    My Bookings
                  </Link>
                )}

                {/* <Link
                  href="/profile"
                  onClick={closeMenus}
                  className="block rounded-xl px-3 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-blue-50 hover:text-blue-700 dark:text-slate-200 dark:hover:bg-slate-800 dark:hover:text-blue-400"
                >
                  My Profile
                </Link> */}

                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-2.5 py-2 transition hover:border-blue-300 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:hover:bg-slate-700"
                >
                  {user.image ? (
                    <img
                      src={user.image}
                      alt="Profile"
                      className="h-9 w-9 rounded-full border-2 border-blue-100 object-cover"
                    />
                  ) : (
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-100 font-bold text-blue-700">
                      {user.name?.charAt(0).toUpperCase() || "U"}
                    </div>
                  )}

                  <span className="max-w-24 truncate text-sm font-semibold text-slate-700 dark:text-white">
                    {user.name}
                  </span>

                  <span className="text-xs text-slate-500 dark:text-slate-400">
                    {dropdownOpen ? "▲" : "▼"}
                  </span>
                </button>

              </div>

              {/* Profile Dropdown */}
              {dropdownOpen && (
                <div className="absolute right-0 mt-3 w-64 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl shadow-slate-900/10 dark:border-slate-700 dark:bg-slate-900">

                  <div className="bg-gradient-to-r from-blue-600 to-blue-500 px-4 py-5 text-white">

                    <div className="flex items-center gap-3">

                      {user.image ? (
                        <img
                          src={user.image}
                          alt="Profile"
                          className="h-11 w-11 rounded-full border-2 border-white/50 object-cover"
                        />
                      ) : (
                        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-white/20 text-lg font-bold">
                          {user.name?.charAt(0).toUpperCase() || "U"}
                        </div>
                      )}

                      <div className="min-w-0">
                        <p className="truncate font-bold">{user.name}</p>
                        <p className="truncate text-xs text-blue-100">
                          {user.email}
                        </p>
                      </div>

                    </div>
                  </div>

                  <div className="p-2">

                    {/* My Profile */}
                    <Link
                      href="/profile"
                      onClick={closeMenus}
                      className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-blue-50 hover:text-blue-700 dark:text-slate-200 dark:hover:bg-slate-800 dark:hover:text-blue-400"
                    >
                      <span className="text-lg">👤</span>
                      My Profile
                    </Link>

                    {/* Dashboard */}
                    {isStaff && (
                      <Link
                        href="/dashboard"
                        onClick={closeMenus}
                        className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-blue-50 hover:text-blue-700 dark:text-slate-200 dark:hover:bg-slate-800 dark:hover:text-blue-400"
                      >
                        <span className="text-lg">📊</span>
                        Dashboard
                      </Link>
                    )}

                    {/* My Bookings */}
                    {!isStaff && (
                      <Link
                        href="/my-bookings"
                        onClick={closeMenus}
                        className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-blue-50 hover:text-blue-700 dark:text-slate-200 dark:hover:bg-slate-800 dark:hover:text-blue-400"
                      >
                        <span className="text-lg">📅</span>
                        My Bookings
                      </Link>
                    )}

                    <div className="my-2 border-t border-slate-100 dark:border-slate-700" />

                    {/* Logout */}
                    <button
                      onClick={handleLogout}
                      className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm font-semibold text-red-600 transition hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-950/40"
                    >
                      <span className="text-lg">🚪</span>
                      Logout
                    </button>

                  </div>
                </div>
              )}

            </div>

          ) : (

            <div className="hidden items-center gap-3 sm:flex">

              <Link
                href="/login"
                className="rounded-xl border border-blue-600 px-5 py-2.5 text-sm font-semibold text-blue-600 transition hover:bg-blue-50 dark:hover:bg-blue-950/40"
              >
                Login
              </Link>

              <Link
                href="/register"
                className="rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-blue-600/20 transition hover:-translate-y-0.5 hover:bg-blue-700"
              >
                Get Started
              </Link>

            </div>
          )}

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 text-xl text-slate-700 transition hover:bg-slate-100 dark:border-slate-700 dark:text-white dark:hover:bg-slate-800 lg:hidden"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? "✕" : "☰"}
          </button>

        </div>
      </div>

      {/* Mobile Navigation */}
      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="border-t border-slate-200 bg-white px-4 py-4 shadow-lg dark:border-slate-700 dark:bg-slate-950 lg:hidden">

          <div className="mx-auto flex max-w-7xl flex-col gap-1">

            {/* Public Navigation */}
            <Link
              href="/"
              onClick={closeMenus}
              className="rounded-lg px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-blue-50 hover:text-blue-700 dark:text-slate-200 dark:hover:bg-slate-800 dark:hover:text-blue-400"
            >
              Home
            </Link>

            <Link
              href="/studios"
              onClick={closeMenus}
              className="rounded-lg px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-blue-50 hover:text-blue-700 dark:text-slate-200 dark:hover:bg-slate-800 dark:hover:text-blue-400"
            >
              Explore Studios
            </Link>

            <Link
              href="/#how-it-works"
              onClick={closeMenus}
              className="rounded-lg px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-blue-50 hover:text-blue-700 dark:text-slate-200 dark:hover:bg-slate-800 dark:hover:text-blue-400"
            >
              How It Works
            </Link>

            <Link
              href="/#about"
              onClick={closeMenus}
              className="rounded-lg px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-blue-50 hover:text-blue-700 dark:text-slate-200 dark:hover:bg-slate-800 dark:hover:text-blue-400"
            >
              About Us
            </Link>

            {/* Logged In User */}
            {user ? (
              <>
                <div className="my-3 border-t border-slate-200 dark:border-slate-700" />

                {/* User Information */}
                <div className="flex items-center gap-3 rounded-xl bg-slate-50 p-3 dark:bg-slate-900">

                  {user.image ? (
                    <img
                      src={user.image}
                      alt="Profile"
                      className="h-11 w-11 rounded-full border-2 border-blue-100 object-cover dark:border-slate-700"
                    />
                  ) : (
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-blue-100 text-lg font-bold text-blue-700 dark:bg-blue-500/20 dark:text-blue-400">
                      {user.name?.charAt(0).toUpperCase() || "U"}
                    </div>
                  )}

                  <div className="min-w-0">
                    <p className="truncate text-sm font-bold text-slate-800 dark:text-white">
                      {user.name}
                    </p>

                    <p className="break-all text-xs text-slate-500 dark:text-slate-400">
                      {user.email}
                    </p>
                  </div>

                </div>

                {/* Dashboard / My Bookings */}
                {isStaff ? (
                  <Link
                    href="/dashboard"
                    onClick={closeMenus}
                    className="mt-2 flex items-center gap-3 rounded-xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
                  >
                    📊 Dashboard
                  </Link>
                ) : (
                  <Link
                    href="/my-bookings"
                    onClick={closeMenus}
                    className="mt-2 flex items-center gap-3 rounded-xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
                  >
                    📅 My Bookings
                  </Link>
                )}

                {/* My Profile - Everyone */}
                <Link
                  href="/profile"
                  onClick={closeMenus}
                  className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-blue-50 hover:text-blue-700 dark:text-slate-200 dark:hover:bg-slate-800 dark:hover:text-blue-400"
                >
                  👤 My Profile
                </Link>

                {/* Logout */}
                <button
                  onClick={handleLogout}
                  className="mt-2 flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-sm font-semibold text-red-600 transition hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-950/40"
                >
                  🚪 Logout
                </button>

              </>
            ) : (

              /* Guest Navigation */
              <div className="mt-3 grid grid-cols-2 gap-3 border-t border-slate-200 pt-4 dark:border-slate-700">

                <Link
                  href="/login"
                  onClick={closeMenus}
                  className="rounded-xl border border-blue-600 px-4 py-3 text-center text-sm font-semibold text-blue-600 transition hover:bg-blue-50 dark:hover:bg-blue-950/40"
                >
                  Login
                </Link>

                <Link
                  href="/register"
                  onClick={closeMenus}
                  className="rounded-xl bg-blue-600 px-4 py-3 text-center text-sm font-semibold text-white transition hover:bg-blue-700"
                >
                  Register
                </Link>

              </div>
            )}

          </div>
        </div>
      )}
    </nav>
  );
}
