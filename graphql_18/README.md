## NestJS GraphQL Schema first with Prisma (official example)

```
npm i prisma -D
npm i @prisma/client
npx prisma init
npx prisma migrate dev
npx prisma migrate dev --name init
```

http://localhost:3000/graphql

```
query Posts {
  posts {
    id
    title
    text
    isPublished
  }
}

query Post {
  post(id: "fa29ca44-371c-4c8c-825b-8ee7393f7936") {
    id
    title
    text
    isPublished
  }
}

mutation CreatePost {
  createPost(input: { title: "title", text: "text text" }) {
    id
    title
    text
    isPublished
  }
}

mutation UpdatePost {
  updatePost(
    input: { id: "fa29ca44-371c-4c8c-825b-8ee7393f7936", isPublished: true }
  ) {
    id
    title
    text
    isPublished
  }
}


mutation DeletePost {
  deletePost(id: "fa29ca44-371c-4c8c-825b-8ee7393f7936") {
    id
    title
    text
    isPublished
  }
}

subscription PostCreated {
  postCreated {
    id
    title
    text
    isPublished
  }
}

subscription PostUpdated {
  postUpdated {
    id
    title
    text
    isPublished
  }
}

subscription PostDeleted {
  postDeleted {
    id
    title
    text
    isPublished
  }
}
```