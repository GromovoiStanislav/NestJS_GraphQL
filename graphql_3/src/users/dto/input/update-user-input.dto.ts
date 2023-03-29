import { Field, InputType, Int } from "@nestjs/graphql";
import { IsArray, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

@InputType()
export class UpdateUserInput {
  @Field()
  @IsNotEmpty()
  userId: string;

  @Field( () => Int,{ nullable: true })
  @IsOptional()
  @IsNumber()
  age?: number;

  @Field(() => [String], { nullable: true })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  favoriteFoods?: string[];
}
