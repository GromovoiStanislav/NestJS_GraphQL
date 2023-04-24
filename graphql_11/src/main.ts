import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {express as voyagerMiddleware} from 'graphql-voyager/middleware'

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use('/voyager',voyagerMiddleware({endpointUrl:'/graphql'}))
  await app.listen(3000);
}
bootstrap();
