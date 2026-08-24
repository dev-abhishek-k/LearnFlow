export interface UploadFileInput {
  buffer: Buffer;
  fileName: string;
  mimeType: string;
  size: number;
  folder?: string;
}