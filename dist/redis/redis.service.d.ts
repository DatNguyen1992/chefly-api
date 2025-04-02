import { OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Redis from 'ioredis';
export declare class RedisService implements OnModuleInit, OnModuleDestroy {
    private configService;
    private redisClient;
    private readonly keyPrefix;
    private readonly logger;
    constructor(configService: ConfigService);
    onModuleInit(): Promise<void>;
    onModuleDestroy(): Promise<void>;
    set(key: string, value: string, expiresIn?: number): Promise<void>;
    get(key: string): Promise<string | null>;
    del(key: string): Promise<void>;
    exists(key: string): Promise<boolean>;
    setWithHash(key: string, hash: Record<string, any>, expiresIn?: number): Promise<void>;
    getFromHash(key: string, field: string): Promise<string | null>;
    deleteFromHash(key: string, field: string): Promise<void>;
    getClient(): Redis;
}
