import { asyncHandler } from "@/lib/async-handler";
import { subsectionController } from "@/modules/subsection/index"

export const POST=asyncHandler(async(request)=>{
    
    return subsectionController.createSubSection(request); 
})

export const GET=asyncHandler(async()=>{
    return subsectionController.getAllSubSection(); 
})