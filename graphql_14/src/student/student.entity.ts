import { Column, Entity, ObjectId, ObjectIdColumn, PrimaryColumn } from "typeorm";

@Entity("students")
export class Student {
  @ObjectIdColumn()
  _id: ObjectId;

  // @ObjectIdColumn()
  // _id: string

  @PrimaryColumn()
  id: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;
}