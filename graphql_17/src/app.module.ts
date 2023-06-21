import { ApolloDriver, ApolloDriverConfig } from "@nestjs/apollo";
import { Module } from "@nestjs/common";
import { GraphQLModule } from "@nestjs/graphql";
import { CatsModule } from "./cats/cats.module";
import { join } from "node:path";

@Module({
  imports: [
    CatsModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      typePaths: ["./**/*.graphql"],

      installSubscriptionHandlers: true,



      definitions: {
        path: join(process.cwd(), "src/graphql.schema.ts"),
        outputAs: "class"
      }
    })
  ]
})
export class AppModule {
}
