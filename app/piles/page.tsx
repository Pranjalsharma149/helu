"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  Activity, ChevronRight, CheckCircle2, Zap, ShieldCheck,
  ArrowRight, Target, Flame, MapPin, Star, Phone,
  ChevronDown, Clock, Users, Award, HeartPulse, Microscope
} from "lucide-react";

// ─── DATA ────────────────────────────────────────────────────────────────────

const treatments = [
  {
    title: "Laser Piles Treatment",
    desc: "LHP (Laser Hemorrhoidoplasty) uses a precise 1470nm laser fibre to shrink haemorrhoidal tissue painlessly — no cuts, no stitches, 30-minute daycare procedure.",
    icon: Flame,
    accent: "#EA580C",
    bg: "from-orange-50 to-amber-50",
    border: "border-orange-100",
    tag: "Painless · Day Care",
  },
  {
    title: "Anal Fissure Surgery",
    desc: "Laser sphincterotomy precisely relaxes the internal sphincter without damaging continence. Chronic fissures heal permanently — no recurrence, no wound care.",
    icon: Target,
    accent: "#1D4ED8",
    bg: "from-blue-50 to-indigo-50",
    border: "border-blue-100",
    tag: "No Stitches",
  },
  {
    title: "Fistula — VAAFT",
    desc: "Video-Assisted Anal Fistula Treatment (VAAFT) uses a miniature endoscope to locate and seal complex fistula tracts — 95% success rate, sphincter fully preserved.",
    icon: Activity,
    accent: "#0F766E",
    bg: "from-teal-50 to-emerald-50",
    border: "border-teal-100",
    tag: "High Success",
  },
  {
    title: "Pilonidal Sinus — EPSiT",
    desc: "Endoscopic Pilonidal Sinus Treatment (EPSiT) removes the sinus under direct vision through a tiny incision. Back to desk work in 3–5 days — a fraction of open surgery.",
    icon: Zap,
    accent: "#7C3AED",
    bg: "from-violet-50 to-purple-50",
    border: "border-violet-100",
    tag: "Fast Recovery",
  },
  {
    title: "Rectal Prolapse Repair",
    desc: "Laparoscopic rectopexy restores prolapsed rectal tissue to its normal position with permanent suture fixation. Excellent long-term outcomes with minimal recovery.",
    icon: HeartPulse,
    accent: "#BE185D",
    bg: "from-pink-50 to-rose-50",
    border: "border-pink-100",
    tag: "Permanent Fix",
  },
  {
    title: "Colorectal Cancer Screening",
    desc: "High-definition colonoscopy combined with AI-assisted polyp detection for early cancer identification. Same-day results, specialist review, and personalised action plan.",
    icon: Microscope,
    accent: "#0369A1",
    bg: "from-sky-50 to-cyan-50",
    border: "border-sky-100",
    tag: "Early Detection",
  },
];

const stats = [
  { value: "25,000+", label: "Procedures Performed", icon: Award },
  { value: "98%",     label: "Patient Satisfaction",  icon: ShieldCheck },
  { value: "30 Min",  label: "Average Procedure",     icon: Clock },
  { value: "100%",    label: "Confidentiality",       icon: Users },
];

const steps = [
  {
    idx: "01",
    title: "German Laser Precision",
    desc: "A 1470nm diode laser fibre is guided into the haemorrhoidal tissue. It coagulates the blood supply and shrinks the tissue from within — no scalpel, no sutures, no blood.",
  },
  {
    idx: "02",
    title: "30-Minute Day-Care Surgery",
    desc: "The entire procedure is complete in 20–30 minutes under local or short general anaesthesia. You recover in our lounge for 2 hours, then go home with a companion.",
  },
  {
    idx: "03",
    title: "Zero Wound Care Protocol",
    desc: "No dressings, no packing, no painful post-op cleaning. A simple soft diet for 48 hours and a mild stool softener — most patients return to desk work in 2 days.",
  },
];

