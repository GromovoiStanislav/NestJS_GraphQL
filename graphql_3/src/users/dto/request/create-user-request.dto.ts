import { IsEmail, IsNotEmpty, IsNumber } from "class-validator";

export class CreateUserRequest {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNumber()
  @IsNotEmpty()
  age: number;
}
