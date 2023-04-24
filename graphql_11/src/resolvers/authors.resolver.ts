import {  Query, Resolver } from "@nestjs/graphql";
import { Author } from "../models/author.model";
import { AuthorsService } from "../services/authors.service";


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