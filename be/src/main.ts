import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { useContainer } from 'class-validator';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
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
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  //Validation
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  //
  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  await app.listen(3000);
}
bootstrap();
