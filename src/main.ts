import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { WsAdapter } from '@nestjs/platform-ws';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  app.useWebSocketAdapter(new WsAdapter(app));

  // Fix CORS - .env
  app.enableCors({
    origin: [
      'http://127.0.0.1:5173',
      'http://localhost:5173',
      'https://www.tabaesso.com',
      'https://tabaesso.com',
    ],
    methods: ['POST', 'PATCH', 'DELETE', 'GET'],
  });
  await app.listen(3000);
}
bootstrap();
