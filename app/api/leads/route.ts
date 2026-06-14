import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!  // ← only this line changed
);

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const {
      name = "Landing Page Lead",
      phone,
      city,
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

    if (!city) {
      return NextResponse.json(
        { error: "City is required" },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from("leads")
      .insert([{ name, phone, city, service, disease, insurance, source }])
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