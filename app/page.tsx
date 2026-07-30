import type { Metadata } from "next";
import HomePageClient from "./HomePageClient";

/**
 * This file is a Server Component (no "use client" here).
 * That is required for Next.js to read a page-specific
 * `metadata` export — a client component cannot export
 * metadata at all, which is why every page on the site was
 * previously falling back to the single title/description
 * defined in app/layout.tsx.
 *
 * All interactive UI (state, popups, animations) has moved
 * to ./HomePageClient.tsx unchanged.
 */
export const metadata: Metadata = {
  title: "HealviaCare | Trusted Surgeons, Cashless Surgery & 0% EMI in India",
  description:
    "Book a free consultation with HealviaCare's network of 500+ verified surgeons across LASIK, Orthopedics, Urology, Piles, Vascular, Gastro & more. NABH-accredited hospitals, cashless insurance, 0% EMI.",
  alternates: {
    canonical: "https://www.healviacare.in/",
  },
};

export default function Page() {
  return <HomePageClient />;
}
