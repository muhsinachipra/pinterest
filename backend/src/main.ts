// backend\src\main.ts

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import cookieParser from 'cookie-parser';
import * as dotenv from 'dotenv';

async function bootstrap() {
  dotenv.config();
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: 'https://pinterest-sigma-ten.vercel.app',  // Allow the frontend origin
    methods: 'GET,POST,PUT,DELETE',                    // Allowed methods
    credentials: true,                                // Allow cookies and credentials to be sent
  });

  app.setGlobalPrefix('api');
  app.use(cookieParser());
  await app.listen(3000);
}
bootstrap();
