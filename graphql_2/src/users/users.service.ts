import { Injectable, NotFoundException } from "@nestjs/common";
import { User } from "./models/user";
import { GetUserArgs } from "./dto/get-user.args";
import { GetUsersArgs } from "./dto/get-users.args";
import { CreateUserInput } from "./dto/create-user.input";
import { randomUUID } from "node:crypto";
import { UpdateUserInput } from "./dto/update-user.input";
import { DeleteUserInput } from "./dto/delete-user.input";

@Injectable()
export class UsersService {

  private users: User[] = [];

   async getUser(getUserArgs: GetUserArgs): Promise<User> {
    return this.users.find(user => user.userId === getUserArgs.userId);
  }

  async getUsers(getUsersArgs: GetUsersArgs): Promise<User[]> {
    return Promise.all(getUsersArgs.userIds.map(userId => this.getUser({ userId }))) ;
  }

  async createUser(createUserData: CreateUserInput): Promise<User> {
    const user: User = {
      userId: randomUUID(),
      ...createUserData
    }
    this.users.push(user);
    return user;
  }

  async updateUser(updateUserData: UpdateUserInput): Promise<User> {
    const user = this.users.find(user => user.userId === updateUserData.userId);
    if (!user) {
      return null
      //throw new NotFoundException('Not found: '+updateUserData.userId)
    }
    Object.assign(user, updateUserData);
    return user;
  }

  async deleteUser(deleteUserData: DeleteUserInput): Promise<User> {
    const userIndex = this.users.findIndex(user => user.userId === deleteUserData.userId);
    const user = this.users[userIndex];
    if (!user) {
      return null
      //throw new NotFoundException('Not found: '+deleteUserData.userId)
    }
    this.users.splice(userIndex);
    return user;
  }

}
