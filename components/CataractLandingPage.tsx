"use client";
import Image from "next/image";
import { useState } from "react";
import { CITY_DATA, SHARED_FAQS, CityKey } from "@/lib/cataract-city-data";

type Status = "idle" | "loading" | "success" | "error";

function useLeadForm(cityKey: CityKey) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [nameErr, setNameErr] = useState("");
  const [phoneErr, setPhoneErr] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

  function validatePhone(v: string) {
    const c = v.replace(/\D/g, "");
    if (!c) return "Mobile number is required";
    if (c.length !== 10) return "Enter a valid 10-digit number";
    if (!/^[6-9]/.test(c)) return "Enter a valid Indian mobile number";
    if (/^(\d)\1{9}$/.test(c) || c === "1234567890") return "Please enter a real number";
    return "";
  }

  const onName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
    if (nameErr) setNameErr("");
  };
  const onPhone = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = e.target.value.replace(/[^\d\s\-+()]/g, "");
    setPhone(v);
    if (phoneErr) setPhoneErr(validatePhone(v));
  };

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    const nE = name.trim().length < 2 ? "Name must be at least 2 characters" : "";
    const pE = validatePhone(phone);
    setNameErr(nE);
    setPhoneErr(pE);
    if (nE || pE) return;
    setStatus("loading");
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          phone,
          service: "CATARACT",
          city: cityKey,
          source: CITY_DATA[cityKey].formSource,
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok || data.duplicate) {
        setStatus("success");
        setMessage(data.message || "Thank you. We will be in touch with you shortly.");
      } else {
        setStatus("error");
        setMessage(data.error || "Something went wrong. Please try again.");
      }
    } catch {
      setStatus("error");
      setMessage("Unable to connect. Please try again later.");
    }
  }

  return { name, phone, nameErr, phoneErr, status, message, onName, onPhone, submit };
}

const SYMPTOMS = [
  { icon: "🌫", title: "Cloudy or blurry vision", desc: "Objects appear hazy or out of focus even with corrective glasses." },
  { icon: "💡", title: "Sensitivity to light", desc: "Bright sunlight or lamp glare becomes uncomfortable or causes haloes." },
  { icon: "🌙", title: "Poor night vision", desc: "Driving at night feels unsafe; oncoming headlights appear dazzling." },
  { icon: "🎨", title: "Faded colours", desc: "Colours look washed out or yellowish compared to how they once appeared." },
  { icon: "👓", title: "Frequent prescription changes", desc: "Glasses feel wrong and need updating more often than usual." },
  { icon: "👁", title: "Double vision in one eye", desc: "Text or objects appear doubled when one eye is covered." },
];

const LENS_TYPES = [
  { name: "Monofocal IOL", desc: "Corrects vision at a single fixed distance — usually distance vision. Reading glasses may still be needed for close work.", tag: "Standard" },
  { name: "Multifocal IOL", desc: "Designed to provide clear vision at multiple distances, potentially reducing dependence on glasses for both near and far tasks.", tag: "Premium" },
  { name: "Toric IOL", desc: "Corrects astigmatism in addition to the cataract. Suitable for patients who have pre-existing astigmatism.", tag: "Specialised" },
  { name: "EDOF (Extended Depth of Focus)", desc: "Provides a continuous range of vision from distance to intermediate, with less reliance on glasses for most daily activities.", tag: "Premium" },
];

const RISK_FACTORS = [
  { label: "Age", detail: "Risk increases significantly after 60. Most cataracts are age-related." },
  { label: "Diabetes", detail: "Elevated blood sugar over time can accelerate changes in the eye lens." },
  { label: "UV Exposure", detail: "Long-term sunlight exposure without protective eyewear is linked to earlier cataract formation." },
  { label: "Steroid Medications", detail: "Long-term use of corticosteroids is associated with a higher risk of cataract development." },
  { label: "Eye Injury or Surgery", detail: "Previous trauma or certain eye surgeries can contribute to cataract formation." },
  { label: "Smoking", detail: "Smoking is associated with oxidative changes in the lens that can lead to cataracts." },
  { label: "Family History", detail: "A family history of cataracts may increase your likelihood of developing them earlier." },
  { label: "Poor Nutrition", detail: "Diets low in antioxidants such as vitamins C and E may contribute to lens changes over time." },
];

