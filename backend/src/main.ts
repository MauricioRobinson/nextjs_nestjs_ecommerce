import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  //Enables CORS
  app.enableCors();
  //Enables header security
  app.use(helmet());

  //Adds API Versioning
  app.enableVersioning({
    type: VersioningType.URI,
  });
  //Sets global prefix after hostname
  app.setGlobalPrefix('api/v1');

  //Sets up Global Validation Pipes or request protection
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  //Set up Swagger for documentation
  const config = new DocumentBuilder()
    .setTitle('Next Ecommerce')
    .setDescription('The Next Ecommerce API documentation')
    .setVersion('1.0')
    .addTag('APIs')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/v1/docs', app, document);

  await app.listen(8000);
}
bootstrap();
