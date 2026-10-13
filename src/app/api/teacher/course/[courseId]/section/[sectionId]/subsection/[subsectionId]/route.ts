import { asyncHandler } from "@/lib/async-handler";
import { subsectionController } from "@/modules/subsection/index"

export const PATCH=asyncHandler(async(request,context)=>{
    const {courseId,sectionId,subsectionId}=await context.params
    return subsectionController.updateSubSection(courseId,sectionId,subsectionId,request);
})
export const DELETE=asyncHandler(async(request,context)=>{
        const {courseId,sectionId,subsectionId}=await context.params
        return subsectionController.deleteSubSection(courseId,sectionId,subsectionId);
})
