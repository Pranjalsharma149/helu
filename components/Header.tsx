"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronDown, Menu, X, Phone } from "lucide-react";

const treatments = [
  { name: "LASIK Eye Surgery", href: "/lasik" },
  { name: "Cataract Surgery", href: "/cataract" },
  { name: "Urology (Kidney Stones)", href: "/urology" },
  { name: "Vascular (Varicose Veins)", href: "/vascular" },
  { name: "Orthopedics", href: "/orthopedics" },
  { name: "Gastroenterology", href: "/gastro" },
  { name: "Piles (Proctology)", href: "/piles" },
  { name: "Internal Medicine", href: "/internalmedicine" },
];

/* ---------- REAL WHATSAPP BRAND ICON (inline SVG) ---------- */
const WhatsAppIcon = ({ size = 22 }: { size?: number }) => (
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

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  // ===== CONTACT CONFIG (edit here) =====
  const phoneDisplay = "+91 88828 04301";
  const phoneTel = "+918882804301";
  const whatsappNumber = "918882804301";
  const whatsappMessage = encodeURIComponent(
    "Hello HealviaCare, I would like to book a consultation."
  );
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

  const scrollToSection = (id: string) => {
    setIsOpen(false);

    if (window.location.pathname !== "/") {
      window.location.href = `/#${id}`;
      return;
    }

    const element = document.getElementById(id);
    if (element) {
      const yOffset = -90;
      const y =
        element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-[100] bg-white border-b border-slate-100 shadow-sm">
      {/* Top gradient accent line */}
      <div className="h-[3px] w-full bg-gradient-to-r from-[#1D646B] via-[#3BA99C] to-[#1D646B]"></div>

      {/* MAIN HEADER */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 flex items-center justify-between h-[80px]">
        {/* LOGO */}
        <Link href="/" className="flex items-center flex-shrink-0">
          <Image
            src="/vv.png"
            alt="HealviaCare"
            width={160}
            height={40}
            priority
            className="h-9 md:h-10 w-auto object-contain"
          />
        </Link>

        {/* DESKTOP NAV */}
        <nav className="hidden lg:flex items-center gap-8">
          <Link
            href="/"
            className="text-[15px] font-bold text-slate-700 hover:text-[#1D646B] transition"
          >
            Home
          </Link>

          {/* DROPDOWN */}
          <div
            className="relative group"
            onMouseEnter={() => setShowDropdown(true)}
            onMouseLeave={() => setShowDropdown(false)}
          >
            <button className="flex items-center gap-1 text-[15px] font-bold text-slate-700 group-hover:text-[#1D646B] transition">
              Treatments
              <ChevronDown
                size={16}
                className={`transition-transform duration-300 ${
                  showDropdown ? "rotate-180" : ""
                }`}
              />
            </button>

            {showDropdown && (
              <div className="absolute top-full -left-10 pt-4 w-[260px]">
                <div className="bg-white rounded-2xl shadow-2xl border border-slate-100 p-2">
                  {treatments.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="block px-4 py-3 text-sm font-medium text-slate-600 hover:bg-[#F0FFF4] hover:text-[#1D646B] rounded-xl transition"
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          <button
            onClick={() => scrollToSection("why-choose-us")}
            className="text-[15px] font-bold text-slate-700 hover:text-[#1D646B] transition"
          >
            About Us
          </button>

          <button
            onClick={() => scrollToSection("talk-to-specialist")}
            className="text-[15px] font-bold text-slate-700 hover:text-[#1D646B] transition"
          >
            Contact Us
          </button>
        </nav>

        {/* RIGHT SIDE: CONTACT NUMBER + WHATSAPP (DESKTOP / TABLET) */}
        <div className="hidden md:flex items-center gap-3">
          {/* Contact Number Button */}
          <a
            href={`tel:${phoneTel}`}
            className="group flex items-center gap-3 pl-2 pr-5 py-2 rounded-2xl bg-gradient-to-r from-[#1D646B] to-[#3BA99C] text-white shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all active:scale-95"
            title="Call Us"
          >
            <span className="flex items-center justify-center w-10 h-10 rounded-xl bg-white/20 backdrop-blur-sm group-hover:bg-white/30 transition">
              <Phone size={18} className="text-white" strokeWidth={2.5} />
            </span>
            <span className="flex flex-col leading-tight">
              <span className="text-[10px] font-semibold uppercase tracking-wider text-white/80">
                Call Us 24/7
              </span>
              <span className="text-sm font-bold tracking-wide">
                {phoneDisplay}
              </span>
            </span>
          </a>

          {/* WhatsApp Button — REAL LOGO */}
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center w-[54px] h-[54px] rounded-2xl bg-[#25D366] text-white shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all active:scale-95"
            title="Chat on WhatsApp"
            aria-label="Chat on WhatsApp"
          >
            <WhatsAppIcon size={26} />
          </a>
        </div>

        {/* MOBILE RIGHT — Phone icon + WhatsApp icon + Hamburger */}
        <div className="flex md:hidden items-center gap-2">
          {/* Phone Icon (Mobile) */}
          <a
            href={`tel:${phoneTel}`}
            className="flex items-center justify-center w-11 h-11 rounded-xl bg-gradient-to-r from-[#1D646B] to-[#3BA99C] text-white shadow-md active:scale-95 transition"
            title="Call Us"
            aria-label="Call us"
          >
            <Phone size={20} strokeWidth={2.5} />
          </a>

          {/* WhatsApp Icon (Mobile) */}
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center w-11 h-11 rounded-xl bg-[#25D366] text-white shadow-md active:scale-95 transition"
            title="Chat on WhatsApp"
            aria-label="Chat on WhatsApp"
          >
            <WhatsAppIcon size={22} />
          </a>

          {/* Hamburger */}
          <button
            className="flex items-center justify-center w-11 h-11 rounded-xl bg-slate-100 text-slate-800 active:scale-95 transition"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* MOBILE MENU */}
      {isOpen && (
        <div className="lg:hidden absolute top-full left-0 right-0 bg-white border-t border-slate-200 shadow-2xl p-6 h-[calc(100vh-80px)] overflow-y-auto">
          <div className="flex flex-col gap-6">
            <Link
              href="/"
              onClick={() => setIsOpen(false)}
              className="text-lg font-bold text-slate-900 hover:text-[#1D646B] transition"
            >
              Home
            </Link>

            <div className="space-y-4">
              <p className="text-[10px] font-black uppercase tracking-widest text-[#1D646B]">
                Our Treatments
              </p>

              <div className="grid gap-1 pl-3 border-l-2 border-[#1D646B]/30">
                {treatments.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className="text-[15px] font-semibold text-slate-800 hover:text-[#1D646B] hover:bg-[#F0FFF4] px-3 py-2 rounded-lg transition"
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>

            <button
              onClick={() => scrollToSection("why-choose-us")}
              className="text-lg font-bold text-left text-slate-900 hover:text-[#1D646B] transition"
            >
              About Us
            </button>

            <button
              onClick={() => scrollToSection("talk-to-specialist")}
              className="text-lg font-bold text-left text-slate-900 hover:text-[#1D646B] transition"
            >
              Contact Us
            </button>

            {/* MOBILE CTA — Contact Number + WhatsApp */}
            <div className="flex flex-col gap-3 pt-4 border-t border-slate-100">
              <a
                href={`tel:${phoneTel}`}
                className="flex items-center gap-4 p-4 rounded-2xl bg-gradient-to-r from-[#1D646B] to-[#3BA99C] text-white shadow-lg active:scale-[0.98] transition"
              >
                <span className="flex items-center justify-center w-12 h-12 rounded-xl bg-white/20 backdrop-blur-sm">
                  <Phone size={22} strokeWidth={2.5} />
                </span>
                <span className="flex flex-col leading-tight">
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-white/80">
                    Call Us 24/7
                  </span>
                  <span className="text-base font-bold">{phoneDisplay}</span>
                </span>
              </a>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 rounded-2xl bg-[#25D366] text-white shadow-lg active:scale-[0.98] transition"
              >
                <span className="flex items-center justify-center w-12 h-12 rounded-xl bg-white/20 backdrop-blur-sm">
                  <WhatsAppIcon size={24} />
                </span>
                <span className="flex flex-col leading-tight">
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-white/80">
                    Chat with us
                  </span>
                  <span className="text-base font-bold">WhatsApp Now</span>
                </span>
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}