import { imagekit } from "@/lib/file/imagekit";
import { ApiError } from "@/lib/api-error";
import { UploadFileInput } from "@/modules/upload/index";
import { HTTP_STATUS } from "@/lib/http-status";

export class UploadService {
  async upload(data: UploadFileInput) {
    const { buffer, fileName, folder } = data;

    if (!buffer) {
      throw new ApiError("File is required", HTTP_STATUS.BAD_REQUEST);
    }
    // Upload to ImageKit
    const result = await imagekit.upload({
      file: buffer,
      fileName,
      folder: folder ?? "/learnflow",
    });

    return {
      fileId: result.fileId,
      name: result.name,
      url: result.url,
      thumbnailUrl: result.thumbnailUrl,
      filePath: result.filePath,
    };
  }
}
export const uploadService = new UploadService();