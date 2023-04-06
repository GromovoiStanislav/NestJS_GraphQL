import { Injectable } from "@nestjs/common";
import { GraphQLClient } from "graphql-request";


@Injectable()
export class AppService {

  private readonly graphQLClient: GraphQLClient;

  constructor() {
    const url = "http://localhost:3000/graphql"; // replace with your target GraphQL server URL
    const JWT = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Im1hcml1cyIsInN1YiI6MSwiaWF0IjoxNjgwNzUzNzI2LCJleHAiOjE2ODA3NTQ2MjZ9.q3CLWigDDC9r9gY4Y4phHOSwJTNUHOr7JWormafZEOM";
    this.graphQLClient = new GraphQLClient(url, {
      headers: {
        Authorization: `Bearer ${JWT}`
      }
    });

  }


  getHello(): string {
    return "Hello World!";
  }


  getUsers() {
    const query = `
      query {
        users {
          id
          name
        }
      }
    `;

    return this.graphQLClient.request(query);
  }


  getUser(username: string) {
    const query = `
      query {
        user(username: "${username}") {
          id
          name
        }
      }
    `;

    return this.graphQLClient.request(query);
  }


  login(username: string, password: string) {
    const mutation = `
      mutation {
        login(loginInput: {name: "${username}", password: "${password}"}) {
           access_token
            user {
              name
            }
        }
      }
    `;

    return this.graphQLClient.request(mutation);
  }


  async signup(name: string, password: string) {

    const mutation = `
      mutation {
        signup(loginInput: { name: "${name}", password: "${password}" }) {
          id
          name
        }
      }
    `;

    return this.graphQLClient.request(mutation);
  }
}


