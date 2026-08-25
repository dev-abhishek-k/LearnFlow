import StudentNavbar from "@/components/common/navbar/student/StudentNavbar";

export default function StudentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#030712] text-white">

      {/* ================= WATER BACKGROUND ================= */}

      <div className="pointer-events-none absolute inset-0 overflow-hidden">

        {/* Cyan Glow */}

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

        {/* Blue Glow */}

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

        {/* Violet Glow */}

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

        {/* Subtle Grid */}

        <div
          className="
            absolute
            inset-0
            opacity-[0.035]
            [background-image:linear-gradient(to_right,#fff_1px,transparent_1px),linear-gradient(to_bottom,#fff_1px,transparent_1px)]
            [background-size:60px_60px]
          "
        />

        {/* Water Highlight */}

        <div
          className="
            absolute
            left-1/2
            top-0
            h-[300px]
            w-[700px]
            -translate-x-1/2
            rounded-full
            bg-cyan-400/[0.04]
            blur-[100px]
          "
        />
      </div>

      {/* ================= NAVBAR ================= */}

      <div className="relative z-50">
        <StudentNavbar />
      </div>

      {/* ================= PAGE ================= */}

      <main className="relative z-10">
        {children}
      </main>

    </div>
  );
}