import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';

dotenv.config();

let cachedApp = null;

async function bootstrap() {
  if (!cachedApp) {
    // Log environment variables for debugging
    console.log('DB_USERNAME:', process.env.DB_USERNAME);
    console.log('DB_PASSWORD:', process.env.DB_PASSWORD ? '[hidden]' : 'undefined');

    // Throw an error if variables are missing
    if (!process.env.DB_USERNAME || !process.env.DB_PASSWORD) {
      throw new Error('Missing DB_USERNAME or DB_PASSWORD environment variables');
    }

    const app = await NestFactory.create(AppModule);
    app.enableCors({
      origin: '*',
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
      allowedHeaders: 'Content-Type, Accept, Authorization',
    });
    app.setGlobalPrefix('api');
    await app.init();
    cachedApp = app.getHttpAdapter().getInstance();
  }
  return cachedApp;
}

export default async (req: any, res: any) => {
  const app = await bootstrap();
  return app(req, res);
};