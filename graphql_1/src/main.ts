import { NestFactory } from '@nestjs/core'
import { ConfigService } from '@nestjs/config'

import { AppModule } from './app.module'
import { ValidationPipe } from "@nestjs/common";

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.useGlobalPipes(new ValidationPipe());
  const config = await app.get(ConfigService)
  const port = config.get<number>('API_PORT')
  await app.listen(port || 3000, () => {
    console.log(`Server started on port: ${port}`)
  })
}

bootstrap()