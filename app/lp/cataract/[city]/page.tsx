"use client";

import { useParams } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { supabase } from "@/lib/supabase";
import {
  ArrowRight,
  CheckCircle2,
  Clock3,
  Eye,
  Phone,
  ShieldCheck,
  Star,
  ChevronDown,
  BadgeCheck,
  Heart,
  Award,
  Users,
  Mail,
  MapPin,
  Quote,
  Microscope,
  Layers,
  Sunrise,
  AlertCircle,
  TrendingUp,
  Sparkles,
  Activity,
  BarChart3,
  Zap,
  Hospital,
  HeartPulse,
  ClipboardList,
} from "lucide-react";

// ─── City Config ─────────────────────────────────────────────────────────────
type CityKey = "delhi" | "mumbai" | "lucknow" | "noida" | "hyderabad" | "bangalore";

type CityConfig = {
  name: string;
  shortName: string;
  badge: string;
  headline: string;
  subheadline: string;
  overview: string;
  hospitalLine: string;
  tpaNote: string;
  nearbyAreas: string[];
};

const cityData: Record<CityKey, CityConfig> = {
  delhi: {
    name: "Delhi NCR",
    shortName: "Delhi",
    badge: "Delhi NCR",
    headline: "World-class cataract surgery in Delhi NCR",
    subheadline:
      "Stitch-free, painless cataract removal with premium IOL options — at NABH-accredited hospitals across Delhi, Gurgaon, and Noida.",
    overview:
      "Delhi NCR is home to some of India's best ophthalmic centres. HealviaCare connects you with senior cataract surgeons in your area, handles all paperwork, and ensures end-to-end support from first call to final follow-up.",
    hospitalLine: "Partner hospitals across Delhi, Gurgaon, Faridabad & Noida",
    tpaNote: "Cashless insurance supported",
    nearbyAreas: ["Dwarka", "Rohini", "Saket", "Gurgaon", "Noida", "Faridabad"],
  },
  mumbai: {
    name: "Mumbai",
    shortName: "Mumbai",
    badge: "Mumbai",
    headline: "Premium cataract care in Mumbai",
    subheadline:
      "Same-day discharge cataract surgery with top-tier IOL technology — across South Mumbai, Thane, and Navi Mumbai.",
    overview:
      "Mumbai's fast-paced lifestyle demands fast, reliable care. Our partner hospitals offer cutting-edge phacoemulsification, premium lens options, and post-op teleconsults so you never miss a follow-up.",
    hospitalLine: "Partner hospitals across South Mumbai, Thane & Navi Mumbai",
    tpaNote: "Cashless & TPA claims supported",
    nearbyAreas: ["Andheri", "Bandra", "Thane", "Navi Mumbai", "Dadar", "Borivali"],
  },
  lucknow: {
    name: "Lucknow",
    shortName: "Lucknow",
    badge: "Lucknow",
    headline: "Trusted cataract surgery in Lucknow",
    subheadline:
      "Affordable, modern cataract care for Lucknow families — from phaco surgery to premium multifocal IOLs.",
    overview:
      "HealviaCare's Lucknow network brings NABH-accredited cataract surgery to your city, with special support for elderly patients, insurance filing, and transport assistance.",
    hospitalLine: "Partner hospitals across Lucknow & Kanpur",
    tpaNote: "Insurance assistance provided",
    nearbyAreas: ["Hazratganj", "Gomti Nagar", "Alambagh", "Indira Nagar", "Aliganj", "Kanpur"],
  },
  noida: {
    name: "Noida",
    shortName: "Noida",
    badge: "Noida / Greater Noida",
    headline: "Advanced cataract surgery in Noida",
    subheadline:
      "India's latest IOL technology, delivered at Noida's leading ophthalmic hospitals — with zero-wait scheduling.",
    overview:
      "Noida residents get access to the same quality of care as Delhi's top hospitals — closer to home. HealviaCare coordinates screening, surgery, and follow-up at partner centres in Noida Sector 18, 62, and Greater Noida.",
    hospitalLine: "Partner hospitals in Noida Sectors & Greater Noida",
    tpaNote: "Pre-auth & cashless insurance supported",
    nearbyAreas: ["Sector 18", "Sector 62", "Greater Noida", "Sector 44", "Indirapuram", "Vasundhara"],
  },
  hyderabad: {
    name: "Hyderabad",
    shortName: "Hyderabad",
    badge: "Hyderabad",
    headline: "Cataract surgery excellence in Hyderabad",
    subheadline:
      "Top-tier cataract care in the City of Pearls — with premium IOL options and dedicated coordinator support.",
    overview:
      "Hyderabad has a strong tradition of ophthalmic excellence. HealviaCare partners with city's best eye hospitals to bring you advanced phaco surgery, trifocal lenses, and complete post-operative care.",
    hospitalLine: "Partner hospitals across Hyderabad & Secunderabad",
    tpaNote: "TPA & cashless claims supported",
    nearbyAreas: ["Banjara Hills", "Jubilee Hills", "Secunderabad", "Ameerpet", "Kukatpally", "Miyapur"],
  },
  bangalore: {
    name: "Bangalore",
    shortName: "Bangalore",
    badge: "Bengaluru",
    headline: "Precision cataract care in Bangalore",
    subheadline:
      "Silicon Valley of India deserves world-class eye care — advanced IOL surgery with same-day discharge in Bengaluru.",
    overview:
      "Bangalore's tech-savvy patients expect the best. Our partner hospitals use Zeiss and Alcon phaco systems, offer tele-follow-ups, and provide detailed digital reports after every consultation.",
    hospitalLine: "Partner hospitals across Bengaluru North, South & East",
    tpaNote: "All major insurers supported",
    nearbyAreas: ["Koramangala", "Jayanagar", "Whitefield", "Malleswaram", "HSR Layout", "Indiranagar"],
  },
};

// ─── Animated counter ─────────────────────────────────────────────────────────
function useCounter(end: number, duration = 2000, started = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!started) return;
    let startTime: number;
    const step = (ts: number) => {
      if (!startTime) startTime = ts;
      const p = Math.min((ts - startTime) / duration, 1);
      setCount(Math.floor(p * end));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [end, duration, started]);
  return count;
}

function StatCounter({ value, suffix, label, prefix = "" }: {
  value: number; suffix: string; label: string; prefix?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [started, setStarted] = useState(false);
  const count = useCounter(value, 2200, started);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setStarted(true); }, { threshold: 0.5 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return (
    <div ref={ref} className="text-center">
      <div className="text-5xl font-black tracking-tight text-[#C9A84C] lg:text-6xl font-serif">
        {prefix}{count}{suffix}
      </div>
      <div className="mt-2 text-sm font-medium text-slate-400 uppercase tracking-widest">{label}</div>
    </div>
  );
}

// ─── FAQ ─────────────────────────────────────────────────────────────────────
function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className={`border-b transition-all duration-300 ${open ? "border-[#C9A84C]/40" : "border-slate-800"}`}>
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between gap-4 py-5 text-left"
      >
        <span className="font-semibold text-slate-100 text-sm leading-relaxed pr-4">{q}</span>
        <ChevronDown
          size={16}
          className={`shrink-0 text-[#C9A84C] transition-transform duration-300 ${open ? "rotate-180" : ""}`}
        />
      </button>
      <div className={`overflow-hidden transition-all duration-400 ${open ? "max-h-56 opacity-100 pb-5" : "max-h-0 opacity-0"}`}>
        <p className="text-sm leading-7 text-slate-400">{a}</p>
      </div>
    </div>
  );
}

