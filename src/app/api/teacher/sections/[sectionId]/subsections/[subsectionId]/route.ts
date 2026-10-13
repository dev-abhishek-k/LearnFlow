import { asyncHandler } from "@/lib/async-handler";
import { subsectionController } from "@/modules/subsection";
import { subsectionService } from "@/modules/subsection/subsection.service";

export const PATCH = asyncHandler(async (request, context) => {
  const { sectionId, subsectionId } = await context.params;
  const courseId = await subsectionService.courseIdForOwnedSection(sectionId);
  return subsectionController.updateSubSection(courseId, sectionId, subsectionId, request);
});

export const DELETE = asyncHandler(async (_request, context) => {
  const { sectionId, subsectionId } = await context.params;
  const courseId = await subsectionService.courseIdForOwnedSection(sectionId);
  return subsectionController.deleteSubSection(courseId, sectionId, subsectionId);
});
