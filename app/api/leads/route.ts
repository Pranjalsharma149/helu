import { createClient } from "@supabase/supabase-js";
import { NextResponse, NextRequest } from "next/server";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

function validatePhone(phone: string): { valid: boolean; error?: string } {
  if (!phone) return { valid: false, error: "Phone number is required" };
  const cleaned = phone.replace(/\D/g, "");
  if (!/^\d{10}$/.test(cleaned)) {
    return { valid: false, error: "Phone must be 10 digits" };
  }
  if (!/^[6-9]/.test(cleaned)) {
    return { valid: false, error: "Invalid Indian phone number" };
  }
  const fakePatterns = [
    /^(\d)\1{9}$/, /^1234567890$/, /^0987654321$/, 
    /^1234554321$/, /^0000000000$/, /^9876543210$/,
  ];
  if (fakePatterns.some((p) => p.test(cleaned))) {
    return { valid: false, error: "Please enter a real phone number" };
  }
  return { valid: true };
}

const requestMap = new Map<string, { count: number; resetTime: number }>();

function checkRateLimit(ip: string): { allowed: boolean; error?: string } {
  const now = Date.now();
  const limit = requestMap.get(ip);
  if (!limit || now > limit.resetTime) {
    requestMap.set(ip, { count: 1, resetTime: now + 60000 });
    return { allowed: true };
  }
  if (limit.count >= 5) {
    return { allowed: false, error: "Too many requests. Please try again later." };
  }
  limit.count++;
  return { allowed: true };
}

export async function POST(request: NextRequest) {
  try {
    const ip = request.headers.get("x-forwarded-for") || request.headers.get("x-real-ip") || "unknown";
    const rateCheck = checkRateLimit(ip);
    if (!rateCheck.allowed) {
      return NextResponse.json({ error: rateCheck.error }, { status: 429 });
    }

    const body = await request.json();
    const { name = "Landing Page Lead", phone, city = null, service = null, disease = null, insurance = null, source = "unknown" } = body;

    if (!name || typeof name !== "string" || name.trim().length < 2) {
      return NextResponse.json({ error: "Name must be at least 2 characters" }, { status: 400 });
    }

    const phoneValidation = validatePhone(phone);
    if (!phoneValidation.valid) {
      return NextResponse.json({ error: phoneValidation.error }, { status: 400 });
    }

    const cleanedPhone = phone.replace(/\D/g, "");

    const { data: existingLead, error: queryError } = await supabase
      .from("leads")
      .select("id, created_at")
      .eq("phone", cleanedPhone)
      .gte("created_at", new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString())
      .maybeSingle();

    if (queryError && queryError.code !== "PGRST116") {
      throw new Error(`Database query error: ${queryError.message}`);
    }

    if (existingLead) {
      return NextResponse.json(
        { error: "We already have your details. Our team will reach out soon!", duplicate: true },
        { status: 200 }
      );
    }

    const { data, error: insertError } = await supabase
      .from("leads")
      .insert([{
        name: name.trim(),
        phone: cleanedPhone,
        city: city?.trim() || null,
        service: service?.trim() || null,
        disease: disease?.trim() || null,
        insurance: insurance?.trim() || null,
        source: source?.trim() || "unknown",
        ip_address: ip,
        status: "new",
      }])
      .select("id, phone, created_at");

    if (insertError) {
      console.error("Insert error:", insertError);
      if (insertError.code === "23505") {
        return NextResponse.json({ error: "This phone number is already registered" }, { status: 409 });
      }
      if (insertError.code === "23502") {
        return NextResponse.json({ error: "Missing required fields", details: insertError.message }, { status: 400 });
      }
      throw insertError;
    }

    console.log("✅ Lead created:", { id: data?.[0]?.id, phone: cleanedPhone, source, timestamp: new Date().toISOString() });

    return NextResponse.json(
      {
        success: true,
        message: "Booking received. Our team will call you within 5 minutes.",
        leadId: data?.[0]?.id,
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("❌ API Error:", { message: error.message, code: error.code, details: error.details });
    if (error instanceof SyntaxError) {
      return NextResponse.json({ error: "Invalid request format" }, { status: 400 });
    }
    return NextResponse.json(
      { error: "Something went wrong. Please try again or call us directly.", code: error.code || "UNKNOWN_ERROR" },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    await supabase.from("leads").select("count", { count: "exact", head: true });
    return NextResponse.json({
      status: "healthy",
      message: "API is working correctly",
      timestamp: new Date().toISOString(),
    }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({
      status: "error",
      message: "Database connection failed",
      error: error.message,
    }, { status: 500 });
  }
}