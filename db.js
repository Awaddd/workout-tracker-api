import { MongoClient } from "mongodb";
import { DB_NAME, URI } from "./config.js";

const client = new MongoClient(URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const initalise = async () => {
  await client.connect();
  return client.db(DB_NAME);
};

export const getCollection = async (name) => {
  const db = await initalise();
  return db.collection(name);
};
