import { Controller, Get, Param, ParseIntPipe } from "@nestjs/common";
import { AppService } from "./app.service";
import { CreateUserInput } from "./users/dto/create-user.input";

@Controller()
export class AppController {
  JWT = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Im1hcmlhIiwic3ViIjoyLCJpYXQiOjE2ODA2OTM4MDQsImV4cCI6MTY4MDY5NDcwNH0.6LxFNyQ38hSQjGcThiiIhlPXpeBrBS-_88LOhy8JiXg'
  constructor(private readonly appService: AppService) {
  }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get("users")
  getUsers() {
    const token = this.JWT;
    return this.appService.getUsers(token);
  }


  @Get("users/:username")
  getUser(@Param("username") username: string) {
    const token = this.JWT;
    return this.appService.getUser(username, token);
  }

  @Get("users/login/:username/:password")
  login(
    @Param("username") username: string,
    @Param("password") password: string,
    ) {
    return this.appService.login(username, password);
  }


  @Get("createuser")
  createUser() {
    const name = "Tom";
    const password = "123";
    const token = this.JWT;

    return this.appService.createUser(name, password, token);
  }


}
