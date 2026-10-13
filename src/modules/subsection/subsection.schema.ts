import {z} from "zod";

const httpsUrl = z.url().refine(value => value.startsWith("https://"), "Use a secure HTTPS URL");

 export const createSubsectionSchema = z.object({
    title: z.string().trim().min(3).max(50),
    description: z.string().trim().nullable().optional(),
    videoUrl: httpsUrl.nullable().optional(),
    imageUrl: httpsUrl.nullable().optional(),
    content: z.string().trim().nullable().optional(),
});
export const updateSubsectionSchema = createSubsectionSchema.partial();

export  type CreateSubsectionSchema = z.infer<typeof createSubsectionSchema>;
export  type UpdateSubsectionSchema = z.infer<typeof updateSubsectionSchema>;
