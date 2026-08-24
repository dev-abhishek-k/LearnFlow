import {asyncHandler} from "@/lib/async-handler";
import { courseController } from "@/modules/course";

export const PATCH=asyncHandler(async(request,context)=>{
     const {courseId}=await context.params
    return courseController.updateCourse(courseId,request);
})

export const DELETE=asyncHandler(async(request,context)=>{
     const {courseId}=await context.params
    return courseController.deleteCourse(courseId); 
})
