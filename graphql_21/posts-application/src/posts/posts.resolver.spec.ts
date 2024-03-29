import { Test, TestingModule } from "@nestjs/testing";
import { Post } from "./models/post.model";
import { PostsResolver } from "./posts.resolver";
import { PostsService } from "./posts.service";

const mockPost: Post = {
  authorId: 1,
  id: 1,
  title: "Mock Post"
};

const postsServiceMock = {
  findOne: jest.fn((id: number): Post => mockPost),
  findAll: jest.fn((): Post[] => [mockPost])
};

describe("PostsResolver", () => {
  let resolver: PostsResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PostsResolver,
        { provide: PostsService, useValue: postsServiceMock }
      ]
    }).compile();

    resolver = module.get<PostsResolver>(PostsResolver);
  });


  it("should be defined", () => {
    expect(resolver).toBeDefined();
  });


  it("should query for a single post", async () => {
    const result = await resolver.post(1);
    expect(result.id).toEqual(1);
  });


  it("should query all posts", async () => {
    const result = await resolver.posts();
    expect(Array.isArray(result)).toEqual(true);
  });


  it("should resolve the user of a post", async () => {
    const result = await resolver.user(mockPost);
    expect(result).toEqual(
      expect.objectContaining({
        __typename: "User",
        id: mockPost.authorId
      })
    );
  });

});
