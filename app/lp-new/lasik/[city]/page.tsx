import Script from "next/script";
import type { Metadata } from "next";

export const metadata: Metadata = {
  openGraph: {
    url: "https://healviacare.in/lp-new/lasik/",
  },
};

export default function LasikLandingPage() {
  return <Script src="https://lp.zooty.in/_/js/healviacare-lasik_2026/" strategy="afterInteractive" />;
}
