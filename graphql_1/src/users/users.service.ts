import { Injectable } from "@nestjs/common";
import { UserEntity } from "./entities/user.entity";
import { ObjectLiteral, Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateUserInput } from "./inputs/create-user.input";
import { UpdateUserInput } from "./inputs/update-user.input";
import { PaginationArgs } from "./inputs/pagination-args";

@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>
  ) {
  }

  async createUser(createUserInput: CreateUserInput): Promise<UserEntity> {
    return this.userRepository.save({ ...createUserInput });
  }

  async getOneUser(id: number): Promise<UserEntity> {
    return this.userRepository.findOneBy({ id });
  }

  async getAllUsers(paginationArgs: PaginationArgs): Promise<UserEntity[]> {
    const { skip, take, orderById, orderByName } = paginationArgs;


    const order: ObjectLiteral = {};
    if (orderById) {
      order.id = orderById;
    }
    if (orderByName) {
      order.name = orderByName;
    }


    return this.userRepository.find({
      // @ts-ignore
      order,
      skip,
      take
    });
  }

  async removeUser(id: number): Promise<number> {
    await this.userRepository.delete({ id });
    return id;
  }

  async updateUser(updateUserInput: UpdateUserInput): Promise<UserEntity> {
    await this.userRepository.update({ id: updateUserInput.id }, { ...updateUserInput });
    return this.getOneUser(updateUserInput.id);
  }


}
