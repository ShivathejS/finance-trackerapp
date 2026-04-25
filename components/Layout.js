"use client";

import Link from "next/link";
import MobileNav from "./MobileNav";

export default function Layout({ children }) {
  return (
    <div className="flex min-h-screen bg-gray-100">

      {/* SIDEBAR (desktop only) */}
      <div className="hidden md:block w-64 bg-white shadow-md p-6">
        <h2 className="text-2xl font-bold mb-8">💰 Finance</h2>

        <nav className="flex flex-col gap-4">
          <Link href="/dashboard" className="hover:text-blue-500">
            Dashboard
          </Link>
        </nav>
      </div>

      {/* MAIN */}
      <div className="flex-1 p-4 md:p-6 pb-20 md:pb-6">
        {children}
      </div>

      {/* MOBILE NAV */}
      <MobileNav />

    </div>
  );
}