type SendConfirmationParams = {
  phone: string;   // 10-digit Indian number, no country code
  name: string;
  service?: string | null;
};

export async function sendWhatsAppConfirmation({
  phone,
  name,
  service,
}: SendConfirmationParams): Promise<{ success: boolean; error?: string }> {
  const phoneNumberId = process.env.WHATSAPP_PHONE_NUMBER_ID;
  const accessToken = process.env.WHATSAPP_ACCESS_TOKEN;
  const templateName = process.env.WHATSAPP_TEMPLATE_NAME;

  if (!phoneNumberId || !accessToken || !templateName) {
    console.error("WhatsApp env vars missing");
    return { success: false, error: "WhatsApp not configured" };
  }

  // Meta requires country code, no +, no spaces. India = 91
  const toNumber = `91${phone}`;

  const payload = {
    messaging_product: "whatsapp",
    to: toNumber,
    type: "template",
    template: {
      name: templateName,
      language: { code: "en" },
      components: [
        {
          type: "body",
          parameters: [
            { type: "text", text: name },
            { type: "text", text: service || "your treatment" },
          ],
        },
      ],
    },
  };

  try {
    const res = await fetch(
      `https://graph.facebook.com/v20.0/${phoneNumberId}/messages`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(payload),
      }
    );

    const data = await res.json();

    if (!res.ok) {
      console.error("WhatsApp API error:", data);
      return { success: false, error: data?.error?.message || "Failed to send" };
    }

    console.log("✅ WhatsApp message sent:", data);
    return { success: true };
  } catch (err: any) {
    console.error("WhatsApp send exception:", err);
    return { success: false, error: err.message };
  }
}