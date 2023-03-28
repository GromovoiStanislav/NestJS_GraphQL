import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { UsersModule } from "../users/users.module";
import { JwtModule } from "@nestjs/jwt";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { PassportModule } from "@nestjs/passport";


@Module({
  providers: [AuthService],
  controllers: [AuthController],
  imports: [
    PassportModule.register({ defaultStrategy: "jwt" }),
    // JwtModule.register({
    //   secret: process.env.JWT_SECRET || 'SECRET',
    //   signOptions: { expiresIn: '3600s' }
    // }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>("JWT_SECRET"),
        signOptions: { expiresIn: "3600s" }
      })
    }),
    UsersModule
  ]

})
export class AuthModule {
}
