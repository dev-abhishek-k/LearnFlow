import { asyncHandler } from "@/lib/async-handler";
import { courseController } from "@/modules/course";

export const GET = asyncHandler(async () => courseController.getAllStudentCourses());
