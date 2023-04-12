import { Resolver, Query, Mutation, Args, Context } from "@nestjs/graphql";
import { UserService } from "./user.service";
import { ConfirmUserInput, CreateUserInput, LoginInput, User } from "./user.schema";
import Ctx from "../types/context.type";
import { UseGuards } from "@nestjs/common";
import { GqlAuthGuard } from "./gql-auth.guard";
import { CurrentUser } from "./current-user.decorator";


@Resolver(() => User)
export class UserResolver {

  constructor(private readonly userService: UserService) {
  }

  @Mutation(() => User)
  async registerUser(@Args("input") input: CreateUserInput) {
    return this.userService.createUser(input);
  }

  @Mutation(() => User)
  async confirmUser(@Args("input") input: ConfirmUserInput) {
    return this.userService.confirmUser(input);
  }

  @Query(() => User, { nullable: true })
  async login(@Args("input") input: LoginInput, @Context() context: Ctx) {
    return this.userService.login(input, context.res);
  }

  @Query(() => User, { nullable: true })
  @UseGuards(GqlAuthGuard)
  async me(@CurrentUser() user: User) {
    return user;
  }
  // async me(@Context() context: Ctx) {
  //   return context.req.user;
  // }


  @Query(() => User, { nullable: true })
  @UseGuards(GqlAuthGuard)
  async logout(@Context() context: Ctx) {
    await this.userService.logout(context.res);
    return context.req.user;
  }

}
