import { Resolver, Query, Mutation, Args, ID, Int } from "@nestjs/graphql";
import { CoffeeService } from "./coffee.service";
import { Coffee } from "./entities/coffee.entity";
import { CreateCoffeeInput } from "./dto/create-coffee.input";
import { UpdateCoffeeInput } from "./dto/update-coffee.input";
import { ParseIntPipe } from "@nestjs/common";

@Resolver(() => Coffee)
export class CoffeeResolver {

  constructor(private readonly coffeeService: CoffeeService) {
  }

  @Query(() => [Coffee], { name: "coffees" })
  async findAll() {
    return this.coffeeService.findAll();
  }

  @Query(() => Coffee, { name: "coffee" })
  async findOne(@Args("id", { type: () => Int }, ParseIntPipe) id: number) {
    return this.coffeeService.findOne(id);
  }

  @Mutation(() => Coffee, { name: "createCoffee" })
  create(@Args("createCoffeeInput") createCoffeeInput: CreateCoffeeInput) {
    return this.coffeeService.create(createCoffeeInput);
  }


  @Mutation(() => Coffee, { name: "updateCoffee" })
  update(
    @Args("id", { type: () => Int }, ParseIntPipe) id: number,
    @Args("updateCoffeeInput") updateCoffeeInput: UpdateCoffeeInput) {
    return this.coffeeService.update(id, updateCoffeeInput);
  }

  @Mutation(() => Coffee, { name: "removeCoffee" })
  remove(@Args("id", { type: () => Int }, ParseIntPipe) id: number) {
    return this.coffeeService.remove(id);
  }

}
