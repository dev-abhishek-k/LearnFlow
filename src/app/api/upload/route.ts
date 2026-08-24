import { NextRequest } from "next/server";
import { uploadController } from "@/modules/upload/upload.controller";

export async function POST(request: NextRequest) {
  return uploadController.upload(request);
}