import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, Logger } from '@nestjs/common';
import * as Sentry from '@sentry/node';

async function bootstrap() {
    const logger = new Logger('bootstrap');
    const app = await NestFactory.create(AppModule);
    app.enableCors();
    app.useGlobalPipes(
        new ValidationPipe({
            transform: true,
        }),
    );

    Sentry.init({
        dsn: process.env.SENTRY || '',

        tracesSampleRate: 1.0,
    });

    const PORT = Number(process.env.PORT) || 3000;
    await app.listen(PORT, '0.0.0.0');

    logger.log(`Application listening on port: ${PORT}`);
}
bootstrap();
