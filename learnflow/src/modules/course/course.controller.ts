import { NextResponse } from "next/server";
import {COURSE_MESSAGES} from "./index";
import {ApiResponse} from "@/lib/api-response";
import {NextRequest} from "next/server";
import { validateRequest } from "@/lib/validator";
import {createCourseSchema,updateCourseSchema,} from "./index"
import {courseService} from './index'
class CourseController{
   async createCourse(request:NextRequest){
    const user=await request.json();
       const body=await validateRequest(request,createCourseSchema);
       const teacherId=user.id;
       const course=await courseService.createCourse(body,teacherId );
       return ApiResponse.ok(COURSE_MESSAGES.COURSE_CREATED,course);
   }
   async getAllCourse(){
       const course=await courseService.getAllCourse();
       return ApiResponse.ok(COURSE_MESSAGES.COURSE_FETCHED,course);
   }
   async updateCourse(id:string,request:NextRequest){
       const body=await validateRequest(request,updateCourseSchema);
       const course=await courseService.updateCourse(id,body);
       return ApiResponse.ok(COURSE_MESSAGES.COURSE_UPDATED,course);
   }
   async deleteCourse(id:string){
       const course=await courseService.deleteCourse(id);
       return ApiResponse.ok(COURSE_MESSAGES.COURSE_DELETED,course);    
   }
}
export const courseController = new CourseController();