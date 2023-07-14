import { Test, TestingModule } from '@nestjs/testing';
import { PostsService } from './posts.service';

describe('PostsService', () => {
  let service: PostsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PostsService],
    }).compile();
    service = module.get<PostsService>(PostsService);
  });


  it('should be defined', () => {
    expect(service).toBeDefined();
  });


  it('should get all posts for an author', async () => {
    const result = await service.findByAuthorId(1);
    expect(result).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          authorId: 1,
        }),
      ]),
    );
  });


  it('should get a single post using the id', async () => {
    const result = await service.findOne(1);
    expect(result.id).toEqual(1);
  });


  it('should get all posts', async () => {
    const result = await service.findAll();
    expect(Array.isArray(result)).toEqual(true);
    expect(result.length).toEqual(service['posts'].length);
  });

});
