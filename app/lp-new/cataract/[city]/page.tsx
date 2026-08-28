import Script from "next/script";
import type { Metadata } from "next";

export const metadata: Metadata = {
  openGraph: {
    url: "https://healviacare.in/lp-new/cataract/",
  },
};

export default function CataractLandingPage() {
  return <Script src="https://lp.zooty.in/_/js/healviacare-cataract_2026/" strategy="afterInteractive" />;
}
