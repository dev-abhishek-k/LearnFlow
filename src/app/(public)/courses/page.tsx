import { BookOpen, Globe2, Layers3 } from "lucide-react";
import { prisma } from "@/lib/prisma";

export default async function CoursesPage() {
  const courses = await prisma.course.findMany({
    where: { status: "PUBLISHED" },
    include: { category: { select: { name: true } } },
    orderBy: { createdAt: "desc" },
  });

  return (
    <section className="mx-auto max-w-7xl px-6 py-12 sm:py-16">
      <div className="mb-10">
        <p className="text-sm font-semibold text-cyan-400">Explore LearnFlow</p>
        <h1 className="mt-2 text-4xl font-bold text-white">Courses</h1>
        <p className="mt-3 max-w-2xl text-white/50">Find a course that helps you learn something new.</p>
      </div>

      {courses.length === 0 ? (
        <div className="rounded-[28px] border border-white/15 bg-white/[0.06] px-6 py-16 text-center backdrop-blur-2xl">
          <BookOpen className="mx-auto mb-4 h-10 w-10 text-cyan-400" />
          <h2 className="text-xl font-semibold text-white">Courses are coming soon</h2>
          <p className="mt-2 text-white/50">Check back for new courses.</p>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {courses.map((course) => (
            <article key={course.id} className="overflow-hidden rounded-[24px] border border-white/15 bg-white/[0.06] backdrop-blur-2xl">
              <div className="flex h-44 items-center justify-center bg-gradient-to-br from-cyan-500/20 via-blue-600/20 to-violet-600/20">
                {course.thumbnail ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={course.thumbnail} alt="" className="h-full w-full object-cover" />
                ) : (
                  <BookOpen className="h-12 w-12 text-cyan-300/70" />
                )}
              </div>
              <div className="space-y-4 p-6">
                <p className="text-xs font-semibold uppercase tracking-wide text-cyan-400">{course.category.name}</p>
                <h2 className="text-xl font-bold text-white">{course.title}</h2>
                <p className="line-clamp-3 text-sm text-white/55">{course.description}</p>
                <div className="flex flex-wrap gap-4 text-xs text-white/45">
                  <span className="inline-flex items-center gap-1"><Layers3 className="h-4 w-4" />{course.level}</span>
                  <span className="inline-flex items-center gap-1"><Globe2 className="h-4 w-4" />{course.language}</span>
                </div>
                <p className="border-t border-white/10 pt-4 text-lg font-semibold text-white">
                  {Number(course.price) === 0 ? "Free" : `₹${Number(course.price).toLocaleString("en-IN")}`}
                </p>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
