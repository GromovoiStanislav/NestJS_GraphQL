import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { Field, Int, ObjectType } from "@nestjs/graphql";
import { Coffee } from "./coffee.entity";


@Entity({ name: "flavors" })
@ObjectType({ description: "Coffee flavors" })
export class Flavor {

  @PrimaryGeneratedColumn()
  @Field(() => Int, { description: "A unique identifier" })
  id: number;

  @Column()
  @Field()
  name: string;

  @ManyToMany(type => Coffee, coffee => coffee.flavors)
  @Field(() => [Coffee])
  coffees: Coffee[];

}