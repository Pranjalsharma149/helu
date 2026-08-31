import crypto from "crypto";

const META_PIXEL_ID = process.env.META_PIXEL_ID;
const META_CAPI_ACCESS_TOKEN = process.env.META_CAPI_ACCESS_TOKEN;
const META_API_VERSION = "v19.0";

export function hashValue(value?: string) {
  if (!value) return undefined;
  return crypto.createHash("sha256").update(value.trim().toLowerCase()).digest("hex");
}

export function normalizePhone(phone?: string) {
  if (!phone) return undefined;
  let digits = phone.replace(/[^\d]/g, "");
  if (digits.length === 10) digits = "91" + digits;
  return digits;
}

interface SendEventArgs {
  eventName: string;
  eventId: string;
  eventSourceUrl?: string;
  fbp?: string;
  fbc?: string;
  ctwaClid?: string;
  phone?: string;
  email?: string;
  clientIp?: string;
  userAgent?: string;
  customData?: Record<string, any>;
}

export async function sendMetaEvent(args: SendEventArgs) {
  if (!META_PIXEL_ID || !META_CAPI_ACCESS_TOKEN) {
    console.error("Missing META_PIXEL_ID or META_CAPI_ACCESS_TOKEN env vars");
    return { ok: false, error: "Server not configured" };
  }

  const isWhatsAppLead = !!args.ctwaClid;

  const eventPayload: any = {
    event_name: args.eventName,
    event_time: Math.floor(Date.now() / 1000),
    event_id: args.eventId,
    action_source: isWhatsAppLead ? "business_messaging" : "website",
    user_data: {
      em: hashValue(args.email),
      ph: hashValue(normalizePhone(args.phone)),
      client_ip_address: args.clientIp,
      client_user_agent: args.userAgent,
      fbp: args.fbp || undefined,
      fbc: args.fbc || undefined,
      ctwa_clid: args.ctwaClid || undefined,
    },
    custom_data: args.customData || {},
  };

  if (isWhatsAppLead) {
    eventPayload.messaging_channel = "whatsapp";
  } else {
    eventPayload.event_source_url = args.eventSourceUrl;
  }

  const payload = { data: [eventPayload] };

  try {
    const res = await fetch(
      `https://graph.facebook.com/${META_API_VERSION}/${META_PIXEL_ID}/events?access_token=${META_CAPI_ACCESS_TOKEN}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      }
    );
    const data = await res.json();
    if (!res.ok) {
      console.error("Meta CAPI error:", data);
      return { ok: false, error: data };
    }
    return { ok: true, data };
  } catch (err) {
    console.error("Meta CAPI request error:", err);
    return { ok: false, error: err };
  }
}