function LeadForm({ cityKey }: { cityKey: CityKey }) {
  const f = useLeadForm(cityKey);
  const city = CITY_DATA[cityKey];

  if (f.status === "success") {
    return (
      <div className="success-box">
        <div className="success-icon">✓</div>
        <p>{f.message}</p>
      </div>
    );
  }

  return (
    <>
      <p className="form-card-title">Get in touch</p>
      <p className="form-card-sub">
        Leave your name and number and we will contact you to discuss cataract care in {city.name}.
      </p>
      {f.status === "error" && <div className="api-error">{f.message}</div>}
      <form onSubmit={f.submit} noValidate>
        <div className="field">
          <label htmlFor="lp-name">Full name</label>
          <input
            id="lp-name" type="text" placeholder="Your name"
            value={f.name} onChange={f.onName} className={f.nameErr ? "err" : ""}
          />
          {f.nameErr && <span className="err-text">{f.nameErr}</span>}
        </div>
        <div className="field">
          <label htmlFor="lp-phone">Mobile number</label>
          <input
            id="lp-phone" type="tel" placeholder="98765 43210"
            value={f.phone} onChange={f.onPhone} maxLength={14} className={f.phoneErr ? "err" : ""}
          />
          {f.phoneErr && <span className="err-text">{f.phoneErr}</span>}
        </div>
        <button type="submit" className="btn-primary" disabled={f.status === "loading"}>
          {f.status === "loading" ? (
            <span className="btn-loading"><span className="spinner" />Sending…</span>
          ) : "Request a callback"}
        </button>
        <p className="form-note">Your information is kept private and never shared.</p>
      </form>
    </>
  );
}

