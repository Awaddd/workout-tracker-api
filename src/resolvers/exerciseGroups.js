import { ObjectId } from "mongodb";

const COLLECTION = "exerciseGroups";

export const getAllExerciseGroups = async (parent, args, { db }) => {
  return (await db.collection(COLLECTION).find().toArray()).map((item) => ({
    ...item,
    id: item._id,
  }));
};

export const getExerciseGroupByID = async (parent, { id }, { db }) => {
  const item = await db.collection(COLLECTION).findOne({ _id: ObjectId(id) });
  return { ...item, id };
};

export const addExerciseGroup = async (parent, { input }, { db }) => {
  const { insertedId } = await db.collection(COLLECTION).insertOne(input);
  return { exerciseGroup: { ...input, id: insertedId } };
};

export const updateExerciseGroup = async (parent, { input }, { db }) => {
  const { id, fields } = input;

  const collection = db.collection(COLLECTION);

  await collection.updateOne({ _id: ObjectId(id) }, { $set: fields });
  const item = await collection.findOne({ _id: ObjectId(id) });

  return { exerciseGroup: { ...item, id: item._id } };
};

export const removeExerciseGroup = async (parent, { id }, { db }) => {
  await db.collection(COLLECTION).deleteOne({ _id: ObjectId(id) });
  return { id };
};
