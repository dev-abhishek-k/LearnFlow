import { Prisma,SubSection } from "@/generated/prisma/client";
import { prisma } from "@/lib/prisma";

class SubSectionRepository {
    async createSubSection(data:Prisma.SubSectionUncheckedCreateInput):Promise<SubSection>{
        return prisma.subSection.create({data}) 
    }
    async updateSubSection(subsectionId:string,data:Prisma.SubSectionUpdateInput):Promise<SubSection | null>{
        return prisma.subSection.update({where:{id:subsectionId},data})
    }
    async getAllSubSection():Promise<SubSection[]>{
        return prisma.subSection.findMany()
    }
    async getSubSectionById(subsectionId:string):Promise<SubSection | null>{
         return prisma.subSection.findUnique({where:{id:subsectionId}})
    }
    async deleteSubSection(subsectionId:string):Promise<SubSection | null>{
        return prisma.subSection.delete({where:{id:subsectionId}})
    }

}

export const subsectionRepository = new SubSectionRepository