import {Controller, Get, Res} from '@nestjs/common';


@Controller()
export class AppController {
  @Get()
  redirect(@Res() res) {
    //res.cookie("token", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDM1M2E0OWMxNzhjNDE1NzRmZGU2NTEiLCJlbWFpbCI6InNhbUBtYWlsLnJ1IiwibmFtZSI6IlNhbSIsImlhdCI6MTY4MTIxNTg0Nn0.6UGEgi-N2JquuJPSANSQUSHKQzO-ELdRuRrlt7DFvE8");
    res.redirect('http://localhost:3000/graphql')
  }
}