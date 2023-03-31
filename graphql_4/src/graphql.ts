
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export class AddCommentInput {
    user: string;
    text: string;
    postId: string;
}

export class Post {
    id: string;
    title: string;
    content: string;
    comments: Nullable<Comment>[];
}

export class Comment {
    user: string;
    text: string;
    date: string;
}

export abstract class IQuery {
    abstract getPosts(): Nullable<Post>[] | Promise<Nullable<Post>[]>;
}

export abstract class IMutation {
    abstract createPost(title: string, content: string): Post | Promise<Post>;

    abstract addComment(input: AddCommentInput): Comment | Promise<Comment>;
}

type Nullable<T> = T | null;
