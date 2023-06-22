import { NewPost } from "../../graphql.schema";
import { IsNotEmpty, IsString } from "class-validator";

export class CreatePostDto extends NewPost {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  text: string;
}