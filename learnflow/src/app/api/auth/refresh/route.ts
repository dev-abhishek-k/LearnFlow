import {authService} from "@/modules/auth/auth.service";
import { NextRequest } from "next/server";
import { asyncHandler } from "@/lib/async-handler";
import {NextResponse} from "next/server";
import { getRefreshTokenCookie, setRefreshTokenCookie } from "@/lib/auth/cookies";
// export const POST = asyncHandler(async (request: NextRequest) => { 
//     const body = await request.json(); 
//     const response = await authService.refresh(body.refreshToken); 
//     return NextResponse.json(response); 
// });

export const POST = asyncHandler(async () => {
    const refreshToken = await getRefreshTokenCookie();
    const response = await authService.refresh(refreshToken);
    await setRefreshTokenCookie(response.refreshToken);
    return NextResponse.json({
        accessToken: response.accessToken,
        });
});
