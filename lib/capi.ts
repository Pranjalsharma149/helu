import { sendMetaEvent } from "@/lib/metaCapi";

const STATUS_TO_EVENT: Record<string, string> = {
  consultation_booked: "QualifiedLead",
  surgery_scheduled: "Schedule",
  completed: "Purchase",
};

export async function sendCapiEventForLead(lead: any, newDbStatus: string) {
  const eventName = STATUS_TO_EVENT[newDbStatus];
  if (!eventName) return;

  const result = await sendMetaEvent({
    eventName,
    eventId: `${eventName}_${lead._id}_${Date.now()}`,
    eventSourceUrl: lead.event_source_url,
    fbp: lead.fbp,
    fbc: lead.fbc,
    ctwaClid: lead.ctwa_clid,
    phone: lead.phone,
    customData: { treatment: lead.service || undefined },
  });

  if (result.ok) {
    console.log(`CAPI ${eventName} sent for lead ${lead._id}`);
  }
}