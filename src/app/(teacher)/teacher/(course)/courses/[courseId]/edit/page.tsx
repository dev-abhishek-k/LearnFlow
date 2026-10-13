"use client";

import Link from "next/link";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import CourseForm from "@/modules/course/components/course-form";
import { useCourse, useUpdateCourse } from "@/modules/course/hooks/use-courses";
import CourseSteps from "@/modules/course/components/course-steps";

export default function EditCoursePage() {
  const { courseId } = useParams<{ courseId: string }>();
  const router = useRouter();
  const searchParams = useSearchParams();
  const course = useCourse(courseId);
  const update = useUpdateCourse(courseId);

  return (
    <main className="mx-auto max-w-4xl space-y-8 px-6 py-10 text-white">
      <div className="flex items-center justify-between gap-4">
        <div><p className="text-sm text-cyan-400">Teaching</p><h1 className="mt-2 text-3xl font-bold">Edit Course</h1></div>
        <Link href={`/teacher/courses/${courseId}/curriculum`} className="text-cyan-400 hover:underline">Edit curriculum</Link>
      </div>
      {searchParams.get("returnTo") === "curriculum" && <CourseSteps current={0} courseId={courseId} />}
      {course.isLoading && <p>Loading course...</p>}
      {course.isError && <p role="alert" className="text-red-400">{course.error.message}</p>}
      {course.data && <CourseForm initialData={course.data} isPending={update.isPending} error={update.error?.message} onSubmit={data => update.mutate(data, { onSuccess: () => router.push(searchParams.get("returnTo") === "curriculum" ? `/teacher/courses/${courseId}/curriculum?step=sections` : "/teacher/courses") })} />}
    </main>
  );
}
