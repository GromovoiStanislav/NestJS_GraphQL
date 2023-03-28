import { Field, InputType, Int } from "@nestjs/graphql";
import { IsBoolean, IsNotEmpty, IsNumber, IsOptional } from "class-validator";

@InputType()
export class UpdateUserInput {
  @Field()
  @IsNotEmpty()
  userId: string;

  @Field(() => Int,{ nullable: true })
  @IsOptional()
  @IsNumber()
  age?: number;

  @Field({ nullable: true })
  @IsOptional()
  @IsBoolean()
  isSubscribed?: boolean
}