import { Args, Mutation, Query, Resolver, Int, ResolveField, Parent } from "@nestjs/graphql";
import { PetsService } from "./pets.service";
import { Pet } from "./entities/pet.entity";
import { CreatePetInput } from "./dto/create-pet.input";
import { Owner } from "../owners/entities/owner.entity";
import * as DataLoader from 'dataloader';
import { Loader } from 'nestjs-dataloader';
import {OwnerLoader} from "./owner.loader";

@Resolver(() => Pet)
export class PetsResolver {

  constructor(private readonly petsService: PetsService) {
  }

  @Query(() => [Pet])
  async pets(): Promise<Pet[]> {
    return this.petsService.findAll();
  }

  @Query(() => Pet, { nullable: true })
  async getPet(@Args("id", { type: () => Int }) id: number): Promise<Pet> {
    return this.petsService.findOne(id);
  }

  // @ResolveField(() => Owner)
  // async owner(@Parent() pet: Pet): Promise<Owner> {
  //   return this.petsService.getOwner(pet.ownerId);
  // }

  @ResolveField(() => Owner)
  async owner(
      @Parent() pet: Pet,
      @Loader(OwnerLoader) ownerLoader: DataLoader<number, Owner>
  ): Promise<Owner> {
    return ownerLoader.load(pet.ownerId);
  }

  @Mutation(() => Pet)
  async createPet(@Args("createPetInput") createPetInput: CreatePetInput): Promise<Pet> {
    return this.petsService.createPet(createPetInput);
  }
}