const doctors = [
  {
    name: "Dr. Anand Prakash",
    title: "Sr. Consultant — Laser Proctology",
    exp: "19 Years",
    procedures: "12,000+",
    initials: "AP",
    color: "#0F766E",
    qualifications: "MS Surgery · FMAS · Fellowship in Colorectal Surgery, Germany",
  },
  {
    name: "Dr. Ritu Sharma",
    title: "Consultant — Colorectal Surgery",
    exp: "14 Years",
    procedures: "7,500+",
    initials: "RS",
    color: "#7C3AED",
    qualifications: "MCh Surgery · FACS · Advanced Laparoscopic Colorectal, France",
  },
  {
    name: "Dr. Vikram Joshi",
    title: "Consultant — Advanced Endoscopy",
    exp: "11 Years",
    procedures: "5,000+",
    initials: "VJ",
    color: "#EA580C",
    qualifications: "DNB Surgery · GI Endoscopy Fellow, AIIMS · ASGE Member",
  },
];

const testimonials = [
  {
    name: "Anil Verma",
    city: "Delhi",
    age: 42,
    treatment: "Laser Piles",
    text: "I suffered in silence for 3 years out of embarrassment. The laser procedure was done in 25 minutes. No pain whatsoever — I went home the same day and was at my office desk in 2 days. Wish I had done this sooner.",
    stars: 5,
  },
  {
    name: "Sunita Reddy",
    city: "Hyderabad",
    age: 35,
    treatment: "Anal Fissure",
    text: "The fissure had made my daily life miserable for over a year. Dr. Sharma's laser treatment was completely painless. The healing was remarkable — gone in 10 days, permanently.",
    stars: 5,
  },
  {
    name: "Rakesh Gupta",
    city: "Mumbai",
    age: 51,
    treatment: "Fistula VAAFT",
    text: "I had failed two open surgeries elsewhere. VAAFT was completely different — small incision, no recurrence, and my sphincter was untouched. Best decision of my life.",
    stars: 5,
  },
];

const faqs = [
  {
    q: "Is laser piles treatment really painless?",
    a: "Yes. The laser fibre works inside the haemorrhoidal tissue without any external incision. There are no nerve endings inside the tissue that cause pain. Most patients rate post-procedure discomfort as 1–2/10 and manage with a mild over-the-counter painkiller for the first day.",
  },
  {
    q: "How soon can I return to work after laser treatment?",
    a: "Desk/office workers typically return in 2–3 days. Those with physically demanding jobs may need 5–7 days. Driving is fine after 24 hours. There are no wound dressings or follow-up cleaning procedures — just a simple post-op care sheet.",
  },
  {
    q: "Will piles come back after laser treatment?",
    a: "Laser Hemorrhoidoplasty has a recurrence rate of under 5% at 5 years — significantly lower than conventional banding (20–30%) or open surgery (10–15%). Dietary changes and hydration are recommended to keep the recurrence rate near zero.",
  },
  {
    q: "Is my consultation completely confidential?",
    a: "Absolutely. All patient records, consultations, and communications are encrypted and governed by the Indian Medical Council's patient confidentiality norms. Our staff are bound by strict NDAs. You can also request a telemedicine consultation from the privacy of your home.",
  },
  {
    q: "Does insurance cover laser piles surgery?",
    a: "Yes. Most TPA-linked cashless policies cover piles, fissure, and fistula surgeries. We are empanelled with Star Health, Niva Bupa, HDFC Ergo, Care Health, CGHS, and ECHS. Our billing desk handles all prior-authorisation paperwork on your behalf.",
  },
  {
    q: "What is the difference between laser and stapler surgery?",
    a: "Stapler (MIPH) surgery uses a circular stapling device and carries risks of staple-line bleeding and stenosis. Laser treatment (LHP) is incision-free, has zero suture-related complications, shorter procedure time (20 min vs 45 min), and significantly less post-op pain. Laser is now the globally preferred first-line option for Grade 2–3 haemorrhoids.",
  },
];

const accreditations = ["NABH", "USFDA Approved Laser", "ISO 9001:2015", "CGHS Empanelled", "100% Confidential"];

// ─── COMPONENT ───────────────────────────────────────────────────────────────

