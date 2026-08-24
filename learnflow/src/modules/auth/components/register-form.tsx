"use client";

import Link from "next/link";
import {
  Loader2,
  User,
  Mail,
  Lock,
  ArrowRight,
  UserPlus,
} from "lucide-react";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import {
  registerSchema,
  RegisterInput,
} from "@/modules/auth/auth.validation";

import { useRegister } from "@/modules/auth/hooks/use-register";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export default function RegisterForm() {
  const registerMutation = useRegister();

  const form = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  async function onSubmit(data: RegisterInput) {
    try {
      const result = await registerMutation.mutateAsync(data);

      form.reset();

      toast.success(
        result.message || "Registration successful!"
      );
    } catch (error) {
      console.error(error);

      toast.error(
        error instanceof Error
          ? error.message
          : "Registration failed"
      );
    }
  }

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden  text-white">

      {/* ================= BACKGROUND ================= */}
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

      {/* ================= REGISTER CARD ================= */}
      <div
        className="
          relative
          z-10
          w-full
          max-w-xl
          overflow-hidden
          rounded-[28px]
          border
          border-white/15
          bg-white/[0.06]
          px-8
          py-6
          backdrop-blur-2xl
          sm:px-10
          sm:py-7
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
        <div className="relative mb-6 text-center">

          {/* Register Icon */}
          <div
            className="
              mx-auto
              mb-3
              flex
              h-12
              w-12
              items-center
              justify-center
              rounded-2xl
              bg-gradient-to-br
              from-cyan-400
              via-blue-500
              to-violet-600
            "
          >
            <UserPlus className="h-5 w-5 text-white" />
          </div>

          <h1 className="text-3xl font-bold text-white">
            Create Account
          </h1>

          <p className="mt-2 text-sm text-white/45">
            Create your LearnFlow account and start learning.
          </p>
        </div>

        {/* ================= FORM ================= */}
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="relative space-y-4"
        >

          {/* ================= NAME ================= */}
          <div className="space-y-2">
            <Label
              htmlFor="name"
              className="text-sm font-medium text-white/75"
            >
              Full Name
            </Label>

            <div className="group relative">
              <User
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
                id="name"
                placeholder="Enter your full name"
                {...form.register("name")}
                className="
                  h-11
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

            {form.formState.errors.name?.message && (
              <p className="text-xs text-red-400">
                {form.formState.errors.name.message}
              </p>
            )}
          </div>

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
                  h-11
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
            <Label
              htmlFor="password"
              className="text-sm font-medium text-white/75"
            >
              Password
            </Label>

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
                placeholder="Create a strong password"
                {...form.register("password")}
                className="
                  h-11
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

          {/* ================= SUBMIT ================= */}
          <Button
            type="submit"
            disabled={registerMutation.isPending}
            className="
              group
              h-11
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
            {registerMutation.isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Creating Account...
              </>
            ) : (
              <>
                Create Account

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

          {/* ================= LOGIN ================= */}
          <p className="pt-1 text-center text-sm text-white/40">
            Already have an account?{" "}

            <Link
              href="/login"
              className="
                font-semibold
                text-cyan-400
                transition-colors
                hover:text-cyan-300
                hover:underline
              "
            >
              Sign In
            </Link>
          </p>

        </form>
      </div>
    </main>
  );
}