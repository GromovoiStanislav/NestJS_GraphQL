```
npm i @nestjs/graphql @nestjs/apollo @apollo/server graphql
npm i @apollo/subgraph
```

Access the graph http://localhost:3003/graphql

```

query getPosts {
  getPosts {
    id
    authorId
    user {
      id
      posts {
        id
        title
        authorId
      }
    }
  }
}

query findPost {
  findPost(id: 1) {
    id
    authorId
    user {
      id
      posts {
        id
        title
        authorId
      }
    }
  }
}
```
