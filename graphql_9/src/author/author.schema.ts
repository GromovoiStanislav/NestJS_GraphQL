import { Field, ObjectType, ID, InputType } from "@nestjs/graphql";
import { Book } from "../book/book.schema";
import { HydratedDocument } from "mongoose";
import * as mongoose from 'mongoose';
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

export type AuthorDocument = HydratedDocument<Author>;

@Schema()
@ObjectType()
export class Author {
  @Field(() => ID) // <-- GraphQL type
  _id: string; // <-- TypeScript type

  @Prop({ required: true })
  @Field()
  name: string;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Book" }] })
  @Field(() => [Book])
  books: Book[];
}

export const AuthorSchema = SchemaFactory.createForClass(Author);

@InputType()
export class CreateAuthorInput {
  @Field()
  name: string;
}