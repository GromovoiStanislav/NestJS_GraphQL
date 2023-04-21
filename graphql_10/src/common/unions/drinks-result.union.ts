import { createUnionType } from "@nestjs/graphql";
import { Coffee } from "../../coffee/entities/coffee.entity";
import { Tea } from "../../teas/entities/tea.entity";

export const DrinksResultUnion = createUnionType({
  name:'DrinksResul',
  types: () => [Coffee, Tea]
})