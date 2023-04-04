import { Field, InputType, Int } from "@nestjs/graphql";
import { IsAlpha, IsNotEmpty, IsNumber, IsOptional } from "class-validator";

@InputType()
export class CreatePetInput {

  @IsNotEmpty()
  @IsAlpha()
  @Field()
  name: string;

  @IsOptional()
  @IsAlpha()
  @Field({ nullable: true })
  type?: string;

  @IsNotEmpty()
  @IsNumber()
  @Field(type => Int)
  ownerId: number;

}