import { Module, OnModuleInit } from "@nestjs/common";
import { ApolloDriver, ApolloDriverConfig } from "@nestjs/apollo";
import { GraphQLModule } from "@nestjs/graphql";
import { join } from "node:path";
import { AuthorModule } from "./author/author.module";
import { BookModule } from "./book/book.module";
import { AppController } from "./app.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { BookService } from "./book/book.service";
import { AuthorService } from "./author/author.service";
import { UserModule } from "./user/user.module";
import { get, set } from "lodash";
import { decode } from "./utils/jwt.utils";


@Module({
  imports: [
    MongooseModule.forRoot("mongodb://localhost/demo"),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), "src/schema.gql"),
      context: ({ req, res }) => {
      //   // Get the cookie from request
      //   const token = get(req, "cookies.token");//
      //   console.log({ token });
      //
      //   // Verify the cookie
      //   const user = token ? decode(token) : null;
      //
      //   // Attach the user object to the request object
      //   if (user) {
      //     set(req, 'user', user);
      //   }
      //
        return { req, res };
      }
    }),
    AuthorModule,
    BookModule,
    UserModule
  ],
  controllers: [AppController]

})
export class AppModule implements OnModuleInit {

  constructor(
    private bookService: BookService,
    private authorService: AuthorService
  ) {
  }

  async onModuleInit() {
    const books = await this.bookService.countOfBooks();
    if (!books) {
      await this.bookService.deleteAll();
      await this.authorService.deleteAll();

      await this.authorService.seed();
      await this.bookService.seed();
    }
  }
}
