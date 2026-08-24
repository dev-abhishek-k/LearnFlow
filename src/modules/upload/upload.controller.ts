import { NextRequest } from "next/server";
import { uploadService } from "@/modules/upload/index";
import { ApiResponse } from "@/lib/api-response";
import { ApiError } from "@/lib/api-error";
import { HTTP_STATUS } from "@/lib/http-status";
import { uploadValidation } from "@/modules/upload/index";
export class UploadController {
  async upload(request: NextRequest) {
    const formData = await request.formData();

    const file = formData.get("file");

    if (!(file instanceof File)) {
      throw new ApiError("File is required", HTTP_STATUS.BAD_REQUEST);
    }

    uploadValidation.validate(file);
    const buffer = Buffer.from(await file.arrayBuffer());

    const result = await uploadService.upload({
      buffer,
      fileName: file.name,
      mimeType: file.type,
      size: file.size,
    });

    return ApiResponse.ok("File uploaded successfully", result);
  }
}
export const uploadController = new UploadController();
