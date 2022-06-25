import { db } from "../db.js";
import { ObjectId } from "mongodb";

const COLLECTION = "exerciseGroups";

export const getAllExerciseGroups = async () => {
  return await db(COLLECTION, async (exerciseGroups) => {
    return (await exerciseGroups.find({}).toArray()).map((item) => ({
      ...item,
      id: item._id,
    }));
  });
};

export const getExerciseGroupByID = async (_, { id }, { db }) => {
  if (!id) return;

  const item = await db.collection(COLLECTION).findOne({ _id: ObjectId(id) });

  if (!item) return;
  return { ...item, id };
};

export const addExerciseGroup = async (_, { input }) => {
  if (!input) return;
  const { insertedId } = await db(COLLECTION, async (c) => c.insertOne(input));

  if (!insertedId) return;
  return { exerciseGroup: { ...input, id: insertedId } };
};

export const updateExerciseGroup = async (_, { input }) => {
  const { id, payload } = input;
  const fields = { $set: payload };

  const { modifiedCount } = await db(COLLECTION, async (c) =>
    c.updateOne({ _id: ObjectId(id) }, fields)
  );

  if (!modifiedCount === 1) return;

  const item = await db(COLLECTION, async (c) =>
    c.findOne({ _id: ObjectId(id) })
  );

  if (!item) return;
  return { exerciseGroup: { ...item, id: item._id } };
};

export const removeExerciseGroup = async (_, { id }) => {
  if (!id) return;

  const { deletedCount } = await db(COLLECTION, async (c) =>
    c.deleteOne({ _id: ObjectId(id) })
  );

  if (!deletedCount === 1) return;
  return { id };
};
