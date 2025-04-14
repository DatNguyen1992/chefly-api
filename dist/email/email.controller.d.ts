import { EmailService } from './email.service';
export declare class EmailController {
    private readonly emailService;
    constructor(emailService: EmailService);
    generateEmail(): Promise<{
        email: string;
    }>;
    getMessages(email: string): Promise<any[]>;
    getMessage(email: string, messageId: string): Promise<any>;
    extendEmail(email: string): Promise<{
        message: string;
    }>;
    deleteEmail(email: string): Promise<{
        message: string;
    }>;
    handleWebhook(body: any): Promise<{
        status: string;
    }>;
}
