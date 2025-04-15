import { BaseSchema } from '@shared/schemas/base.schema';
export declare class History extends BaseSchema {
    user: string;
    qr: string;
    type: string;
    value: string;
}
export declare const HistorySchema: import("mongoose").Schema<History, import("mongoose").Model<History, any, any, any, import("mongoose").Document<unknown, any, History> & History & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, History, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<History>> & import("mongoose").FlatRecord<History> & Required<{
    _id: unknown;
}> & {
    __v: number;
}>;
