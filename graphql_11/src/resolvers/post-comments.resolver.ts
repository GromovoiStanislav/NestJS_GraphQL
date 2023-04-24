import { Parent, ResolveField, Resolver } from "@nestjs/graphql";
import { Author } from "../models/author.model";

import { PostsService } from "../services/posts.service";
import { Post } from "../models/post.model";

@Resolver(() => Author)
export class AuthorPostsResolver {
  constructor(
    private postsService: PostsService
  ) {
  }

  @ResolveField(() => [Post])
  async posts(@Parent() author: Author) {
    const { id } = author;
    return this.postsService.findAllByAuthor(id);
  }
}