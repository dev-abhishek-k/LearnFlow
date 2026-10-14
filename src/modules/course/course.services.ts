import { ApiError } from "@/lib/api-error";
import { HTTP_STATUS } from "@/lib/http-status";
import { courseRepository, CreateCourseInput, UpdateCourseInput } from "./index";
import { categoryRepository } from "@/modules/category";
import { Course } from "@/generated/prisma/client"; 
import { COURSE_MESSAGES } from "./index";
import{generateSlug} from "@/lib/slug"
import { Prisma } from "@/generated/prisma/client";
class CourseService{
    async createCourse(data:CreateCourseInput,teacherId:string):Promise<Course>{
        await this.requireActiveCategory(data.categoryId);
        const slug = generateSlug(data.title);
        const existingCourse = await courseRepository.getCourseFindBySlug(slug);
        if (existingCourse) {
          throw new ApiError(COURSE_MESSAGES.COURSE_ALREADY_EXISTS, HTTP_STATUS.CONFLICT);
        }
        return courseRepository.createCourse({...data,slug,
            teacherId,
            price:new Prisma.Decimal(data.price),
        });
    }
    async getAllCourse(teacherId:string):Promise<Course[]>{
        return courseRepository.getAllCourse(teacherId);
    }
    async getPublishedCourses():Promise<Course[]>{
        return courseRepository.getPublishedCourses();
    }
    async getOwnedCourse(courseId:string,teacherId:string):Promise<Course>{
        const course = await courseRepository.getCourseById(courseId);
        if (!course) throw new ApiError(COURSE_MESSAGES.COURSE_NOT_FOUND, HTTP_STATUS.NOT_FOUND);
        if (course.teacherId !== teacherId) throw new ApiError("Forbidden", HTTP_STATUS.FORBIDDEN);
        return course;
    }
    async getCourseFindBySlug(slug:string):Promise<Course | null>{
        return courseRepository.getCourseFindBySlug(slug);
    }
    async updateCourse(courseId:string,teacherId:string,data:UpdateCourseInput){
        const current = await this.getOwnedCourse(courseId,teacherId);
        if (data.categoryId) await this.requireActiveCategory(data.categoryId);
        const slug = data.title && data.title !== current.title ? generateSlug(data.title) : undefined;
        if (slug && slug !== current.slug && await courseRepository.getCourseFindBySlug(slug)) {
            throw new ApiError(COURSE_MESSAGES.COURSE_ALREADY_EXISTS, HTTP_STATUS.CONFLICT);
        }
        return courseRepository.updateCourse(courseId,teacherId,{
            ...data, ...(slug ? {slug} : {}),
            ...(data.price !== undefined ? {price:new Prisma.Decimal(data.price)} : {}),
        });
    }
    async deleteCourse(courseId:string,teacherId:string){
        await this.getOwnedCourse(courseId,teacherId);
        return courseRepository.deleteCourse(courseId,teacherId);
    }
    private async requireActiveCategory(categoryId:string){
        const category = await categoryRepository.getCategoryById(categoryId);
        if (!category || !category.isActive) throw new ApiError("Invalid category", HTTP_STATUS.BAD_REQUEST);
    }
}

export const courseService = new CourseService();
