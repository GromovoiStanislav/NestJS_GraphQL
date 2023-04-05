import { Module } from "@nestjs/common";
import { UsersService } from "./users.service";
import { UsersResolver } from "./users.resolver";
import { PassportModule } from "@nestjs/passport";

@Module({
  imports:[PassportModule],
  providers: [UsersResolver, UsersService],
  exports: [UsersService]
})
export class UsersModule {
}
