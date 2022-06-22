import express from "express";
import { graphqlHTTP } from "express-graphql";
import schema from "./schema.js";
import { getCollection } from "./db.js";
import { ObjectId } from "mongodb";

const app = express();

const root = {
  async exercise({ id }) {
    const exercises = await getCollection("exercises");
    const item = await exercises.findOne({ _id: ObjectId(id) });
    return { ...item, id: item._id };
  },
  async exercises() {
    const exercises = await getCollection("exercises");
    const items = (await exercises.find({}).toArray()).map((item) => ({
      ...item,
      id: item._id,
    }));
    return items;
  },
};

app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    rootValue: root,
    graphiql: true,
  })
);

app.use("/", ({ req, res }) => {
  res.send("Connected. Hit /graphql to access the api");
});

app.listen(4000, () => {
  console.log("GraphQL server with Express running on localhost:4000/graphql");
});
