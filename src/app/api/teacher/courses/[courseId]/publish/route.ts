import { asyncHandler } from "@/lib/async-handler";
import { getCurrentTeacherPayload } from "@/lib/auth/current_user";
import { ApiError } from "@/lib/api-error";
import { ApiResponse } from "@/lib/api-response";
import { HTTP_STATUS } from "@/lib/http-status";
import { prisma } from "@/lib/prisma";
import { courseService } from "@/modules/course/course.services";

export const PATCH = asyncHandler(async (_request, context) => {
  const { courseId } = await context.params;
  const teacher = await getCurrentTeacherPayload();
  const course = await courseService.getOwnedCourse(courseId, teacher.id);
  const sections = await prisma.section.findMany({
    where: { courseId },
    select: { id: true, _count: { select: { subSections: true } } },
  });
  if (!course.title.trim() || !course.description.trim() || !course.categoryId ||
      !sections.length || sections.some(section => section._count.subSections === 0)) {
    throw new ApiError("Add course details and at least one subsection to every section before publishing", HTTP_STATUS.BAD_REQUEST);
  }
  const category = await prisma.category.findUnique({ where: { id: course.categoryId }, select: { isActive: true } });
  if (!category?.isActive) throw new ApiError("Choose an active category before publishing", HTTP_STATUS.BAD_REQUEST);
  const published = await prisma.course.update({ where: { id: courseId, teacherId: teacher.id }, data: { status: "PUBLISHED" } });
  return ApiResponse.ok("Course published", published);
});
