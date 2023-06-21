import { CreateCatInput } from "../../graphql.schema";
import { IsNotEmpty, IsNumber, IsString, Min } from "class-validator";

export class CreateCatDto extends CreateCatInput {
  @IsNotEmpty()
  @IsNumber()
  age: number;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsNumber()
  ownerId: number;
}
