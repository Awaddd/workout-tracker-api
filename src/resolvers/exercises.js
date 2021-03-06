import { ObjectId } from "mongodb";

const COLLECTION = "exercises";

export const getAllExercises = async (parent, args, { db }) => {
  let filter = {};
  if ("id" in args) filter = { exerciseGroupID: args.id };
  return (await db.collection(COLLECTION).find(filter).toArray()).map(
    async (item) => {
      const exerciseGroup = await db
        .collection("exerciseGroups")
        .findOne({ _id: ObjectId(item.exerciseGroupID) });

      const data = {
        ...item,
        id: item._id,
      };

      if (exerciseGroup) {
        data.exerciseGroup = {
          id: exerciseGroup._id,
          ...exerciseGroup,
        };
      }

      return data;
    }
  );
};

export const getExerciseByID = async (parent, args, { db }) => {
  let filter = args;
  if ("id" in args) {
    filter = { _id: ObjectId(args.id) };
  }

  const item = await db.collection(COLLECTION).findOne(filter);
  if (!item) throw Error("Could not find exercise");

  const exerciseGroup = await db
    .collection("exerciseGroups")
    .findOne({ _id: ObjectId(item.exerciseGroupID) });

  const data = {
    ...item,
    id: item._id,
  };

  if (exerciseGroup) {
    data.exerciseGroup = {
      id: exerciseGroup._id,
      ...exerciseGroup,
    };
  }

  return data;
};

export const addExercise = async (parent, { input }, { db }) => {
  const { insertedId } = await db.collection(COLLECTION).insertOne(input);
  const exerciseGroup = await db
    .collection("exerciseGroups")
    .findOne({ _id: ObjectId(input.exerciseGroupID) });

  const data = {
    exercise: {
      ...input,
      id: insertedId,
    },
  };

  if (exerciseGroup) {
    data.exercise.exerciseGroup = {
      id: exerciseGroup._id,
      ...exerciseGroup,
    };
  }

  return data;
};

export const updateExercise = async (parent, { input }, { db }) => {
  const { id, fields } = input;

  const collection = db.collection(COLLECTION);

  await collection.updateOne({ _id: ObjectId(id) }, { $set: fields });
  const item = await collection.findOne({ _id: ObjectId(id) });

  const exerciseGroup = await db.collection("exerciseGroups").findOne({
    _id: ObjectId(item.exerciseGroupID),
  });

  const data = {
    exercise: {
      ...item,
      id: item._id,
    },
  };

  if (exerciseGroup) {
    data.exercise.exerciseGroup = {
      id: exerciseGroup._id,
      ...exerciseGroup,
    };
  }

  return data;
};

export const removeExercise = async (parent, { id }, { db }) => {
  await db.collection(COLLECTION).deleteOne({ _id: ObjectId(id) });
  return { id };
};
