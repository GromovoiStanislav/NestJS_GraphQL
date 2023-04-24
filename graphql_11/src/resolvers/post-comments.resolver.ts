import { Parent, ResolveField, Resolver } from "@nestjs/graphql";
import { Post } from "../models/post.model";
import { CommentsService } from "../services/comments.service";
import { Comment } from "../models/comment.model";

@Resolver(() => Post)
export class PostCommentsResolver {
  constructor(
    private commentsService: CommentsService
  ) {
  }

  @ResolveField(() => [Comment])
  async comments(@Parent() post: Post) {
    const { id } = post;
    return this.commentsService.findAllByPost(id);
  }
}