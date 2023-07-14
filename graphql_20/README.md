## NestJs GraphQL upload images

```
npm i graphql-upload@14
```

- Create the 'uploads' folder in the root directory

- in Postman query settings in form-data:

```
operations: { "query": "mutation ($file: Upload!) { singleUpload(uploadFileInput: { image: $file } ) { image } }", "variables": { "file": null } }
map: { "0": ["variables.file"] }
0: // Your file


operations: { "query": "mutation ($file: Upload!) { createCat(createCatInput:{name: \"Lily\", breed: \"Persian\", image: $file}) { name, breed, image } }", "variables": { "file": null } }
map: { "0": ["variables.file"] }
0: // Your file


operations: { "query": "query { cats { name, breed, image } }", "variables": { } }
map: {}
```

- and in Headers:

```
apollo-require-preflight: true
```

- https://github.com/jaydenseric/graphql-multipart-request-spec

<hr>
- or in Altair:

```
mutation SingleUpload($file: Upload!) {
  singleUpload(uploadFileInput: { image: $file }) {
    image
  }
}

mutation CreateCat($file: Upload!) {
  createCat(createCatInput: { name: "Lily", breed: "Persian", image: $file }) {
    name
    breed
    image
  }
}

query Cats {
  cats {
    name
    breed
    image
  }
}
```

- and in Headers:

```
apollo-require-preflight: true
```