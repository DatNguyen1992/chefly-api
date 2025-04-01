import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';

dotenv.config();

let cachedApp = null;

async function bootstrap() {
  if (!cachedApp) {
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

export const handler = async (event: any, context: any) => {
  const app = await bootstrap();
  return new Promise((resolve, reject) => {
    const req = event; // Adapt event to req/res if using API Gateway
    const res = {
      statusCode: 200,
      headers: {},
      body: '',
      end: function () {
        resolve({
          statusCode: this.statusCode,
          headers: this.headers,
          body: this.body,
        });
      },
      writeHead: function (statusCode, headers) {
        this.statusCode = statusCode;
        this.headers = headers;
      },
      write: function (data) {
        this.body += data;
      },
    };
    app(req, res);
  });
};
