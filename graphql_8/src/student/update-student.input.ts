import {InputType, Field, Int} from '@nestjs/graphql';

@InputType()
export class CreateStudentInput {
    @Field()
    name!: string;

    @Field()
    email!: string;

    @Field(() => Int, {nullable: true})
    age?: number;
}