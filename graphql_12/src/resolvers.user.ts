import {
  Resolver,
  Query,
  Mutation,
  Args,
  Context,
  ResolveField,
  Root,
  InputType,
  Field
} from "@nestjs/graphql";
import { Inject } from "@nestjs/common";
import { Post } from "./post";
import { User } from "./user";
import { PrismaService } from "./prisma.service";
import { PostCreateInput } from "./resolvers.post";
import { Profile } from "./profile";



@InputType()
export class UserUniqueInput {
  @Field({ nullable: true })
  id: number;

  @Field({ nullable: true })
  email: string;
}


@InputType()
class ProfileCreateInput {
  @Field()
  bio: string;
}


@InputType()
class UserCreateInput {
  @Field()
  email: string;

  @Field({ nullable: true })
  name: string;

  @Field(() => [PostCreateInput], { nullable: true })
  posts?: [PostCreateInput];

  @Field(() => ProfileCreateInput, { nullable: true })
  profile?: ProfileCreateInput;
}




@Resolver(User)
export class UserResolver {

  constructor(@Inject(PrismaService) private prismaService: PrismaService) {
  }


  @ResolveField()
  async posts(@Root() user: User, @Context() ctx): Promise<Post[]> {
    return this.prismaService.user
      .findUnique({
        where: {
          id: user.id
        }
      })
      .posts();
  }

  @ResolveField(() => Profile, { nullable: true })
  async profile(@Root() user: User): Promise<Profile | null> {
    // @ts-ignore
    return this.prismaService.user
      .findUnique({
        where: {
          id: user.id
        }
      })
      .profile();
    // .profile({ include: { user: true } }); // даже так можно!!!
  }


  @Mutation(() => User)
  async signupUser(
    @Args("data") data: UserCreateInput,
    @Context() ctx
  ): Promise<User> {

    const postData = data.posts?.map((post) => {
      return { title: post.title, content: post.content || undefined };
    });

    const profileData = data.profile;
    console.log('profileData',profileData);

    // @ts-ignore
    return this.prismaService.user.create({
      data: {
        email: data.email,
        name: data.name,
        posts: {
          create: postData
        },
        profile: {
          create: profileData
        }
      },
      include:{
        profile: true
      }
    });
  }


  @Query(() => [User], { nullable: true })
  async allUsers(@Context() ctx) {
    return this.prismaService.user.findMany({
      //include: { profile: true } // так можно!!!
    });
  }


  @Query(() => [Post], { nullable: true })
  async draftsByUser(
    @Args("userUniqueInput") userUniqueInput: UserUniqueInput
  ): Promise<Post[]> {
    return this.prismaService.user
      .findUnique({
        where: {
          id: userUniqueInput.id || undefined,
          email: userUniqueInput.email || undefined
        }
      })
      .posts({
        where: {
          published: false
        }
      });
  }


  @Mutation(() => User)
  async updateProfileByUser(
    @Args("userUniqueInput") userUniqueInput: UserUniqueInput,
    @Args("profile") profile: ProfileCreateInput
  ): Promise<User> {
    return this.prismaService.user.update({
      where: {
        id: userUniqueInput.id || undefined,
        email: userUniqueInput.email || undefined
      },
      data: {
        profile: {
          update: profile
        }
      }
    });
  }

}