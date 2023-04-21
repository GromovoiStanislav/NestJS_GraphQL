import * as DataLoader from 'dataloader';
import {Injectable} from '@nestjs/common';
import {NestDataLoader} from 'nestjs-dataloader';
import {InjectRepository} from "@nestjs/typeorm";
import {In, Repository} from "typeorm";
import {Pet} from "../pets/entities/pet.entity";
import {Owner} from "./entities/owner.entity";


@Injectable()
export class PetsLoader implements NestDataLoader<number, Pet[]> {

    constructor(
        @InjectRepository(Owner) private readonly ownersRepository: Repository<Owner>
    ) {
    }

    generateDataLoader(): DataLoader<number, Pet[]> {
        return new DataLoader<number, Pet[]>(
            async (ownerIds: number[]) => {

                const ownersWithPets = await this.ownersRepository.find({
                    select: ["id"],
                    relations: {pets: true},
                    where: {id: In(ownerIds)}
                });

                return ownersWithPets.map(owner => owner.pets);
            }
        )
    }
}