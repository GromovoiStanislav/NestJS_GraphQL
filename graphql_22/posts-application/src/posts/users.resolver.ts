import { Parent, ResolveField, Resolver } from "@nestjs/graphql";
import { PostsService } from "./posts.service";
import { User } from "./users.interfaces";
import { Post } from './posts.interfaces';

@Resolver("User")
export class UsersResolver {

  constructor(
    private readonly postsService: PostsService
  ) {
  }


  @ResolveField("posts")
  async posts(@Parent() user: User): Promise<Post[]> {
    return await this.postsService.findByAuthorId(user.id);
  }

}
