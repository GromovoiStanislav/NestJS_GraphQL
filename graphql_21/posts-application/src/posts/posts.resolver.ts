import {
  Args,
  ID,
  Parent,
  Query,
  ResolveField,
  Resolver
} from "@nestjs/graphql";
import { Post } from "./models/post.model";
import { User } from "./models/user.model";
import { PostsService } from "./posts.service";
import { ParseIntPipe } from "@nestjs/common";

@Resolver(() => Post)
export class PostsResolver {

  constructor(
    private readonly postsService: PostsService
  ) {
  }


  @Query(() => Post)
  async post(@Args({ name: "id", type: () => ID }, ParseIntPipe) id: number): Promise<Post> {
    return this.postsService.findOne(id);
  }


  @Query(() => [Post])
  async posts(): Promise<Post[]> {
    return this.postsService.findAll();
  }


  @ResolveField(() => User)
  async user(@Parent() post: Post): Promise<any> {
    return { __typename: "User", id: post.authorId };
  }

}
