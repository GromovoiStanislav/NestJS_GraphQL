import {Args, Int, Mutation, Query, Resolver} from '@nestjs/graphql';
import {StudentService} from "./student.service";
import {Student} from "./student.entity";
import {CreateStudentInput} from "./create-student.input";

@Resolver(() => Student)
export class StudentResolver {
    constructor(private readonly studentService: StudentService) {
    }

    @Query(() => [Student])
    async getStuff() {
        return this.studentService.getAll();
    }

    @Query(() => Student, {nullable: true})
    async getStudentById(@Args('id',{ type: () => Int })id: number)  {
        return this.studentService.getById(id);
    }

    @Query(() => Student, {nullable: true})
    async getStudentByEmail(@Args('email') email: string) {
        return this.studentService.getByEmail(email);
    }


    @Mutation(() => Student)
    async createStudent(@Args('createStudentInput') createStudentInput: CreateStudentInput) {
        return this.studentService.create(createStudentInput);
    }
}
