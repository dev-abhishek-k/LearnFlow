import { ApiError } from "@/lib/api-error";
import { HTTP_STATUS } from "@/lib/http-status";   
import { sectionRepository } from "./index";
import { SECTION_MESSAGES } from "@/modules/section/index";
import {getCurrentTeacherPayload} from "@/lib/auth/current_user";
import { courseService } from "@/modules/course";
import type { CreateSectionSchema, UpdateSectionSchema } from "./section.schema";
import { Prisma } from "@/generated/prisma/client";
class SectionService{
    async createSection(courseId:string,data:CreateSectionSchema){
        const user= await getCurrentTeacherPayload();
        await courseService.getOwnedCourse(courseId,user.id);
        for (let attempt = 0; attempt < 5; attempt++) {
            const position = (await sectionRepository.maxPosition(courseId)) + 1;
            try {
                return await sectionRepository.createSection({...data,courseId,order:position,position});
            } catch (error) {
                if (!(error instanceof Prisma.PrismaClientKnownRequestError) || error.code !== "P2002") throw error;
            }
        }
        throw new ApiError("Could not assign section position. Please retry.", HTTP_STATUS.CONFLICT);

    }
   async getAllSection(courseId:string){
        const user=await getCurrentTeacherPayload();
        await courseService.getOwnedCourse(courseId,user.id);
        return await sectionRepository.getAllSection(courseId)
    }
    async getSectionById(id:string){
        const section= await sectionRepository.getSectionById(id); 
           if(!section){throw new ApiError(SECTION_MESSAGES.SECTION_NOT_FOUND ,HTTP_STATUS.NOT_FOUND)}
        return section
    }
    async updateSection(courseId:string,id:string,data:UpdateSectionSchema){
        await this.requireOwnedSection(courseId,id);
        return await sectionRepository.updateSection(id,data)
    }
    async deleteSection(courseId:string,id:string){
        await this.requireOwnedSection(courseId,id);
        return await sectionRepository.deleteSection(id)
    }
    async requireOwnedSection(courseId:string,id:string){
        const user=await getCurrentTeacherPayload();
        await courseService.getOwnedCourse(courseId,user.id);
        const section=await sectionRepository.getSectionById(id);
        if(!section || section.courseId !== courseId) throw new ApiError(SECTION_MESSAGES.SECTION_NOT_FOUND,HTTP_STATUS.NOT_FOUND);
        return section;
    }
}
export const sectionService = new SectionService
