import { Field, ID, InputType } from '@nestjs/graphql'
import { IsEmail, IsInt, IsOptional, MaxLength } from "class-validator";

@InputType()
export class UpdateUserInput {
  @IsInt()
  @Field(() => ID)
  id: number

  @IsOptional()
  @IsEmail()
  @Field({ nullable: true })
  email: string

  @IsOptional()
  @MaxLength(30)
  @Field({ nullable: true })
  name: string
}