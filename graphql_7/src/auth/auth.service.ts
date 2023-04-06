import { BadRequestException, Injectable } from "@nestjs/common";
import { UsersService } from "../users/users.service";
import { User } from "../users/entities/user.entity";
import { JwtService } from "@nestjs/jwt";
import { LoginInput } from "./dto/login.input";
import * as bcrypt from "bcrypt";

@Injectable()
export class AuthService {

  constructor(
    private usersService: UsersService,
    private jwtService: JwtService) {
  }

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.usersService.findOne(username);
    const valid = await  bcrypt.compare(password,user?.password)

    if (user && valid) {
      const { password, ...result } = user;
      return result;
    }

    return null;
  }

  // async login(loginUserInput: LoginInput) {
  //   const user = await this.usersService.findOne(loginUserInput.name);
  //   const { password, ...result } = user;
  //   return {
  //     access_token: "JWT",
  //     user: result
  //   };
  // }

  async login(user: User) {
    return {
      access_token: this.jwtService.sign({
        username: user.name, sub: user.id
      }),
      user
    };
  }

  async signup(loginInput: LoginInput) {
    const user = await this.usersService.findOne(loginInput.name);
    if (user) {
      throw new BadRequestException("User already exist!");
    }

    const password = await bcrypt.hash(loginInput.password, 10);
    return this.usersService.create({ ...loginInput, password });

  }
}
