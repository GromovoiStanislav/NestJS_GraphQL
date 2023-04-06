## NestJS with GraphQL Code first, Authentication (passport-local, passport-jwt), graphql-request

http://localhost:3000/graphql

```
query Users {
  users {
    id
    name
  }
}


query User {
  user(username: "marius") {
    id
    name
  }
}


mutation Signup {
  signup(loginInput: { name: "olga", password: "123" }) {
    id
    name
  }
}


mutation Login {
  login(loginInput: { name: "maria", password: "123" }) {
    access_token
    user {
      name
    }
  }
}

```