## NestJS GraphQL Code-first - official course

```
query Coffees {
  coffees {
    id
    name
    brand
    type
    flavors {
      id
      name
    }
    createdAt
  }
}

query Coffee($coffeeId: Int!) {
  coffee(id: $coffeeId) {
    id
    name
    brand
    type
    flavors {
      id
      name
    }
    createdAt
  }
}

query Drinks {
  drinks {
    name
    ... on Coffee {
      id
      brand
    }
  }
}

query Drinks2 {
  drinks2 {
    ... on Tea {
      name
    }
    ... on Coffee {
      id
      brand
      name
    }
  }
}

query CoffeeTypes {
  __type(name: "CoffeeType") {
    enumValues {
      name
    }
  }
}

mutation CreateCoffee {
  createCoffee(
    createCoffeeInput: {
      name: "Poast"
      brand: "Buddybrew"
      type: ARABICA
      flavors: ["vanilla", "chocolate"]
    }
  ) {
    id
    name
    brand
    type
    flavors {
      id
      name
    }
    createdAt
  }
}

mutation UpdateCoffee {
  updateCoffee(id: 1, updateCoffeeInput: { name: "Updated" }) {
    id
    name
    brand
    type
    flavors {
      id
      name
    }
  }
}

mutation RemoveCoffee {
  removeCoffee(id: 2) {
    name
    brand
    flavors {
      id
      name
    }
  }
}

```

```
{
	"coffeeId": 1
}
```

```
subscription{
  coffeeAdded{
    id
    name
    brand
    type
  }
}
```