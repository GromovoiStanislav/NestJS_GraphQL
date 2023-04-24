import { Injectable } from "@nestjs/common";
import { Comment } from "../models/comment.model";

@Injectable()
export class CommentsService {

  data: Comment[] = [
    { id: 1, text: "Comment 1", postId: 1 },
    { id: 2, text: "Comment 2", postId: 2 },
    { id: 3, text: "Comment 3", postId: 3 },
    { id: 4, text: "Comment 4", postId: 3 }
  ];

  findAllByPost(postId: number) {
    return this.data.filter(post => post.postId === postId);
  }

}
