import { Controller, Get, Param, ParseIntPipe } from "@nestjs/common";
import { AppService } from "./app.service";
import { CreateUserInput } from "./users/dto/create-user.input";

@Controller()
export class AppController {

  constructor(private readonly appService: AppService) {
  }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get("users")
  getUsers() {
    return this.appService.getUsers();
  }


  @Get("users/:username")
  getUser(@Param("username") username: string) {
    return this.appService.getUser(username);
  }


  @Get("users/login/:username/:password")
  login(
    @Param("username") username: string,
    @Param("password") password: string,
    ) {
    return this.appService.login(username, password);
  }


  @Get("signup/:username/:password")
  createUser(
    @Param("username") username: string,
    @Param("password") password: string,
  ) {
    return this.appService.signup(username, password);
  }


}
