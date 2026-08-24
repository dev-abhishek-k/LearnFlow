"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BookOpen, Menu } from "lucide-react";

const navItems = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "Courses",
    href: "/courses",
  },
  {
    label: "About",
    href: "/about",
  },
  {
    label: "Contact",
    href: "/contact",
  },
];

const PublicNavbar = () => {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 w-full px-4 pt-4 sm:px-6 lg:px-8">
      <nav
        className="
          relative
          mx-auto
          flex
          h-[72px]
          max-w-7xl
          items-center
          justify-between
          overflow-hidden
          rounded-[22px]
          border
          border-white/[0.12]
          bg-slate-950/55
          px-3
          shadow-[0_20px_60px_rgba(2,8,23,0.45)]
          backdrop-blur-2xl
          backdrop-saturate-150
          sm:px-5
        "
      >
        {/* ================================
            AMBIENT WATER LIGHT
        ================================= */}

        <div
          className="
            pointer-events-none
            absolute
            -left-24
            -top-28
            h-48
            w-48
            rounded-full
            bg-cyan-400/[0.08]
            blur-[80px]
          "
        />

        <div
          className="
            pointer-events-none
            absolute
            -right-24
            -top-28
            h-48
            w-48
            rounded-full
            bg-violet-500/[0.08]
            blur-[80px]
          "
        />

        {/* ================================
            TOP REFLECTION
        ================================= */}

        <div
          className="
            pointer-events-none
            absolute
            inset-x-8
            top-0
            h-px
            bg-gradient-to-r
            from-transparent
            via-white/25
            to-transparent
          "
        />

        {/* ================================
            LOGO
        ================================= */}

        <Link
          href="/"
          className="
            group
            relative
            z-10
            flex
            items-center
            gap-2.5
          "
        >
          {/* Logo Icon */}

          <div
            className="
              relative
              flex
              h-11
              w-11
              shrink-0
              items-center
              justify-center
              overflow-hidden
              rounded-[14px]
              bg-gradient-to-br
              from-cyan-400
              via-blue-500
              to-violet-600
              shadow-[0_8px_25px_rgba(59,130,246,0.30)]
              transition-all
              duration-300
              group-hover:scale-105
              group-hover:shadow-[0_10px_30px_rgba(34,211,238,0.25)]
            "
          >
            {/* Glass Shine */}

            <span
              className="
                absolute
                inset-0
                bg-gradient-to-br
                from-white/30
                via-transparent
                to-transparent
              "
            />

            <BookOpen className="relative z-10 h-5 w-5 text-white" />
          </div>

          {/* Brand */}

          <span
            className="
              text-xl
              font-extrabold
              tracking-tight
              text-white
            "
          >
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

        {/* ================================
            NAVIGATION
        ================================= */}

        <div
          className="
            absolute
            left-1/2
            hidden
            -translate-x-1/2
            items-center
            gap-0.5
            rounded-[16px]
            border
            border-white/[0.08]
            bg-black/[0.14]
            p-1
            shadow-inner
            shadow-white/[0.03]
            backdrop-blur-xl
            md:flex
          "
        >
          {navItems.map((item) => {
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`
                  group
                  relative
                  rounded-[12px]
                  px-4
                  py-2.5
                  text-sm
                  transition-all
                  duration-200
                  ${
                    isActive
                      ? "font-semibold text-white"
                      : "font-medium text-white/55 hover:bg-white/[0.07] hover:text-white"
                  }
                `}
              >
                {/* Active Background */}

                {isActive && (
                  <span
                    className="
                      absolute
                      inset-0
                      rounded-[12px]
                      bg-white/[0.10]
                      transition-all
                      duration-200
                      group-hover:bg-white/[0.14]
                    "
                  />
                )}

                {/* Active Bottom Line */}

                {isActive && (
                  <span
                    className="
                      absolute
                      bottom-1
                      left-1/2
                      h-[2px]
                      w-5
                      -translate-x-1/2
                      rounded-full
                      bg-gradient-to-r
                      from-cyan-400
                      to-blue-500
                      shadow-[0_0_10px_rgba(34,211,238,0.5)]
                    "
                  />
                )}

                <span className="relative">
                  {item.label}
                </span>
              </Link>
            );
          })}
        </div>

        {/* ================================
            AUTH
        ================================= */}

        <div
          className="
            relative
            z-10
            hidden
            items-center
            gap-2.5
            md:flex
          "
        >
          {/* Login */}

          <Link
            href="/login"
            className="
              group
              relative
              overflow-hidden
              rounded-xl
              border
              border-white/[0.10]
              bg-white/[0.045]
              px-4
              py-2.5
              text-sm
              font-semibold
              text-white/75
              shadow-sm
              backdrop-blur-xl
              transition-all
              duration-300
              hover:border-white/[0.18]
              hover:bg-white/[0.09]
              hover:text-white
            "
          >
            {/* Button Shine */}

            <span
              className="
                absolute
                inset-0
                -translate-x-full
                bg-gradient-to-r
                from-transparent
                via-white/[0.08]
                to-transparent
                transition-transform
                duration-700
                group-hover:translate-x-full
              "
            />

            <span className="relative">
              Login
            </span>
          </Link>

          {/* Register */}

          <Link
            href="/register"
            className="
              group
              relative
              overflow-hidden
              rounded-xl
              bg-gradient-to-r
              from-cyan-400
              via-blue-500
              to-violet-600
              px-5
              py-2.5
              text-sm
              font-bold
              text-white
              shadow-[0_8px_25px_rgba(59,130,246,0.28)]
              transition-all
              duration-300
              hover:scale-[1.03]
              hover:shadow-[0_10px_35px_rgba(59,130,246,0.42)]
            "
          >
            {/* Button Shine */}

            <span
              className="
                absolute
                inset-y-0
                -left-20
                w-14
                rotate-12
                bg-white/20
                blur-md
                transition-all
                duration-700
                group-hover:left-[120%]
              "
            />

            <span className="relative">
              Register
            </span>
          </Link>
        </div>

        {/* ================================
            MOBILE MENU
        ================================= */}

        <button
          type="button"
          className="
            relative
            z-10
            inline-flex
            h-10
            w-10
            items-center
            justify-center
            rounded-xl
            border
            border-white/[0.10]
            bg-white/[0.05]
            text-white
            shadow-sm
            backdrop-blur-xl
            transition-all
            duration-200
            hover:border-white/[0.18]
            hover:bg-white/[0.10]
            md:hidden
          "
          aria-label="Open menu"
        >
          <Menu className="h-5 w-5" />
        </button>
      </nav>
    </header>
  );
};

export default PublicNavbar;