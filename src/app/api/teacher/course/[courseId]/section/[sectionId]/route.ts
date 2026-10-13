import {sectionController} from "@/modules/section/index";
import { asyncHandler } from "@/lib/async-handler";

export const PATCH=asyncHandler(async(request,context)=>{
    const {courseId,sectionId}=await context.params
    return sectionController.updateSection(courseId,sectionId,request);
})

export const DELETE=asyncHandler(async(request,context)=>{
    const {courseId,sectionId}=await context.params
    return sectionController.deleteSection(courseId,sectionId);
})

