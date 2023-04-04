import { Resolver, Query, Mutation, Args, Int, ResolveField, Parent } from "@nestjs/graphql";
import { OwnersService } from "./owners.service";
import { Owner } from "./entities/owner.entity";
import { CreateOwnerInput } from "./dto/create-owner.input";
import { UpdateOwnerInput } from "./dto/update-owner.input";
import { Pet } from "../pets/entities/pet.entity";

@Resolver(() => Owner)
export class OwnersResolver {
  constructor(private readonly ownersService: OwnersService) {
  }

  @Mutation(() => Owner)
  async createOwner(@Args("createOwnerInput") createOwnerInput: CreateOwnerInput): Promise<Owner> {
    return this.ownersService.create(createOwnerInput);
  }

  @Query(() => [Owner], { name: "owners" })
  async findAll(): Promise<Owner[]> {
    return this.ownersService.findAll();
  }

  @Query(() => Owner, { name: "owner", nullable: true })
  async findOne(@Args("id", { type: () => Int }) id: number): Promise<Owner> {
    return this.ownersService.findOne(id);
  }

  @ResolveField()
  async pets(@Parent() owner: Owner): Promise<Pet[]> {
    return this.ownersService.getPets(owner.id);
  }


  @Mutation(() => Owner)
  async updateOwner(@Args("updateOwnerInput") updateOwnerInput: UpdateOwnerInput) {
    return this.ownersService.update(updateOwnerInput.id, updateOwnerInput);
  }

  @Mutation(() => Owner)
  async removeOwner(@Args("id", { type: () => Int }) id: number) {
    return this.ownersService.remove(id);
  }
}
