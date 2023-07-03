import { InputType, Field } from "@nestjs/graphql";
import * as GraphQLUpload from "graphql-upload/GraphQLUpload.js";

import { Stream } from "node:stream";

export interface FileUpload {
  filename: string;
  mimetype: string;
  encoding: string;
  createReadStream: () => Stream;
}


@InputType()
export class CreateCatInput {
  @Field(() => String)
  name: string;

  @Field(() => String)
  breed: string;

  @Field(() => GraphQLUpload)
  image: Promise<FileUpload>;
}


@InputType()
export class UploadFileInput {
  @Field(() => GraphQLUpload)
  image: Promise<FileUpload>;
}
