import RegisterForm from "@/modules/auth/components/register-form";

export default function RegisterPage() {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#030712] px-4 text-white">

      {/* ================= BACKGROUND ================= */}
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

      {/* ================= REGISTER FORM ================= */}
      <div className="relative z-10 w-full max-w-md">
        <RegisterForm />
      </div>

    </main>
  );
}