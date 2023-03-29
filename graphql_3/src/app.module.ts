import { Module } from "@nestjs/common";
//import { MongooseModule } from "@nestjs/mongoose";
import { UsersModule } from "./users/users.module";
import { GraphQLModule } from "@nestjs/graphql";
import { ApolloDriver, ApolloDriverConfig } from "@nestjs/apollo";
import { ConfigModule } from "@nestjs/config";
import { DatabaseModule } from "./database/database.module";


@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    //MongooseModule.forRoot("mongodb://localhost/demo"),
    DatabaseModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true
    }),
    UsersModule
  ]
})
export class AppModule {
}
