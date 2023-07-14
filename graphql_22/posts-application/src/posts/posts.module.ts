import {
  ApolloFederationDriver,
  ApolloFederationDriverConfig
} from "@nestjs/apollo";
import { Module } from "@nestjs/common";
import { GraphQLModule } from "@nestjs/graphql";
import { PostsResolver } from "./posts.resolver";
import { PostsService } from "./posts.service";
import { UsersResolver } from "./users.resolver";
import { ApolloServerPluginInlineTrace } from "@apollo/server/plugin/inlineTrace";


@Module({
  imports: [
    GraphQLModule.forRoot<ApolloFederationDriverConfig>({
      driver: ApolloFederationDriver,
      typePaths: ["**/*.graphql"],
      plugins: [ApolloServerPluginInlineTrace()]
    })
  ],
  providers: [PostsService, PostsResolver, UsersResolver]
})
export class PostsModule {
}
