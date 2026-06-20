"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Image from "next/image";
import {
  CheckCircle2,
  Loader2,
  Waves,
  Zap,
  Activity,
  ShieldCheck,
  Clock,
  Stethoscope,
  Phone,
  ArrowRight,
  BadgeCheck,
  Users,
  Star,
  Award,
  Wallet,
  ChevronDown,
  HeartPulse,
  AlertCircle,
  Microscope,
  Thermometer,
} from "lucide-react";

// ─── PHONE VALIDATION ────────────────────────────────────────────────────────
function getPhoneError(rawValue: string): string | null {
  const digits = rawValue.trim();

  if (!digits) return "Mobile number is required";
  if (!/^\d+$/.test(digits)) return "Only digits are allowed";
  if (digits.length !== 10) return "Enter a valid 10-digit mobile number";
  if (!/^[6-9]/.test(digits)) return "Mobile number must start with 6, 7, 8, or 9";

  // All digits identical (e.g. 9999999999)
  if (/^(\d)\1{9}$/.test(digits)) return "Please enter a valid mobile number";

  // Simple ascending/descending sequential numbers
  const isAscendingSeq = digits
    .split("")
    .every((d, i, arr) => i === 0 || Number(d) === Number(arr[i - 1]) + 1);
  const isDescendingSeq = digits
    .split("")
    .every((d, i, arr) => i === 0 || Number(d) === Number(arr[i - 1]) - 1);
  if (isAscendingSeq || isDescendingSeq) return "Please enter a valid mobile number";

  return null;
}

// ─── DATA ───────────────────────────────────────────────────────────────────

const treatments = [
  {
    title: "Varicose Veins Laser (EVLT)",
    badge: "Most Popular",
    badgeColor: "text-red-700 bg-red-100 border-red-200",
    desc: "Endovenous Laser Treatment (EVLT) uses laser energy delivered inside the faulty vein to seal it permanently. No incisions, no stitches, walk in and walk out the same day.",
    details: ["No cuts or stitches", "60-minute procedure", "Same-day discharge", "Permanent results"],
    icon: <Zap className="text-red-500" size={30} />,
    iconBg: "bg-red-50",
    border: "border-red-100 hover:border-red-300",
    accent: "bg-red-500",
  },
  {
    title: "DVT Management",
    badge: "Emergency Care",
    badgeColor: "text-rose-700 bg-rose-100 border-rose-200",
    desc: "Comprehensive Deep Vein Thrombosis care including anticoagulation therapy, catheter-directed thrombolysis (CDT), and inferior vena cava (IVC) filter placement for high-risk clots.",
    details: ["Anticoagulation therapy", "Catheter thrombolysis", "IVC filter if needed", "Pulmonary embolism prevention"],
    icon: <Activity className="text-rose-500" size={30} />,
    iconBg: "bg-rose-50",
    border: "border-rose-100 hover:border-rose-300",
    accent: "bg-rose-500",
  },
  {
    title: "Sclerotherapy",
    badge: "Spider Veins",
    badgeColor: "text-blue-700 bg-blue-100 border-blue-200",
    desc: "Micro-injection of a specialised sclerosing agent directly into spider veins and small reticular veins. They fade and disappear over 4–6 weeks. No anaesthesia required.",
    details: ["No anaesthesia needed", "15–30 min session", "Multiple veins per visit", "Results in 4–6 weeks"],
    icon: <Waves className="text-blue-500" size={30} />,
    iconBg: "bg-blue-50",
    border: "border-blue-100 hover:border-blue-300",
    accent: "bg-blue-500",
  },
  {
    title: "Diabetic Foot Care",
    badge: "Vascular Intervention",
    badgeColor: "text-teal-700 bg-teal-100 border-teal-200",
    desc: "Specialised angioplasty and bypass procedures to restore blood flow to the feet in diabetic patients, preventing ulcers, gangrene, and limb amputation.",
    details: ["Angioplasty / bypass", "Non-healing wound care", "Peripheral artery disease", "Prevents amputation"],
    icon: <Stethoscope className="text-teal-500" size={30} />,
    iconBg: "bg-teal-50",
    border: "border-teal-100 hover:border-teal-300",
    accent: "bg-teal-500",
  },
];

