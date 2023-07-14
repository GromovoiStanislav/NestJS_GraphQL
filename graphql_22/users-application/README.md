```
npm i @nestjs/graphql @nestjs/apollo @apollo/server graphql
npm i @apollo/subgraph
```

Access the graph http://localhost:3002/graphql

```
query getUser {
  getUser(id: 1) {
    id
    name
  }
}

query getAllUsers {
  getAllUsers {
    id
    name
  }
}
```
