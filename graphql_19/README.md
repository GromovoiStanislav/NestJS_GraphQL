## NestJs GraphQL upload images

```
npm i graphql-upload@13.0.0
```

- Create the 'uploads' folder in the root directory

- in Postman query settings in form-data:

```
operations: { "query": "mutation ($file: Upload!) { singleUpload(file: $file) }", "variables": { "file": null } }

map: { "0": ["variables.file"] }

0: // Your file
```

- and in Headers:

```
apollo-require-preflight: true
```

- https://github.com/jaydenseric/graphql-multipart-request-spec