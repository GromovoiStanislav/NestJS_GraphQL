import {
  Resolver,
  Query,
  Mutation,
  Args,
  Int,
  Subscription,
} from "@nestjs/graphql";
import { CoffeeService } from "./coffee.service";
import { Coffee } from "./entities/coffee.entity";
import { CreateCoffeeInput } from "./dto/create-coffee.input";
import { UpdateCoffeeInput } from "./dto/update-coffee.input";
import { ParseIntPipe, UseFilters } from "@nestjs/common";
import { PubSub } from "graphql-subscriptions";
import { UserInputErrorExceptionFilter } from "../common/exceptions/http-exception.filter";


@UseFilters(new UserInputErrorExceptionFilter())
@Resolver(() => Coffee)
export class CoffeeResolver {

  constructor(
    private readonly coffeeService: CoffeeService,
    private pubSub: PubSub
  ) {
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

  @Subscription(() => Coffee)
  coffeeAdded() {
    return this.pubSub.asyncIterator("coffeeAdded");
  }

}