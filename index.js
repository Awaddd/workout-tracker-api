import express from "express";
import { graphqlHTTP } from "express-graphql";
import { makeExecutableSchema } from "@graphql-tools/schema";
import typeDefs from "./src/schema/typeDefs.js";
import resolvers from "./src/resolvers.js";
import { connectToDatabase } from "./src/db.js";

const app = express();

const schema = makeExecutableSchema({ typeDefs, resolvers });

app.use(
  "/graphql",
  graphqlHTTP(async () => {
    const db = await connectToDatabase();

    return {
      schema,
      graphiql: true,
      context: {
        db,
      },
    };
  })
);

app.use("/", ({ req, res }) => {
  res.send("Connected. Hit /graphql to access the api");
});

app.listen(4000, () => {
  console.log("GraphQL server with Express running on localhost:4000/graphql");
});
