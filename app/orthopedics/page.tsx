"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  Activity, Bone, Stethoscope, Zap, CheckCircle2,
  ArrowRight, MapPin, ShieldCheck, Award, Clock, Users,
  ChevronDown, Star, Phone, Microscope, HeartPulse
} from "lucide-react";

// ─── DATA ───────────────────────────────────────────────────────────────────

const treatments = [
  {
    title: "Knee Replacement",
    desc: "Robotic-assisted MAKOplasty® for total and partial knee replacement. Personalised 3D CT planning ensures a perfect fit — less pain, faster return to life.",
    icon: Bone,
    accent: "#0F766E",
    bg: "from-teal-50 to-emerald-50",
    border: "border-teal-100",
    badge: "Most Requested",
  },
  {
    title: "Hip Replacement",
    desc: "Anterior-approach minimally invasive hip surgery. Smaller incision, preserved muscle integrity, and most patients walking the same day.",
    icon: Activity,
    accent: "#1D4ED8",
    bg: "from-blue-50 to-indigo-50",
    border: "border-blue-100",
    badge: "",
  },
  {
    title: "Spine & Slip Disc",
    desc: "Endoscopic MISS technique for herniated discs, sciatica, and spinal stenosis. Day-care procedure with keyhole incision — no large cuts, no long ICU stays.",
    icon: Stethoscope,
    accent: "#7C3AED",
    bg: "from-violet-50 to-purple-50",
    border: "border-violet-100",
    badge: "Advanced",
  },
  {
    title: "Sports Injuries",
    desc: "Arthroscopic ACL/PCL/MCL reconstruction and rotator cuff repair using anatomic graft techniques. Trusted by professional athletes across India.",
    icon: Zap,
    accent: "#EA580C",
    bg: "from-orange-50 to-amber-50",
    border: "border-orange-100",
    badge: "",
  },
  {
    title: "Fracture Care",
    desc: "Emergency and elective fracture fixation using bio-compatible titanium implants. Complex peri-articular fractures managed with ORIF precision.",
    icon: HeartPulse,
    accent: "#BE185D",
    bg: "from-pink-50 to-rose-50",
    border: "border-pink-100",
    badge: "",
  },
  {
    title: "Bone Tumour Surgery",
    desc: "Limb-salvage oncology surgery for benign and malignant bone tumours. Reconstruction with custom mega-prostheses to restore function after tumour removal.",
    icon: Microscope,
    accent: "#0369A1",
    bg: "from-sky-50 to-cyan-50",
    border: "border-sky-100",
    badge: "Specialised",
  },
];

const stats = [
  { value: "15,000+", label: "Joints Replaced", icon: Award },
  { value: "98.5%",   label: "Surgical Success Rate", icon: ShieldCheck },
  { value: "20+",     label: "Years of Excellence", icon: Clock },
  { value: "50,000+", label: "Lives Transformed", icon: Users },
];

const steps = [
  {
    idx: "01",
    title: "Digital 3D Planning",
    desc: "CT-scan data is converted into a precise 3D model of your anatomy. Your implant is virtually placed before the first incision, eliminating guesswork entirely.",
  },
  {
    idx: "02",
    title: "Robotic-Arm Execution",
    desc: "The MAKOplasty® robotic arm guides every cut within 0.3 mm accuracy — sparing healthy bone and soft tissue that traditional surgery cannot protect.",
  },
  {
    idx: "03",
    title: "Personalised Fast-Track Rehab",
    desc: "Your dedicated physio begins targeted exercises within hours of surgery. Most patients go home in 2 days; many return to daily routines within 3 weeks.",
  },
];

