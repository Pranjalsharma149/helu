"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Image from "next/image";
import {
  Zap,
  ShieldCheck,
  Scissors,
  Gem,
  CheckCircle2,
  Clock,
  CreditCard,
  UserCheck,
  Phone,
  ArrowRight,
  BadgeCheck,
  Users,
  Star,
  Award,
  Wallet,
  ChevronDown,
  HeartPulse,
  Activity,
  AlertCircle,
  Loader2,
  Microscope,
} from "lucide-react";

// ─── PHONE VALIDATION ──────────────────────────────────────────────────────
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

// ─── DATA ────────────────────────────────────────────────────────────────────

const stats = [
  { value: "20,000+", label: "Procedures Done", icon: <Users size={20} /> },
  { value: "4.9 / 5", label: "Patient Rating", icon: <Star size={20} /> },
  { value: "Same Day", label: "Discharge", icon: <Clock size={20} /> },
  { value: "NABH", label: "Accredited Hospitals", icon: <Award size={20} /> },
];

const conditions = [
  "Kidney Stones (Renal Calculi)",
  "Ureteric Stones",
  "Bladder Stones",
  "Prostate Enlargement (BPH)",
  "Urinary Tract Infections (UTI)",
  "Overactive Bladder",
  "Male Infertility",
  "Phimosis / Circumcision",
  "Urethral Stricture",
  "Hydrocele / Varicocele",
  "Bladder Cancer Screening",
  "Incontinence",
];

const processSteps = [
  {
    step: "01",
    title: "Free Consultation",
    desc: "Our senior urologist reviews your symptoms, ultrasound reports, and blood work to identify the root cause and recommend the precise treatment option.",
    icon: <HeartPulse size={22} className="text-sky-400" />,
  },
  {
    step: "02",
    title: "Diagnostics & Imaging",
    desc: "X-ray KUB, Ultrasound, CT Urography, Uroflowmetry, or PSA tests — arranged at a NABH hospital near you. Fast reports, same day.",
    icon: <Microscope size={22} className="text-sky-400" />,
  },
  {
    step: "03",
    title: "Laser / Minimal Procedure",
    desc: "Laser stone removal, HoLEP, ZSR circumcision, or vasectomy — performed by expert urologists. Most procedures finish in 30–60 minutes.",
    icon: <Zap size={22} className="text-sky-400" />,
  },
  {
    step: "04",
    title: "Same-Day Recovery",
    desc: "Most patients are discharged the same day. Your care manager schedules follow-ups, diet plan, and medication support until 100% recovery.",
    icon: <CheckCircle2 size={22} className="text-sky-400" />,
  },
];

const faqs = [
  {
    q: "How are kidney stones removed without surgery?",
    a: "We use RIRS (Retrograde Intrarenal Surgery) and URSL — flexible laser scopes that enter through the natural urinary tract. A Holmium laser breaks the stone into fine dust which passes out naturally. No incision, no stitches, same-day discharge. Stones up to 2.5cm can be treated this way.",
  },
  {
    q: "Is HoLEP better than TURP for prostate treatment?",
    a: "Yes. HoLEP (Holmium Laser Enucleation of the Prostate) is the current gold standard for BPH treatment. It has far less blood loss than TURP, works on any prostate size, requires a shorter hospital stay, and has a 15+ year track record of excellent outcomes with very low retreatment rates.",
  },
  {
    q: "Is ZSR circumcision painful?",
    a: "No. ZSR Stapler circumcision is done under local anaesthesia — you feel nothing during the procedure. It takes just 10 minutes. There are no stitches, minimal post-op discomfort, and healing is 3× faster than conventional circumcision. Most patients return to work within 2–3 days.",
  },
  {
    q: "What happens if a kidney stone is left untreated?",
    a: "Untreated kidney stones can cause severe pain (renal colic), block urine flow, lead to kidney infections (pyelonephritis), and eventually cause permanent kidney damage. Stones that don't pass on their own within 4–6 weeks should be treated. Don't wait — early laser treatment is simple and quick.",
  },
  {
    q: "Is urological surgery covered by insurance?",
    a: "Yes. Kidney stone removal (RIRS, URSL), HoLEP for prostate, hydrocele and varicocele surgeries are all covered by standard health insurance and government schemes (CGHS, ESI, ECHS). Our team handles all TPA cashless approvals — typically within 30 minutes.",
  },
  {
    q: "How quickly can treatment start?",
    a: "After your free consultation and diagnostic reports, we typically schedule the procedure within 24–48 hours at a premium NABH hospital near you. Emergency cases such as acute urinary obstruction can be handled on the same day.",
  },
];

