import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
const helmet = require('helmet')

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService: ConfigService = app.get(ConfigService);
  const port = configService.get<number>('PORT') || 3000

  app.use(helmet());
  app.useGlobalPipes(new ValidationPipe({
    forbidUnknownValues: true,
    disableErrorMessages: true,
  }));
  app.enableCors();

  await app.listen(port);
}
bootstrap();
