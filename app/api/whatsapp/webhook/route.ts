import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/mongodb";
import { sendMetaEvent } from "@/lib/metaCapi";

const VERIFY_TOKEN = process.env.WHATSAPP_VERIFY_TOKEN;

// GET — Meta calls this once to verify your webhook URL
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const mode = searchParams.get("hub.mode");
  const token = searchParams.get("hub.verify_token");
  const challenge = searchParams.get("hub.challenge");

  if (mode === "subscribe" && token === VERIFY_TOKEN) {
    return new NextResponse(challenge, { status: 200 });
  }
  return new NextResponse("Forbidden", { status: 403 });
}

// POST — actual incoming WhatsApp messages land here
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const entry = body?.entry?.[0];
    const change = entry?.changes?.[0];
    const value = change?.value;
    const message = value?.messages?.[0];

    if (!message) {
      // Not a message event (could be a status update), ignore quietly
      return NextResponse.json({ ok: true });
    }

    const fromPhone = message.from; // sender's WhatsApp number
    const referral = message.referral; // present only if user came via a CTWA ad
    const ctwaClid = referral?.ctwa_clid || null;
    const adSourceUrl = referral?.source_url || null;
    const contactName = value?.contacts?.[0]?.profile?.name || "WhatsApp Lead";

    const db = await getDb();
    const leads = db.collection("leads");

    // Avoid duplicate leads for the same number within 24h, same pattern as your website form
    const existingLead = await leads.findOne({
      phone: fromPhone,
      created_at: { $gte: new Date(Date.now() - 24 * 60 * 60 * 1000) },
    });

    if (existingLead) {
      return NextResponse.json({ ok: true, duplicate: true });
    }

    const doc = {
      name: contactName,
      phone: fromPhone,
      city: null,
      service: null,
      disease: null,
      insurance: null,
      source: ctwaClid ? "ctwa_whatsapp_ad" : "whatsapp_direct",
      status: "new",
      assignedTo: null,
      notes: "",
      ip_address: null,
      created_at: new Date(),
      fbp: null,
      fbc: null,
      ctwa_clid: ctwaClid,
      event_source_url: adSourceUrl,
      original_event_id: `wa_lead_${fromPhone}_${Date.now()}`,
    };

    const insertResult = await leads.insertOne(doc);

    // Fire the initial "Lead" event to Meta, using ctwa_clid if present
    if (ctwaClid) {
      await sendMetaEvent({
        eventName: "Lead",
        eventId: doc.original_event_id,
        ctwaClid,
        phone: fromPhone,
        customData: { source: doc.source },
      });
    }

    console.log("WhatsApp lead created:", { id: insertResult.insertedId, phone: fromPhone, ctwaClid });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("WhatsApp webhook error:", err);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
