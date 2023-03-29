import { Controller, Post, Req, UseGuards } from "@nestjs/common";
//import { Request } from 'express';

import { User } from "../users/models/user";
import { AuthService } from "./auth.service";
import { LocalAuthGuard } from "./guards/local-auth.guard";
import { CurrentUser } from "./decorators/current-user.decorator";

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // body = {
  //   "email":"dan@example.com",
  //   "password":"mypassword"
  // }
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@CurrentUser() user: User): Promise<{ access_token: string }> {
    return this.authService.login(user);
  }
  // async login(@Req() req: Request): Promise<{ access_token: string }> {
  //   return this.authService.login(req.user as User);
  // }
}