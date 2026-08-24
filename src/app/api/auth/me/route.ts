import { authService } from "@/modules/auth/auth.service";
import { asyncHandler } from "@/lib/async-handler";
import { NextResponse } from "next/server";
import {getCurrentUserPayload} from "@/lib/auth/current_user";
export const GET = asyncHandler(async () => {
  const payload = await getCurrentUserPayload();
    
    const user = await authService.me(payload.id);
    return NextResponse.json({ user });
});
