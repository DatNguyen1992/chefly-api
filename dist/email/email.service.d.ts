import { Model } from 'mongoose';
import { Email } from './schemas/email.schema';
export declare class EmailService {
    private tempEmailModel;
    private mg;
    constructor(tempEmailModel: Model<Email>);
    generateEmail(): Promise<string>;
    getMessages(email: string): Promise<any[]>;
    getMessage(email: string, messageId: string): Promise<any>;
    extendEmail(email: string): Promise<void>;
    deleteEmail(email: string): Promise<void>;
    receiveEmail(email: string, message: {
        from: string;
        subject: string;
        content: string;
        isHtml?: boolean;
    }): Promise<void>;
}
