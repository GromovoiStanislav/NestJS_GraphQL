import { Module } from "@nestjs/common";
import { LaunchService } from "./launch.service";
import { LaunchResolver } from "./launch.resolver";
import { HttpModule } from "@nestjs/axios";
import { MissionResolver } from "./mission.resolver";
import { TripUpdateResponseResolver } from "./trip-update-response.resolver";

@Module({
  imports: [HttpModule],
  providers: [
    LaunchService,
    LaunchResolver,
    MissionResolver,
    TripUpdateResponseResolver
  ],
  exports: [LaunchService]
})
export class LaunchModule {
}