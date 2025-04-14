import { Document } from 'mongoose';
export declare class BaseSchema extends Document {
    createdAt: Date;
    updatedAt?: Date;
    deletedAt?: Date;
}
export declare const BaseEntitySchema: import("mongoose").Schema<BaseSchema, import("mongoose").Model<BaseSchema, any, any, any, Document<unknown, any, BaseSchema> & BaseSchema & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, BaseSchema, Document<unknown, {}, import("mongoose").FlatRecord<BaseSchema>> & import("mongoose").FlatRecord<BaseSchema> & Required<{
    _id: unknown;
}> & {
    __v: number;
}>;
