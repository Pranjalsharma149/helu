"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronDown, Menu, X } from "lucide-react";

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
      <div className="h-[3px] w-full bg-gradient-to-r from-[#1D646B] via-[#3BA99C] to-[#1D646B]" />

      {/* MAIN HEADER */}
      <div className="w-full px-2 md:px-4 flex items-center justify-between h-[80px]">

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

          {/* TREATMENTS DROPDOWN */}
          <div
            className="relative group"
            onMouseEnter={() => setShowDropdown(true)}
            onMouseLeave={() => setShowDropdown(false)}
          >
            <button className="flex items-center gap-1 text-[15px] font-bold text-slate-700 group-hover:text-[#1D646B] transition">
              Treatments
              <ChevronDown
                size={16}
                className={`transition-transform duration-300 ${showDropdown ? "rotate-180" : ""}`}
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

          {/* Blog link — commented out for now
          <Link
            href="/blog"
            className="text-[15px] font-bold text-slate-700 hover:text-[#1D646B] transition"
          >
            Blog
          </Link>
          */}
        </nav>

        {/* RIGHT SIDE — Book Free Consultation CTA (desktop/tablet) */}
        <div className="hidden md:flex items-center">
          <Link
            href="/book-now"
            className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-[#1D646B] to-[#3BA99C] text-white font-bold text-sm shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:scale-95 transition-all duration-200"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            Book Free Consultation
          </Link>
        </div>

        {/* MOBILE RIGHT — CTA button + Hamburger */}
        <div className="flex md:hidden items-center gap-2">
          <Link
            href="/book-now"
            className="flex items-center px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#1D646B] to-[#3BA99C] text-white font-bold text-xs shadow-md active:scale-95 transition"
          >
            Book Now
          </Link>

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

            {/* Blog link — commented out for now
            <Link
              href="/blog"
              onClick={() => setIsOpen(false)}
              className="text-lg font-bold text-left text-slate-900 hover:text-[#1D646B] transition"
            >
              Blog
            </Link>
            */}

            {/* MOBILE CTA */}
            <div className="pt-4 border-t border-slate-100">
              <Link
                href="/book-now"
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-center gap-3 w-full p-4 rounded-2xl bg-gradient-to-r from-[#1D646B] to-[#3BA99C] text-white font-bold text-base shadow-lg active:scale-[0.98] transition"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                Book Free Consultation
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}