import { asyncHandler } from "@/lib/async-handler";
import { ApiResponse } from "@/lib/api-response";
import { validateRequest } from "@/lib/validator";
import { lessonService } from "@/modules/lesson/lesson.service";
import { updateLessonSchema } from "@/modules/lesson/lesson.schema";

export const PATCH = asyncHandler(async (request, context) => {
  const { courseId, sectionId, subsectionId, lessonId } = await context.params;
  const body = await validateRequest(request, updateLessonSchema);
  return ApiResponse.ok("Lesson updated", await lessonService.update(courseId, sectionId, subsectionId, lessonId, body));
});

export const DELETE = asyncHandler(async (_request, context) => {
  const { courseId, sectionId, subsectionId, lessonId } = await context.params;
  return ApiResponse.ok("Lesson deleted", await lessonService.delete(courseId, sectionId, subsectionId, lessonId));
});
