import {asyncHandler} from "@/lib/async-handler";
import { courseController } from "@/modules/course";

export const PATCH=asyncHandler(async(request,context)=>{
     const {id}=await context.params
    return courseController.updateCourse(id,request);
})

export const DELETE=asyncHandler(async(request,context)=>{
     const {id}=await context.params
    return courseController.deleteCourse(id); 
})