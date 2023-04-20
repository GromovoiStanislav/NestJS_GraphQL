import { ObjectType } from "@nestjs/graphql";
import { Drink } from "../../common/interfaces/drink.interface";

@ObjectType({ description: "Tea model", implements: () => [Drink] })
export class Tea implements Drink {
  name: string;
}