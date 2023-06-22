import { UpdatePost } from "../../graphql.schema";
import { IsBoolean, IsNotEmpty, IsOptional, IsString, MinLength } from "class-validator";

export class UpdatePostDto extends UpdatePost {
  @IsNotEmpty()
  @IsString()
  id: string;

  @IsOptional()
  @IsString()
  @MinLength(3)
  title?: string;

  @IsOptional()
  @IsString()
  @MinLength(5)
  text?: string;

  @IsOptional()
  @IsBoolean()
  isPublished?: boolean;
}