export declare class UploadService {
    constructor();
    uploadFile(file: Express.Multer.File): Promise<string>;
    uploadBase64(base64String: string): Promise<string>;
}
