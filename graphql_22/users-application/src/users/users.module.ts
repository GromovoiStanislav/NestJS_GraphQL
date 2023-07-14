import {
  ApolloFederationDriver,
  ApolloFederationDriverConfig
} from "@nestjs/apollo";
import { Module } from "@nestjs/common";
import { GraphQLModule } from "@nestjs/graphql";
import { UsersResolver } from "./users.resolver";
import { UsersService } from "./users.service";
import { ApolloServerPluginInlineTrace } from "@apollo/server/plugin/inlineTrace";


@Module({
  imports: [
    GraphQLModule.forRoot<ApolloFederationDriverConfig>({
      driver: ApolloFederationDriver,
      typePaths: ["**/*.graphql"],
      plugins: [ApolloServerPluginInlineTrace()],
    })
  ],
  providers: [UsersResolver, UsersService],
})
export class UsersModule {
}
