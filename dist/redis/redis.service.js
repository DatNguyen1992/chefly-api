"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var RedisService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.RedisService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const ioredis_1 = __importDefault(require("ioredis"));
let RedisService = RedisService_1 = class RedisService {
    constructor(configService) {
        this.configService = configService;
        this.keyPrefix = 'app:';
        this.logger = new common_1.Logger(RedisService_1.name);
    }
    async onModuleInit() {
        const redisConfig = {
            host: 'eminent-moose-52503.upstash.io',
            port: 6379,
            password: this.configService.get('redis.password') || 'your-password-here',
            tls: {},
            maxRetriesPerRequest: this.configService.get('redis.maxRetriesPerRequest') || 3,
            retryStrategy: (times) => {
                return Math.min(times * 1000, 3000);
            },
            reconnectOnError: (err) => {
                const targetErrors = ['READONLY', 'ETIMEDOUT'];
                return targetErrors.some((targetError) => err.message.includes(targetError));
            },
            keyPrefix: this.keyPrefix,
            showFriendlyErrorStack: process.env.NODE_ENV !== 'production',
            enableReadyCheck: true,
            autoResubscribe: true,
            autoResendUnfulfilledCommands: true,
            maxLoadingRetryTime: 5000,
            commandTimeout: 5000,
        };
        this.redisClient = new ioredis_1.default(redisConfig);
        this.redisClient.on('error', (error) => {
            this.logger.error('Redis connection error:', error);
        });
        this.redisClient.on('connect', () => {
            this.logger.log('Successfully connected to Redis');
        });
        this.redisClient.on('ready', () => {
            this.logger.log('Redis client is ready');
        });
        this.redisClient.on('close', () => {
            this.logger.warn('Redis connection closed');
        });
        this.redisClient.on('reconnecting', () => {
            this.logger.log('Reconnecting to Redis');
        });
    }
    async onModuleDestroy() {
        if (this.redisClient) {
            await this.redisClient.quit();
            this.logger.log('Redis connection closed');
        }
    }
    async set(key, value, expiresIn) {
        try {
            if (expiresIn) {
                await this.redisClient.set(key, value, 'EX', expiresIn);
            }
            else {
                await this.redisClient.set(key, value);
            }
        }
        catch (error) {
            this.logger.error(`Error setting key ${key}:`, error);
            throw error;
        }
    }
    async get(key) {
        try {
            return await this.redisClient.get(key);
        }
        catch (error) {
            this.logger.error(`Error getting key ${key}:`, error);
            throw error;
        }
    }
    async del(key) {
        try {
            await this.redisClient.del(key);
        }
        catch (error) {
            this.logger.error(`Error deleting key ${key}:`, error);
            throw error;
        }
    }
    async exists(key) {
        try {
            const result = await this.redisClient.exists(key);
            return result === 1;
        }
        catch (error) {
            this.logger.error(`Error checking existence of key ${key}:`, error);
            throw error;
        }
    }
    async setWithHash(key, hash, expiresIn) {
        try {
            const pipeline = this.redisClient.pipeline();
            pipeline.hmset(key, hash);
            if (expiresIn) {
                pipeline.expire(key, expiresIn);
            }
            await pipeline.exec();
        }
        catch (error) {
            this.logger.error(`Error setting hash for key ${key}:`, error);
            throw error;
        }
    }
    async getFromHash(key, field) {
        try {
            return await this.redisClient.hget(key, field);
        }
        catch (error) {
            this.logger.error(`Error getting hash field ${field} for key ${key}:`, error);
            throw error;
        }
    }
    async deleteFromHash(key, field) {
        try {
            await this.redisClient.hdel(key, field);
        }
        catch (error) {
            this.logger.error(`Error deleting hash field ${field} for key ${key}:`, error);
            throw error;
        }
    }
    getClient() {
        return this.redisClient;
    }
};
exports.RedisService = RedisService;
exports.RedisService = RedisService = RedisService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], RedisService);
//# sourceMappingURL=redis.service.js.map