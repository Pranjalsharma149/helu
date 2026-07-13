/**
 * Full-screen "Under Maintenance" page.
 * This is what visitors see for EVERY page on the site while
 * maintenance mode is switched on via middleware.ts.
 */

const phoneTel = "+919310984753";
const phoneDisplay = "+91 9310984753";
const whatsappNumber = "919310984753";
const whatsappMessage = encodeURIComponent(
  "Hello HealviaCare, I would like to book a consultation."
);
const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

const WhatsAppIcon = ({ size = 20 }: { size?: number }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width={size}
    height={size}
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
  </svg>
);

export const metadata = {
  title: "HealviaCare — Temporarily Unavailable",
};

export default function MaintenancePage() {
  return (
    <main className="min-h-screen w-full flex items-center justify-center px-6 py-16 bg-gradient-to-br from-[#0d3d38] via-[#0a5c52] to-[#0d4a42] relative overflow-hidden">
      {/* ambient glows to match your homepage hero */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full bg-white/5 blur-3xl translate-x-1/3 -translate-y-1/3" />
      <div className="absolute bottom-0 left-0 w-[300px] h-[300px] rounded-full bg-white/5 blur-3xl -translate-x-1/3 translate-y-1/3" />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(255,255,255,0.04) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      <div className="relative z-10 w-full max-w-[480px] rounded-[28px] overflow-hidden shadow-2xl bg-white">
        {/* Top panel */}
        <div className="px-8 pt-10 pb-8 text-center">
          <div className="inline-flex items-center gap-2 bg-[#E6F7F5] border border-[#1D646B]/15 rounded-full px-3 py-1.5 mb-5">
            <span className="w-[7px] h-[7px] rounded-full bg-amber-500 animate-pulse" />
            <span className="text-[#1D646B] text-[11px] font-bold tracking-wide">
              WEBSITE UNDER CHANGES
            </span>
          </div>

          <div className="w-16 h-16 mx-auto mb-5 rounded-full bg-[#1D646B]/10 flex items-center justify-center text-[30px]">
            🛠️
          </div>

          <h1 className="text-[#1D646B] text-xl md:text-2xl font-extrabold mb-3">
            We're Making Some Changes
          </h1>
          <p className="text-slate-500 text-[14px] leading-relaxed max-w-[360px] mx-auto">
            HealviaCare's website is temporarily undergoing updates, so some
            features may not work as expected right now. Everything will be
            back to normal shortly — meanwhile, you can reach us directly
            below for any booking or query.
          </p>
        </div>

        {/* Contact actions */}
        <div className="px-8 pb-9 flex flex-col gap-3">
          <a
            href={`tel:${phoneTel}`}
            className="flex items-center justify-center gap-2.5 py-[15px] rounded-2xl font-bold text-[14.5px] text-white
                       bg-gradient-to-r from-[#1D646B] to-[#3BA99C]
                       shadow-[0_8px_20px_rgba(29,100,107,0.3)]
                       hover:scale-[1.02] active:scale-[0.98] transition-transform"
          >
            <span>📞</span> Call Us: {phoneDisplay}
          </a>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2.5 py-[15px] rounded-2xl font-bold text-[14.5px] text-white
                       bg-[#25D366]
                       shadow-[0_8px_20px_rgba(37,211,102,0.3)]
                       hover:scale-[1.02] active:scale-[0.98] transition-transform"
          >
            <WhatsAppIcon size={18} /> Chat on WhatsApp
          </a>

          <p className="text-center text-[11.5px] text-slate-400 mt-1">
            We typically respond within 5 minutes
          </p>
        </div>
      </div>
    </main>
  );
}