const stats = [
  { value: "12,000+", label: "Procedures Done", icon: <Users size={20} /> },
  { value: "4.9 / 5", label: "Patient Rating", icon: <Star size={20} /> },
  { value: "60 Min", label: "Procedure Time", icon: <Clock size={20} /> },
  { value: "NABH", label: "Accredited Hospitals", icon: <Award size={20} /> },
];

const conditions = [
  "Varicose Veins (Grade I–IV)",
  "Spider Veins / Thread Veins",
  "Deep Vein Thrombosis (DVT)",
  "Chronic Venous Insufficiency",
  "Peripheral Artery Disease (PAD)",
  "Diabetic Foot Ulcers",
  "Leg Swelling & Oedema",
  "Venous Leg Ulcers",
  "Pulmonary Embolism (PE)",
  "Carotid Artery Disease",
  "Aortic Aneurysm",
  "Raynaud's Phenomenon",
];

const symptoms = [
  { s: "Twisted, rope-like bulging veins visible under skin" },
  { s: "Aching, heavy, or tired legs — especially after standing" },
  { s: "Leg swelling, particularly around ankles by evening" },
  { s: "Burning, throbbing, or cramping in legs" },
  { s: "Itchy skin over a vein, or skin discoloration" },
  { s: "Non-healing sores or ulcers near the ankle" },
];

const processSteps = [
  {
    step: "01",
    title: "Free Consultation",
    desc: "Our vascular surgeon reviews your symptoms and history. A Duplex Doppler Ultrasound is arranged to map the faulty veins and assess blood flow.",
    icon: <HeartPulse size={22} className="text-red-400" />,
  },
  {
    step: "02",
    title: "Doppler Ultrasound",
    desc: "A non-invasive colour Doppler ultrasound scan maps every refluxing vein, identifies clots, and gives the surgeon a precise treatment roadmap.",
    icon: <Microscope size={22} className="text-red-400" />,
  },
  {
    step: "03",
    title: "Laser Procedure",
    desc: "EVLT or sclerotherapy — performed under local anaesthesia in a day-care setting. The entire procedure takes 45–60 minutes. Zero stitches.",
    icon: <Zap size={22} className="text-red-400" />,
  },
  {
    step: "04",
    title: "Walk Out Same Day",
    desc: "You walk out within 2 hours. Wear compression stockings for 2 weeks. Most patients return to normal activity in 24–48 hours.",
    icon: <CheckCircle2 size={22} className="text-red-400" />,
  },
];

const faqs = [
  {
    q: "Are varicose veins dangerous if left untreated?",
    a: "Yes. Untreated varicose veins progressively worsen over time. They can lead to chronic venous insufficiency, skin discoloration, painful leg ulcers, and deep vein thrombosis (DVT). A clot in a varicose vein can travel to the lungs (pulmonary embolism) — a life-threatening emergency. Early treatment is simpler and prevents complications.",
  },
  {
    q: "Is EVLT laser treatment painful?",
    a: "No. EVLT is performed under tumescent local anaesthesia — the area is numbed completely before the laser is inserted. Most patients feel mild pressure but no pain during the procedure. Post-procedure discomfort is minimal and managed with simple painkillers for 2–3 days.",
  },
  {
    q: "Will the varicose veins come back after laser treatment?",
    a: "The treated veins are permanently closed and absorbed by the body — they will not return. However, new varicose veins can form in adjacent veins over time, especially if underlying risk factors (obesity, prolonged standing, pregnancy) persist. Our surgeons treat the root cause (saphenous reflux) to minimise recurrence.",
  },
  {
    q: "What is DVT and how serious is it?",
    a: "Deep Vein Thrombosis is a blood clot forming in a deep vein, usually in the leg. Symptoms include one-sided leg swelling, warmth, redness, and pain. DVT is serious because the clot can break off and travel to the lungs (pulmonary embolism), which can be fatal. If you suspect DVT, seek medical care immediately.",
  },
  {
    q: "Is vascular surgery covered by insurance?",
    a: "Yes. EVLT for varicose veins, DVT treatment, angioplasty, and diabetic foot interventions are covered by most health insurance policies and government schemes (CGHS, ESI, ECHS). Our team handles all TPA documentation and cashless approvals — typically processed in under 30 minutes.",
  },
  {
    q: "How long is the recovery after varicose vein laser treatment?",
    a: "Most patients walk out within 2 hours of the procedure. You'll need to wear compression stockings for 2 weeks and avoid strenuous exercise for 1 week. Most people return to desk work within 24 hours and full activity within 1–2 weeks. There are no stitches or wounds to care for.",
  },
];

