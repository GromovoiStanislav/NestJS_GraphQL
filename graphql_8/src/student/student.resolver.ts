import {Args, Mutation, Query, Resolver} from '@nestjs/graphql';
import {StudentService} from "./student.service";
import {Student} from "./student.entity";
import {CreateStudentInput} from "./create-student.input";

@Resolver(() => Student)
export class StudentResolver {
    constructor(private readonly studentService: StudentService) {
    }

    @Query(() => [Student])
    async getStuff()  {
        return this.studentService.getAll();
    }

    @Mutation(() => Student)
    async createStudent(@Args('createStudentInput') createStudentInput: CreateStudentInput) {
        return this.studentService.create(createStudentInput);
    }
}
