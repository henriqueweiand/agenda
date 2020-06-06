import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.enableCors();
    app.useGlobalPipes(new ValidationPipe());

    const PORT = Number(process.env.PORT) || 3000;
    await app.listen(PORT, '0.0.0.0');
}
bootstrap();