import { z } from "zod";

export const createCourseSchema = z.object({
  title: z.string().min(3).max(150),

  description: z.string().min(20),

  thumbnail: z.string().url().optional(),

  price: z.number().min(0),

  level: z.enum([
    "BEGINNER",
    "INTERMEDIATE",
    "ADVANCED",
  ]),

  language: z.string().min(2).max(30),

  categoryId: z.string().cuid(),
});
export const updateCourseSchema =
  createCourseSchema.partial();
  export const publishCourseSchema = z.object({
  status: z.enum([
    "DRAFT",
    "PUBLISHED",
  ]),
});
export const courseParamsSchema = z.object({
  courseId: z.string().cuid(),
});
export type CreateCourseInput =
  z.infer<typeof createCourseSchema>;

export type UpdateCourseInput =
  z.infer<typeof updateCourseSchema>;