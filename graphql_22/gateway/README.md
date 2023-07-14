```
npm i @apollo/gateway @nestjs/apollo @nestjs/graphql
```

Access the graph http://localhost:3001/graphql

```
query GetPosts {
  getPosts {
    id
    authorId
    user {
      id
      name
    }
  }
}

query FindPost {
  findPost(id: 1) {
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