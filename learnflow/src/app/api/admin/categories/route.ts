
import {asyncHandler} from "@/lib/async-handler";
import {categoryController} from "@/modules/category/index"

export const POST=asyncHandler(async(request)=>{
    return categoryController.createCategory(request); 
})

export const GET=asyncHandler(async()=>{
    return categoryController.getAllCategory(); 
})