const whatsappUrl = `https://wa.me/918882804301?text=${encodeURIComponent("Hello HealviaCare, I want to consult a vascular surgeon for varicose veins / DVT treatment.")}`;

// ─── FormCard lifted OUTSIDE VascularSurgeryPage to prevent remount on every keystroke ──
interface FormCardProps {
  form: { name: string; phone: string };
  setForm: React.Dispatch<React.SetStateAction<{ name: string; phone: string }>>;
  loading: boolean;
  submitted: boolean;
  setSubmitted: React.Dispatch<React.SetStateAction<boolean>>;
  onSubmit: (e: React.FormEvent) => void;
  phoneError: string | null;
  setPhoneError: React.Dispatch<React.SetStateAction<string | null>>;
  phoneTouched: boolean;
  setPhoneTouched: React.Dispatch<React.SetStateAction<boolean>>;
}

function FormCard({
  form,
  setForm,
  loading,
  submitted,
  setSubmitted,
  onSubmit,
  phoneError,
  setPhoneError,
  phoneTouched,
  setPhoneTouched,
}: FormCardProps) {
  if (submitted) {
    return (
      <div className="bg-white p-12 rounded-[40px] shadow-2xl border border-red-50 text-center">
        <div className="w-20 h-20 bg-green-50 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 size={40} />
        </div>
        <h2 className="text-2xl font-black text-slate-900 mb-2">Request Received!</h2>
        <p className="text-slate-500 mb-8 text-sm leading-relaxed">
          Our vascular specialist will call you within 10 minutes.
        </p>
        <button
          onClick={() => {
            setSubmitted(false);
            setForm({ name: "", phone: "" });
            setPhoneTouched(false);
            setPhoneError(null);
          }}
          className="text-red-600 font-bold text-sm hover:underline"
        >
          Book for someone else?
        </button>
      </div>
    );
  }

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const digitsOnly = e.target.value.replace(/\D/g, "").slice(0, 10);
    setForm({ ...form, phone: digitsOnly });
    if (phoneTouched) {
      setPhoneError(getPhoneError(digitsOnly));
    }
  };

  const handlePhoneBlur = () => {
    setPhoneTouched(true);
    setPhoneError(getPhoneError(form.phone));
  };

  const showPhoneError = phoneTouched && phoneError;

  return (
    <div className="bg-white p-8 rounded-[40px] shadow-2xl border border-slate-100">
      <div className="flex items-center gap-2 mb-1">
        <BadgeCheck size={18} className="text-red-600" />
        <span className="text-xs font-black text-red-600 uppercase tracking-widest">100% Free</span>
      </div>
      <h2 className="text-2xl font-black mb-1 text-slate-900">Laser Consultation</h2>
      <p className="text-slate-500 text-sm mb-6 font-medium">Book a free screening for Varicose Veins or DVT.</p>
      <form onSubmit={onSubmit} className="space-y-4" noValidate>
        <input
          type="text"
          placeholder="Patient Name"
          required
          className="w-full p-4 rounded-2xl bg-slate-100 border border-slate-200 text-slate-900 placeholder-slate-400 font-medium outline-none focus:ring-2 focus:ring-red-500 transition-all"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <div>
          <input
            type="tel"
            inputMode="numeric"
            placeholder="Mobile Number"
            required
            maxLength={10}
            className={`w-full p-4 rounded-2xl bg-slate-100 border text-slate-900 placeholder-slate-400 font-medium outline-none focus:ring-2 transition-all ${
              showPhoneError
                ? "border-red-400 focus:ring-red-400"
                : "border-slate-200 focus:ring-red-500"
            }`}
            value={form.phone}
            onChange={handlePhoneChange}
            onBlur={handlePhoneBlur}
          />
          {showPhoneError && (
            <div className="flex items-center gap-1.5 mt-2 text-red-500 text-xs font-semibold">
              <AlertCircle size={14} />
              {phoneError}
            </div>
          )}
        </div>
        <button
          disabled={loading}
          className="w-full py-4 bg-gradient-to-r from-red-600 to-rose-600 text-white rounded-2xl font-black text-base hover:shadow-xl hover:-translate-y-0.5 active:scale-95 shadow-lg shadow-red-900/20 transition-all flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {loading ? <Loader2 className="animate-spin" size={20} /> : <>Talk to a Vascular Surgeon <ArrowRight size={16} /></>}
        </button>
      </form>
      <p className="text-center text-xs text-slate-400 mt-4">🔒 Your details are 100% confidential</p>
    </div>
  );
}

