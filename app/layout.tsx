import "./globals.css";
import ConsultationPopup from "@/components/ConsultationPopup";

export const metadata = {
  title: "HealviaCare",
  description: "Healthcare Landing Page",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {children}
        <ConsultationPopup />
      </body>
    </html>
  );
}