export default function CataractLandingPage({ cityKey }: { cityKey: CityKey }) {
  const city = CITY_DATA[cityKey];
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  function scrollToForm() {
    document.getElementById("form-anchor")?.scrollIntoView({ behavior: "smooth", block: "center" });
    setTimeout(() => document.getElementById("lp-name")?.focus(), 500);
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display&family=DM+Sans:wght@400;500;600&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        body { font-family: 'DM Sans', system-ui, sans-serif; color: #1a2236; background: #fff; line-height: 1.6; }
        h1, h2, h3, h4 { font-family: 'DM Serif Display', Georgia, serif; font-weight: 400; line-height: 1.25; }
        button, input { font-family: inherit; }
        :focus-visible { outline: 2px solid #2a6dd9; outline-offset: 2px; }

        /* NAV */
       .nav {
  padding: 0 6vw; height: 80px; display: flex; justify-content: space-between; align-items: center;
  border-bottom: 1px solid #e8ecf4; background: #fff; position: sticky; top: 0; z-index: 100;
}
        .nav-logo { display: flex; align-items: center; }
        .nav-city {
          font-size: 12px; font-weight: 600; color: #5a6680; letter-spacing: 0.4px;
          background: #f4f7fd; padding: 5px 12px; border-radius: 100px; border: 1px solid #e8ecf4;
        }
        .nav-right { display: flex; align-items: center; gap: 16px; }
        .nav-links { display: flex; gap: 22px; list-style: none; }
        .nav-links a { font-size: 13.5px; font-weight: 500; color: #5a6680; text-decoration: none; transition: color 0.15s; }
        .nav-links a:hover { color: #2a6dd9; }
        .nav-cta {
          padding: 9px 20px; background: #2a6dd9; color: #fff; border: none; border-radius: 8px;
          font-size: 13px; font-weight: 600; cursor: pointer; transition: background 0.18s;
        }
        .nav-cta:hover { background: #1f55b0; }

        /* HERO */
        .above-fold {
          min-height: calc(100vh - 61px); display: grid; grid-template-columns: 1fr 1fr;
          align-items: center; background: #f4f7fd;
        }
        .hero-left { padding: 80px 6vw 80px 8vw; }
        .hero-eyebrow {
          display: inline-flex; align-items: center; gap: 8px;
          font-size: 12px; font-weight: 600; letter-spacing: 1px; text-transform: uppercase;
          color: #2a6dd9; background: #e8f0fb; padding: 5px 14px; border-radius: 100px; margin-bottom: 24px;
        }
        .hero-eyebrow-dot { width: 6px; height: 6px; border-radius: 50%; background: #2a6dd9; }
        .hero-left h1 { font-size: clamp(32px, 4vw, 52px); color: #1a2236; margin-bottom: 20px; }
        .hero-left h1 em { font-style: normal; color: #2a6dd9; }
        .hero-sub { font-size: 15.5px; color: #5a6680; line-height: 1.8; max-width: 460px; margin-bottom: 30px; }
        .hero-bullets { list-style: none; display: flex; flex-direction: column; gap: 10px; margin-bottom: 32px; }
        .hero-bullets li { display: flex; align-items: flex-start; gap: 10px; font-size: 14px; color: #3a4a66; }
        .hero-bullets li::before { content: "✓"; color: #2a6dd9; font-weight: 700; flex-shrink: 0; margin-top: 1px; }
        .hero-cta {
          padding: 13px 28px; background: #2a6dd9; color: #fff; border: none; border-radius: 10px;
          font-size: 15px; font-weight: 600; cursor: pointer; transition: background 0.18s, transform 0.15s;
        }
        .hero-cta:hover { background: #1f55b0; transform: translateY(-1px); }

        /* FORM CARD */
        .form-side { padding: 60px 8vw 60px 4vw; display: flex; align-items: center; justify-content: center; }
        .form-card {
          background: #fff; border-radius: 16px; padding: 40px 36px; width: 100%; max-width: 380px;
          box-shadow: 0 8px 40px rgba(42,109,217,0.1), 0 1px 4px rgba(0,0,0,0.06); border: 1px solid #e8ecf4;
        }
        .form-card-title { font-family: 'DM Serif Display', Georgia, serif; font-size: 22px; color: #1a2236; margin-bottom: 6px; }
        .form-card-sub { font-size: 13px; color: #5a6680; margin-bottom: 28px; line-height: 1.6; }
        .field { margin-bottom: 16px; }
        .field label { display: block; font-size: 12px; font-weight: 600; color: #1a2236; margin-bottom: 6px; }
        .field input {
          width: 100%; padding: 12px 14px; border: 1.5px solid #dde2ed; border-radius: 10px;
          font-size: 14px; color: #1a2236; background: #fafbfc; outline: none;
          transition: border-color 0.18s, background 0.18s;
        }
        .field input:focus { border-color: #2a6dd9; background: #fff; }
        .field input.err { border-color: #dc2626; }
        .err-text { font-size: 11px; color: #dc2626; margin-top: 4px; display: block; }
        .api-error {
          background: #fef2f2; border: 1px solid #fecaca; color: #dc2626;
          font-size: 13px; padding: 10px 13px; border-radius: 8px; margin-bottom: 14px;
        }
        .btn-primary {
          width: 100%; padding: 13px; background: #2a6dd9; color: #fff; border: none;
          border-radius: 10px; font-size: 15px; font-weight: 600; cursor: pointer;
          transition: background 0.18s, transform 0.15s; margin-top: 4px;
        }
        .btn-primary:hover:not(:disabled) { background: #1f55b0; transform: translateY(-1px); }
        .btn-primary:disabled { opacity: 0.65; cursor: not-allowed; }
        .btn-loading { display: flex; align-items: center; justify-content: center; gap: 8px; }
        .spinner {
          width: 14px; height: 14px; border: 2px solid rgba(255,255,255,0.3);
          border-top-color: #fff; border-radius: 50%; animation: spin 0.7s linear infinite;
        }
        @keyframes spin { to { transform: rotate(360deg); } }
        .form-note { font-size: 11.5px; color: #9aa3b8; text-align: center; margin-top: 12px; }
        .success-box { text-align: center; padding: 20px 0; }
        .success-icon {
          width: 52px; height: 52px; border-radius: 50%; background: #2a6dd9; color: #fff;
          display: flex; align-items: center; justify-content: center; font-size: 22px;
          margin: 0 auto 16px; animation: pop 0.3s ease;
        }
        @keyframes pop { from { transform: scale(0); } to { transform: scale(1); } }
        .success-box p { font-size: 14.5px; color: #1a2236; line-height: 1.7; }

        /* WHAT IS A CATARACT */
        .explainer {
          padding: 80px 8vw; display: grid; grid-template-columns: 1fr 1fr; gap: 64px; align-items: center;
        }
        .explainer-visual {
          background: #f4f7fd; border-radius: 20px; padding: 36px 28px;
          display: flex; flex-direction: column; gap: 24px;
        }
        .lens-row { display: flex; gap: 32px; justify-content: center; }
        .lens-box { text-align: center; }
        .lens-circle {
          width: 80px; height: 80px; border-radius: 50%; display: flex; align-items: center;
          justify-content: center; font-size: 30px; margin: 0 auto 8px;
        }
        .lens-clear { background: #e8f0fb; }
        .lens-cloudy { background: #e8e0d0; }
        .lens-label { font-size: 12px; font-weight: 600; color: #5a6680; }
        .lens-caption { font-size: 13px; color: #5a6680; line-height: 1.7; text-align: center; }
        .stat-row { display: flex; gap: 16px; }
        .stat-box { flex: 1; background: #fff; border: 1px solid #e8ecf4; border-radius: 12px; padding: 18px 14px; text-align: center; }
        .stat-num { font-family: 'DM Serif Display', Georgia, serif; font-size: 30px; color: #2a6dd9; }
        .stat-desc { font-size: 11.5px; color: #5a6680; margin-top: 4px; line-height: 1.5; }

        /* GENERIC SECTION */
        .section { padding: 80px 8vw; }
        .section.alt { background: #f4f7fd; }
        .section.dark { background: #1a2236; }
        .section-eyebrow {
          font-size: 11px; font-weight: 700; letter-spacing: 1.2px; text-transform: uppercase;
          color: #2a6dd9; margin-bottom: 12px;
        }
        .section.dark .section-eyebrow { color: #6fa3f5; }
        .section h2 { font-size: clamp(26px, 3.5vw, 38px); color: #1a2236; margin-bottom: 14px; }
        .section.dark h2 { color: #fff; }
        .section-lead { font-size: 15.5px; color: #5a6680; max-width: 580px; margin-bottom: 44px; line-height: 1.75; }
        .section.dark .section-lead { color: rgba(255,255,255,0.6); }

        /* SYMPTOMS */
        .symptom-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(210px, 1fr)); gap: 18px; }
        .symptom-card {
          background: #fff; border: 1px solid #e8ecf4; border-radius: 14px; padding: 24px 20px;
          transition: box-shadow 0.2s;
        }
        .symptom-card:hover { box-shadow: 0 6px 20px rgba(42,109,217,0.1); }
        .symptom-icon { font-size: 26px; margin-bottom: 12px; }
        .symptom-card h3 { font-size: 14.5px; margin-bottom: 7px; color: #1a2236; }
        .symptom-card p { font-size: 13px; color: #5a6680; line-height: 1.7; }

        /* PROCEDURE STEPS */
        .steps-timeline { display: flex; flex-direction: column; gap: 0; max-width: 740px; }
        .step-row { display: flex; gap: 22px; position: relative; }
        .step-row:not(:last-child)::after {
          content: ''; position: absolute; left: 19px; top: 44px; bottom: -24px;
          width: 2px; background: #e8ecf4;
        }
        .step-num-circle {
          width: 40px; height: 40px; border-radius: 50%; background: #2a6dd9; color: #fff;
          display: flex; align-items: center; justify-content: center; font-size: 14px; font-weight: 700;
          flex-shrink: 0; margin-top: 2px;
        }
        .step-body { padding: 0 0 40px; }
        .step-body h3 { font-size: 16px; margin-bottom: 6px; color: #1a2236; }
        .step-body p { font-size: 13.5px; color: #5a6680; line-height: 1.75; }

        /* LENS TYPES */
        .lens-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 18px; }
        .lens-card { background: #fff; border: 1px solid #e8ecf4; border-radius: 14px; padding: 26px 22px; }
        .lens-tag {
          display: inline-block; font-size: 10px; font-weight: 700; letter-spacing: 0.8px;
          text-transform: uppercase; padding: 3px 10px; border-radius: 100px; margin-bottom: 12px;
        }
        .lens-tag-Standard { background: #e8ecf4; color: #5a6680; }
        .lens-tag-Premium { background: #e8f0fb; color: #2a6dd9; }
        .lens-tag-Specialised { background: #e8f8f3; color: #059669; }
        .lens-card h3 { font-size: 15px; margin-bottom: 7px; color: #1a2236; }
        .lens-card p { font-size: 13px; color: #5a6680; line-height: 1.7; }

        /* COMPARISON TABLE */
        .compare-wrap { overflow-x: auto; border-radius: 12px; border: 1px solid #e8ecf4; }
        .compare-table { width: 100%; border-collapse: collapse; font-size: 13.5px; min-width: 520px; }
        .compare-table th {
          text-align: left; padding: 14px 18px; background: #1a2236; color: #fff;
          font-weight: 600; font-size: 12px; letter-spacing: 0.3px;
        }
        .compare-table td { padding: 13px 18px; border-bottom: 1px solid #e8ecf4; color: #3a4a66; vertical-align: top; line-height: 1.6; }
        .compare-table tr:last-child td { border-bottom: none; }
        .compare-table tr:nth-child(even) td { background: #f9fafc; }
        .td-after { color: #059669 !important; }

        /* RISK FACTORS */
        .risk-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(270px, 1fr)); gap: 14px; }
        .risk-item {
          display: flex; gap: 14px; background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.1); border-radius: 12px; padding: 18px 20px;
        }
        .risk-dot { width: 8px; height: 8px; border-radius: 50%; background: #6fa3f5; flex-shrink: 0; margin-top: 6px; }
        .risk-label { font-size: 14px; font-weight: 600; color: #fff; margin-bottom: 4px; }
        .risk-detail { font-size: 12.5px; color: rgba(255,255,255,0.58); line-height: 1.65; }

        /* CARE TIPS */
        .tips-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 18px; }
        .tip-card { background: #fff; border: 1px solid #e8ecf4; border-radius: 14px; padding: 26px 22px; }
        .tip-phase { font-size: 11px; font-weight: 700; letter-spacing: 1px; text-transform: uppercase; color: #059669; margin-bottom: 10px; }
        .tip-card h3 { font-size: 15px; margin-bottom: 10px; color: #1a2236; }
        .tip-list { list-style: none; display: flex; flex-direction: column; gap: 7px; }
        .tip-list li { font-size: 13px; color: #5a6680; line-height: 1.6; display: flex; gap: 8px; }
        .tip-list li::before { content: "—"; color: #2a6dd9; flex-shrink: 0; }

        /* AREAS */
        .areas-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(150px, 1fr)); gap: 10px; }
        .area-tag {
          background: #fff; border: 1px solid #e8ecf4; border-radius: 10px;
          padding: 10px 14px; font-size: 13px; color: #3a4a66; text-align: center;
          transition: border-color 0.18s, background 0.18s;
        }
        .area-tag:hover { border-color: #2a6dd9; background: #f0f5fd; }

        /* TESTIMONIALS */
        .testimonials-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 18px; margin-top: 44px; }
        .testimonial { background: #fff; border: 1px solid #e8ecf4; border-radius: 14px; padding: 26px 22px; }
        .testimonial-quote { font-size: 14px; line-height: 1.8; color: #3a4a66; font-style: italic; margin-bottom: 16px; }
        .testimonial-name { font-weight: 600; font-size: 13px; color: #1a2236; }
        .testimonial-role { font-size: 12px; color: #5a6680; margin-top: 2px; }

        /* FAQ */
        .faq-list { max-width: 720px; }
        .faq-item { border-bottom: 1px solid #e8ecf4; }
        .faq-btn {
          width: 100%; background: none; border: none; cursor: pointer;
          display: flex; justify-content: space-between; align-items: flex-start; gap: 16px;
          padding: 18px 0; font-size: 15px; font-weight: 600; color: #1a2236; text-align: left;
        }
        .faq-btn span:first-child { flex: 1; }
        .faq-toggle { color: #2a6dd9; font-size: 20px; flex-shrink: 0; line-height: 1; }
        .faq-answer { font-size: 13.5px; color: #5a6680; line-height: 1.75; padding-bottom: 18px; max-width: 640px; }

        /* CLOSING */
        .closing-band {
          background: linear-gradient(135deg, #1a2236 0%, #1d3a6e 100%);
          padding: 80px 8vw; text-align: center;
        }
        .closing-band h2 { color: #fff; margin-bottom: 14px; }
        .closing-band p { font-size: 16px; color: rgba(255,255,255,0.65); max-width: 520px; margin: 0 auto 36px; }
        .closing-btn {
          padding: 14px 36px; background: #2a6dd9; color: #fff; border: none; border-radius: 10px;
          font-size: 15px; font-weight: 600; cursor: pointer; transition: background 0.18s, transform 0.15s;
        }
        .closing-btn:hover { background: #1f55b0; transform: translateY(-2px); }

        /* FOOTER */
        .footer {
          padding: 26px 8vw; background: #111827;
          display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 12px;
        }
       .footer-logo { display: flex; align-items: center; }
        .footer-copy { font-size: 12px; color: rgba(255,255,255,0.4); }

        /* RESPONSIVE */
        @media (max-width: 860px) {
          .above-fold { grid-template-columns: 1fr; min-height: unset; }
          .hero-left { padding: 52px 6vw 28px; }
          .form-side { padding: 0 6vw 52px; }
          .form-card { max-width: 100%; }
          .explainer { grid-template-columns: 1fr; gap: 32px; padding: 56px 6vw; }
          .section { padding: 56px 6vw; }
          .nav-links { display: none; }
          .footer { padding: 22px 6vw; }
        }
      `}</style>

      {/* NAV */}
      <nav className="nav">
       <div className="nav-logo">
  <Image src="/vv.png" alt="HealviaCare" width={180} height={48} priority style={{ height: "98px", width: "auto" }} />
</div>
        <span className="nav-city">Cataract Surgery · {city.name}</span>
        <div className="nav-right">
          <ul className="nav-links">
            <li><a href="#symptoms">Symptoms</a></li>
            <li><a href="#procedure">Procedure</a></li>
            <li><a href="#lenses">Lens Types</a></li>
            <li><a href="#faq">FAQ</a></li>
          </ul>
          <button className="nav-cta" onClick={scrollToForm}>Get in Touch</button>
        </div>
      </nav>

      {/* HERO + FORM */}
      <div className="above-fold" id="form-anchor">
        <div className="hero-left">
          <span className="hero-eyebrow">
            <span className="hero-eyebrow-dot" />
            Cataract Surgery · {city.name}
          </span>
          <h1>
            {city.headline}
            <br /><em>{city.headlineEm}</em>
          </h1>
          <p className="hero-sub">{city.sub}</p>
          <ul className="hero-bullets">
            <li>Outpatient procedure — go home the same day</li>
            <li>Numbing drops used — no general anaesthesia required</li>
            <li>Permanent clear lens implant placed during surgery</li>
            <li>Vision improvement typically begins within days</li>
          </ul>
          <button className="hero-cta" onClick={scrollToForm} style={{ marginTop: "8px" }}>
            Request a callback
          </button>
        </div>

        <div className="form-side">
          <div className="form-card">
            <LeadForm cityKey={cityKey} />
          </div>
        </div>
      </div>

      {/* WHAT IS A CATARACT */}
      <div className="explainer">
        <div>
          <p className="section-eyebrow">Understanding Cataracts</p>
          <h2>What exactly is a cataract?</h2>
          <p style={{ fontSize: "15px", color: "#5a6680", lineHeight: "1.8", marginBottom: "18px" }}>
            The natural lens of the eye sits just behind the iris. It is normally clear and flexible,
            focusing light precisely onto the retina. Over time, proteins within the lens can clump
            together, making it cloudy or opaque — this is a cataract.
          </p>
          <p style={{ fontSize: "15px", color: "#5a6680", lineHeight: "1.8", marginBottom: "18px" }}>
            As the clouding progresses, less light reaches the retina and vision becomes increasingly
            blurred, hazy, or dim. Colours may appear faded and night vision often worsens noticeably.
            Cataracts cannot be reversed with medication or glasses — the only effective treatment is
            surgical removal of the clouded lens.
          </p>
          <p style={{ fontSize: "15px", color: "#5a6680", lineHeight: "1.8" }}>
            In {city.name}, as in most urban environments, factors like pollution, UV exposure, and
            diabetes prevalence can contribute to cataracts appearing earlier. Cataracts typically develop
            slowly over months or years and can affect one or both eyes.
          </p>
        </div>
        <div className="explainer-visual">
          <div className="lens-row">
            <div className="lens-box">
              <div className="lens-circle lens-clear">👁</div>
              <div className="lens-label">Healthy lens</div>
            </div>
            <div className="lens-box">
              <div className="lens-circle lens-cloudy">🌫</div>
              <div className="lens-label">Cataract lens</div>
            </div>
          </div>
          <p className="lens-caption">
            A healthy lens is transparent. A cataract causes clouding that scatters incoming light and reduces the clarity of what you see.
          </p>
          <div className="stat-row">
            <div className="stat-box">
              <div className="stat-num">90%</div>
              <div className="stat-desc">of people over 65 have some degree of cataract formation</div>
            </div>
            <div className="stat-box">
              <div className="stat-num">#1</div>
              <div className="stat-desc">leading cause of treatable vision loss globally</div>
            </div>
          </div>
        </div>
      </div>

      {/* SYMPTOMS */}
      <section className="section alt" id="symptoms">
        <p className="section-eyebrow">Signs to Watch For</p>
        <h2>Common symptoms of a cataract</h2>
        <p className="section-lead">
          Cataracts develop gradually and symptoms can be subtle at first. If you notice any of the following,
          an eye examination can determine whether a cataract is present.
        </p>
        <div className="symptom-grid">
          {SYMPTOMS.map((s) => (
            <div key={s.title} className="symptom-card">
              <div className="symptom-icon">{s.icon}</div>
              <h3>{s.title}</h3>
              <p>{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* PROCEDURE */}
      <section className="section" id="procedure">
        <p className="section-eyebrow">The Procedure</p>
        <h2>What to expect, step by step</h2>
        <p className="section-lead">
          Cataract surgery is a well-established, minimally invasive outpatient procedure. Here is how the
          process typically unfolds for patients in {city.name}.
        </p>
        <div className="steps-timeline">
          {[
            { title: "Eye examination and consultation", desc: `Your eye doctor will examine both eyes, take precise measurements to select the appropriate lens implant, and discuss which type of intraocular lens suits your vision goals. Any existing conditions such as diabetes or glaucoma are taken into account. For patients in ${city.name}, consultations are scheduled at times that work around your routine.` },
            { title: "Pre-operative preparation", desc: "You will be given antibiotic eye drops to use in the days before surgery. On the day, dilating drops are applied. Mild sedation may be offered to help you relax, but general anaesthesia is rarely required." },
            { title: "The surgery", desc: "Numbing drops are applied so you feel no pain. A tiny incision is made at the edge of the cornea. An ultrasound probe gently breaks up the cloudy lens, which is then suctioned out. The artificial IOL is folded and inserted through the same small incision, where it unfolds into position. The incision is usually self-sealing and requires no stitches." },
            { title: "Recovery room", desc: "You rest for a short time while the clinic confirms your eye is stable. A protective shield is placed over the eye. A responsible adult must accompany you home — you should not drive on the day of surgery." },
            { title: "First 24 to 48 hours", desc: "Your vision may appear blurry or light-sensitive — this is normal and settles quickly. Prescribed antibiotic and anti-inflammatory eye drops are started the same day. Avoid rubbing the eye or any activity that increases pressure in the head." },
            { title: "Follow-up and full recovery", desc: `A review appointment is scheduled within the first week. Most patients in ${city.name} resume desk work and daily activities within a week or two. Strenuous exercise and swimming should be avoided until cleared by your surgeon, usually around four weeks after surgery.` },
          ].map((s, i) => (
            <div key={i} className="step-row">
              <div className="step-num-circle">{i + 1}</div>
              <div className="step-body">
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* LENS TYPES */}
      <section className="section alt" id="lenses">
        <p className="section-eyebrow">Intraocular Lens Options</p>
        <h2>Types of lens implants</h2>
        <p className="section-lead">
          When the natural lens is removed, an artificial intraocular lens (IOL) is implanted in its place.
          Several types are available and your surgeon will recommend the most suitable one based on your eye
          measurements and lifestyle needs.
        </p>
        <div className="lens-grid">
          {LENS_TYPES.map((l) => (
            <div key={l.name} className="lens-card">
              <span className={`lens-tag lens-tag-${l.tag}`}>{l.tag}</span>
              <h3>{l.name}</h3>
              <p>{l.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* COMPARISON TABLE */}
      <section className="section">
        <p className="section-eyebrow">Before vs After Surgery</p>
        <h2>How vision typically changes</h2>
        <p className="section-lead">
          The following reflects what many patients experience. Individual results vary — your surgeon
          will set realistic expectations based on your specific situation.
        </p>
        <div className="compare-wrap">
          <table className="compare-table">
            <thead>
              <tr>
                <th>Aspect</th>
                <th>Before Surgery</th>
                <th>After Surgery</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["Distance vision clarity", "Often blurred or hazy", "Typically much clearer"],
                ["Night driving", "Glare and halos common", "Significantly reduced glare"],
                ["Colour perception", "May appear yellowed or faded", "Colours appear more vivid"],
                ["Reading (with monofocal IOL)", "Affected by cataract", "Reading glasses may still be needed"],
                ["Light sensitivity", "Often increased", "Usually improves after healing"],
                ["Glasses prescription", "Needs frequent updating", "Stabilises post-recovery"],
              ].map(([aspect, before, after]) => (
                <tr key={aspect}>
                  <td style={{ fontWeight: 600, color: "#1a2236" }}>{aspect}</td>
                  <td>{before}</td>
                  <td className="td-after">{after}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* RISK FACTORS */}
      <section className="section dark">
        <p className="section-eyebrow">Risk Factors</p>
        <h2>Who is more likely to develop cataracts?</h2>
        <p className="section-lead">
          Cataracts are strongly associated with ageing but several other factors can increase the likelihood
          of developing them earlier or more severely.
        </p>
        <div className="risk-grid">
          {RISK_FACTORS.map((r) => (
            <div key={r.label} className="risk-item">
              <div className="risk-dot" />
              <div>
                <div className="risk-label">{r.label}</div>
                <div className="risk-detail">{r.detail}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CARE TIPS */}
      <section className="section alt">
        <p className="section-eyebrow">Care Instructions</p>
        <h2>Before and after surgery</h2>
        <p className="section-lead">
          Following care instructions carefully supports a smooth recovery and helps achieve the best visual outcome.
        </p>
        <div className="tips-grid">
          <div className="tip-card">
            <p className="tip-phase">Before surgery</p>
            <h3>Preparing for the procedure</h3>
            <ul className="tip-list">
              <li>Use all prescribed pre-operative eye drops as directed</li>
              <li>Arrange for someone to drive you to and from the clinic on the day</li>
              <li>Do not eat or drink for the number of hours your surgeon advises</li>
              <li>Remove contact lenses in the days before, as instructed</li>
              <li>Inform your doctor of all medications you are currently taking</li>
              <li>Avoid wearing makeup or eye creams on the day of surgery</li>
            </ul>
          </div>
          <div className="tip-card">
            <p className="tip-phase">First week</p>
            <h3>Immediately after surgery</h3>
            <ul className="tip-list">
              <li>Use eye drops exactly as prescribed — do not skip doses</li>
              <li>Wear the protective eye shield when sleeping for the first few nights</li>
              <li>Do not rub or press on the operated eye</li>
              <li>Avoid bending sharply at the waist or lifting heavy objects</li>
              <li>Keep water out of the eye — avoid swimming and splashing</li>
              <li>Wear sunglasses outdoors to reduce light sensitivity</li>
            </ul>
          </div>
          <div className="tip-card">
            <p className="tip-phase">Ongoing recovery</p>
            <h3>Weeks two to four</h3>
            <ul className="tip-list">
              <li>Attend all follow-up appointments as scheduled</li>
              <li>Continue eye drops until the full course is complete</li>
              <li>Avoid dusty or smoky environments that could irritate the eye</li>
              <li>Return to exercise only when cleared by your surgeon</li>
              <li>Contact your doctor promptly if you notice increasing pain or sudden vision changes</li>
              <li>Wait for your surgeon's advice before updating your glasses prescription</li>
            </ul>
          </div>
        </div>
      </section>

      {/* AREAS SERVED — city-specific */}
      <section className="section">
        <p className="section-eyebrow">{city.areasTitle}</p>
        <h2>{city.areasLead}</h2>
        <div className="areas-grid" style={{ marginTop: "32px" }}>
          {city.areas.map((area) => (
            <div key={area} className="area-tag">{area}</div>
          ))}
        </div>
      </section>

      {/* TESTIMONIALS — city-specific */}
      <section className="section alt">
        <p className="section-eyebrow">Patient Stories</p>
        <h2>What patients in {city.name} say</h2>
        <div className="testimonials-grid">
          {city.testimonials.map((t) => (
            <div key={t.name} className="testimonial">
              <p className="testimonial-quote">"{t.quote}"</p>
              <div className="testimonial-name">{t.name}</div>
              <div className="testimonial-role">{t.role}</div>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="section" id="faq">
        <p className="section-eyebrow">Questions & Answers</p>
        <h2>Frequently asked questions</h2>
        <div className="faq-list" style={{ marginTop: "40px" }}>
          {SHARED_FAQS.map((item, i) => (
            <div key={i} className="faq-item">
              <button
                className="faq-btn"
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                aria-expanded={openFaq === i}
              >
                <span>{item.q}</span>
                <span className="faq-toggle">{openFaq === i ? "−" : "+"}</span>
              </button>
              {openFaq === i && <p className="faq-answer">{item.a}</p>}
            </div>
          ))}
        </div>
      </section>

      {/* CLOSING */}
      <div className="closing-band">
        <h2>{city.closingHeadline}</h2>
        <p>{city.closingSub}</p>
        <button className="closing-btn" onClick={scrollToForm}>
          Request a callback
        </button>
      </div>

      {/* FOOTER */}
      <footer className="footer">
       <div className="footer-logo">
  <Image src="/vv.png" alt="HealviaCare" width={160} height={42} style={{ height: "26px", width: "auto" }} />
</div>
        <p className="footer-copy">© 2025 Healvia Eye Care · {city.name}. All rights reserved.</p>
      </footer>
    </>
  );
}