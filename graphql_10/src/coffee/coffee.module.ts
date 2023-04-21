import { Module } from "@nestjs/common";
import { CoffeeService } from "./coffee.service";
import { CoffeeResolver } from "./coffee.resolver";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Coffee } from "./entities/coffee.entity";
import { Flavor } from "./entities/flavor.entity";
import { CoffeeFlavorsResolver } from "./coffee-flavors.resolver";
import { PubSubModule } from "../pub-sub/pub-sub.module";
import { FlavorsByCoffeeLoader } from "./data-loaders/flavors-by-coffee.loader";

@Module({
  imports: [
    TypeOrmModule.forFeature([Coffee, Flavor]),
    PubSubModule
  ],
  providers: [
    CoffeeResolver,
    CoffeeService,
    CoffeeFlavorsResolver,
    FlavorsByCoffeeLoader
  ]
})
export class CoffeeModule {
}
