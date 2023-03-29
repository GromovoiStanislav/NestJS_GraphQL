import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";

import { User } from "../../users/models/user";
import { AuthService } from "../auth.service";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {

  constructor(private readonly authService: AuthService) {
    super({ usernameField: "email" });
    // body = {
    //   "email":"dan@example.com",
    //   "password":"mypassword"
    // }
  }

  async validate(email: string, password: string): Promise<User> {
    const user = await this.authService.validate(email, password);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}