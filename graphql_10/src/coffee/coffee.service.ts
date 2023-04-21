import { Injectable } from "@nestjs/common";
import { CreateCoffeeInput } from "./dto/create-coffee.input";
import { UpdateCoffeeInput } from "./dto/update-coffee.input";
import { InjectRepository } from "@nestjs/typeorm";
import { Coffee } from "./entities/coffee.entity";
import { Repository } from "typeorm";
import { UserInputError } from "@nestjs/apollo";
import { Flavor } from "./entities/flavor.entity";
import { PubSub } from "graphql-subscriptions";

@Injectable()
export class CoffeeService {

  constructor(
    @InjectRepository(Coffee) private coffeeRepository: Repository<Coffee>,
    @InjectRepository(Flavor) private flavorRepository: Repository<Flavor>,
    private pubSub: PubSub
  ) {
  }

  async findAll(): Promise<Coffee[]> {
    return this.coffeeRepository.find();
  }

  async findOne(id: number): Promise<Coffee> {
    const coffee = await this.coffeeRepository.findOne({ where: { id } });
    if (!coffee) {
      throw new UserInputError(`Coffee #${id} doesn't exist`);
    }
    return coffee;
  }

  async create(createCoffeeInput: CreateCoffeeInput): Promise<Coffee> {
    const flavors = await Promise.all(
      createCoffeeInput.flavors.map(name => this.preloadFlavorByName(name))
    );
    const coffee = await this.coffeeRepository.create({
      ...createCoffeeInput,
      flavors
    });
    const newCoffee = await this.coffeeRepository.save(coffee);
    this.pubSub.publish("coffeeAdded", { coffeeAdded: newCoffee });
    return newCoffee;

  }

  async update(id: number, updateCoffeeInput: UpdateCoffeeInput): Promise<Coffee> {
    const flavors = updateCoffeeInput.flavors && (await Promise.all(
      updateCoffeeInput.flavors.map(name => this.preloadFlavorByName(name))
    ));
    const coffee = await this.coffeeRepository.preload({
      id,
      ...updateCoffeeInput,
      flavors
    });
    if (!coffee) {
      throw new UserInputError(`Coffee #${id} doesn't exist`);
    }
    return this.coffeeRepository.save(coffee);
  }

  async preloadFlavorByName(name: string): Promise<Flavor> {
    const flavor = await this.flavorRepository.findOne({ where: { name } });
    if (flavor) {
      return flavor;
    }
    return this.flavorRepository.create({ name });
  }

  async remove(id: number): Promise<Coffee> {
    const coffee = await this.findOne(id);
    return this.coffeeRepository.remove(coffee);
  }
}
