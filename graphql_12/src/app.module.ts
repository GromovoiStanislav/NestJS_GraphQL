import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { GraphQLModule } from "@nestjs/graphql";
import { ApolloDriver, ApolloDriverConfig } from "@nestjs/apollo";
import { join } from "node:path";
import { PrismaService } from "./prisma.service";
import { PostResolver } from "./resolvers.post";
import { UserResolver } from "./resolvers.user";

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), "src/schema.gql")
    })
  ],
  controllers: [AppController],
  providers: [PrismaService, UserResolver, PostResolver]
})
export class AppModule {
}
