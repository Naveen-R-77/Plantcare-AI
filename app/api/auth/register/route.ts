import { type NextRequest, NextResponse } from "next/server"
import { getDatabase } from "@/lib/mongodb"
import bcrypt from "bcryptjs"
import type { User } from "@/lib/models"

export async function POST(request: NextRequest) {
  try {
    const { email, password, name, phone, location, preferredLanguage } = await request.json()

    if (!email || !password || !name) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const db = await getDatabase()
    const users = db.collection<User>("users")

    // Check if user already exists
    const existingUser = await users.findOne({ email })
    if (existingUser) {
      return NextResponse.json({ error: "User already exists" }, { status: 409 })
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12)

    // Create user
    const newUser: Omit<User, "_id"> = {
      email,
      password: hashedPassword,
      name,
      phone,
      location,
      preferredLanguage: preferredLanguage || "en",
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    const result = await users.insertOne(newUser)

    return NextResponse.json({
      message: "User created successfully",
      userId: result.insertedId,
    })
  } catch (error) {
    console.error("Registration error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
