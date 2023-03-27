import { ArgsType, Field, Int } from '@nestjs/graphql';
import { IsEnum, IsOptional, Max, Min } from "class-validator";

@ArgsType()
export class PaginationArgs {
  @Field(type => Int)
  @Min(0)
  skip = 0;

  @Field(type => Int)
  @Min(1)
  @Max(50)
  take = 25;

  @Field({ nullable: true })
  @IsOptional()
  @IsEnum(['asc','desc'])
  orderById: string

  @Field({ nullable: true })
  @IsOptional()
  @IsEnum(['asc','desc'])
  orderByName: string
}