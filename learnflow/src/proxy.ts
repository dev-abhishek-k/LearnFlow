import { NextRequest, NextResponse } from "next/server";

import { asyncHandler } from "@/lib/async-handler";
import { getAccessTokenCookie } from "@/lib/auth/cookies";
import { verifyAccessToken } from "@/lib/auth/jwt";
import { hasPermission } from "@/lib/permissions/permissions";
import { ROUTE_PERMISSIONS } from "@/lib/permissions/route-permissions";
import { PUBLIC_ROUTES } from "@/lib/public-routes";

export const proxy = asyncHandler(async (request: NextRequest) => {

  const { pathname } = request.nextUrl;

if (PUBLIC_ROUTES.includes(pathname)) {
    return NextResponse.next();
  }
  const accessToken = await getAccessTokenCookie();

  if (!accessToken) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  const payload = verifyAccessToken(accessToken);

  if (!payload) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Role-based permission check
  for (const [route, allowedRoles] of Object.entries(ROUTE_PERMISSIONS)) {
  if (pathname.startsWith(route)) {
    if (!hasPermission(payload.role, allowedRoles)) {
      return NextResponse.json(
        { message: "Forbidden" },
        { status: 403 }
      );
    }
  }
}

  return NextResponse.next();
});

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/profile/:path*",
    "/admin/:path*",
    "/teacher/:path*",
     "/api/admin/:path*",
    "/api/teacher/:path*",
  ],
};