import { ApiError } from "@/lib/api-error";
import { HTTP_STATUS } from "@/lib/http-status";
import { subsectionRepository } from "@/modules/subsection/index";
import { sectionRepository } from "../section";
import type { CreateSubsectionSchema, UpdateSubsectionSchema } from "./subsection.schema";
import { getCurrentTeacherPayload } from "@/lib/auth/current_user";
import { Prisma } from "@/generated/prisma/client";

class SubSectionService {
    async createSubSection(courseId:string,sectionId:string,data: CreateSubsectionSchema) {
        await this.requireOwnedSection(courseId,sectionId);
        for (let attempt=0;attempt<5;attempt++) {
            const position=(await subsectionRepository.maxPosition(sectionId))+1;
            try {
                return await subsectionRepository.createSubSection({...data,sectionId,order:position,position});
            } catch(error) {
                if (!(error instanceof Prisma.PrismaClientKnownRequestError) || error.code !== "P2002") throw error;
            }
        }
        throw new ApiError("Could not assign subsection position. Please retry.",HTTP_STATUS.CONFLICT);
    }
    async getAllSubSection(courseId:string,sectionId:string) {
        await this.requireOwnedSection(courseId,sectionId);
        return await subsectionRepository.getAllSubSection(sectionId);
    }
    async updateSubSection(courseId:string,sectionId:string,subsectionId: string, data: UpdateSubsectionSchema) {
        await this.requireOwnedSubsection(courseId,sectionId,subsectionId);
        return await subsectionRepository.updateSubSection(subsectionId,data);
    }
    async deleteSubSection(courseId:string,sectionId:string,subsectionId:string) {
        await this.requireOwnedSubsection(courseId,sectionId,subsectionId);
        return await subsectionRepository.deleteSubSection(subsectionId);
    }
    private async requireOwnedSection(courseId:string,sectionId:string){
        const payload = await getCurrentTeacherPayload();
        const section = await sectionRepository.getSectionById(sectionId);
        if (!section || section.courseId !== courseId) {
            throw new ApiError("Section not found", HTTP_STATUS.NOT_FOUND);
        }
        if (section.course.teacherId !== payload.id) {
            throw new ApiError("Forbidden", HTTP_STATUS.FORBIDDEN);
        }
    }
    async courseIdForOwnedSection(sectionId:string){
        const payload=await getCurrentTeacherPayload();
        const section=await sectionRepository.getSectionById(sectionId);
        if (!section) throw new ApiError("Section not found",HTTP_STATUS.NOT_FOUND);
        if (section.course.teacherId !== payload.id) throw new ApiError("Forbidden",HTTP_STATUS.FORBIDDEN);
        return section.courseId;
    }
    private async requireOwnedSubsection(courseId:string,sectionId:string,subsectionId:string){
        await this.requireOwnedSection(courseId,sectionId);
        const subsection=await subsectionRepository.getSubSectionById(subsectionId);
        if (!subsection || subsection.sectionId !== sectionId) throw new ApiError("SubSection not found",HTTP_STATUS.NOT_FOUND);
    }
}

export const subsectionService = new SubSectionService
