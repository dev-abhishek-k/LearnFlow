import { asyncHandler } from "@/lib/async-handler";
import { subsectionController } from "@/modules/subsection/index"

export const POST=asyncHandler(async(request,context)=>{
    const {courseId,sectionId}=await context.params;
    return subsectionController.createSubSection(courseId,sectionId,request);
})

export const GET=asyncHandler(async(_request,context)=>{
    const {courseId,sectionId}=await context.params;
    return subsectionController.getAllSubSection(courseId,sectionId);
})
