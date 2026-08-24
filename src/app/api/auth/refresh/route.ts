import {authService} from "@/modules/auth/auth.service";
import { asyncHandler } from "@/lib/async-handler";
import {NextResponse} from "next/server";
import { getRefreshTokenCookie, setRefreshTokenCookie } from "@/lib/auth/cookies";


export const POST = asyncHandler(async () => {
    const refreshToken = await getRefreshTokenCookie();
    const response = await authService.refresh(refreshToken);
    await setRefreshTokenCookie(response.refreshToken);
    return NextResponse.json({
        accessToken: response.accessToken,
        });
});
