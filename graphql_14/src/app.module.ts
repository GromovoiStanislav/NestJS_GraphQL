import { Module } from "@nestjs/common";
import { GraphQLModule } from "@nestjs/graphql";
import { ApolloDriver, ApolloDriverConfig } from "@nestjs/apollo";
import { join } from "path";
import { LessonModule } from "./lesson/lesson.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Lesson } from "./lesson/lesson.entity";
import { StudentModule } from "./student/student.module";
import { Student } from "./student/student.entity";

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "mongodb",
      url: "mongodb://localhost/school",
      synchronize: true,
      useUnifiedTopology: true,
      entities: [
        Lesson,
        Student
      ]
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), "src/schema.gql")
    }),
    LessonModule,
    StudentModule
  ]
})
export class AppModule {
}
