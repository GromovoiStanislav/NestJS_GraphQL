## NestJS GraphQL Schema First, TypeORM, Observable and Authorization

http://localhost:3000/graphql

get all Launches:

```
query {
  launches {
    id
    site
    rocket {
      id
      name
      type
    }
    mission {
      name
      missionPatch(size: SMALL)
    }
  }
}
```

Login:

```
mutation {
  login(email: "email@mail.ru")
}
```

Me:
HTTP HEADERS: {"Authorization":"Bearer token"}

```
query {
   me {
    id
    email
    trips {
      id
      site
    }
  }
}
```

cancel Trip:
HTTP HEADERS: {"Authorization":"Bearer token"}

```
mutation {
  cancelTrip(launchId: 13){
    success
    message
  }
}
```

book Trips:
HTTP HEADERS: {"Authorization":"Bearer token"}

```
mutation {
  bookTrips(launchIds: [1, 13, 99]) {
    success
    message
  }
}
```