import { BaseSchema } from '@shared/schemas/base.schema';
export declare class Email extends BaseSchema {
    email: string;
    messages: Array<{
        from: string;
        subject: string;
        content: string;
        receivedAt: Date;
    }>;
    expiresAt: Date;
}
export declare const EmailSchema: import("mongoose").Schema<Email, import("mongoose").Model<Email, any, any, any, import("mongoose").Document<unknown, any, Email> & Email & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Email, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<Email>> & import("mongoose").FlatRecord<Email> & Required<{
    _id: unknown;
}> & {
    __v: number;
}>;
