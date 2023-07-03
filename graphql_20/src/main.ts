import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
// @ts-ignore
import * as graphqlUploadExpress from "graphql-upload/graphqlUploadExpress.js";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();

  // // Set app to use graphql-upload
  app.use(graphqlUploadExpress({ maxFileSize: 1000000, maxFiles: 10 }));

  await app.listen(3000);
}

bootstrap();
