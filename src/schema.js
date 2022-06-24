const typeDefs = `

  type Query {
    exercise(id: String, name: String): Exercise
    exercises: [Exercise]
  }

  type Mutation {
    addExercise(input: AddExerciseInput!): AddExercisePayload
    updateExercise(id: String!, input: UpdateExerciseInput!): UpdateExercisePayload
    removeExercise(id: String!): RemoveExercisePayload
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

  schema {
    query: Query
    mutation: Mutation
  }
`;

export default typeDefs;
