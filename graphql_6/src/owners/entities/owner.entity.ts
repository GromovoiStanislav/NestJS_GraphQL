import { ObjectType, Field, Int } from "@nestjs/graphql";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Pet } from "../../pets/entities/pet.entity";

@ObjectType()
@Entity("owners")
export class Owner {

  @Field(type => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  name: string;

  @Field(type => [Pet], { nullable: true })
  @OneToMany(type => Pet, pet => pet.owner)
  pets?: Pet[];

}
