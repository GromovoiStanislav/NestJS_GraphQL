import { CreateCoffeeInput } from "./create-coffee.input";
import { InputType, PartialType } from "@nestjs/graphql";

@InputType({ description: "Update coffee input type" })
export class UpdateCoffeeInput extends PartialType(CreateCoffeeInput) {
}
