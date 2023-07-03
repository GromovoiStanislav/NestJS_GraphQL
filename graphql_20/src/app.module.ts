import { Module } from "@nestjs/common";
import { GraphQLModule } from "@nestjs/graphql";
import { ApolloDriver, ApolloDriverConfig } from "@nestjs/apollo";
import { join } from "node:path";
import { CatsModule } from "./cats/cats.module";


@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      // autoSchemaFile: true,
      autoSchemaFile: join(process.cwd(), "src/schema.gql")
    }),
    CatsModule
  ]
})
export class AppModule {
}
