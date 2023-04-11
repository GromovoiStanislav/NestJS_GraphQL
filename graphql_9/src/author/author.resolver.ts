import { Resolver, Query, ResolveField, Parent, Args, Mutation } from "@nestjs/graphql";
import { BookService } from '../book/book.service';
import { Author, CreateAuthorInput } from "./author.schema";
import { AuthorService } from './author.service';

@Resolver(() => Author)
export class AuthorResolver {
  constructor(
    private authorsService: AuthorService,
    private bookService: BookService,
  ) {}

  @Query(() => [Author])
  async authors() {
    return this.authorsService.findMany();
  }

  @Mutation(() => Author)
  async createAuthor(@Args('input') input: CreateAuthorInput) {
    return this.authorsService.createAuthor(input);
  }

  @ResolveField()
  async books(@Parent() parent: Author) {
    return this.bookService.findByAuthorId(parent._id);
  }
}