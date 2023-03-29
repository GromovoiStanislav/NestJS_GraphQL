import { Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from "passport-jwt";
import { User } from '../../users/models/user';

import { UsersService } from '../../users/users.service';
import { ConfigService } from "@nestjs/config";


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {

  constructor(private readonly usersService: UsersService,
              private configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>("JWT_SECRET")
    })
  }

  async validate(payload: { email: string, sub: string }): Promise<User | null> {
    //return this.usersService.getUserByEmail(payload.email);
    return this.usersService.getUserByid(payload.sub);
    //return { email: payload.email, userId: payload.sub }
  }
}