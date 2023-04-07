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

query GetStudentById {
  getStudentById(id: 1) {
    id
    name
    age
    email
    createdAt
    updatedAt
  }
}

query GetStudentByEmail {
  getStudentByEmail(email: "tom@mail.ru") {
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

mutation UpdateStudent {
  updateStudent(updateStudentInput: { id: 9, age: 26 }) {
    id
    name
    age
    email
    createdAt
    updatedAt
  }
}

mutation RemoveStudent {
  removeStudent(id: 4)
}
```

