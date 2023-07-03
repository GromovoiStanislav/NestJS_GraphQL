import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class Cat {
  @Field(() => String)
  name: string;

  @Field(() => String)
  breed: string;

  @Field(() => String)
  image: string;
}


@ObjectType()
export class File {
  @Field(() => String)
  image: string;
}