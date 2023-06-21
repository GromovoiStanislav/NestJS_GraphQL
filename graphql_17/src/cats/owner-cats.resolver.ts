import { Parent, ResolveField, Resolver } from "@nestjs/graphql";
import { Cat, Owner } from "../graphql.schema";
import { OwnersService } from "../owners/owners.service";

@Resolver("Owner")
export class OwnerCatsResolver {

  constructor(
    private readonly ownersService: OwnersService
  ) {
  }

  @ResolveField()
  async owner(@Parent() cat: Cat & { ownerId: number }): Promise<Owner> {
    return this.ownersService.findOneById(cat.ownerId);
  }

}
