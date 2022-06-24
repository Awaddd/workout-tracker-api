import {
  getAllExerciseGroups,
  getExerciseGroupByID,
  addExerciseGroup,
  updateExerciseGroup,
  removeExerciseGroup,
} from "./resolvers/exerciseGroups.js";
import {
  getAllExercises,
  getExerciseByID,
  addExercise,
  updateExercise,
  removeExercise,
} from "./resolvers/exercises.js";

const resolvers = {
  Query: {
    exercises: getAllExercises,
    exercise: getExerciseByID,
    exerciseGroups: getAllExerciseGroups,
    exerciseGroup: getExerciseGroupByID,
  },
  Mutation: {
    addExercise,
    updateExercise,
    removeExercise,
    addExerciseGroup,
    updateExerciseGroup,
    removeExerciseGroup,
  },
};

export default resolvers;
