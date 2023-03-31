## NestJS - GraphQL Schema first

http://localhost:3000/graphql

add Post:

```
mutation {
  createPost(title: "title", content: "content") {
    id
    title
    content
  }
}
```

get all Posts

```
query  {
  getPosts {
    id
    title
    content
    comments {
      text
      date
    }
  }
}

```

add Comment to Post

```
mutation  {
  addComment(
    input: {
      user: "user"
      text: "text"
      postId: "1f33ef06-8582-4925-b4a0-f4a08b3146cd"
    }
  ) {
    text
    user
    date
  }
}
```