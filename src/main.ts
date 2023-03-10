import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { LoggerService } from './logger/logger.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: false,
  });
  app.enableCors();
  app.setGlobalPrefix('v1');
  app.useLogger(new LoggerService());
  await app.listen(process.env.PORT || 3001);
}
bootstrap();
