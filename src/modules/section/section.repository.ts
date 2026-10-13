import { Prisma, Section } from "@/generated/prisma/client";
import { prisma } from "@/lib/prisma";

class SectionRepository {
  async createSection(
    data: Prisma.SectionUncheckedCreateInput,
  ): Promise<Section> {
    return prisma.section.create({ data });
  }
  async maxPosition(courseId: string): Promise<number> {
    const result = await prisma.section.aggregate({ where: { courseId }, _max: { position: true } });
    return result._max.position ?? 0;
  }
  async getAllSection(courseId: string): Promise<Section[]> {
    return prisma.section.findMany({where:{courseId},orderBy:{order:"asc"}});
  }
  async getSectionById(id: string) {
    return prisma.section.findUnique({
      where: {
        id,
      },
      include: {
        course: {
          select: {
            teacherId: true,
          },
        },
      },
    });
  }
  async updateSection(
    id: string,
    data: Prisma.SectionUncheckedUpdateInput,
  ): Promise<Section | null> {
    return prisma.section.update({ where: { id }, data });
  }
  async deleteSection(id: string): Promise<Section> {
    return prisma.section.delete({ where: { id } });
  }
}
export const sectionRepository = new SectionRepository();
