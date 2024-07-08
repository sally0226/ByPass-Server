import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.select(AppModule).get(ConfigService);
  const config = new DocumentBuilder()
    .setTitle('ByPass API')
    .setDescription('스쳐가는머니(ByPass) API Docs')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document);

  const port = configService.get('PORT');
  await app.listen(port);

  console.log(`Application is running: http://localhost:${port}/api-docs`);
}
bootstrap();
