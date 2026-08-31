import { NextRequest, NextResponse } from "next/server";
import { sendMetaEvent } from "@/lib/metaCapi";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      event_name,
      event_id,
      event_source_url,
      fbp,
      fbc,
      user_data = {},
      custom_data = {},
    } = body || {};

    if (!event_name || !event_id) {
      return NextResponse.json({ error: "event_name and event_id are required" }, { status: 400 });
    }

    const clientIp = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || undefined;
    const userAgent = req.headers.get("user-agent") || undefined;

    const result = await sendMetaEvent({
      eventName: event_name,
      eventId: event_id,
      eventSourceUrl: event_source_url,
      fbp,
      fbc,
      phone: user_data.phone,
      email: user_data.email,
      clientIp,
      userAgent,
      customData: custom_data,
    });

    if (!result.ok) {
      return NextResponse.json({ error: "Meta CAPI request failed", details: result.error }, { status: 500 });
    }

    return NextResponse.json({ success: true, meta_response: result.data });
  } catch (err) {
    console.error("CAPI handler error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}