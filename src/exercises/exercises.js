import { db } from "../db.js";
import { ObjectId } from "mongodb";

export const getAllExercises = async () => {
  return await db("exercises", async (exercises) => {
    return (await exercises.find({}).toArray()).map((item) => ({
      ...item,
      id: item._id,
    }));
  });
};

export const getExerciseByID = async (_, { id }) => {
  if (!id) return;

  const item = await db(
    "exercises",
    async (exercises) => await exercises.findOne({ _id: ObjectId(id) })
  );

  if (!item) return;
  return await { ...item, id: item._id };
};

export const addExercise = async (_, { input }) => {
  if (!input) return;

  const { insertedId } = await db(
    "exercises",
    async (exercises) => await exercises.insertOne(input)
  );

  if (!insertedId) return;
  return { ...input, id: insertedId };
};

export const updateExercise = async (_, { id, input }) => {
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
};
