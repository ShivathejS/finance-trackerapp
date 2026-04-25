"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function MobileNav() {
  const path = usePathname();

  const nav = [
    { name: "Home", href: "/dashboard" },
    { name: "Add", href: "/dashboard" },
    { name: "Profile", href: "/dashboard" },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t flex justify-around py-3 md:hidden z-50">

      {nav.map((item) => (
        <Link
          key={item.name}
          href={item.href}
          className={`text-sm ${
            path === item.href ? "text-blue-500 font-semibold" : "text-gray-500"
          }`}
        >
          {item.name}
        </Link>
      ))}

    </div>
  );
}