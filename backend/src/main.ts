import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: [
      'http://localhost:5173',
      'https://dj1y4jaxpydgc.cloudfront.net',
    ],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    credentials: true,
  });

  if (process.env.NODE_ENV === 'development') {
    const config = new DocumentBuilder()
      .setTitle('MegaTen Build Calculator - API')
      .setDescription('Documentação da API')
      .setVersion('1.0')
      .build();

    const document = SwaggerModule.createDocument(app, config);

    SwaggerModule.setup('api', app, document);
  }

  await app.listen(process.env.PORT ?? 3000);
}

bootstrap();