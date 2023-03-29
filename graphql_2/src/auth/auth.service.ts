import { Injectable, UnauthorizedException } from "@nestjs/common";
import { UsersService } from "../users/users.service";
import { JwtService } from "@nestjs/jwt";
import { User } from "../users/models/user";
//import { ConfigService } from "@nestjs/config";
import { bcrypt_util } from "./utils/bcrypt.util";

@Injectable()
export class AuthService {

  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    //private configService: ConfigService
  ) {
  }


  async validate(email: string, password: string): Promise<User | null> {
    const user = await this.usersService.getUserByEmail(email);
    if (!user) {
      return null;
    }
    //const passwordIsValid = password === user.password;
    const passwordIsValid = await bcrypt_util.comparePasswords(password, user.password);
    return passwordIsValid ? user : null;
  }


  async login(user: User): Promise<{ access_token: string }> {
    const payload = {
      email: user.email,
      sub: user.userId
    };
    return {
      access_token: await this.jwtService.signAsync(payload)
    };
  }


  // async verify(token: string): Promise<User> {
  //   const decoded = await this.jwtService.verifyAsync(token, {
  //     secret: this.configService.get<string>("JWT_SECRET")
  //   });
  //   //const user = await this.usersService.getUserByEmail(decoded.email);
  //   const user = await this.usersService.getUserByid(decoded.sub);
  //   if (!user) {
  //     throw new UnauthorizedException();
  //   }
  //   return user;
  //}

}
