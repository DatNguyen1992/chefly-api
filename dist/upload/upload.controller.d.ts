import { UploadService } from './upload.service';
export declare class UploadController {
    private uploadService;
    constructor(uploadService: UploadService);
    uploadImage(file: Express.Multer.File): Promise<{
        url: string;
    }>;
    uploadBase64(base64: string): Promise<{
        url: string;
    }>;
}
