import { Args, Field, InputType, Int, Mutation, ResolveField, Resolver, Root } from "@nestjs/graphql";
import { Inject } from "@nestjs/common";
import { PrismaService } from "./prisma.service";
import { Profile } from "./profile";
import { User } from "./user";
import { UserUniqueInput } from "./resolvers.user";


@InputType()
class ProfileCreateUpdateInput {
  @Field()
  bio: string;
}


@Resolver(Profile)
export class ProfileResolver {

  constructor(@Inject(PrismaService) private prismaService: PrismaService) {
  }

  @ResolveField(() => User)
  async user(@Root() profile: Profile): Promise<User> {
    return this.prismaService.profile
      .findUnique({
        where: {
          id: profile.id
        }
      })
      .user();
  }

  @Mutation(() => Profile)
  async createNewProfile(
    @Args("userUniqueInput") userUniqueInput: UserUniqueInput,
    @Args("profile") profile: ProfileCreateUpdateInput
  ): Promise<Profile> {
    // @ts-ignore
    return this.prismaService.profile.create({
      data: {
        bio: profile.bio,
        user: {
          connect: {
            id: userUniqueInput.id || undefined,
            email: userUniqueInput.email || undefined
          }
        }
      }
    });
  }


  @Mutation(() => Profile)
  async updateProfileByUserId(
    @Args("userId", { type: () => Int }) userId: number,
    @Args("profile") profile: ProfileCreateUpdateInput
  ): Promise<Profile> {
    // @ts-ignore
    return this.prismaService.profile.update({
      where: { userId },
      data: profile
    });
  }


}