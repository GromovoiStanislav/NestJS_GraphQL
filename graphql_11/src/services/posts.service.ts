import { Injectable } from "@nestjs/common";

@Injectable()
export class PostsService {

  findAllByAuthor( authorId: number ) {
     return [
      { id: 1, title: "Title 1", authorId: 1 },
      { id: 2, title: "Title 2", authorId: 1 },
      { id: 3, title: "Title 3", authorId: 1 },
      { id: 4, title: "Title 4", authorId: 1 },
    ];
  }
}