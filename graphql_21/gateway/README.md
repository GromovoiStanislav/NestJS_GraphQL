```
npm i @apollo/gateway @nestjs/apollo @nestjs/graphql
```

Access the graph http://localhost:3001/graphql

```
query Posts {
  posts {
    id
    authorId
    user {
      id
      name
    }
  }
}

query Post {
  post(id: 1) {
    id
    authorId
    user {
      id
      name
      posts {
        id
        title
      }
    }
  }
}

query getUser {
  getUser(id: 1) {
    id
    name
    posts {
      id
      title
      authorId
    }
  }
}

query getAllUsers {
  getAllUsers {
    id
    name
    posts {
      id
      title
      authorId
    }
  }
}
```