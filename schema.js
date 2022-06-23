import { buildSchema } from "graphql";

const schema = buildSchema(`
  type Exercise {
    id: String!
    name: String!
    reps: Int
    sets: Int
    notes: String
  }

  type Query {
    exercise(id: String, name: String): Exercise
    exercises: [Exercise]
  }

  input AddExerciseInput {
    name: String!
    reps: Int
    sets: Int
    notes: String
  }

  input UpdateExerciseInput {
    name: String
    reps: Int
    sets: Int
    notes: String
  }

  type Mutation {
    addExercise(input: AddExerciseInput!): Exercise
    updateExercise(id: String!, input: UpdateExerciseInput!): Exercise
  }
`);

export default schema;