// ─── COMPONENT ───────────────────────────────────────────────────────────────

export default function VascularSurgeryPage() {
  const [form, setForm] = useState({ name: "", phone: "" });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [phoneError, setPhoneError] = useState<string | null>(null);
  const [phoneTouched, setPhoneTouched] = useState(false);

  // ✅ IMPROVED: Better error handling, timeout, and CORS support
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.name.trim()) return;

    // Final guard: block submission on invalid/fake numbers
    const error = getPhoneError(form.phone);
    if (error) {
      setPhoneTouched(true);
      setPhoneError(error);
      return;
    }

    setLoading(true);
    try {
      // Create abort controller for timeout
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout

      const res = await fetch("/api/leads", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // Include cookies if using sessions
        body: JSON.stringify({
          name: form.name.trim(),
          phone: form.phone.trim(),
          service: "Vascular Surgery",
          source: "vascular-landing-page",
        }),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      // Check for HTTP errors
      if (!res.ok) {
        let errorMessage = "Something went wrong";
        try {
          const data = await res.json();
          errorMessage = data.error || data.message || errorMessage;
        } catch {
          errorMessage = `Server error (${res.status})`;
        }
        throw new Error(errorMessage);
      }

      await res.json();

      // Success
      setSubmitted(true);
      setForm({ name: "", phone: "" });
      setPhoneTouched(false);
      setPhoneError(null);
    } catch (error: any) {
      // More specific error messages for better debugging
      let errorMsg = "Connectivity issue. Please try again later.";

      if (error.name === "AbortError") {
        errorMsg = "Request timed out. Please check your connection and try again.";
      } else if (error instanceof TypeError) {
        errorMsg = "Network error. Please check your internet connection.";
      } else if (error.message) {
        errorMsg = error.message;
      }

      // Log for debugging in browser console
      console.error("Form submission error:", error);
      alert(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header />
      <main className="pt-20 bg-white">

        {/* ── HERO ── */}
        <section className="relative bg-gradient-to-br from-[#1a0505] via-[#5a0f0f] to-[#9b1c1c] py-20 lg:py-32 px-6 overflow-hidden">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-red-400/10 blur-[120px] rounded-full pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-rose-300/10 blur-[100px] rounded-full pointer-events-none"></div>

          <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16 relative z-10">
            <div className="lg:w-1/2">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur text-white text-[10px] font-black uppercase tracking-[0.2em] mb-6 border border-white/20">
                ✦ Advanced Laser Vascular Care
              </div>
              <h1 className="text-5xl lg:text-7xl font-black text-white mb-6 leading-tight tracking-tight">
                Healthy Legs. <br />
                <span className="text-red-300">Active Life.</span>
              </h1>
              <p className="text-lg text-white/70 mb-10 max-w-lg leading-relaxed font-medium">
                Expert laser treatment for Varicose Veins, DVT, Spider Veins, and Diabetic Foot. Say goodbye to leg pain and visible veins — walk in, walk out the same day.
              </p>

              <div className="flex flex-wrap gap-3 mb-8">
                {[
                  { t: "Zero Incisions", i: <ShieldCheck size={14} /> },
                  { t: "Same-Day Discharge", i: <CheckCircle2 size={14} /> },
                  { t: "0% EMI Available", i: <Wallet size={14} /> },
                  { t: "Cashless Insurance", i: <Award size={14} /> },
                ].map((tag, idx) => (
                  <div key={idx} className="flex items-center gap-2 bg-white/10 backdrop-blur px-4 py-2 rounded-xl border border-white/20 text-white font-semibold text-xs">
                    <span className="text-red-300">{tag.i}</span> {tag.t}
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
              <FormCard
                form={form}
                setForm={setForm}
                loading={loading}
                submitted={submitted}
                setSubmitted={setSubmitted}
                onSubmit={handleSubmit}
                phoneError={phoneError}
                setPhoneError={setPhoneError}
                phoneTouched={phoneTouched}
                setPhoneTouched={setPhoneTouched}
              />
            </div>
          </div>
        </section>

        {/* ── STATS STRIP ── */}
        <section className="bg-slate-900 py-10 px-6">
          <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((s, i) => (
              <div key={i} className="text-center">
                <div className="flex items-center justify-center gap-2 text-red-400 mb-1">{s.icon}</div>
                <div className="text-3xl font-black text-white">{s.value}</div>
                <div className="text-slate-400 text-xs font-semibold mt-1 uppercase tracking-wider">{s.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* ── SYMPTOMS ── */}
        <section className="py-20 px-6 bg-slate-50">
          <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-16 items-center">
            <div className="lg:w-1/2">
              <span className="text-red-600 text-xs font-black uppercase tracking-widest">Know The Signs</span>
              <h2 className="text-4xl lg:text-5xl font-black text-slate-900 mt-3 mb-6">
                Do You Have <span className="text-red-600">Varicose Veins?</span>
              </h2>
              <p className="text-slate-500 text-base leading-relaxed mb-8">
                Varicose veins occur when vein valves weaken, allowing blood to pool and veins to bulge. They affect 1 in 4 adults and worsen progressively. If you notice any of these symptoms, a free Doppler screening can confirm the diagnosis.
              </p>
              <ul className="space-y-3">
                {symptoms.map((item, i) => (
                  <li key={i} className="flex items-start gap-3 bg-white border border-slate-200 rounded-2xl px-5 py-4 shadow-sm">
                    <AlertCircle size={18} className="text-red-500 mt-0.5 flex-shrink-0" />
                    <span className="text-slate-700 text-sm font-semibold">{item.s}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="lg:w-1/2 relative h-[480px] w-full rounded-[40px] overflow-hidden shadow-2xl">
              <Image
                src="https://images.unsplash.com/photo-1551076805-e1869033e561?q=80&w=800"
                alt="Vascular Surgery" fill className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 to-transparent"></div>
              <div className="absolute bottom-6 left-6 right-6 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-red-500 flex items-center justify-center">
                    <Thermometer size={16} className="text-white" />
                  </div>
                  <div>
                    <div className="text-white font-black text-sm">Free Doppler Ultrasound Screening</div>
                    <div className="text-slate-300 text-xs">Comprehensive vein mapping — no cost</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── CONDITIONS GRID ── */}
        <section className="py-16 px-6 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <span className="text-red-600 text-xs font-black uppercase tracking-widest">What We Treat</span>
              <h2 className="text-4xl lg:text-5xl font-black text-slate-900 mt-3">
                Vascular Conditions We <span className="text-red-600">Specialise In</span>
              </h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {conditions.map((c, i) => (
                <div key={i} className="flex items-center gap-3 bg-white border border-slate-200 rounded-2xl px-5 py-4 shadow-sm hover:border-red-300 hover:shadow-md transition group">
                  <AlertCircle size={16} className="text-red-500 flex-shrink-0 group-hover:scale-110 transition" />
                  <span className="text-slate-800 text-sm font-semibold">{c}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── TREATMENT CARDS — BRIGHT ── */}
        <section className="py-24 px-6 bg-slate-50">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <span className="text-red-600 text-xs font-black uppercase tracking-widest">Our Procedures</span>
              <h2 className="text-4xl lg:text-5xl font-black text-slate-900 mt-3 tracking-tight">
                Specialised <span className="text-red-600">Vascular Care</span>
              </h2>
              <p className="text-slate-500 mt-4 text-lg font-medium max-w-2xl mx-auto">
                Minimally invasive procedures for every vascular condition — performed by senior vascular surgeons.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {treatments.map((t, i) => (
                <div
                  key={i}
                  className={`group relative bg-white rounded-[32px] p-8 border-2 ${t.border} shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 flex flex-col`}
                >
                  {/* Accent top bar */}
                  <div className={`absolute top-0 left-8 right-8 h-1 rounded-b-full ${t.accent} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>

                  {/* Badge */}
                  <span className={`text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full border mb-5 self-start ${t.badgeColor}`}>
                    {t.badge}
                  </span>

                  {/* Icon */}
                  <div className={`w-14 h-14 ${t.iconBg} rounded-2xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300`}>
                    {t.icon}
                  </div>

                  <h3 className="text-xl font-black text-slate-900 mb-3">{t.title}</h3>
                  <p className="text-slate-600 text-sm leading-relaxed mb-6 flex-grow">{t.desc}</p>

                  <ul className="space-y-2">
                    {t.details.map((d, di) => (
                      <li key={di} className="flex items-center gap-2 text-xs text-slate-700 font-semibold">
                        <CheckCircle2 size={13} className="text-red-500 flex-shrink-0" />
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
              <span className="text-red-600 text-xs font-black uppercase tracking-widest">Your Journey</span>
              <h2 className="text-4xl lg:text-5xl font-black text-slate-900 mt-3 tracking-tight">
                How It <span className="text-red-600">Works</span>
              </h2>
              <p className="text-slate-500 mt-4 text-lg font-medium">From your first call to walking out pain-free — 4 simple steps.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
              <div className="hidden lg:block absolute top-12 left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-red-100 via-red-400 to-red-100 z-0"></div>
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

        {/* ── WHY LASER DARK SECTION ── */}
        <section className="py-20 px-4 bg-slate-50">
          <div className="max-w-7xl mx-auto bg-slate-900 rounded-[50px] p-10 lg:p-20 flex flex-col lg:flex-row items-center gap-16 relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 w-1/2 h-full bg-red-500/5 blur-[120px] rounded-full pointer-events-none"></div>

            <div className="lg:w-1/2 relative z-10">
              <span className="text-red-400 text-xs font-black uppercase tracking-widest mb-4 block">Why Laser</span>
              <h2 className="text-4xl lg:text-5xl font-black text-white mb-10 leading-tight">
                Why Choose Laser Treatment?
              </h2>
              <div className="space-y-4">
                {[
                  { h: "Walk-In, Walk-Out Procedure", p: "Treatment takes less than 60 minutes. You walk in, get treated under local anaesthesia, and walk out — all on the same day." },
                  { h: "Painless & Bloodless", p: "The laser seals the vein from inside with no incisions, no stitches, and minimal post-procedure discomfort. Most patients need only mild painkillers." },
                  { h: "Full Insurance Coverage", p: "EVLT and DVT treatment are covered by all major insurers. Our team processes cashless TPA approvals in under 30 minutes." },
                  { h: "Permanent Results", p: "Treated veins are permanently closed and absorbed. No recurrence at the treated site. Compression stockings for 2 weeks and you're done." },
                ].map((item, idx) => (
                  <div key={idx} className="flex gap-4 p-6 bg-white/5 backdrop-blur-sm rounded-3xl border border-white/10 hover:bg-white/10 transition">
                    <ShieldCheck className="text-red-400 shrink-0 mt-0.5" size={22} />
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
                src="https://images.unsplash.com/photo-1551076805-e1869033e561?q=80&w=800"
                alt="Modern Vascular OT" fill className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent"></div>
              <div className="absolute bottom-6 left-6 right-6 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-red-500 flex items-center justify-center">
                    <Star size={16} className="text-white fill-white" />
                  </div>
                  <div>
                    <div className="text-white font-black text-sm">Rated 4.9 / 5 by patients</div>
                    <div className="text-slate-300 text-xs">Based on 9,000+ vascular reviews</div>
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
              <span className="text-red-600 text-xs font-black uppercase tracking-widest">Transparent Pricing</span>
              <h2 className="text-4xl lg:text-5xl font-black text-slate-900 mt-3">
                Cost & <span className="text-red-600">EMI Plans</span>
              </h2>
              <p className="text-slate-500 mt-4 text-base max-w-xl mx-auto">
                All-inclusive pricing — surgeon fee, OT, local anaesthesia, compression stockings, and follow-ups included.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              {[
                {
                  name: "Sclerotherapy",
                  price: "₹8,000",
                  unit: "per session",
                  features: ["Spider / thread veins", "No anaesthesia needed", "30-min session", "Multiple sessions may be needed"],
                  highlight: false,
                },
                {
                  name: "EVLT (Varicose Veins)",
                  price: "₹60,000",
                  unit: "all-inclusive (both legs)",
                  features: ["Endovenous Laser Treatment", "Day-care procedure", "Compression kit included", "Lifetime results"],
                  highlight: true,
                },
                {
                  name: "DVT / PAD Treatment",
                  price: "₹80,000+",
                  unit: "depending on severity",
                  features: ["Anticoagulation / Thrombolysis", "Angioplasty if needed", "Hospital stay included", "Insurance cashless"],
                  highlight: false,
                },
              ].map((plan, i) => (
                <div
                  key={i}
                  className={`rounded-[32px] p-8 border transition-all duration-300 hover:-translate-y-1 ${
                    plan.highlight
                      ? "bg-slate-900 border-red-500/30 shadow-2xl shadow-red-900/20"
                      : "bg-white border-slate-200 shadow-sm hover:shadow-lg"
                  }`}
                >
                  {plan.highlight && (
                    <span className="text-[10px] font-black uppercase tracking-widest text-red-400 bg-red-400/10 px-3 py-1 rounded-full mb-4 inline-block border border-red-400/20">
                      Most Popular
                    </span>
                  )}
                  <h3 className={`text-lg font-black mb-1 ${plan.highlight ? "text-white" : "text-slate-900"}`}>{plan.name}</h3>
                  <div className={`text-4xl font-black mb-1 ${plan.highlight ? "text-red-400" : "text-red-600"}`}>{plan.price}</div>
                  <div className={`text-xs mb-6 ${plan.highlight ? "text-slate-400" : "text-slate-500"}`}>{plan.unit}</div>
                  <ul className="space-y-3">
                    {plan.features.map((f, fi) => (
                      <li key={fi} className={`flex items-center gap-2 text-sm font-medium ${plan.highlight ? "text-slate-300" : "text-slate-600"}`}>
                        <CheckCircle2 size={15} className={plan.highlight ? "text-red-400" : "text-red-600"} />
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <div className="bg-gradient-to-r from-red-600 to-rose-600 rounded-[32px] p-8 text-white text-center">
              <h3 className="text-2xl font-black mb-2">0% EMI — Pay in Easy Installments</h3>
              <p className="text-white/80 text-sm mb-6 max-w-lg mx-auto">
                Split your vascular treatment cost across 6, 9, or 12 months — zero interest, zero processing fees.
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
              <span className="text-red-600 text-xs font-black uppercase tracking-widest">Got Questions?</span>
              <h2 className="text-4xl lg:text-5xl font-black text-slate-900 mt-3">
                Vascular <span className="text-red-600">FAQs</span>
              </h2>
            </div>
            <div className="space-y-3">
              {faqs.map((faq, i) => (
                <div
                  key={i}
                  className={`rounded-2xl border overflow-hidden transition-all duration-300 ${openFaq === i ? "bg-white border-red-200 shadow-lg" : "bg-white border-slate-200"}`}
                >
                  <button
                    className="w-full flex items-center justify-between p-6 text-left"
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  >
                    <span className="font-bold text-slate-900 pr-4 text-sm md:text-base">{faq.q}</span>
                    <ChevronDown
                      size={20}
                      className={`text-slate-400 flex-shrink-0 transition-transform duration-300 ${openFaq === i ? "rotate-180 text-red-600" : ""}`}
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
            <h2 className="text-4xl lg:text-5xl font-black mb-4">Say Goodbye to Leg Pain Today.</h2>
            <p className="text-slate-400 text-lg mb-10">
              Our vascular specialist will call you within 10 minutes of your enquiry.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="tel:8882804301">
                <button className="px-10 py-4 rounded-2xl bg-gradient-to-r from-red-600 to-rose-600 text-white font-bold shadow-xl hover:scale-105 transition flex items-center gap-2 justify-center">
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