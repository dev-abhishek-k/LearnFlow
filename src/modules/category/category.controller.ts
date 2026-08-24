import type { NextRequest } from "next/server";
import { validateRequest } from "@/lib/validator";
import {
  categoryService,
  createCategorySchema,
  updateCategorySchema,
  CategoryMessage,
} from "./index";
import { ApiResponse } from "@/lib/api-response";   
import type {NextResponse} from "next/server";

 class CategoryController {
    async createCategory(request: NextRequest) {
      const body = await validateRequest(
        request,
         createCategorySchema
      )
     
      const category = await categoryService.createCategory(body);
      return ApiResponse.ok(CategoryMessage.CATEGORY_CREATED, category);
    }  
    async getAllCategory() {
        const category= await categoryService.getAllCategory();
        return ApiResponse.ok(CategoryMessage.CATEGORY_FETCHED, category);
    }
    async updateCategory(id:string,request:NextRequest){
        const body=await validateRequest(
            request,
            updateCategorySchema
        )
        const category=await categoryService.updateCategory(id,body);
        return ApiResponse.ok(CategoryMessage.CATEGORY_UPDATED,category);
    }
    async deleteCategory(id:string):Promise<NextResponse>{
      const category=await categoryService.deleteCategory(id); 
      return ApiResponse.ok(CategoryMessage.CATEGORY_DELETED,category);
    }
 }
 export const categoryController = new CategoryController();