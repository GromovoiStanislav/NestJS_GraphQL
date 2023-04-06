import { Module, OnModuleInit } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthResolver } from "./auth.resolver";
import { UsersModule } from "../users/users.module";
import { LocalStrategy } from "./strategies/local.strategy";
import { JwtModule } from "@nestjs/jwt";
import { JwtStrategy } from "./strategies/jwt.strategy";

@Module({
  imports: [
    JwtModule.register({
      secret: "process.env.JWT_SECRET",
      signOptions: { expiresIn: "15m" }
    }),
    UsersModule
  ],
  providers: [AuthService, AuthResolver, LocalStrategy, JwtStrategy]
})
export class AuthModule implements OnModuleInit {
  constructor(private authService: AuthService) {
  }

  async onModuleInit() {
    await this.authService.signup({name: "marius", password: "123"})
    await this.authService.signup({name: "maria", password: "123"})
  }
}
