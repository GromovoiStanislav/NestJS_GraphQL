import { Module } from "@nestjs/common";
import { DonationsService } from "./donations.service";
import { DonationsResolver } from "./donations.resolver";
import { PrismaModule } from "../prisma/prisma.module";
// import { DateScalar } from "./date-time";


@Module({
  imports: [PrismaModule],
  providers: [
    DonationsResolver,
    DonationsService,
    // DateScalar
  ]
})
export class DonationsModule {
}
