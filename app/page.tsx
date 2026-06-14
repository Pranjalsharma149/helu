"use client";

import { useState } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

import {
  Eye,
  Droplets,
  HeartPulse,
  Bone,
  Stethoscope,
  Hospital,
  Activity,
  ChevronDown,
} from "lucide-react";

import {
  UserGroupIcon,
  ClockIcon,
  BuildingOffice2Icon,
  CurrencyRupeeIcon,
} from "@heroicons/react/24/solid";

/* ---------------- SERVICES DATA ---------------- */
const services = [
  {
    title: "LASIK Eye Surgery",
    desc: "Freedom from glasses with SMILE Pro & Contoura Vision.",
    icon: Eye,
    href: "/lasik",
    color: "bg-[#E6F7F5]",
    featured: true,
  },
  {
    title: "Piles (Proctology)",
    desc: "Laser treatment for Piles, Fissure, and Fistula.",
    icon: Activity,
    href: "/piles",
    color: "bg-[#F5F3FF]",
    featured: true,
  },
  {
    title: "Urology",
    desc: "Laser treatment for Kidney Stones & Prostate.",
    icon: Droplets,
    href: "/urology",
    color: "bg-[#FFF4E6]",
    featured: true,
  },
  {
    title: "Orthopedics",
    desc: "Knee/Hip Replacement & Spine Surgery.",
    icon: Bone,
    href: "/orthopedics",
    color: "bg-[#F1F5FF]",
    featured: true,
  },
  {
    title: "Cataract Surgery",
    desc: "Micro-incision surgery with premium lens options.",
    icon: Eye,
    href: "/cataract",
    color: "bg-[#EAF2FF]",
    featured: false,
  },
  {
    title: "Vascular Surgery",
    desc: "Modern Laser treatment for Varicose Veins & DVT.",
    icon: HeartPulse,
    href: "/vascular",
    color: "bg-[#FFECEF]",
    featured: false,
  },
  {
    title: "Gastroenterology",
    desc: "Endoscopy, Colonoscopy & Liver care.",
    icon: Stethoscope,
    href: "/gastro",
    color: "bg-[#F0FFF4]",
    featured: false,
  },
  {
    title: "Internal Medicine",
    desc: "Typhoid, Dengue & General Admissions.",
    icon: Hospital,
    href: "/internalmedicine",
    color: "bg-[#FFF0F6]",
    featured: false,
  },
];

/* ---------------- INSURANCE DATA ---------------- */
const featuredInsurance = [
  "Star Health Insurance",
  "HDFC ERGO Health",
  "Bajaj Allianz",
  "ICICI Lombard",
  "Care Health Insurance",
  "Tata AIG General",
  "Max Bupa Health",
  "SBI General Insurance",
];

const moreInsurance = [
  "Acko General Insurance", "Aditya Birla Health Insurance",
  "Bharti AXA General Insurance", "Cholamandalam MS General Insurance",
  "Edelweiss General Insurance", "Future Generali India Insurance",
  "Go Digit General Insurance", "IFFCO TOKIO General Insurance",
  "Kotak Mahindra General Insurance", "Liberty General Insurance",
  "Magma HDI General Insurance", "Manipal Cigna Health Insurance",
  "Navi General Insurance", "National Insurance Company",
  "Reliance General Insurance", "Royal Sundaram General Insurance",
  "The New India Assurance Company", "The Oriental Insurance Company",
  "United India Insurance Company", "Universal Sompo General Insurance",
];

/* ---------------- TESTIMONIALS DATA ---------------- */
const testimonials = [
  {
    name: "Rajesh Kumar",
    city: "Delhi",
    treatment: "LASIK Eye Surgery",
    rating: 5,
    text: "I had been wearing glasses for 15 years. The team at HealviaCare made the entire process so smooth — from the free consultation to the surgery and follow-up. Zero stress, zero cost EMI, and now zero glasses!",
    initials: "RK",
    color: "bg-[#E6F7F5]",
    textColor: "text-[#1D646B]",
  },
  {
    name: "Priya Sharma",
    city: "Mumbai",
    treatment: "Piles Laser Surgery",
    rating: 5,
    text: "I was hesitant and scared about surgery, but the care manager explained everything clearly. Insurance was handled within 30 minutes. I recovered in just 2 days. Truly grateful for the post-op support.",
    initials: "PS",
    color: "bg-[#F5F3FF]",
    textColor: "text-[#7C3AED]",
  },
  {
    name: "Suresh Verma",
    city: "Pune",
    treatment: "Kidney Stone (Urology)",
    rating: 5,
    text: "From booking the consultation to getting discharged, everything was handled professionally. The hospital was NABH accredited and the doctors were excellent. Highly recommend HealviaCare.",
    initials: "SV",
    color: "bg-[#FFF4E6]",
    textColor: "text-[#C2570A]",
  },
];

