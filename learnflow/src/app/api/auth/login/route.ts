import { ApiResponse } from "@/lib/api-response";
import { NextRequest } from "next/server";
import { authService } from "@/modules/auth/auth.service";
import { LoginInput } from "@/modules/auth/auth.types";
import { loginSchema } from "@/modules/auth/auth.validation";
import {validateRequest} from "@/lib/validator";
import {asyncHandler} from "@/lib/async-handler";
import {AUTH_MESSAGES} from "@/modules/auth/auth.constants";
import { setRefreshTokenCookie } from "@/lib/auth/cookies";
export const POST = asyncHandler(async (request: NextRequest) => {
    const body = await validateRequest<LoginInput>(request, loginSchema);
    const response = await authService.Login(body);
    await setRefreshTokenCookie(response.refreshToken); 
    return ApiResponse.ok(AUTH_MESSAGES.LOGIN_SUCCESS,{
        user: response.user,
        accessToken: response.accessToken
    });
});