import { EmailService } from './email.service';
export declare class EmailGateway {
    private readonly emailService;
    constructor(emailService: EmailService);
    handleWatchEmail(email: string): Promise<void>;
}
