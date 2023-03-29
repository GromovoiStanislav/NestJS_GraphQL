import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { UsersService } from "./users.service";
import { User } from "./models/user";
import { GetUserArgs } from "./dto/get-user.args";
import { GetUsersArgs } from "./dto/get-users.args";
import { CreateUserInput } from "./dto/create-user.input";
import { UpdateUserInput } from "./dto/update-user.input";
import { DeleteUserInput } from "./dto/delete-user.input";
import { ForbiddenException, UseGuards } from "@nestjs/common";
import { GqlAuthGuard } from "../auth/guards/gql-auth.guard";
import { CurrentUser } from "../auth/decorators/current-user.decorator";


@Resolver()
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => User, { name: "user", nullable: true })
  async getUser(@Args() getUserArgs: GetUserArgs): Promise<User> {
    return this.usersService.getUser(getUserArgs);
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => [User], { name: "users", nullable: "items" }) //itemsAndList
  getUsers( @Args() getUsersArgs: GetUsersArgs): Promise<User[]> {
    return this.usersService.getUsers(getUsersArgs);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => User)
  async createUser(@Args("createUserData") createUserData: CreateUserInput): Promise<User> {
    return this.usersService.createUser(createUserData);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => User, { nullable: true })
  async updateUser(@CurrentUser() user: User, @Args("updateUserData") updateUserData: UpdateUserInput): Promise<User> {
    if (user.userId !== updateUserData.userId) {
      throw new ForbiddenException();
    }
    return await this.usersService.updateUser(updateUserData);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => User, { nullable: true })
  async deleteUser(@CurrentUser() user: User, @Args("deleteUserData") deleteUserData: DeleteUserInput): Promise<User> {
    if (user.userId !== deleteUserData.userId) {
      throw new ForbiddenException();
    }
    return this.usersService.deleteUser(deleteUserData);
  }

}
