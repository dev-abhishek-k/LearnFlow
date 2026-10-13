import { asyncHandler } from "@/lib/async-handler";
import { subsectionController } from "@/modules/subsection";
import { subsectionService } from "@/modules/subsection/subsection.service";

export const GET = asyncHandler(async (_request, context) => {
  const { sectionId } = await context.params;
  const courseId = await subsectionService.courseIdForOwnedSection(sectionId);
  return subsectionController.getAllSubSection(courseId, sectionId);
});

export const POST = asyncHandler(async (request, context) => {
  const { sectionId } = await context.params;
  const courseId = await subsectionService.courseIdForOwnedSection(sectionId);
  return subsectionController.createSubSection(courseId, sectionId, request);
});
