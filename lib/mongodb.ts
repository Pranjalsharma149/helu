import dns from "dns";
import { MongoClient, Db } from "mongodb";

// Force Node's DNS resolver to use Google's public DNS.
// Fixes "querySrv ECONNREFUSED" errors on some Windows dev machines
// (e.g. when security software like McAfee intercepts the system resolver).
// Safe to run in production too.
console.log("[mongodb.ts] Setting DNS servers to Google DNS. NODE_ENV =", process.env.NODE_ENV);
dns.setServers(["8.8.8.8", "8.8.4.4"]);

const uri = process.env.MONGODB_URI!;
const dbName = process.env.MONGODB_DB_NAME || "healviacare";

if (!uri) {
  throw new Error("Missing MONGODB_URI environment variable");
}

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

declare global {
  // eslint-disable-next-line no-var
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

if (process.env.NODE_ENV === "development") {
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  client = new MongoClient(uri);
  clientPromise = client.connect();
}

export async function getDb(): Promise<Db> {
  const client = await clientPromise;
  return client.db(dbName);
}

export default clientPromise;
