import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as morgan from 'morgan';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  //Configuration Service .env
  const configService = app.get<ConfigService>(ConfigService);

  //Modules Initialization
  app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true }));
  //morgan
  app.use(morgan(configService.get('MORGAN_ENV')));
  app.use(morgan('dev'));

  await app.listen(configService.get('APPLICATION_PORT'));
}
bootstrap();
