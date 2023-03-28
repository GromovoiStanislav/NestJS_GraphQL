## NestJS with GraphQL 

http://localhost:3000/graphql

create User:
```
mutation {
  createUser(
    createUserData: { age: 27, email: "user@mail.ru", password: "123" }
  ) {
    userId
    age
    email
    isSubscribed
  }
}
```
get some Users by ids:
```
query {
  users(userIds: ["5ddeb8ea-b72e-4474-bf15-f88c6b9a2aa6"]) {
    userId
    age
    email
    isSubscribed
  }
}
```
get one User by id:
```
query {
  user(userId: "5ddeb8ea-b72e-4474-bf15-f88c6b9a2aa6") {
    userId
    age
    email
    isSubscribed
  }
}
```
update User:
```
mutation {
  updateUser(
    updateUserData: {
      userId: "5ddeb8ea-b72e-4474-bf15-f88c6b9a2aa6"
      isSubscribed: true
    }
  ) {
    userId
    age
    email
    isSubscribed
  }
}
```
delete User:
```
mutation {
  deleteUser(
    deleteUserData: { userId: "5ddeb8ea-b72e-4474-bf15-f88c6b9a2aa6" }
  ) {
    userId
    age
    email
    isSubscribed
  }
}
```