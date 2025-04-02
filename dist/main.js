"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const swagger_1 = require("@nestjs/swagger");
const dotenv_1 = __importDefault(require("dotenv"));
const common_1 = require("@nestjs/common");
const redis_service_1 = require("./redis/redis.service");
const dotenvResult = dotenv_1.default.config();
if (dotenvResult.error) {
    console.error('Error loading .env file:', dotenvResult.error);
}
else {
    console.log('Environment variables loaded successfully');
}
let cachedApp = null;
async function bootstrap() {
    if (!cachedApp) {
        const requiredEnvVars = [
            'DB_USERNAME',
            'DB_PASSWORD',
            'REDIS_HOST',
            'REDIS_PORT',
            'REDIS_PASSWORD',
        ];
        const missingEnvVars = requiredEnvVars.filter((envVar) => !process.env[envVar]);
        if (missingEnvVars.length > 0) {
            throw new Error(`Missing environment variables: ${missingEnvVars.join(', ')}`);
        }
        const app = await core_1.NestFactory.create(app_module_1.AppModule);
        const logger = new common_1.Logger('Bootstrap');
        app.enableCors({
            origin: '*',
            methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
            allowedHeaders: 'Content-Type, Accept, Authorization',
        });
        app.setGlobalPrefix('api');
        const config = new swagger_1.DocumentBuilder()
            .setTitle('CHEFLY API')
            .setDescription('Authentication and User Management API')
            .setVersion('1.0')
            .addBearerAuth()
            .build();
        const document = swagger_1.SwaggerModule.createDocument(app, config);
        swagger_1.SwaggerModule.setup('api/docs', app, document);
        const redisService = app.get(redis_service_1.RedisService);
        try {
            await redisService.getClient().ping();
            logger.log('Successfully connected to Redis via Upstash');
        }
        catch (error) {
            logger.error('Failed to connect to Redis:', error);
            throw error;
        }
        await app.init();
        cachedApp = app.getHttpAdapter().getInstance();
    }
    return cachedApp;
}
exports.default = async (req, res) => {
    try {
        const app = await bootstrap();
        return app(req, res);
    }
    catch (error) {
        console.error('Error in serverless handler:', error);
        res
            .status(500)
            .json({ message: 'Internal Server Error', error: error.message });
    }
};
//# sourceMappingURL=main.js.map