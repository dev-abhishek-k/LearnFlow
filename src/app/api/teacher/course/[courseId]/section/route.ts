import {sectionController} from "@/modules/section/index";

import {asyncHandler} from "@/lib/async-handler";

export const POST= asyncHandler(async(request,context)=>{
    const {courseId}=await context.params;
    return sectionController.createSection(courseId,request);
})

export const GET=asyncHandler(async(_request,context)=>{
    const {courseId}=await context.params;
    return sectionController.getAllSection(courseId);
})


