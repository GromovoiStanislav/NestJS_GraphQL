## NestJS GraphQL Schema first official example

http://localhost:3000/graphql

```
subscription {
  catCreated {
    id
    name
    owner {
      id
      name
    }
  }
}

mutation CreateCat {
  createCat(createCatInput: { name: "Шкирка", age: 15, ownerId: 1 }) {
    id
    name
  }
}

query Cats {
  cats {
    id
    name
    age
    owner {
      id
      name
      age
      cats {
        id
        name
      }
    }
  }
}

query Cat {
  cat(id: 1) {
    id
    name
    age
    owner {
      id
      name
      age
      cats {
        id
        name
      }
    }
  }
}

```
