import { z } from "zod";
import { ApiError } from "@/lib/api-error";
import { HTTP_STATUS } from "@/lib/http-status";

export async function validateRequest<T>(
  request: Request,
  schema: z.ZodSchema<T>
): Promise<T> {
  const body = await request.json();

  const result = schema.safeParse(body);

  if (!result.success) {
    const errors = result.error.issues.map((issue) => issue.message);

    throw new ApiError(errors.join(", "), HTTP_STATUS.BAD_REQUEST);
  }

  return result.data;
}
