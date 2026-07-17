import {sectionController} from "@/modules/section/index";
import { asyncHandler } from "@/lib/async-handler";

export const POST=asyncHandler(async(request,context)=>{
    const {sectonId}=await context.params
    return sectionController.updateSection(sectonId,request); 
})

export const DELETE=asyncHandler(async(request,context)=>{
    const {sectonId}=await context.params
    return sectionController.deleteSection(sectonId); 
})

