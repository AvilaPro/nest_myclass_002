import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
//14.2.1 importar la libreria helmet
import helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  //14.2.2 configurar helmet
  app.use(helmet());
  //14.1.1 configurar cors
  app.enableCors();
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
