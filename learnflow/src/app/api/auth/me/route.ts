import { authService } from "@/modules/auth/auth.service";
import { asyncHandler } from "@/lib/async-handler";
import { NextResponse } from "next/server";
import { AUTH_MESSAGES } from "@/modules/auth/auth.constants";
import { getAccessTokenCookie } from "@/lib/auth/cookies";
import { verifyAccessToken } from "@/lib/auth/jwt";
import { ApiError } from "@/lib/api-error";
export const GET = asyncHandler(async () => {
     
    const accessToken = await getAccessTokenCookie();
    if(!accessToken) throw ApiError.unauthorized(AUTH_MESSAGES.unauthorized);
      
      const payload = verifyAccessToken(accessToken);
      if (!payload) {
         throw ApiError.unauthorized(AUTH_MESSAGES.unauthorized);
      }
    const user = await authService.me(payload.id);
    return NextResponse.json({ user });
});