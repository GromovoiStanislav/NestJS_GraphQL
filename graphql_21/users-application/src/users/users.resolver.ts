import { Args, ID, Query, Resolver, ResolveReference } from "@nestjs/graphql";
import { User } from "./models/user.model";
import { UsersService } from "./users.service";

@Resolver(() => User)
export class UsersResolver {

  constructor(
    private usersService: UsersService
  ) {
  }


  @Query(() => User, { nullable: true })
  async getUser(@Args({ name: "id", type: () => ID }) id: number): Promise<User> {
    return this.usersService.findById(id);
  }


  @Query(() => [User])
  async getAllUsers(): Promise<User[]> {
    return this.usersService.findAll();
  }


  @ResolveReference()
  async resolveReference(reference: { __typename: string; id: number }): Promise<User> {
    return this.usersService.findById(reference.id);
  }

}
