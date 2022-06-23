import express from "express";
import { graphqlHTTP } from "express-graphql";
import schema from "./schema.js";
import { db } from "./db.js";
import { ObjectId } from "mongodb";

const app = express();

const root = {
  async exercise({ id }) {
    if (!id) return;

    const item = await db(
      "exercises",
      async (exercises) => await exercises.findOne({ _id: ObjectId(id) })
    );

    if (!item) return;
    return await { ...item, id: item._id };
  },
  async exercises() {
    return await db("exercises", async (exercises) => {
      return (await exercises.find({}).toArray()).map((item) => ({
        ...item,
        id: item._id,
      }));
    });
  },
  async addExercise({ input }) {
    if (!input) return;

    const { insertedId } = await db(
      "exercises",
      async (exercises) => await exercises.insertOne(input)
    );

    if (!insertedId) return;
    return { ...input, id: insertedId };
  },
  async updateExercise({ id, input }) {
    const { modifiedCount } = await db("exercises", async (exercises) => {
      const fields = { $set: input };
      return await exercises.updateOne({ _id: ObjectId(id) }, fields);
    });

    if (!modifiedCount === 1) return;

    const item = await db(
      "exercises",
      async (exercises) => await exercises.findOne({ _id: ObjectId(id) })
    );

    if (!item) return;
    return await { ...item, id: item._id };
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
