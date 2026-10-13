"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { useCategories } from "@/modules/category/hooks/use-categories";
import { createCourseSchema, type CreateCourseInput } from "@/modules/course/course.schema";
import type { Course } from "@/modules/course/api/course-api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface Props {
  onSubmit: (data: CreateCourseInput) => void;
  isPending?: boolean;
  error?: string;
  initialData?: Course;
}

const fieldStyle = "h-11 border-white/10 bg-black/20 text-white placeholder:text-white/25 focus:border-cyan-400/50";

export default function CourseForm({ onSubmit, isPending, error, initialData }: Props) {
  const categories = useCategories();
  const form = useForm<CreateCourseInput>({
    resolver: zodResolver(createCourseSchema),
    defaultValues: {
      title: initialData?.title ?? "", description: initialData?.description ?? "",
      price: initialData ? Number(initialData.price) : 0, level: initialData?.level ?? "BEGINNER",
      language: initialData?.language ?? "English", categoryId: initialData?.categoryId ?? "",
      thumbnail: initialData?.thumbnail ?? undefined,
    },
  });

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="relative space-y-6 overflow-hidden rounded-[28px] border border-white/15 bg-white/[0.06] p-6 text-white backdrop-blur-2xl sm:p-8">
      <div className="pointer-events-none absolute -right-20 -top-20 h-40 w-40 rounded-full bg-cyan-500/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-20 -left-20 h-40 w-40 rounded-full bg-violet-600/20 blur-3xl" />
      <div className="relative grid gap-5 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="course-title" className="text-white/75">Course title</Label>
          <Input id="course-title" placeholder="e.g. Web Development Fundamentals" className={fieldStyle} {...form.register("title")} />
          {form.formState.errors.title && <p className="text-xs text-red-400">{form.formState.errors.title.message}</p>}
        </div>
        <div className="space-y-2">
          <Label htmlFor="course-category" className="text-white/75">Category</Label>
          <select id="course-category" className={`${fieldStyle} w-full rounded-lg border px-3`} disabled={categories.isLoading || categories.isError} {...form.register("categoryId")}>
            <option value="" className="bg-slate-900">Select category</option>
            {categories.data?.map(category => <option key={category.id} value={category.id} className="bg-slate-900">{category.name}</option>)}
          </select>
          {form.formState.errors.categoryId && <p className="text-xs text-red-400">Select a category.</p>}
        </div>
        <div className="space-y-2">
          <Label htmlFor="course-price" className="text-white/75">Price</Label>
          <Input id="course-price" type="number" min="0" step="0.01" className={fieldStyle} {...form.register("price", { valueAsNumber: true })} />
          {form.formState.errors.price && <p className="text-xs text-red-400">{form.formState.errors.price.message}</p>}
        </div>
        <div className="space-y-2">
          <Label htmlFor="course-level" className="text-white/75">Level</Label>
          <select id="course-level" className={`${fieldStyle} w-full rounded-lg border px-3`} {...form.register("level")}>
            <option value="BEGINNER" className="bg-slate-900">Beginner</option>
            <option value="INTERMEDIATE" className="bg-slate-900">Intermediate</option>
            <option value="ADVANCED" className="bg-slate-900">Advanced</option>
          </select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="course-language" className="text-white/75">Language</Label>
          <Input id="course-language" className={fieldStyle} {...form.register("language")} />
          {form.formState.errors.language && <p className="text-xs text-red-400">{form.formState.errors.language.message}</p>}
        </div>
        <div className="space-y-2">
          <Label htmlFor="course-thumbnail" className="text-white/75">Thumbnail URL (optional)</Label>
          <Input id="course-thumbnail" type="url" placeholder="https://..." className={fieldStyle} {...form.register("thumbnail", { setValueAs: value => value || undefined })} />
          {form.formState.errors.thumbnail && <p className="text-xs text-red-400">{form.formState.errors.thumbnail.message}</p>}
        </div>
        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="course-description" className="text-white/75">Description</Label>
          <textarea id="course-description" rows={5} placeholder="What will students learn?" className={`${fieldStyle} w-full rounded-lg border px-3 py-3 outline-none`} {...form.register("description")} />
          {form.formState.errors.description && <p className="text-xs text-red-400">{form.formState.errors.description.message}</p>}
        </div>
      </div>
      {categories.isError && <p role="alert" className="text-sm text-red-400">Could not load categories: {categories.error.message}</p>}
      {categories.data?.length === 0 && <p className="text-sm text-white/50">No categories are available yet.</p>}
      {error && <p role="alert" className="text-sm text-red-400">{error}</p>}
      <Button type="submit" disabled={isPending || categories.isLoading || categories.isError || !categories.data?.length} className="relative h-11 bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-600 px-6 font-semibold text-white">
        {isPending ? <><Loader2 className="mr-2 animate-spin" />Saving...</> : <>{initialData ? "Save Course" : "Save and continue"}<ArrowRight className="ml-2" /></>}
      </Button>
    </form>
  );
}
