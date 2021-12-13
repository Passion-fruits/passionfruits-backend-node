import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { AppModule } from './app.module';
import { connectRedis } from './config/redis';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  app.useLogger(app.get(WINSTON_MODULE_NEST_PROVIDER));
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );
  await connectRedis();
  await app.listen(process.env.PORT);
  console.log(`Server running on: ${await app.getUrl()}`);
}
bootstrap();
