import {authService} from "@/modules/auth/auth.service";
import { NextRequest } from "next/server";
import { asyncHandler } from "@/lib/async-handler";
import {NextResponse} from "next/server";
export const POST = asyncHandler(async (request: NextRequest) => { 
    const body = await request.json(); 
    const response = await authService.refresh(body.refreshToken); 
    return NextResponse.json(response); 
});