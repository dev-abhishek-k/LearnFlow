"use client";

import Link from "next/link";
import { Loader2, User, Mail, Lock, GraduationCap } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  registerSchema,
  RegisterInput,
} from "@/modules/auth/auth.validation";

import { useRegister } from "@/modules/auth/hooks/use-register";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

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
      await registerMutation.mutateAsync(data);
      form.reset();
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <Card className="w-full max-w-md rounded-3xl border-0 shadow-2xl">
      <CardHeader className="space-y-4 text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-r from-indigo-600 to-violet-600">
          <GraduationCap className="h-8 w-8 text-white" />
        </div>

        <div>
          <CardTitle className="text-3xl font-bold">
            Create Account
          </CardTitle>

          <CardDescription className="mt-2">
            Join LearnFlow and start your learning journey.
          </CardDescription>
        </div>
      </CardHeader>

      <CardContent>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-5"
        >
          {/* Name */}
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>

            <div className="relative">
              <User className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />

              <Input
                id="name"
                placeholder="John Doe"
                {...form.register("name")}
                className="h-11 pl-10"
              />
            </div>

            <p className="text-sm text-red-500">
              {form.formState.errors.name?.message}
            </p>
          </div>

          {/* Email */}
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>

            <div className="relative">
              <Mail className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />

              <Input
                id="email"
                type="email"
                placeholder="john@example.com"
                {...form.register("email")}
                className="h-11 pl-10"
              />
            </div>

            <p className="text-sm text-red-500">
              {form.formState.errors.email?.message}
            </p>
          </div>

          {/* Password */}
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>

            <div className="relative">
              <Lock className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />

              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                {...form.register("password")}
                className="h-11 pl-10"
              />
            </div>

            <p className="text-sm text-red-500">
              {form.formState.errors.password?.message}
            </p>
          </div>

          <Button
            type="submit"
            className="h-11 w-full bg-gradient-to-r from-indigo-600 to-violet-600"
            disabled={registerMutation.isPending}
          >
            {registerMutation.isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Creating Account...
              </>
            ) : (
              "Create Account"
            )}
          </Button>

          <p className="text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link
              href="/login"
              className="font-medium text-indigo-600 hover:underline"
            >
              Sign In
            </Link>
          </p>
        </form>
      </CardContent>
    </Card>
  );
}