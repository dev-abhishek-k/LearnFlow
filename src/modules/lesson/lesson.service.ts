import { prisma } from "@/lib/prisma";
import { getCurrentTeacherPayload } from "@/lib/auth/current_user";
import { ApiError } from "@/lib/api-error";
import { HTTP_STATUS } from "@/lib/http-status";
import type { CreateLessonInput } from "./lesson.schema";

async function requireSubsection(courseId: string, sectionId: string, subsectionId: string) {
  const teacher = await getCurrentTeacherPayload();
  const subsection = await prisma.subSection.findUnique({
    where: { id: subsectionId },
    include: { section: { include: { course: { select: { teacherId: true } } } } },
  });
  if (!subsection || subsection.sectionId !== sectionId || subsection.section.courseId !== courseId) {
    throw new ApiError("Subsection not found", HTTP_STATUS.NOT_FOUND);
  }
  if (subsection.section.course.teacherId !== teacher.id) {
    throw new ApiError("Forbidden", HTTP_STATUS.FORBIDDEN);
  }
}

async function requireLesson(courseId: string, sectionId: string, subsectionId: string, lessonId: string) {
  await requireSubsection(courseId, sectionId, subsectionId);
  const lesson = await prisma.lesson.findUnique({ where: { id: lessonId } });
  if (!lesson || lesson.subsectionId !== subsectionId) {
    throw new ApiError("Lesson not found", HTTP_STATUS.NOT_FOUND);
  }
  return lesson;
}

export const lessonService = {
  async list(courseId: string, sectionId: string, subsectionId: string) {
    await requireSubsection(courseId, sectionId, subsectionId);
    return prisma.lesson.findMany({ where: { subsectionId }, orderBy: { position: "asc" } });
  },
  async create(courseId: string, sectionId: string, subsectionId: string, data: CreateLessonInput) {
    await requireSubsection(courseId, sectionId, subsectionId);
    return prisma.lesson.create({ data: { ...data, subsectionId } });
  },
  async update(courseId: string, sectionId: string, subsectionId: string, lessonId: string, data: Partial<CreateLessonInput>) {
    await requireLesson(courseId, sectionId, subsectionId, lessonId);
    return prisma.lesson.update({ where: { id: lessonId }, data });
  },
  async delete(courseId: string, sectionId: string, subsectionId: string, lessonId: string) {
    await requireLesson(courseId, sectionId, subsectionId, lessonId);
    return prisma.lesson.delete({ where: { id: lessonId } });
  },
};
