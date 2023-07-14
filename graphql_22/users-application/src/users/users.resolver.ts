import { Args, ID, Query, Resolver, ResolveReference } from '@nestjs/graphql';
import { UsersService } from './users.service';

@Resolver('User')
export class UsersResolver {

  constructor(
    private usersService: UsersService
  ) {}


  @Query()
  async getUser(@Args({ name: 'id', type: () => ID }) id: number) {
    return this.usersService.findById(id);
  }


  @Query()
  async getAllUsers() {
    return this.usersService.findAll();
  }


  @ResolveReference()
  async resolveReference(reference: { __typename: string; id: number }) {
    return this.usersService.findById(reference.id);
  }

}
