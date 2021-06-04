import { MongoClient,config } from "./deps.ts";

const client = new MongoClient();
await client.connect({
    db: "deno_project",
    tls: true,
    servers: [
      {
        host: config().HOST,
        port: 27017,
      },
    ],
    credential: {
      username: config().MONGO_UNAME,
      password: config().MONGO_PASS,
      db: "deno_project",
      mechanism: "SCRAM-SHA-1",
    },
  });

const db = client.database("deno_project");
export const usersCollection=db.collection('users');