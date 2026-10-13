"use client";

import { useRouter } from "next/navigation";
import CourseForm from "@/modules/course/components/course-form";
import { useCreateCourse } from "@/modules/course/hooks/use-courses";
import CourseSteps from "@/modules/course/components/course-steps";

export default function CreateCoursePage() {
  const router = useRouter();
  const creation = useCreateCourse();
  return <main className="mx-auto max-w-4xl space-y-8 px-6 py-10"><div><p className="text-sm font-medium text-cyan-400">Teaching</p><h1 className="mt-2 text-3xl font-bold text-white">Create course</h1><p className="mt-2 text-white/55">Start with the essentials. Your draft is saved before you add sections and subsections.</p></div><CourseSteps current={0} /><CourseForm isPending={creation.isPending} error={creation.error?.message} onSubmit={data => creation.mutate(data, { onSuccess: course => router.push(`/teacher/courses/${course.id}/curriculum?step=sections`) })} /></main>;
}
