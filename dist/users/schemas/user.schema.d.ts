import { BaseSchema } from '@shared/schemas/base.schema';
export declare class User extends BaseSchema {
    name: string;
    token: string;
    email?: string;
    image?: string;
    password?: string;
    provider?: string;
    providerId?: string;
    pinCode?: string;
    avatar?: string;
    refreshToken?: string;
}
export declare const UserSchema: import("mongoose").Schema<User, import("mongoose").Model<User, any, any, any, import("mongoose").Document<unknown, any, User> & User & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, User, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<User>> & import("mongoose").FlatRecord<User> & Required<{
    _id: unknown;
}> & {
    __v: number;
}>;