const whatsappUrl = `https://wa.me/918882804301?text=${encodeURIComponent("Hello HealviaCare, I want to consult a urologist for kidney stone / prostate treatment.")}`;

// ─── FormCard lifted OUTSIDE UrologyPage to prevent remount on every keystroke ──
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
      <div className="bg-white p-12 rounded-[40px] shadow-2xl text-center border border-sky-100">
        <div className="w-20 h-20 bg-sky-50 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 size={40} className="text-sky-600" />
        </div>
        <h2 className="text-2xl font-black text-slate-900 mb-2">Request Received!</h2>
        <p className="text-slate-500 mb-8 text-sm leading-relaxed">
          Our urology counselor will call you within 15 minutes.
        </p>
        <button
          onClick={() => {
            setSubmitted(false);
            setForm({ name: "", phone: "" });
            setPhoneTouched(false);
            setPhoneError(null);
          }}
          className="text-sky-600 font-bold text-sm hover:underline"
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
        <BadgeCheck size={18} className="text-sky-600" />
        <span className="text-xs font-black text-sky-600 uppercase tracking-widest">100% Free</span>
      </div>
      <h2 className="text-2xl font-black mb-1 text-slate-900">Book Consultation</h2>
      <p className="text-slate-500 text-sm mb-6 font-medium">Get a free call back from our senior urologist.</p>

      <form onSubmit={onSubmit} className="space-y-4" noValidate>
        {/* Name */}
        <input
          type="text"
          placeholder="Patient Full Name"
          required
          className="w-full p-4 rounded-2xl bg-slate-100 border border-slate-200 text-slate-900 placeholder-slate-400 font-medium outline-none focus:ring-2 focus:ring-sky-500 transition-all"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />

        {/* Phone */}
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
                : "border-slate-200 focus:ring-sky-500"
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

        {/* Submit */}
        <button
          disabled={loading}
          className="w-full py-4 bg-gradient-to-r from-sky-600 to-blue-700 text-white rounded-2xl font-black text-base hover:shadow-xl hover:-translate-y-0.5 active:scale-95 shadow-lg shadow-sky-900/20 transition-all flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {loading ? <Loader2 className="animate-spin" size={20} /> : <>Book Free Call Back <ArrowRight size={16} /></>}
        </button>
      </form>

      <p className="text-center text-xs text-slate-400 mt-4">🔒 Your details are 100% confidential</p>
    </div>
  );
}

// ─── COMPONENT ───────────────────────────────────────────────────────────────

