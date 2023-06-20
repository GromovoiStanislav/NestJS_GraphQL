import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateDogInput, UpdateDogInput } from "src/graphql";

@Injectable()
export class DogService {

  constructor(
    private prisma: PrismaService
  ) {
  }

  async create({ name, ownerId }: CreateDogInput) {
    return this.prisma.dog.create({
      data: { name, ownerId }
    });
  }

  async findAll() {
    return this.prisma.dog.findMany();
  }

  async findOne(id: number) {
    return this.prisma.dog.findUnique({
      where: { id }
    });
  }

  async update(id: number, { name }: UpdateDogInput) {
    return this.prisma.dog.update({
      where: { id },
      data: { name }
    });
  }

  async remove(id: number) {
    return this.prisma.dog.delete({
      where: { id }
    });
  }

  // При remove не находит, т.к. в БД уже нет собаки
  async getOwner(id: number) {
    return this.prisma.dog.findUnique({
      where: { id },
      select: { owner: true }
    }).owner();
  }

  async getOwner2(ownerId: number) {
    return this.prisma.owner.findUnique({
      where: { id: ownerId }
    });
  }
}
