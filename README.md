## NestJS with GraphQL and TypeORM

http://localhost:3000/graphql

create new user:

```
mutation {
  createUser(createUser: { name: "Olga", email: "olga@mail.ru" }) {
    id
    name
    email
    createdAt
    updatedAt
  }
}
```

get all users and one user:

```
query {
  getAllUsers {
    id
    name
  }
  getOneUser(id: 1) {
    id
    name
    email
    createdAt
    updatedAt
  }
}
```

update user:

```
mutation {
  updateUser(updateUser: { id: 1, email: "oleg@mail.ru" }) {
    id
    name
    email
    createdAt
    updatedAt
  }
}
```