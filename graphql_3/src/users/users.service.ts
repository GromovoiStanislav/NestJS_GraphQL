import { Injectable } from "@nestjs/common";
import { User } from "./schemas/user.schema";
import { UsersRepository } from "./users.repository";
import { randomUUID } from "node:crypto";
import { GetUserArgs } from "./dto/args/get-user-args.dto";
import { CreateUserInput } from "./dto/input/create-user-input.dto";
import { UpdateUserInput } from "./dto/input/update-user-input.dto";

@Injectable()
export class UsersService {
    constructor(private readonly usersRepository: UsersRepository) {}

    async getUser(getUserArgs: GetUserArgs): Promise<User> {
        return this.usersRepository.findOne(getUserArgs);
    }

    async getUsers(): Promise<User[]> {
        return this.usersRepository.find({});
    }

    async createUser(createUserData: CreateUserInput): Promise<User> {
        return this.usersRepository.create({
            userId: randomUUID(),
            email: createUserData.email,
            age: createUserData.age,
            favoriteFoods: [],
        });
    }

    async updateUser(updateUserData: UpdateUserInput): Promise<User> {
        return this.usersRepository.findOneAndUpdate({ userId: updateUserData.userId }, updateUserData);
    }
}