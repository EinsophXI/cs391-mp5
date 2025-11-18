import { MongoClient, Db, Collection } from "mongodb";
const MONGO = process.env.MONGO as string;
if (!MONGO) {
  throw new Error("MONGO environment variable is undefined");
}
const DB_NAME = "shortened-urls";
export const LINK_COLLECTION = "link-collection";
let client: MongoClient | null = null;
let db: Db | null = null;
async function connect(): Promise<Db> {
  if (!client) {
    client = new MongoClient(MONGO);
    await client.connect();
  }
  return client.db(DB_NAME);
}
export default async function getCollection(
  collectionName: string,
): Promise<Collection> {
  if (!db) {
    db = await connect();
  }
  return db.collection(collectionName);
}