import { GraphQLDefinitionsFactory } from "@nestjs/graphql";
import { join } from "node:path";

const definitionsFactory = new GraphQLDefinitionsFactory();
definitionsFactory.generate({
  typePaths: ["./src/**/*.graphql"],
  path: join(process.cwd(), "src/graphql.schema.ts"),
  outputAs: "class"
});
// ts-node .\src\generate-typings