export default function UrologyPage() {
  // Form only collects name + phone
  const [form, setForm] = useState({ name: "", phone: "" });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [phoneError, setPhoneError] = useState<string | null>(null);
  const [phoneTouched, setPhoneTouched] = useState(false);

  // ✅ IMPROVED: Better error handling, timeout, and CORS support
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate name
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
          service: "Urology",
          source: "urology-landing-page",
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
        <section className="relative bg-gradient-to-br from-[#03111f] via-[#042d4f] to-[#0369a1] py-20 lg:py-32 px-6 overflow-hidden">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-sky-400/10 blur-[120px] rounded-full pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-300/10 blur-[100px] rounded-full pointer-events-none"></div>

          <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16 relative z-10">
            <div className="lg:w-1/2">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur text-white text-[10px] font-black uppercase tracking-[0.2em] mb-6 border border-white/20">
                ✦ Advanced Laser Urology Centre
              </div>
              <h1 className="text-5xl lg:text-7xl font-black text-white mb-6 leading-tight tracking-tight">
                Modern Care for <br />
                <span className="text-sky-300">Urological</span><br />
                <span className="text-sky-300">Health.</span>
              </h1>
              <p className="text-lg text-white/70 mb-10 max-w-lg leading-relaxed font-medium">
                Pain-free laser treatments for Kidney Stones, Prostate, and all urological conditions. US-FDA approved techniques — same-day discharge, zero cuts, zero scars.
              </p>

              <div className="flex flex-wrap gap-3 mb-8">
                {[
                  { t: "Laser Precision", i: <Zap size={14} /> },
                  { t: "Same-Day Discharge", i: <CheckCircle2 size={14} /> },
                  { t: "0% EMI Available", i: <Wallet size={14} /> },
                  { t: "Cashless Insurance", i: <ShieldCheck size={14} /> },
                ].map((tag, idx) => (
                  <div key={idx} className="flex items-center gap-2 bg-white/10 backdrop-blur px-4 py-2 rounded-xl border border-white/20 text-white font-semibold text-xs">
                    <span className="text-sky-300">{tag.i}</span> {tag.t}
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
                <div className="flex items-center justify-center gap-2 text-sky-400 mb-1">{s.icon}</div>
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
              <span className="text-sky-600 text-xs font-black uppercase tracking-widest">What We Treat</span>
              <h2 className="text-4xl lg:text-5xl font-black text-slate-900 mt-3">
                Urological Conditions We <span className="text-sky-600">Specialise In</span>
              </h2>
              <p className="text-slate-500 mt-4 text-base max-w-2xl mx-auto">
                From kidney stones and prostate issues to male reproductive health — our urologists handle the full spectrum.
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {conditions.map((c, i) => (
                <div key={i} className="flex items-center gap-3 bg-white border border-slate-200 rounded-2xl px-5 py-4 shadow-sm hover:border-sky-300 hover:shadow-md transition group">
                  <AlertCircle size={16} className="text-sky-500 flex-shrink-0 group-hover:scale-110 transition" />
                  <span className="text-slate-800 text-sm font-semibold">{c}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── TECHNOLOGY / PROCEDURE GRID ── */}
        <section className="py-24 px-6 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <span className="text-sky-600 text-xs font-black uppercase tracking-widest">Our Specialisations</span>
              <h2 className="text-4xl lg:text-5xl font-black text-slate-900 mt-3 tracking-tight">
                Leading-Edge <span className="text-sky-600">Laser Technology</span>
              </h2>
              <p className="text-slate-500 mt-4 text-lg font-medium max-w-2xl mx-auto">
                Precise, painless procedures for every urological condition — performed by senior specialists.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  title: "Laser Stone Removal",
                  badge: "Kidney Stones",
                  badgeColor: "text-sky-700 bg-sky-100 border-sky-200",
                  desc: "RIRS & URSL laser procedures destroy kidney and ureteric stones into fine dust — no incisions, no stitches, same-day discharge.",
                  details: ["Stones up to 2.5cm", "No incisions needed", "Same-day discharge", "Prevents recurrence"],
                  icon: <Gem className="text-sky-600" size={30} />,
                  iconBg: "bg-sky-50",
                  border: "border-sky-100 hover:border-sky-300",
                  accent: "bg-sky-600",
                },
                {
                  title: "Holmium Laser (HoLEP)",
                  badge: "Prostate / BPH",
                  badgeColor: "text-blue-700 bg-blue-100 border-blue-200",
                  desc: "Gold standard for enlarged prostate. HoLEP removes excess tissue with laser precision — minimal blood loss, faster recovery, no catheter.",
                  details: ["Gold standard for BPH", "Any prostate size", "Minimal blood loss", "15-yr proven results"],
                  icon: <Zap className="text-blue-600" size={30} />,
                  iconBg: "bg-blue-50",
                  border: "border-blue-100 hover:border-blue-300",
                  accent: "bg-blue-600",
                },
                {
                  title: "Painless Circumcision",
                  badge: "ZSR Stapler",
                  badgeColor: "text-cyan-700 bg-cyan-100 border-cyan-200",
                  desc: "ZSR Stapler technique — bloodless, stitchless, 10-minute procedure under local anaesthesia. Heals 3× faster than conventional methods.",
                  details: ["10-minute procedure", "No stitches / sutures", "3× faster healing", "Local anaesthesia only"],
                  icon: <Scissors className="text-cyan-600" size={30} />,
                  iconBg: "bg-cyan-50",
                  border: "border-cyan-100 hover:border-cyan-300",
                  accent: "bg-cyan-600",
                },
                {
                  title: "No-Scalpel Vasectomy",
                  badge: "Family Planning",
                  badgeColor: "text-indigo-700 bg-indigo-100 border-indigo-200",
                  desc: "Minimally invasive vasectomy — no scalpel, no sutures, no general anaesthesia. 20-minute clinic procedure with 99.9% effectiveness.",
                  details: ["No scalpel or sutures", "20-minute procedure", "99.9% effective", "Zero downtime"],
                  icon: <ShieldCheck className="text-indigo-600" size={30} />,
                  iconBg: "bg-indigo-50",
                  border: "border-indigo-100 hover:border-indigo-300",
                  accent: "bg-indigo-600",
                },
              ].map((t, i) => (
                <div
                  key={i}
                  className={`group relative bg-white rounded-[32px] p-8 border-2 ${t.border} shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 flex flex-col`}
                >
                  <div className={`absolute top-0 left-8 right-8 h-1 rounded-b-full ${t.accent} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
                  <span className={`text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full border mb-5 self-start ${t.badgeColor}`}>
                    {t.badge}
                  </span>
                  <div className={`w-14 h-14 ${t.iconBg} rounded-2xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300`}>
                    {t.icon}
                  </div>
                  <h3 className="text-xl font-black text-slate-900 mb-3">{t.title}</h3>
                  <p className="text-slate-600 text-sm leading-relaxed mb-6 flex-grow">{t.desc}</p>
                  <ul className="space-y-2">
                    {t.details.map((d, di) => (
                      <li key={di} className="flex items-center gap-2 text-xs text-slate-700 font-semibold">
                        <CheckCircle2 size={13} className="text-sky-500 flex-shrink-0" />
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
        <section className="py-24 px-6 bg-slate-50">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <span className="text-sky-600 text-xs font-black uppercase tracking-widest">Your Journey</span>
              <h2 className="text-4xl lg:text-5xl font-black text-slate-900 mt-3 tracking-tight">
                How It <span className="text-sky-600">Works</span>
              </h2>
              <p className="text-slate-500 mt-4 text-lg font-medium">From your first call to complete recovery — 4 simple steps.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
              <div className="hidden lg:block absolute top-12 left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-sky-100 via-sky-400 to-sky-100 z-0"></div>
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

        {/* ── PATIENT-FIRST DARK SECTION ── */}
        <section className="py-20 px-4 bg-white">
          <div className="max-w-7xl mx-auto bg-slate-950 text-white rounded-[60px] p-10 lg:p-20 overflow-hidden relative shadow-2xl">
            <div className="absolute top-0 right-0 w-1/2 h-full bg-sky-500/5 blur-[120px] rounded-full pointer-events-none"></div>

            <div className="flex flex-col lg:flex-row items-center gap-16 relative z-10">
              <div className="lg:w-1/2">
                <span className="text-sky-400 text-xs font-black uppercase tracking-widest mb-4 block">Our Promise</span>
                <h2 className="text-4xl lg:text-5xl font-black mb-12 tracking-tight">
                  Patient-First <br /><span className="text-sky-400">Approach.</span>
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                  {[
                    { h: "Quick Recovery", p: "Most patients return home the same day and resume work within 48 hours.", i: <Clock className="text-sky-400" size={22} /> },
                    { h: "No Scarring", p: "Advanced laser and stapler procedures leave no visible scars — completely minimally invasive.", i: <ShieldCheck className="text-sky-400" size={22} /> },
                    { h: "Cashless Care", p: "Direct billing with all major insurance providers and TPA networks. Zero paperwork hassle.", i: <CreditCard className="text-sky-400" size={22} /> },
                    { h: "Expert Surgeons", p: "All procedures performed by senior urologists with 15+ years of specialist experience.", i: <UserCheck className="text-sky-400" size={22} /> },
                  ].map((item, idx) => (
                    <div key={idx} className="flex flex-col gap-3">
                      <div className="w-12 h-12 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center">
                        {item.i}
                      </div>
                      <h4 className="text-white font-black text-xl">{item.h}</h4>
                      <p className="text-slate-400 text-sm leading-relaxed">{item.p}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="lg:w-1/2 relative h-[480px] w-full rounded-[40px] overflow-hidden shadow-2xl border border-white/5 group">
                <Image
                  src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=800"
                  alt="Urology Care" fill className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent"></div>
                <div className="absolute bottom-6 left-6 right-6 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-sky-500 flex items-center justify-center">
                      <Star size={16} className="text-white fill-white" />
                    </div>
                    <div>
                      <div className="text-white font-black text-sm">Rated 4.9 / 5 by patients</div>
                      <div className="text-slate-300 text-xs">Based on 12,000+ urology reviews</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── COST & EMI ── */}
        <section className="py-24 px-6 bg-slate-50">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <span className="text-sky-600 text-xs font-black uppercase tracking-widest">Transparent Pricing</span>
              <h2 className="text-4xl lg:text-5xl font-black text-slate-900 mt-3">
                Cost & <span className="text-sky-600">EMI Plans</span>
              </h2>
              <p className="text-slate-500 mt-4 text-base max-w-xl mx-auto">
                No hidden charges. All-inclusive pricing covering surgeon fee, OT, hospital stay, and medicines.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              {[
                {
                  name: "Laser Stone Removal",
                  price: "₹40,000",
                  unit: "per procedure (all-inclusive)",
                  features: ["RIRS / URSL procedure", "Hospital stay included", "Surgeon + OT fees", "Insurance cashless"],
                  highlight: false,
                },
                {
                  name: "HoLEP (Prostate)",
                  price: "₹80,000",
                  unit: "all-inclusive",
                  features: ["Gold standard BPH treatment", "Any prostate size", "2-night stay included", "Lifetime results"],
                  highlight: true,
                },
                {
                  name: "ZSR Circumcision",
                  price: "₹25,000",
                  unit: "per procedure",
                  features: ["Day-care procedure", "No stitches / cuts", "Local anaesthesia", "Insurance covered"],
                  highlight: false,
                },
              ].map((plan, i) => (
                <div
                  key={i}
                  className={`rounded-[32px] p-8 border transition-all duration-300 hover:-translate-y-1 ${
                    plan.highlight
                      ? "bg-slate-900 border-sky-500/30 shadow-2xl shadow-sky-900/20"
                      : "bg-white border-slate-200 shadow-sm hover:shadow-lg"
                  }`}
                >
                  {plan.highlight && (
                    <span className="text-[10px] font-black uppercase tracking-widest text-sky-400 bg-sky-400/10 px-3 py-1 rounded-full mb-4 inline-block border border-sky-400/20">
                      Most Common
                    </span>
                  )}
                  <h3 className={`text-lg font-black mb-1 ${plan.highlight ? "text-white" : "text-slate-900"}`}>{plan.name}</h3>
                  <div className={`text-4xl font-black mb-1 ${plan.highlight ? "text-sky-400" : "text-sky-600"}`}>{plan.price}</div>
                  <div className={`text-xs mb-6 ${plan.highlight ? "text-slate-400" : "text-slate-500"}`}>{plan.unit}</div>
                  <ul className="space-y-3">
                    {plan.features.map((f, fi) => (
                      <li key={fi} className={`flex items-center gap-2 text-sm font-medium ${plan.highlight ? "text-slate-300" : "text-slate-600"}`}>
                        <CheckCircle2 size={15} className={plan.highlight ? "text-sky-400" : "text-sky-600"} />
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <div className="bg-gradient-to-r from-sky-600 to-blue-700 rounded-[32px] p-8 text-white text-center">
              <h3 className="text-2xl font-black mb-2">0% EMI — Pay in Easy Installments</h3>
              <p className="text-white/80 text-sm mb-6 max-w-lg mx-auto">
                Split your urology procedure cost across 6, 9, or 12 months — zero interest, zero processing fees.
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
        <section className="py-24 px-6 bg-white">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-16">
              <span className="text-sky-600 text-xs font-black uppercase tracking-widest">Got Questions?</span>
              <h2 className="text-4xl lg:text-5xl font-black text-slate-900 mt-3">
                Urology <span className="text-sky-600">FAQs</span>
              </h2>
            </div>
            <div className="space-y-3">
              {faqs.map((faq, i) => (
                <div
                  key={i}
                  className={`rounded-2xl border overflow-hidden transition-all duration-300 ${openFaq === i ? "bg-white border-sky-200 shadow-lg" : "bg-white border-slate-200"}`}
                >
                  <button
                    className="w-full flex items-center justify-between p-6 text-left"
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  >
                    <span className="font-bold text-slate-900 pr-4 text-sm md:text-base">{faq.q}</span>
                    <ChevronDown
                      size={20}
                      className={`text-slate-400 flex-shrink-0 transition-transform duration-300 ${openFaq === i ? "rotate-180 text-sky-600" : ""}`}
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
            <h2 className="text-4xl lg:text-5xl font-black mb-4">Get Expert Urology Care Today.</h2>
            <p className="text-slate-400 text-lg mb-10">
              Our senior urologist will call you within 15 minutes of your enquiry.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="tel:8882804301">
                <button className="px-10 py-4 rounded-2xl bg-gradient-to-r from-sky-600 to-blue-700 text-white font-bold shadow-xl hover:scale-105 transition flex items-center gap-2 justify-center">
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