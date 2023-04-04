import { Injectable } from "@nestjs/common";
import { CreateOwnerInput } from "./dto/create-owner.input";
import { UpdateOwnerInput } from "./dto/update-owner.input";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Owner } from "./entities/owner.entity";
import { Pet } from "../pets/entities/pet.entity";

@Injectable()
export class OwnersService {

  constructor(
    @InjectRepository(Owner) private ownersRepository: Repository<Owner>,
    @InjectRepository(Pet) private petsRepository: Repository<Pet>
  ) {
  }

  async create(createOwnerInput: CreateOwnerInput): Promise<Owner> {
    const newOwner = this.ownersRepository.create(createOwnerInput); // new Owner()
    return this.ownersRepository.save(newOwner); // insert
  }

  async findAll(): Promise<Owner[]> {
    return this.ownersRepository.find();
  }

  async findOne(id: number): Promise<Owner> {
    return this.ownersRepository.findOneBy({ id });
  }


  async getPets(ownerId: number): Promise<Pet[]> {
    return this.petsRepository.find({ where: { ownerId } });
  }

  update(id: number, updateOwnerInput: UpdateOwnerInput) {
    return `This action updates a #${id} owner`;
  }

  remove(id: number) {
    return `This action removes a #${id} owner`;
  }
}
