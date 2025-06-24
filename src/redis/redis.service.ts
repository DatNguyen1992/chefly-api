import {
  Injectable,
  OnModuleInit,
  OnModuleDestroy,
  Logger,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Redis from 'ioredis';

@Injectable()
export class RedisService implements OnModuleInit, OnModuleDestroy {
  private redisClient: Redis;
  private readonly keyPrefix = 'app:';
  private readonly logger = new Logger(RedisService.name);

  constructor(private configService: ConfigService) {}

  async onModuleInit() {
    const redisConfig = {
      host: 'humane-thrush-11674.upstash.io',
      port: 6379,
      password:
        this.configService.get('redis.password') || 'your-password-here', // Replace with actual password or use environment variable
      tls: {},
      maxRetriesPerRequest:
        this.configService.get('redis.maxRetriesPerRequest') || 3,
      retryStrategy: (times: number) => {
        // Retry strategy: wait 1 second, up to 3 attempts
        return Math.min(times * 1000, 3000);
      },
      reconnectOnError: (err: Error) => {
        const targetErrors = ['READONLY', 'ETIMEDOUT'];
        return targetErrors.some((targetError) =>
          err.message.includes(targetError),
        );
      },
      keyPrefix: this.keyPrefix,
      showFriendlyErrorStack: process.env.NODE_ENV !== 'production',
      enableReadyCheck: true,
      autoResubscribe: true,
      autoResendUnfulfilledCommands: true,
      maxLoadingRetryTime: 5000,
      commandTimeout: 5000,
    };

    this.redisClient = new Redis(redisConfig);

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

  async set(key: string, value: string, expiresIn?: number): Promise<void> {
    try {
      if (expiresIn) {
        await this.redisClient.set(key, value, 'EX', expiresIn);
      } else {
        await this.redisClient.set(key, value);
      }
    } catch (error) {
      this.logger.error(`Error setting key ${key}:`, error);
      throw error;
    }
  }

  async get(key: string): Promise<string | null> {
    try {
      return await this.redisClient.get(key);
    } catch (error) {
      this.logger.error(`Error getting key ${key}:`, error);
      throw error;
    }
  }

  async del(key: string): Promise<void> {
    try {
      await this.redisClient.del(key);
    } catch (error) {
      this.logger.error(`Error deleting key ${key}:`, error);
      throw error;
    }
  }

  async exists(key: string): Promise<boolean> {
    try {
      const result = await this.redisClient.exists(key);
      return result === 1;
    } catch (error) {
      this.logger.error(`Error checking existence of key ${key}:`, error);
      throw error;
    }
  }

  async setWithHash(
    key: string,
    hash: Record<string, any>,
    expiresIn?: number,
  ): Promise<void> {
    try {
      const pipeline = this.redisClient.pipeline();
      pipeline.hmset(key, hash);
      if (expiresIn) {
        pipeline.expire(key, expiresIn);
      }
      await pipeline.exec();
    } catch (error) {
      this.logger.error(`Error setting hash for key ${key}:`, error);
      throw error;
    }
  }

  async getFromHash(key: string, field: string): Promise<string | null> {
    try {
      return await this.redisClient.hget(key, field);
    } catch (error) {
      this.logger.error(
        `Error getting hash field ${field} for key ${key}:`,
        error,
      );
      throw error;
    }
  }

  async deleteFromHash(key: string, field: string): Promise<void> {
    try {
      await this.redisClient.hdel(key, field);
    } catch (error) {
      this.logger.error(
        `Error deleting hash field ${field} for key ${key}:`,
        error,
      );
      throw error;
    }
  }

  // Add a method to get the Redis client for advanced usage if needed
  getClient(): Redis {
    return this.redisClient;
  }
}
