import {Injectable} from '@nestjs/common';
import {CreateStudentInput} from "./create-student.input";
import {Student} from "./student.entity";
import {InjectRepository} from "@mikro-orm/nestjs";
import {EntityRepository} from "@mikro-orm/core";

@Injectable()
export class StudentService {

    constructor(
        @InjectRepository(Student) private readonly studentRepository: EntityRepository<Student>,
    ) {
    }

    async getAll(): Promise<Student[]> {
        //return this.studentRepository.findAll()
        return this.studentRepository.find({})
    }

    async getById(id: number): Promise<Student> {
        return this.studentRepository.findOne({id})
    }

    async getByEmail(email: string): Promise<Student> {
        return this.studentRepository.findOne({email})
    }

    async create(createStudentInput: CreateStudentInput): Promise<Student> {
        const student = this.studentRepository.create(createStudentInput)
        await this.studentRepository.persistAndFlush(student)
        return student
    }
}
