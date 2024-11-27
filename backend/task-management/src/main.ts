import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { JwtAuthGuard } from './usuario/guard';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());

  const jwtAuthGuard = app.get(JwtAuthGuard); // alterado
  app.useGlobalGuards(jwtAuthGuard); // alterado
  await app.listen(3000);
}
bootstrap();