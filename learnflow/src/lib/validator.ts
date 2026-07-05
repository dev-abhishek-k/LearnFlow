import { z } from "zod";

export async function validateRequest<T>(
  request: Request,
  schema: z.ZodSchema<T>
): Promise<T> {
  const body = await request.json();

  const result = schema.safeParse(body);

  if (!result.success) {
    const errors = result.error.issues.map((issue) => issue.message);

    throw new Error(errors.join(", "));
  }

  return result.data;
}