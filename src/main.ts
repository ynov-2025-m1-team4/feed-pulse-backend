import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import { LogLevel, ValidationPipe, VersioningType } from '@nestjs/common';
import helmet from 'helmet';
import { AllExceptionsFilter } from './shared/all-exceptions.filter';

async function bootstrap() {
  const appOptions = {
    cors: true,
    logger: ['error', 'warn', 'log', 'debug'] as LogLevel[],
  };
  const app = await NestFactory.create(AppModule, appOptions);
  const { httpAdapter } = app.get(HttpAdapterHost);

  app.use(helmet());
  app.setGlobalPrefix('api');
  app.enableVersioning({ type: VersioningType.URI });
  app.useGlobalFilters(new AllExceptionsFilter(httpAdapter));
  app.useGlobalPipes(new ValidationPipe());

  const options = new DocumentBuilder()
    .setTitle('Feed pulse API')
    .setDescription('Feed pulse API description')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('/docs', app, document, { useGlobalPrefix: true });

  await app.listen(
    app.get(ConfigService).get('PORT', 3000),

    () =>
      console.log(
        `Server is running on port ${app.get(ConfigService).get('PORT', 3000)}, \
docs available at: http://localhost:${app.get(ConfigService).get('PORT', 3000)}/api/docs`,
      ),
  );
}

bootstrap().catch((err) => {
  console.error('Error starting the application:', err);
  process.exit(1);
});
