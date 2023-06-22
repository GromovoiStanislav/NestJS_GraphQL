import { Resolver, Query, Mutation, Args, Subscription } from "@nestjs/graphql";
import { PostsService } from "./posts.service";
import { Post, NewPost, UpdatePost } from "src/graphql.schema";
import { PubSub } from "graphql-subscriptions";
import { CreatePostDto } from "./dto/create-post.dto";
import { UpdatePostDto } from "./dto/update-post.dto";

const pubSub = new PubSub();

@Resolver("Post")
export class PostsResolvers {

  constructor(
    private readonly postService: PostsService
  ) {
  }


  @Query("posts")
  async posts(): Promise<Post[]> {
    return this.postService.findAll();
  }


  @Query("post")
  async post(@Args("id") args: string): Promise<Post> {
    return this.postService.findOne(args);
  }


  @Mutation("createPost")
  async create(@Args("input") args: CreatePostDto) {
    const createdPost = await this.postService.create(args);
    pubSub.publish("postCreated", { postCreated: createdPost });
    return createdPost;
  }


  @Mutation("updatePost")
  async update(@Args("input") args: UpdatePostDto) {
    const updatedPost = await this.postService.update(args);
    if (updatedPost) {
      pubSub.publish("postUpdated", { postUpdated: updatedPost });
    }
    return updatedPost;
  }


  @Mutation("deletePost")
  async delete(@Args("id") args: string) {
    const deletedPost = await this.postService.delete(args);
    if (deletedPost) {
      pubSub.publish("postDeleted", { postDeleted: deletedPost });
    }
    return deletedPost;
  }


  @Subscription("postCreated")
  postCreated() {
    return pubSub.asyncIterator("postCreated");
  }

  @Subscription("postUpdated")
  postUpdated() {
    return pubSub.asyncIterator("postUpdated");
  }

  @Subscription("postDeleted")
  postDeleted() {
    return pubSub.asyncIterator("postDeleted");
  }

}
