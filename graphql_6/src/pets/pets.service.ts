import { Injectable } from "@nestjs/common";
import { Pet } from "./entities/pet.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreatePetInput } from "./dto/create-pet.input";
import { Owner } from "../owners/entities/owner.entity";


@Injectable()
export class PetsService {

  constructor(
    @InjectRepository(Pet) private petsRepository: Repository<Pet>,
    @InjectRepository(Owner) private ownersRepository: Repository<Owner>
  ) {
  }

  async findAll(): Promise<Pet[]> {
    return this.petsRepository.find();
  }

  async findOne(id: number): Promise<Pet> {
    return this.petsRepository.findOneBy({ id });
  }

  async createPet(createPetInput: CreatePetInput): Promise<Pet> {
    const newPet = this.petsRepository.create(createPetInput); // new Pet()
    return this.petsRepository.save(newPet); // insert
  }

  async getOwner(ownerId: number): Promise<Owner> {
    return this.ownersRepository.findOneBy({ id: ownerId });
  }
}


