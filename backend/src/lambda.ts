import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import serverlessExpress from '@codegenie/serverless-express';
import express from 'express';
import { AppModule } from './app.module';

let cachedServer: any;

async function bootstrap() {
  if (!cachedServer) {
    const expressApp = express();

    const nestApp = await NestFactory.create(
      AppModule,
      new ExpressAdapter(expressApp),
    );

    nestApp.enableCors({
      origin: [
        'http://localhost:5173',
        'https://dj1y4jaxpydgc.cloudfront.net/',
      ],
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
      credentials: true,
    });

    await nestApp.init();

    cachedServer = serverlessExpress({
      app: expressApp,
    });
  }

  return cachedServer;
}

export const handler = async (event: any, context: any, callback: any) => {
  const server = await bootstrap();
  return server(event, context, callback);
};