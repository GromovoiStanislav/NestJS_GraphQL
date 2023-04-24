import { Parent, ResolveField, Resolver } from "@nestjs/graphql";
import { Author } from "./author.model";

import { PostsService } from "./posts.service";
import { Post } from "./post.model";

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