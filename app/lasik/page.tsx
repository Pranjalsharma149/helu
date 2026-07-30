import type { Metadata } from "next";
import LasikPageClient from "./LasikPageClient";

export const metadata: Metadata = {
  title: "LASIK Eye Surgery Cost & Treatment | HealviaCare",
  description:
    "SMILE Pro, Contoura Vision & blade-free LASIK from 500+ expert surgeons. 99.6% success rate, 10-min procedure, 0% EMI. Book your free eye screening today.",
  alternates: {
    canonical: "https://healviacare.in/lasik",
  },
};

export default function LasikPage() {
  return <LasikPageClient />;
}