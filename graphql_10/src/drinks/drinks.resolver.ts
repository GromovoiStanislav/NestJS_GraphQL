import { Query, Resolver } from "@nestjs/graphql";
import { Drink } from "../common/interfaces/drink.interface";
import { Coffee } from "../coffee/entities/coffee.entity";
import { Tea } from "../teas/entities/tea.entity";

@Resolver()
export class DrinksResolver {

  @Query(() => [Drink], { name: "drinks" })
  async findAll(): Promise<Drink[]> {
    const coffee = new Coffee();
    coffee.id = 1;
    coffee.name = "Colombia";
    coffee.brand = "Black Crow Coffee";

    const tea = new Tea();
    tea.name = "Lipton";

    return [coffee, tea];
  }


}
