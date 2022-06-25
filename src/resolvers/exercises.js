import { db } from "../db.js";
import { ObjectId } from "mongodb";

const COLLECTION = "exercises";

export const getAllExercises = async () => {
  return await db(COLLECTION, async (c) => {
    return (await c.find({}).toArray()).map((item) => ({
      ...item,
      id: item._id,
    }));
  });
};

export const getExerciseByID = async (_, { id }) => {
  if (!id) return;

  const item = await db(
    COLLECTION,
    async (c) => await c.findOne({ _id: ObjectId(id) })
  );

  const item2 = await db(
    "exerciseGroups",
    async (c) => await c.findOne({ _id: ObjectId(item.exerciseGroupID) })
  );

  if (!item) return;
  return await {
    ...item,
    id: item._id,
    exerciseGroup: {
      ...item2,
      id: item2._id,
    },
  };
};

export const addExercise = async (_, { input }) => {
  if (!input) return;

  const { insertedId } = await db(
    COLLECTION,
    async (c) => await c.insertOne(input)
  );

  if (!insertedId) return;
  return { exercise: { ...input, id: insertedId } };
};

export const updateExercise = async (_, { input }) => {
  const { id, payload } = input;

  const { modifiedCount } = await db(COLLECTION, async (c) => {
    const fields = { $set: payload };
    return await c.updateOne({ _id: ObjectId(id) }, fields);
  });

  if (!modifiedCount === 1) return;

  const item = await db(
    COLLECTION,
    async (c) => await c.findOne({ _id: ObjectId(id) })
  );

  if (!item) return;
  return {
    exercise: { ...item, id: item._id },
  };
};

export const removeExercise = async (_, { id }) => {
  const { deletedCount } = await db(
    COLLECTION,
    async (c) => await c.deleteOne({ _id: ObjectId(id) })
  );

  if (!deletedCount === 1) return;
  return { id };
};
