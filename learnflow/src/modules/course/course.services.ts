import { ApiError } from "@/lib/api-error";
import { HTTP_STATUS } from "@/lib/http-status";
import { courseRepository, CreateCourseInput } from "./index";
import { Course } from "@/generated/prisma/client"; 
import { COURSE_MESSAGES } from "./index";
import{generateSlug} from "@/lib/slug"
import { Prisma } from "@/generated/prisma/client";
class CourseService{
    async createCourse(data:CreateCourseInput,teacherId:string):Promise<Course>{
        const slug = generateSlug(data.title);
        const existingCourse = await courseRepository.getCourseFindBySlug(slug);
        if (existingCourse) {
          throw new ApiError(COURSE_MESSAGES.COURSE_ALREADY_EXISTS, HTTP_STATUS.CONFLICT);
        }
        return courseRepository.createCourse({...data,slug,
            teacherId,
            price:new Prisma.Decimal(data.price)});
    }
    async getAllCourse():Promise<Course[]>{
        return courseRepository.getAllCourse();
    }
    async getCourseFindBySlug(slug:string):Promise<Course | null>{
        return courseRepository.getCourseFindBySlug(slug);
    }
    async updateCourse(courseId:string,data:Prisma.CourseUpdateInput){
        return courseRepository.updateCourse(courseId,data);
    }
    async deleteCourse(courseId:string){
        return courseRepository.deleteCourse(courseId);
    }
}

export const courseService = new CourseService();