import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const {
      name = "Landing Page Lead",
      phone,
      service = null,
      disease = null,
      insurance = null,
      source = "default",
    } = body;

    if (!phone) {
      return NextResponse.json(
        { error: "Phone number is required" },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from("leads")
      .insert([{
        name,
        phone,
        city: "",          // ← satisfies NOT NULL constraint until you remove the column constraint
        service,
        disease,
        insurance,
        source,
      }])
      .select();

    if (error) throw error;

    return NextResponse.json({ message: "Success", data }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Something went wrong" },
      { status: 500 }
    );
  }
}