"use client";

import Link from "next/link";
import { BookOpen, ListTree, Pencil, Trash2 } from "lucide-react";
import type { Course } from "../api/course-api";

interface Props {
  courses: Course[];
  categories: Map<string, string>;
  onDelete: (id: string) => void;
  deletingId?: string;
}

export default function CourseList({ courses, categories, onDelete, deletingId }: Props) {
  return <section className="space-y-5">
    <div className="flex items-center gap-3"><BookOpen className="h-6 w-6 text-cyan-400" /><div><h2 className="text-xl font-bold text-white">My Courses</h2><p className="text-sm text-white/40">Manage your courses</p></div></div>
    <div className="overflow-x-auto rounded-2xl border border-white/10 bg-white/[0.04]">
      <table className="w-full text-left text-sm text-white"><thead className="border-b border-white/10 text-white/70"><tr><th className="px-6 py-4">Title</th><th className="px-6 py-4">Category</th><th className="px-6 py-4">Level</th><th className="px-6 py-4">Status</th><th className="px-6 py-4 text-right">Actions</th></tr></thead>
        <tbody className="divide-y divide-white/10">{courses.length ? courses.map(course => <tr key={course.id}>
          <td className="px-6 py-4 font-medium">{course.title}</td><td className="px-6 py-4 text-white/60">{categories.get(course.categoryId) ?? "—"}</td><td className="px-6 py-4 text-white/60">{course.level}</td><td className="px-6 py-4 text-cyan-400">{course.status}</td>
          <td className="px-6 py-4"><div className="flex justify-end gap-2"><Link href={`/teacher/courses/${course.id}/edit`} aria-label={`Edit ${course.title}`} className="rounded-lg p-2 text-cyan-400 hover:bg-white/10"><Pencil className="h-4 w-4" /></Link><Link href={`/teacher/courses/${course.id}/curriculum`} aria-label={`Curriculum for ${course.title}`} className="rounded-lg p-2 text-cyan-400 hover:bg-white/10"><ListTree className="h-4 w-4" /></Link><button onClick={() => onDelete(course.id)} disabled={deletingId === course.id} aria-label={`Delete ${course.title}`} className="rounded-lg p-2 text-red-400 hover:bg-red-400/10 disabled:opacity-50"><Trash2 className="h-4 w-4" /></button></div></td>
        </tr>) : <tr><td colSpan={5} className="px-6 py-10 text-center text-white/40">No courses yet. <Link href="/teacher/courses/create" className="text-cyan-400 hover:underline">Create your first course</Link>.</td></tr>}</tbody>
      </table>
    </div>
  </section>;
}
