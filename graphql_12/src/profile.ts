import { Field, Int, ObjectType } from "@nestjs/graphql";
import { User } from "./user";

@ObjectType()
export class Profile {
  @Field(type => Int)
  id: number;

  @Field(type => String)
  bio: string;

  @Field(type => User)
  user: User;

  @Field(type => Int)
  userId: number;
}