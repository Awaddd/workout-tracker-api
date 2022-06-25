import { MongoClient } from "mongodb";
import { DB_NAME, URI } from "../config.js";

const client = new MongoClient(URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

export const db = async (name, operation) => {
  const callback = async (resolve, reject) => {
    if (!name || !operation) reject("Required arguments missing");
    await client.connect();
    const db = client.db(DB_NAME);
    return resolve(operation(db.collection(name)));
  };

  return new Promise(callback).catch((err) => console.log("err", err));
};

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
