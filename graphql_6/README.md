## NestJS GraphQL Code first

http://localhost:3000/graphql

<hr>
get all Pets:

```
query {
  pets {
    id
    name
    type
    owner {
      name
    }
  }
}
```

or

POST http://localhost:3000/graphql
{"query": "query {pets {id name type owner {name}}}"}

<hr>
get one Pet:

```
query {
  getPet(id: 1) {
    id
    name
    type
    owner {
      name
    }
  }
}
```

or

POST http://localhost:3000/graphql
{"query": "query {getPet(id: 1) {id name type owner {name}}}"}

<hr>
create Owner:

```
mutation {
  createOwner(createOwnerInput: { name: "Olga" }) {
    id
    name
  }
}
```

or

POST http://localhost:3000/graphql
{"query": "mutation {createOwner(createOwnerInput: { name: \"Olga\", }) {id name}}"}

<hr>
create Pet:

```
mutation {
  createPet(createPetInput: { name: "Mamba", type: "cat", ownerId: 1 }) {
    id
    name
    type
  }
}
```

or

POST http://localhost:3000/graphql
{"query": "mutation {createPet(createPetInput: { name: \"Rex\", type: \"dog\" ownerId: 1 }) {id name type}}"}

<hr>
get all Owners:

```
query {
  owners {
    name
    pets {
      name
    }
  }
}
```

or

POST http://localhost:3000/graphql
{"query": "query {owners {name pets {name}}}"}

<hr>
get one Owner:

```
query {
  owner(id: 1) {
    name
    pets {
      name
    }
  }
}
```

or

POST http://localhost:3000/graphql
{"query": "query {owner(id: 1) {name pets {name}}}"}