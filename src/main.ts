import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module'; // Ensure this path is correct
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import dotenv from 'dotenv';
import { Logger } from '@nestjs/common';
import { RedisService } from './redis/redis.service';

// Load environment variables
const dotenvResult = dotenv.config();
if (dotenvResult.error) {
  console.error('Error loading .env file:', dotenvResult.error);
} else {
  console.log('Environment variables loaded successfully');
}

// Cache the app instance for serverless environments
let cachedApp = null;

async function bootstrap() {
  if (!cachedApp) {
    // Validate critical environment variables
    const requiredEnvVars = [
      'DB_USERNAME',
      'DB_PASSWORD',
      'REDIS_HOST',
      'REDIS_PORT',
      'REDIS_PASSWORD',
    ];
    const missingEnvVars = requiredEnvVars.filter(
      (envVar) => !process.env[envVar],
    );
    if (missingEnvVars.length > 0) {
      throw new Error(
        `Missing environment variables: ${missingEnvVars.join(', ')}`,
      );
    }

    // Create the NestJS app
    const app = await NestFactory.create(AppModule);
    const logger = new Logger('Bootstrap');

    // Enable CORS for serverless compatibility
    app.enableCors({
      origin: '*',
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
      allowedHeaders: 'Content-Type, Accept, Authorization',
    });

    // Set global API prefix
    app.setGlobalPrefix('api');

    // Swagger setup for API documentation
    const config = new DocumentBuilder()
      .setTitle('CHEFLY API')
      .setDescription('Authentication and User Management API')
      .setVersion('1.0')
      .addBearerAuth()
      .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api/docs', app, document);

    // Initialize the app for serverless
    await app.init();

    // Get the underlying HTTP adapter (Express or Fastify) for serverless
    cachedApp = app.getHttpAdapter().getInstance();
  }
  return cachedApp;
}

// Serverless handler
export default async (req: any, res: any) => {
  try {
    const app = await bootstrap();
    return app(req, res);
  } catch (error) {
    console.error('Error in serverless handler:', error);
    res
      .status(500)
      .json({ message: 'Internal Server Error', error: error.message });
  }
};

// const dotenvResult = dotenv.config();
// if (dotenvResult.error) {
//   console.error('Error loading .env file:', dotenvResult.error);
// } else {
//   console.log('Environment variables loaded successfully');
// }

// async function bootstrap() {
//   const app = await NestFactory.create(AppModule);
//   // Global prefix
//   app.setGlobalPrefix('api');
//   app.enableCors({
//     origin: '*',
//     methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
//     allowedHeaders: 'Content-Type, Accept, Authorization',
//   });
//   // Swagger setup
//   const config = new DocumentBuilder()
//     .setTitle('CHEFLY API')
//     .setDescription('Authentication and User Management API')
//     .setVersion('1.0')
//     .addBearerAuth()
//     .build();
//   const document = SwaggerModule.createDocument(app, config);
//   SwaggerModule.setup('api', app, document);
//   await app.listen(3000);
// }
// bootstrap();
