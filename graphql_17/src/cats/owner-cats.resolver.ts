import { Parent, ResolveField, Resolver } from "@nestjs/graphql";
import { Cat, Owner } from "../graphql.schema";
import { CatsService } from "./cats.service";

@Resolver("Owner")
export class OwnerCatsResolver {

  constructor(
    private readonly catsService: CatsService
  ) {
  }

  @ResolveField()
  async cats(@Parent() owner: Owner): Promise<Cat[]> {
    return this.catsService.findCatsByOwner(owner.id);
  }

}
