## Nestjs: GraphQL Code first and MikroORM

migration:

```
ts-node src/migrate.ts
```

http://localhost:3000/graphql

```
query GetStuff {
  getStuff {
    id
    name
    age
    email
    createdAt
    updatedAt
  }
}

mutation CreateStudent {
  createStudent(
    createStudentInput: { name: "Tom", age: 25, email: "tom@mail.ru" }
  ) {
    id
    name
    age
    email
    createdAt
    updatedAt
  }
}

```

