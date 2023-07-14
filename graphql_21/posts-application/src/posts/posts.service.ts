import { Injectable } from "@nestjs/common";
import { Post } from "./models/post.model";

@Injectable()
export class PostsService {

  private posts: Post[] = [
    { authorId: 1, id: 1, title: "Lorem Ipsum" },
    { authorId: 1, id: 2, title: "Foo" },
    { authorId: 2, id: 3, title: "Bar" },
    { authorId: 2, id: 4, title: "Hello World" }
  ];


  async findAllByAuthorId(authorId: number): Promise<Post[]> {
    return this.posts.filter((post) => post.authorId === Number(authorId));
  }


  async findOne(postId: number): Promise<Post> {
    return this.posts.find((post) => post.id === postId);
  }


  async findAll(): Promise<Post[]> {
    return this.posts;
  }

}
