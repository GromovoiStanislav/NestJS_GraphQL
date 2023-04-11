## NestSJ GraphQL Code first with MongoDB and Authentication (cookie)

http://localhost:3000/graphql

```
mutation CreateBook {
  createBook(
    input: {
      title: "My new book"
      isbn: "4220"
      author: "64351a719f57549d87e55824"
    }
  ) {
    _id
    title
    isbn
  }
}

query Books {
  books {
    _id
    title
    isbn
    author {
      _id
      name
    }
  }
}

mutation CreateAuthor {
  createAuthor(input: { name: "New Author" }) {
    _id
    name
  }
}

query Book {
  book(input: { _id: "64351fcf8088c65dd41c0f93" }) {
    _id
    title
    isbn
    author {
      _id
      name
    }
  }
}

query Authors {
  authors {
    _id
    name
    books {
      _id
      title
    }
  }
}
```

Authentication:

```
mutation RegisterUser {
  registerUser(input: { name: "Sam", email: "sam@mail.ru", password: "123" }) {
    _id
    email
    name
  }
}

mutation ConfirmUser {
  confirmUser(
    input: {
      email: "sam@mail.ru"
      confirmToken: "5ncInSITQ8GG2GcR6Jm_-ljf4zIFJ6ZH"
    }
  ) {
    _id
    email
    name
  }
}

query Login {
  login(input: { email: "sam@mail.ru", password: "123" }) {
    _id
    email
    name
  }
}

query Me {
  me {
    _id
    email
    name
  }
}

query Logout {
  logout {
    _id
    email
    name
  }
}
```