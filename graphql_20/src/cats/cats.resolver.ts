import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { CatsService } from './cats.service';
import { Cat, File } from "./entities/cat.entity";
import { CreateCatInput, UploadFileInput } from "./dto/create-cat.input";


@Resolver(() => Cat)
export class CatsResolver {

  constructor(
    private readonly catsService: CatsService
  ) {}


  @Mutation(() => Cat)
  createCat(@Args('createCatInput') createCatInput: CreateCatInput) {
    return this.catsService.create(createCatInput);
  }


  @Mutation(() => File)
  singleUpload(@Args('uploadFileInput') uploadFileInput: UploadFileInput) {
    return this.catsService.uploadFile(uploadFileInput);
  }


  @Query(() => [Cat], { name: 'cats' })
  findAll() {
    return this.catsService.findAll();
  }

}