const doctors = [
  {
    name: "Dr. Rajesh Mehta",
    title: "Sr. Consultant — Knee & Hip",
    exp: "22 Years",
    surgeries: "8,000+",
    initials: "RM",
    color: "#0F766E",
    qualifications: "MS Ortho · FRCS (Edinburgh) · Fellowship, HSS New York",
  },
  {
    name: "Dr. Sunita Kapoor",
    title: "Sr. Consultant — Spine Surgery",
    exp: "18 Years",
    surgeries: "5,500+",
    initials: "SK",
    color: "#7C3AED",
    qualifications: "MCh Spine · AO Spine Fellow · ISASS Member",
  },
  {
    name: "Dr. Arjun Verma",
    title: "Consultant — Sports Medicine",
    exp: "15 Years",
    surgeries: "3,200+",
    initials: "AV",
    color: "#1D4ED8",
    qualifications: "DNB Ortho · Sports Medicine, IOC Diploma · FIFA Medical Centre",
  },
];

const testimonials = [
  {
    name: "Priya Sharma",
    city: "Delhi",
    age: 58,
    treatment: "Knee Replacement",
    text: "I had been in pain for six years. After Dr. Mehta's robotic surgery I walked the same evening — something I thought was impossible. The whole team was warm, thorough, and genuinely caring.",
    stars: 5,
  },
  {
    name: "Rajan Nair",
    city: "Mumbai",
    age: 44,
    treatment: "Spine Surgery",
    text: "My sciatica had made sitting unbearable. The endoscopic procedure left barely a scar and I was off pain medication in four days. Unbelievable turnaround.",
    stars: 5,
  },
  {
    name: "Meena Bose",
    city: "Pune",
    age: 31,
    treatment: "ACL Reconstruction",
    text: "As a state-level cricketer I was devastated by my ACL tear. Dr. Verma's team had me back on the field in exactly six months. Couldn't have asked for more.",
    stars: 5,
  },
];

const faqs = [
  {
    q: "How long does recovery after knee replacement take?",
    a: "With our robotic fast-track protocol, most patients walk within 24 hours and go home in 2–3 days. Full functional recovery — driving, stairs, light sport — typically takes 6–8 weeks. Traditional surgery takes 3–4 months for the same milestones.",
  },
  {
    q: "Is robotic surgery significantly safer?",
    a: "Yes. Studies show robotic-assisted joint replacement reduces implant malpositioning by 80%, blood loss by 40%, and post-op pain scores by 35% compared to conventional technique. It also lowers revision surgery risk substantially.",
  },
  {
    q: "What EMI and insurance options are available?",
    a: "We offer 0% EMI for 6, 12, and 24 months via HDFC, ICICI, and Bajaj Finserv. We are empanelled with all major TPAs and accept CGHS, ECHS, Star Health, Niva Bupa, Care Health, and over 30 other insurers. Our billing team handles all pre-auth paperwork.",
  },
  {
    q: "How do I know if I need a joint replacement?",
    a: "Key indicators: persistent pain despite 3+ months of medication, X-ray showing bone-on-bone contact, inability to perform daily activities, significant stiffness in the morning. Book a Free Bone Health Audit — our specialists will review your scans and give an honest assessment.",
  },
  {
    q: "Do you treat patients from outside the city?",
    a: "Absolutely. We have a dedicated out-of-city patient desk that arranges accommodation, airport pickup, telemedicine follow-ups, and coordinates with your local physiotherapist for rehab. Patients from 22 states and 8 countries have been treated with us.",
  },
];

const accreditations = ["NABH", "ISO 9001:2015", "JCI Accredited", "NABL Lab", "CGHS Empanelled"];

// ─── COMPONENT ─────────────────────────────────────────────────────────────

