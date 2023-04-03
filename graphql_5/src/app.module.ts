import { Module } from "@nestjs/common";
import { GraphQLModule } from "@nestjs/graphql";
import { join } from "node:path";
import { ApolloDriver, ApolloDriverConfig } from "@nestjs/apollo";
import { LaunchModule } from "./launch/launch.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserModule } from "./user/user.module";
import { ConfigModule } from "@nestjs/config";
import { config } from "./config";
import { DatabaseConfig } from "./database.config";


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [config],
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      typePaths: ["./**/*.graphql"],
      definitions: { path: join(process.cwd(), "src/graphql.ts") },
      context: ({ req }) => ({ headers: req.headers })
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useClass: DatabaseConfig,
    }),
    LaunchModule,
    UserModule
  ]
})
export class AppModule {
}
