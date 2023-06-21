import { Module } from "@nestjs/common";
import { OwnersModule } from "../owners/owners.module";
import { CatOwnerResolver } from "./cat-owner.resolver";
import { CatsResolver } from "./cats.resolver";
import { CatsService } from "./cats.service";
import { OwnerCatsResolver } from "./owner-cats.resolver";

@Module({
  imports: [OwnersModule],
  providers: [CatsService, CatsResolver, CatOwnerResolver, OwnerCatsResolver]
})
export class CatsModule {
}
