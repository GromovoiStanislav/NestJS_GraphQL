import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { In, Repository } from "typeorm";
import { Student } from "./student.entity";
import { CreateStudentInput } from "./create-student.input";
import { v4 as uuid } from "uuid";


@Injectable()
export class StudentService {

  constructor(
    @InjectRepository(Student) private studentRepository: Repository<Student>
  ) {
  }

  async createStudent(createStudentInput: CreateStudentInput): Promise<Student> {
    const { firstName, lastName } = createStudentInput;

    const student = this.studentRepository.create({
      id: uuid(),
      firstName,
      lastName
    });

    return this.studentRepository.save(student);
  }

  async getStudent(id: string): Promise<Student> {
    return this.studentRepository.findOneBy({ id });
  }

  async getStudents(): Promise<Student[]> {
    return this.studentRepository.find();
  }

  async getStudentsByIds(studentIds:string[]): Promise<Student[]> {
    return await this.studentRepository.find({
      where: {
        // id: In(studentIds) don't work
        id: {
          // @ts-ignore
          $in: studentIds
        }
      }
    })

  }

}