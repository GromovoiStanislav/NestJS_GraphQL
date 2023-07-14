import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService],
    }).compile();
    service = module.get<UsersService>(UsersService);
  });


  it('should be defined', () => {
    expect(service).toBeDefined();
  });


  it('should fetch a user by its id', async () => {
    const user = await service.findById(1);
    expect(user.id).toEqual(1);
  });


  it('should get all users', async () => {
    const result = await service.findAll();
    expect(result.length).toEqual(service['users'].length);
    expect(Array.isArray(result)).toEqual(true);
  });

});
