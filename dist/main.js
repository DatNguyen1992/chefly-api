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
const http_exception_filter_1 = require("./common/filters/http-exception.filter");
const transform_interceptor_1 = require("./common/interceptors/transform.interceptor");
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
            'CLOUDINARY_CLOUD_NAME',
            'CLOUDINARY_API_KEY',
            'CLOUDINARY_API_SECRET',
        ];
        const missingEnvVars = requiredEnvVars.filter((envVar) => !process.env[envVar]);
        if (missingEnvVars.length > 0) {
            throw new Error(`Missing environment variables: ${missingEnvVars.join(', ')}`);
        }
        const app = await core_1.NestFactory.create(app_module_1.AppModule);
        app.enableCors({
            origin: '*',
            methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
            allowedHeaders: 'Content-Type, Accept, Authorization',
        });
        app.useGlobalPipes(new common_1.ValidationPipe());
        app.useGlobalFilters(new http_exception_filter_1.HttpExceptionFilter());
        app.useGlobalInterceptors(new transform_interceptor_1.TransformInterceptor());
        app.setGlobalPrefix('api');
        const config = new swagger_1.DocumentBuilder()
            .setTitle('CHEFLY API')
            .setDescription('Authentication and User Management API')
            .setVersion('1.0')
            .addBearerAuth()
            .build();
        const document = swagger_1.SwaggerModule.createDocument(app, config);
        swagger_1.SwaggerModule.setup('api', app, document);
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