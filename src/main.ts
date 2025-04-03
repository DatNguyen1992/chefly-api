import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import dotenv from 'dotenv';

const dotenvResult = dotenv.config();
if (dotenvResult.error) {
  console.error('Error loading .env file:', dotenvResult.error);
} else {
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
    const missingEnvVars = requiredEnvVars.filter(
      (envVar) => !process.env[envVar],
    );
    if (missingEnvVars.length > 0) {
      throw new Error(
        `Missing environment variables: ${missingEnvVars.join(', ')}`,
      );
    }
    const app = await NestFactory.create(AppModule);
    app.enableCors({
      origin: '*',
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
      allowedHeaders: 'Content-Type, Accept, Authorization',
    });
    app.setGlobalPrefix('api');
    const config = new DocumentBuilder()
      .setTitle('CHEFLY API')
      .setDescription('Authentication and User Management API')
      .setVersion('1.0')
      .addBearerAuth()
      .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document);
    await app.init();
    cachedApp = app.getHttpAdapter().getInstance();
  }
  return cachedApp;
}
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
