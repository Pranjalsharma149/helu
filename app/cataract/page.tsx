import type { Metadata } from "next";
import CataractPageClient from "./CataractPageClient";

/**
 * Server Component — required so Next.js can read this page's
 * own `metadata` export (title, description, canonical). The
 * previous single-file version was "use client", which cannot
 * export metadata, so this page silently inherited the generic
 * title/description from app/layout.tsx.
 *
 * All interactive UI (form state, FAQ toggles, phone validation)
 * has moved to ./CataractPageClient.tsx unchanged.
 */
export const metadata: Metadata = {
  title: "Cataract Surgery in India | Premium Lens Implants — HealviaCare",
  description:
    "Restore crystal-clear vision with blade-free MICS or robotic FLACS cataract surgery. Premium Alcon, Zeiss & J&J lens implants, NABH-accredited hospitals, 0% EMI. Book a free vision screening today.",
  alternates: {
    canonical: "https://www.healviacare.in/cataract",
  },
};

export default function Page() {
  return <CataractPageClient />;
}