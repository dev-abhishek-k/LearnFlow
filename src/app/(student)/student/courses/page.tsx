import { BookOpen } from "lucide-react";
import { getCurrentStudentPayload } from "@/lib/auth/current_user";
import { courseService } from "@/modules/course";

export default async function StudentCoursesPage() {
  await getCurrentStudentPayload();
  const courses = await courseService.getPublishedCourses();

  return (
    <section className="mx-auto max-w-7xl px-6 py-10">
      <h1 className="text-3xl font-bold text-white">Courses</h1>
      <p className="mt-2 text-white/50">Explore all published courses.</p>
      {courses.length === 0 ? (
        <p className="mt-10 text-white/50">No courses are available yet.</p>
      ) : (
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {courses.map((course) => (
            <article key={course.id} className="overflow-hidden rounded-2xl border border-white/15 bg-white/[0.06]">
              <div className="flex h-40 items-center justify-center bg-gradient-to-br from-cyan-500/20 to-violet-600/20">
                {course.thumbnail ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={course.thumbnail} alt="" className="h-full w-full object-cover" />
                ) : <BookOpen className="h-12 w-12 text-cyan-300/70" />}
              </div>
              <div className="space-y-3 p-5">
                <h2 className="text-xl font-semibold text-white">{course.title}</h2>
                <p className="line-clamp-3 text-sm text-white/55">{course.description}</p>
                <p className="border-t border-white/10 pt-3 font-semibold text-white">
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
