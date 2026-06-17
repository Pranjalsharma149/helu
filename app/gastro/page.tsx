"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Image from "next/image";
import {
  CheckCircle2,
  Loader2,
  Microscope,
  Zap,
  Stethoscope,
  Leaf,
  ChevronDown,
  Phone,
  ArrowRight,
  BadgeCheck,
  Users,
  Star,
  Clock,
  Award,
  Wallet,
  ShieldCheck,
  AlertCircle,
  HeartPulse,
  Activity,
  Pill,
} from "lucide-react";

export default function GastroPage() {
  const [form, setForm] = useState({ name: "", phone: "", service: "Gastroenterology" });
  const [phoneError, setPhoneError] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const treatments = [
    {
      title: "Laparoscopic Surgery",
      badge: "Keyhole Precision",
      badgeColor: "bg-blue-500",
      desc: "Advanced keyhole surgery for Gallbladder stones, Hernia, Appendix removal, and Bowel resections. Minimal blood loss, tiny incisions, and discharge within 24–48 hours.",
      details: ["Gallbladder / Hernia", "3–5 tiny incisions", "24–48 hr discharge", "Near-zero blood loss"],
      icon: <Microscope className="text-blue-400" size={28} />,
    },
    {
      title: "Laser Piles Treatment",
      badge: "US-FDA Approved",
      badgeColor: "bg-orange-500",
      desc: "US-FDA approved laser procedure for Piles (Haemorrhoids), Anal Fissure, and Fistula. No cuts, no stitches, no recurrence — walk in and walk out the same day.",
      details: ["Grade I–IV Piles", "No cuts or stitches", "Same-day discharge", "No recurrence risk"],
      icon: <Zap className="text-orange-400" size={28} />,
    },
    {
      title: "Endoscopy & Colonoscopy",
      badge: "HD Diagnostic",
      badgeColor: "bg-teal-500",
      desc: "High-definition flexible endoscopy and colonoscopy for complete diagnosis of stomach ulcers, polyps, Crohn's disease, colon cancer screening, and bleeding disorders.",
      details: ["HD imaging cameras", "Biopsy if needed", "Polyp removal (polypectomy)", "ERCP for bile duct"],
      icon: <Stethoscope className="text-teal-400" size={28} />,
    },
    {
      title: "Liver & Digestive Care",
      badge: "Medical Management",
      badgeColor: "bg-green-500",
      desc: "Comprehensive non-surgical and surgical management for Fatty Liver, Hepatitis, Cirrhosis, GERD, Acid Reflux, IBS, and Chronic Gastritis.",
      details: ["Fatty Liver / Hepatitis", "GERD & Acid Reflux", "IBS management", "Liver function workup"],
      icon: <Leaf className="text-green-400" size={28} />,
    },
  ];

  const stats = [
    { value: "15,000+", label: "Procedures Done", icon: <Users size={20} /> },
    { value: "4.9 / 5", label: "Patient Rating", icon: <Star size={20} /> },
    { value: "24 Hrs", label: "Avg. Discharge", icon: <Clock size={20} /> },
    { value: "NABH", label: "Accredited Hospitals", icon: <Award size={20} /> },
  ];

  const conditions = [
    { name: "Gallbladder Stones", icon: <Activity size={16} /> },
    { name: "Hernia (Inguinal / Umbilical)", icon: <Activity size={16} /> },
    { name: "Piles & Fistula", icon: <Activity size={16} /> },
    { name: "Appendicitis", icon: <Activity size={16} /> },
    { name: "GERD & Acid Reflux", icon: <Activity size={16} /> },
    { name: "Fatty Liver Disease", icon: <Activity size={16} /> },
    { name: "Hepatitis B & C", icon: <Activity size={16} /> },
    { name: "Colon Cancer Screening", icon: <Activity size={16} /> },
    { name: "Irritable Bowel Syndrome", icon: <Activity size={16} /> },
    { name: "Stomach Ulcers (PUD)", icon: <Activity size={16} /> },
    { name: "Crohn's Disease / Colitis", icon: <Activity size={16} /> },
    { name: "Pancreatitis", icon: <Activity size={16} /> },
  ];

  const processSteps = [
    {
      step: "01",
      title: "Free Consultation",
      desc: "Our gastroenterologist reviews your symptoms, history, and prior reports to understand your condition and recommend the right diagnostic or surgical path.",
      icon: <Stethoscope size={22} className="text-orange-400" />,
    },
    {
      step: "02",
      title: "Diagnosis & Imaging",
      desc: "Endoscopy, colonoscopy, ultrasound, or blood tests as needed — all done at a NABH hospital near you. HD imaging for precise findings.",
      icon: <Microscope size={22} className="text-orange-400" />,
    },
    {
      step: "03",
      title: "Surgery or Treatment",
      desc: "Laparoscopic or laser procedure performed by a senior consultant. Most surgeries completed in 30–90 minutes under general or local anaesthesia.",
      icon: <Zap size={22} className="text-orange-400" />,
    },
    {
      step: "04",
      title: "Recovery & Follow-Up",
      desc: "Most patients discharge in 24–48 hours. Your dedicated care manager schedules follow-ups, diet guidance, and medication support until full recovery.",
      icon: <HeartPulse size={22} className="text-orange-400" />,
    },
  ];

  const faqs = [
    {
      q: "How do I know if I need laparoscopic surgery for gallstones?",
      a: "If you experience recurring upper-right abdominal pain (especially after fatty meals), nausea, bloating, or jaundice, gallstones may be the cause. An ultrasound can confirm. Laparoscopic cholecystectomy (gallbladder removal) is the gold standard treatment — done in under an hour with same-day or next-day discharge.",
    },
    {
      q: "Is laser piles treatment permanent?",
      a: "Yes. Laser haemorrhoidoplasty (LHP) has a very low recurrence rate compared to conventional surgery. The laser precisely seals the haemorrhoidal tissue with zero cuts, zero stitches, and minimal pain. Most patients resume work within 24–48 hours.",
    },
    {
      q: "Is endoscopy painful? Do I need anaesthesia?",
      a: "Upper endoscopy (gastroscopy) is done under mild sedation — you are asleep and feel nothing. Colonoscopy is done under monitored anaesthesia. The procedures typically take 15–30 minutes. You'll feel completely comfortable throughout.",
    },
    {
      q: "Can fatty liver be treated without surgery?",
      a: "In most cases, yes. Fatty liver (NAFLD/NASH) is managed through lifestyle changes, a structured diet plan, medication, and regular monitoring. Surgery is only considered in advanced cirrhosis cases. Our hepatologist will create a personalised care plan for you.",
    },
    {
      q: "Is the surgery covered by insurance?",
      a: "Yes. Laparoscopic surgeries (gallbladder, hernia, appendix), endoscopy, and most gastrointestinal procedures are covered under standard health insurance and government schemes (CGHS, ESI, ECHS). Our team handles all cashless TPA approvals — usually within 30 minutes.",
    },
    {
      q: "How quickly can surgery be scheduled?",
      a: "Once your diagnosis and eligibility are confirmed, we typically schedule surgery within 24–48 hours at a premium NABH hospital near you. For emergency cases like appendicitis or acute obstruction, same-day surgery can be arranged.",
    },
  ];

  const whatsappUrl = `https://wa.me/918882804301?text=${encodeURIComponent("Hello HealviaCare, I want to consult a gastroenterologist and know more about my treatment options.")}`;

  const validatePhone = (value: string) => {
    const cleaned = value.trim();
    if (!cleaned) return "Mobile number is required";
    if (!/^\d+$/.test(cleaned)) return "Mobile number must contain only digits";
    if (!/^[6-9]\d{9}$/.test(cleaned)) return "Enter a valid 10-digit mobile number";
    return "";
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Only allow digits, max 10 characters
    const digitsOnly = e.target.value.replace(/\D/g, "").slice(0, 10);
    setForm({ ...form, phone: digitsOnly });
    if (phoneError) {
      setPhoneError(validatePhone(digitsOnly));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const error = validatePhone(form.phone);
    if (error) {
      setPhoneError(error);
      return;
    }

    setLoading(true);
    try {
      const { error: dbError } = await supabase.from("leads").insert([{ ...form, status: "New" }]);
      if (dbError) throw dbError;
      setSubmitted(true);
      setForm({ name: "", phone: "", service: "Gastroenterology" });
      setPhoneError("");
    } catch (error: any) {
      alert("Connectivity issue. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const FormCard = () =>
    submitted ? (
      <div className="bg-white p-12 rounded-[40px] shadow-2xl border border-orange-50 text-center">
        <div className="w-20 h-20 bg-green-50 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 size={40} />
        </div>
        <h2 className="text-2xl font-black text-slate-900 mb-2">Query Sent!</h2>
        <p className="text-slate-500 mb-8 text-sm leading-relaxed">
          Our gastroenterology specialist will call you within 10 minutes.
        </p>
        <button onClick={() => setSubmitted(false)} className="text-[#1D646B] font-bold text-sm hover:underline">
          Book for someone else?
        </button>
      </div>
    ) : (
      <div className="bg-white p-8 rounded-[40px] shadow-2xl border border-slate-100">
        <div className="flex items-center gap-2 mb-1">
          <BadgeCheck size={18} className="text-orange-500" />
          <span className="text-xs font-black text-orange-500 uppercase tracking-widest">100% Free</span>
        </div>
        <h2 className="text-2xl font-black mb-1 text-slate-900">Consult a Specialist</h2>
        <p className="text-slate-500 text-sm mb-6 font-medium">Get a personalised gastro treatment plan today.</p>
        <form onSubmit={handleSubmit} className="space-y-4" noValidate>
          <input
            type="text" placeholder="Patient Name" required
            className="w-full p-4 rounded-2xl bg-slate-100 border border-slate-200 text-slate-900 placeholder-slate-400 font-medium outline-none focus:ring-2 focus:ring-[#1D646B] transition-all"
            value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
          <div>
            <input
              type="tel"
              inputMode="numeric"
              placeholder="Mobile Number"
              required
              maxLength={10}
              className={`w-full p-4 rounded-2xl bg-slate-100 border text-slate-900 placeholder-slate-400 font-medium outline-none focus:ring-2 transition-all ${
                phoneError ? "border-red-500 focus:ring-red-500" : "border-slate-200 focus:ring-[#1D646B]"
              }`}
              value={form.phone}
              onChange={handlePhoneChange}
              onBlur={() => setPhoneError(validatePhone(form.phone))}
            />
            {phoneError && (
              <p className="text-red-600 text-xs font-semibold mt-2 ml-1">{phoneError}</p>
            )}
          </div>
          <button
            disabled={loading}
            className="w-full py-4 bg-gradient-to-r from-[#1D646B] to-[#2a8d96] text-white rounded-2xl font-black text-base hover:shadow-xl hover:-translate-y-0.5 active:scale-95 shadow-lg transition-all flex items-center justify-center gap-2"
          >
            {loading ? <Loader2 className="animate-spin" size={20} /> : <>Book Free Consultation <ArrowRight size={16} /></>}
          </button>
        </form>
        <p className="text-center text-xs text-slate-400 mt-4">🔒 Your details are 100% confidential</p>
      </div>
    );

  return (
    <>
      <Header />
      <main className="pt-20 bg-white">

        {/* ── HERO ── */}
        <section className="relative bg-gradient-to-br from-[#2d1a0a] via-[#7c3a1a] to-[#c25e1a] py-20 lg:py-32 px-6 overflow-hidden">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-orange-400/10 blur-[120px] rounded-full pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-orange-300/10 blur-[100px] rounded-full pointer-events-none"></div>

          <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16 relative z-10">
            <div className="lg:w-1/2">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur text-white text-[10px] font-black uppercase tracking-[0.2em] mb-6 border border-white/20">
                ✦ Centre for Digestive Excellence
              </div>
              <h1 className="text-5xl lg:text-7xl font-black text-white mb-6 leading-tight tracking-tight">
                Advanced <br />
                <span className="text-orange-300">Digestive</span><br />
                <span className="text-orange-300">Care.</span>
              </h1>
              <p className="text-lg text-white/70 mb-10 max-w-lg leading-relaxed font-medium">
                Precision laparoscopic and laser treatments for gallstones, hernia, piles, liver disease, and all digestive conditions — by India's expert gastroenterologists.
              </p>

              <div className="flex flex-wrap gap-3 mb-8">
                {[
                  { t: "Laparoscopic Experts", i: <Microscope size={14} /> },
                  { t: "Pain-Free Laser", i: <Zap size={14} /> },
                  { t: "24-Hr Discharge", i: <Clock size={14} /> },
                  { t: "Insurance Accepted", i: <ShieldCheck size={14} /> },
                ].map((tag, idx) => (
                  <div key={idx} className="flex items-center gap-2 bg-white/10 backdrop-blur px-4 py-2 rounded-xl border border-white/20 text-white font-semibold text-xs">
                    <span className="text-orange-300">{tag.i}</span> {tag.t}
                  </div>
                ))}
              </div>

              <a href="tel:8882804301" className="inline-flex items-center gap-3 text-white/80 hover:text-white font-bold text-sm transition">
                <div className="w-10 h-10 rounded-full bg-white/10 border border-white/20 flex items-center justify-center">
                  <Phone size={16} />
                </div>
                Call Now: 8882804301
              </a>
            </div>

            <div className="lg:w-5/12 w-full">
              <FormCard />
            </div>
          </div>
        </section>

        {/* ── STATS STRIP ── */}
        <section className="bg-slate-900 py-10 px-6">
          <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((s, i) => (
              <div key={i} className="text-center">
                <div className="flex items-center justify-center gap-2 text-orange-400 mb-1">{s.icon}</div>
                <div className="text-3xl font-black text-white">{s.value}</div>
                <div className="text-slate-400 text-xs font-semibold mt-1 uppercase tracking-wider">{s.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* ── CONDITIONS WE TREAT ── */}
        <section className="py-20 px-6 bg-slate-50">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <span className="text-orange-600 text-xs font-black uppercase tracking-widest">What We Treat</span>
              <h2 className="text-4xl lg:text-5xl font-black text-slate-900 mt-3">
                Conditions We <span className="text-[#1D646B]">Specialise In</span>
              </h2>
              <p className="text-slate-500 mt-4 text-base max-w-2xl mx-auto">
                From common digestive issues to complex GI surgeries — our team handles the full spectrum of gastroenterological care.
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {conditions.map((c, i) => (
                <div key={i} className="flex items-center gap-3 bg-white border border-slate-200 rounded-2xl px-5 py-4 shadow-sm hover:border-orange-300 hover:shadow-md transition group">
                  <AlertCircle size={16} className="text-orange-500 flex-shrink-0 group-hover:scale-110 transition" />
                  <span className="text-slate-800 text-sm font-semibold">{c.name}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── TECHNOLOGY / SERVICE GRID ── */}
        <section className="py-24 bg-slate-900 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <span className="text-orange-400 text-xs font-black uppercase tracking-widest">Our Procedures</span>
              <h2 className="text-4xl lg:text-5xl font-black text-white mt-3 tracking-tight">
                Advanced <span className="text-orange-400">Treatments</span>
              </h2>
              <p className="text-slate-400 mt-4 text-lg font-medium max-w-2xl mx-auto">
                World-class surgical and non-surgical gastro care under one roof.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {treatments.map((t, i) => (
                <div
                  key={i}
                  className="group relative bg-slate-800 rounded-[32px] p-8 border border-slate-700 hover:border-orange-500/50 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-orange-900/20 flex flex-col"
                >
                  <span className={`absolute top-6 right-6 text-[10px] font-black uppercase tracking-wider text-white px-3 py-1 rounded-full ${t.badgeColor}`}>
                    {t.badge}
                  </span>
                  <div className="w-14 h-14 bg-slate-700 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-slate-600 transition">
                    {t.icon}
                  </div>
                  <h3 className="text-xl font-black text-white mb-3">{t.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed mb-6 flex-grow">{t.desc}</p>
                  <ul className="space-y-2">
                    {t.details.map((d, di) => (
                      <li key={di} className="flex items-center gap-2 text-xs text-slate-300 font-semibold">
                        <span className="w-1.5 h-1.5 rounded-full bg-orange-400 flex-shrink-0"></span>
                        {d}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── HOW IT WORKS ── */}
        <section className="py-24 px-6 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <span className="text-orange-600 text-xs font-black uppercase tracking-widest">Your Journey</span>
              <h2 className="text-4xl lg:text-5xl font-black text-slate-900 mt-3 tracking-tight">
                How It <span className="text-[#1D646B]">Works</span>
              </h2>
              <p className="text-slate-500 mt-4 text-lg font-medium">From your first call to complete recovery in 4 simple steps.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
              <div className="hidden lg:block absolute top-12 left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-orange-100 via-orange-400 to-orange-100 z-0"></div>
              {processSteps.map((s, i) => (
                <div key={i} className="relative z-10 bg-white rounded-[32px] p-8 border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 text-center">
                  <div className="w-14 h-14 bg-slate-900 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    {s.icon}
                  </div>
                  <div className="text-4xl font-black text-slate-100 mb-2 leading-none">{s.step}</div>
                  <h3 className="text-lg font-black text-slate-900 mb-3">{s.title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── WHY LAPAROSCOPIC ── */}
        <section className="py-20 px-4 bg-slate-50">
          <div className="max-w-7xl mx-auto bg-slate-900 rounded-[50px] p-10 lg:p-20 flex flex-col lg:flex-row-reverse items-center gap-16 relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 left-0 w-1/2 h-full bg-orange-500/5 blur-[120px] rounded-full pointer-events-none"></div>

            <div className="lg:w-1/2 relative z-10">
              <span className="text-orange-400 text-xs font-black uppercase tracking-widest mb-4 block">Why Keyhole Surgery</span>
              <h2 className="text-4xl lg:text-5xl font-black text-white mb-10 leading-tight">
                Why Choose Laparoscopic Surgery?
              </h2>
              <div className="space-y-4">
                {[
                  { h: "Minimal Pain", p: "Smaller incisions (0.5–1cm) mean significantly less post-operative discomfort. Most patients need only mild painkillers." },
                  { h: "Quick 24-Hr Discharge", p: "Most laparoscopic patients are ready to go home within 24–48 hours. Return to work in 5–7 days." },
                  { h: "Lowest Infection Risk", p: "Minimal external exposure dramatically reduces the risk of surgical site infections compared to open surgery." },
                  { h: "No Visible Scars", p: "Tiny port-site marks fade almost completely within a few weeks — nothing like the large scars of open surgery." },
                ].map((item, idx) => (
                  <div key={idx} className="flex gap-4 p-6 bg-white/5 backdrop-blur-sm rounded-3xl border border-white/10 hover:bg-white/10 transition">
                    <CheckCircle2 className="text-orange-400 shrink-0 mt-0.5" size={22} />
                    <div>
                      <h4 className="font-black text-lg text-white mb-1">{item.h}</h4>
                      <p className="text-slate-400 text-sm leading-relaxed">{item.p}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:w-1/2 relative h-[540px] w-full rounded-[40px] overflow-hidden shadow-2xl border border-white/5">
              <Image
                src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=800"
                alt="Laparoscopic Surgery" fill className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent"></div>
              <div className="absolute bottom-6 left-6 right-6 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-orange-500 flex items-center justify-center">
                    <Star size={16} className="text-white fill-white" />
                  </div>
                  <div>
                    <div className="text-white font-black text-sm">Rated 4.9 / 5 by patients</div>
                    <div className="text-slate-300 text-xs">Based on 10,000+ gastro reviews</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── COST & EMI ── */}
        <section className="py-24 px-6 bg-white">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <span className="text-orange-600 text-xs font-black uppercase tracking-widest">Transparent Pricing</span>
              <h2 className="text-4xl lg:text-5xl font-black text-slate-900 mt-3">
                Cost & <span className="text-[#1D646B]">EMI Plans</span>
              </h2>
              <p className="text-slate-500 mt-4 text-base max-w-xl mx-auto">
                No hidden charges. Costs vary by procedure and lens — your care manager will give a clear quote after consultation.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              {[
                {
                  name: "Endoscopy / Colonoscopy",
                  price: "₹5,000",
                  unit: "onwards",
                  features: ["HD diagnostic scope", "Biopsy if required", "Report same day", "Insurance covered"],
                  highlight: false,
                },
                {
                  name: "Laparoscopic Surgery",
                  price: "₹35,000",
                  unit: "onwards (all-inclusive)",
                  features: ["Gallbladder / Hernia / Appendix", "Hospital stay included", "Surgeon + OT fees", "Insurance cashless"],
                  highlight: true,
                },
                {
                  name: "Laser Piles / Fistula",
                  price: "₹40,000",
                  unit: "onwards",
                  features: ["US-FDA approved laser", "Day-care procedure", "No stitches / cuts", "Lifetime warranty"],
                  highlight: false,
                },
              ].map((plan, i) => (
                <div
                  key={i}
                  className={`rounded-[32px] p-8 border transition-all duration-300 hover:-translate-y-1 ${
                    plan.highlight
                      ? "bg-slate-900 border-orange-500/30 shadow-2xl shadow-orange-900/20"
                      : "bg-white border-slate-200 shadow-sm hover:shadow-lg"
                  }`}
                >
                  {plan.highlight && (
                    <span className="text-[10px] font-black uppercase tracking-widest text-orange-400 bg-orange-400/10 px-3 py-1 rounded-full mb-4 inline-block border border-orange-400/20">
                      Most Common
                    </span>
                  )}
                  <h3 className={`text-lg font-black mb-1 ${plan.highlight ? "text-white" : "text-slate-900"}`}>{plan.name}</h3>
                  <div className={`text-4xl font-black mb-1 ${plan.highlight ? "text-orange-400" : "text-orange-600"}`}>{plan.price}</div>
                  <div className={`text-xs mb-6 ${plan.highlight ? "text-slate-400" : "text-slate-500"}`}>{plan.unit}</div>
                  <ul className="space-y-3">
                    {plan.features.map((f, fi) => (
                      <li key={fi} className={`flex items-center gap-2 text-sm font-medium ${plan.highlight ? "text-slate-300" : "text-slate-600"}`}>
                        <CheckCircle2 size={15} className={plan.highlight ? "text-orange-400" : "text-orange-600"} />
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <div className="bg-gradient-to-r from-[#1D646B] to-[#2a8d96] rounded-[32px] p-8 text-white text-center">
              <h3 className="text-2xl font-black mb-2">0% EMI — Pay in Easy Installments</h3>
              <p className="text-white/80 text-sm mb-6 max-w-lg mx-auto">
                Split your gastro surgery cost across 6, 9, or 12 months — zero interest, zero processing fees.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                {["6 Months", "9 Months", "12 Months"].map((m) => (
                  <div key={m} className="bg-white/15 backdrop-blur border border-white/20 rounded-2xl px-6 py-3 text-sm font-black">
                    {m} @ 0% Interest
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section className="py-24 px-6 bg-slate-50">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-16">
              <span className="text-orange-600 text-xs font-black uppercase tracking-widest">Got Questions?</span>
              <h2 className="text-4xl lg:text-5xl font-black text-slate-900 mt-3">
                Gastro <span className="text-[#1D646B]">FAQs</span>
              </h2>
            </div>

            <div className="space-y-3">
              {faqs.map((faq, i) => (
                <div
                  key={i}
                  className={`rounded-2xl border overflow-hidden transition-all duration-300 ${
                    openFaq === i ? "bg-white border-orange-200 shadow-lg" : "bg-white border-slate-200"
                  }`}
                >
                  <button
                    className="w-full flex items-center justify-between p-6 text-left"
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  >
                    <span className="font-bold text-slate-900 pr-4 text-sm md:text-base">{faq.q}</span>
                    <ChevronDown
                      size={20}
                      className={`text-slate-400 flex-shrink-0 transition-transform duration-300 ${openFaq === i ? "rotate-180 text-orange-600" : ""}`}
                    />
                  </button>
                  {openFaq === i && (
                    <div className="px-6 pb-6 text-slate-600 text-sm leading-relaxed border-t border-slate-100 pt-4">
                      {faq.a}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── BOTTOM CTA ── */}
        <section className="py-20 px-6 bg-slate-900 text-white text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl lg:text-5xl font-black mb-4">Get Expert Digestive Care Today.</h2>
            <p className="text-slate-400 text-lg mb-10">
              Our gastroenterology specialist will call you within 10 minutes of your enquiry.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="tel:8882804301">
                <button className="px-10 py-4 rounded-2xl bg-gradient-to-r from-[#1D646B] to-[#2a8d96] text-white font-bold shadow-xl hover:scale-105 transition flex items-center gap-2 justify-center">
                  <Phone size={18} /> Call: 8882804301
                </button>
              </a>
              <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                <button className="px-10 py-4 rounded-2xl bg-[#25D366] text-white font-bold shadow-xl hover:scale-105 transition flex items-center gap-2 justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" className="w-5 h-5 fill-white">
                    <path d="M16 0C7.163 0 0 7.163 0 16c0 2.822.737 5.469 2.027 7.773L0 32l8.479-2.003A15.937 15.937 0 0016 32c8.837 0 16-7.163 16-16S24.837 0 16 0zm7.27 19.455c-.398-.199-2.354-1.162-2.719-1.294-.365-.133-.631-.199-.897.199-.266.398-1.03 1.294-1.263 1.56-.232.266-.465.299-.863.1-.398-.199-1.681-.62-3.202-1.977-1.183-1.056-1.982-2.361-2.214-2.759-.232-.398-.025-.613.174-.811.179-.178.398-.465.597-.698.199-.232.266-.398.398-.664.133-.266.066-.498-.033-.697-.1-.199-.897-2.162-1.229-2.96-.324-.778-.653-.672-.897-.685l-.764-.013c-.266 0-.697.1-1.063.498-.365.398-1.395 1.362-1.395 3.322s1.428 3.853 1.627 4.119c.199.266 2.81 4.291 6.811 6.022.952.411 1.695.657 2.274.841.955.304 1.825.261 2.513.158.766-.114 2.354-.962 2.686-1.891.332-.929.332-1.726.232-1.891-.1-.166-.365-.266-.763-.465z" />
                  </svg>
                  WhatsApp Us
                </button>
              </a>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}