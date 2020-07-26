import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as helmet from 'helmet';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService: ConfigService = app.get(ConfigService);
  const port = configService.get<number>('PORT') || 3000

  app.useGlobalPipes(new ValidationPipe({
    forbidUnknownValues: true,
    disableErrorMessages: true,
  }));
  app.use(helmet());
  app.enableCors();

  await app.listen(port);
}
bootstrap();
