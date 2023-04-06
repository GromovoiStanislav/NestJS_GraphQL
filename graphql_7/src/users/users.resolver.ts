import { Resolver, Query, Mutation, Args, Context } from "@nestjs/graphql";
import { UsersService } from "./users.service";
import { User } from "./entities/user.entity";
import { CreateUserInput } from "./dto/create-user.input";
import { UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";


@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {
  }


  @Query(() => [User], { name: "users" })
  @UseGuards(JwtAuthGuard)
  async findAll(@Context() context): Promise<User[]> {
    console.log(context.req.user);
    return this.usersService.findAll();
  }


  @Query(() => User, { name: "user", nullable: true })
  @UseGuards(JwtAuthGuard)
  async findOne(@Args("username") username: string): Promise<User> {
    return this.usersService.findOne(username);
  }

}
