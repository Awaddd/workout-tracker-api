import { MongoClient } from "mongodb";
import { DB_NAME, URI } from "../config.js";

export const connectToDatabase = async () => {
  const client = new MongoClient(URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  try {
    const connection = await client.connect();
    return connection.db(DB_NAME);
  } catch (error) {
    console.log(error);
  }
};
