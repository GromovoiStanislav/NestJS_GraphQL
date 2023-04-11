
import { Injectable } from '@nestjs/common';
import authors from '../data/authors';
import { Author, AuthorDocument } from "./author.schema";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";


@Injectable()
export class AuthorService {

  constructor(
    @InjectModel(Author.name) private authorModel: Model<AuthorDocument>,
  ) {}

  async deleteAll() {
    this.authorModel.deleteMany();
  }

  async seed() {
    authors.forEach(author=> this.createAuthor({name:author.name}))
  }

  async findById(id) {
    return this.authorModel.findById(id).lean();
  }

  async findByName(name:string) {
    return this.authorModel.findOne({name}).lean();
  }

  async findMany() {
    return this.authorModel.find().lean();
  }

  async createAuthor(input) {
    return this.authorModel.create(input);
  }
}