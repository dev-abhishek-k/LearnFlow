import { z } from "zod";

const secureUrl = z.url().refine(value => value.startsWith("https://"), "Use a secure HTTPS URL");

const lessonFields = z.object({
  title: z.string().trim().min(3).max(150),
  description: z.string().trim().optional(),
  content: z.string().trim().optional(),
  videoUrl: secureUrl.optional(),
  imageUrl: secureUrl.optional(),
  durationSeconds: z.number().int().min(0).optional(),
  isPreview: z.boolean().optional(),
  position: z.number().int().min(1),
});

export const createLessonSchema = lessonFields.refine(data => !!(data.videoUrl || data.imageUrl || data.content), {
  message: "Add a video URL, image URL, or text content",
});

export const updateLessonSchema = lessonFields.partial();
export type CreateLessonInput = z.infer<typeof createLessonSchema>;
