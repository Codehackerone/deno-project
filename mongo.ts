import { Bson, MongoClient,config } from "./deps.ts";

const client = new MongoClient();
await client.connect(config().MONGO_URI);

const db = client.database("deno_project");
export const usersCollection=db.collection('users');