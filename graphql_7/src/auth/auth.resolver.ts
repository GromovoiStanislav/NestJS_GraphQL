import { Args, Context, Mutation, Resolver } from "@nestjs/graphql";
import { AuthService } from "./auth.service";
import { LoginResponse } from "./dto/login.response";
import { LoginInput } from "./dto/login.input";
import { UseGuards } from "@nestjs/common";
import { GqlAuthGuard } from "./guards/gql-auth.guard";
import { User } from "../users/entities/user.entity";

@Resolver()
export class AuthResolver {

  constructor(private authService: AuthService) {
  }

  @Mutation(() => LoginResponse)
  @UseGuards(GqlAuthGuard)
  async login(@Args("loginInput") loginInput: LoginInput, @Context() context) {
    //return this.authService.login(loginInput);
    return this.authService.login(context.user);
  }


  @Mutation(() => User)
  async signup(@Args("loginInput") loginInput: LoginInput) {
    return this.authService.signup(loginInput);
  }

}
