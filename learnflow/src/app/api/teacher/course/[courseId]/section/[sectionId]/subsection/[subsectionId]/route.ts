import { asyncHandler } from "@/lib/async-handler";
import { subsectionController } from "@/modules/subsection/index"

export const POST=asyncHandler(async(request,context)=>{
    const {sectionId}=await context.params
    return subsectionController.updateSubSection(sectionId,request); 
})
export const DELETE=asyncHandler(async(request,context)=>{
        const {sectionId}=await context.params
        return subsectionController.deleteSubSection(sectionId);
})