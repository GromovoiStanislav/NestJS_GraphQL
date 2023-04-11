import { Injectable } from "@nestjs/common";
import books from "../data/books";
import authors from "../data/authors";
import { Book, BookDocument, CreateBookInput } from "./book.schema";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { AuthorService } from "../author/author.service";

@Injectable()
export class BookService {

  constructor(
    @InjectModel(Book.name) private bookModel: Model<BookDocument>,
    private authorService: AuthorService
  ) {
  }


  async countOfBooks() {
    return this.bookModel.find().count();
  }

  async deleteAll() {
    this.bookModel.deleteMany();
  }

  async seed() {
    books.forEach( (book) => {
        const author = authors.find(author => author.id === book.author);
      this.authorService.findByName(author.name)
        .then(author =>
          this.createBook({
            title: book.title,
            isbn: book.isbn,
            author: author._id
          })
        );
      }
    )
  }

  async findMany() {
    return this.bookModel.find().lean();
  }

  async findById(id) {
    return this.bookModel.findById(id).lean();
  }

  async findByAuthorId(authorId) {
    return this.bookModel.find({ author: authorId }).lean();
  }

  async createBook(book: CreateBookInput) {
    return this.bookModel.create(book);
  }
}