import { z } from "zod";

export const uploadSchema = z.object({
  folder: z.string().trim().optional(),
  
});

export type UploadInput = z.infer<typeof uploadSchema>;