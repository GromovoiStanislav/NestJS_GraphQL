import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { createWriteStream } from "fs";
// @ts-ignore
import { GraphQLUpload, FileUpload } from "graphql-upload";

@Resolver()
export class UploadResolver {

  @Query(() => String)
  sayHello(): string {
    return "Hello World!";
  }


  @Mutation(() => Boolean)
  async singleUpload(
    @Args({ name: "file", type: () => GraphQLUpload })
      { createReadStream, filename }: FileUpload
  ) {
    console.log("hello world");

    return new Promise(async (resolve, reject) =>
      createReadStream()
        .pipe(createWriteStream(`./uploads/${filename}`))
        .on("finish", () => resolve(true))
        .on("error", () => reject(false))
    );
  }
}