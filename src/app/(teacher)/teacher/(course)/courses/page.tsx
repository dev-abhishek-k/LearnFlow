"use client";

import Link from "next/link";
import CourseList from "@/modules/course/components/course-list";
import { useCourses, useDeleteCourse } from "@/modules/course/hooks/use-courses";
import { useCategories } from "@/modules/category/hooks/use-categories";

export default function CoursesPage() {
  const courses = useCourses();
  const categories = useCategories();
  const deletion = useDeleteCourse();
  const categoryNames = new Map(categories.data?.map(category => [category.id, category.name]) ?? []);
  return <main className="mx-auto max-w-7xl space-y-8 px-6 py-10"><div className="flex flex-wrap items-center justify-between gap-4"><div><p className="text-sm font-medium text-cyan-400">Teaching</p><h1 className="mt-2 text-3xl font-bold text-white">Courses</h1><p className="mt-2 text-white/40">Create and manage your courses.</p></div><Link href="/teacher/courses/create" className="rounded-lg bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-600 px-5 py-2.5 font-semibold text-white">Create Course</Link></div>{courses.isLoading ? <p className="text-white/50">Loading courses...</p> : courses.isError ? <p className="text-red-400">{courses.error.message}</p> : <CourseList courses={courses.data ?? []} categories={categoryNames} onDelete={id => { if (window.confirm("Delete this course?")) deletion.mutate(id); }} deletingId={deletion.isPending ? deletion.variables : undefined} />}{deletion.isError && <p role="alert" className="text-red-400">{deletion.error.message}</p>}</main>;
}
