import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Field, Int, ObjectType } from "@nestjs/graphql";
import { Owner } from "../../owners/entities/owner.entity";

@ObjectType()
@Entity("pets")
export class Pet {

  @Field(type => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  name: string;

  @Field({ nullable: true })
  @Column()
  type?: string;

  @Field(type => Owner)
  @ManyToOne(type => Owner, owner => owner.pets)
  owner: Owner;

  @Field(type => Int)
  @Column()
  ownerId: number;

}