import { Injectable } from "@nestjs/common";
import { User } from "./users.interfaces";


@Injectable()
export class UsersService {

  private users: User[] = [
    { id: 1, name: "John Doe" },
    { id: 2, name: "Richard Roe" }
  ];


  async findById(id: number): Promise<User> {
    return this.users.find((user) => user.id === Number(id));
  }


  async findAll(): Promise<User[]> {
    return this.users;
  }

}
