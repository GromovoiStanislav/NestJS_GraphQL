import { LessonType } from "./lesson.type";
import { Args, Mutation, Parent, Query, ResolveField, Resolver } from "@nestjs/graphql";
import { LessonService } from "./lesson.service";
import { CreateLessonInput } from "./create-lesson.input";
import { AssignStudentsToLessonInput } from "./assign-students-to-lesson.input";
import { Lesson } from "./lesson.entity";
import { StudentService } from "../student/student.service";

@Resolver(of => LessonType)
export class LessonResolver {

  constructor(
    private lessonService: LessonService,
    private studentService: StudentService
  ) {
  }

  @Query(returns => LessonType, { nullable: true })
  async lesson(@Args("id") id: string) {
    return this.lessonService.getLesson(id);
  }

  @Query(returns => [LessonType])
  async lessons() {
    return this.lessonService.getLessons();
  }

  @Mutation(returns => LessonType)
  async createLesson(@Args("createLessonInput") createLessonInput: CreateLessonInput) {
    return this.lessonService.createLesson(createLessonInput);
  }

  @Mutation(returns => LessonType)
  async assignStudentsToLesson(@Args("assignStudentsToLessonInput") assignStudentsToLessonInput: AssignStudentsToLessonInput) {
    const { lessonId, studentIds } = assignStudentsToLessonInput;
    return this.lessonService.assignStudentsToLesson(lessonId, studentIds);
  }

  @ResolveField()
  async students(@Parent() lesson: Lesson) {
    return this.studentService.getStudentsByIds(lesson.students);
  }

}