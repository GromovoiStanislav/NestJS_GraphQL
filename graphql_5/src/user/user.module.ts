import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserService } from "./user.service";
import { UserEntity } from "./user.entity";
import { UserResolver } from "./user.resolver";
import { LaunchModule } from "../launch/launch.module";

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    LaunchModule
  ],
  providers: [UserService, UserResolver]
})
export class UserModule {
}