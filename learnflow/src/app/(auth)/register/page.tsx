import RegisterForm from "@/modules/auth/components/register-form";

export default function RegisterPage() {
  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      {/* Left Side */}
      <div className="hidden lg:flex flex-col justify-center bg-gradient-to-br from-violet-600 via-indigo-600 to-blue-600 p-16 text-white">
        <h1 className="text-5xl font-bold">LearnFlow</h1>

        <p className="mt-6 max-w-md text-lg text-indigo-100">
          Build your future with world-class courses and practical learning.
        </p>

        <div className="mt-12 space-y-6">
          <div className="rounded-xl bg-white/10 p-5 backdrop-blur">
            📚 1000+ Courses
          </div>

          <div className="rounded-xl bg-white/10 p-5 backdrop-blur">
            🎓 Track Your Progress
          </div>

          <div className="rounded-xl bg-white/10 p-5 backdrop-blur">
            🚀 Learn from Experts
          </div>
        </div>
      </div>

      {/* Right Side */}
      <div className="flex items-center justify-center bg-slate-50 p-6">
        <RegisterForm />
      </div>
    </div>
  );
}