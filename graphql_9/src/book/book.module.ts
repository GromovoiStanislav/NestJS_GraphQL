import { Module } from "@nestjs/common";
import { BookService } from "./book.service";
import { BookResolver } from "./book.resolver";
import { AuthorService } from "../author/author.service";
import { MongooseModule } from "@nestjs/mongoose";
import { Book, BookSchema } from "./book.schema";
import { Author, AuthorSchema } from "../author/author.schema";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Book.name, schema: BookSchema },
      { name: Author.name, schema: AuthorSchema }
    ])
  ],
  providers: [BookService, BookResolver, AuthorService],
  exports: [BookService]
})
export class BookModule {
}
