import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class CreatePetInputDto {

  @Field()
  name: string;

  @Field({ nullable: true })
  type?: string;

}