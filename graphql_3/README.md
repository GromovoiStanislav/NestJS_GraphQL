## NestJS: MongoDB + GraphQL

http://localhost:3000/graphql

get all Users:

```
query {
  users {
    userId
    age
    email
    favoriteFoods
  }
}
```

get one User:

```
query {
  user(userId: "dd997b88-c08d-4a90-8efc-400932e8185b") {
    userId
    age
    email
    favoriteFoods
  }
}
```

create User:

```
mutation {
  createUser(createUserData: { age: 27, email: "user@mail.ru" }) {
    userId
    age
    email
    favoriteFoods
  }
}
```

update User:

```
mutation {
  updateUser(
    updateUserData: {
      userId: "91454930-70e4-4a9f-b602-3556d0034a4e"
      age: 25
      favoriteFoods: ["beer"]
    }
  ) {
    userId
    age
    email
    favoriteFoods
  }
}
```

delete User:

```
mutation {
  deleteUser(
    deleteUserData: { userId: "2fb05138-5299-4d97-8b20-fd8972cd6456" }
  ) {
    userId
    age
    email
    favoriteFoods
  }
}
```