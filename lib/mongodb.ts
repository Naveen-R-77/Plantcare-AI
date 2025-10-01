import { MongoClient, type Db } from "mongodb"

let cachedClientPromise: Promise<MongoClient> | null = null

function getMongoClientPromise(): Promise<MongoClient> {
  const uri = process.env.MONGODB_URI
  if (!uri) {
    const message = 'Missing environment variable MONGODB_URI. Please set it in your Vercel environment variables.'
    console.error(message)
    throw new Error(message)
  }

  if (cachedClientPromise) {
    return cachedClientPromise
  }

  try {
    const client = new MongoClient(uri, {
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    })
    
    cachedClientPromise = client.connect().catch((error) => {
      cachedClientPromise = null
      console.error("MongoDB connection failed:", error)
      throw new Error(`MongoDB connection failed: ${error.message}`)
    })

    return cachedClientPromise
  } catch (error) {
    console.error("MongoDB client creation failed:", error)
    throw new Error(`MongoDB client creation failed: ${error instanceof Error ? error.message : 'Unknown error'}`)
  }
}

export default function getClientPromise(): Promise<MongoClient> {
  return getMongoClientPromise()
}

export async function getDatabase(): Promise<Db> {
  try {
    const client = await getMongoClientPromise()
    return client.db("plant_disease_app")
  } catch (error) {
    console.error("Failed to get database:", error)
    throw new Error(`Database connection failed: ${error instanceof Error ? error.message : 'Unknown error'}`)
  }
}
