import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from './prisma/prisma.service';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const swConfig = new DocumentBuilder()
    .setTitle('Median')
    .setDescription('The Median API description')
    .setVersion('0.1')
    .build();

  const document = SwaggerModule.createDocument(app, swConfig);
  SwaggerModule.setup('api', app, document);

  const prismaService = app.get(PrismaService);
  await prismaService.enableShutdownHooks(app);

  const config = await app.get(ConfigService);
  const port = config.get<number>('API_PORT');
  await app.listen(port || 3000, () => {
    console.log(`started on ${port}`);
  });
}
bootstrap();
