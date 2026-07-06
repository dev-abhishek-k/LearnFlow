import { ApiResponse } from "@/lib/api-response";
import { NextRequest } from "next/server";
import { authService } from "@/modules/auth/auth.service";
import { RegisterInput } from "@/modules/auth/auth.types";
import { registerSchema } from "@/modules/auth/auth.validation";
import {validateRequest} from "@/lib/validator";
import {asyncHandler} from "@/lib/async-handler";
import {AUTH_MESSAGES} from "@/modules/auth/auth.constants";


export const POST = asyncHandler(async (request: NextRequest) => {
    const body = await validateRequest<RegisterInput>(request, registerSchema); 
    const response = await authService.register(body);
    return ApiResponse.ok(AUTH_MESSAGES.REGISTER_SUCCESS,response);
});


