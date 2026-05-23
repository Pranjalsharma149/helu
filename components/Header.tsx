"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronDown, Menu, X, MessageCircle } from "lucide-react";

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

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  const phoneNumber = "918882804301";
  const message = encodeURIComponent("Hello HealviaCare, I would like to book a consultation.");
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;

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
        element.getBoundingClientRect().top +
        window.pageYOffset +
        yOffset;

      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-[100] bg-white border-b border-slate-100 shadow-sm">

      {/* MAIN HEADER */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 flex items-center justify-between h-[80px]">

        {/* LOGO */}
        <Link href="/" className="flex items-center -ml-4 md:-ml-6">
          <Image
            src="/vb.png"
            alt="HealviaCare"
            width={320}
            height={80}
            priority
            className="h-14 md:h-16 w-auto object-contain"
          />
        </Link>

        {/* DESKTOP NAV */}
        <nav className="hidden lg:flex items-center gap-8">
          <Link href="/" className="text-[15px] font-bold text-slate-700 hover:text-[#1D646B] transition">
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

        {/* CTA & WHATSAPP + MOBILE HAMBURGER */}
        <div className="flex items-center gap-2 md:gap-3">

          {/* Book Now Button — always visible */}
          <Link href="/book-now">
            <button className="px-3 md:px-6 py-2 md:py-3 rounded-2xl bg-gradient-to-r from-[#1D646B] to-[#3BA99C] text-white text-xs md:text-sm font-bold shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all active:scale-95">
              <span className="hidden md:inline">Book Free Consultation</span>
              <span className="md:hidden">Book Now</span>
            </button>
          </Link>

          {/* WhatsApp Button — always visible */}
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 md:p-3 rounded-2xl bg-[#25D366] text-white shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all active:scale-95 flex items-center justify-center"
            title="Chat on WhatsApp"
          >
            <MessageCircle size={20} fill="currentColor" />
          </a>

          {/* Hamburger — only on mobile/tablet */}
          <button
            className="lg:hidden p-2 text-slate-800"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={32} /> : <Menu size={32} />}
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

          </div>
        </div>
      )}
    </header>
  );
}