import { ApiResponse } from "@/lib/api-response";
import { NextRequest } from "next/server";
import { validateRequest } from "@/lib/validator"; 
import { createSectionSchema,updateSectionSchema,SECTION_MESSAGES ,sectionService} from "./index"; 

class SectionController{
    async createSection(courseId:string,request: NextRequest) {
        const body = await validateRequest(request, createSectionSchema);
        const section = await sectionService.createSection(courseId,body);
        return ApiResponse.ok(SECTION_MESSAGES.SECTION_CREATED, section);
    }
    async getAllSection(courseId:string) {
        const section = await sectionService.getAllSection(courseId);
        return ApiResponse.ok(SECTION_MESSAGES.SECTION_FETCHED, section);
    }
    async updateSection(courseId:string,id: string, request: NextRequest) {
            const body = await validateRequest(request, updateSectionSchema);
            const section = await sectionService.updateSection(courseId,id, body);
            return ApiResponse.ok(SECTION_MESSAGES.SECTION_UPDATED, section);
    }
    async deleteSection(courseId:string,id: string) {
        const section = await sectionService.deleteSection(courseId,id);
        return ApiResponse.ok(SECTION_MESSAGES.SECTION_DELETED, section);
    }
}
export const sectionController = new SectionController  

