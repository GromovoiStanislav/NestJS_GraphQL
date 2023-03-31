import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { PostsService } from './posts.service';
import { AddCommentInput } from '../graphql';

@Resolver()
export class PostsResolver {
  constructor(private postsService: PostsService) {}

  @Query()
  getPosts() {
    return this.postsService.getPosts();
  }

  @Mutation()
  createPost(@Args('title') title: string, @Args('content') content: string) {
    return this.postsService.createPost(title, content);
  }

  @Mutation()
  addComment(@Args('input') { text, user, postId }: AddCommentInput) {
    return this.postsService.addComment(postId, text, user);
  }
}
