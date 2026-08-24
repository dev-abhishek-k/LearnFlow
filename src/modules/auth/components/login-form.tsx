"use client";

import Link from "next/link";
import {
  Loader2,
  Mail,
  Lock,
  ArrowRight,
  LogIn,
} from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import {
  loginSchema,
  LoginInput,
} from "@/modules/auth/auth.validation";
import { useLogin } from "@/modules/auth/hooks/use-login";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export default function LoginForm() {
  const loginMutation = useLogin();

  const form = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(data: LoginInput) {
    try {
      const result = await loginMutation.mutateAsync(data);

      toast.success(result.message || "Login successful!");

      // Yahan baad mein dashboard redirect karenge
      // router.push("/dashboard");
    } catch (error) {
      console.error(error);

      toast.error(
        error instanceof Error ? error.message : "Login failed"
      );
    }
  }

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden px-4 py-10 text-white">
      {/* ================= BACKGROUND GLOW ================= */}
      <div className="pointer-events-none absolute  overflow-hidden">
        {/* Cyan Glow */}
        <div
          className="
            absolute
            -left-40
            -top-40
            h-[450px]
            w-[450px]
            rounded-full
            bg-cyan-500/20
            blur-[120px]
          "
        />

        {/* Blue Glow */}
        <div
          className="
            absolute
            -right-40
            top-1/4
            h-[450px]
            w-[450px]
            rounded-full
            bg-blue-600/20
            blur-[120px]
          "
        />

        {/* Violet Glow */}
        <div
          className="
            absolute
            bottom-[-200px]
            left-1/3
            h-[450px]
            w-[450px]
            rounded-full
            bg-violet-600/20
            blur-[120px]
          "
        />
      </div>

      {/* ================= SINGLE LOGIN BOX ================= */}
      <div
        className="
          relative
          z-10
          w-full
          max-w-md
          overflow-hidden
          rounded-[28px]
          border
          border-white/15
          bg-white/[0.06]
          p-6
          backdrop-blur-2xl
          sm:p-8
        "
      >
        {/* Card Cyan Glow */}
        <div
          className="
            pointer-events-none
            absolute
            -right-20
            -top-20
            h-40
            w-40
            rounded-full
            bg-cyan-500/20
            blur-3xl
          "
        />

        {/* Card Violet Glow */}
        <div
          className="
            pointer-events-none
            absolute
            -bottom-20
            -left-20
            h-40
            w-40
            rounded-full
            bg-violet-600/20
            blur-3xl
          "
        />

        {/* ================= HEADER ================= */}
        <div className="relative mb-8 text-center">
          {/* Login Icon */}
          <div
            className="
              mx-auto
              mb-5
              flex
              h-14
              w-14
              items-center
              justify-center
              rounded-2xl
              bg-gradient-to-br
              from-cyan-400
              via-blue-500
              to-violet-600
            "
          >
            <LogIn className="h-6 w-6 text-white" />
          </div>

          <h1 className="text-3xl font-bold text-white">
            Welcome Back
          </h1>

          <p className="mt-2 text-sm text-white/45">
            Sign in to continue learning with LearnFlow.
          </p>
        </div>

        {/* ================= FORM ================= */}
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="relative space-y-5"
        >
          {/* ================= EMAIL ================= */}
          <div className="space-y-2">
            <Label
              htmlFor="email"
              className="text-sm font-medium text-white/75"
            >
              Email Address
            </Label>

            <div className="group relative">
              <Mail
                className="
                  absolute
                  left-3
                  top-1/2
                  z-10
                  h-4
                  w-4
                  -translate-y-1/2
                  text-white/30
                  transition-colors
                  group-focus-within:text-cyan-400
                "
              />

              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                {...form.register("email")}
                className="
                  h-12
                  border-white/10
                  bg-black/20
                  pl-10
                  text-white
                  placeholder:text-white/25
                  backdrop-blur-xl
                  transition-all
                  hover:border-white/20
                  focus:border-cyan-400/50
                  focus:bg-white/10
                  focus:ring-2
                  focus:ring-cyan-400/10
                "
              />
            </div>

            {form.formState.errors.email?.message && (
              <p className="text-xs text-red-400">
                {form.formState.errors.email.message}
              </p>
            )}
          </div>

          {/* ================= PASSWORD ================= */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label
                htmlFor="password"
                className="text-sm font-medium text-white/75"
              >
                Password
              </Label>

              <Link
                href="/forgot-password"
                className="
                  text-xs
                  font-medium
                  text-cyan-400
                  transition-colors
                  hover:text-cyan-300
                "
              >
                Forgot password?
              </Link>
            </div>

            <div className="group relative">
              <Lock
                className="
                  absolute
                  left-3
                  top-1/2
                  z-10
                  h-4
                  w-4
                  -translate-y-1/2
                  text-white/30
                  transition-colors
                  group-focus-within:text-cyan-400
                "
              />

              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                {...form.register("password")}
                className="
                  h-12
                  border-white/10
                  bg-black/20
                  pl-10
                  text-white
                  placeholder:text-white/25
                  backdrop-blur-xl
                  transition-all
                  hover:border-white/20
                  focus:border-cyan-400/50
                  focus:bg-white/10
                  focus:ring-2
                  focus:ring-cyan-400/10
                "
              />
            </div>

            {form.formState.errors.password?.message && (
              <p className="text-xs text-red-400">
                {form.formState.errors.password.message}
              </p>
            )}
          </div>

          {/* ================= SUBMIT BUTTON ================= */}
          <Button
            type="submit"
            disabled={loginMutation.isPending}
            className="
              group
              h-12
              w-full
              border-0
              bg-gradient-to-r
              from-cyan-400
              via-blue-500
              to-violet-600
              font-bold
              text-white
              transition-all
              duration-300
              hover:scale-[1.02]
              disabled:hover:scale-100
            "
          >
            {loginMutation.isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Signing In...
              </>
            ) : (
              <>
                Sign In

                <ArrowRight
                  className="
                    ml-2
                    h-4
                    w-4
                    transition-transform
                    duration-300
                    group-hover:translate-x-1
                  "
                />
              </>
            )}
          </Button>

          {/* ================= REGISTER ================= */}
          <p className="pt-2 text-center text-sm text-white/40">
            Don&apos;t have an account?{" "}

            <Link
              href="/register"
              className="
                font-semibold
                text-cyan-400
                transition-colors
                hover:text-cyan-300
                hover:underline
              "
            >
              Create Account
            </Link>
          </p>
        </form>
      </div>
    </main>
  );
}