import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { StudentType } from "./student.type";
import { StudentService } from "./student.service";
import { CreateStudentInput } from "./create-student.input";
import { LessonType } from "../lesson/lesson.type";

@Resolver(of => StudentType)
export class StudentResolver {

  constructor(private studentService: StudentService) {
  }


  @Query(returns => StudentType, { nullable: true })
  async student(@Args("id") id: string) {
    return this.studentService.getStudent(id);
  }

  @Query(returns => [StudentType])
  async students() {
    return this.studentService.getStudents();
  }

  @Mutation(returns => StudentType)
  async createStudent(@Args("CreateStudentInput") createStudentInput: CreateStudentInput) {
    return this.studentService.createStudent(createStudentInput);
  }
  
}