const typeDefs = `
  type Query {
    exercise(id: String, name: String): Exercise
    exercises: [Exercise]
  }

  type Mutation {
    addExercise(input: AddExerciseInput!): AddExercisePayload
    updateExercise(input: UpdateExerciseInput!): UpdateExercisePayload
    removeExercise(id: String!): RemoveExercisePayload
  }

  schema {
    query: Query
    mutation: Mutation
  }

  type Exercise {
    id: String!
    name: String!
    reps: Int
    sets: Int
    notes: String
  }

  input AddExerciseInput {
    name: String!
    reps: Int
    sets: Int
    notes: String
  }

  input UpdateExerciseInput {
    id: String!
    payload: UpdateExerciseInputPayload
  }

  input UpdateExerciseInputPayload {
    name: String
    reps: Int
    sets: Int
    notes: String
  }

  type AddExercisePayload {
    exercise: Exercise
  }

  type UpdateExercisePayload {
    exercise: Exercise
  }

  type RemoveExercisePayload {
    id: String
  }
`;

export default typeDefs;
