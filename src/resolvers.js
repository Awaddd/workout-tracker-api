import {
  getAllExercises,
  getExerciseByID,
  addExercise,
  updateExercise,
  deleteExercise,
} from "./exercises/exercises.js";

const resolvers = {
  Query: {
    exercises: getAllExercises,
    exercise: getExerciseByID,
  },
  Mutation: {
    addExercise,
    updateExercise,
    deleteExercise,
  },
};

export default resolvers;
