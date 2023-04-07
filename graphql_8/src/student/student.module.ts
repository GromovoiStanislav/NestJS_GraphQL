import { Module } from '@nestjs/common';
import { StudentService } from './student.service';
import {Student} from "./student.entity";
import {MikroOrmModule} from "@mikro-orm/nestjs";
import { StudentResolver } from './student.resolver';

@Module({
  imports: [MikroOrmModule.forFeature([Student])],
  providers: [StudentService, StudentResolver]
})
export class StudentModule {}
