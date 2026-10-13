import { asyncHandler } from "@/lib/async-handler";
import { ApiResponse } from "@/lib/api-response";
import { validateRequest } from "@/lib/validator";
import { lessonService } from "@/modules/lesson/lesson.service";
import { createLessonSchema } from "@/modules/lesson/lesson.schema";

export const GET = asyncHandler(async (_request, context) => {
  const { courseId, sectionId, subsectionId } = await context.params;
  return ApiResponse.ok("Lessons fetched", await lessonService.list(courseId, sectionId, subsectionId));
});

export const POST = asyncHandler(async (request, context) => {
  const { courseId, sectionId, subsectionId } = await context.params;
  const body = await validateRequest(request, createLessonSchema);
  return ApiResponse.ok("Lesson created", await lessonService.create(courseId, sectionId, subsectionId, body));
});
