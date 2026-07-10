import { asyncHandler } from "@/lib/async-handler";
import { courseController } from "@/modules/course";

export const POST=asyncHandler(async(request)=>{
    return courseController.createCourse(request); 
})

export const GET=asyncHandler(async()=>{
    return courseController.getAllCourse(); 
})