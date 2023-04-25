## NestJS GraphQL Server (code-first) with Prisma

```
npm i prisma -D
npm i @prisma/client
npx prisma init
npx prisma migrate dev
npx prisma migrate dev --name init
```

http://localhost:3000/graphql

Get all published posts and their authors:

```
# Get all published posts and their authors
query feed {
  feed {
    id
    title
    content
    published
    author {
      id
      name
      email
    }
  }
}
```

Create a new user

```
#Create a new user
mutation signupUser {
  signupUser(data: { name: "Sarah", email: "sarah@prisma.io" }) {
    id
  }
}
```

Get the drafts of a user

```
# Get the drafts of a user
query draftsByUser {
  draftsByUser(userUniqueInput: { email: "mahmoud@prisma.io" }) {
    id
    title
    content
    published
    author {
      id
      name
      email
    }
  }
}
```

Get all users

```
# Get all users
query allUsers {
  allUsers {
    id
    name
    email
    posts {
      id
      title
      content
      published
      viewCount
      createdAt
      updatedAt
    }
  }
}
```

Create a new draft

```
# Create a new draft
mutation createDraft {
  createDraft(
    data: { title: "Join the Prisma Slack", content: "https://slack.prisma.io" }
    authorEmail: "alice@prisma.io"
  ) {
    id
    viewCount
    published
    author {
      id
      name
    }
  }
}
```

Publish/unpublish an existing post

```
# Publish/unpublish an existing post
mutation togglePublishPost {
  togglePublishPost(id: 6) {
    id
    published
  }
}
```

Increment the view count of a post

```
# Increment the view count of a post
mutation incrementPostViewCount {
  incrementPostViewCount(id: 6) {
    id
    viewCount
  }
}
```

Get a single post

```
# Get a single post
query postById {
  postById(id: 1) {
    id
    title
    content
    published
    author {
      id
      name
    }
  }
}
```

Delete a post

```
# Delete a post
mutation deletePost {
  deletePost(id: 5) {
    id
  }
}
```