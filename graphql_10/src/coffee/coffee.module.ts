import { Module } from "@nestjs/common";
import { CoffeeService } from "./coffee.service";
import { CoffeeResolver } from "./coffee.resolver";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Coffee } from "./entities/coffee.entity";
import { Flavor } from "./entities/flavor.entity";
import { CoffeeFlavorsResolver } from "./coffee-flavors.resolver";

@Module({
  imports: [
    TypeOrmModule.forFeature([Coffee, Flavor])
  ],
  providers: [
    CoffeeResolver,
    CoffeeService,
    CoffeeFlavorsResolver
  ]
})
export class CoffeeModule {
}
