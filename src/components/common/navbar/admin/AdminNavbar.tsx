"use client";

import Link from "next/link";
import { BookOpen, Menu } from "lucide-react";

import Button from "@/components/common/button/Button";
import { adminNavItems } from "@/components/common/navbar/admin/admin-nav-items";

const AdminNavbar = () => {
  return (
    <header className="sticky top-0 z-50 w-full px-4 pt-4 sm:px-6 lg:px-8">
      <nav
        className="
          mx-auto
          flex
          h-16
          max-w-7xl
          items-center
          justify-between
          rounded-2xl
          border
          border-white/10
          bg-white/[0.06]
          px-4
          shadow-2xl
          shadow-blue-950/30
          backdrop-blur-2xl
          sm:px-6
        "
      >
        {/* Logo */}

        <Link
          href="/admin"
          className="flex items-center gap-2"
        >
          <div
            className="
              flex
              h-10
              w-10
              items-center
              justify-center
              rounded-xl
              bg-gradient-to-br
              from-cyan-400
              via-blue-500
              to-violet-600
              text-white
              shadow-lg
              shadow-blue-500/25
            "
          >
            <BookOpen className="h-5 w-5" />
          </div>

          <span className="text-xl font-bold text-white">
            Learn
            <span
              className="
                bg-gradient-to-r
                from-cyan-300
                via-blue-400
                to-violet-400
                bg-clip-text
                text-transparent
              "
            >
              Flow
            </span>
          </span>
        </Link>

        {/* Navigation */}

        <div
          className="
            hidden
            items-center
            gap-1
            rounded-xl
            border
            border-white/10
            bg-white/5
            p-1
            md:flex
          "
        >
          {adminNavItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="
                rounded-lg
                px-4
                py-2
                text-sm
                font-medium
                text-white/60
                transition
                hover:bg-white/10
                hover:text-white
              "
            >
              {item.label}
            </Link>
          ))}
        </div>

        {/* Right */}

        <div className="flex items-center gap-2">
          <Button
            variant="glass"
            size="sm"
            className="hidden md:inline-flex"
          >
            Logout
          </Button>

          <Button
            variant="glass"
            size="sm"
            className="h-10 w-10 px-0 md:hidden"
          >
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </nav>
    </header>
  );
};

export default AdminNavbar;