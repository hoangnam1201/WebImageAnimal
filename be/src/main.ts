import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { useContainer } from 'class-validator';
import { join } from 'path';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const configService: ConfigService = app.get(ConfigService);
  //static
  app.useStaticAssets(join(__dirname, '..', 'public'), { prefix: '/public/' });
  //cors
  app.enableCors({
    origin: '*',
    allowedHeaders: ['Authorization', 'Content-Type'],
    methods: ['GET', 'PUT', 'HEAD', 'PATCH', 'POST', 'DELETE'],
  });
  //swagger
  const config = new DocumentBuilder()
    .setTitle('Animal web API')
    .setDescription('The API description')
    .setVersion('1.0')
    .addBearerAuth()
    .addTag('auth')
    .addTag('users')
    .addTag('tags')
    .addTag('pictures')
    .addTag('reviews')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  //Validation
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  //
  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  await app.listen(configService.get<number>('PORT'));
}
bootstrap();
