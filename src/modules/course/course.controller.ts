import {COURSE_MESSAGES} from "./index";
import {ApiResponse} from "@/lib/api-response";
import {NextRequest} from "next/server";
import { validateRequest } from "@/lib/validator";
import {createCourseSchema,updateCourseSchema,} from "./index"
import {courseService} from './index'
import {getCurrentTeacherPayload} from "@/lib/auth/current_user";
class CourseController{
   async createCourse(request:NextRequest){
      const payload=await getCurrentTeacherPayload();
       const body=await validateRequest(request,createCourseSchema);
       const teacherId=payload.id;
       const course=await courseService.createCourse(body,teacherId );
       return ApiResponse.ok(COURSE_MESSAGES.COURSE_CREATED,course);
   }
   async getAllCourse(){
       const payload=await getCurrentTeacherPayload();
       const course=await courseService.getAllCourse(payload.id);
       return ApiResponse.ok(COURSE_MESSAGES.COURSE_FETCHED,course);
   }
   async getCourse(courseId:string){
       const payload=await getCurrentTeacherPayload();
       const course=await courseService.getOwnedCourse(courseId,payload.id);
       return ApiResponse.ok(COURSE_MESSAGES.COURSE_FETCHED,course);
   }
   async updateCourse(courseId:string,request:NextRequest){
       const payload=await getCurrentTeacherPayload();
       const body=await validateRequest(request,updateCourseSchema);
       const course=await courseService.updateCourse(courseId,payload.id,body);
       return ApiResponse.ok(COURSE_MESSAGES.COURSE_UPDATED,course);
   }
   async deleteCourse(courseId:string){
       const payload=await getCurrentTeacherPayload();
       const course=await courseService.deleteCourse(courseId,payload.id);
       return ApiResponse.ok(COURSE_MESSAGES.COURSE_DELETED,course);    
   }
}
export const courseController = new CourseController();
