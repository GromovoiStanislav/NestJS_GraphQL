import {Module} from '@nestjs/common';
import {OwnersService} from './owners.service';
import {OwnersResolver} from './owners.resolver';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Owner} from "./entities/owner.entity";
import {Pet} from "../pets/entities/pet.entity";
import {PetsLoader} from "./pets.loader";


@Module({
    imports: [TypeOrmModule.forFeature([Owner, Pet])],
    providers: [OwnersResolver, OwnersService, PetsLoader],
})
export class OwnersModule {
}
