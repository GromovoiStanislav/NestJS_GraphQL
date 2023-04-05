import { Injectable } from "@nestjs/common";
import { CreateUserInput } from "./dto/create-user.input";
import { User } from "./entities/user.entity";


@Injectable()
export class UsersService {

  private readonly users: User[] = [
    { id: 1, name: "marius", password: "123" },
    { id: 2, name: "maria", password: "123" }
  ];

  async create(createUserInput: CreateUserInput): Promise<User> {
    const user = {
      ...createUserInput,
      id: this.users.length + 1
    };
    this.users.push(user);

    return user;
  }

  async findAll(): Promise<User[]> {
    return this.users;
  }

  async findOne(username: string): Promise<User> {
    return this.users.find(user => user.name === username);
  }

}
