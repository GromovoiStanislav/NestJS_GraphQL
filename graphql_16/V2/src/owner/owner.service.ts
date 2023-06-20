import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateOwnerInput } from "src/graphql";

@Injectable()
export class OwnerService {

  constructor(
    private prisma: PrismaService
  ) {
  }

  async create({ name }: CreateOwnerInput) {
    return this.prisma.owner.create({
      data: { name }
    });
  }

  async findOne(id: number) {
    return this.prisma.owner.findUnique({
      where: { id }
    });
  }

  async remove(id: number) {
    return this.prisma.owner.delete({
      where: { id }
    });
  }

  // При remove не находит, т.к. в БД уже нет собак
  async getDogs(id: number) {
    return this.prisma.owner.findUnique({
      where: { id }
    }).dogs();
  }

  async getDogs2(ownerId: number) {
    return this.prisma.dog.findMany({
      where: { ownerId }
    });
  }

}
