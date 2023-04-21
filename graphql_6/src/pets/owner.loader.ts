import * as DataLoader from 'dataloader';
import {Injectable} from '@nestjs/common';
import {NestDataLoader} from 'nestjs-dataloader';
import {InjectRepository} from "@nestjs/typeorm";
import {Owner} from "../owners/entities/owner.entity";
import {In, Repository} from "typeorm";


@Injectable()
export class OwnerLoader implements NestDataLoader<number, Owner> {

    constructor(
        @InjectRepository(Owner) private readonly ownersRepository: Repository<Owner>
    ) {
    }

    generateDataLoader(): DataLoader<number, Owner> {
        return new DataLoader<number, Owner>(
            async (ownerIds: number[]) => {
                return this.ownersRepository.find({where: {id: In(ownerIds)}})
            }
        )
    }
}