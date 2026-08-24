import { categoryRepository } from "./index";
import { ApiError } from "@/lib/api-error";
import { HTTP_STATUS } from "@/lib/http-status";
import {Category } from "@/generated/prisma/client";
import {CategoryMessage} from "./index"
import {generateSlug} from "@/lib/slug"
import {CategoryInput,CategoryUpdateInput} from "./index"

class CategoryService {
    async createCategory(data: CategoryInput): Promise<Category | null> {
      const  slug = generateSlug(data.name);
      const existingCategory = await categoryRepository.getCategoryFindBySlug(slug);
      if (existingCategory) {
        throw new ApiError(CategoryMessage.CATEGORY_ALREADY_EXISTS, HTTP_STATUS.CONFLICT);
      }
      return categoryRepository.createCategory({
        name:data.name,
        slug
      });
    }   
async getAllCategory(): Promise<Category[]> {
  return await categoryRepository.getAllCategory(); 
}
async getCategoryById(id: string): Promise<Category | null> {
  return await categoryRepository.getCategoryById(id);  
}
async updateCategory(id: string, data:CategoryUpdateInput): Promise<Category | null> {
  return await categoryRepository.updateCategory(id, data);  
}
async deleteCategory(id:string): Promise<Category | null> {
    return  await categoryRepository.deleteCategory(id);
}
}
export const categoryService = new CategoryService();


