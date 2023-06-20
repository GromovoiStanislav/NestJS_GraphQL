## NestJS GraphQL Schema first with Prisma

- v2 - with @ResolveField()

Prisma:

```
npm i prisma -D
npm i @prisma/client
npx prisma init
npx prisma migrate dev
npx prisma migrate dev --name init
npx prisma generate
```

http://localhost:3000/graphql

```
mutation CreateOwner {
  createOwner(createOwnerInput: { name: "Tom" }) {
    id
    name
  }
}

mutation CreateDog {
  createDog(createDogInput: { name: "Reks", ownerId: 1 }) {
    id
    name
  }
}

mutation UpdateDog {
  updateDog(updateDogInput: { id: 4, name: "Bobik" }) {
    id
    name
  }
}

mutation RemoveDog {
  removeDog(id: 3) {
    id
    name
  }
}

mutation RemoveOwner {
  removeOwner(id: 1) {
    id
    name
    dogs {
      id
      name
    }
  }
}

query Query {
  owner(id: 1) {
    name
    dogs {
      id
      name
    }
  }
  
  dogs {
    id
    name
    owner {
      id
      name
    }
  }
  
  dog(id: 1) {
    id
    name
    owner {
      id
      name
    }
  }
}
```