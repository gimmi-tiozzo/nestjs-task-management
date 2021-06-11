import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { TransformInterceptor } from './transform.interceptor';

const PORT = process.env.PORT ?? 3000;

/**
 * Crea una applicazione NestJs self-host a partire dal modulo root e avviala sulla porta PORT
 */
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalInterceptors(new TransformInterceptor());

  await app.listen(PORT);
}

//avvia NestJs
bootstrap();
