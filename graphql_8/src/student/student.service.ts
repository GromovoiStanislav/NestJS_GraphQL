import {Injectable} from '@nestjs/common';
import {CreateStudentInput} from "./create-student.input";
import {Student} from "./student.entity";
import {InjectRepository} from "@mikro-orm/nestjs";
import {EntityRepository} from "@mikro-orm/core";
import {UpdateStudentInput} from "./update-student.input";

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

    //: Promise<Student>
    async create(createStudentInput: CreateStudentInput) {
        //const student = this.studentRepository.create(createStudentInput)
        //await this.studentRepository.persistAndFlush(student)
        //await this.studentRepository.persist(student).flush()
        // // student.id=11
        // // await this.studentRepository.upsert(student);
        //return student

        const student = new Student()
        Object.assign(student, createStudentInput)
        const id = await this.studentRepository.nativeInsert(student)
        return student
    }


    async update(updateStudentInput: UpdateStudentInput): Promise<Student> {
        // const student = this.studentRepository.getReference(updateStudentInput.id);
        // if (updateStudentInput.name) {
        //     student.name = updateStudentInput.name
        // }
        // if (updateStudentInput.email) {
        //     student.email = updateStudentInput.email
        // }
        // if (updateStudentInput.age) {
        //     student.age = updateStudentInput.age
        // }
        // await this.studentRepository.flush();
        // return this.getById(updateStudentInput.id)


        const res = await this.studentRepository.nativeUpdate({id: updateStudentInput.id}, updateStudentInput)
        if (res) {
            return this.getById(updateStudentInput.id)
        } else {
            return null
        }


        //Не рабоатет ???
        //return this.studentRepository.upsert(updateStudentInput)
    }


    async remove(id: number) {
        //await this.studentRepository.removeAndFlush(this.studentRepository.getReference(id))
        //await this.studentRepository.remove(this.studentRepository.getReference(id)).flush();
        //return 'done'

        const res = await this.studentRepository.nativeDelete(id)
        if (res) {
            return 'done'
        } else {
            return null
        }
    }

}