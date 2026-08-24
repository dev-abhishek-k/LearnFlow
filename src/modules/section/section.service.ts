import { ApiError } from "@/lib/api-error";
import { HTTP_STATUS } from "@/lib/http-status";   
import { sectionRepository } from "./index";
import { courseRepository } from "@/modules/course/index";
import { Prisma } from "@/generated/prisma/client";
import { SECTION_MESSAGES } from "@/modules/section/index";
import {getCurrentUserPayload} from "@/lib/auth/current_user";
class SectionService{
    async createSection(data:Prisma.SectionUncheckedCreateInput){
        const user= await getCurrentUserPayload();
        const course= await courseRepository.getCourseById(data.courseId);
        if(!course){throw new ApiError(SECTION_MESSAGES.COURSE_NOT_CREATED,HTTP_STATUS.NOT_FOUND)}
        if(course.teacherId!==user.id){throw new ApiError("forbidden",HTTP_STATUS.FORBIDDEN)}    
        return await sectionRepository.createSection(data)

    }
   async getAllSection(){
        return await sectionRepository.getAllSection()
    }
    async getSectionById(id:string){
        const section= await sectionRepository.getSectionById(id); 
           if(!section){throw new ApiError(SECTION_MESSAGES.SECTION_NOT_FOUND ,HTTP_STATUS.NOT_FOUND)}
        return section
    }
    async updateSection(id:string,data:Prisma.SectionUpdateInput){
        return await sectionRepository.updateSection(id,data)
    }
    async deleteSection(id:string){
        return await sectionRepository.deleteSection(id)
    }
}
export const sectionService = new SectionService