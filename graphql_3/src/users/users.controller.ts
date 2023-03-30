import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";

import { CreateUserRequest } from "./dto/request/create-user-request.dto";
import { UpdateUserRequest } from "./dto/request/update-user.request";

import { User } from "./schemas/user.schema";
import { UsersService } from "./users.service";

@Controller("users")
export class UsersController {

  constructor(private readonly usersService: UsersService) {
  }

  @Get(":userId")
  async getUser(@Param("userId") userId: string): Promise<User> {
    return this.usersService.getUser({ userId });
  }

  @Get()
  async getUsers(): Promise<User[]> {
    return this.usersService.getUsers();
  }

  @Post()
  async createUser(@Body() createUserRequest: CreateUserRequest): Promise<User> {
    return this.usersService.createUser(createUserRequest);
  }

  @Patch(":userId")
  async updateUser(
    @Param("userId") userId: string,
    @Body() updateUserRequest: UpdateUserRequest
  ): Promise<User> {
    return this.usersService.updateUser({ userId, ...updateUserRequest });
  }

  @Delete(":userId")
  async deleteUser(@Param("userId") userId: string): Promise<User> {
    return this.usersService.deleteUser({ userId });
  }

}
