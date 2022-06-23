import {
  getAllExercises,
  getExerciseByID,
  addExercise,
  updateExercise,
} from "./exercises/exercises.js";

const resolvers = {
  Query: {
    exercises: getAllExercises,
    exercise: getExerciseByID,
  },
  Mutation: {
    addExercise,
    updateExercise,
  },
};

export default resolvers;
