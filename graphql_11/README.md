## NestSJ GraphQL Code first - multilevel @ResolveField example

http://localhost:3000/graphql

```
query Authors {
  authors {
    id
    name
    posts {
      id
      title
      authorId
      comments {
        id
        text
        postId
      }
    }
  }
}
```
http://localhost:3000/voyager

<image src="voyager.jpg" alt="voyager">