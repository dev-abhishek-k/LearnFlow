import { NextRequest, NextResponse } from "next/server";
import { ApiError } from "@/lib/api-error";


type RouteContext<T = Record<string, string>> = {
  params: Promise<T>;
};

type RouteHandler<T = Record<string, string>> = (
  req: NextRequest,
  context: RouteContext<T>
) => Promise<NextResponse>;

export function asyncHandler<T = Record<string, string>>(
  handler: RouteHandler<T>
) {
  return async (
    req: NextRequest,
    context: RouteContext<T>
  ): Promise<NextResponse> => {
    try {
      return await handler(req, context);
    } catch (error) {
      if (error instanceof ApiError) {
        return NextResponse.json(
          {
            success: false,
            message: error.message,
            errors: error.errors,
          },
          {
            status: error.statusCode,
          }
        );
      }

      console.error(error);

      throw ApiError.internalServerError("Internal server error");
    }
  };
}