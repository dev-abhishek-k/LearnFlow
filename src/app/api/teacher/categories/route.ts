import { asyncHandler } from "@/lib/async-handler";
import { categoryController } from "@/modules/category";

export const GET = asyncHandler(async () => {
  return categoryController.getAllCategory();
});
