import { Injectable } from "@nestjs/common";
import { GraphQLClient } from "graphql-request";


@Injectable()
export class AppService {

  private readonly graphQLClient: GraphQLClient;

  constructor() {
    const url = "http://localhost:3000/graphql"; // replace with your GraphQL server URL
    this.graphQLClient = new GraphQLClient(url);
  }


  getHello(): string {
    return "Hello World!";
  }


  getUsers(token: string) {
    const query = `
      query {
        users {
          id
          name
        }
      }
    `;

    const headers = {
      Authorization: `Bearer ${token}`
    };

    return this.graphQLClient.request(query, { headers });
  }


  getUser(username: string, token: string) {
    const query = `
      query {
        user(username: "${username}") {
          id
          name
        }
      }
    `;

    const headers = {
      Authorization: `Bearer ${token}`
    };

    return this.graphQLClient.request(query, { headers });
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


  async createUser(name: string, password: string, token: string) {

    const mutation = `
      mutation {
        createUser(createUserInput: { name: "${name}", password: "${password}" }) {
          id
          name
        }
      }
    `;

    const headers = {
      Authorization: `Bearer ${token}`
    };

    return this.graphQLClient.request(mutation, { headers });
  }
}


