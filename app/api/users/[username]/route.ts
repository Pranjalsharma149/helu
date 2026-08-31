import { NextResponse } from "next/server";
import { getDb } from "@/lib/mongodb";

export async function DELETE(
  _req: Request,
  { params }: { params: { username: string } }
) {
  try {
    if (params.username === "admin") {
      return NextResponse.json({ error: "Cannot delete the admin account" }, { status: 400 });
    }

    const db = await getDb();

    await db.collection("users").deleteOne({ username: params.username });

    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Failed to delete user" }, { status: 500 });
  }
}
