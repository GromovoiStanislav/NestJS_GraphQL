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
      data: { name, ownerId },
      include: { owner: true }
    });
  }

  async findAll() {
    return this.prisma.dog.findMany({
      include: { owner: true }
    });
  }

  async findOne(id: number) {
    return this.prisma.dog.findUnique({
      where: { id },
      select: { name: true, id: true, owner: true }
      //include: { owner: true }
    });
  }

  async update(id: number, { name }: UpdateDogInput) {
    return this.prisma.dog.update({
      where: { id },
      data: { name },
      include: { owner: true }
    });
  }

  async remove(id: number) {
    return this.prisma.dog.delete({
      where: { id },
      include: { owner: true }
    });
  }
}
