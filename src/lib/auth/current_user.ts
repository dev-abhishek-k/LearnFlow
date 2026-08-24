import { getAccessTokenCookie } from "@/lib/auth/cookies";
import { verifyAccessToken } from "@/lib/auth/jwt";
import { ApiError } from "@/lib/api-error";
import { AUTH_MESSAGES } from "@/modules/auth/auth.constants";

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
