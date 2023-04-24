import { Field, Int, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class Author {
  @Field(type => Int)
  id: number;

  @Field()
  name: string;
}