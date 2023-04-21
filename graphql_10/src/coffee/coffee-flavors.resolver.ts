import { Parent, ResolveField, Resolver } from "@nestjs/graphql";
import { Coffee } from "./entities/coffee.entity";
import { Flavor } from "./entities/flavor.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { FlavorsByCoffeeLoader } from "./data-loaders/flavors-by-coffee.loader";

@Resolver(() => Coffee)
export class CoffeeFlavorsResolver {

  constructor(
    @InjectRepository(Flavor) private flavorRepository: Repository<Flavor>,
    private flavorsByCoffeeLoader: FlavorsByCoffeeLoader
  ) {
  }


  @ResolveField("flavors", () => [Flavor])
  async getFlavorsOfCoffee(@Parent() coffee: Coffee) {

    // return this.flavorRepository
    //   .createQueryBuilder("flavor")
    //   .innerJoin("flavor.coffees", "coffees", "coffees.id = :coffeeId",
    //     { coffeeId: coffee.id })
    //   .getMany();

    return this.flavorsByCoffeeLoader.load(coffee.id)

  }


}