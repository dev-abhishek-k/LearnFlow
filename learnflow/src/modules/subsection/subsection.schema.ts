import {z} from "zod";

 export const createSubsectionSchema = z.object({
    title: z.string().trim().min(3).max(50),
    sectionId: z.string().cuid(),
    order: z.coerce.number().int().min(1),
});
export const updateSubsectionSchema = createSubsectionSchema.partial();  

export  type CreateSubsectionSchema = z.infer<typeof createSubsectionSchema>;
export  type UpdateSubsectionSchema = z.infer<typeof updateSubsectionSchema>;