import {sectionController} from "@/modules/section/index";

import {asyncHandler} from "@/lib/async-handler";

export const POST= asyncHandler(async(request)=>{
    return sectionController.createSection(request);
})

export const GET=asyncHandler(async()=>{
    return sectionController.getAllSection(); 
})


