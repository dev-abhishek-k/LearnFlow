
import {asyncHandler} from "@/lib/async-handler";
import {categoryController} from "@/modules/category/index"

export const PATCH=asyncHandler(async(request,context)=>{
    const {id}=await context.params
   return categoryController.updateCategory(id,request);
})

export const DELETE=asyncHandler(async(request,context)=>{
    const {id}=await context.params
   return categoryController.deleteCategory(id); 
})