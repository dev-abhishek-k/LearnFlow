import PublicNavbar from "@/components/common/navbar/public/PublicNavbar";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#030712] text-white">

      {/* Water Background */}

      <div className="pointer-events-none absolute inset-0 overflow-hidden">

        {/* Cyan */}

        <div
          className="
            absolute
            -left-40
            -top-40
            h-[500px]
            w-[500px]
            rounded-full
            bg-cyan-500/20
            blur-[130px]
          "
        />

        {/* Blue */}

        <div
          className="
            absolute
            right-[-150px]
            top-[10%]
            h-[500px]
            w-[500px]
            rounded-full
            bg-blue-600/20
            blur-[130px]
          "
        />

        {/* Violet */}

        <div
          className="
            absolute
            bottom-[-200px]
            left-[30%]
            h-[500px]
            w-[500px]
            rounded-full
            bg-violet-600/20
            blur-[130px]
          "
        />

        {/* Grid */}

        <div
          className="
            absolute
            inset-0
            opacity-[0.035]
            [background-image:linear-gradient(to_right,#fff_1px,transparent_1px),linear-gradient(to_bottom,#fff_1px,transparent_1px)]
            [background-size:60px_60px]
          "
        />

      </div>

      {/* Navbar */}

      <PublicNavbar />

      {/* Page */}

      <main className="relative z-10">
        {children}
      </main>

    </div>
  );
}