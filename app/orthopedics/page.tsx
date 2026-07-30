import type { Metadata } from "next";
import OrthopedicsPageClient from "./OrthopedicsPageClient";

export const metadata: Metadata = {
  title: "Robotic Knee, Hip & Spine Surgery in India | HealviaCare",
  description:
    "MAKOplasty robotic joint replacement, spine & sports injury care from India's top orthopaedic surgeons. 98.5% success rate, 0% EMI. Book a free bone health audit.",
  alternates: {
    canonical: "https://healviacare.in/orthopedics",
  },
};

export default function OrthopedicsPage() {
  return <OrthopedicsPageClient />;
}