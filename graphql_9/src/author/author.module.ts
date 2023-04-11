import { Module } from "@nestjs/common";
import { AuthorService } from "./author.service";
import { AuthorResolver } from "./author.resolver";
import { BookService } from "../book/book.service";
import { MongooseModule } from "@nestjs/mongoose";
import { Author, AuthorSchema } from "./author.schema";
import { Book, BookSchema } from "../book/book.schema";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Book.name, schema: BookSchema },
      { name: Author.name, schema: AuthorSchema }
    ])
  ],
  providers: [AuthorService, AuthorResolver, BookService],
  exports: [AuthorService]
})
export class AuthorModule {
}
