import type { Metadata } from "next";
import HospitalsPageClient from "./HospitalsPageClient";

export const metadata: Metadata = {
  title: "Partner Hospitals in Delhi, Mumbai, Pune & More — HealviaCare",
  description:
    "Browse HealviaCare's NABH-accredited partner hospitals across Delhi, Mumbai, Pune, Ahmedabad, Surat, and Bangalore, filterable by city and specialty.",
  alternates: {
    canonical: "https://healviacare.in/hospitals",
  },
};

export default function HospitalsPage() {
  return <HospitalsPageClient />;
}