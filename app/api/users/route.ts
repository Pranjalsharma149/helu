import { NextResponse } from "next/server";
import { getDb } from "@/lib/mongodb";

// GET /api/users - returns team members WITHOUT passwords (safe for the client).
// Seeds a default admin (admin / admin123) the first time this runs.
export async function GET() {
  try {
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

    return NextResponse.json(
      users.map((u: any) => ({ username: u.username, name: u.name, role: u.role }))
    );
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Failed to load users" }, { status: 500 });
  }
}

// POST /api/users - add a new team member (admin only, enforced in the UI)
export async function POST(req: Request) {
  try {
    const body = await req.json();
    if (!body.username || !body.password || !body.name) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    const db = await getDb();

    const existing = await db.collection("users").findOne({ username: body.username });
    if (existing) {
      return NextResponse.json({ error: "Username already exists" }, { status: 409 });
    }

    await db.collection("users").insertOne({
      username: body.username,
      password: body.password,
      name: body.name,
      role: body.role || "agent",
    });

    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Failed to add user" }, { status: 500 });
  }
}
