import { ConfigService } from '@nestjs/config';
import { Model } from 'mongoose';
import { RedisService } from '../../redis/redis.service';
import { User } from '@users/schemas/user.schema';
declare const JwtRefreshStrategy_base: new (...args: any[]) => any;
export declare class JwtRefreshStrategy extends JwtRefreshStrategy_base {
    private configService;
    private userModel;
    private redisService;
    constructor(configService: ConfigService, userModel: Model<User>, redisService: RedisService);
    validate(req: any, payload: any): Promise<import("mongoose").Document<unknown, {}, User> & User & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
}
export {};
