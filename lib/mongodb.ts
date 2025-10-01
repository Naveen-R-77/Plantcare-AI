import { MongoClient, type Db } from "mongodb"

let cachedClientPromise: Promise<MongoClient> | null = null

function getMongoClientPromise(): Promise<MongoClient> {
  const uri = process.env.MONGODB_URI
  if (!uri) {
    const message = 'Missing environment variable MONGODB_URI'
    console.error(message)
    throw new Error(message)
  }

  if (cachedClientPromise) {
    return cachedClientPromise
  }

  const client = new MongoClient(uri, {})
  cachedClientPromise = client.connect().catch((error) => {
    cachedClientPromise = null
    console.error("MongoDB connection failed:", error)
    throw error
  })

  return cachedClientPromise
}

export default function getClientPromise(): Promise<MongoClient> {
  return getMongoClientPromise()
}

export async function getDatabase(): Promise<Db> {
  const client = await getMongoClientPromise()
  return client.db("plant_disease_app")
}
