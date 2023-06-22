import { NewPost } from "../../graphql.schema";
import { IsNotEmpty, IsString, MinLength } from "class-validator";

export class CreatePostDto extends NewPost {
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  title: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(5)
  text: string;
}