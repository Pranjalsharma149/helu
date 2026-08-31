import { NextResponse } from "next/server";
import { getDb } from "@/lib/mongodb";
import { ObjectId } from "mongodb";
import { sendCapiEventForLead } from "@/lib/capi";

const STATUS_TO_DB: Record<string, string> = {
  "New": "new",
  "Contacted": "contacted",
  "Consultation Booked": "consultation_booked",
  "Surgery Scheduled": "surgery_scheduled",
  "Completed": "completed",
  "Lost": "lost",
};

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const updates = await req.json();
    delete updates.id;
    delete updates._id;

    if (updates.status) {
      updates.status = STATUS_TO_DB[updates.status] || updates.status.toLowerCase();
    }
    if (updates.treatment !== undefined) {
      updates.service = updates.treatment;
      delete updates.treatment;
    }

    const db = await getDb();

    await db
      .collection("leads")
      .updateOne({ _id: new ObjectId(params.id) }, { $set: updates });

    if (updates.status) {
      const updatedLead = await db
        .collection("leads")
        .findOne({ _id: new ObjectId(params.id) });

      if (updatedLead) {
        sendCapiEventForLead(updatedLead, updates.status).catch((err) =>
          console.error("CAPI trigger failed:", err)
        );
      }
    }

    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Failed to update lead" }, { status: 500 });
  }
}

export async function DELETE(
  _req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const db = await getDb();

    await db.collection("leads").deleteOne({ _id: new ObjectId(params.id) });

    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Failed to delete lead" }, { status: 500 });
  }
}