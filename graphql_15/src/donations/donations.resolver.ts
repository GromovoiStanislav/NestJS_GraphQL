import { Resolver, Query, Mutation, Args, Subscription } from "@nestjs/graphql";
import { DonationCreateInput } from "../@generated/prisma-nestjs-graphql/donation/donation-create.input";
import { OrderByParams } from "../graphql";
import { DonationsService } from "./donations.service";
import { PubSub } from "graphql-subscriptions";
// import { Prisma } from "@prisma/client";

const pubSub = new PubSub();

@Resolver("Donation")
export class DonationsResolver {

  constructor(
    private readonly donationsService: DonationsService
  ) {
  }


  @Mutation("createDonation")
  async create(
    @Args("createDonationInput")
      createDonationInput: DonationCreateInput // Prisma.DonationCreateInput
  ) {
    const created = await this.donationsService.create(createDonationInput);

    const total = await this.donationsService.getTotal();
    pubSub.publish("totalUpdated", { totalUpdated: { total } });


    return created;
  }


  @Subscription()
  totalUpdated() {
    return pubSub.asyncIterator("totalUpdated");
  }


  @Query("donations")
  async findAll(@Args("orderBy") orderBy?: OrderByParams) {
    return this.donationsService.findAll(orderBy);
  }


  @Query("donation")
  async findOne(@Args("id") id: number) {
    return this.donationsService.findOne({ id });
  }


  @Query("totalDonations")
  async totalDonations() {
    return this.donationsService.getTotal();
  }

}
