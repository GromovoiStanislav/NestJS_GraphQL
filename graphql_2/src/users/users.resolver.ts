import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { UsersService } from "./users.service";
import { User } from "./models/user";
import { GetUserArgs } from "./dto/get-user.args";
import { GetUsersArgs } from "./dto/get-users.args";
import { CreateUserInput } from "./dto/create-user.input";
import { UpdateUserInput } from "./dto/update-user.input";
import { DeleteUserInput } from "./dto/delete-user.input";


@Resolver()
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Query(() => User, { name: 'user', nullable: true })
  async getUser(@Args() getUserArgs: GetUserArgs): Promise<User> {
    return this.usersService.getUser(getUserArgs);
  }

  @Query(() => [User], { name: 'users', nullable: 'items' }) //itemsAndList
  getUsers(@Args() getUsersArgs: GetUsersArgs): Promise<User[]> {
    return this.usersService.getUsers(getUsersArgs);
  }

  @Mutation(() => User)
  async createUser(@Args('createUserData') createUserData: CreateUserInput): Promise<User> {
    return this.usersService.createUser(createUserData);
  }

  @Mutation(() => User, {  nullable: true })
  async updateUser(@Args('updateUserData') updateUserData: UpdateUserInput): Promise<User> {
    return await this.usersService.updateUser(updateUserData)
  }

  @Mutation(() => User, {  nullable: true })
  async deleteUser(@Args('deleteUserData',) deleteUserData: DeleteUserInput): Promise<User> {
    return this.usersService.deleteUser(deleteUserData);
  }

}
