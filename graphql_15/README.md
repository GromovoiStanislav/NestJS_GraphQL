## NestJS GraphQL Schema first with Prisma-nestjs-graphql, Subscription, Apollo Sandbox instead of the graphql-playground

Prisma:

```
npm i prisma -D
npm i @prisma/client
npx prisma init
npx prisma migrate dev
npx prisma migrate dev --name init
npx prisma generate
```

```
mutation CreateDonation {
  createDonation(
    createDonationInput: {
      count: 10
      displayName: "Tom"
      email: "tom@mail.ru"
      message: "message"
    }
  ) {
    id
    count
    displayName
    email
    createdAt
    message
  }
}

subscription Subscription {
  totalUpdated {
    total
  }
}

query Query {
   donations(orderBy: { field: "count", direction: "desc" }) {
    id
    email
    displayName
    createdAt
    count
  }

  totalDonations

  donation_1: donation(id: 1) {
    count
    createdAt
    displayName
    email
    id
    message
  }

  donation_3: donation(id: 3) {
    count
    createdAt
    displayName
    email
    id
    message
  }
}
```