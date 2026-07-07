import { clearRefreshTokenCookie,getRefreshTokenCookie } from "@/lib/auth/cookies";
import { authService } from "@/modules/auth/auth.service";
import { asyncHandler } from "@/lib/async-handler";
import { NextResponse } from "next/server";
import { AUTH_MESSAGES } from "@/modules/auth/auth.constants";
import { verifyRefreshToken } from "@/lib/auth/jwt";

export const POST = asyncHandler(async () => {
  const refreshToken= await getRefreshTokenCookie()
  if(!refreshToken) return NextResponse.json({ message: AUTH_MESSAGES.INVALID_CREDENTIALS });
  const payload=verifyRefreshToken(refreshToken)
    await authService.logout(payload.id);
    await clearRefreshTokenCookie();
    return NextResponse.json({ message: AUTH_MESSAGES.LOGOUT_SUCCESS });
});