import { db } from "../db.js";
import { ObjectId } from "mongodb";

const COLLECTION = "exercises";

export const getAllExercises = async (parent, args, { db }) => {
  return (await db.collection(COLLECTION).find().toArray()).map((item) => ({
    id: item._id,
    ...item,
  }));
};

export const getExerciseByID = async (parent, { id }, { db }) => {
  const item = await db.collection(COLLECTION).findOne({ _id: ObjectId(id) });
  const exerciseGroup = await db
    .collection("exerciseGroups")
    .findOne({ _id: ObjectId(item.exerciseGroupID) });

  return {
    ...item,
    id: item._id,
    exerciseGroup: {
      id: exerciseGroup._id,
      ...exerciseGroup,
    },
  };
};

export const addExercise = async (parent, { input }, { db }) => {
  const { insertedId } = await db.collection(COLLECTION).insertOne(input);
  const exerciseGroup = await db
    .collection("exerciseGroups")
    .findOne({ _id: ObjectId(input.exerciseGroupID) });

  return {
    exercise: {
      ...input,
      id: insertedId,
      exerciseGroup: {
        id: exerciseGroup._id,
        ...exerciseGroup,
      },
    },
  };
};

export const updateExercise = async (parent, { input }, { db }) => {
  const { id, fields } = input;

  const collection = db.collection(COLLECTION);

  await collection.updateOne({ _id: ObjectId(id) }, { $set: fields });
  const item = await collection.findOne({ _id: ObjectId(id) });

  const exerciseGroup = await db.collection("exerciseGroups").findOne({
    _id: ObjectId(item.exerciseGroupID),
  });

  return {
    exercise: {
      ...item,
      id: item._id,
      exerciseGroup: {
        id: exerciseGroup._id,
        ...exerciseGroup,
      },
    },
  };
};

export const removeExercise = async (parent, { id }, { db }) => {
  await db.collection(COLLECTION).deleteOne({ _id: ObjectId(id) });
  return { id };
};
