import { ApiResponse } from "@/lib/api-response";
import { NextRequest } from "next/server";
import { validateRequest } from "@/lib/validator"; 
import { createSectionSchema,updateSectionSchema,SECTION_MESSAGES ,sectionService} from "./index"; 

class SectionController{
    async createSection(request: NextRequest) {
        const body = await validateRequest(request, createSectionSchema);
        const section = await sectionService.createSection(body);
        return ApiResponse.ok(SECTION_MESSAGES.SECTION_CREATED, section);
    }
    async getAllSection() {
        const section = await sectionService.getAllSection();
        return ApiResponse.ok(SECTION_MESSAGES.SECTION_FETCHED, section);
    }
    async updateSection(id: string, request: NextRequest) {
            const body = await validateRequest(request, updateSectionSchema);
            const section = await sectionService.updateSection(id, body);
            return ApiResponse.ok(SECTION_MESSAGES.SECTION_UPDATED, section);
    }
    async deleteSection(id: string) {
        const section = await sectionService.deleteSection(id);
        return ApiResponse.ok(SECTION_MESSAGES.SECTION_DELETED, section);
    }
}
export const sectionController = new SectionController  

