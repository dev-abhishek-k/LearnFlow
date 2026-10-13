import { asyncHandler } from "@/lib/async-handler";
import { sectionController } from "@/modules/section";

export const GET = asyncHandler(async (_request, context) => {
  const { courseId } = await context.params;
  return sectionController.getAllSection(courseId);
});

export const POST = asyncHandler(async (request, context) => {
  const { courseId } = await context.params;
  return sectionController.createSection(courseId, request);
});
