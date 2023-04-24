import {  Query, Resolver } from "@nestjs/graphql";
import { Author } from "./author.model";
import { AuthorsService } from "./authors.service";


@Resolver(() => Author)
export class AuthorsResolver {
  constructor(
    private authorsService: AuthorsService,
  ) {
  }

  @Query(() => [Author])
  async authors() {
    return this.authorsService.findAll();
  }

}