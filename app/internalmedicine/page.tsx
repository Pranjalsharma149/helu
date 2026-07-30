import type { Metadata } from "next";
import InternalMedicinePageClient from "./InternalMedicinePageClient";

export const metadata: Metadata = {
  title: "Internal Medicine & General Physician Care | HealviaCare",
  description:
    "24/7 inpatient care for fever, infections, diabetes, hypertension & respiratory illness from NABH-accredited internal medicine specialists. Cashless insurance available.",
  alternates: {
    canonical: "https://healviacare.in/internalmedicine",
  },
};

export default function InternalMedicinePage() {
  return <InternalMedicinePageClient />;
}