// ─── Testimonial ─────────────────────────────────────────────────────────────
function TestimonialCard({ name, city, text, rating, procedure, age }: {
  name: string; city: string; text: string; rating: number; procedure: string; age: number;
}) {
  return (
    <div className="relative rounded-2xl bg-[#0E1A2B] border border-slate-800 p-7 hover:border-[#C9A84C]/40 transition-all duration-300 hover:-translate-y-1 group">
      <div className="absolute top-5 right-6">
        <div className="flex gap-0.5">
          {Array.from({ length: rating }).map((_, i) => (
            <Star key={i} size={12} className="fill-[#C9A84C] text-[#C9A84C]" />
          ))}
        </div>
      </div>
      <Quote size={28} className="text-[#C9A84C]/20 mb-4 group-hover:text-[#C9A84C]/40 transition-colors" />
      <p className="text-sm leading-7 text-slate-300 italic">{text}</p>
      <div className="mt-6 flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#C9A84C] to-[#8B6914] flex items-center justify-center text-[#0a0f1a] text-sm font-black">
          {name[0]}
        </div>
        <div>
          <p className="text-sm font-bold text-white">{name}, <span className="text-[#C9A84C] font-normal">{age} yrs</span></p>
          <p className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
            <MapPin size={9} className="text-[#C9A84C]" />{city} · {procedure}
          </p>
        </div>
      </div>
    </div>
  );
}

// ─── Symptom Card ─────────────────────────────────────────────────────────────
function SymptomCard({ icon, title, desc }: { icon: React.ReactNode; title: string; desc: string }) {
  return (
    <div className="flex gap-4 p-5 rounded-xl bg-[#0E1A2B] border border-slate-800 hover:border-[#C9A84C]/30 transition-all duration-200">
      <div className="w-10 h-10 rounded-lg bg-[#C9A84C]/10 border border-[#C9A84C]/20 flex items-center justify-center text-[#C9A84C] shrink-0">
        {icon}
      </div>
      <div>
        <h4 className="font-bold text-white text-sm">{title}</h4>
        <p className="text-xs text-slate-400 mt-1 leading-relaxed">{desc}</p>
      </div>
    </div>
  );
}

