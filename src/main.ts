import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });

  // Fix CORS - .env
  app.enableCors({
    origin: ['http://localhost:5173'],
    methods: ['POST', 'PATCH', 'DELETE', 'GET'],
  });
  await app.listen(3000);
}
bootstrap();
