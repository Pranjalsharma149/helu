interface UserData {
  phone?: string;
  email?: string;
  [key: string]: string | undefined;
}

interface CustomData {
  city?: string;
  [key: string]: any;
}

interface SendCapiEventOptions {
  userData?: UserData;
  customData?: CustomData;
}

declare global {
  interface Window {
    fbq?: (...args: any[]) => void;
  }
}

function getCookie(name: string): string | undefined {
  if (typeof document === "undefined") return undefined;
  const match = document.cookie.match(new RegExp("(^| )" + name + "=([^;]+)"));
  return match ? decodeURIComponent(match[2]) : undefined;
}

function generateEventId(): string {
  return `evt_${Date.now()}_${Math.random().toString(36).slice(2, 10)}`;
}

export async function sendCapiEvent(
  eventName: string,
  { userData = {}, customData = {} }: SendCapiEventOptions = {}
): Promise<string> {
  const eventId = generateEventId();
  const eventSourceUrl = typeof window !== "undefined" ? window.location.href : undefined;

  if (typeof window !== "undefined" && typeof window.fbq === "function") {
    window.fbq("track", eventName, customData, { eventID: eventId });
  }

  try {
    await fetch("/api/capi-event", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        event_name: eventName,
        event_id: eventId,
        event_source_url: eventSourceUrl,
        fbp: getCookie("_fbp"),
        fbc: getCookie("_fbc"),
        user_data: userData,
        custom_data: customData,
      }),
    });
  } catch (err) {
    console.error("CAPI event failed to send:", err);
  }

  return eventId;
}