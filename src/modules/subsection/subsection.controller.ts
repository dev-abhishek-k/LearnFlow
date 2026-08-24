import { ApiResponse } from "@/lib/api-response";
import {SUBSECTION_MESSAGES} from "./subsection.constants";
import {subsectionService} from "./subsection.service";
import {validateRequest} from "@/lib/validator";
import{createSubsectionSchema,updateSubsectionSchema} from "@/modules/subsection/index";

class SubSectionController{
    async createSubSection(request:Request) {
        const body = await validateRequest(request, createSubsectionSchema);
        console.log("body",body);
        const response = await subsectionService.createSubSection(body);
        return ApiResponse.ok(SUBSECTION_MESSAGES.SUBSECTION_CREATED, response);
    }
    async updateSubSection(subsectionId: string, request: Request) {
        const body = await validateRequest(request, updateSubsectionSchema);
        const response = await subsectionService.updateSubSection(subsectionId, body);
        return ApiResponse.ok(SUBSECTION_MESSAGES.SUBSECTION_UPDATED, response);
    }   
    async getAllSubSection() {
        const response = await subsectionService.getAllSubSection();
        return ApiResponse.ok(SUBSECTION_MESSAGES.SUBSECTION_FETCHED, response);
    }
    async deleteSubSection(subsectionId: string) {
        const response = await subsectionService.deleteSubSection(subsectionId);
        return ApiResponse.ok(SUBSECTION_MESSAGES.SUBSECTION_DELETED, response);
    }   
}

export const subsectionController=new SubSectionController();