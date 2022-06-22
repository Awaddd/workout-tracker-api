import { buildSchema } from "graphql";

const schema = buildSchema(`
  type Exercise {
    id: String!
    name: String!
    reps: Int!
    sets: Int!
  }

  type Query {
    exercise(id: String, name: String): Exercise
    exercises: [Exercise]
  }
`);

export default schema;
