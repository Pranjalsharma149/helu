import type { Metadata } from "next";
import VascularSurgeryPageClient from "./VascularSurgeryPageClient";

export const metadata: Metadata = {
  title: "Varicose Veins & Vascular Surgery — HealviaCare",
  description:
    "Laser treatment (EVLT) for varicose veins, DVT, and diabetic foot care. Walk-in walk-out procedure, cashless insurance. Book a free vascular consultation today.",
  alternates: {
    canonical: "https://healviacare.in/vascular",
  },
};

export default function VascularSurgeryPage() {
  return <VascularSurgeryPageClient />;
}