import { Field, InputType, ID } from "@nestjs/graphql";
import { IsUUID, IsArray } from "class-validator";

@InputType()
export class AssignStudentsToLessonInput {
  @IsUUID("4")
  @Field(type => ID)
  lessonId: string;

  @IsArray()
  @IsUUID("4", { each: true })
  @Field(type => [ID])
  studentIds;
}