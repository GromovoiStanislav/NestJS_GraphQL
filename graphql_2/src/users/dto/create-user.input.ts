import { Field, InputType, Int } from "@nestjs/graphql";
import { IsEmail, IsNotEmpty, IsNumber } from "class-validator";

@InputType()
export class CreateUserInput {
  @Field()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @Field(() => Int)
  @IsNotEmpty()
  @IsNumber()
  age: number;
}