import {prisma} from "@/lib/prisma";
import type {Prisma,Category} from "@/generated/prisma/client";


class CategoryRepository {
  async createCategory(data:Prisma.CategoryCreateInput) : Promise<Category> {
      return prisma.category.create({
        data,
      });
  }
  async getAllCategory(): Promise<Category[]> {
      return prisma.category.findMany(
        {
            orderBy:{
                createdAt:"desc"
            }
        }
      );
  }
 async getCategoryById(id: string): Promise<Category | null> {
    return prisma.category.findUnique({
      where: { id },
    });
  } 
  async getCategoryFindBySlug(slug: string): Promise<Category | null> {
    return prisma.category.findUnique({
      where: { slug },
    });
  }
  async updateCategory(id: string, data: Prisma.CategoryUpdateInput): Promise<Category | null> {
    return prisma.category.update({
      where: { id },
      data,
    });
  }
  async deleteCategory(id: string): Promise<Category> {
    return prisma.category.delete({
      where: { id },
    });
  }

}
export const categoryRepository = new CategoryRepository();