export default function OrthopedicsPage() {
  const [form, setForm] = useState({ name: "", phone: "", city: "", service: "Orthopedics" });
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
      setForm({ name: "", phone: "", city: "", service: "Orthopedics" });
    } catch {
      alert("Error saving lead. Please check your internet connection.");
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
          {/* Decorative mesh */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-teal-500/10 rounded-full blur-[140px]" />
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-violet-500/10 rounded-full blur-[120px]" />
            {/* Subtle grid */}
            <div className="absolute inset-0 opacity-[0.03]"
              style={{ backgroundImage: "linear-gradient(#fff 1px,transparent 1px),linear-gradient(90deg,#fff 1px,transparent 1px)", backgroundSize: "60px 60px" }} />
          </div>

          <div className="max-w-7xl mx-auto w-full flex flex-col lg:flex-row items-center gap-20 relative z-10">

            {/* Left */}
            <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="lg:w-1/2">
              {/* Live badge */}
              <div className="inline-flex items-center gap-2.5 bg-white/8 border border-white/10 px-4 py-2 rounded-full mb-8">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-teal-400" />
                </span>
                <span className="text-teal-400 text-[11px] font-bold uppercase tracking-[2px]">India's #1 Robotic Joint Centre</span>
              </div>

              <h1 className="text-5xl lg:text-[72px] font-black text-white leading-[1.05] mb-6 tracking-tight">
                Regain Your <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 via-emerald-400 to-teal-300">
                  Mobility.
                </span>
              </h1>

              <p className="text-lg text-slate-400 max-w-lg mb-10 leading-relaxed font-light">
                Robotic-precision surgery for Knee, Hip, and Spine conditions — with 0% EMI, NABH-accredited care, and a team trusted by 50,000+ patients.
              </p>

              {/* Trust chips */}
              <div className="flex flex-wrap gap-3 mb-12">
                {accreditations.map((a) => (
                  <span key={a} className="flex items-center gap-1.5 bg-white/6 border border-white/10 text-slate-300 text-xs font-semibold px-3 py-1.5 rounded-full">
                    <ShieldCheck size={12} className="text-teal-400" /> {a}
                  </span>
                ))}
              </div>

              {/* Stat row */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-8 border-t border-white/8">
                {stats.map(({ value, label, icon: Icon }, i) => (
                  <motion.div key={i} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 + i * 0.1 }}>
                    <div className="text-2xl font-black text-white mb-1">{value}</div>
                    <div className="text-[11px] text-slate-500 font-semibold uppercase tracking-wider leading-tight">{label}</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Form card */}
            <motion.div initial={{ opacity: 0, scale: 0.94 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.7, delay: 0.15 }} className="lg:w-5/12 w-full">
              {submitted ? (
                <div className="bg-white rounded-[36px] p-12 shadow-2xl text-center">
                  <div className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle2 size={44} className="text-emerald-500" />
                  </div>
                  <h2 className="text-2xl font-black text-slate-900 mb-3">You're All Set!</h2>
                  <p className="text-slate-500 leading-relaxed mb-8">
                    Our senior orthopaedic coordinator will call you within <span className="text-[#0F766E] font-bold">30 minutes</span> to confirm your slot.
                  </p>
                  <button onClick={() => setSubmitted(false)} className="text-[#0F766E] text-sm font-bold underline underline-offset-4">
                    Submit another request
                  </button>
                </div>
              ) : (
                <div className="bg-white rounded-[36px] p-8 shadow-[0_32px_80px_rgba(0,0,0,0.35)]">
                  <div className="mb-7">
                    <div className="inline-block bg-teal-50 text-teal-700 text-[11px] font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-3">
                      No charges · No commitment
                    </div>
                    <h2 className="text-2xl font-black text-slate-900">Free Bone Health Audit</h2>
                    <p className="text-slate-400 text-sm mt-1">Expert second opinion within the day.</p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                      type="text" placeholder="Patient Full Name" required
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
                      <option value="Orthopedics">General Orthopaedics</option>
                      <option value="Knee Replacement">Knee Replacement</option>
                      <option value="Hip Replacement">Hip Replacement</option>
                      <option value="Spine Surgery">Spine / Disc Surgery</option>
                      <option value="Sports Injury">Sports Injury / ACL</option>
                      <option value="Fracture">Fracture Care</option>
                    </select>

                    <button
                      disabled={loading}
                      className="w-full py-4 bg-[#0F766E] hover:bg-[#0D6460] disabled:bg-teal-300 text-white rounded-2xl font-black text-base flex items-center justify-center gap-2 shadow-lg shadow-teal-900/25 transition-all"
                    >
                      {loading ? (
                        <span className="animate-pulse">Booking your slot…</span>
                      ) : (
                        <> Consult a Top Surgeon <ArrowRight size={18} /> </>
                      )}
                    </button>
                  </form>

                  <p className="text-center text-xs text-slate-400 mt-4">
                    🔒 100% private · We never share your details
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
              ["Robotic Joint Replacement", "NABH Accredited", "0% EMI Available", "15,000+ Surgeries", "Same-Day Walking Protocol", "CGHS & Insurance Accepted", "20+ Years of Excellence"]
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
              Our Specialties
            </div>
            <h2 className="text-4xl lg:text-5xl font-black text-slate-900 leading-tight mb-4">
              World-Class Care for<br />Every Bone & Joint
            </h2>
            <p className="text-slate-500 text-lg max-w-xl mx-auto font-light leading-relaxed">
              From routine to complex — all procedures performed by super-specialists using the latest technology.
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
                  {t.badge && (
                    <div className="absolute top-6 right-6 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full"
                      style={{ background: t.accent + "18", color: t.accent }}>
                      {t.badge}
                    </div>
                  )}
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6"
                    style={{ background: t.accent + "15" }}>
                    <Icon size={24} style={{ color: t.accent }} />
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
            {/* Left visual panel */}
            <div className="lg:w-1/2 relative">
              <div className="aspect-[4/5] rounded-[56px] overflow-hidden shadow-2xl relative bg-[#0A1628]">
                <Image
                  src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=800"
                  alt="Robotic Orthopedic Surgery"
                  fill className="object-cover opacity-70 mix-blend-luminosity"
                />
                {/* Overlay data card */}
                <div className="absolute bottom-8 left-6 right-6 bg-white/10 backdrop-blur-md border border-white/15 rounded-3xl p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-teal-500 rounded-xl flex items-center justify-center">
                      <Activity size={18} className="text-white" />
                    </div>
                    <div>
                      <div className="text-teal-300 text-[10px] font-bold uppercase tracking-widest">MAKOplasty® Active</div>
                      <div className="text-white text-sm font-bold">Robotic Arm Engaged</div>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-3">
                    {[["0.3mm", "Accuracy"], ["40%", "Less Pain"], ["2x", "Faster Heal"]].map(([v, l]) => (
                      <div key={l} className="text-center">
                        <div className="text-teal-300 text-lg font-black">{v}</div>
                        <div className="text-slate-400 text-[10px] font-semibold">{l}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Floating recovery badge */}
              <div className="absolute -bottom-6 -right-6 bg-white border border-slate-100 rounded-3xl p-6 shadow-xl max-w-[220px]">
                <p className="text-[#0F766E] font-black text-sm flex items-center gap-1.5 mb-2">
                  <Activity size={16} /> Fast-Track Recovery
                </p>
                <p className="text-slate-500 text-xs leading-relaxed">
                  Most patients walk within <strong className="text-slate-700">24 hours</strong> of robotic surgery — not weeks.
                </p>
              </div>
            </div>

            {/* Right steps */}
            <div className="lg:w-1/2">
              <div className="inline-block bg-teal-50 text-teal-700 text-[11px] font-bold uppercase tracking-[2px] px-4 py-1.5 rounded-full mb-5">
                Our Technology
              </div>
              <h2 className="text-4xl lg:text-5xl font-black text-slate-900 mb-5 leading-tight tracking-tight">
                Your Path to a<br />Pain-Free Life
              </h2>
              <p className="text-slate-500 text-base leading-relaxed mb-12 font-light">
                Every surgery is built around your unique anatomy — from planning to the first step of recovery, nothing is left to chance.
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
                India's Most Trusted<br />Orthopaedic Specialists
              </h2>
              <p className="text-slate-500 text-base max-w-md mx-auto font-light">
                Every surgeon on our team has trained at globally renowned institutions and performed thousands of successful procedures.
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
                    {[{ v: d.surgeries, l: "Surgeries" }, { v: d.exp, l: "Experience" }].map(({ v, l }) => (
                      <div key={l} className="bg-white/5 rounded-2xl p-4 text-center">
                        <div className="font-black text-lg" style={{ color: d.color }}>{v}</div>
                        <div className="text-slate-500 text-[10px] font-semibold mt-0.5">{l}</div>
                      </div>
                    ))}
                  </div>

                  <button className="w-full mt-5 py-3 rounded-2xl border text-sm font-bold transition-all"
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
                Lives Changed.<br />Mobility Restored.
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
                  {/* Stars */}
                  <div className="flex gap-1 mb-5">
                    {Array.from({ length: t.stars }).map((_, si) => (
                      <Star key={si} size={14} fill="#F59E0B" className="text-amber-400" />
                    ))}
                  </div>

                  <p className="text-slate-700 text-sm leading-relaxed italic flex-1 mb-6">
                    "{t.text}"
                  </p>

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

            {/* Social proof strip */}
            <div className="mt-16 bg-teal-50 border border-teal-100 rounded-3xl p-8 flex flex-wrap items-center justify-between gap-6">
              <div>
                <div className="text-3xl font-black text-slate-900">4.9 / 5.0</div>
                <div className="flex gap-1 mt-1 mb-2">
                  {[...Array(5)].map((_, i) => <Star key={i} size={14} fill="#F59E0B" className="text-amber-400" />)}
                </div>
                <div className="text-slate-500 text-sm">Based on 3,800+ verified reviews</div>
              </div>
              <div className="flex gap-8 flex-wrap">
                {[["Google", "4.9★", "2,100 reviews"], ["Practo", "4.8★", "980 reviews"], ["JustDial", "4.9★", "740 reviews"]].map(([src, rating, count]) => (
                  <div key={src} className="text-center">
                    <div className="text-slate-900 font-black text-lg">{rating}</div>
                    <div className="text-[#0F766E] font-bold text-sm">{src}</div>
                    <div className="text-slate-400 text-xs">{count}</div>
                  </div>
                ))}
              </div>
              <a href="#consult" className="flex items-center gap-2 bg-[#0F766E] text-white px-6 py-3.5 rounded-2xl font-bold text-sm hover:bg-[#0D6460] transition-colors shadow-lg shadow-teal-900/20">
                Read All Stories <ArrowRight size={16} />
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
                Questions?<br />We Have Answers.
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
            FINAL CTA BAND
        ══════════════════════════════════════════════════════ */}
        <section className="py-24 bg-[#0F766E] relative overflow-hidden">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-0 right-0 w-80 h-80 bg-teal-400/20 rounded-full blur-[100px]" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-emerald-600/30 rounded-full blur-[80px]" />
          </div>
          <div className="max-w-3xl mx-auto px-6 text-center relative z-10">
            <h2 className="text-4xl lg:text-5xl font-black text-white leading-tight mb-5">
              Don't Let Pain Define<br />Your Life Any Longer.
            </h2>
            <p className="text-teal-100 text-lg mb-10 font-light leading-relaxed">
              Book a free, no-obligation Bone Health Audit today. Our specialists will review your condition and give you a clear, honest path forward.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <a href="#consult" className="flex items-center gap-2 bg-white text-[#0F766E] px-8 py-4 rounded-2xl font-black text-base shadow-xl hover:shadow-2xl transition-all hover:-translate-y-0.5">
                Book Free Consultation <ArrowRight size={18} />
              </a>
              <a href="tel:+911800000000" className="flex items-center gap-2 bg-white/15 border border-white/30 text-white px-8 py-4 rounded-2xl font-bold text-base hover:bg-white/20 transition-all">
                <Phone size={18} /> 1800-000-0000
              </a>
            </div>
            <p className="text-teal-200/70 text-xs mt-6">Mon – Sat, 8 AM – 8 PM · Delhi · Mumbai · Pune · Bangalore · Chennai</p>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}