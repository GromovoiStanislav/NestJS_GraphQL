import { IsArray, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class UpdateUserRequest {
  @IsOptional()
  @IsNotEmpty()
  age?: number;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  favoriteFoods?: string[];
}