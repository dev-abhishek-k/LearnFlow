"use client";

import Link from "next/link";
import { ArrowUpRight, BookOpen, ListTree, Pencil, Trash2 } from "lucide-react";
import type { Course } from "../api/course-api";

interface Props {
  courses: Course[];
  categories: Map<string, string>;
  onDelete: (id: string) => void;
  deletingId?: string;
}

export default function CourseList({ courses, categories, onDelete, deletingId }: Props) {
  return <section className="space-y-5">
    <div className="flex items-center gap-3">
      <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-cyan-400/20 bg-cyan-400/10"><BookOpen className="h-5 w-5 text-cyan-300" /></div>
      <div><h2 className="text-xl font-bold text-white">My Courses</h2><p className="text-sm text-white/50">{courses.length} {courses.length === 1 ? "course" : "courses"} in your library</p></div>
    </div>

    {courses.length ? <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
      {courses.map(course => {
        const category = categories.get(course.categoryId) ?? "Course";
        const isPublished = course.status === "PUBLISHED";
        const price = Number(course.price);
        return <article key={course.id} className="group flex min-w-0 flex-col overflow-hidden rounded-[22px] border border-white/10 bg-white/[0.05] shadow-lg shadow-black/10 transition-colors hover:border-cyan-400/30 hover:bg-white/[0.07]">
          <div className="relative h-44 overflow-hidden bg-gradient-to-br from-cyan-950 via-slate-900 to-violet-950">
            {course.thumbnailUrl || course.thumbnail ? (
              // Teacher supplied thumbnail hosts are dynamic.
              // eslint-disable-next-line @next/next/no-img-element
              <img src={course.thumbnailUrl || course.thumbnail || ""} alt="" className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]" />
            ) : <div className="flex h-full items-center justify-center"><BookOpen className="h-16 w-16 text-cyan-200/20" /></div>}
            <span className={`absolute right-4 top-4 rounded-full border px-3 py-1 text-xs font-semibold backdrop-blur-md ${isPublished ? "border-emerald-300/30 bg-emerald-400/20 text-emerald-100" : "border-amber-300/30 bg-amber-400/20 text-amber-100"}`}>{isPublished ? "Published" : course.status === "ARCHIVED" ? "Archived" : "Draft"}</span>
          </div>
          <div className="flex flex-1 flex-col p-5">
            <div className="flex items-center gap-2 text-xs font-medium text-cyan-300"><span>{category}</span><span className="text-white/30">•</span><span className="capitalize text-white/55">{course.level.toLowerCase()}</span></div>
            <h3 className="mt-3 line-clamp-2 text-lg font-semibold leading-snug text-white">{course.title}</h3>
            <p className="mt-2 line-clamp-2 min-h-10 text-sm leading-5 text-white/55">{course.shortDescription || course.description}</p>
            <div className="mt-5 flex items-center justify-between border-t border-white/10 pt-4"><span className="text-sm font-semibold text-white">{price === 0 ? "Free" : `$${price.toFixed(2)}`}</span><Link href={`/teacher/courses/${course.id}/curriculum?step=sections`} className="inline-flex items-center gap-1 text-sm font-medium text-cyan-300 hover:text-cyan-200">Open course <ArrowUpRight className="h-4 w-4" /></Link></div>
            <div className="mt-4 grid grid-cols-[1fr_1fr_auto] gap-2">
              <Link href={`/teacher/courses/${course.id}/edit`} className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/15 px-3 py-2 text-sm text-white/75 hover:bg-white/10"><Pencil className="h-4 w-4" />Edit</Link>
              <Link href={`/teacher/courses/${course.id}/curriculum?step=sections`} className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/15 px-3 py-2 text-sm text-white/75 hover:bg-white/10"><ListTree className="h-4 w-4" />Curriculum</Link>
              <button type="button" onClick={() => onDelete(course.id)} disabled={deletingId === course.id} aria-label={`Delete ${course.title}`} title="Delete course" className="inline-flex items-center justify-center rounded-lg border border-red-400/20 px-3 py-2 text-red-300 hover:bg-red-400/10 disabled:opacity-50"><Trash2 className="h-4 w-4" /></button>
            </div>
          </div>
        </article>;
      })}
    </div> : <div className="rounded-[22px] border border-dashed border-white/15 bg-white/[0.04] px-6 py-14 text-center"><BookOpen className="mx-auto h-10 w-10 text-cyan-300/50" /><h3 className="mt-4 text-lg font-semibold text-white">Your course library is empty</h3><p className="mt-2 text-sm text-white/50">Create a course, then add sections and subsections.</p><Link href="/teacher/courses/create" className="mt-6 inline-flex rounded-lg bg-cyan-400 px-5 py-2.5 text-sm font-semibold text-slate-950 hover:bg-cyan-300">Create your first course</Link></div>}
  </section>;
}
