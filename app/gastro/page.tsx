import type { Metadata } from "next";
import GastroPageClient from "./GastroPageClient";

export const metadata: Metadata = {
  title: "Gastro & Laparoscopic Surgery Treatment in India | HealviaCare",
  description:
    "Expert laparoscopic surgery, laser piles treatment & HD endoscopy from NABH-accredited gastroenterologists. Free consultation, cashless insurance, 0% EMI. Book today.",
  alternates: {
    canonical: "https://healviacare.in/gastro",
  },
};

export default function GastroPage() {
  return <GastroPageClient />;
}