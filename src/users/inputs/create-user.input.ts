import { Field, InputType } from '@nestjs/graphql'
import { IsEmail, IsOptional, MaxLength } from "class-validator";

@InputType()
export class CreateUserInput {
  @IsEmail()
  @Field()
  email: string

  @IsOptional()
  @MaxLength(30)
  @Field({ nullable: true })
  name: string
}