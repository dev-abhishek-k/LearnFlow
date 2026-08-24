import { ApiError } from "@/lib/api-error";
import {
  allowedTypes,
  MAX_FILE_SIZE,
} from "@/modules/upload/upload.constants";
import { HTTP_STATUS } from "@/lib/http-status";    
export class UploadValidation {
   validate(file: File) {

    if (file.size === 0) {
      throw new ApiError( "File cannot be empty", HTTP_STATUS.BAD_REQUEST );
    }

    if (file.size > MAX_FILE_SIZE) {
      throw new ApiError(
        `File size must be less than ${MAX_FILE_SIZE / (1024 * 1024)} MB`,
        HTTP_STATUS.BAD_REQUEST
      );
    }

    if (!allowedTypes.includes(file.type)) {
      throw new ApiError(
        "Only JPG, PNG,avif and WebP images are allowed",
        HTTP_STATUS.BAD_REQUEST
      );
    }
  }
}
export const uploadValidation = new UploadValidation(); 