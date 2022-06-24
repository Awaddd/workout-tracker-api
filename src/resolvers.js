import {
  getAllExercises,
  getExerciseByID,
  addExercise,
  updateExercise,
  removeExercise,
} from "./exercises/exercises.js";

const resolvers = {
  Query: {
    exercises: getAllExercises,
    exercise: getExerciseByID,
  },
  Mutation: {
    addExercise,
    updateExercise,
    removeExercise,
  },
};

export default resolvers;
