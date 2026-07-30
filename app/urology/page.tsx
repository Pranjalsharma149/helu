import type { Metadata } from "next";
import UrologyPageClient from "./UrologyPageClient";

export const metadata: Metadata = {
  title: "Urology Treatment | Kidney Stones & Prostate Care — HealviaCare",
  description:
    "USFDA-approved laser urology care for kidney stones, prostate (HoLEP), and painless circumcision. Same-day discharge, cashless insurance. Book a free consultation.",
  alternates: {
    canonical: "https://healviacare.in/urology",
  },
};

export default function UrologyPage() {
  return <UrologyPageClient />;
}