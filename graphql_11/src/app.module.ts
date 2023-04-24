import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { GraphQLModule } from "@nestjs/graphql";
import { ApolloDriver, ApolloDriverConfig } from "@nestjs/apollo";
import { join } from "node:path";
import { AuthorsResolver } from "./resolvers/authors.resolver";
import { AuthorsService } from "./services/authors.service";
import { PostsService } from "./services/posts.service";
import { AuthorPostsResolver } from "./resolvers/author-posts.resolver";
import { PostCommentsResolver } from "./resolvers/post-comments.resolver";
import { CommentsService } from "./services/comments.service";


@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), "src/schema.gql"),
      introspection: true
    })
  ],
  controllers: [AppController],
  providers: [
    AuthorsResolver,
    AuthorPostsResolver,
    PostCommentsResolver,
    AuthorsService,
    PostsService,
    CommentsService
  ]
})
export class AppModule {
}
