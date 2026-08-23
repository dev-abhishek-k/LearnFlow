import { ApiError } from "@/lib/api-error";
import { HTTP_STATUS } from "@/lib/http-status";
import { subsectionRepository } from "@/modules/subsection/index";
import { sectionRepository } from "../section";
import { Prisma } from "@/generated/prisma/client";
import { getCurrentUserPayload } from "@/lib/auth/current_user";

class SubSectionService {
    async createSubSection(data: Prisma.SubSectionUncheckedCreateInput) {
        const payload = await getCurrentUserPayload();
        const section = await sectionRepository.getSectionById(data.sectionId);
        if (!section) {
            throw new ApiError("Section not found", HTTP_STATUS.NOT_FOUND);
        }
        if (section.course.teacherId !== payload.id) {
            throw new ApiError("Forbidden", HTTP_STATUS.FORBIDDEN);
        }
        return await subsectionRepository.createSubSection(data);       
    }
    async getAllSubSection() {
        return await subsectionRepository.getAllSubSection();
    }
    async updateSubSection(subsectionId: string, data: Prisma.SubSectionUpdateInput) {
        const payload = await getCurrentUserPayload();
        const subsection = await sectionRepository.getSectionById(subsectionId);
        if (!subsection) {
            throw new ApiError("SubSection not found", HTTP_STATUS.NOT_FOUND);
        }
        if (subsection.course.teacherId !== payload.id) {
            throw new ApiError("Forbidden", HTTP_STATUS.FORBIDDEN);
        }
        return await subsectionRepository.updateSubSection(subsectionId, data);
    }
    async deleteSubSection(sectionId: string) {
        const payload = await getCurrentUserPayload();
        const section = await sectionRepository.getSectionById(sectionId);
        if (!section) {
            throw new ApiError("Section not found", HTTP_STATUS.NOT_FOUND);
        }
        if (section.course.teacherId !== payload.id) {
            throw new ApiError("Forbidden", HTTP_STATUS.FORBIDDEN);
        }
        return await subsectionRepository.deleteSubSection(sectionId);
    }   
}

export const subsectionService = new SubSectionService