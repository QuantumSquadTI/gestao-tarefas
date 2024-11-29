import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as path from 'path';
import * as express from 'express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  
  app.enableCors({
    origin: '*', 
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: ['Content-Type, Accept', 'Authorization'],
  });

  app.useGlobalPipes(new ValidationPipe());

  app.use('/frontend/assets/image', express.static(path.join(__dirname, 'frontend/assets/image')));
  
  await app.listen(3001);
}

bootstrap();