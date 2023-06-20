import { Resolver, Query, Mutation, Args } from "@nestjs/graphql";
import { CreateDogInput, UpdateDogInput } from "src/graphql";
import { DogService } from "./dog.service";

@Resolver("Dog")
export class DogResolver {

  constructor(
    private readonly dogService: DogService
  ) {
  }

  @Mutation("createDog")
  async create(@Args("createDogInput") createDogInput: CreateDogInput) {
    return this.dogService.create(createDogInput);
  }

  @Query("dogs")
  async findAll() {
    return this.dogService.findAll();
  }

  @Query("dog")
  async findOne(@Args("id") id: number) {
    return this.dogService.findOne(id);
  }

  @Mutation("updateDog")
  async update(@Args("updateDogInput") updateDogInput: UpdateDogInput) {
    return this.dogService.update(updateDogInput.id, updateDogInput);
  }

  @Mutation("removeDog")
  async remove(@Args("id") id: number) {
    return this.dogService.remove(id);
  }
}
