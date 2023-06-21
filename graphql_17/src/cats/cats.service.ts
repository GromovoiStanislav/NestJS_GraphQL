import { Injectable } from "@nestjs/common";
import { Cat } from "../graphql.schema";

@Injectable()
export class CatsService {

  private readonly cats: Array<Cat & { ownerId?: number }> = [
    { id: 1, name: "Cat", age: 5, ownerId: 1 }
  ];


  async create(cat: Cat): Promise<Cat> {
    cat.id = this.cats.length + 1;
    this.cats.push(cat);
    return cat;
  }


  async findAll(): Promise<Cat[]> {
    return this.cats;
  }


  async findOneById(id: number): Promise<Cat> {
    return this.cats.find(cat => cat.id === id);
  }

  async findCatsByOwner(ownerId: number): Promise<Cat[]> {
    return this.cats.filter(cat => cat.ownerId === ownerId);
  }

}
