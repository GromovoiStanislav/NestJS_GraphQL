import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { GqlExecutionContext } from "@nestjs/graphql";
import * as jwt from "jsonwebtoken";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private configService: ConfigService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const ctx = GqlExecutionContext.create(context).getContext();
    if (!ctx.headers.authorization) {
      return false;
    }
    ctx.user = await this.validateToken(ctx.headers.authorization);
    return true;
  }

  async validateToken(auth: string) {
    if (auth.split(" ")[0] !== "Bearer") {
      throw new UnauthorizedException("Invalid token");
    }
    const token = auth.split(" ")[1];

    try {
      const secret = this.configService.get('JWT_SECRET');
      return jwt.verify(token, secret);

    } catch (err) {
      const message = "Token error: " + (err.message || err.name);
      throw new UnauthorizedException(message);
    }
  }

}