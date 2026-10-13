import { Prisma,SubSection } from "@/generated/prisma/client";
import { prisma } from "@/lib/prisma";

class SubSectionRepository {
    async createSubSection(data:Prisma.SubSectionUncheckedCreateInput):Promise<SubSection>{
        return prisma.subSection.create({data}) 
    }
    async maxPosition(sectionId:string):Promise<number>{
        const result=await prisma.subSection.aggregate({where:{sectionId},_max:{position:true}});
        return result._max.position ?? 0;
    }
    async updateSubSection(subsectionId:string,data:Prisma.SubSectionUncheckedUpdateInput):Promise<SubSection | null>{
        return prisma.subSection.update({where:{id:subsectionId},data})
    }
    async getAllSubSection(sectionId:string):Promise<SubSection[]>{
        return prisma.subSection.findMany({where:{sectionId},orderBy:{order:"asc"}})
    }
    async getSubSectionById(subsectionId:string):Promise<SubSection | null>{
         return prisma.subSection.findUnique({where:{id:subsectionId}})
    }
    async deleteSubSection(subsectionId:string):Promise<SubSection | null>{
        return prisma.subSection.delete({where:{id:subsectionId}})
    }

}

export const subsectionRepository = new SubSectionRepository