/* ---------------- HERO SVG VISUAL ---------------- */
function HeroSVG() {
  return (
    <svg
      viewBox="0 0 380 440"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full max-w-[420px] h-auto"
      style={{ filter: "drop-shadow(0 0 40px rgba(94,231,208,0.12))" }}
    >
      <defs>
        <style>{`
          @keyframes hvc-spin    { from { transform: rotate(0deg);   } to { transform: rotate(360deg);  } }
          @keyframes hvc-spinR   { from { transform: rotate(0deg);   } to { transform: rotate(-360deg); } }
          @keyframes hvc-floatY  { 0%,100% { transform: translateY(0);    } 50% { transform: translateY(-10px); } }
          @keyframes hvc-floatY2 { 0%,100% { transform: translateY(0);    } 50% { transform: translateY(-7px);  } }
          @keyframes hvc-dash    { to { stroke-dashoffset: -20; } }
          @keyframes hvc-glow    { 0%,100% { opacity: 0.3; } 50% { opacity: 0.7; } }

          .hvc-ring-cw    { animation: hvc-spin  22s linear infinite; transform-origin: 190px 215px; }
          .hvc-ring-ccw   { animation: hvc-spinR 16s linear infinite; transform-origin: 190px 215px; }
          .hvc-float-a    { animation: hvc-floatY  5s   ease-in-out infinite; }
          .hvc-float-b    { animation: hvc-floatY2 4.5s ease-in-out infinite reverse; }
          .hvc-float-c    { animation: hvc-floatY  6s   ease-in-out infinite;         animation-delay: 1s;   }
          .hvc-float-d    { animation: hvc-floatY2 5.5s ease-in-out infinite;         animation-delay: 0.5s; }
          .hvc-float-ctr  { animation: hvc-floatY  4s   ease-in-out infinite; }
          .hvc-dash       { stroke-dasharray: 6 5; animation: hvc-dash 2.5s linear infinite; }
          .hvc-glow-pulse { animation: hvc-glow   3s   ease-in-out infinite; }
        `}</style>
      </defs>

      <circle cx="190" cy="215" r="158" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
      <circle cx="190" cy="215" r="158" fill="none" stroke="rgba(94,231,208,0.18)" strokeWidth="1" strokeDasharray="10 7" className="hvc-ring-cw" />
      <circle cx="190" cy="215" r="125" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="1" strokeDasharray="5 9" className="hvc-ring-ccw" />

      <circle cx="190" cy="215" r="88" fill="rgba(255,255,255,0.05)" stroke="rgba(94,231,208,0.2)" strokeWidth="1.5" className="hvc-glow-pulse" />
      <circle cx="190" cy="215" r="68" fill="rgba(255,255,255,0.06)" />

      <g className="hvc-float-ctr">
        <rect x="174" y="193" width="32" height="44" rx="6" fill="rgba(94,231,208,0.18)" stroke="rgba(94,231,208,0.5)" strokeWidth="1.5" />
        <rect x="166" y="201" width="48" height="28" rx="6" fill="rgba(94,231,208,0.18)" stroke="rgba(94,231,208,0.5)" strokeWidth="1.5" />
        <path d="M190 222 C190 222 181 214 181 208 C181 204 185 202 190 206 C195 202 199 204 199 208 C199 214 190 222 190 222Z" fill="#5ee7d0" opacity="0.9" />
      </g>

      <circle cx="190" cy="57"  r="6" fill="#5ee7d0" opacity="0.8" className="hvc-ring-cw" />
      <circle cx="348" cy="215" r="5" fill="rgba(255,255,255,0.45)" className="hvc-ring-ccw" />
      <circle cx="190" cy="373" r="6" fill="#5ee7d0" opacity="0.5" className="hvc-ring-cw"  style={{ animationDelay: "-11s" }} />
      <circle cx="32"  cy="215" r="5" fill="rgba(255,255,255,0.45)" className="hvc-ring-ccw" style={{ animationDelay: "-8s"  }} />

      <line x1="152" y1="108" x2="168" y2="178" stroke="rgba(94,231,208,0.3)" strokeWidth="1" className="hvc-dash" />
      <line x1="228" y1="130" x2="218" y2="182" stroke="rgba(94,231,208,0.3)" strokeWidth="1" className="hvc-dash" />
      <line x1="152" y1="330" x2="165" y2="258" stroke="rgba(94,231,208,0.3)" strokeWidth="1" className="hvc-dash" />
      <line x1="228" y1="330" x2="215" y2="258" stroke="rgba(94,231,208,0.3)" strokeWidth="1" className="hvc-dash" />

      <g className="hvc-float-a">
        <rect x="12" y="72" width="138" height="56" rx="14" fill="rgba(255,255,255,0.93)" stroke="rgba(255,255,255,0.4)" strokeWidth="0.5" />
        <circle cx="37" cy="100" r="15" fill="#E6F7F5" />
        <text x="37" y="106" textAnchor="middle" fontSize="16" fill="#1D646B">🕐</text>
        <text x="58" y="92"  fontSize="10.5" fontWeight="700" fill="#1D646B">Instant Callback</text>
        <text x="58" y="105" fontSize="9"    fill="#888">Response in 5 min</text>
        <circle cx="130" cy="92" r="5" fill="#22c55e" />
        <text x="130" y="110" textAnchor="middle" fontSize="7.5" fill="#22c55e" fontWeight="700">LIVE</text>
      </g>

      <g className="hvc-float-b">
        <rect x="228" y="92" width="140" height="56" rx="14" fill="rgba(255,255,255,0.93)" stroke="rgba(255,255,255,0.4)" strokeWidth="0.5" />
        <circle cx="253" cy="120" r="15" fill="#EAF2FF" />
        <text x="253" y="126" textAnchor="middle" fontSize="16" fill="#1D646B">🏥</text>
        <text x="274" y="112" fontSize="10.5" fontWeight="700" fill="#1D646B">NABH Certified</text>
        <text x="274" y="124" fontSize="9"    fill="#888">Premium Hospitals</text>
        <rect x="274" y="129" width="44" height="9" rx="4" fill="#dcfce7" />
        <text x="296" y="136" textAnchor="middle" fontSize="7" fontWeight="700" fill="#16a34a">ACCREDITED</text>
      </g>

      <g className="hvc-float-c">
        <rect x="10" y="308" width="138" height="56" rx="14" fill="rgba(255,255,255,0.93)" stroke="rgba(255,255,255,0.4)" strokeWidth="0.5" />
        <circle cx="35" cy="336" r="15" fill="#FFF4E6" />
        <text x="35" y="342" textAnchor="middle" fontSize="16" fill="#1D646B">💰</text>
        <text x="56" y="328" fontSize="10.5" fontWeight="700" fill="#1D646B">Zero-Cost EMI</text>
        <text x="56" y="340" fontSize="9"    fill="#888">Flexible payments</text>
        <rect x="56" y="345" width="50" height="9" rx="4" fill="#fef9c3" />
        <text x="81" y="352" textAnchor="middle" fontSize="7" fontWeight="700" fill="#a16207">0% INTEREST</text>
      </g>

      <g className="hvc-float-d">
        <rect x="230" y="308" width="138" height="56" rx="14" fill="rgba(255,255,255,0.93)" stroke="rgba(255,255,255,0.4)" strokeWidth="0.5" />
        <circle cx="255" cy="336" r="15" fill="#FFF0F6" />
        <text x="255" y="342" textAnchor="middle" fontSize="16" fill="#1D646B">👨‍⚕️</text>
        <text x="276" y="328" fontSize="10.5" fontWeight="700" fill="#1D646B">500+ Doctors</text>
        <text x="276" y="340" fontSize="9"    fill="#888">Verified Specialists</text>
        <circle cx="278" cy="352" r="6" fill="#5ee7d0" />
        <circle cx="287" cy="352" r="6" fill="#a78bfa" />
        <circle cx="296" cy="352" r="6" fill="#fb923c" />
        <text x="306" y="356" fontSize="9" fill="#888">+497</text>
      </g>
    </svg>
  );
}

