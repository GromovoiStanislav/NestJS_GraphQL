## NestJS with MongoDB, GraphQL, JWT Authentication (cookie), validation config and Integration Testing

```
mutation CreateUser {
  createUser(createUserData: { email: "tom5@mail.ru", password: "123" }) {
    _id
    email
    __typename
  }
}

query GetUser {
  user(_id: "6451e209c7b43cf0e2c74525") {
    _id
    email
    __typename
  }
}

```

HTTP Headers:

```
{
  "Cookie":"Authentication=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NDUxZTIwOWM3YjQzY2YwZTJjNzQ1MjUiLCJpYXQiOjE2ODMwOTM1NDAsImV4cCI6MTY4NjA5MzU0MH0.WWkpluPzhanwAArhpOuG8GUZeIFn0OQzy9pWBl4gglc"
}
```