import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  redirect(res) {
    res.redirect('http://localhost:3000/graphql')
  }
}
