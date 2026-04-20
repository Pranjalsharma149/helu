"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Image from "next/image";
import {
  Sparkles,
  Target,
  ShieldCheck,
  Eye,
  CheckCircle2,
  Loader2,
  Waves,
  Zap,
  Wallet,
  Clock,
  Star,
  Users,
  Award,
  ChevronDown,
  Phone,
  ArrowRight,
  HeartPulse,
  Microscope,
  ThumbsUp,
  BadgeCheck,
} from "lucide-react";

export default function LasikPage() {
  const [form, setForm] = useState({ name: "", phone: "", city: "", service: "LASIK" });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const technologies = [
    {
      title: "SMILE Pro",
      badge: "Most Advanced",
      badgeColor: "bg-teal-500",
      desc: "The world's thinnest, flapless, and fastest laser eye surgery. No flap means zero risk of flap complications. Recovery in just 24 hours with minimal discomfort.",
      details: ["Flapless procedure", "Recovery in 24 hrs", "Best for active lifestyles", "Suitable for dry eyes"],
      icon: <Sparkles className="text-teal-400" size={28} />,
      bg: "bg-slate-800",
    },
    {
      title: "Contoura Vision",
      badge: "Topography-Guided",
      badgeColor: "bg-orange-500",
      desc: "Maps 22,000 unique points on your cornea for hyper-personalized correction. Many patients achieve vision better than 6/6 — sharper than glasses ever gave them.",
      details: ["22,000 corneal points mapped", "Better than 6/6 possible", "FDA approved", "Reduces glare & halos"],
      icon: <Target className="text-orange-400" size={28} />,
      bg: "bg-slate-800",
    },
    {
      title: "Blade-Free LASIK",
      badge: "All-Laser",
      badgeColor: "bg-blue-500",
      desc: "Femto LASIK uses two lasers for maximum precision — one to create the flap, one to correct vision. No blades, no contact with the eye, enhanced safety.",
      details: ["Zero blade contact", "Dual-laser precision", "15-min procedure", "99.6% success rate"],
      icon: <ShieldCheck className="text-blue-400" size={28} />,
      bg: "bg-slate-800",
    },
    {
      title: "ICL (Phakic Lenses)",
      badge: "High Power",
      badgeColor: "bg-emerald-500",
      desc: "Ideal for thin corneas or very high powers (-20D). An implantable lens placed inside the eye — no tissue removed, fully reversible, and UV protective.",
      details: ["Up to -20D correction", "Reversible anytime", "Built-in UV protection", "For thin corneas"],
      icon: <Eye className="text-emerald-400" size={28} />,
      bg: "bg-slate-800",
    },
  ];

  const stats = [
    { value: "50,000+", label: "Procedures Done", icon: <Users size={20} /> },
    { value: "99.6%", label: "Success Rate", icon: <Star size={20} /> },
    { value: "15 Min", label: "Procedure Time", icon: <Clock size={20} /> },
    { value: "500+", label: "Expert Surgeons", icon: <Award size={20} /> },
  ];

  const processSteps = [
    {
      step: "01",
      title: "Free Eye Screening",
      desc: "A comprehensive corneal mapping and power assessment to check your eligibility for LASIK. Takes only 45 minutes.",
      icon: <Microscope size={24} className="text-teal-400" />,
    },
    {
      step: "02",
      title: "Doctor Consultation",
      desc: "A senior LASIK surgeon reviews your reports, discusses your lifestyle, and recommends the best procedure for your eyes.",
      icon: <HeartPulse size={24} className="text-teal-400" />,
    },
    {
      step: "03",
      title: "The Procedure",
      desc: "On surgery day, the laser treatment takes just 10–15 minutes per eye. You're awake and comfortable throughout.",
      icon: <Zap size={24} className="text-teal-400" />,
    },
    {
      step: "04",
      title: "Clear Vision",
      desc: "Most patients see clearly within 24 hours. Your care manager schedules follow-up visits until you're 100% recovered.",
      icon: <ThumbsUp size={24} className="text-teal-400" />,
    },
  ];

  const faqs = [
    {
      q: "Am I eligible for LASIK surgery?",
      a: "Most people above 18 years with stable eye power for at least 1 year are eligible. The free screening checks corneal thickness, pupil size, and overall eye health. Thin corneas or very high powers may be better suited for ICL.",
    },
    {
      q: "Is LASIK surgery painful?",
      a: "No. Anaesthetic eye drops are used before the procedure. You may feel mild pressure for a few seconds during the laser, but there is no pain. Most patients are surprised by how comfortable and quick it is.",
    },
    {
      q: "How long does the result last?",
      a: "LASIK results are permanent. The laser reshapes the cornea, which does not change back. However, natural age-related changes like presbyopia (reading glasses after 40) can still occur independently.",
    },
    {
      q: "What is the recovery time?",
      a: "With SMILE Pro, most patients resume work and daily activities within 24–48 hours. With Femto LASIK, recovery is 3–5 days. You should avoid swimming and dusty environments for 4 weeks.",
    },
    {
      q: "How much does LASIK cost?",
      a: "LASIK at our partner hospitals starts from ₹25,000 per eye for standard procedures and ₹55,000–₹75,000 for advanced SMILE Pro or Contoura Vision. 0% EMI options are available across 6, 9, and 12 months.",
    },
    {
      q: "What if I have dry eyes?",
      a: "Dry eyes are a common concern. SMILE Pro is the best option for patients with dry eyes as it is flapless and preserves more corneal nerves. Our surgeon will assess your tear film quality during screening.",
    },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { error } = await supabase.from("leads").insert([{ ...form, status: "New" }]);
      if (error) throw error;
      setSubmitted(true);
      setForm({ name: "", phone: "", city: "", service: "LASIK" });
    } catch (error: any) {
      alert("Connectivity issue. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const FormCard = () => (
    submitted ? (
      <div className="bg-white p-12 rounded-[40px] shadow-2xl border border-teal-50 text-center">
        <div className="w-20 h-20 bg-teal-50 text-teal-600 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 size={40} />
        </div>
        <h2 className="text-2xl font-black text-slate-900 mb-2">Screening Booked!</h2>
        <p className="text-slate-500 mb-8 text-sm leading-relaxed">Our LASIK counselor will call you within 15 minutes to confirm your slot.</p>
        <button onClick={() => setSubmitted(false)} className="text-[#1D646B] font-bold text-sm hover:underline">
          Book for someone else?
        </button>
      </div>
    ) : (
      <div className="bg-white p-8 rounded-[40px] shadow-2xl border border-slate-100">
        <div className="flex items-center gap-2 mb-1">
          <BadgeCheck size={18} className="text-teal-600" />
          <span className="text-xs font-black text-teal-600 uppercase tracking-widest">100% Free</span>
        </div>
        <h2 className="text-2xl font-black mb-1 text-slate-900">Book Eye Screening</h2>
        <p className="text-slate-500 text-sm mb-6 font-medium">Check your eligibility for LASIK today.</p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text" placeholder="Full Name" required
            className="w-full p-4 rounded-2xl bg-slate-100 border border-slate-200 text-slate-900 placeholder-slate-400 font-medium outline-none focus:ring-2 focus:ring-[#1D646B] transition-all"
            value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
          <input
            type="tel" placeholder="Mobile Number" required
            className="w-full p-4 rounded-2xl bg-slate-100 border border-slate-200 text-slate-900 placeholder-slate-400 font-medium outline-none focus:ring-2 focus:ring-[#1D646B] transition-all"
            value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })}
          />
          <select
            className="w-full p-4 rounded-2xl bg-slate-100 border border-slate-200 text-slate-700 font-medium outline-none focus:ring-2 focus:ring-[#1D646B] appearance-none cursor-pointer transition-all"
            value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })}
            required
          >
            <option value="">Select Your City</option>
            <option value="Delhi">Delhi</option>
            <option value="Mumbai">Mumbai</option>
            <option value="Bangalore">Bangalore</option>
            <option value="Hyderabad">Hyderabad</option>
            <option value="Chennai">Chennai</option>
            <option value="Pune">Pune</option>
            <option value="Kolkata">Kolkata</option>
          </select>
          <button
            disabled={loading}
            className="w-full py-4 bg-gradient-to-r from-[#1D646B] to-[#2a8d96] text-white rounded-2xl font-black text-base hover:shadow-xl hover:-translate-y-0.5 active:scale-95 shadow-lg shadow-teal-900/20 transition-all flex items-center justify-center gap-2"
          >
            {loading ? <Loader2 className="animate-spin" size={20} /> : <>Book Free Screening <ArrowRight size={16} /></>}
          </button>
        </form>
        <p className="text-center text-xs text-slate-400 mt-4">🔒 Your details are 100% confidential</p>
      </div>
    )
  );

  return (
    <>
      <Header />
      <main className="pt-20 bg-white">

        {/* ── HERO ── */}
        <section className="relative bg-gradient-to-br from-[#0d3d40] via-[#1D646B] to-[#0f4a50] py-20 lg:py-32 px-6 overflow-hidden">
          {/* background blobs */}
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-teal-400/10 blur-[120px] rounded-full -z-0"></div>
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-teal-300/10 blur-[100px] rounded-full -z-0"></div>

          <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16 relative z-10">
            <div className="lg:w-1/2">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur text-white text-[10px] font-black uppercase tracking-[0.2em] mb-6 border border-white/20">
                ✦ Say Goodbye to Glasses
              </div>
              <h1 className="text-5xl lg:text-7xl font-black text-white mb-6 leading-tight tracking-tight">
                Wake Up To <br />
                <span className="text-teal-300">Clear Vision.</span>
              </h1>
              <p className="text-lg text-white/70 mb-10 max-w-lg leading-relaxed font-medium">
                Experience the next generation of Laser Eye Surgery. A painless 10-minute procedure for a lifetime of visual freedom — no glasses, no contacts, no compromise.
              </p>

              <div className="flex flex-wrap gap-3 mb-8">
                {[
                  { t: "10-Min Procedure", i: <Zap size={14} /> },
                  { t: "No Hospitalization", i: <CheckCircle2 size={14} /> },
                  { t: "0% EMI Available", i: <Wallet size={14} /> },
                  { t: "Lifetime Warranty", i: <ShieldCheck size={14} /> },
                ].map((tag, idx) => (
                  <div key={idx} className="flex items-center gap-2 bg-white/10 backdrop-blur px-4 py-2 rounded-xl border border-white/20 text-white font-semibold text-xs">
                    <span className="text-teal-300">{tag.i}</span> {tag.t}
                  </div>
                ))}
              </div>

              <a href="tel:8882804301" className="inline-flex items-center gap-3 mt-2 text-white/80 hover:text-white font-bold text-sm transition">
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
                <div className="flex items-center justify-center gap-2 text-teal-400 mb-1">
                  {s.icon}
                </div>
                <div className="text-3xl font-black text-white">{s.value}</div>
                <div className="text-slate-400 text-xs font-semibold mt-1 uppercase tracking-wider">{s.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* ── TECHNOLOGY GRID ── */}
        <section className="py-24 bg-slate-900 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <span className="text-teal-400 text-xs font-black uppercase tracking-widest">Procedures We Offer</span>
              <h2 className="text-4xl lg:text-5xl font-black text-white mt-3 tracking-tight">
                World-Class <span className="text-teal-400">Technology.</span>
              </h2>
              <p className="text-slate-400 mt-4 text-lg font-medium max-w-2xl mx-auto">
                We offer the widest range of vision-correction procedures. Our surgeons recommend the right one based on your unique eye profile.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {technologies.map((t, i) => (
                <div
                  key={i}
                  className="group relative bg-slate-800 rounded-[32px] p-8 border border-slate-700 hover:border-teal-500/50 hover:bg-slate-750 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-teal-900/30 flex flex-col"
                >
                  {/* Badge */}
                  <span className={`absolute top-6 right-6 text-[10px] font-black uppercase tracking-wider text-white px-3 py-1 rounded-full ${t.badgeColor}`}>
                    {t.badge}
                  </span>

                  {/* Icon */}
                  <div className="w-14 h-14 bg-slate-700 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-slate-600 transition">
                    {t.icon}
                  </div>

                  <h3 className="text-xl font-black text-white mb-3">{t.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed mb-6 flex-grow">{t.desc}</p>

                  {/* Detail bullets */}
                  <ul className="space-y-2">
                    {t.details.map((d, di) => (
                      <li key={di} className="flex items-center gap-2 text-xs text-slate-300 font-semibold">
                        <span className="w-1.5 h-1.5 rounded-full bg-teal-400 flex-shrink-0"></span>
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
              <span className="text-teal-600 text-xs font-black uppercase tracking-widest">Your Journey</span>
              <h2 className="text-4xl lg:text-5xl font-black text-slate-900 mt-3 tracking-tight">
                How It <span className="text-[#1D646B]">Works</span>
              </h2>
              <p className="text-slate-500 mt-4 text-lg font-medium">From first call to crystal-clear vision in 4 simple steps.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
              {/* Connector line */}
              <div className="hidden lg:block absolute top-12 left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-teal-200 via-teal-400 to-teal-200 z-0"></div>

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

        {/* ── LIFE AFTER LASIK ── */}
        <section className="py-24 px-4 bg-slate-50">
          <div className="max-w-7xl mx-auto bg-slate-900 text-white rounded-[60px] p-10 lg:p-20 overflow-hidden relative shadow-2xl">
            <div className="absolute top-0 right-0 w-1/2 h-full bg-teal-500/5 blur-[120px] rounded-full pointer-events-none"></div>

            <div className="flex flex-col lg:flex-row items-center gap-16 relative z-10">
              <div className="lg:w-1/2">
                <span className="text-teal-400 text-xs font-black uppercase tracking-widest mb-4 block">After Surgery</span>
                <h2 className="text-4xl lg:text-5xl font-black mb-10 leading-tight">Life After LASIK</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                  {[
                    { h: "Total Freedom", p: "Swim, travel, play sports — no glasses slipping or contacts drying out ever again.", i: <Waves size={20} /> },
                    { h: "HD Vision", p: "Experience colors, depth, and fine details sharper than any lens correction ever gave you.", i: <Target size={20} /> },
                    { h: "Confidence", p: "No frames hiding your face. First impressions, photographs, and daily life — all transformed.", i: <Sparkles size={20} /> },
                    { h: "Lifetime Savings", p: "Stop spending ₹10,000–₹20,000 every year on frames, lenses, and contact solutions.", i: <Wallet size={20} /> },
                  ].map((item, idx) => (
                    <div key={idx}>
                      <div className="flex items-center gap-3 text-teal-400 font-black text-lg mb-2">
                        {item.i} {item.h}
                      </div>
                      <p className="text-slate-400 text-sm leading-relaxed">{item.p}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-10 flex flex-wrap gap-4">
                  <div className="bg-white/10 rounded-2xl px-6 py-4 border border-white/10 text-center">
                    <div className="text-2xl font-black text-teal-300">24 hrs</div>
                    <div className="text-slate-400 text-xs mt-1">SMILE Pro Recovery</div>
                  </div>
                  <div className="bg-white/10 rounded-2xl px-6 py-4 border border-white/10 text-center">
                    <div className="text-2xl font-black text-teal-300">₹0</div>
                    <div className="text-slate-400 text-xs mt-1">Glasses cost after</div>
                  </div>
                  <div className="bg-white/10 rounded-2xl px-6 py-4 border border-white/10 text-center">
                    <div className="text-2xl font-black text-teal-300">6/6+</div>
                    <div className="text-slate-400 text-xs mt-1">Vision possible</div>
                  </div>
                </div>
              </div>

              <div className="lg:w-1/2 relative h-[420px] w-full rounded-[40px] overflow-hidden shadow-2xl border border-white/5">
                <Image
                  src="https://images.unsplash.com/photo-1581594549595-35e6ed9610c7?q=80&w=800"
                  alt="Vision Freedom" fill className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent"></div>
                <div className="absolute bottom-6 left-6 right-6 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-teal-500 flex items-center justify-center">
                      <Star size={16} className="text-white fill-white" />
                    </div>
                    <div>
                      <div className="text-white font-black text-sm">Rated 4.9/5 by patients</div>
                      <div className="text-slate-300 text-xs">Based on 12,000+ reviews</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── COST & EMI SECTION ── */}
        <section className="py-24 px-6 bg-white">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <span className="text-teal-600 text-xs font-black uppercase tracking-widest">Transparent Pricing</span>
              <h2 className="text-4xl lg:text-5xl font-black text-slate-900 mt-3">
                Cost & <span className="text-[#1D646B]">EMI Plans</span>
              </h2>
              <p className="text-slate-500 mt-4 text-base max-w-xl mx-auto">No hidden charges. No surprises. Here's exactly what LASIK costs at HealviaCare partner hospitals.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              {[
                {
                  name: "Standard LASIK",
                  price: "₹25,000",
                  unit: "per eye",
                  features: ["Microkeratome blade", "Basic correction", "Suitable for low power", "1-year follow-up"],
                  highlight: false,
                },
                {
                  name: "Contoura Vision",
                  price: "₹45,000",
                  unit: "per eye",
                  features: ["22,000-point mapping", "Beyond 6/6 possible", "Reduces night glare", "Lifetime warranty"],
                  highlight: true,
                },
                {
                  name: "SMILE Pro / ICL",
                  price: "₹55,000+",
                  unit: "per eye",
                  features: ["Flapless / lens-based", "Best for dry eyes", "For high power / thin cornea", "Lifetime warranty"],
                  highlight: false,
                },
              ].map((plan, i) => (
                <div
                  key={i}
                  className={`rounded-[32px] p-8 border transition-all duration-300 hover:-translate-y-1 ${
                    plan.highlight
                      ? "bg-slate-900 border-teal-500/30 shadow-2xl shadow-teal-900/20"
                      : "bg-white border-slate-200 shadow-sm hover:shadow-lg"
                  }`}
                >
                  {plan.highlight && (
                    <span className="text-[10px] font-black uppercase tracking-widest text-teal-400 bg-teal-400/10 px-3 py-1 rounded-full mb-4 inline-block border border-teal-400/20">
                      Most Popular
                    </span>
                  )}
                  <h3 className={`text-lg font-black mb-1 ${plan.highlight ? "text-white" : "text-slate-900"}`}>{plan.name}</h3>
                  <div className={`text-4xl font-black mb-1 ${plan.highlight ? "text-teal-400" : "text-[#1D646B]"}`}>{plan.price}</div>
                  <div className={`text-xs mb-6 ${plan.highlight ? "text-slate-400" : "text-slate-500"}`}>{plan.unit}</div>
                  <ul className="space-y-3">
                    {plan.features.map((f, fi) => (
                      <li key={fi} className={`flex items-center gap-2 text-sm font-medium ${plan.highlight ? "text-slate-300" : "text-slate-600"}`}>
                        <CheckCircle2 size={15} className={plan.highlight ? "text-teal-400" : "text-teal-600"} />
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <div className="bg-gradient-to-r from-[#1D646B] to-[#2a8d96] rounded-[32px] p-8 text-white text-center">
              <h3 className="text-2xl font-black mb-2">0% EMI — Pay in Easy Installments</h3>
              <p className="text-white/80 text-sm mb-6 max-w-lg mx-auto">Split your treatment cost into 6, 9, or 12 monthly payments with zero interest and zero processing fees.</p>
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
              <span className="text-teal-600 text-xs font-black uppercase tracking-widest">Got Questions?</span>
              <h2 className="text-4xl lg:text-5xl font-black text-slate-900 mt-3">
                LASIK <span className="text-[#1D646B]">FAQs</span>
              </h2>
            </div>

            <div className="space-y-3">
              {faqs.map((faq, i) => (
                <div
                  key={i}
                  className={`rounded-2xl border overflow-hidden transition-all duration-300 ${
                    openFaq === i ? "bg-white border-teal-200 shadow-lg" : "bg-white border-slate-200"
                  }`}
                >
                  <button
                    className="w-full flex items-center justify-between p-6 text-left"
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  >
                    <span className="font-bold text-slate-900 pr-4 text-sm md:text-base">{faq.q}</span>
                    <ChevronDown
                      size={20}
                      className={`text-slate-400 flex-shrink-0 transition-transform duration-300 ${openFaq === i ? "rotate-180 text-teal-600" : ""}`}
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
            <h2 className="text-4xl lg:text-5xl font-black mb-4">Ready to See Clearly?</h2>
            <p className="text-slate-400 text-lg mb-10">Book your free eye screening today. Our LASIK counselor will call you within 15 minutes.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="tel:8882804301">
                <button className="px-10 py-4 rounded-2xl bg-gradient-to-r from-[#1D646B] to-[#2a8d96] text-white font-bold shadow-xl hover:scale-105 transition flex items-center gap-2 justify-center">
                  <Phone size={18} /> Call: 8882804301
                </button>
              </a>
              <a href={`https://wa.me/918882804301?text=${encodeURIComponent("Hello HealviaCare, I want to book a free LASIK eye screening.")}`} target="_blank" rel="noopener noreferrer">
                <button className="px-10 py-4 rounded-2xl bg-[#25D366] text-white font-bold shadow-xl hover:scale-105 transition flex items-center gap-2 justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" className="w-5 h-5 fill-white">
                    <path d="M16 0C7.163 0 0 7.163 0 16c0 2.822.737 5.469 2.027 7.773L0 32l8.479-2.003A15.937 15.937 0 0016 32c8.837 0 16-7.163 16-16S24.837 0 16 0zm7.27 19.455c-.398-.199-2.354-1.162-2.719-1.294-.365-.133-.631-.199-.897.199-.266.398-1.03 1.294-1.263 1.56-.232.266-.465.299-.863.1-.398-.199-1.681-.62-3.202-1.977-1.183-1.056-1.982-2.361-2.214-2.759-.232-.398-.025-.613.174-.811.179-.178.398-.465.597-.698.199-.232.266-.398.398-.664.133-.266.066-.498-.033-.697-.1-.199-.897-2.162-1.229-2.96-.324-.778-.653-.672-.897-.685l-.764-.013c-.266 0-.697.1-1.063.498-.365.398-1.395 1.362-1.395 3.322s1.428 3.853 1.627 4.119c.199.266 2.81 4.291 6.811 6.022.952.411 1.695.657 2.274.841.955.304 1.825.261 2.513.158.766-.114 2.354-.962 2.686-1.891.332-.929.332-1.726.232-1.891-.1-.166-.365-.266-.763-.465z"/>
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