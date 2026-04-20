"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Image from "next/image";
import {
  CheckCircle2,
  Loader2,
  Eye,
  Zap,
  ShieldCheck,
  Microscope,
  ChevronDown,
  Phone,
  ArrowRight,
  BadgeCheck,
  Users,
  Star,
  Clock,
  Award,
  Wallet,
  HeartPulse,
  AlertCircle,
  Sparkles,
} from "lucide-react";

export default function CataractSurgeryPage() {
  const [form, setForm] = useState({ name: "", phone: "", city: "", service: "Cataract Surgery" });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const treatments = [
    {
      title: "Micro-Incision (MICS)",
      badge: "Blade-Free",
      badgeColor: "bg-blue-500",
      desc: "Advanced blade-free surgery using only 2.2mm incisions. No stitches required, minimal trauma to the eye, and extremely fast healing compared to conventional methods.",
      details: ["2.2mm micro-incision", "No stitches needed", "Same-day discharge", "Faster visual recovery"],
      icon: <Eye className="text-blue-400" size={28} />,
    },
    {
      title: "Premium Lens Implants",
      badge: "Best Outcomes",
      badgeColor: "bg-purple-500",
      desc: "Choose from Monofocal, Multifocal, Extended Depth of Focus (EDOF), and Toric lenses by Alcon, Zeiss & J&J. Reduce or fully eliminate dependency on glasses.",
      details: ["Monofocal / Multifocal", "Toric for astigmatism", "EDOF for range of vision", "Branded lenses only"],
      icon: <Microscope className="text-purple-400" size={28} />,
    },
    {
      title: "Robotic Laser (FLACS)",
      badge: "Ultra Precision",
      badgeColor: "bg-yellow-500",
      desc: "Femtosecond Laser-Assisted Cataract Surgery uses a computer-guided laser for every step — corneal incision, capsulotomy, and lens fragmentation — with unmatched accuracy.",
      details: ["Computer-guided precision", "Perfectly circular capsulotomy", "Less ultrasound energy used", "Superior lens centration"],
      icon: <Zap className="text-yellow-400" size={28} />,
    },
    {
      title: "Post-Op Excellence",
      badge: "Full Support",
      badgeColor: "bg-green-500",
      desc: "Dedicated post-op care manager, premium eye-protection kit, scheduled follow-up visits, and 24/7 tele-consultation access until you're fully recovered.",
      details: ["Dedicated care manager", "Eye protection kit included", "3 follow-up visits", "24/7 tele-consultation"],
      icon: <ShieldCheck className="text-green-400" size={28} />,
    },
  ];

  const stats = [
    { value: "10,000+", label: "Surgeries Done", icon: <Users size={20} /> },
    { value: "4.9 / 5", label: "Patient Rating", icon: <Star size={20} /> },
    { value: "15 Min", label: "Procedure Time", icon: <Clock size={20} /> },
    { value: "NABH", label: "Accredited Hospitals", icon: <Award size={20} /> },
  ];

  const symptoms = [
    { s: "Blurry or cloudy vision that worsens over time" },
    { s: "Difficulty seeing at night or in low light" },
    { s: "Sensitivity to bright lights and glare" },
    { s: "Seeing halos around lights" },
    { s: "Colors appearing faded or yellowish" },
    { s: "Frequent changes in glasses prescription" },
  ];

  const processSteps = [
    {
      step: "01",
      title: "Free Vision Screening",
      desc: "A comprehensive eye exam including slit-lamp, IOL Master biometry, and corneal topography to plan your surgery precisely.",
      icon: <Microscope size={22} className="text-blue-400" />,
    },
    {
      step: "02",
      title: "Lens Selection",
      desc: "Your surgeon explains the lens options. Together you choose the best implant based on your lifestyle, activities, and eye health.",
      icon: <Eye size={22} className="text-blue-400" />,
    },
    {
      step: "03",
      title: "15-Min Procedure",
      desc: "Under topical (eye drop) anaesthesia, the clouded lens is removed with phacoemulsification and replaced with your premium IOL.",
      icon: <Zap size={22} className="text-blue-400" />,
    },
    {
      step: "04",
      title: "Same-Day Discharge",
      desc: "Most patients are discharged within 2–4 hours. Vision improves within 24 hours and stabilises fully over 4–6 weeks.",
      icon: <HeartPulse size={22} className="text-blue-400" />,
    },
  ];

  const faqs = [
    {
      q: "How do I know I have a cataract?",
      a: "Common signs include progressive blurring, difficulty driving at night, glare from lights, halos around lights, and frequent prescription changes. If you notice any of these, a screening can confirm. Cataracts develop slowly and may be present for years before noticeably affecting vision.",
    },
    {
      q: "Is cataract surgery painful?",
      a: "No. The procedure is done under topical anaesthesia — just eye drops. You are awake but feel no pain. Most patients feel a mild pressure sensation for a few seconds. The entire surgery takes 10–15 minutes per eye.",
    },
    {
      q: "What lens should I choose?",
      a: "It depends on your lifestyle. Monofocal lenses give excellent distance vision (reading glasses still needed). Multifocal lenses reduce dependency on glasses for near and far. Toric lenses correct astigmatism. Your surgeon will guide you based on your eye measurements and daily needs.",
    },
    {
      q: "What is the recovery time?",
      a: "You'll notice improved vision within 24 hours. Most patients return to normal activities in 1–3 days. Avoid swimming, heavy exercise, and dusty environments for 4 weeks. Vision fully stabilises over 4–6 weeks as the eye heals.",
    },
    {
      q: "Is cataract surgery covered by insurance?",
      a: "Yes. Most health insurance policies and government schemes (CGHS, ESI, ECHS) cover cataract surgery. Our team handles all TPA coordination and cashless claim processing — typically approved in under 30 minutes.",
    },
    {
      q: "What happens if I delay cataract surgery?",
      a: "Cataracts worsen over time. A mature or hypermature cataract becomes harder to remove and increases surgical risk. Prolonged visual impairment also raises the risk of falls and accidents. Early treatment leads to better outcomes and simpler surgery.",
    },
  ];

  const whatsappUrl = `https://wa.me/918882804301?text=${encodeURIComponent("Hello HealviaCare, I want to book a free cataract vision screening.")}`;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { error } = await supabase.from("leads").insert([{ ...form, status: "New" }]);
      if (error) throw error;
      setSubmitted(true);
      setForm({ name: "", phone: "", city: "", service: "Cataract Surgery" });
    } catch (error: any) {
      alert("Connectivity issue. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const FormCard = () =>
    submitted ? (
      <div className="bg-white p-12 rounded-[40px] shadow-2xl border border-blue-50 text-center">
        <div className="w-20 h-20 bg-green-50 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 size={40} />
        </div>
        <h2 className="text-2xl font-black text-slate-900 mb-2">Booking Confirmed!</h2>
        <p className="text-slate-500 mb-8 text-sm leading-relaxed">
          Our eye specialist will call you within 15 minutes to schedule your free screening.
        </p>
        <button onClick={() => setSubmitted(false)} className="text-blue-600 font-bold text-sm hover:underline">
          Book for someone else?
        </button>
      </div>
    ) : (
      <div className="bg-white p-8 rounded-[40px] shadow-2xl border border-slate-100">
        <div className="flex items-center gap-2 mb-1">
          <BadgeCheck size={18} className="text-blue-600" />
          <span className="text-xs font-black text-blue-600 uppercase tracking-widest">100% Free</span>
        </div>
        <h2 className="text-2xl font-black mb-1 text-slate-900">Free Vision Screening</h2>
        <p className="text-slate-500 text-sm mb-6 font-medium">Check your eligibility for laser cataract surgery.</p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text" placeholder="Full Name" required
            className="w-full p-4 rounded-2xl bg-slate-100 border border-slate-200 text-slate-900 placeholder-slate-400 font-medium outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
          <input
            type="tel" placeholder="Mobile Number" required
            className="w-full p-4 rounded-2xl bg-slate-100 border border-slate-200 text-slate-900 placeholder-slate-400 font-medium outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })}
          />
          <select
            className="w-full p-4 rounded-2xl bg-slate-100 border border-slate-200 text-slate-700 font-medium outline-none focus:ring-2 focus:ring-blue-500 appearance-none cursor-pointer transition-all"
            value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })}
            required
          >
            <option value="">Select Your City</option>
            <option value="Delhi">Delhi</option>
            <option value="Gurgaon">Gurgaon</option>
            <option value="Noida">Noida</option>
            <option value="Mumbai">Mumbai</option>
            <option value="Bangalore">Bangalore</option>
            <option value="Hyderabad">Hyderabad</option>
            <option value="Chennai">Chennai</option>
            <option value="Pune">Pune</option>
          </select>
          <button
            disabled={loading}
            className="w-full py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-2xl font-black text-base hover:shadow-xl hover:-translate-y-0.5 active:scale-95 shadow-lg shadow-blue-900/20 transition-all flex items-center justify-center gap-2"
          >
            {loading ? <Loader2 className="animate-spin" size={20} /> : <>Book Free Screening <ArrowRight size={16} /></>}
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
        <section className="relative bg-gradient-to-br from-[#0a2540] via-[#0e3a6e] to-[#1a4f8c] py-20 lg:py-32 px-6 overflow-hidden">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-400/10 blur-[120px] rounded-full pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-300/10 blur-[100px] rounded-full pointer-events-none"></div>

          <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16 relative z-10">
            <div className="lg:w-1/2">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur text-white text-[10px] font-black uppercase tracking-[0.2em] mb-6 border border-white/20">
                ✦ NABH Accredited Eye Care
              </div>
              <h1 className="text-5xl lg:text-7xl font-black text-white mb-6 leading-tight tracking-tight">
                Restore Your <br />
                <span className="text-blue-300">Crystal Clear</span><br />
                <span className="text-blue-300">Vision.</span>
              </h1>
              <p className="text-lg text-white/70 mb-10 max-w-lg leading-relaxed font-medium">
                World-class cataract treatments using advanced lens technology. A painless 15-minute procedure with same-day discharge — and the freedom to see clearly again.
              </p>

              <div className="flex flex-wrap gap-3 mb-8">
                {[
                  { t: "15-Min Procedure", i: <Zap size={14} /> },
                  { t: "Same-Day Discharge", i: <CheckCircle2 size={14} /> },
                  { t: "0% EMI Available", i: <Wallet size={14} /> },
                  { t: "Insurance Accepted", i: <ShieldCheck size={14} /> },
                ].map((tag, idx) => (
                  <div key={idx} className="flex items-center gap-2 bg-white/10 backdrop-blur px-4 py-2 rounded-xl border border-white/20 text-white font-semibold text-xs">
                    <span className="text-blue-300">{tag.i}</span> {tag.t}
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
                <div className="flex items-center justify-center gap-2 text-blue-400 mb-1">{s.icon}</div>
                <div className="text-3xl font-black text-white">{s.value}</div>
                <div className="text-slate-400 text-xs font-semibold mt-1 uppercase tracking-wider">{s.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* ── SYMPTOMS SECTION ── */}
        <section className="py-20 px-6 bg-slate-50">
          <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-16 items-center">
            <div className="lg:w-1/2">
              <span className="text-blue-600 text-xs font-black uppercase tracking-widest">Know The Signs</span>
              <h2 className="text-4xl lg:text-5xl font-black text-slate-900 mt-3 mb-6">
                Do You Have a <span className="text-blue-600">Cataract?</span>
              </h2>
              <p className="text-slate-500 text-base leading-relaxed mb-8">
                Cataracts develop slowly as the natural lens of the eye becomes cloudy. Most people over 60 develop cataracts, but they can occur earlier. If you experience any of these symptoms, a free screening can confirm it.
              </p>
              <ul className="space-y-3">
                {symptoms.map((item, i) => (
                  <li key={i} className="flex items-start gap-3 bg-white border border-slate-200 rounded-2xl px-5 py-4 shadow-sm">
                    <AlertCircle size={18} className="text-blue-500 mt-0.5 flex-shrink-0" />
                    <span className="text-slate-700 text-sm font-semibold">{item.s}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="lg:w-1/2 relative h-[480px] w-full rounded-[40px] overflow-hidden shadow-2xl">
              <Image
                src="https://images.unsplash.com/photo-1579154235828-4519f39f946b?q=80&w=800"
                alt="Cataract Eye Examination" fill className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 to-transparent"></div>
              <div className="absolute bottom-6 left-6 right-6 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-500 flex items-center justify-center">
                    <Sparkles size={16} className="text-white" />
                  </div>
                  <div>
                    <div className="text-white font-black text-sm">Free Cataract Screening</div>
                    <div className="text-slate-300 text-xs">Comprehensive eye assessment — no cost</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── TECHNOLOGY GRID ── */}
        <section className="py-24 bg-slate-900 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <span className="text-blue-400 text-xs font-black uppercase tracking-widest">What We Offer</span>
              <h2 className="text-4xl lg:text-5xl font-black text-white mt-3 tracking-tight">
                Precision <span className="text-blue-400">Eye Care</span>
              </h2>
              <p className="text-slate-400 mt-4 text-lg font-medium max-w-2xl mx-auto">
                From surgery technique to lens selection and post-op follow-up — we cover every step of your cataract treatment.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {treatments.map((t, i) => (
                <div
                  key={i}
                  className="group relative bg-slate-800 rounded-[32px] p-8 border border-slate-700 hover:border-blue-500/50 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-blue-900/30 flex flex-col"
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
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-400 flex-shrink-0"></span>
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
              <span className="text-blue-600 text-xs font-black uppercase tracking-widest">Your Journey</span>
              <h2 className="text-4xl lg:text-5xl font-black text-slate-900 mt-3 tracking-tight">
                How It <span className="text-blue-600">Works</span>
              </h2>
              <p className="text-slate-500 mt-4 text-lg font-medium">From first call to clear vision in 4 simple steps.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
              <div className="hidden lg:block absolute top-12 left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-blue-100 via-blue-400 to-blue-100 z-0"></div>
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

        {/* ── WHY CHOOSE US ── */}
        <section className="py-20 px-4 bg-slate-50">
          <div className="max-w-7xl mx-auto bg-slate-900 rounded-[50px] p-10 lg:p-20 flex flex-col lg:flex-row items-center gap-16 relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 w-1/2 h-full bg-blue-500/5 blur-[120px] rounded-full pointer-events-none"></div>

            <div className="lg:w-1/2 relative z-10">
              <span className="text-blue-400 text-xs font-black uppercase tracking-widest mb-4 block">Our Promise</span>
              <h2 className="text-4xl lg:text-5xl font-black text-white mb-10 leading-tight">
                Why Choose Our Surgical Centre?
              </h2>
              <div className="space-y-4">
                {[
                  {
                    h: "Modular OT Environment",
                    p: "Zero-infection certified surgical suites with HEPA-filtered air and laminar airflow. Your safety is our top priority.",
                  },
                  {
                    h: "Top-Tier Branded Lenses",
                    p: "Authorised partners for Alcon AcrySof, Zeiss AT LISA, and Johnson & Johnson TECNIS. Only original, verified lenses.",
                  },
                  {
                    h: "TPA & Insurance Support",
                    p: "Fully cashless hospitalization for all major insurers. Our team handles documentation — approved in under 30 minutes.",
                  },
                  {
                    h: "Senior Surgeons Only",
                    p: "Every cataract procedure is performed or directly supervised by an experienced vitreo-retinal or phaco specialist.",
                  },
                ].map((item, idx) => (
                  <div key={idx} className="flex gap-4 p-6 bg-white/5 backdrop-blur-sm rounded-3xl border border-white/10 hover:bg-white/10 transition">
                    <CheckCircle2 className="text-blue-400 shrink-0 mt-0.5" size={22} />
                    <div>
                      <h4 className="font-black text-lg text-white mb-1">{item.h}</h4>
                      <p className="text-slate-400 text-sm leading-relaxed">{item.p}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:w-1/2 relative h-[500px] w-full rounded-[40px] overflow-hidden shadow-2xl border border-white/5">
              <Image
                src="https://images.unsplash.com/photo-1579154235828-4519f39f946b?q=80&w=800"
                alt="Modern Eye Surgery Equipment" fill className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 to-transparent"></div>
              <div className="absolute bottom-6 left-6 right-6 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-500 flex items-center justify-center">
                    <Star size={16} className="text-white fill-white" />
                  </div>
                  <div>
                    <div className="text-white font-black text-sm">Rated 4.9 / 5 by patients</div>
                    <div className="text-slate-300 text-xs">Based on 8,000+ cataract reviews</div>
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
              <span className="text-blue-600 text-xs font-black uppercase tracking-widest">Transparent Pricing</span>
              <h2 className="text-4xl lg:text-5xl font-black text-slate-900 mt-3">
                Cost & <span className="text-blue-600">EMI Plans</span>
              </h2>
              <p className="text-slate-500 mt-4 text-base max-w-xl mx-auto">
                No hidden charges. No surprises. The cost depends on the lens you choose — we'll walk you through every option.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              {[
                {
                  name: "Standard IOL",
                  price: "₹15,000",
                  unit: "per eye",
                  features: ["Monofocal lens", "Distance vision only", "Reading glasses needed", "1-year follow-up"],
                  highlight: false,
                },
                {
                  name: "Multifocal / EDOF",
                  price: "₹40,000",
                  unit: "per eye",
                  features: ["Near + Distance vision", "Glasses-free lifestyle", "Reduces glare & halos", "Lifetime warranty"],
                  highlight: true,
                },
                {
                  name: "Toric / Premium",
                  price: "₹50,000+",
                  unit: "per eye",
                  features: ["Corrects astigmatism", "Branded lens (Alcon / Zeiss)", "FLACS laser included", "Lifetime warranty"],
                  highlight: false,
                },
              ].map((plan, i) => (
                <div
                  key={i}
                  className={`rounded-[32px] p-8 border transition-all duration-300 hover:-translate-y-1 ${
                    plan.highlight
                      ? "bg-slate-900 border-blue-500/30 shadow-2xl shadow-blue-900/20"
                      : "bg-white border-slate-200 shadow-sm hover:shadow-lg"
                  }`}
                >
                  {plan.highlight && (
                    <span className="text-[10px] font-black uppercase tracking-widest text-blue-400 bg-blue-400/10 px-3 py-1 rounded-full mb-4 inline-block border border-blue-400/20">
                      Most Popular
                    </span>
                  )}
                  <h3 className={`text-lg font-black mb-1 ${plan.highlight ? "text-white" : "text-slate-900"}`}>{plan.name}</h3>
                  <div className={`text-4xl font-black mb-1 ${plan.highlight ? "text-blue-400" : "text-blue-600"}`}>{plan.price}</div>
                  <div className={`text-xs mb-6 ${plan.highlight ? "text-slate-400" : "text-slate-500"}`}>{plan.unit}</div>
                  <ul className="space-y-3">
                    {plan.features.map((f, fi) => (
                      <li key={fi} className={`flex items-center gap-2 text-sm font-medium ${plan.highlight ? "text-slate-300" : "text-slate-600"}`}>
                        <CheckCircle2 size={15} className={plan.highlight ? "text-blue-400" : "text-blue-600"} />
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-[32px] p-8 text-white text-center">
              <h3 className="text-2xl font-black mb-2">0% EMI — Pay in Easy Installments</h3>
              <p className="text-white/80 text-sm mb-6 max-w-lg mx-auto">
                Split your cataract surgery cost across 6, 9, or 12 months — zero interest, zero processing fees.
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
              <span className="text-blue-600 text-xs font-black uppercase tracking-widest">Got Questions?</span>
              <h2 className="text-4xl lg:text-5xl font-black text-slate-900 mt-3">
                Cataract Surgery <span className="text-blue-600">FAQs</span>
              </h2>
            </div>

            <div className="space-y-3">
              {faqs.map((faq, i) => (
                <div
                  key={i}
                  className={`rounded-2xl border overflow-hidden transition-all duration-300 ${
                    openFaq === i ? "bg-white border-blue-200 shadow-lg" : "bg-white border-slate-200"
                  }`}
                >
                  <button
                    className="w-full flex items-center justify-between p-6 text-left"
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  >
                    <span className="font-bold text-slate-900 pr-4 text-sm md:text-base">{faq.q}</span>
                    <ChevronDown
                      size={20}
                      className={`text-slate-400 flex-shrink-0 transition-transform duration-300 ${openFaq === i ? "rotate-180 text-blue-600" : ""}`}
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
            <h2 className="text-4xl lg:text-5xl font-black mb-4">See the World Clearly Again.</h2>
            <p className="text-slate-400 text-lg mb-10">
              Book your free cataract screening today. Our specialist will call you within 15 minutes.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="tel:8882804301">
                <button className="px-10 py-4 rounded-2xl bg-gradient-to-r from-blue-600 to-blue-700 text-white font-bold shadow-xl hover:scale-105 transition flex items-center gap-2 justify-center">
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