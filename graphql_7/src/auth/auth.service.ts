import { BadRequestException, Injectable } from "@nestjs/common";
import { UsersService } from "../users/users.service";
//import { LoginInput } from "./dto/login.input";
import { User } from "../users/entities/user.entity";
import { JwtService } from "@nestjs/jwt";
import { LoginInput } from "./dto/login.input";

@Injectable()
export class AuthService {

  constructor(
    private usersService: UsersService,
    private jwtService: JwtService) {
  }

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.usersService.findOne(username);

    if (user && user.password === password) {
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
    const user = await this.usersService.findOne(loginInput.name)
    if(user){
      throw new BadRequestException('User already exist!')
    }
    return this.usersService.create(loginInput)

  }
}
