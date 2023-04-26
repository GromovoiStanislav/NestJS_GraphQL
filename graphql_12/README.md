## NestJS GraphQL Server (code-first) with Prisma

```
npm i prisma -D
npm i @prisma/client
npx prisma init
npx prisma migrate dev
npx prisma migrate dev --name init
```

http://localhost:3000/graphql

<details><summary><strong>See more API operations</strong></summary>

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

Search for posts that contain a specific string in their title or content:

```
# Search for posts that contain a specific string in their title or content
query feedSearchString {
  feed(searchString: "prisma") {
    id
    title
    content
    published
  }
}
```

Paginate and order the returned posts:

```
# Paginate and order the returned posts
query feedPaginate {
  feed(skip: 2, take: 2, orderBy: { updatedAt: desc }) {
    id
    updatedAt
    title
    content
    published
  }
}
```

Create a new user:

```
#Create a new user
mutation signupUser {
  signupUser(data: { name: "Sarah", email: "sarah@prisma.io" }) {
    id
  }
}
```

Create a new user with profile:

```
# Create a new user with profile
mutation signupUser {
  signupUser(
    data: {
      name: "Sam"
      email: "sam@prisma.io"
      profile: { bio: "Hello World" }
    }
  ) {
    id
    profile {
      id
    }
  }
}
```

Create a new profile for an existing user:

```
# Create a new profile for an existing user
mutation createNewProfile {
  createNewProfile(
    userUniqueInput: { id: 1 }
    profile: { bio: "Hello World" }
  ) {
    id
    bio
  }
}
```

Update the profile of an existing user:

```
# Update the profile of an existing user
mutation updateProfileByUser {
  updateProfileByUser(userUniqueInput: { id: 6 }, profile: { bio: "bio..." }) {
    id
    name
    email
    profile {
      id
      bio
    }
  }
}

```

Update the profile by userId:

```
# Update the profile by userId
mutation updateProfileByUserId {
  updateProfileByUserId(userId: 6, profile: { bio: "Hello Prisma" }) {
    id
    bio
  }
}
```

Get the drafts of a user:

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

Get all users:

```
# Get all users
query allUsers {
  allUsers {
    id
    name
    email
    profile {
      id
      bio
      userId
    }
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

Create a new draft:

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

Publish/unpublish an existing post:

```
# Publish/unpublish an existing post
mutation togglePublishPost {
  togglePublishPost(id: 6) {
    id
    published
  }
}
```

Increment the view count of a post:

```
# Increment the view count of a post
mutation incrementPostViewCount {
  incrementPostViewCount(id: 6) {
    id
    viewCount
  }
}
```

Get a single post:

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

Delete a post:

```
# Delete a post
mutation deletePost {
  deletePost(id: 5) {
    id
  }
}
```

</details>