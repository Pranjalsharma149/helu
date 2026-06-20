"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Image from "next/image";
import {
  CheckCircle2,
  Loader2,
  Thermometer,
  HeartPulse,
  Wind,
  ClipboardCheck,
  ShieldCheck,
  Building2,
  Phone,
  Star,
  ArrowRight,
  Users,
  Award,
  Clock,
  Stethoscope,
  Activity,
  Pill,
  ChevronDown,
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

export default function InternalMedicinePage() {
  const [form, setForm] = useState({ name: "", phone: "" });
  const [phoneError, setPhoneError] = useState<string | null>(null);
  const [phoneTouched, setPhoneTouched] = useState(false);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const treatments = [
    {
      title: "Fever & Viral Care",
      desc: "Specialized inpatient management for Dengue, Typhoid, Malaria, and Severe Viral infections.",
      icon: <Thermometer size={28} />,
      lightBg: "#EFF6FF",
      iconColor: "#1D4ED8",
    },
    {
      title: "Diabetes & Hypertension",
      desc: "Comprehensive blood sugar and pressure control programs to prevent long-term complications.",
      icon: <HeartPulse size={28} />,
      lightBg: "#FEF2F2",
      iconColor: "#DC2626",
    },
    {
      title: "Respiratory Care",
      desc: "Expert treatment for Asthma, COPD, Pneumonia, and post-COVID respiratory recovery.",
      icon: <Wind size={28} />,
      lightBg: "#F0F9FF",
      iconColor: "#0284C7",
    },
    {
      title: "Health Screenings",
      desc: "Executive full-body checkups designed to detect lifestyle diseases before they become critical.",
      icon: <ClipboardCheck size={28} />,
      lightBg: "#ECFDF5",
      iconColor: "#059669",
    },
  ];

  const doctors = [
    {
      name: "Dr. Anil Sharma",
      degree: "MD, DNB — Internal Medicine",
      exp: "18 Years Experience",
      rating: "4.9",
      reviews: "1,240",
      img: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=400",
    },
    {
      name: "Dr. Priya Mehta",
      degree: "MD — General Medicine",
      exp: "12 Years Experience",
      rating: "4.8",
      reviews: "980",
      img: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=400",
    },
    {
      name: "Dr. Rajesh Gupta",
      degree: "MBBS, MD — Diabetology",
      exp: "15 Years Experience",
      rating: "4.9",
      reviews: "1,100",
      img: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?q=80&w=400",
    },
  ];

  const faqs = [
    {
      q: "What conditions does the Internal Medicine department treat?",
      a: "Our department handles a wide range of conditions including fever, infections (Dengue, Typhoid, Malaria), diabetes, hypertension, respiratory illnesses, thyroid disorders, anaemia, and complex multi-organ conditions.",
    },
    {
      q: "Are cashless insurance facilities available?",
      a: "Yes. We are empanelled with all major insurance providers and TPAs. Our dedicated insurance desk handles pre-authorization, claim processing, and discharge paperwork for a hassle-free experience.",
    },
    {
      q: "What is the process for emergency admission?",
      a: "Our 24/7 emergency desk is always active. Walk-in patients are triaged immediately. You can also call our helpline and our team will guide you through the admission process before you arrive.",
    },
    {
      q: "How long are typical inpatient stays?",
      a: "Duration depends on the condition. Viral fevers are typically managed in 4–7 days. Complex metabolic or chronic conditions may require longer stays. Our physicians review progress daily and plan early discharge when safe.",
    },
    {
      q: "Can I get a second opinion from your specialists?",
      a: "Absolutely. We offer second opinion consultations for complex diagnoses. Please bring all prior records, reports, and prescriptions for a thorough review.",
    },
  ];

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
          service: "Internal Medicine",
          source: "internal-medicine-landing-page",
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
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;500;600;700;800&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600&display=swap');

        .im-page { font-family: 'DM Sans', sans-serif; color: #1e293b; }
        .im-display { font-family: 'Sora', sans-serif; }

        /* Hero */
        .im-hero {
          background: linear-gradient(140deg, #eef6ff 0%, #e8f0fe 45%, #f0ebff 100%);
          position: relative; overflow: hidden;
        }
        .im-hero-blob1 {
          position: absolute; top: -120px; right: -100px;
          width: 500px; height: 500px; border-radius: 50%;
          background: radial-gradient(circle, rgba(59,130,246,0.13) 0%, transparent 70%);
          pointer-events: none;
        }
        .im-hero-blob2 {
          position: absolute; bottom: -80px; left: -80px;
          width: 360px; height: 360px; border-radius: 50%;
          background: radial-gradient(circle, rgba(99,102,241,0.10) 0%, transparent 70%);
          pointer-events: none;
        }

        /* Pulse badge */
        .im-pulse-ring {
          display: inline-block; width: 9px; height: 9px;
          border-radius: 50%; background: #3b82f6; position: relative;
        }
        .im-pulse-ring::before {
          content: ''; position: absolute; inset: -3px; border-radius: 50%;
          border: 2px solid #3b82f6; opacity: 0;
          animation: im-ping 1.5s ease-in-out infinite;
        }
        @keyframes im-ping {
          0% { transform: scale(0.8); opacity: 0.8; }
          100% { transform: scale(2); opacity: 0; }
        }

        /* Trust bar */
        .im-trust { background: linear-gradient(90deg, #1e3a8a 0%, #1d4ed8 100%); }

        /* Cards */
        .im-treatment-card {
          background: #fff;
          border: 1.5px solid #e2e8f0;
          border-radius: 20px;
          padding: 30px 26px;
          transition: border-color 0.25s, box-shadow 0.25s, transform 0.25s;
        }
        .im-treatment-card:hover {
          border-color: #93c5fd;
          box-shadow: 0 16px 48px rgba(59,130,246,0.14);
          transform: translateY(-5px);
        }

        .im-doctor-card {
          background: #fff;
          border: 1.5px solid #e2e8f0;
          border-radius: 20px;
          overflow: hidden;
          transition: border-color 0.25s, box-shadow 0.25s, transform 0.25s;
        }
        .im-doctor-card:hover {
          border-color: #bfdbfe;
          box-shadow: 0 20px 56px rgba(59,130,246,0.16);
          transform: translateY(-4px);
        }
        .im-doctor-card:hover img { transform: scale(1.06); }

        .im-why-card {
          background: #fff;
          border: 1.5px solid #e2e8f0;
          border-radius: 18px;
          padding: 26px 24px;
          transition: border-color 0.25s, box-shadow 0.25s, transform 0.22s;
        }
        .im-why-card:hover {
          border-color: #93c5fd;
          box-shadow: 0 12px 36px rgba(59,130,246,0.12);
          transform: translateY(-3px);
        }

        /* Inpatient section */
        .im-inpatient {
          background: linear-gradient(135deg, #1e3a8a 0%, #1d4ed8 55%, #2563eb 100%);
          border-radius: 28px;
          box-shadow: 0 28px 72px rgba(30,58,138,0.28);
        }
        .im-feature-row {
          display: flex; gap: 14px; padding: 16px 18px;
          background: rgba(255,255,255,0.1);
          border: 1px solid rgba(255,255,255,0.18);
          border-radius: 14px; backdrop-filter: blur(6px);
          transition: background 0.2s;
        }
        .im-feature-row:hover { background: rgba(255,255,255,0.17); }

        /* Form inputs */
        .im-input {
          width: 100%; padding: 13px 16px;
          border-radius: 12px; font-family: 'DM Sans', sans-serif;
          font-size: 15px; color: #1e293b;
          background: #f8fafc; border: 1.5px solid #e2e8f0;
          outline: none; transition: border-color 0.2s, box-shadow 0.2s;
          appearance: none; box-sizing: border-box;
        }
        .im-input:focus {
          border-color: #3b82f6; background: #fff;
          box-shadow: 0 0 0 3px rgba(59,130,246,0.12);
        }
        .im-input::placeholder { color: #94a3b8; }
        .im-input.error {
          border-color: #dc2626;
        }
        .im-input.error:focus {
          border-color: #dc2626;
          box-shadow: 0 0 0 3px rgba(220,38,38,0.12);
        }

        /* FAQ */
        .im-faq-item {
          background: #fff; border: 1.5px solid #e2e8f0;
          border-radius: 16px; overflow: hidden;
          transition: border-color 0.2s;
        }
        .im-faq-item.active { border-color: #93c5fd; }

        /* Condition pill */
        .im-pill {
          background: #fff; border: 1.5px solid #e2e8f0;
          color: #374151; font-size: 13px; font-weight: 500;
          padding: 8px 18px; border-radius: 100px;
          transition: all 0.18s; cursor: default;
          white-space: nowrap;
        }
        .im-pill:hover { border-color: #3b82f6; color: #1d4ed8; background: #eff6ff; }

        /* Section heading */
        .im-section-eyebrow {
          font-family: 'Sora', sans-serif; font-size: 11px;
          font-weight: 700; letter-spacing: 0.13em;
          text-transform: uppercase; color: #2563eb;
        }
        .im-section-h2 {
          font-family: 'Sora', sans-serif; font-weight: 800;
          color: #0f172a; line-height: 1.15;
        }
        .im-divider {
          width: 38px; height: 4px; background: #2563eb;
          border-radius: 4px; margin: 12px auto 0;
        }

        /* CTA bottom */
        .im-cta-section {
          background: linear-gradient(135deg, #0f172a 0%, #1a2540 100%);
        }

        /* Stats */
        .im-stat-val {
          font-family: 'Sora', sans-serif; font-size: 28px;
          font-weight: 800; color: #0f172a; line-height: 1;
        }
        .im-stat-label { font-size: 13px; color: #64748b; font-weight: 500; margin-top: 4px; }
      `}</style>

      <Header />
      <main className="im-page pt-20">

        {/* ─── HERO ─────────────────────────────────────────────────── */}
        <section className="im-hero py-20 px-6" style={{ paddingTop: 'clamp(60px, 8vw, 112px)', paddingBottom: 'clamp(60px, 8vw, 112px)' }}>
          <div className="im-hero-blob1" />
          <div className="im-hero-blob2" />

          <div className="max-w-7xl mx-auto" style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '48px', position: 'relative', zIndex: 1 }}>

            {/* Left copy */}
            <div style={{ flex: '1 1 420px' }}>
              <div style={{
                display: 'inline-flex', alignItems: 'center', gap: '10px',
                padding: '8px 18px', borderRadius: '100px',
                background: '#eff6ff', border: '1.5px solid #bfdbfe',
                fontFamily: 'Sora, sans-serif', fontSize: '11px', fontWeight: 700,
                letterSpacing: '0.12em', textTransform: 'uppercase', color: '#1d4ed8',
                marginBottom: '28px'
              }}>
                <span className="im-pulse-ring" />
                24/7 Admissions Available
              </div>

              <h1 className="im-display" style={{
                fontSize: 'clamp(2.4rem, 5vw, 4rem)', fontWeight: 800,
                color: '#0f172a', lineHeight: 1.12, marginBottom: '20px'
              }}>
                Comprehensive<br />
                <span style={{ color: '#1d4ed8' }}>General Medicine.</span>
              </h1>

              <p style={{ fontSize: '17px', color: '#475569', lineHeight: 1.7, maxWidth: '460px', marginBottom: '36px' }}>
                Expert diagnosis and inpatient care for a wide range of medical conditions. Experience healing in a comfortable, NABH-accredited environment.
              </p>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '28px', marginBottom: '36px' }}>
                {[
                  { val: "24/7", label: "Emergency Support" },
                  { val: "100%", label: "Cashless Approved" },
                  { val: "15+", label: "Senior Specialists" },
                  { val: "NABH", label: "Accredited Hospital" },
                ].map((s, i) => (
                  <div key={i}>
                    <div className="im-stat-val">{s.val}</div>
                    <div className="im-stat-label">{s.label}</div>
                  </div>
                ))}
              </div>

              <a
                href="tel:+911800000000"
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: '10px',
                  padding: '14px 28px', background: '#0f172a', color: '#fff',
                  borderRadius: '14px', fontFamily: 'Sora, sans-serif',
                  fontWeight: 700, fontSize: '15px', textDecoration: 'none',
                  transition: 'background 0.2s',
                }}
                onMouseOver={e => (e.currentTarget.style.background = '#1d4ed8')}
                onMouseOut={e => (e.currentTarget.style.background = '#0f172a')}
              >
                <Phone size={17} /> Call Our Helpline
              </a>
            </div>

            {/* Right — form */}
            <div style={{ flex: '1 1 340px', maxWidth: '420px' }}>
              {submitted ? (
                <div style={{
                  background: '#fff', padding: '48px 36px', borderRadius: '24px',
                  boxShadow: '0 20px 72px rgba(30,58,138,0.13)', border: '1.5px solid #dbeafe',
                  textAlign: 'center'
                }}>
                  <div style={{
                    width: '68px', height: '68px', background: '#eff6ff', borderRadius: '50%',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    margin: '0 auto 18px', color: '#2563eb'
                  }}>
                    <CheckCircle2 size={34} />
                  </div>
                  <h2 className="im-display" style={{ fontSize: '21px', fontWeight: 800, color: '#0f172a', marginBottom: '8px' }}>
                    Request Received
                  </h2>
                  <p style={{ color: '#64748b', marginBottom: '24px', fontSize: '15px' }}>
                    A medical specialist will contact you shortly.
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setForm({ name: "", phone: "" });
                      setPhoneTouched(false);
                      setPhoneError(null);
                    }}
                    style={{
                      color: '#2563eb', fontWeight: 600, background: 'none',
                      border: 'none', cursor: 'pointer', fontSize: '14px'
                    }}>
                    Submit another request
                  </button>
                </div>
              ) : (
                <div style={{
                  background: '#fff', padding: '32px 32px 36px', borderRadius: '24px',
                  boxShadow: '0 20px 72px rgba(30,58,138,0.11)', border: '1.5px solid #e2e8f0'
                }}>
                  <h2 className="im-display" style={{ fontSize: '21px', fontWeight: 800, color: '#0f172a', marginBottom: '5px' }}>
                    Patient Inquiry
                  </h2>
                  <p style={{ color: '#64748b', fontSize: '14px', marginBottom: '22px' }}>
                    For admissions or health checkups.
                  </p>
                  <form onSubmit={handleSubmit} noValidate style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    <input
                      type="text" placeholder="Patient Name" required
                      className="im-input" value={form.name}
                      onChange={e => setForm({ ...form, name: e.target.value })}
                    />
                    <div>
                      <input
                        type="tel"
                        inputMode="numeric"
                        placeholder="Mobile Number"
                        required
                        maxLength={10}
                        className={`im-input ${showPhoneError ? "error" : ""}`}
                        value={form.phone}
                        onChange={handlePhoneChange}
                        onBlur={handlePhoneBlur}
                      />
                      {showPhoneError && (
                        <p style={{ color: '#dc2626', fontSize: '12.5px', fontWeight: 600, marginTop: '6px', marginBottom: 0, marginLeft: '2px' }}>
                          {phoneError}
                        </p>
                      )}
                    </div>
                    <button
                      type="submit" disabled={loading}
                      style={{
                        padding: '15px', background: '#1d4ed8', color: '#fff',
                        borderRadius: '12px', fontFamily: 'Sora, sans-serif', fontWeight: 700,
                        fontSize: '15px', border: 'none', cursor: loading ? 'not-allowed' : 'pointer',
                        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                        opacity: loading ? 0.7 : 1, marginTop: '4px',
                        boxShadow: '0 6px 20px rgba(29,78,216,0.32)', transition: 'background 0.2s'
                      }}
                      onMouseOver={e => !loading && (e.currentTarget.style.background = '#1e40af')}
                      onMouseOut={e => { e.currentTarget.style.background = '#1d4ed8'; }}
                    >
                      {loading
                        ? <Loader2 className="animate-spin" size={19} />
                        : <>Speak to a Specialist <ArrowRight size={16} /></>}
                    </button>
                  </form>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* ─── TRUST STRIP ──────────────────────────────────────────── */}
        <section className="im-trust" style={{ padding: '18px 24px' }}>
          <div className="max-w-7xl mx-auto" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '28px' }}>
            {[
              { icon: <Award size={16} />, label: "NABH Accredited" },
              { icon: <ShieldCheck size={16} />, label: "ISO 9001:2015 Certified" },
              { icon: <Users size={16} />, label: "50,000+ Patients Treated" },
              { icon: <Clock size={16} />, label: "< 15 Min ER Response" },
              { icon: <Stethoscope size={16} />, label: "40+ Specialities" },
            ].map((item, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '7px', color: '#fff', fontSize: '13px', fontWeight: 600 }}>
                {item.icon} {item.label}
              </div>
            ))}
          </div>
        </section>

        {/* ─── TREATMENTS GRID ──────────────────────────────────────── */}
        <section style={{ padding: '84px 24px', background: '#ffffff' }}>
          <div className="max-w-7xl mx-auto">
            <div style={{ textAlign: 'center', marginBottom: '52px' }}>
              <p className="im-section-eyebrow">What We Treat</p>
              <h2 className="im-section-h2" style={{ fontSize: 'clamp(1.7rem, 3vw, 2.5rem)', marginTop: '10px' }}>Medical Management</h2>
              <div className="im-divider" />
              <p style={{ color: '#64748b', marginTop: '16px', maxWidth: '500px', margin: '16px auto 0', fontSize: '15px', lineHeight: 1.65 }}>
                Holistic internal medicine services designed for prompt recovery and long-term health maintenance.
              </p>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))', gap: '20px' }}>
              {treatments.map((t, i) => (
                <div key={i} className="im-treatment-card">
                  <div style={{
                    width: '58px', height: '58px', borderRadius: '15px',
                    background: t.lightBg, display: 'flex', alignItems: 'center',
                    justifyContent: 'center', marginBottom: '18px', color: t.iconColor
                  }}>
                    {t.icon}
                  </div>
                  <h3 className="im-display" style={{ fontSize: '16px', fontWeight: 700, color: '#0f172a', marginBottom: '9px' }}>
                    {t.title}
                  </h3>
                  <p style={{ fontSize: '14px', color: '#475569', lineHeight: 1.65, margin: 0 }}>{t.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── ADDITIONAL CONDITIONS ────────────────────────────────── */}
        <section style={{ padding: '60px 24px', background: '#f8fafc', borderTop: '1px solid #e8edf3', borderBottom: '1px solid #e8edf3' }}>
          <div className="max-w-7xl mx-auto">
            <h3 className="im-display" style={{ fontSize: '19px', fontWeight: 700, color: '#0f172a', textAlign: 'center', marginBottom: '24px' }}>
              Conditions We Also Manage
            </h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '10px' }}>
              {[
                "Thyroid Disorders", "Anaemia", "Kidney Infections", "UTI", "Jaundice",
                "Liver Disease", "Electrolyte Imbalance", "Rheumatoid Arthritis",
                "Gout", "Vitamin Deficiencies", "Obesity", "Skin Allergies", "Food Poisoning",
                "Post-COVID Complications", "Chronic Fatigue Syndrome",
              ].map((c, i) => (
                <span key={i} className="im-pill">{c}</span>
              ))}
            </div>
          </div>
        </section>

        {/* ─── INPATIENT CARE HIGHLIGHT ─────────────────────────────── */}
        <section style={{ padding: '84px 24px', background: '#fff' }}>
          <div className="max-w-7xl mx-auto">
            <div className="im-inpatient" style={{
              padding: 'clamp(28px, 5vw, 64px)',
              display: 'flex', flexWrap: 'wrap', gap: '44px', alignItems: 'center'
            }}>
              <div style={{ flex: '1 1 340px' }}>
                <p style={{
                  fontFamily: 'Sora, sans-serif', fontSize: '11px', fontWeight: 700,
                  letterSpacing: '0.13em', textTransform: 'uppercase', color: '#93c5fd', marginBottom: '12px'
                }}>
                  Inpatient Services
                </p>
                <h2 className="im-display" style={{
                  fontSize: 'clamp(1.7rem, 3.5vw, 2.6rem)', fontWeight: 800,
                  color: '#ffffff', lineHeight: 1.2, marginBottom: '32px'
                }}>
                  Patient-First<br />Inpatient Care
                </h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {[
                    { h: "Premium Rooms", d: "Private suites and deluxe rooms for a peaceful recovery.", i: <Building2 size={19} /> },
                    { h: "24/7 Nursing", d: "Dedicated staff to ensure medication and monitoring are flawless.", i: <HeartPulse size={19} /> },
                    { h: "Quick Diagnostics", d: "In-house lab work and X-rays for maximum speed.", i: <Activity size={19} /> },
                    { h: "Pharmacy on Premises", d: "All prescribed medicines available in-house round the clock.", i: <Pill size={19} /> },
                    { h: "Insurance Support", d: "Dedicated TPA desk for cashless and reimbursement claims.", i: <ShieldCheck size={19} /> },
                  ].map((item, idx) => (
                    <div key={idx} className="im-feature-row">
                      <div style={{ color: '#93c5fd', marginTop: '2px', flexShrink: 0 }}>{item.i}</div>
                      <div>
                        <h4 className="im-display" style={{ fontSize: '15px', fontWeight: 700, color: '#ffffff', marginBottom: '3px' }}>{item.h}</h4>
                        <p style={{ fontSize: '13px', color: '#bfdbfe', lineHeight: 1.5, margin: 0 }}>{item.d}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div style={{
                flex: '1 1 300px', position: 'relative', height: '500px',
                borderRadius: '20px', overflow: 'hidden',
                border: '2px solid rgba(255,255,255,0.15)',
                boxShadow: '0 16px 48px rgba(0,0,0,0.28)'
              }}>
                <Image
                  src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=800"
                  alt="Internal Medicine Ward"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* ─── OUR DOCTORS ──────────────────────────────────────────── */}
        <section style={{ padding: '84px 24px', background: '#f8fafc' }}>
          <div className="max-w-7xl mx-auto">
            <div style={{ textAlign: 'center', marginBottom: '52px' }}>
              <p className="im-section-eyebrow">Expert Team</p>
              <h2 className="im-section-h2" style={{ fontSize: 'clamp(1.7rem, 3vw, 2.5rem)', marginTop: '10px' }}>Meet Our Specialists</h2>
              <div className="im-divider" />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(270px, 1fr))', gap: '22px' }}>
              {doctors.map((doc, i) => (
                <div key={i} className="im-doctor-card">
                  <div style={{ position: 'relative', height: '230px', overflow: 'hidden' }}>
                    <Image
                      src={doc.img} alt={doc.name} fill
                      style={{ objectFit: 'cover', transition: 'transform 0.5s ease' }}
                    />
                  </div>
                  <div style={{ padding: '22px 24px 26px' }}>
                    <h3 className="im-display" style={{ fontSize: '17px', fontWeight: 700, color: '#0f172a', margin: 0 }}>{doc.name}</h3>
                    <p style={{ fontSize: '13px', color: '#2563eb', fontWeight: 600, marginTop: '5px', marginBottom: '2px' }}>{doc.degree}</p>
                    <p style={{ fontSize: '13px', color: '#94a3b8', margin: 0 }}>{doc.exp}</p>
                    <div style={{
                      display: 'flex', alignItems: 'center', gap: '7px',
                      marginTop: '15px', paddingTop: '15px', borderTop: '1px solid #f1f5f9'
                    }}>
                      <Star size={13} style={{ color: '#f59e0b', fill: '#f59e0b' }} />
                      <span className="im-display" style={{ fontWeight: 700, color: '#0f172a', fontSize: '14px' }}>{doc.rating}</span>
                      <span style={{ fontSize: '13px', color: '#94a3b8' }}>({doc.reviews} reviews)</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── WHY CHOOSE US ────────────────────────────────────────── */}
        <section style={{ padding: '84px 24px', background: '#ffffff' }}>
          <div className="max-w-7xl mx-auto">
            <div style={{ textAlign: 'center', marginBottom: '52px' }}>
              <p className="im-section-eyebrow">Why Patients Trust Us</p>
              <h2 className="im-section-h2" style={{ fontSize: 'clamp(1.7rem, 3vw, 2.5rem)', marginTop: '10px' }}>The Difference</h2>
              <div className="im-divider" />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(270px, 1fr))', gap: '18px' }}>
              {[
                { title: "Multidisciplinary Team", desc: "Our internists collaborate with cardiologists, pulmonologists, and endocrinologists for integrated care.", icon: <Users size={22} />, color: '#2563eb', bg: '#eff6ff' },
                { title: "Advanced Diagnostics", desc: "State-of-the-art in-house lab, digital X-ray, ultrasound, and ECG for rapid and accurate results.", icon: <Activity size={22} />, color: '#0284c7', bg: '#f0f9ff' },
                { title: "Transparent Billing", desc: "Clear cost estimates before procedures. No hidden fees. All major insurance and cashless accepted.", icon: <ShieldCheck size={22} />, color: '#059669', bg: '#ecfdf5' },
                { title: "Personalised Care Plans", desc: "Every patient receives a tailored treatment protocol reviewed daily by a consultant physician.", icon: <ClipboardCheck size={22} />, color: '#7c3aed', bg: '#f5f3ff' },
                { title: "Patient Education", desc: "We empower patients with knowledge about their condition, medications, and lifestyle management.", icon: <Award size={22} />, color: '#d97706', bg: '#fffbeb' },
                { title: "Post-Discharge Support", desc: "Follow-up calls, teleconsultations, and diet/medication reminders for a smooth recovery at home.", icon: <Phone size={22} />, color: '#dc2626', bg: '#fef2f2' },
              ].map((item, i) => (
                <div key={i} className="im-why-card">
                  <div style={{
                    width: '50px', height: '50px', borderRadius: '13px',
                    background: item.bg, display: 'flex', alignItems: 'center',
                    justifyContent: 'center', marginBottom: '16px', color: item.color
                  }}>
                    {item.icon}
                  </div>
                  <h3 className="im-display" style={{ fontSize: '15px', fontWeight: 700, color: '#0f172a', marginBottom: '8px' }}>
                    {item.title}
                  </h3>
                  <p style={{ fontSize: '13.5px', color: '#475569', lineHeight: 1.65, margin: 0 }}>{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── FAQ ──────────────────────────────────────────────────── */}
        <section style={{ padding: '84px 24px', background: '#f8fafc' }}>
          <div style={{ maxWidth: '740px', margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '48px' }}>
              <p className="im-section-eyebrow">FAQs</p>
              <h2 className="im-section-h2" style={{ fontSize: 'clamp(1.7rem, 3vw, 2.3rem)', marginTop: '10px' }}>Common Questions</h2>
              <div className="im-divider" />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {faqs.map((faq, i) => (
                <div key={i} className={`im-faq-item ${openFaq === i ? 'active' : ''}`}>
                  <button
                    style={{
                      width: '100%', textAlign: 'left', padding: '18px 22px',
                      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                      background: 'none', border: 'none', cursor: 'pointer'
                    }}
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  >
                    <span className="im-display" style={{ fontSize: '15px', fontWeight: 600, color: '#0f172a', lineHeight: 1.4 }}>
                      {faq.q}
                    </span>
                    <span style={{
                      flexShrink: 0, marginLeft: '14px', width: '26px', height: '26px',
                      borderRadius: '50%', background: openFaq === i ? '#1d4ed8' : '#f1f5f9',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      color: openFaq === i ? '#fff' : '#64748b', fontSize: '17px',
                      fontWeight: 500, transition: 'all 0.2s', lineHeight: 1
                    }}>
                      {openFaq === i ? '−' : '+'}
                    </span>
                  </button>
                  {openFaq === i && (
                    <div style={{
                      padding: '0 22px 18px', fontSize: '14px', color: '#475569',
                      lineHeight: 1.7, borderTop: '1px solid #f1f5f9', paddingTop: '16px'
                    }}>
                      {faq.a}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── BOTTOM CTA ───────────────────────────────────────────── */}
        <section className="im-cta-section" style={{ padding: '80px 24px' }}>
          <div style={{ maxWidth: '680px', margin: '0 auto', textAlign: 'center' }}>
            <h2 className="im-display" style={{
              fontSize: 'clamp(1.7rem, 4vw, 2.8rem)', fontWeight: 800,
              color: '#ffffff', lineHeight: 1.2, marginBottom: '14px'
            }}>
              Need Medical Attention{' '}
              <span style={{ color: '#60a5fa' }}>Right Now?</span>
            </h2>
            <p style={{ color: '#94a3b8', fontSize: '16px', lineHeight: 1.65, marginBottom: '36px', maxWidth: '480px', margin: '0 auto 36px' }}>
              Our team is available 24/7 for emergencies and admissions. Do not delay — reach us immediately.
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', justifyContent: 'center' }}>
              <a
                href="tel:+911800000000"
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: '9px',
                  padding: '15px 30px', background: '#1d4ed8', color: '#fff',
                  borderRadius: '14px', fontFamily: 'Sora, sans-serif', fontWeight: 700,
                  fontSize: '15px', textDecoration: 'none',
                  boxShadow: '0 8px 28px rgba(29,78,216,0.38)', transition: 'background 0.2s'
                }}
                onMouseOver={e => (e.currentTarget.style.background = '#1e40af')}
                onMouseOut={e => (e.currentTarget.style.background = '#1d4ed8')}
              >
                <Phone size={17} /> Call Emergency Helpline
              </a>
              <a
                href="#"
                onClick={e => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: '9px',
                  padding: '15px 30px', background: 'rgba(255,255,255,0.07)',
                  color: '#e2e8f0', border: '1.5px solid rgba(255,255,255,0.16)',
                  borderRadius: '14px', fontFamily: 'Sora, sans-serif', fontWeight: 700,
                  fontSize: '15px', textDecoration: 'none', transition: 'background 0.2s'
                }}
                onMouseOver={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.13)')}
                onMouseOut={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.07)')}
              >
                Book Appointment <ArrowRight size={16} />
              </a>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}