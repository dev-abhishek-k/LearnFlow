import { getAccessTokenCookie } from "@/lib/auth/cookies";
import { verifyAccessToken } from "@/lib/auth/jwt";
import { ApiError } from "@/lib/api-error";
import { AUTH_MESSAGES } from "@/modules/auth/auth.constants";
import { Role } from "@/generated/prisma/enums";
import { HTTP_STATUS } from "@/lib/http-status";

export async function getCurrentUserPayload() {
  const accessToken = await getAccessTokenCookie();

  if (!accessToken) {
    throw ApiError.unauthorized(AUTH_MESSAGES.unauthorized);
  }

  const payload = verifyAccessToken(accessToken);

  if (!payload) {
    throw ApiError.unauthorized(AUTH_MESSAGES.unauthorized);
  }

  return payload;
}

export async function getCurrentTeacherPayload() {
  const payload = await getCurrentUserPayload();
  if (payload.role !== Role.TEACHER) {
    throw new ApiError("Teacher access required", HTTP_STATUS.FORBIDDEN);
  }
  return payload;
}

export async function getCurrentStudentPayload() {
  const payload = await getCurrentUserPayload();
  if (payload.role !== Role.STUDENT) {
    throw new ApiError("Student access required", HTTP_STATUS.FORBIDDEN);
  }
  return payload;
}
