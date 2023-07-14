```
npm i @nestjs/graphql @nestjs/apollo @apollo/server graphql
npm i @apollo/subgraph
```

Access the graph http://localhost:3003/graphql

```
query posts {
  posts {
    id
    title
    authorId
  }
}

query post {
  post(id: 1) {
    id
    title
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
