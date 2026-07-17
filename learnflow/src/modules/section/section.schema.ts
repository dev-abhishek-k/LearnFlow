import { z } from "zod";

export const createSectionSchema = z.object({
  title: z.string().trim().min(3).max(50),
  courseId: z.string().cuid(),
  order: z.coerce.number().int().min(1),
});

export const updateSectionSchema = createSectionSchema.partial();


export type CreateSectionSchema = z.infer<typeof createSectionSchema>;
export type UpdateSectionSchema = z.infer<typeof updateSectionSchema>;