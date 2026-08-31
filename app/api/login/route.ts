import { NextResponse } from "next/server";
import { getDb } from "@/lib/mongodb";

// POST /api/login - checks credentials against the users collection.
// Seeds a default admin (admin / admin123) the first time this runs.
export async function POST(req: Request) {
  try {
    const { username, password } = await req.json();

    const db = await getDb();

    let users = await db.collection("users").find({}).toArray();
    if (users.length === 0) {
      const seed = {
        username: "admin",
        password: "admin123",
        name: "Anshoo Bhaiya",
        role: "admin",
      };
      await db.collection("users").insertOne(seed);
      users = [seed as any];
    }

    const match = users.find(
      (u: any) =>
        u.username.toLowerCase() === String(username || "").trim().toLowerCase() &&
        u.password === password
    );

    if (!match) {
      return NextResponse.json({ error: "Invalid username or password" }, { status: 401 });
    }

    return NextResponse.json({
      username: match.username,
      name: match.name,
      role: match.role,
    });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Login failed" }, { status: 500 });
  }
}
