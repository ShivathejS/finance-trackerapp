"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import MobileNav from "./MobileNav";

export default function Layout({ children }) {
  const router = useRouter();

  const logout = () => {
    localStorage.removeItem("token");
    router.push("/login");
  };

  return (
    <div className="flex min-h-screen bg-gray-100">

      {/* SIDEBAR (desktop) */}
      <div className="hidden md:flex flex-col justify-between w-64 bg-white shadow-md p-6">

        <div>
          <h2 className="text-2xl font-bold mb-8">💰 Finance</h2>

          <nav className="flex flex-col gap-4">
            <Link href="/dashboard" className="hover:text-blue-500">
              Dashboard
            </Link>
          </nav>
        </div>

        {/* 🔥 LOGOUT */}
        <button
          onClick={logout}
          className="bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition"
        >
          Logout
        </button>

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