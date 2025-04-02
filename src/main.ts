import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

// const dotenvResult = dotenv.config();
// if (dotenvResult.error) {
//   console.error('Error loading .env file:', dotenvResult.error);
// } else {
//   console.log('Environment variables loaded successfully');
// }

// let cachedApp = null;

// async function bootstrap() {
//   console.log('test3');
//   if (!cachedApp) {
//     if (!process.env.DB_USERNAME || !process.env.DB_PASSWORD) {
//       throw new Error(
//         'Missing DB_USERNAME or DB_PASSWORD environment variables',
//       );
//     }

//     const app = await NestFactory.create(AppModule);
//     app.enableCors({
//       origin: '*',
//       methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
//       allowedHeaders: 'Content-Type, Accept, Authorization',
//     });
//     app.setGlobalPrefix('api');
//     await app.init();
//     cachedApp = app.getHttpAdapter().getInstance();
//   }
//   return cachedApp;
// }

// export default async (req: any, res: any) => {
//   console.log('test4');
//   const app = await bootstrap();
//   return app(req, res);
// };

// (async () => {
//   console.log('Forcing execution...');
//   await (await import('./main')).default({}, {});
// })();

const dotenvResult = dotenv.config();
if (dotenvResult.error) {
  console.error('Error loading .env file:', dotenvResult.error);
} else {
  console.log('Environment variables loaded successfully');
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // Global prefix
  app.setGlobalPrefix('api');
  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    allowedHeaders: 'Content-Type, Accept, Authorization',
  });
  // Swagger setup
  const config = new DocumentBuilder()
    .setTitle('CHEFLY API')
    .setDescription('Authentication and User Management API')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  await app.listen(3000);
}
bootstrap();
