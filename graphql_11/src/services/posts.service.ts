import { Injectable } from "@nestjs/common";
import { Post } from "../models/post.model";

@Injectable()
export class PostsService {

  data: Post[] = [
    { id: 1, title: "Title 1", authorId: 1 },
    { id: 2, title: "Title 2", authorId: 1 },
    { id: 3, title: "Title 3", authorId: 2 },
    { id: 4, title: "Title 4", authorId: 2 }
  ];

  findAllByAuthor(authorId: number) {
    return this.data.filter(post => post.authorId === authorId);
  }
}