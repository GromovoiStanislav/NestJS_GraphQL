import { Injectable } from "@nestjs/common";

@Injectable()
export class AuthorsService {

  async findAll() {
    return [
      { id: 1, name: "Tom" }
    ];
  }
}