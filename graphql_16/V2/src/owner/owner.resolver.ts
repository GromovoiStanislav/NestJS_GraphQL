import { Resolver, Query, Mutation, Args, ResolveField, Parent } from "@nestjs/graphql";
import { CreateOwnerInput } from "src/graphql";
import { OwnerService } from "./owner.service";

@Resolver("Owner")
export class OwnerResolver {

  constructor(
    private readonly ownerService: OwnerService
  ) {
  }

  @Mutation("createOwner")
  async create(@Args("createOwnerInput") createOwnerInput: CreateOwnerInput) {
    return this.ownerService.create(createOwnerInput);
  }

  @Query("owner")
  async findOne(@Args("id") id: number) {
    return this.ownerService.findOne(id);
  }

  @ResolveField()
  async dogs(@Parent() owner) {
    const { id } = owner;
    //return this.ownerService.getDogs( id );
    return this.ownerService.getDogs2(id);
  }

  @Mutation("removeOwner")
  async remove(@Args("id") id: number) {
    return this.ownerService.remove(id);
  }
}
