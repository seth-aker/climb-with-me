import { Db, MongoClient } from "mongodb";

const connectionString = process.env.ATLAS_URI || "";
let db: Db 

async function connect() {
const client = new MongoClient(connectionString);
let connection;
try {
  connection = await client.connect();
} catch (e) {
  console.log(e)
  throw new Error("Error connecting to MongoDb: " + e);
}
  db = connection.db("dev-cwm")
}

export const useDatabase = async () => {
  if(!db) {
    await connect();
  } 
  return db;
}
