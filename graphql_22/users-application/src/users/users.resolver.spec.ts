import { Test, TestingModule } from '@nestjs/testing';
import { User } from "./users.interfaces";
import { UsersResolver } from './users.resolver';
import { UsersService } from './users.service';

const usersServiceMock = {
  findById: jest.fn((id: number): User => {
    return { id, name: 'Mocked User' };
  }),
};

describe('UsersResolver', () => {
  let resolver: UsersResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersResolver,
        { provide: UsersService, useValue: usersServiceMock },
      ],
    }).compile();
    resolver = module.get<UsersResolver>(UsersResolver);
  });


  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });


  it('should query a user by its id', async () => {
    const result = await resolver.getUser(1);
    expect(result.id).toEqual(1);
  });


  it('should resolve a reference', async () => {
    const result = await resolver.resolveReference({ __typename: 'User', id: 1 });
    expect(result.id).toEqual(1);
  });


  it("should query all users", async () => {
    const result = await resolver.getAllUsers();
    expect(Array.isArray(result)).toEqual(true);
  });

});
