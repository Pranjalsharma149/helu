import type { Metadata } from "next";
import PilesPageClient from "./PilesPageClient";

export const metadata: Metadata = {
  title: "Piles Treatment | Pain-Free Laser Surgery — HealviaCare",
  description:
    "USFDA-approved laser piles treatment. 30-minute day-care surgery, no cuts, no stitches, back to work in 48 hours. Book a free, confidential consultation today.",
  alternates: {
    canonical: "https://healviacare.in/piles",
  },
};

export default function PilesPage() {
  return <PilesPageClient />;
}