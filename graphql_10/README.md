## NestJS GraphQL Code-first - official course

```
query Coffees {
  coffees {
    id
    name
    brand
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

mutation CreateCoffee {
  createCoffee(
    createCoffeeInput: {
      name: "Poast"
      brand: "Buddybrew"
      flavors: ["vanilla", "chocolate"]
    }
  ) {
    id
    name
    brand
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