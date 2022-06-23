const typeDefs = `

  type Query {
    exercise(id: String, name: String): Exercise
    exercises: [Exercise]
  }

  type Mutation {
    addExercise(input: AddExerciseInput!): Exercise
    updateExercise(id: String!, input: UpdateExerciseInput!): Exercise
    deleteExercise(id: String!): String
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

  schema {
    query: Query
    mutation: Mutation
  }
`;

export default typeDefs;