/* ---------------- STAR RATING ---------------- */
function Stars({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <svg key={i} className="w-4 h-4 text-amber-400 fill-amber-400" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

/* ---------------- MAIN PAGE ---------------- */
export default function Home() {
  const [showAllServices, setShowAllServices] = useState(false);
  const [showAllInsurance, setShowAllInsurance] = useState(false);

  const featuredServices = services.filter((s) => s.featured);
  const moreServices = services.filter((s) => !s.featured);

  return (
    <>
      <style jsx global>{`
        @keyframes scroll {
          0%   { transform: translateX(0); }
          100% { transform: translateX(calc(-250px * 6)); }
        }
        .animate-scroll { animation: scroll 30s linear infinite; }
        .value-card {
          flex-shrink: 0;
          width: 250px;
          background: white;
          border-radius: 1.5rem;
          padding: 2rem;
          border: 1px solid #f1f5f9;
          box-shadow: 0 1px 3px rgba(0,0,0,0.06);
          text-align: center;
          transition: all 0.3s;
        }
        .value-card h3 { font-weight: 700; color: #1D646B; margin-bottom: 0.5rem; }
        .value-card p  { color: #94a3b8; font-size: 0.875rem; }
        .value-card .icon { font-size: 1.875rem; margin-bottom: 1rem; }
        .value-card.green { background: #F0FFF4; }
        .value-card.light { background: #F5F3FF; }
      `}</style>

      <Header />

      {/* ================ HERO SECTION ================ */}
      <section className="relative w-full overflow-hidden pt-[72px] md:pt-[88px]">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0d4a50] via-[#1D646B] to-[#1a8a7a]" />
        <div className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full bg-white/5 blur-3xl translate-x-1/3 -translate-y-1/3" />
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] rounded-full bg-white/5 blur-3xl -translate-x-1/3 translate-y-1/3" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 flex flex-col lg:flex-row items-center min-h-[580px] py-14 lg:py-0 gap-12">
          <div className="w-full lg:w-1/2 flex flex-col items-start gap-6">
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2">
              <span className="w-2 h-2 rounded-full bg-teal-300 animate-pulse" />
              <span className="text-white/90 text-xs font-semibold tracking-wide">Trusted Healthcare Network</span>
            </div>

            <h1 className="text-4xl md:text-5xl xl:text-6xl font-black text-white leading-tight">
              Advanced Care,<br />
              <span className="text-teal-300">Expert Doctors.</span>
            </h1>

            <p className="text-white/70 text-base md:text-lg max-w-md leading-relaxed">
              Get connected with experienced doctors for advanced surgical treatments
              with seamless support and zero-cost EMI options.
            </p>

            <div className="flex flex-wrap gap-3">
              {[
                { num: "50+",  label: "Doctors"  },
                { num: "20+",  label: "Diseases" },
                { num: "10+",  label: "Cities"   },
              ].map((s) => (
                <div key={s.label} className="flex flex-col items-center justify-center bg-white/10 backdrop-blur-sm border border-white/15 rounded-2xl px-6 py-3 min-w-[90px]">
                  <span className="text-white font-black text-xl">{s.num}</span>
                  <span className="text-white/60 text-xs mt-0.5">{s.label}</span>
                </div>
              ))}
            </div>

            <Link
              href="/book-now"
              className="flex items-center gap-3 mt-2 px-8 py-4 rounded-2xl bg-white text-[#1D646B] font-bold text-base shadow-2xl hover:scale-105 active:scale-95 transition-all duration-200"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              Book Free Consultation →
            </Link>
          </div>

          <div className="w-full lg:w-1/2 flex items-center justify-center lg:justify-end">
            <HeroSVG />
          </div>
        </div>
      </section>

      {/* ================ TRUST BAR (NEW) ================ */}
      <section className="bg-white border-b border-slate-100 py-4 px-6">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
          <div className="flex items-center gap-2">
            <span className="text-lg">🏥</span>
            <span className="text-sm font-semibold text-slate-700">NABH Accredited Hospitals</span>
          </div>
          <div className="hidden sm:block w-px h-5 bg-slate-200" />
          <div className="flex items-center gap-2">
            <span className="text-lg">✅</span>
            <span className="text-sm font-semibold text-slate-700">500+ Successful Surgeries</span>
          </div>
          <div className="hidden sm:block w-px h-5 bg-slate-200" />
          <div className="flex items-center gap-2">
            <span className="text-lg">💳</span>
            <span className="text-sm font-semibold text-slate-700">Zero Cost EMI Available</span>
          </div>
          <div className="hidden sm:block w-px h-5 bg-slate-200" />
          <div className="flex items-center gap-2">
            <div className="flex gap-0.5">
              {[1,2,3,4,5].map(i => (
                <svg key={i} className="w-3.5 h-3.5 fill-amber-400" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <span className="text-sm font-semibold text-slate-700">4.8/5 Patient Rating</span>
          </div>
         
        </div>
      </section>

      {/* ================ TOP SPECIALITIES (FEATURED 4) ================ */}
      <section className="py-12 md:py-20 bg-gradient-to-b from-white to-slate-50">
        <div className="max-w-7xl mx-auto px-6 text-center mb-10 md:mb-14">
          <h2 className="text-3xl md:text-4xl font-bold text-[#1D646B]">Our Specialities</h2>
          <p className="text-slate-500 mt-3 text-sm md:text-base">Advanced surgical solutions for all your medical needs</p>
        </div>

        {/* Featured 4 — larger cards */}
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredServices.map((s, i) => {
            const Icon = s.icon;
            return (
              <Link key={i} href={s.href}>
                <div className="group p-6 rounded-3xl bg-white shadow-sm border border-slate-100 hover:shadow-xl hover:-translate-y-2 transition-all duration-300 cursor-pointer flex flex-col h-full">
                  <div className={`w-14 h-14 md:w-16 md:h-16 flex items-center justify-center rounded-2xl mb-5 ${s.color} group-hover:scale-110 transition`}>
                    <Icon size={28} className="text-[#1D646B]" />
                  </div>
                  <h3 className="text-lg font-bold text-[#1D646B] mb-2">{s.title}</h3>
                  <p className="text-slate-500 text-sm mb-6 flex-grow">{s.desc}</p>
                  <div className="text-xs font-bold text-[#1D646B] uppercase">Consult Now →</div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* View All toggle */}
        {showAllServices && (
          <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
            {moreServices.map((s, i) => {
              const Icon = s.icon;
              return (
                <Link key={i} href={s.href}>
                  <div className="group p-6 rounded-3xl bg-white shadow-sm border border-slate-100 hover:shadow-xl hover:-translate-y-2 transition-all duration-300 cursor-pointer flex flex-col h-full">
                    <div className={`w-14 h-14 md:w-16 md:h-16 flex items-center justify-center rounded-2xl mb-5 ${s.color} group-hover:scale-110 transition`}>
                      <Icon size={28} className="text-[#1D646B]" />
                    </div>
                    <h3 className="text-lg font-bold text-[#1D646B] mb-2">{s.title}</h3>
                    <p className="text-slate-500 text-sm mb-6 flex-grow">{s.desc}</p>
                    <div className="text-xs font-bold text-[#1D646B] uppercase">Consult Now →</div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}

        <div className="text-center mt-8">
          <button
            onClick={() => setShowAllServices(!showAllServices)}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border-2 border-[#1D646B] text-[#1D646B] font-semibold text-sm hover:bg-[#1D646B] hover:text-white transition-all duration-200"
          >
            {showAllServices ? "Show Less" : `View All Specialities (${moreServices.length} more)`}
            <ChevronDown size={16} className={`transition-transform duration-200 ${showAllServices ? "rotate-180" : ""}`} />
          </button>
        </div>
      </section>

      {/* ================ HOW IT WORKS (NEW) ================ */}
      <section className="py-14 md:py-20 bg-gradient-to-b from-slate-50 to-[#eef6f6] px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10 md:mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-[#1D646B]">How It Works</h2>
            <p className="text-slate-500 mt-3 text-sm md:text-base">Your complete care journey in 4 simple steps</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
            {/* Connector line — desktop only */}
            <div className="hidden lg:block absolute top-10 left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-[#1D646B]/20 via-[#1D646B]/40 to-[#1D646B]/20 z-0" />

            {[
              { step: "01", emoji: "📋", title: "Book Free Consultation", desc: "Fill a quick form or call us. No fees, no obligation." },
              { step: "02", emoji: "🩺", title: "Get Treatment Plan", desc: "Our doctor reviews your case and shares a clear plan." },
              { step: "03", emoji: "🏥", title: "Cashless Surgery", desc: "We handle insurance approvals. You focus on recovery." },
              { step: "04", emoji: "💚", title: "Post-Op Support", desc: "Your care manager follows up until you're fully well." },
            ].map((item, i) => (
              <div key={i} className="relative z-10 flex flex-col items-center text-center bg-white rounded-3xl p-6 shadow-sm border border-slate-100 hover:shadow-md hover:-translate-y-1 transition-all duration-300">
                <div className="w-12 h-12 rounded-2xl bg-[#1D646B]/10 flex items-center justify-center mb-4 text-2xl">
                  {item.emoji}
                </div>
                <span className="text-xs font-black text-[#1D646B]/40 tracking-widest mb-1">STEP {item.step}</span>
                <h3 className="text-base font-bold text-[#1D646B] mb-2">{item.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================ WHY CHOOSE US (repositioned + updated copy) ================ */}
      <section id="why-choose-us" className="py-16 md:py-24 px-6 lg:px-20 bg-gradient-to-b from-[#eef6f6] to-[#f8fbfb] scroll-mt-20">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-[#1D646B]">Why Choose HealviaCare?</h2>
          <p className="text-slate-500 mt-3 text-sm md:text-base">Real reasons patients trust us with their health</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 max-w-7xl mx-auto">
          {[
            { title: "50+ Verified Specialists",    desc: "Experienced doctors across 8 surgical specialities — all background verified.", icon: <UserGroupIcon      className="w-8 h-8 text-[#1D646B]" /> },
            { title: "Response in 5 Minutes",       desc: "Our care team calls you back within 5 minutes of your request.",              icon: <ClockIcon           className="w-8 h-8 text-[#1D646B]" /> },
            { title: "NABH-Accredited Hospitals",   desc: "We only partner with certified hospitals across 10+ cities in India.",        icon: <BuildingOffice2Icon className="w-8 h-8 text-[#1D646B]" /> },
            { title: "0% EMI, No Hidden Fees",      desc: "Transparent pricing. Insurance handled. Zero surprise costs at billing.",     icon: <CurrencyRupeeIcon   className="w-8 h-8 text-[#1D646B]" /> },
          ].map((item, i) => (
            <div key={i} className="group relative rounded-3xl p-[2px] bg-gradient-to-br from-[#1D646B]/20 via-[#2D8E98]/20 to-[#7BC6A1]/20 hover:from-[#1D646B] hover:to-[#2D8E98] transition-all duration-500">
              <div className="bg-white rounded-3xl p-6 md:p-8 text-center h-full shadow-md group-hover:shadow-[0_20px_50px_rgba(29,100,107,0.25)] transition-all duration-500 group-hover:-translate-y-2">
                <div className="w-14 h-14 md:w-16 md:h-16 mx-auto mb-6 flex items-center justify-center rounded-2xl bg-[#1D646B]/10 group-hover:bg-[#1D646B]/20 transition">
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold text-[#1D646B] mb-2 group-hover:text-[#2D8E98] transition">{item.title}</h3>
                <p className="text-slate-500 text-sm">{item.desc}</p>
              </div>
              <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition duration-500 blur-xl bg-[#2D8E98]/30 -z-10" />
            </div>
          ))}
        </div>
      </section>

      {/* ================ PATIENT TESTIMONIALS (NEW) ================ */}
      <section className="py-14 md:py-20 bg-white px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10 md:mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-[#1D646B]">Patient Success Stories</h2>
            <p className="text-slate-500 mt-3 text-sm md:text-base">Real patients, real recoveries</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <div key={i} className="bg-slate-50 rounded-3xl p-7 border border-slate-100 hover:shadow-md hover:-translate-y-1 transition-all duration-300 flex flex-col gap-4">
                {/* Top row */}
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-2xl ${t.color} flex items-center justify-center`}>
                    <span className={`text-base font-black ${t.textColor}`}>{t.initials}</span>
                  </div>
                  <div>
                    <p className="font-bold text-slate-800 text-sm">{t.name}</p>
                    <p className="text-slate-400 text-xs">{t.city} · {t.treatment}</p>
                  </div>
                </div>
                <Stars count={t.rating} />
                <p className="text-slate-600 text-sm leading-relaxed">{t.text}</p>
                <div className="mt-auto pt-2 border-t border-slate-100">
                  <span className="text-xs font-semibold text-[#1D646B] bg-[#E6F7F5] px-3 py-1 rounded-full">✓ Verified Patient</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================ INSURANCE PARTNERS (simplified) ================ */}
      <section className="py-16 md:py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-10 md:mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-[#1D646B] mb-3">Our Insurance Partners</h2>
            <p className="text-slate-500 max-w-xl mx-auto text-sm md:text-base">
              We work with major insurance providers so your surgery is cashless and hassle-free.
            </p>
            <div className="mt-4 inline-flex items-center gap-2 bg-[#E6F7F5] px-4 py-2 rounded-full">
              <span className="text-[#1D646B] text-sm font-semibold">✓ Most cashless claims processed within 30 minutes</span>
            </div>
          </div>

          {/* Featured 8 */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5">
            {featuredInsurance.map((partner, index) => (
              <div key={index} className="group flex items-center justify-center p-5 bg-white border border-slate-100 rounded-2xl shadow-sm hover:border-[#1D646B]/30 hover:-translate-y-1 transition-all duration-300 h-20">
                <p className="text-center text-xs md:text-sm font-semibold text-slate-700 group-hover:text-[#1D646B] transition-colors duration-300">{partner}</p>
              </div>
            ))}
          </div>

          {/* Expandable remaining */}
          {showAllInsurance && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5 mt-4">
              {moreInsurance.map((partner, index) => (
                <div key={index} className="group flex items-center justify-center p-5 bg-white border border-slate-100 rounded-2xl shadow-sm hover:border-[#1D646B]/30 hover:-translate-y-1 transition-all duration-300 h-20">
                  <p className="text-center text-xs md:text-sm font-semibold text-slate-700 group-hover:text-[#1D646B] transition-colors duration-300">{partner}</p>
                </div>
              ))}
            </div>
          )}

          <div className="text-center mt-8 space-y-3">
            <button
              onClick={() => setShowAllInsurance(!showAllInsurance)}
              className="inline-flex items-center gap-2 text-sm font-semibold text-[#1D646B] underline underline-offset-4 hover:text-[#145A5C] transition"
            >
              {showAllInsurance ? "Show less" : `& ${moreInsurance.length} more insurance partners`}
              <ChevronDown size={14} className={`transition-transform duration-200 ${showAllInsurance ? "rotate-180" : ""}`} />
            </button>
            <p className="text-slate-400 text-xs italic">*All names are trademarks of their respective owners.</p>
          </div>
        </div>
      </section>

      {/* ================ FAQ SECTION ================ */}
      <div className="relative bg-white">
        <section className="py-24 px-6 lg:px-20 bg-white overflow-hidden">
          <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-16">
            <div className="lg:col-span-4 lg:sticky lg:top-32 h-fit">
              <div className="bg-[#1D646B] rounded-[40px] p-10 text-white relative overflow-hidden shadow-2xl">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-3xl" />
                <h2 className="text-4xl font-black mb-6 leading-tight">
                  Common <br /><span className="text-teal-300">Doubts?</span>
                </h2>
                <p className="text-teal-50/80 mb-8 leading-relaxed">
                  We understand that surgery is a big decision. Here are the facts to help you choose with confidence.
                </p>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-teal-400/20 flex items-center justify-center text-teal-300">✓</div>
                    <span className="text-sm font-bold">Verified Surgeons</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-teal-400/20 flex items-center justify-center text-teal-300">✓</div>
                    <span className="text-sm font-bold">0% EMI Options</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-8 space-y-4">
              {[
                { q: "Is the first consultation really free?",        a: "Yes! At HealviaCare, your initial consultation with our medical experts is 100% free. We aim to help you understand your condition without any financial pressure." },
                { q: "Will you handle my insurance paperwork?",       a: "Completely. Our dedicated Care Managers coordinate directly with your insurance provider (TPA) for cashless approvals, usually in under 30 minutes." },
                { q: "What is the typical waiting time for surgery?", a: "We prioritize efficiency. Once diagnosed, surgeries are typically scheduled within 24 to 48 hours at a premium hospital near you." },
                { q: "Are the hospitals NABH accredited?",            a: "Yes, we only partner with top-tier premium hospitals that meet the highest safety, hygiene, and quality standards in India." },
                { q: "How does the Zero-Cost EMI work?",              a: "You can split your surgery cost into 6, 9, or 12 monthly installments. There is 0% interest and no hidden processing fees." },
                { q: "Do I get support after the surgery?",           a: "Yes. From diet plans to follow-up checkups with the surgeon, your Care Manager stays with you until you are 100% recovered." },
              ].map((item, i) => (
                <details key={i} open={i < 3} className="group border-b border-slate-100 bg-slate-50/50 rounded-3xl transition-all duration-500 open:bg-white open:shadow-[0_20px_40px_rgba(29,100,107,0.08)] open:border-teal-100">
                  <summary className="flex items-center justify-between p-8 cursor-pointer list-none">
                    <div className="flex items-center gap-6">
                      <span className="text-slate-300 font-black text-2xl group-open:text-teal-500 transition-colors">0{i + 1}</span>
                      <span className="text-lg md:text-xl font-bold text-slate-700 group-open:text-[#1D646B] transition-colors">{item.q}</span>
                    </div>
                    <div className="w-10 h-10 rounded-xl bg-white shadow-sm border border-slate-100 flex items-center justify-center group-open:bg-[#1D646B] group-open:text-white transition-all duration-500">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="transition-transform duration-500 group-open:rotate-45">
                        <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
                      </svg>
                    </div>
                  </summary>
                  <div className="px-8 pb-8 ml-14 text-slate-500 text-base leading-relaxed animate-in fade-in slide-in-from-top-4">
                    <p className="max-w-2xl">{item.a}</p>
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>
      </div>

      {/* ================ CTA SECTION ================ */}
      <section id="talk-to-specialist" className="relative py-20 md:py-28 px-6 lg:px-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0F3D3E] via-[#145A5C] to-[#1D646B]" />
        <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-[#0F3D3E]/80 to-transparent" />
        <div className="relative z-10 max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-2 mb-6">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
            <span className="text-white/90 text-xs font-semibold">Limited consultation slots available this week</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Talk to a Specialist Today</h2>
          <p className="text-base md:text-lg text-white/80 mb-10">Get expert guidance for the right treatment from trusted doctors.</p>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 md:gap-6 mb-10">
            <Link
              href="/book-now"
              className="w-full sm:w-auto px-10 py-4 rounded-xl bg-gradient-to-r from-[#1D646B] to-[#3BA99C] text-white font-semibold shadow-xl hover:scale-105 transition text-center"
            >
              Book Free Consultation
            </Link>
            <a href="tel:8882804301" className="w-full sm:w-auto">
              <button className="w-full px-10 py-4 rounded-xl bg-black/40 backdrop-blur-md text-white font-semibold shadow-xl hover:scale-105 transition">
                📞 Call Now: 8882804301
              </button>
            </a>
          </div>
          <p className="text-white/70 text-xs md:text-sm tracking-wide">
            Free consultation&nbsp;&nbsp;|&nbsp;&nbsp;Quick response&nbsp;&nbsp;|&nbsp;&nbsp;100% assistance
          </p>
        </div>
      </section>

      <Footer />
    </>
  );
}