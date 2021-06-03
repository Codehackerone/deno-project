import { Bson, MongoClient,config } from "./deps.ts";

const client = new MongoClient();
//await client.connect(`${config().MONGO_URI}`);
// await client.connectWithUri("mongodb://localhost:27017")
await client.connect({
    db: "deno",
    tls: true,
    servers: [
      {
        host: "cluster0-shard-00-02.d1jia.mongodb.net",
        port: 27017,
      },
    ],
    credential: {
      username: "codehackerone",
      password: "KQL74TiCuYNAInRB",
      db: "deno",
      mechanism: "SCRAM-SHA-1",
    },
  });

const db = client.database("deno_project");
export  const usersCollection=db.collection('users');