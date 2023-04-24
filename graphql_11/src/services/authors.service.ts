import { Injectable } from "@nestjs/common";
import { Author } from "../models/author.model";

@Injectable()
export class AuthorsService {

  data: Author[] = [
    { id: 1, name: "Tom" },
    { id: 2, name: "Sam" },
  ];

  async findAll() {
    return this.data;
  }
}