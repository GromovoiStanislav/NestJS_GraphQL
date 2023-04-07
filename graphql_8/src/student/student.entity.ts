import {Entity, PrimaryKey, Property} from "@mikro-orm/core";
import {Field, ID, Int, ObjectType} from "@nestjs/graphql";

@ObjectType()
@Entity({tableName: 'students'})
export class Student {
    @Field(() => Int)
    @PrimaryKey({autoincrement: true})
    id: number;

    // @Field(() => ID)
    // @PrimaryKey()
    // id!: string;


    @Field()
    @Property()
    createdAt: Date = new Date();

    @Field()
    @Property({onUpdate: () => new Date()})
    updatedAt: Date = new Date();

    @Field()
    @Property()
    name!: string;

    @Field()
    @Property()
    email!: string;

    @Field(() => Int, {nullable: true})
    @Property()
    age?: number;
}