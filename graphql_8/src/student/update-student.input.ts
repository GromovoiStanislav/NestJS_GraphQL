import {InputType, Field, Int} from '@nestjs/graphql';

@InputType()
export class UpdateStudentInput {
    @Field(() => Int)
    id!: number;

    @Field({nullable: true})
    name?: string;

    @Field({nullable: true})
    email?: string;

    @Field(() => Int, {nullable: true})
    age?: number;
}