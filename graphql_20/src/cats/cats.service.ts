import { BadRequestException, Injectable } from "@nestjs/common";
import { CreateCatInput, UploadFileInput } from "./dto/create-cat.input";
import { createWriteStream } from "node:fs";
import { join } from "node:path";


@Injectable()
export class CatsService {

  async create({ breed, name, image }: CreateCatInput) {
    const { createReadStream, filename } = await image;
    return new Promise(async (resolve) => {
      createReadStream()
        .pipe(createWriteStream(join(process.cwd(), `./uploads/${filename}`)))
        .on("finish", () =>
          resolve({
            breed,
            name,
            image: filename
          })
        )
        .on("error", () => {
          new BadRequestException("Could not save image");
        });
    });
  }

  async uploadFile({ image }: UploadFileInput) {
    const { createReadStream, filename } = await image;
    return new Promise(async (resolve) => {
      createReadStream()
        .pipe(createWriteStream(join(process.cwd(), `./uploads/${filename}`)))
        .on("finish", () =>
          resolve(
            { image: filename }
            // true
          )
        )
        .on("error", () => {
          new BadRequestException("Could not save image");
        });
    });
  }


  findAll() {
    return [
      {name: "Lily", breed: "Persian",image: "filename"}
    ];
  }

}
