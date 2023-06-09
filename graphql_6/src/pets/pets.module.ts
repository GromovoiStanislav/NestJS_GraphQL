import {Module} from "@nestjs/common";
import {PetsService} from "./pets.service";
import {PetsResolver} from "./pets.resolver";
import {TypeOrmModule} from "@nestjs/typeorm";
import {Pet} from "./entities/pet.entity";
import {Owner} from "../owners/entities/owner.entity";
import {OwnerLoader} from "./owner.loader";

@Module({
    imports: [TypeOrmModule.forFeature([Pet, Owner])],
    providers: [PetsService, PetsResolver, OwnerLoader]
})
export class PetsModule {
}