export default function PilesPage() {
  const [form, setForm] = useState({ name: "", phone: "", city: "", service: "Piles (Proctology)" });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { error } = await supabase.from("leads").insert([form]);
      if (error) throw error;
      setSubmitted(true);
    } catch {
      alert("Connectivity issue. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header />
      <main className="pt-20 bg-white overflow-x-hidden">

        {/* ══════════════════════════════════════════════════════
            HERO
        ══════════════════════════════════════════════════════ */}
        <section className="relative bg-[#0A1628] min-h-screen flex items-center py-24 px-6 overflow-hidden">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-teal-500/10 rounded-full blur-[140px]" />
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-orange-500/8 rounded-full blur-[120px]" />
            <div className="absolute inset-0 opacity-[0.03]"
              style={{ backgroundImage: "linear-gradient(#fff 1px,transparent 1px),linear-gradient(90deg,#fff 1px,transparent 1px)", backgroundSize: "60px 60px" }} />
          </div>

          <div className="max-w-7xl mx-auto w-full flex flex-col lg:flex-row items-center gap-20 relative z-10">

            {/* Left */}
            <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="lg:w-1/2">
              <div className="inline-flex items-center gap-2.5 bg-white/8 border border-white/10 px-4 py-2 rounded-full mb-8">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-teal-400" />
                </span>
                <span className="text-teal-400 text-[11px] font-bold uppercase tracking-[2px]">USFDA Approved Laser Proctology</span>
              </div>

              <h1 className="text-5xl lg:text-[72px] font-black text-white leading-[1.05] mb-6 tracking-tight">
                Pain-Free <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-amber-400 to-teal-400">
                  Piles Relief.
                </span>
              </h1>

              <p className="text-lg text-slate-400 max-w-lg mb-10 leading-relaxed font-light">
                India's leading laser proctology centre — treated in 30 minutes, home the same day, back to life in 48 hours. Handled with complete confidentiality.
              </p>

              <div className="flex flex-wrap gap-3 mb-12">
                {accreditations.map((a) => (
                  <span key={a} className="flex items-center gap-1.5 bg-white/6 border border-white/10 text-slate-300 text-xs font-semibold px-3 py-1.5 rounded-full">
                    <ShieldCheck size={12} className="text-teal-400" /> {a}
                  </span>
                ))}
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-8 border-t border-white/8">
                {stats.map(({ value, label, icon: Icon }, i) => (
                  <motion.div key={i} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 + i * 0.1 }}>
                    <div className="text-2xl font-black text-white mb-1">{value}</div>
                    <div className="text-[11px] text-slate-500 font-semibold uppercase tracking-wider leading-tight">{label}</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Form */}
            <motion.div initial={{ opacity: 0, scale: 0.94 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.7, delay: 0.15 }} className="lg:w-5/12 w-full">
              {submitted ? (
                <div className="bg-white rounded-[36px] p-12 shadow-2xl text-center">
                  <div className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle2 size={44} className="text-emerald-500" />
                  </div>
                  <h2 className="text-2xl font-black text-slate-900 mb-3">Request Confirmed!</h2>
                  <p className="text-slate-500 leading-relaxed mb-8">
                    Our senior medical counsellor will call you within <span className="text-[#0F766E] font-bold">15 minutes</span> for a private, confidential consultation.
                  </p>
                  <button onClick={() => setSubmitted(false)} className="text-teal-600 text-sm font-bold underline underline-offset-4">
                    Book for another patient
                  </button>
                </div>
              ) : (
                <div className="bg-white rounded-[36px] p-8 shadow-[0_32px_80px_rgba(0,0,0,0.35)]">
                  <div className="mb-7">
                    <div className="inline-block bg-teal-50 text-teal-700 text-[11px] font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-3">
                      Private & Confidential
                    </div>
                    <h2 className="text-2xl font-black text-slate-900">Consult a Specialist</h2>
                    <p className="text-slate-400 text-sm mt-1">Free expert call, no awkward waiting rooms.</p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                      type="text" placeholder="Patient Name" required
                      className="w-full px-4 py-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-slate-900 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-teal-500 placeholder:text-slate-400 transition"
                      value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
                    />
                    <input
                      type="tel" placeholder="WhatsApp / Phone Number" required
                      className="w-full px-4 py-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-slate-900 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-teal-500 placeholder:text-slate-400 transition"
                      value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    />
                    <div className="relative">
                      <select
                        required
                        className="w-full px-4 py-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-teal-500 appearance-none cursor-pointer transition"
                        style={{ color: form.city ? "#0F172A" : "#94A3B8" }}
                        value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })}
                      >
                        <option value="">Select Your City</option>
                        {["Delhi NCR", "Mumbai", "Pune", "Bangalore", "Chennai", "Hyderabad", "Other"].map(c => (
                          <option key={c} value={c}>{c}</option>
                        ))}
                      </select>
                      <MapPin size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                    </div>
                    <select
                      className="w-full px-4 py-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-slate-900 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-teal-500 cursor-pointer transition"
                      value={form.service} onChange={(e) => setForm({ ...form, service: e.target.value })}
                    >
                      <option value="Piles (Proctology)">Piles / Haemorrhoids</option>
                      <option value="Fissure">Anal Fissure</option>
                      <option value="Fistula">Fistula-in-Ano</option>
                      <option value="Pilonidal Sinus">Pilonidal Sinus</option>
                      <option value="Rectal Prolapse">Rectal Prolapse</option>
                      <option value="Screening">Colorectal Screening</option>
                    </select>

                    <button
                      disabled={loading}
                      className="w-full py-4 bg-[#0F766E] hover:bg-[#0D6460] disabled:bg-teal-300 text-white rounded-2xl font-black text-base flex items-center justify-center gap-2 shadow-lg shadow-teal-900/25 transition-all"
                    >
                      {loading ? (
                        <span className="animate-pulse">Booking your slot…</span>
                      ) : (
                        <> Get Free Expert Call <ArrowRight size={18} /> </>
                      )}
                    </button>
                  </form>

                  <p className="text-center text-xs text-slate-400 mt-4">
                    🔒 100% private · Your details are never shared
                  </p>
                </div>
              )}
            </motion.div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════
            MARQUEE STRIP
        ══════════════════════════════════════════════════════ */}
        <div className="bg-[#0F766E] py-3 overflow-hidden">
          <div className="flex gap-12 animate-[marquee_25s_linear_infinite] whitespace-nowrap">
            {[...Array(3)].flatMap(() =>
              ["Laser Piles Treatment", "USFDA Approved", "Same-Day Discharge", "No Cuts · No Stitches", "25,000+ Procedures", "100% Confidential", "0% EMI Available", "CGHS & Insurance Accepted"]
            ).map((item, i) => (
              <span key={i} className="text-white/90 text-sm font-semibold tracking-wide flex items-center gap-3">
                <span className="text-teal-200">✦</span> {item}
              </span>
            ))}
          </div>
          <style>{`@keyframes marquee { from{transform:translateX(0)} to{transform:translateX(-33.33%)} }`}</style>
        </div>

        {/* ══════════════════════════════════════════════════════
            TREATMENTS GRID
        ══════════════════════════════════════════════════════ */}
        <section className="py-28 max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="inline-block bg-teal-50 text-teal-700 text-[11px] font-bold uppercase tracking-[2px] px-4 py-1.5 rounded-full mb-4">
              Our Laser Expertise
            </div>
            <h2 className="text-4xl lg:text-5xl font-black text-slate-900 leading-tight mb-4">
              Advanced Minimally Invasive<br />Proctology Care
            </h2>
            <p className="text-slate-500 text-lg max-w-xl mx-auto font-light leading-relaxed">
              Every procedure is performed by super-specialist surgeons using USFDA-approved laser technology.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {treatments.map((t, i) => {
              const Icon = t.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 28 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  whileHover={{ y: -6 }}
                  className={`relative p-8 bg-gradient-to-br ${t.bg} rounded-3xl border ${t.border} cursor-pointer group transition-all duration-300 hover:shadow-xl`}
                >
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300"
                    style={{ background: t.accent + "15" }}>
                    <Icon size={24} style={{ color: t.accent }} />
                  </div>
                  <div className="inline-block text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full mb-4"
                    style={{ background: t.accent + "18", color: t.accent }}>
                    {t.tag}
                  </div>
                  <h3 className="text-xl font-black text-slate-900 mb-3">{t.title}</h3>
                  <p className="text-slate-600 text-sm leading-relaxed font-light">{t.desc}</p>
                  <div className="mt-6 flex items-center gap-1.5 text-sm font-bold transition-all" style={{ color: t.accent }}>
                    Learn more <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════
            TECHNOLOGY / PROCESS
        ══════════════════════════════════════════════════════ */}
        <section className="py-28 bg-slate-50">
          <div className="max-w-7xl mx-auto px-6 flex flex-col lg:flex-row items-center gap-20">
            {/* Left visual */}
            <div className="lg:w-1/2 relative">
              <div className="aspect-[4/5] rounded-[56px] overflow-hidden shadow-2xl relative bg-[#0A1628]">
                <Image
                  src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=800"
                  alt="Laser Proctology Care"
                  fill className="object-cover opacity-70 mix-blend-luminosity hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute bottom-8 left-6 right-6 bg-white/10 backdrop-blur-md border border-white/15 rounded-3xl p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-orange-500 rounded-xl flex items-center justify-center">
                      <Flame size={18} className="text-white" />
                    </div>
                    <div>
                      <div className="text-orange-300 text-[10px] font-bold uppercase tracking-widest">1470nm Diode Laser</div>
                      <div className="text-white text-sm font-bold">USFDA Approved System</div>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-3">
                    {[["30 Min", "Procedure"], ["48 Hrs", "Recovery"], ["0", "Stitches"]].map(([v, l]) => (
                      <div key={l} className="text-center">
                        <div className="text-orange-300 text-lg font-black">{v}</div>
                        <div className="text-slate-400 text-[10px] font-semibold">{l}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="absolute -bottom-6 -right-6 bg-white border border-slate-100 rounded-3xl p-6 shadow-xl max-w-[220px]">
                <p className="text-[#0F766E] font-black text-sm flex items-center gap-1.5 mb-2">
                  <Activity size={16} /> Quick Discharge
                </p>
                <p className="text-slate-500 text-xs leading-relaxed">
                  95% of laser patients resume light activity within <strong className="text-slate-700">48 hours</strong>.
                </p>
              </div>
            </div>

            {/* Right steps */}
            <div className="lg:w-1/2">
              <div className="inline-block bg-teal-50 text-teal-700 text-[11px] font-bold uppercase tracking-[2px] px-4 py-1.5 rounded-full mb-5">
                Modern Care Protocol
              </div>
              <h2 className="text-4xl lg:text-5xl font-black text-slate-900 mb-5 leading-tight tracking-tight">
                Treated Today.<br />Recovered Tomorrow.
              </h2>
              <p className="text-slate-500 text-base leading-relaxed mb-12 font-light">
                Our daycare laser protocol means no hospital admission, no long recovery, and no disruption to your work or family life.
              </p>

              <div className="space-y-10">
                {steps.map((step, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: 24 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.15 }}
                    className="flex gap-7 group"
                  >
                    <div className="w-16 h-16 bg-white border-2 border-slate-200 text-[#0F766E] rounded-[22px] flex items-center justify-center shrink-0 font-black text-xl group-hover:bg-[#0F766E] group-hover:text-white group-hover:border-[#0F766E] transition-all duration-300">
                      {step.idx}
                    </div>
                    <div className="pt-1">
                      <h4 className="font-black text-xl text-slate-900 mb-2">{step.title}</h4>
                      <p className="text-slate-500 text-sm leading-relaxed font-light">{step.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              <button
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                className="mt-12 flex items-center gap-2 text-[#0F766E] font-black text-base group"
              >
                Start your recovery journey <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════
            DOCTORS
        ══════════════════════════════════════════════════════ */}
        <section className="py-28 bg-[#0A1628]">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <div className="inline-block bg-teal-500/10 border border-teal-500/20 text-teal-400 text-[11px] font-bold uppercase tracking-[2px] px-4 py-1.5 rounded-full mb-4">
                Our Surgeons
              </div>
              <h2 className="text-4xl lg:text-5xl font-black text-white leading-tight mb-4">
                Specialists Who Understand<br />Your Condition
              </h2>
              <p className="text-slate-500 text-base max-w-md mx-auto font-light">
                Our proctologists have trained internationally and performed thousands of laser procedures — with full respect for your privacy.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {doctors.map((d, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.12 }}
                  whileHover={{ y: -6 }}
                  className="bg-white/5 border border-white/8 rounded-3xl p-8 cursor-pointer transition-all duration-300 hover:bg-white/8"
                >
                  <div className="flex items-center gap-4 mb-6">
                    <div
                      className="w-16 h-16 rounded-2xl flex items-center justify-center text-xl font-black shrink-0"
                      style={{ background: d.color + "25", color: d.color, border: `2px solid ${d.color}35` }}
                    >
                      {d.initials}
                    </div>
                    <div>
                      <div className="text-white font-black text-base">{d.name}</div>
                      <div className="text-slate-400 text-xs font-medium mt-0.5">{d.title}</div>
                    </div>
                  </div>
                  <p className="text-slate-500 text-xs leading-relaxed mb-6 font-light">{d.qualifications}</p>
                  <div className="grid grid-cols-2 gap-3">
                    {[{ v: d.procedures, l: "Procedures" }, { v: d.exp, l: "Experience" }].map(({ v, l }) => (
                      <div key={l} className="bg-white/5 rounded-2xl p-4 text-center">
                        <div className="font-black text-lg" style={{ color: d.color }}>{v}</div>
                        <div className="text-slate-500 text-[10px] font-semibold mt-0.5">{l}</div>
                      </div>
                    ))}
                  </div>
                  <button
                    className="w-full mt-5 py-3 rounded-2xl border text-sm font-bold transition-all"
                    style={{ borderColor: d.color + "40", color: d.color }}
                    onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = d.color + "15" }}
                    onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = "transparent" }}
                  >
                    Book with {d.name.split(" ")[1]}
                  </button>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════
            TESTIMONIALS
        ══════════════════════════════════════════════════════ */}
        <section className="py-28 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <div className="inline-block bg-amber-50 text-amber-700 text-[11px] font-bold uppercase tracking-[2px] px-4 py-1.5 rounded-full mb-4">
                Patient Stories
              </div>
              <h2 className="text-4xl lg:text-5xl font-black text-slate-900 leading-tight">
                Real People.<br />Real Relief.
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {testimonials.map((t, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.12 }}
                  className="bg-slate-50 border border-slate-100 rounded-3xl p-8 flex flex-col"
                >
                  <div className="flex gap-1 mb-5">
                    {Array.from({ length: t.stars }).map((_, si) => (
                      <Star key={si} size={14} fill="#F59E0B" className="text-amber-400" />
                    ))}
                  </div>
                  <p className="text-slate-700 text-sm leading-relaxed italic flex-1 mb-6">"{t.text}"</p>
                  <div className="flex items-center gap-3 pt-5 border-t border-slate-200">
                    <div className="w-11 h-11 rounded-full bg-teal-100 flex items-center justify-center text-teal-700 font-black text-sm">
                      {t.name.split(" ").map(n => n[0]).join("")}
                    </div>
                    <div>
                      <div className="font-bold text-slate-900 text-sm">{t.name}, {t.age}</div>
                      <div className="text-slate-400 text-xs flex items-center gap-1 mt-0.5">
                        <MapPin size={10} /> {t.city} · {t.treatment}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Rating strip */}
            <div className="mt-16 bg-teal-50 border border-teal-100 rounded-3xl p-8 flex flex-wrap items-center justify-between gap-6">
              <div>
                <div className="text-3xl font-black text-slate-900">4.9 / 5.0</div>
                <div className="flex gap-1 mt-1 mb-2">
                  {[...Array(5)].map((_, i) => <Star key={i} size={14} fill="#F59E0B" className="text-amber-400" />)}
                </div>
                <div className="text-slate-500 text-sm">Based on 5,200+ verified reviews</div>
              </div>
              <div className="flex gap-8 flex-wrap">
                {[["Google", "4.9★", "2,800 reviews"], ["Practo", "4.8★", "1,400 reviews"], ["JustDial", "4.9★", "1,000 reviews"]].map(([src, rating, count]) => (
                  <div key={src} className="text-center">
                    <div className="text-slate-900 font-black text-lg">{rating}</div>
                    <div className="text-[#0F766E] font-bold text-sm">{src}</div>
                    <div className="text-slate-400 text-xs">{count}</div>
                  </div>
                ))}
              </div>
              <a href="#" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                className="flex items-center gap-2 bg-[#0F766E] text-white px-6 py-3.5 rounded-2xl font-bold text-sm hover:bg-[#0D6460] transition-colors shadow-lg shadow-teal-900/20">
                Book Your Consultation <ArrowRight size={16} />
              </a>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════
            FAQ
        ══════════════════════════════════════════════════════ */}
        <section className="py-28 bg-slate-50">
          <div className="max-w-3xl mx-auto px-6">
            <div className="text-center mb-14">
              <div className="inline-block bg-violet-50 text-violet-700 text-[11px] font-bold uppercase tracking-[2px] px-4 py-1.5 rounded-full mb-4">
                FAQs
              </div>
              <h2 className="text-4xl lg:text-5xl font-black text-slate-900 leading-tight">
                Honest Answers to<br />Common Questions.
              </h2>
            </div>

            <div className="space-y-0 divide-y divide-slate-200 border-t border-slate-200">
              {faqs.map((faq, i) => (
                <div key={i} className="py-6 cursor-pointer group" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                  <div className="flex justify-between items-start gap-4">
                    <h4 className="font-bold text-slate-900 text-base leading-snug group-hover:text-[#0F766E] transition-colors">{faq.q}</h4>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-all duration-200 ${openFaq === i ? "bg-[#0F766E] text-white" : "bg-slate-100 text-slate-500"}`}>
                      <ChevronDown size={16} className={`transition-transform duration-200 ${openFaq === i ? "rotate-180" : ""}`} />
                    </div>
                  </div>
                  <AnimatePresence>
                    {openFaq === i && (
                      <motion.p
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.25 }}
                        className="text-slate-500 text-sm leading-relaxed mt-4 overflow-hidden font-light"
                      >
                        {faq.a}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════
            CTA BAND
        ══════════════════════════════════════════════════════ */}
        <section className="py-24 bg-[#0F766E] relative overflow-hidden">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-0 right-0 w-80 h-80 bg-teal-400/20 rounded-full blur-[100px]" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-emerald-600/30 rounded-full blur-[80px]" />
          </div>
          <div className="max-w-3xl mx-auto px-6 text-center relative z-10">
            <h2 className="text-4xl lg:text-5xl font-black text-white leading-tight mb-5">
              Stop Suffering in Silence.<br />Relief Is 30 Minutes Away.
            </h2>
            <p className="text-teal-100 text-lg mb-10 font-light leading-relaxed">
              Book a free, private consultation today. No waiting room. No embarrassment. Just expert care delivered with dignity.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <a href="#"
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                className="flex items-center gap-2 bg-white text-[#0F766E] px-8 py-4 rounded-2xl font-black text-base shadow-xl hover:shadow-2xl transition-all hover:-translate-y-0.5">
                Get Free Expert Call <ArrowRight size={18} />
              </a>
              <a href="tel:+911800000000"
                className="flex items-center gap-2 bg-white/15 border border-white/30 text-white px-8 py-4 rounded-2xl font-bold text-base hover:bg-white/20 transition-all">
                <Phone size={18} /> 1800-000-0000
              </a>
            </div>
            <p className="text-teal-200/70 text-xs mt-6">Mon – Sat, 8 AM – 8 PM · Delhi · Mumbai · Pune · Bangalore · Hyderabad</p>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}