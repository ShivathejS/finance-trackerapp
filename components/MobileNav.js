"use client";

import { useRouter } from "next/navigation";

export default function MobileNav() {
  const router = useRouter();

  const logout = () => {
    localStorage.removeItem("token");
    router.push("/login");
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t flex justify-around py-3 md:hidden z-50">

      <button onClick={() => router.push("/dashboard")}>
        Home
      </button>

      <button onClick={logout} className="text-red-500">
        Logout
      </button>

    </div>
  );
}