import { ObjectType, Field, Int } from "@nestjs/graphql";
import { Column, JoinTable, Entity, PrimaryGeneratedColumn, ManyToMany, CreateDateColumn } from "typeorm";
import { Flavor } from "./flavor.entity";
import { Drink } from "../../common/interfaces/drink.interface";
import { CoffeeType } from "../../common/enums/coffee-type.enum";
import { loggerMiddleware } from "../../common/middlewares/logger.middleware";

@Entity({ name: "coffees" })
@ObjectType({ description: "Coffee model", implements: () => [Drink] })
export class Coffee implements Drink {

  @PrimaryGeneratedColumn()
  @Field(() => Int, { description: "A unique identifier" })
  id: number;

  @Column()
  @Field({middleware: [loggerMiddleware]})
  name: string;

  @Column()
  @Field()
  brand: string;

  @JoinTable()
  @ManyToMany(type => Flavor, flavor => flavor.coffees, { cascade: true })
  @Field(() => [Flavor], { nullable: true })
  flavors?: Flavor[];

  @CreateDateColumn()
  @Field()
  createdAt: Date;

  @Column()
  @Field(() => CoffeeType)
  type: CoffeeType;
}
