import { ApiResponse } from "@/lib/api-response";
import {SUBSECTION_MESSAGES} from "./subsection.constants";
import {subsectionService} from "./subsection.service";
import {validateRequest} from "@/lib/validator";
import{createSubsectionSchema,updateSubsectionSchema} from "@/modules/subsection/index";

class SubSectionController{
    async createSubSection(courseId:string,sectionId:string,request:Request) {
        const body = await validateRequest(request, createSubsectionSchema);
        const response = await subsectionService.createSubSection(courseId,sectionId,body);
        return ApiResponse.ok(SUBSECTION_MESSAGES.SUBSECTION_CREATED, response);
    }
    async updateSubSection(courseId:string,sectionId:string,subsectionId: string, request: Request) {
        const body = await validateRequest(request, updateSubsectionSchema);
        const response = await subsectionService.updateSubSection(courseId,sectionId,subsectionId, body);
        return ApiResponse.ok(SUBSECTION_MESSAGES.SUBSECTION_UPDATED, response);
    }   
    async getAllSubSection(courseId:string,sectionId:string) {
        const response = await subsectionService.getAllSubSection(courseId,sectionId);
        return ApiResponse.ok(SUBSECTION_MESSAGES.SUBSECTION_FETCHED, response);
    }
    async deleteSubSection(courseId:string,sectionId:string,subsectionId: string) {
        const response = await subsectionService.deleteSubSection(courseId,sectionId,subsectionId);
        return ApiResponse.ok(SUBSECTION_MESSAGES.SUBSECTION_DELETED, response);
    }   
}

export const subsectionController=new SubSectionController();
