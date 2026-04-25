"use client";

import Link from "next/link";

export default function Layout({ children }) {
  return (
    <div className="flex min-h-screen">

      {/* Sidebar */}
      <div className="w-64 bg-white border-r p-6">

        <h2 className="text-2xl font-bold mb-8">💰 Finance</h2>

        <nav className="flex flex-col gap-4 text-gray-600">
          <Link href="/dashboard" className="hover:text-blue-500">
            Dashboard
          </Link>
        </nav>

      </div>

      {/* Main */}
      <div className="flex-1 p-8">
        {children}
      </div>

    </div>
  );
}