// ─── Lens Option Card ─────────────────────────────────────────────────────────
function LensCard({ name, subtitle, price, badge, features, isPopular, desc }: {
  name: string; subtitle: string; price: string; badge?: string;
  features: string[]; isPopular?: boolean; desc: string;
}) {
  return (
    <div className={`relative rounded-2xl p-7 border transition-all duration-300 hover:-translate-y-1 ${
      isPopular
        ? "bg-gradient-to-b from-[#C9A84C]/10 to-[#0E1A2B] border-[#C9A84C]/50 shadow-lg shadow-[#C9A84C]/10"
        : "bg-[#0E1A2B] border-slate-800"
    }`}>
      {isPopular && (
        <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 flex items-center gap-1.5 rounded-full bg-[#C9A84C] px-4 py-1 text-xs font-black uppercase tracking-widest text-[#0a0f1a]">
          <Star size={10} className="fill-[#0a0f1a]" />
          Most Recommended
        </div>
      )}
      {badge && (
        <div className="mb-4 inline-block rounded-full bg-[#C9A84C]/10 border border-[#C9A84C]/30 px-3 py-1 text-xs font-bold text-[#C9A84C] uppercase tracking-wider">
          {badge}
        </div>
      )}
      <h3 className="text-xl font-black text-white">{name}</h3>
      <p className="text-xs text-slate-500 mt-1 uppercase tracking-wider">{subtitle}</p>
      <p className="mt-3 text-sm text-slate-400 leading-relaxed">{desc}</p>
      <div className="mt-5 flex items-baseline gap-1">
        <span className="text-3xl font-black text-[#C9A84C]">{price}</span>
        <span className="text-sm text-slate-500">/eye onwards</span>
      </div>
      <ul className="mt-5 space-y-2.5">
        {features.map((f) => (
          <li key={f} className="flex items-center gap-2.5 text-sm text-slate-300">
            <CheckCircle2 size={14} className="text-[#C9A84C] shrink-0" />
            {f}
          </li>
        ))}
      </ul>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function CataractCityLandingPage() {
  const params = useParams();

  // Resolve city from URL param — supports /cataract-surgery-delhi, /cataract-delhi, /delhi, etc.
  const rawParam = String(params?.city || "delhi")
    .toLowerCase()
    .replace(/cataract[-_]surgery[-_]/g, "")
    .replace(/cataract[-_]/g, "")
    .replace(/[-_]cataract.*/g, "")
    .trim();

  const CITY_ALIASES: Record<string, CityKey> = {
    delhi: "delhi",
    "delhi-ncr": "delhi",
    ncr: "delhi",
    gurgaon: "delhi",
    faridabad: "delhi",
    mumbai: "mumbai",
    bombay: "mumbai",
    lucknow: "lucknow",
    noida: "noida",
    "greater-noida": "noida",
    hyderabad: "hyderabad",
    bangalore: "bangalore",
    bengaluru: "bangalore",
  };

  const cityKey: CityKey = CITY_ALIASES[rawParam] ?? "delhi";
  const city = cityData[cityKey];

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [age, setAge] = useState("");
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [phoneError, setPhoneError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone || !/^[6-9]\d{9}$/.test(phone)) {
      setPhoneError("Please enter a valid 10-digit Indian mobile number.");
      return;
    }
    setPhoneError("");
    setLoading(true);
    try {
      const { error } = await supabase.from("leads").insert([{
        name,
        phone,
        city: city.name,
        age_range: age || "not specified",
        service: `Cataract Surgery ${city.shortName}`,
        source: `landing-page-cataract-${cityKey}`,
      }]);
      if (error) throw error;
      setSubmitted(true);
    } catch {
      alert("Something went wrong. Please call us at 8882804301.");
    } finally {
      setLoading(false);
    }
  };

  const faqs = [
    { q: "Is cataract surgery painful?", a: "No. The surgery is performed under local anaesthesia (eye drops). You'll feel no pain — only mild pressure for a few seconds. The entire procedure takes 15–20 minutes and most patients are surprised at how easy it is." },
    { q: "How long does vision recovery take?", a: "Most patients notice dramatic improvement within 24 hours. Vision stabilises over 4–6 weeks as the eye heals. You can resume most daily activities — reading, screen work, cooking — within a day or two." },
    { q: `Which hospitals does HealviaCare partner with in ${city.name}?`, a: `We work with NABH-accredited eye care centres across ${city.name}. ${city.hospitalLine}. Your coordinator will recommend the most convenient and suitable centre for you.` },
    { q: "What is the difference between monofocal and multifocal lenses?", a: "Monofocal lenses correct vision at one distance (usually distance). Reading glasses may still be needed. Multifocal / trifocal lenses correct near, intermediate, and distance vision, reducing dependence on glasses significantly." },
    { q: "Is cataract surgery covered by insurance?", a: `Yes — most health insurance policies cover cataract surgery for standard monofocal lenses. ${city.tpaNote}. Premium lenses (multifocal, toric) may have partial or no coverage. We assist with pre-authorisation paperwork at no cost.` },
    { q: "Can both eyes be operated in the same sitting?", a: "Typically, surgeons prefer to operate one eye at a time (1–2 weeks apart) for safety. If both eyes have cataracts, the better-seeing eye is usually treated last." },
    { q: "What is phacoemulsification?", a: "Phaco (ultrasound cataract removal) is the modern, stitch-free technique. A tiny probe liquefies the cloudy lens with ultrasound and removes it, after which the intraocular lens (IOL) is implanted — all through a 2mm incision." },
    { q: "Will I need glasses after surgery?", a: "With standard monofocal lenses, reading glasses are usually still needed. Premium multifocal or EDOF lenses significantly reduce or eliminate the need for glasses. Your doctor will recommend the best lens for your lifestyle." },
  ];

  const symptoms = [
    { icon: <Eye size={16} />, title: "Blurred or cloudy vision", desc: "Objects appear hazy or out of focus even with corrected glasses." },
    { icon: <Sparkles size={16} />, title: "Glare and halos", desc: "Lights at night create starbursts or rings, especially while driving." },
    { icon: <Activity size={16} />, title: "Fading colours", desc: "Colours look dull, yellowish, or washed out compared to before." },
    { icon: <AlertCircle size={16} />, title: "Frequent prescription changes", desc: "Your glasses power keeps changing but vision doesn't improve." },
    { icon: <Layers size={16} />, title: "Double vision", desc: "Seeing ghost images or two images in one eye at once." },
    { icon: <BarChart3 size={16} />, title: "Poor night vision", desc: "Vision deteriorates significantly in dim light or at dusk." },
  ];

  const testimonials = [
    { name: "Suresh Gupta", city: city.shortName, text: "I had been putting off surgery for two years, scared of the procedure. The team at HealviaCare walked me through every step. I went home the same evening and could read the newspaper the next morning — first time in years.", rating: 5, procedure: "Multifocal IOL", age: 67 },
    { name: "Meena Agarwal", city: city.shortName, text: "My mother was 74 and had been struggling with glare and blurring for months. After surgery she said she could see colours she had forgotten existed. The coordinators arranged everything — absolute five-star care.", rating: 5, procedure: "Phaco + Monofocal", age: 74 },
    { name: "Ramesh Verma", city: city.shortName, text: "I opted for the trifocal lens. Now I drive at night, read without glasses, and use my phone comfortably. Worth every rupee. The post-op follow-up was thorough and the doctor was reachable whenever I had questions.", rating: 5, procedure: "Trifocal IOL", age: 61 },
  ];

  return (
    <main className="bg-[#070D18] text-slate-100 overflow-x-hidden" style={{ fontFamily: "'DM Sans', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,600;0,9..40,800;1,9..40,300&family=Playfair+Display:wght@700;900&display=swap');
        .serif { font-family: 'Playfair Display', Georgia, serif; }
        .gold-line { background: linear-gradient(90deg, transparent, #C9A84C, transparent); height: 1px; }
        @keyframes float-slow { 0%, 100% { transform: translateY(0px); } 50% { transform: translateY(-12px); } }
        @keyframes pulse-ring { 0% { transform: scale(0.8); opacity: 1; } 100% { transform: scale(1.8); opacity: 0; } }
        .float-anim { animation: float-slow 6s ease-in-out infinite; }
      `}</style>

      <Header />

      {/* ══════════════════════ HERO ══════════════════════ */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#070D18] via-[#080F1F] to-[#0a0f1a]" />
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(ellipse 80% 60% at 70% 50%, rgba(201,168,76,0.07) 0%, transparent 60%)`,
        }} />
        <div className="absolute inset-0 opacity-[0.025]" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, #C9A84C 1px, transparent 0)`,
          backgroundSize: "36px 36px",
        }} />
        <div className="absolute right-0 top-0 w-[700px] h-[700px] rounded-full" style={{
          background: "radial-gradient(circle, rgba(201,168,76,0.08) 0%, transparent 65%)",
        }} />

        <div className="relative z-10 mx-auto max-w-7xl px-6 py-24 lg:py-32">
          <div className="grid items-center gap-16 lg:grid-cols-2">

            {/* LEFT */}
            <div className="space-y-8">
              {/* City badge */}
              <div className="inline-flex items-center gap-2 rounded-full border border-[#C9A84C]/30 bg-[#C9A84C]/10 px-4 py-2 text-[10px] font-black uppercase tracking-[0.22em] text-[#C9A84C]">
                <MapPin size={13} />
                HealviaCare · {city.badge}
              </div>

              <h1 className="serif text-5xl font-black leading-[1.05] tracking-tight text-white sm:text-6xl lg:text-[5.5rem]">
                {city.headline.split(" with ")[0]}
                <br />
                <span className="text-[#C9A84C]">Cataract Surgery</span>
              </h1>

              <p className="text-base leading-8 text-slate-400 max-w-lg">
                {city.subheadline}
              </p>

              <p className="text-sm leading-7 text-slate-500 max-w-lg">
                {city.overview}
              </p>

              {/* Quick stats grid */}
              <div className="grid grid-cols-2 gap-4 max-w-lg sm:grid-cols-4">
                {[
                  { label: "Procedure", val: "20-min surgery", icon: <Zap size={18} className="text-[#C9A84C]" /> },
                  { label: "Screening", val: "Pre-op first", icon: <ClipboardList size={18} className="text-[#C9A84C]" /> },
                  { label: "Discharge", val: "Same day", icon: <Clock3 size={18} className="text-[#C9A84C]" /> },
                  { label: "Insurance", val: city.tpaNote, icon: <ShieldCheck size={18} className="text-[#C9A84C]" /> },
                ].map((item) => (
                  <div key={item.label} className="rounded-xl border border-slate-800 bg-[#0E1A2B] p-4">
                    <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-500">
                      {item.icon}
                      {item.label}
                    </div>
                    <div className="mt-1.5 text-xs font-semibold text-slate-300">{item.val}</div>
                  </div>
                ))}
              </div>

              {/* Trust tags */}
              <div className="flex flex-wrap gap-2.5">
                {[
                  "No Stitches Required",
                  "NABH Accredited",
                  "Lifetime Aftercare",
                  "Same-day Discharge",
                ].map((t) => (
                  <span key={t} className="flex items-center gap-1.5 rounded-full border border-[#C9A84C]/25 bg-[#C9A84C]/5 px-3.5 py-1.5 text-xs font-medium text-[#C9A84C]">
                    <CheckCircle2 size={11} />
                    {t}
                  </span>
                ))}
              </div>

              {/* Nearby areas */}
              <div>
                <p className="text-xs text-slate-600 uppercase tracking-widest font-semibold mb-2">Serving areas in {city.shortName}</p>
                <div className="flex flex-wrap gap-2">
                  {city.nearbyAreas.map((area) => (
                    <span key={area} className="rounded-full border border-slate-800 bg-[#0E1A2B] px-3 py-1 text-xs text-slate-500 hover:border-[#C9A84C]/30 hover:text-[#C9A84C] transition-colors cursor-default">
                      {area}
                    </span>
                  ))}
                </div>
              </div>

              {/* Social proof */}
              <div className="flex items-center gap-5 pt-2">
                <div className="flex -space-x-2.5">
                  {[
                    "https://images.unsplash.com/photo-1607746882042-944635dfe10e?w=80&q=80",
                    "https://images.unsplash.com/photo-1573497019236-17f8177b81e8?w=80&q=80",
                    "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=80&q=80",
                    "https://images.unsplash.com/photo-1607746882042-944635dfe10e?w=80&q=80",
                  ].map((src, i) => (
                    <div key={i} className="w-9 h-9 rounded-full border-2 border-[#070D18] overflow-hidden">
                      <Image src={src} alt="patient" width={36} height={36} className="object-cover" />
                    </div>
                  ))}
                </div>
                <div>
                  <div className="flex gap-0.5 mb-0.5">
                    {[1,2,3,4,5].map(i => <Star key={i} size={11} className="fill-[#C9A84C] text-[#C9A84C]" />)}
                  </div>
                  <p className="text-xs text-slate-500">Trusted by <span className="text-white font-semibold">1,20,000+</span> patients across India</p>
                </div>
              </div>

              {/* CTA buttons desktop */}
              <div className="hidden lg:flex items-center gap-4 pt-2">
                <a href="tel:8882804301"
                  className="flex items-center gap-2.5 rounded-xl bg-[#C9A84C] px-7 py-3.5 font-bold text-[#0a0f1a] hover:bg-[#d4b55a] transition-all hover:-translate-y-0.5 shadow-lg shadow-[#C9A84C]/20"
                >
                  <Phone size={16} />
                  Call 8882804301
                </a>
                <button
                  onClick={() => document.getElementById("symptoms")?.scrollIntoView({ behavior: "smooth" })}
                  className="flex items-center gap-2 rounded-xl border border-slate-700 px-7 py-3.5 font-medium text-slate-300 hover:border-[#C9A84C]/40 hover:text-[#C9A84C] transition-all"
                >
                  Check your symptoms
                  <ArrowRight size={15} />
                </button>
              </div>
            </div>

            {/* RIGHT: Hero Form */}
            <div className="relative">
              <div className="absolute -inset-10 rounded-full bg-[#C9A84C]/5 blur-3xl" />
              {submitted ? (
                <div className="relative rounded-2xl bg-[#0E1A2B] border border-[#C9A84C]/30 p-10 text-center shadow-2xl">
                  <div className="w-20 h-20 rounded-full bg-[#C9A84C]/10 border border-[#C9A84C]/30 flex items-center justify-center mx-auto mb-6">
                    <CheckCircle2 size={36} className="text-[#C9A84C]" />
                  </div>
                  <h3 className="serif text-2xl font-black text-white">Consultation Confirmed</h3>
                  <p className="mt-3 text-slate-400 text-sm leading-7">
                    Our senior patient coordinator in <strong className="text-[#C9A84C]">{city.name}</strong> will call you within <strong className="text-[#C9A84C]">30 minutes</strong> to schedule your comprehensive eye evaluation.
                  </p>
                  <div className="mt-6 rounded-xl bg-[#C9A84C]/10 border border-[#C9A84C]/20 p-4">
                    <p className="text-xs text-slate-400 uppercase tracking-wider mb-1">Or call directly</p>
                    <p className="text-2xl font-black text-[#C9A84C]">8882804301</p>
                    <p className="text-xs text-slate-500 mt-0.5">Mon–Sat · 8am – 8pm</p>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="relative rounded-2xl bg-[#0E1A2B] border border-slate-800 p-8 shadow-2xl">
                  <div className="absolute top-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-[#C9A84C] to-transparent" />

                  <div className="mb-7">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-2 h-2 rounded-full bg-[#C9A84C] animate-pulse" />
                      <span className="text-xs font-semibold text-[#C9A84C] uppercase tracking-widest">Free · No obligation</span>
                    </div>
                    <h2 className="serif text-2xl font-black text-white">
                      Free Eye Evaluation in {city.shortName}
                    </h2>
                    <p className="text-sm text-slate-500 mt-1.5">Get a personalised cataract assessment within 24 hrs</p>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1.5">Full Name</label>
                      <input
                        type="text"
                        placeholder="Your full name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full rounded-xl border border-slate-700 bg-[#070D18] px-4 py-3.5 text-sm text-white placeholder-slate-600 outline-none focus:border-[#C9A84C]/50 focus:ring-1 focus:ring-[#C9A84C]/20 transition"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1.5">
                        Mobile Number <span className="text-red-400 normal-case font-normal">*required</span>
                      </label>
                      <div className="flex">
                        <span className="flex items-center rounded-l-xl border border-r-0 border-slate-700 bg-slate-800 px-3 text-sm text-slate-400">
                          🇮🇳 +91
                        </span>
                        <input
                          type="tel"
                          required
                          placeholder="10-digit number"
                          value={phone}
                          onChange={(e) => {
                            setPhone(e.target.value.replace(/\D/g, "").slice(0, 10));
                            setPhoneError("");
                          }}
                          className="flex-1 rounded-r-xl border border-slate-700 bg-[#070D18] px-4 py-3.5 text-sm text-white placeholder-slate-600 outline-none focus:border-[#C9A84C]/50 focus:ring-1 focus:ring-[#C9A84C]/20 transition"
                        />
                      </div>
                      {phoneError && <p className="mt-1.5 text-xs text-red-400">{phoneError}</p>}
                    </div>

                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">Patient Age Range</label>
                      <div className="grid grid-cols-4 gap-2">
                        {["40–55", "55–65", "65–75", "75+"].map((a) => (
                          <button
                            key={a}
                            type="button"
                            onClick={() => setAge(a)}
                            className={`rounded-xl py-2.5 text-xs font-bold transition-all ${
                              age === a
                                ? "bg-[#C9A84C] text-[#0a0f1a]"
                                : "border border-slate-700 text-slate-400 hover:border-[#C9A84C]/40 hover:text-[#C9A84C]"
                            }`}
                          >
                            {a}
                          </button>
                        ))}
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={loading}
                      className="flex w-full items-center justify-center gap-2.5 rounded-xl bg-[#C9A84C] py-4 font-bold text-[#0a0f1a] shadow-lg shadow-[#C9A84C]/20 transition hover:bg-[#d4b55a] hover:-translate-y-0.5 disabled:opacity-60 disabled:cursor-not-allowed mt-2"
                    >
                      {loading ? (
                        <><div className="h-5 w-5 animate-spin rounded-full border-2 border-[#0a0f1a]/30 border-t-[#0a0f1a]" /> Booking...</>
                      ) : (
                        <><Phone size={16} /> Get Free Callback <ArrowRight size={16} /></>
                      )}
                    </button>

                    <p className="text-center text-xs text-slate-600 flex items-center justify-center gap-1.5">
                      <ShieldCheck size={11} className="text-[#C9A84C]" />
                      100% confidential · No spam · Cancel anytime
                    </p>
                  </div>
                </form>
              )}

              {/* Contact strip */}
              <div className="relative mt-4 grid grid-cols-3 gap-3">
                {[
                  { icon: <Phone size={14} />, label: "Helpline", value: "8882804301" },
                  { icon: <Mail size={14} />, label: "Email", value: "info@healviacare.in" },
                  { icon: <Clock3 size={14} />, label: "Hours", value: "Mon–Sat 8–8" },
                ].map((item) => (
                  <div key={item.label} className="rounded-xl bg-[#0E1A2B] border border-slate-800 p-3 text-center">
                    <span className="text-[#C9A84C] flex justify-center mb-1">{item.icon}</span>
                    <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-500">{item.label}</p>
                    <p className="text-xs font-bold text-slate-300 mt-0.5 leading-tight">{item.value}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════ STATS BAR ══════════════════════ */}
      <section className="border-y border-[#C9A84C]/15 bg-[#0a0f1a] py-16">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid grid-cols-2 gap-10 md:grid-cols-4">
            <StatCounter value={120000} suffix="+" label="Surgeries Performed" />
            <StatCounter value={99} suffix="%" label="Patient Satisfaction" />
            <StatCounter value={20} suffix=" yrs" label="Surgical Excellence" />
            <StatCounter value={40} suffix="+" label="Cities Covered" />
          </div>
        </div>
      </section>

      {/* ══════════════════════ CONTACT STRIP ══════════════════════ */}
      <section className="px-6 py-8 bg-[#0E1A2B]">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-4 rounded-2xl bg-[#070D18] p-5 border border-slate-800 md:grid-cols-3">
            <div className="flex items-center gap-3 rounded-xl border border-slate-800 bg-[#0E1A2B] p-4">
              <Phone className="text-[#C9A84C]" size={20} />
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Call Us</p>
                <p className="font-bold text-slate-200">8882804301</p>
              </div>
            </div>
            <div className="flex items-center gap-3 rounded-xl border border-slate-800 bg-[#0E1A2B] p-4">
              <Mail className="text-[#C9A84C]" size={20} />
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Email</p>
                <p className="font-bold text-slate-200">info@healviacare.in</p>
              </div>
            </div>
            <div className="flex items-center gap-3 rounded-xl border border-slate-800 bg-[#0E1A2B] p-4">
              <MapPin className="text-[#C9A84C]" size={20} />
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Serving</p>
                <p className="font-bold text-slate-200">{city.hospitalLine}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════ SYMPTOMS ══════════════════════ */}
      <section id="symptoms" className="px-6 py-24">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-16 lg:grid-cols-2 items-center">
            <div>
              <div className="flex items-center gap-3 mb-5">
                <div className="h-px w-8 bg-[#C9A84C]" />
                <span className="text-[#C9A84C] text-xs font-semibold uppercase tracking-widest">Recognise the Signs</span>
              </div>
              <h2 className="serif text-5xl font-black text-white mb-5">
                Is It Time for<br />
                <span className="text-[#C9A84C]">Cataract Surgery?</span>
              </h2>
              <p className="text-slate-400 leading-8 text-sm mb-8 max-w-md">
                Cataracts develop slowly and are often mistaken for normal aging. These are the key warning signs that surgery may be needed. If you experience three or more, book an evaluation in {city.shortName} today.
              </p>

              <div className="grid gap-3 sm:grid-cols-2">
                {symptoms.map((s, i) => (
                  <SymptomCard key={i} {...s} />
                ))}
              </div>

              <div className="mt-8 rounded-xl border border-[#C9A84C]/20 bg-[#C9A84C]/5 p-5">
                <p className="text-sm text-[#C9A84C] font-semibold mb-1">⚠ When to act immediately</p>
                <p className="text-xs text-slate-400 leading-6">
                  If you can no longer read, drive safely, or recognise faces — cataract surgery should not be delayed. Untreated cataracts can lead to complete vision loss. Book your evaluation in {city.name} today.
                </p>
              </div>
            </div>

            <div className="relative">
              <div className="overflow-hidden rounded-3xl shadow-2xl h-[520px]">
                <Image
                  src="https://images.unsplash.com/photo-1588776814546-ec7e84c1c4b3?w=900&q=80"
                  alt="Eye examination"
                  fill
                  className="object-cover"
                  style={{ position: "absolute" }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#070D18]/80 via-transparent to-transparent" />
              </div>
              <div className="absolute bottom-6 left-6 right-6">
                <div className="rounded-2xl bg-[#0E1A2B]/90 backdrop-blur border border-[#C9A84C]/20 p-5">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-[#C9A84C]/10 border border-[#C9A84C]/20 flex items-center justify-center">
                      <Microscope size={22} className="text-[#C9A84C]" />
                    </div>
                    <div>
                      <p className="font-black text-white">Advanced IOL Technology</p>
                      <p className="text-xs text-slate-400 mt-0.5">Premium monofocal, multifocal & toric lenses in {city.shortName}</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="absolute -top-4 -right-4 w-24 h-24 rounded-full bg-[#C9A84C] flex flex-col items-center justify-center text-[#0a0f1a] shadow-xl">
                <span className="text-2xl font-black leading-none">20</span>
                <span className="text-[9px] font-black uppercase tracking-wider leading-tight">min</span>
                <span className="text-[8px] font-semibold opacity-70">procedure</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════ LENS OPTIONS ══════════════════════ */}
      <section className="px-6 py-24 bg-[#0a0f1a]">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-14">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="h-px w-8 bg-[#C9A84C]" />
              <span className="text-[#C9A84C] text-xs font-semibold uppercase tracking-widest">Premium Intraocular Lenses</span>
              <div className="h-px w-8 bg-[#C9A84C]" />
            </div>
            <h2 className="serif text-5xl font-black text-white">
              Choose Your <span className="text-[#C9A84C]">Lens</span>
            </h2>
            <p className="mt-4 text-slate-500 max-w-xl mx-auto text-sm leading-7">
              Modern cataract surgery replaces the cloudy natural lens with a premium artificial lens. The right choice depends on your lifestyle, prescription, and goals.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            <LensCard
              name="Monofocal IOL"
              subtitle="Standard · Clear distance vision"
              price="₹30,000"
              badge="Insurance Covered"
              features={[
                "Excellent distance clarity",
                "Reading glasses may be needed",
                "Best for budget-conscious patients",
                "Proven 40+ year track record",
                "Same-day discharge",
              ]}
              desc="The gold standard for reliable distance vision. Most health insurance policies cover this lens. Reading glasses are typically still required."
            />
            <LensCard
              name="Multifocal / Trifocal IOL"
              subtitle="Premium · Near + far + intermediate"
              price="₹60,000"
              isPopular
              features={[
                "See near, middle & far distances",
                "Greatly reduces glasses dependence",
                "HD vision quality",
                "EDOF options available",
                "Ideal for active lifestyles",
              ]}
              desc="Experience life without glasses. Advanced optics provide sharp vision at all distances — from reading your phone to seeing across the room."
            />
            <LensCard
              name="Toric IOL"
              subtitle="Astigmatism correction built in"
              price="₹50,000"
              badge="For Astigmatism"
              features={[
                "Corrects corneal astigmatism",
                "Clearer than standard lenses",
                "Available in mono + multifocal",
                "Custom axis alignment",
                "Reduces glasses need significantly",
              ]}
              desc="If you have astigmatism along with cataract, a toric IOL corrects both in a single surgery — giving sharper, cleaner vision than a standard lens."
            />
          </div>

          {/* Comparison table */}
          <div className="mt-10 overflow-hidden rounded-2xl border border-slate-800 bg-[#0E1A2B]">
            <div className="px-6 py-4 border-b border-slate-800">
              <h3 className="font-black text-white text-sm">Quick Comparison</h3>
            </div>
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-800">
                  <th className="py-3.5 px-6 text-left font-semibold text-slate-500 text-xs uppercase tracking-wider">Feature</th>
                  <th className="py-3.5 px-6 text-center font-black text-slate-300 text-xs">Monofocal</th>
                  <th className="py-3.5 px-6 text-center font-black text-[#C9A84C] text-xs">Multifocal/Trifocal</th>
                  <th className="py-3.5 px-6 text-center font-black text-slate-300 text-xs">Toric</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {[
                  ["Distance vision", "Excellent", "Excellent", "Excellent"],
                  ["Reading without glasses", "No", "Yes", "Partial"],
                  ["Astigmatism correction", "No", "Add-on", "Yes"],
                  ["Insurance coverage", "Usually covered", "Self-pay typically", "Partial"],
                  ["Night driving halos", "Minimal", "May occur initially", "Minimal"],
                  ["Glasses after surgery", "Reading glasses", "Usually not needed", "Reduced"],
                ].map(([feat, mono, multi, toric], i) => (
                  <tr key={i} className="hover:bg-white/[0.02] transition-colors">
                    <td className="py-3.5 px-6 font-medium text-slate-400 text-xs">{feat}</td>
                    <td className="py-3.5 px-6 text-center text-slate-400 text-xs">{mono}</td>
                    <td className="py-3.5 px-6 text-center text-[#C9A84C] font-semibold text-xs">{multi}</td>
                    <td className="py-3.5 px-6 text-center text-slate-400 text-xs">{toric}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ══════════════════════ HOW IT WORKS ══════════════════════ */}
      <section className="px-6 py-24">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="h-px w-8 bg-[#C9A84C]" />
              <span className="text-[#C9A84C] text-xs font-semibold uppercase tracking-widest">Your Journey in {city.shortName}</span>
              <div className="h-px w-8 bg-[#C9A84C]" />
            </div>
            <h2 className="serif text-5xl font-black text-white">
              From Cloudy to <span className="text-[#C9A84C]">Crystal Clear</span>
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {[
              { num: "01", icon: <Phone size={22} />, title: "Free Consultation Call", desc: `Our ${city.shortName} coordinator calls within 30 minutes. We understand your symptoms, age, and medical history.` },
              { num: "02", icon: <Eye size={22} />, title: "Comprehensive Screening", desc: "90-min eye evaluation: biometry, corneal mapping, retina check. Lens recommendation by senior surgeon." },
              { num: "03", icon: <Layers size={22} />, title: "Surgery Day", desc: "Arrive at our partner hospital, receive anaesthetic drops, and in 20 minutes you walk out with a new lens — no stitch, no patch." },
              { num: "04", icon: <Sunrise size={22} />, title: "See the World Anew", desc: `Vision improves within hours. 3 follow-up visits included. Most ${city.shortName} patients are back to full routine in 48 hours.` },
            ].map((step, i) => (
              <div key={i} className="relative group">
                <div className="rounded-2xl bg-[#0E1A2B] border border-slate-800 p-7 h-full hover:border-[#C9A84C]/30 transition-all duration-300 hover:-translate-y-1">
                  <div className="flex items-start justify-between mb-5">
                    <div className="w-12 h-12 rounded-xl bg-[#C9A84C]/10 border border-[#C9A84C]/20 flex items-center justify-center text-[#C9A84C] group-hover:bg-[#C9A84C]/20 transition-colors">
                      {step.icon}
                    </div>
                    <span className="serif text-5xl font-black text-[#C9A84C]/10 group-hover:text-[#C9A84C]/20 transition-colors leading-none">{step.num}</span>
                  </div>
                  <h4 className="font-black text-white mb-2.5">{step.title}</h4>
                  <p className="text-xs text-slate-500 leading-6">{step.desc}</p>
                </div>
                {i < 3 && (
                  <div className="hidden lg:block absolute top-1/2 -right-3 w-6 h-px bg-[#C9A84C]/30" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════ WHY HEALVIACARE ══════════════════════ */}
      <section className="px-6 py-24 bg-[#0a0f1a]">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-16 lg:grid-cols-2 items-center">
            {/* Image collage */}
            <div className="relative order-2 lg:order-1">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div className="overflow-hidden rounded-2xl h-48 shadow-xl">
                    <Image src="https://images.unsplash.com/photo-1579154235828-ac51edfb3983?w=700&q=80" alt="Cataract surgery" width={400} height={280} className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
                  </div>
                  <div className="overflow-hidden rounded-2xl h-32 shadow-xl">
                    <Image src="https://images.unsplash.com/photo-1551076805-e1869033e561?w=700&q=80" alt="Eye surgery" width={400} height={200} className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
                  </div>
                </div>
                <div className="space-y-4 pt-8">
                  <div className="overflow-hidden rounded-2xl h-32 shadow-xl">
                    <Image src="https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=700&q=80" alt="Doctor" width={400} height={200} className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
                  </div>
                  <div className="overflow-hidden rounded-2xl h-48 shadow-xl">
                    <Image src="https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?w=700&q=80" alt="Happy patient" width={400} height={280} className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
                  </div>
                </div>
              </div>
              <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 lg:-bottom-5 lg:left-auto lg:translate-x-0 lg:-right-6 whitespace-nowrap bg-[#0E1A2B] border border-[#C9A84C]/30 rounded-2xl p-4 shadow-2xl flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#C9A84C]/10 flex items-center justify-center">
                  <Award size={22} className="text-[#C9A84C]" />
                </div>
                <div>
                  <p className="font-black text-white">NABH Accredited</p>
                  <p className="text-xs text-slate-500">All partner hospitals in {city.shortName}</p>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="order-1 lg:order-2">
              <div className="flex items-center gap-3 mb-5">
                <div className="h-px w-8 bg-[#C9A84C]" />
                <span className="text-[#C9A84C] text-xs font-semibold uppercase tracking-widest">Why Choose HealviaCare in {city.shortName}</span>
              </div>
              <h2 className="serif text-5xl font-black text-white mb-6">
                Excellence in Every<br />
                <span className="text-[#C9A84C]">Detail.</span>
              </h2>
              <p className="text-slate-400 leading-8 text-sm mb-8">
                We don't just operate on eyes — we restore independence, confidence, and joy to our patients across {city.name}. Our approach combines clinical precision with genuine compassion.
              </p>

              <div className="space-y-5">
                {[
                  { icon: <Microscope size={18} />, title: "Zeiss & Alcon Phaco Systems", desc: "We use only the world's most advanced ultrasound phacoemulsification machines — the same used in top European clinics." },
                  { icon: <ShieldCheck size={18} />, title: "All-inclusive Transparent Pricing", desc: "No surprise bills. Your quote covers surgery, lens, follow-ups, and medications — nothing hidden." },
                  { icon: <Users size={18} />, title: `Dedicated ${city.shortName} Coordinator`, desc: `One point of contact for the patient and family in ${city.name} — from first call to last follow-up. Available 7 days a week.` },
                  { icon: <TrendingUp size={18} />, title: "Post-op Tele-consultation", desc: "Video follow-ups available for patients travelling from other areas — see your surgeon from home." },
                  { icon: <Heart size={18} />, title: "Geriatric Care Support", desc: "Specialised support for elderly patients including transport assistance, escort coordination, and home visit options." },
                ].map((item) => (
                  <div key={item.title} className="flex gap-4 group">
                    <div className="w-10 h-10 rounded-lg bg-[#C9A84C]/10 border border-[#C9A84C]/15 flex items-center justify-center text-[#C9A84C] shrink-0 group-hover:bg-[#C9A84C]/20 transition-colors">
                      {item.icon}
                    </div>
                    <div>
                      <h4 className="font-bold text-white text-sm">{item.title}</h4>
                      <p className="text-xs text-slate-500 mt-0.5 leading-5">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════ LIFE AFTER SURGERY ══════════════════════ */}
      <section className="px-6 py-24">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="h-px w-8 bg-[#C9A84C]" />
              <span className="text-[#C9A84C] text-xs font-semibold uppercase tracking-widest">Life After Cataract Surgery</span>
              <div className="h-px w-8 bg-[#C9A84C]" />
            </div>
            <h2 className="serif text-5xl font-black text-white">
              What You Get <span className="text-[#C9A84C]">Back</span>
            </h2>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-10">
            {[
              { emoji: "📖", title: "Read Again", desc: "Enjoy books, newspapers, and your phone without struggling — many with no reading glasses at all." },
              { emoji: "🚗", title: "Drive at Night", desc: "No more blinding glare or halos. Drive safely and confidently after dark." },
              { emoji: "🎨", title: "Vivid Colours", desc: "Patients consistently report colours appearing brighter and richer than they have in years." },
              { emoji: "👨‍👩‍👧", title: "Recognise Faces", desc: "See your grandchildren's expressions clearly. Reconnect with the people who matter most." },
            ].map((b) => (
              <div key={b.title} className="rounded-2xl bg-[#0E1A2B] border border-slate-800 p-7 hover:border-[#C9A84C]/25 transition-all duration-300 hover:-translate-y-1">
                <div className="text-4xl mb-4">{b.emoji}</div>
                <h4 className="font-black text-white">{b.title}</h4>
                <p className="mt-2 text-xs text-slate-500 leading-6">{b.desc}</p>
              </div>
            ))}
          </div>

          <div className="overflow-hidden rounded-3xl h-64 shadow-2xl relative">
            <Image
              src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=1600&q=80"
              alt="Happy life after surgery"
              width={1600}
              height={400}
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#070D18]/80 via-transparent to-transparent" />
            <div className="absolute left-10 top-1/2 -translate-y-1/2">
              <p className="serif text-3xl font-black text-white leading-tight">"I forgot what it felt like<br />to see clearly. Now I remember."</p>
              <p className="text-sm text-[#C9A84C] mt-2">— Patient from {city.shortName} · Multifocal IOL</p>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════ TESTIMONIALS ══════════════════════ */}
      <section className="px-6 py-24 bg-[#0a0f1a]">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="h-px w-8 bg-[#C9A84C]" />
              <span className="text-[#C9A84C] text-xs font-semibold uppercase tracking-widest">Patient Stories</span>
              <div className="h-px w-8 bg-[#C9A84C]" />
            </div>
            <h2 className="serif text-5xl font-black text-white">
              Real Voices. <span className="text-[#C9A84C]">Real Results.</span>
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {testimonials.map((t) => <TestimonialCard key={t.name} {...t} />)}
          </div>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-10">
            <div className="flex items-center gap-3">
              <div className="flex gap-1">
                {[1,2,3,4,5].map(i => <Star key={i} size={18} className="fill-[#C9A84C] text-[#C9A84C]" />)}
              </div>
              <div>
                <p className="font-black text-white text-lg">4.9 / 5.0</p>
                <p className="text-xs text-slate-500">Google Rating · 3,400+ reviews</p>
              </div>
            </div>
            <div className="w-px h-8 bg-slate-800 hidden md:block" />
            <div className="text-center">
              <p className="font-black text-white text-lg">98%</p>
              <p className="text-xs text-slate-500">Would recommend to family</p>
            </div>
            <div className="w-px h-8 bg-slate-800 hidden md:block" />
            <div className="text-center">
              <p className="font-black text-white text-lg">1,20,000+</p>
              <p className="text-xs text-slate-500">Successful surgeries</p>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════ PRICING ══════════════════════ */}
      <section className="px-6 py-24">
        <div className="mx-auto max-w-5xl">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="h-px w-8 bg-[#C9A84C]" />
              <span className="text-[#C9A84C] text-xs font-semibold uppercase tracking-widest">Pricing in {city.shortName}</span>
              <div className="h-px w-8 bg-[#C9A84C]" />
            </div>
            <h2 className="serif text-5xl font-black text-white">
              Transparent,<br /><span className="text-[#C9A84C]">All-Inclusive</span> Packages
            </h2>
            <p className="mt-4 text-slate-500 text-sm">Everything included. No hidden fees. No surprise bills.</p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {[
              {
                name: "Monofocal",
                price: "₹30,000",
                per: "per eye",
                features: ["Phacoemulsification", "Standard monofocal IOL", "Pre-op full screening", "1-year follow-up care", "Medication included"],
                cta: "Best for insurance patients",
                hot: false,
              },
              {
                name: "Multifocal / Trifocal",
                price: "₹65,000",
                per: "per eye",
                features: ["Advanced phaco system", "Premium trifocal IOL", "Glasses-free outcome", "VIP coordinator", "Lifetime enhancement policy"],
                cta: "Best for glasses-free life",
                hot: true,
              },
              {
                name: "Toric IOL",
                price: "₹55,000",
                per: "per eye",
                features: ["Phacoemulsification", "Astigmatism-correcting IOL", "Custom axis measurement", "Priority scheduling", "1-year aftercare"],
                cta: "Best for astigmatism patients",
                hot: false,
              },
            ].map((plan) => (
              <div key={plan.name} className={`relative rounded-2xl p-7 border transition-all hover:-translate-y-1 ${
                plan.hot
                  ? "bg-gradient-to-b from-[#C9A84C]/10 to-[#0E1A2B] border-[#C9A84C]/40 shadow-lg shadow-[#C9A84C]/5"
                  : "bg-[#0E1A2B] border-slate-800"
              }`}>
                {plan.hot && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full bg-[#C9A84C] px-4 py-1 text-xs font-black uppercase tracking-widest text-[#0a0f1a]">
                    Most Popular
                  </div>
                )}
                <h3 className="text-lg font-black text-white">{plan.name}</h3>
                <p className="text-xs text-slate-500 mt-0.5 italic">{plan.cta}</p>
                <div className="mt-4 flex items-baseline gap-1.5">
                  <span className={`text-4xl font-black ${plan.hot ? "text-[#C9A84C]" : "text-white"}`}>{plan.price}</span>
                  <span className="text-sm text-slate-500">{plan.per}</span>
                </div>
                <ul className="mt-5 space-y-2.5">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-center gap-2.5 text-sm text-slate-400">
                      <CheckCircle2 size={13} className="text-[#C9A84C] shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => document.getElementById("final-cta")?.scrollIntoView({ behavior: "smooth" })}
                  className={`mt-6 w-full rounded-xl py-3 text-sm font-bold transition ${
                    plan.hot
                      ? "bg-[#C9A84C] text-[#0a0f1a] hover:bg-[#d4b55a]"
                      : "border border-[#C9A84C]/30 text-[#C9A84C] hover:bg-[#C9A84C]/10"
                  }`}
                >
                  Get Free Evaluation in {city.shortName}
                </button>
              </div>
            ))}
          </div>

          <div className="mt-8 grid sm:grid-cols-2 gap-4">
            <div className="rounded-xl border border-[#C9A84C]/20 bg-[#C9A84C]/5 p-5 flex items-center gap-4">
              <BadgeCheck size={24} className="text-[#C9A84C] shrink-0" />
              <div>
                <p className="font-bold text-white text-sm">0% Interest EMI</p>
                <p className="text-xs text-slate-500 mt-0.5">6 to 24 months · Instant approval · No paperwork</p>
              </div>
            </div>
            <div className="rounded-xl border border-[#C9A84C]/20 bg-[#C9A84C]/5 p-5 flex items-center gap-4">
              <ShieldCheck size={24} className="text-[#C9A84C] shrink-0" />
              <div>
                <p className="font-bold text-white text-sm">Insurance Assistance in {city.shortName}</p>
                <p className="text-xs text-slate-500 mt-0.5">{city.tpaNote} · We handle pre-auth & cashless claims</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════ FAQ ══════════════════════ */}
      <section className="px-6 py-24 bg-[#0a0f1a]">
        <div className="mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="h-px w-8 bg-[#C9A84C]" />
              <span className="text-[#C9A84C] text-xs font-semibold uppercase tracking-widest">Common Questions</span>
              <div className="h-px w-8 bg-[#C9A84C]" />
            </div>
            <h2 className="serif text-5xl font-black text-white">
              Questions We Hear <span className="text-[#C9A84C]">Every Day</span>
            </h2>
            <p className="mt-4 text-slate-500 text-sm">Clear answers. No medical jargon.</p>
          </div>
          <div>
            {faqs.map((faq) => <FAQItem key={faq.q} q={faq.q} a={faq.a} />)}
          </div>
        </div>
      </section>

      {/* ══════════════════════ FINAL CTA ══════════════════════ */}
      <section id="final-cta" className="px-6 py-24">
        <div className="mx-auto max-w-7xl">
          <div className="relative overflow-hidden rounded-3xl border border-[#C9A84C]/20">
            <div className="absolute inset-0 bg-gradient-to-br from-[#0E1A2B] to-[#070D18]" />
            <div className="absolute inset-0" style={{
              backgroundImage: `radial-gradient(ellipse 60% 80% at 15% 50%, rgba(201,168,76,0.08) 0%, transparent 60%)`,
            }} />
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#C9A84C]/50 to-transparent" />

            <div className="relative grid gap-12 p-10 lg:grid-cols-2 lg:p-16 items-center">
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-2 h-2 rounded-full bg-[#C9A84C] animate-pulse" />
                  <span className="text-[#C9A84C] text-xs font-semibold uppercase tracking-widest">Limited slots available in {city.shortName} this week</span>
                </div>
                <h2 className="serif text-5xl font-black text-white leading-tight sm:text-6xl">
                  Don't Let Cataracts<br />
                  <span className="text-[#C9A84C]">Steal Your</span><br />
                  World.
                </h2>
                <p className="mt-6 text-slate-400 leading-8 text-sm max-w-md">
                  Join 1,20,000 people across India who chose to see clearly. Your comprehensive evaluation in {city.name} — worth ₹2,500 — is completely free when you book today.
                </p>
                <div className="mt-7 space-y-3">
                  {[
                    "Free 90-minute comprehensive eye evaluation (₹2,500 value)",
                    "Expert lens recommendation by senior surgeon",
                    `Insurance pre-authorisation assistance in ${city.shortName}`,
                    "Zero pressure — decide entirely at your pace",
                  ].map((item) => (
                    <div key={item} className="flex items-center gap-3 text-sm text-slate-300">
                      <CheckCircle2 size={15} className="text-[#C9A84C] shrink-0" />
                      {item}
                    </div>
                  ))}
                </div>
                <div className="mt-8 flex flex-wrap gap-4">
                  <a href="tel:8882804301" className="flex items-center gap-2.5 rounded-xl bg-[#C9A84C] px-7 py-3.5 font-bold text-[#0a0f1a] hover:bg-[#d4b55a] transition-all hover:-translate-y-0.5 shadow-lg shadow-[#C9A84C]/20">
                    <Phone size={16} />
                    Call 8882804301
                  </a>
                  <a href="mailto:info@healviacare.in" className="flex items-center gap-2 rounded-xl border border-[#C9A84C]/30 px-7 py-3.5 font-medium text-[#C9A84C] hover:bg-[#C9A84C]/10 transition-all">
                    <Mail size={16} />
                    Email Us
                  </a>
                </div>
              </div>

              {/* Repeat form */}
              {submitted ? (
                <div className="rounded-2xl bg-[#0E1A2B] border border-[#C9A84C]/30 p-8 text-center">
                  <CheckCircle2 size={48} className="text-[#C9A84C] mx-auto mb-4" />
                  <h3 className="serif text-2xl font-black text-white">We'll Call You Soon!</h3>
                  <p className="mt-2 text-slate-400 text-sm">Expect a call within 30 minutes from our {city.shortName} coordinator.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="relative rounded-2xl bg-[#070D18] border border-slate-800 p-7 shadow-2xl">
                  <h3 className="serif text-xl font-black text-white mb-6">
                    Claim Your <span className="text-[#C9A84C]">Free Evaluation</span> in {city.shortName}
                  </h3>
                  <div className="space-y-4">
                    <input
                      type="text"
                      placeholder="Your name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full rounded-xl border border-slate-700 bg-[#0E1A2B] px-4 py-3.5 text-sm text-white placeholder-slate-600 outline-none focus:border-[#C9A84C]/50 transition"
                    />
                    <div className="flex">
                      <span className="flex items-center rounded-l-xl border border-r-0 border-slate-700 bg-slate-800 px-3 text-sm text-slate-400">🇮🇳 +91</span>
                      <input
                        type="tel"
                        required
                        placeholder="Mobile number"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value.replace(/\D/g, "").slice(0, 10))}
                        className="flex-1 rounded-r-xl border border-slate-700 bg-[#0E1A2B] px-4 py-3.5 text-sm text-white placeholder-slate-600 outline-none focus:border-[#C9A84C]/50 transition"
                      />
                    </div>
                    <div className="grid grid-cols-4 gap-2">
                      {["40–55", "55–65", "65–75", "75+"].map((a) => (
                        <button key={a} type="button" onClick={() => setAge(a)}
                          className={`rounded-xl py-2.5 text-xs font-bold transition ${age === a ? "bg-[#C9A84C] text-[#0a0f1a]" : "border border-slate-700 text-slate-500 hover:border-[#C9A84C]/40 hover:text-[#C9A84C]"}`}
                        >{a}</button>
                      ))}
                    </div>
                    <button type="submit" disabled={loading}
                      className="flex w-full items-center justify-center gap-2.5 rounded-xl bg-[#C9A84C] py-4 font-bold text-[#0a0f1a] hover:bg-[#d4b55a] transition disabled:opacity-60"
                    >
                      {loading ? "Booking..." : <><Phone size={16} /> Book Free Consultation <ArrowRight size={16} /></>}
                    </button>
                    <p className="text-center text-xs text-slate-600 flex items-center justify-center gap-1.5">
                      <ShieldCheck size={11} className="text-[#C9A84C]" />
                      100% confidential · No spam · Cancel anytime
                    </p>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}