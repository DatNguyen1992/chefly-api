import { ConfigService } from '@nestjs/config';
import { Model } from 'mongoose';
import { User } from '../../users/schemas/user.schema';
declare const JwtStrategy_base: new (...args: any[]) => any;
export declare class JwtStrategy extends JwtStrategy_base {
    private configService;
    private userModel;
    constructor(configService: ConfigService, userModel: Model<User>);
    validate(payload: any): Promise<{
        name: string;
        email?: string;
        image?: string;
        password?: string;
        provider?: string;
        providerId?: string;
        pinCode?: string;
        avatar?: string;
        refreshToken?: string;
        createdAt: Date;
        updatedAt?: Date;
        deletedAt?: Date;
        _id: unknown;
        $locals: Record<string, unknown>;
        $op: "save" | "validate" | "remove" | null;
        $where: Record<string, unknown>;
        baseModelName?: string;
        collection: import("mongoose").Collection;
        db: import("mongoose").Connection;
        errors?: import("mongoose").Error.ValidationError;
        id?: any;
        isNew: boolean;
        schema: import("mongoose").Schema;
        __v: number;
    }>;
}
export {};
