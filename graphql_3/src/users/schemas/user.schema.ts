import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";
import { Field, Int, ObjectType } from "@nestjs/graphql";

export type UserDocument = HydratedDocument<User>;

@ObjectType()
@Schema()
export class User {
  @Field()
  @Prop()
  userId: string;

  @Field()
  @Prop()
  email: string;

  @Field(() => Int)
  @Prop()
  age: number;

  @Field(() => [String])
  @Prop([String])
  favoriteFoods: string[];
}

export const UserSchema = SchemaFactory.createForClass(User);