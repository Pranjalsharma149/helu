"use client";

import { useState, useEffect, useRef } from "react";

/* ============================================================
   ICONS — minimal line set, currentColor, shared stroke weight
   ============================================================ */
const iconProps = { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.6, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };

const IconSunrise = () => (
  <svg {...iconProps}><circle cx="12" cy="14" r="4" /><path d="M4 19h16M12 2v4M4.5 8.5l2 2M19.5 8.5l-2 2" /></svg>
);
const IconBolt = () => (
  <svg {...iconProps}><path d="M12 2 5 14h5l-1 8 8-12h-5l1-8Z" /></svg>
);
const IconInfinity = () => (
  <svg {...iconProps}><path d="M7 9.5a3.5 3.5 0 1 0 0 5 13 13 0 0 0 5-5 13 13 0 0 0 5-5 3.5 3.5 0 1 1 0 5 13 13 0 0 1-5 5 13 13 0 0 1-5-5Z" /></svg>
);
const IconCalendar = () => (
  <svg {...iconProps}><rect x="3.5" y="5" width="17" height="16" rx="2.5" /><path d="M3.5 9.5h17M8 3v4M16 3v4M8.5 14l1.8 1.8 4-4" /></svg>
);
const IconScan = () => (
  <svg {...iconProps}><path d="M4 8V5a1 1 0 0 1 1-1h3M20 8V5a1 1 0 0 0-1-1h-3M4 16v3a1 1 0 0 0 1 1h3M20 16v3a1 1 0 0 1-1 1h-3" /><circle cx="12" cy="12" r="3.2" /><path d="M4 12h2M18 12h2" /></svg>
);
const IconShield = () => (
  <svg {...iconProps}><path d="M12 3 5 6v6c0 4.2 3 7.4 7 9 4-1.6 7-4.8 7-9V6l-7-3Z" /><path d="M9 12l2 2 4-4.2" /></svg>
);
const IconBadge = () => (
  <svg {...iconProps}><circle cx="12" cy="9" r="5" /><path d="M8.5 13.5 7 21l5-2.5L17 21l-1.5-7.5" /></svg>
);
const IconTag = () => (
  <svg {...iconProps}><path d="M3.5 11.5 12.5 2.5h6a1 1 0 0 1 1 1v6l-9 9a1.5 1.5 0 0 1-2 0l-5-5a1.5 1.5 0 0 1 0-2Z" /><circle cx="16" cy="6.5" r="1.2" fill="currentColor" stroke="none" /></svg>
);
const IconHeart = () => (
  <svg {...iconProps}><path d="M12 20S3.5 14.6 3.5 8.9A4.4 4.4 0 0 1 12 6.5a4.4 4.4 0 0 1 8.5 2.4C20.5 14.6 12 20 12 20Z" /></svg>
);

/* ============================================================
   SHARED LEAD-FORM LOGIC
   Used by both the hero card and the closing strip so the
   validation + submit behaviour never drifts between the two.
   ============================================================ */
type Status = "idle" | "loading" | "success" | "error";

function useLeadForm() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [nameError, setNameError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

  function validatePhone(value: string) {
    const cleaned = value.replace(/\D/g, "");
    if (!cleaned) return "Mobile number is required";
    if (cleaned.length !== 10) return "Enter a valid 10-digit number";
    if (!/^[6-9]/.test(cleaned)) return "Enter a valid Indian mobile number";
    const fake = [/^(\d)\1{9}$/, /^1234567890$/, /^0987654321$/, /^9876543210$/];
    if (fake.some((p) => p.test(cleaned))) return "Please enter a real number";
    return "";
  }

  function handleNameChange(e: React.ChangeEvent<HTMLInputElement>) {
    setName(e.target.value);
    if (nameError) setNameError("");
  }

  function handlePhoneChange(e: React.ChangeEvent<HTMLInputElement>) {
    const val = e.target.value.replace(/[^\d\s\-+()]/g, "");
    setPhone(val);
    if (phoneError) setPhoneError(validatePhone(val));
  }

  async function handleSubmit(e: React.FormEvent, source: string) {
    e.preventDefault();
    const nErr = name.trim().length < 2 ? "Name must be at least 2 characters" : "";
    const pErr = validatePhone(phone);
    setNameError(nErr);
    setPhoneError(pErr);
    if (nErr || pErr) return;

    setStatus("loading");
    try {
      // Replace with your real lead-capture endpoint.
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          phone,
          service: "LASIK",
          source,
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok || data.duplicate) {
        setStatus("success");
        setMessage(data.message || "Thanks — our care team will call you shortly.");
      } else {
        setStatus("error");
        setMessage(data.error || "Something went wrong. Please try again.");
      }
    } catch {
      setStatus("error");
      setMessage("Unable to connect. Please call us directly at +91-XXXXXXXXXX.");
    }
  }

  return { name, phone, nameError, phoneError, status, message, handleNameChange, handlePhoneChange, handleSubmit };
}

/* ── Hero / primary lead card ── */
function LeadCard() {
  const f = useLeadForm();
  return (
    <div className="lead-card" id="lead-card-anchor">
      <div className="lead-card-badge">Free Eye Screening</div>
      <h3 className="lead-card-title">Check your LASIK eligibility</h3>
      <p className="lead-card-sub">A specialist calls you back — usually within minutes.</p>

      {f.status === "success" ? (
        <div className="form-success">
          <div className="success-mark">✓</div>
          <p>{f.message}</p>
        </div>
      ) : (
        <form onSubmit={(e) => f.handleSubmit(e, "lasik-delhi-hero")} noValidate>
          <div className="field-group">
            <label htmlFor="hero-name-input">Your name</label>
            <input
              id="hero-name-input"
              type="text"
              placeholder="Rahul Sharma"
              value={f.name}
              onChange={f.handleNameChange}
              className={f.nameError ? "input-error" : ""}
            />
            {f.nameError && <span className="field-err">{f.nameError}</span>}
          </div>
          <div className="field-group">
            <label htmlFor="hero-phone-input">Mobile number</label>
            <input
              id="hero-phone-input"
              type="tel"
              placeholder="98765 43210"
              value={f.phone}
              onChange={f.handlePhoneChange}
              maxLength={14}
              className={f.phoneError ? "input-error" : ""}
            />
            {f.phoneError && <span className="field-err">{f.phoneError}</span>}
          </div>
          {f.status === "error" && <p className="form-api-error">{f.message}</p>}
          <button type="submit" className="btn-primary" disabled={f.status === "loading"}>
            {f.status === "loading" ? <span className="btn-loading"><span className="spinner" />Booking…</span> : "Book free consultation"}
          </button>
          <p className="form-privacy">Your details stay private. No spam calls.</p>
        </form>
      )}
    </div>
  );
}

/* ── Compact inline lead strip for the closing CTA ── */
function LeadStrip() {
  const f = useLeadForm();
  if (f.status === "success") {
    return (
      <div className="strip-success">
        <span className="success-mark">✓</span>
        <p>{f.message}</p>
      </div>
    );
  }
  return (
    <form className="lead-strip" onSubmit={(e) => f.handleSubmit(e, "lasik-delhi-closing")} noValidate>
      <div className="strip-field">
        <input type="text" placeholder="Your name" value={f.name} onChange={f.handleNameChange} className={f.nameError ? "input-error" : ""} aria-label="Your name" />
        {f.nameError && <span className="field-err">{f.nameError}</span>}
      </div>
      <div className="strip-field">
        <input type="tel" placeholder="Mobile number" value={f.phone} onChange={f.handlePhoneChange} maxLength={14} className={f.phoneError ? "input-error" : ""} aria-label="Mobile number" />
        {f.phoneError && <span className="field-err">{f.phoneError}</span>}
      </div>
      <button type="submit" className="btn-strip" disabled={f.status === "loading"}>
        {f.status === "loading" ? "Booking…" : "Get a callback"}
      </button>
      {f.status === "error" && <p className="form-api-error strip-api-error">{f.message}</p>}
    </form>
  );
}

/* ── Eye illustration — sharpens into focus on load ── */
function EyeIllustration({ focused }: { focused: boolean }) {
  return (
    <svg viewBox="0 0 380 220" className={`eye-illustration ${focused ? "in-focus" : "pre-focus"}`} xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="irisG" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#1FA39E" />
          <stop offset="55%" stopColor="#0E7C7B" />
          <stop offset="100%" stopColor="#0A5B5A" />
        </radialGradient>
        <radialGradient id="glowG" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#0E7C7B" stopOpacity="0.18" />
          <stop offset="100%" stopColor="#0E7C7B" stopOpacity="0" />
        </radialGradient>
      </defs>
      <ellipse cx="190" cy="110" rx="150" ry="78" fill="url(#glowG)" />
      <path d="M35 110 Q190 18 345 110 Q190 198 35 110Z" fill="#F4FBF9" stroke="#D8ECE8" strokeWidth="1.5" />
      <circle cx="190" cy="110" r="54" fill="url(#irisG)" />
      <circle cx="190" cy="110" r="24" fill="#08161B" />
      <ellipse cx="206" cy="95" rx="9" ry="5.5" fill="#fff" fillOpacity="0.55" transform="rotate(-20 206 95)" />
      <circle cx="190" cy="110" r="60" fill="none" stroke="#E8A33D" strokeWidth="2" strokeDasharray="5 6" strokeOpacity="0.75">
        <animateTransform attributeName="transform" type="rotate" from="0 190 110" to="360 190 110" dur="9s" repeatCount="indefinite" />
      </circle>
    </svg>
  );
}

/* ── Eye-chart style numbering for the process section ──
   Letters shrink the way a real acuity chart does — order here
   communicates the same thing the chart does: things get sharper
   as you move through the steps. */
function ChartMark({ letter, scale }: { letter: string; scale: number }) {
  return <span className="chart-mark" style={{ fontSize: `${scale}rem` }}>{letter}</span>;
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="stat">
      <span className="stat-value">{value}</span>
      <span className="stat-label">{label}</span>
    </div>
  );
}

function BenefitCard({ icon, title, desc }: { icon: React.ReactNode; title: string; desc: string }) {
  return (
    <div className="benefit-card">
      <span className="benefit-icon">{icon}</span>
      <h3>{title}</h3>
      <p>{desc}</p>
    </div>
  );
}

function WhyCard({ icon, title, desc }: { icon: React.ReactNode; title: string; desc: string }) {
  return (
    <div className="why-card">
      <span className="why-icon">{icon}</span>
      <div>
        <h4>{title}</h4>
        <p>{desc}</p>
      </div>
    </div>
  );
}

function Testimonial({ quote, name, role }: { quote: string; name: string; role: string }) {
  return (
    <figure className="testimonial">
      <blockquote>“{quote}”</blockquote>
      <figcaption><strong>{name}</strong><span>{role}</span></figcaption>
    </figure>
  );
}

function ProcessStep({ letter, scale, title, desc }: { letter: string; scale: number; title: string; desc: string }) {
  return (
    <div className="process-step">
      <ChartMark letter={letter} scale={scale} />
      <h4>{title}</h4>
      <p>{desc}</p>
    </div>
  );
}

function FaqItem({ q, a, open, onToggle }: { q: string; a: string; open: boolean; onToggle: () => void }) {
  return (
    <div className={`faq-item ${open ? "faq-open" : ""}`}>
      <button className="faq-q" onClick={onToggle} aria-expanded={open}>
        {q}
        <span className="faq-plus">{open ? "−" : "+"}</span>
      </button>
      {open && <p className="faq-a">{a}</p>}
    </div>
  );
}

const FAQS = [
  { q: "Is LASIK painful?", a: "No. Numbing drops are used throughout, so the 15-minute procedure is generally painless. Some mild dryness or light sensitivity for a day or two afterward is normal." },
  { q: "Am I a good candidate for LASIK?", a: "Most adults with stable vision and healthy corneas qualify. Your free screening checks corneal thickness, prescription stability, and overall eye health before confirming candidacy." },
  { q: "How much does LASIK cost in Delhi?", a: "Pricing depends on the technology used and your prescription. You'll get one clear, itemised quote after your screening — no hidden charges added later." },
  { q: "How soon can I go back to work?", a: "Most patients return to desk-based work within a day or two, and to driving once the surgeon confirms your vision has stabilised at your follow-up visit." },
];

/* ============================================================
   PAGE
   ============================================================ */
export default function LasikLandingPage() {
  const [focused, setFocused] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  useEffect(() => {
    const t = setTimeout(() => setFocused(true), 60);
    return () => clearTimeout(t);
  }, []);

  function focusHeroForm() {
    document.getElementById("lead-card-anchor")?.scrollIntoView({ behavior: "smooth", block: "center" });
    document.getElementById("hero-name-input")?.focus();
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,600;9..144,700&family=Inter:wght@400;500;600;700&family=IBM+Plex+Mono:wght@500;600&display=swap');

        :root{
          --ink:#0B2230; --teal:#0E7C7B; --teal-deep:#0A5B5A;
          --mint:#F4FBF9; --sand:#E8A33D; --white:#FFFFFF;
          --slate:#51626B; --line:#DCEDE9; --danger:#C0392B;
          --r-lg:18px; --r-md:12px; --r-sm:8px;
          --font-display:'Fraunces', Georgia, serif;
          --font-body:'Inter', system-ui, sans-serif;
          --font-mono:'IBM Plex Mono', monospace;
        }
        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
        html{scroll-behavior:smooth;}
        body{font-family:var(--font-body);color:var(--ink);background:var(--white);}
        h1,h2,h3,h4{font-family:var(--font-display);}
        button{font-family:inherit;}

        /* ── focus-pull signature: blurred → sharp on load ── */
        .pre-focus{opacity:0;}
        .in-focus{opacity:1;transition:opacity .9s ease;}
        @media (prefers-reduced-motion: no-preference){
          .pre-focus{filter:blur(14px);opacity:0;transform:scale(1.02);}
          .in-focus{filter:blur(0);opacity:1;transform:scale(1);transition:filter 1.1s cubic-bezier(.2,.7,.2,1), opacity 1.1s ease, transform 1.1s ease;}
        }

        /* ── HERO ── */
        .hero{
          min-height:100vh;
          background:linear-gradient(160deg,#082226 0%, var(--ink) 45%, var(--teal-deep) 100%);
          display:grid;grid-template-columns:1.1fr 420px;gap:56px;align-items:center;
          padding:120px 6vw 80px;position:relative;overflow:hidden;
        }
        .hero::before{
          content:'';position:absolute;inset:0;pointer-events:none;
          background:radial-gradient(ellipse 55% 60% at 25% 40%, rgba(232,163,61,0.08) 0%, transparent 70%);
        }
        .hero-left{z-index:1;}
        .eyebrow{
          display:inline-flex;align-items:center;gap:8px;
          background:rgba(232,163,61,0.14);border:1px solid rgba(232,163,61,0.4);
          color:#F3CD86;font-family:var(--font-mono);font-size:11px;font-weight:600;
          letter-spacing:1.6px;text-transform:uppercase;padding:6px 14px;border-radius:100px;margin-bottom:30px;
        }
        .chart-headline{margin-bottom:8px;}
        .chart-headline span{display:block;color:var(--white);font-weight:600;line-height:0.98;}
        .chart-headline .l1{font-size:clamp(48px,8vw,96px);}
        .chart-headline .l2{font-size:clamp(32px,5.4vw,58px);color:#BFE8E5;margin-top:6px;}
        .chart-headline .l3{font-size:clamp(20px,3vw,30px);color:var(--sand);margin-top:6px;font-weight:400;font-style:italic;}

        .hero-sub{
          font-size:17px;line-height:1.75;color:rgba(255,255,255,0.78);
          max-width:460px;margin:28px 0 32px;
        }
        .hero-actions{display:flex;align-items:center;gap:20px;flex-wrap:wrap;margin-bottom:36px;}
        .btn-ghost-cta{
          background:var(--sand);color:var(--ink);border:none;cursor:pointer;
          font-weight:700;font-size:15px;padding:15px 30px;border-radius:var(--r-sm);
          transition:transform .15s,background .2s;
        }
        .btn-ghost-cta:hover{transform:translateY(-2px);background:#F3CD86;}
        .hero-badges{display:flex;gap:10px;flex-wrap:wrap;}
        .badge{
          display:flex;align-items:center;gap:7px;background:rgba(255,255,255,0.07);
          border:1px solid rgba(255,255,255,0.14);color:rgba(255,255,255,0.88);
          font-size:13px;padding:7px 14px;border-radius:var(--r-sm);
        }
        .eye-illustration{width:100%;max-width:380px;display:block;margin:0 auto 28px;}

        /* ── TRUST STRIP ── */
        .trust-strip{
          background:var(--mint);border-bottom:1px solid var(--line);
          padding:18px 6vw;display:flex;justify-content:center;gap:36px;flex-wrap:wrap;
        }
        .trust-item{font-size:13px;font-weight:600;color:var(--teal-deep);display:flex;align-items:center;gap:6px;}

        /* ── STATS ── */
        .stats-band{
          background:var(--white);padding:56px 6vw;display:flex;justify-content:space-around;
          flex-wrap:wrap;gap:32px;border-bottom:1px solid var(--line);
        }
        .stat{text-align:center;}
        .stat-value{display:block;font-family:var(--font-mono);font-size:32px;font-weight:600;color:var(--teal);}
        .stat-label{display:block;font-size:12.5px;color:var(--slate);margin-top:6px;letter-spacing:.4px;text-transform:uppercase;}

        /* ── SECTION SHARED ── */
        .section{padding:92px 6vw;}
        .eyebrow-sm{font-family:var(--font-mono);font-size:11px;font-weight:600;letter-spacing:2px;text-transform:uppercase;color:var(--teal);margin-bottom:14px;}
        .section-title{font-size:clamp(28px,3.6vw,42px);font-weight:600;line-height:1.18;margin-bottom:16px;}
        .section-lead{font-size:16.5px;line-height:1.75;color:var(--slate);max-width:580px;margin-bottom:52px;}

        /* ── BENEFITS ── */
        .benefits-section{background:var(--mint);}
        .benefits-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(250px,1fr));gap:22px;}
        .benefit-card{
          background:var(--white);border:1px solid var(--line);border-radius:var(--r-lg);
          padding:30px 26px;transition:transform .2s,box-shadow .2s;
        }
        .benefit-card:hover{transform:translateY(-4px);box-shadow:0 16px 40px rgba(11,34,48,0.08);}
        .benefit-icon{
          width:42px;height:42px;display:flex;align-items:center;justify-content:center;
          border-radius:10px;background:rgba(14,124,123,0.1);color:var(--teal);margin-bottom:18px;
        }
        .benefit-icon svg{width:22px;height:22px;}
        .benefit-card h3{font-size:17.5px;font-weight:600;margin-bottom:8px;color:var(--ink);}
        .benefit-card p{font-size:14px;line-height:1.7;color:var(--slate);}

        /* ── TESTIMONIALS ── */
        .testimonials-section{background:var(--white);}
        .testimonial-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:22px;}
        .testimonial{
          background:var(--mint);border:1px solid var(--line);border-radius:var(--r-lg);
          padding:28px 26px;display:flex;flex-direction:column;gap:18px;
        }
        .testimonial blockquote{font-size:15px;line-height:1.75;color:var(--ink);font-style:italic;}
        .testimonial figcaption{display:flex;flex-direction:column;font-size:13px;color:var(--slate);}
        .testimonial figcaption strong{color:var(--teal-deep);font-weight:600;}
        .testimonial-note{font-size:12.5px;color:var(--slate);margin-top:28px;}

        /* ── PROCESS ── */
        .process-section{background:var(--ink);color:var(--white);text-align:center;}
        .process-section .section-lead{color:rgba(255,255,255,0.7);margin-inline:auto;}
        .process-section .eyebrow-sm{color:var(--sand);}
        .process-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:28px;margin-top:54px;text-align:left;}
        .process-step{background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.12);border-radius:var(--r-lg);padding:32px 24px;}
        .chart-mark{display:block;font-family:var(--font-display);font-weight:700;color:var(--sand);line-height:1;margin-bottom:18px;}
        .process-step h4{font-size:16.5px;font-weight:600;margin-bottom:8px;}
        .process-step p{font-size:13.5px;line-height:1.7;color:rgba(255,255,255,0.65);}

        /* ── WHY CHOOSE US ── */
        .why-section{background:var(--mint);}
        .why-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:24px;}
        .why-card{display:flex;gap:18px;background:var(--white);border:1px solid var(--line);border-radius:var(--r-lg);padding:26px;}
        .why-icon{
          flex-shrink:0;width:44px;height:44px;border-radius:11px;background:var(--teal-deep);
          color:var(--white);display:flex;align-items:center;justify-content:center;
        }
        .why-icon svg{width:22px;height:22px;}
        .why-card h4{font-size:16px;font-weight:600;margin-bottom:6px;color:var(--ink);}
        .why-card p{font-size:13.5px;line-height:1.7;color:var(--slate);}

        /* ── FINAL CTA ── */
        .closing-section{
          background:linear-gradient(160deg, var(--teal-deep) 0%, var(--ink) 100%);
          padding:88px 6vw;color:var(--white);
        }
        .closing-inner{max-width:760px;margin:0 auto;text-align:center;}
        .closing-inner h2{font-size:clamp(28px,4vw,44px);font-weight:600;margin-bottom:14px;}
        .closing-inner > p{font-size:16px;color:rgba(255,255,255,0.75);margin-bottom:40px;}

        .lead-strip{
          display:flex;gap:12px;flex-wrap:wrap;justify-content:center;align-items:flex-start;
          background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.14);
          border-radius:var(--r-lg);padding:18px;
        }
        .strip-field{display:flex;flex-direction:column;flex:1;min-width:180px;}
        .strip-field input{
          padding:13px 16px;border:1.5px solid rgba(255,255,255,0.2);border-radius:var(--r-sm);
          background:rgba(255,255,255,0.05);color:var(--white);font-size:14.5px;outline:none;transition:border-color .2s;
        }
        .strip-field input::placeholder{color:rgba(255,255,255,0.5);}
        .strip-field input:focus{border-color:var(--sand);}
        .strip-field input.input-error{border-color:#E8918A;}
        .btn-strip{
          background:var(--sand);color:var(--ink);border:none;cursor:pointer;font-weight:700;
          font-size:14.5px;padding:13px 26px;border-radius:var(--r-sm);white-space:nowrap;
          transition:background .2s,transform .15s;
        }
        .btn-strip:hover:not(:disabled){background:#F3CD86;transform:translateY(-1px);}
        .btn-strip:disabled{opacity:.7;cursor:not-allowed;}
        .strip-success{
          display:flex;align-items:center;gap:14px;justify-content:center;
          background:rgba(255,255,255,0.08);border:1px solid rgba(255,255,255,0.16);
          border-radius:var(--r-lg);padding:22px;font-size:15px;
        }
        .strip-api-error{flex-basis:100%;text-align:left;margin-top:4px;}

        /* ── LEAD CARD (hero) ── */
        .lead-card{
          background:var(--white);border-radius:20px;padding:38px 34px;
          box-shadow:0 28px 80px rgba(8,22,27,0.25);position:relative;z-index:2;
          border:1px solid rgba(232,163,61,0.25);
        }
        .lead-card-badge{
          display:inline-block;background:linear-gradient(90deg,var(--sand),#F3CD86);
          color:var(--ink);font-size:11px;font-weight:700;letter-spacing:1.2px;text-transform:uppercase;
          padding:5px 13px;border-radius:100px;margin-bottom:18px;
        }
        .lead-card-title{font-size:21px;font-weight:600;color:var(--ink);margin-bottom:6px;}
        .lead-card-sub{font-size:13.5px;color:var(--slate);margin-bottom:26px;}
        .field-group{margin-bottom:16px;}
        .field-group label{display:block;font-size:12.5px;font-weight:600;color:var(--ink);margin-bottom:6px;letter-spacing:.3px;}
        .field-group input{
          width:100%;padding:12px 15px;border:1.5px solid #CFE3E0;border-radius:var(--r-sm);
          font-size:15px;color:var(--ink);outline:none;background:#FAFEFD;transition:border-color .2s;
        }
        .field-group input:focus{border-color:var(--teal);background:var(--white);}
        .field-group input.input-error{border-color:var(--danger);}
        .field-err{display:block;margin-top:4px;font-size:12px;color:var(--danger);}
        .btn-primary{
          width:100%;background:linear-gradient(135deg,var(--teal) 0%, var(--teal-deep) 100%);
          color:var(--white);border:none;cursor:pointer;font-weight:700;font-size:15.5px;
          padding:15px;border-radius:10px;margin-top:6px;transition:opacity .2s,transform .15s;
        }
        .btn-primary:hover:not(:disabled){transform:translateY(-2px);opacity:.93;}
        .btn-primary:disabled{opacity:.7;cursor:not-allowed;}
        .btn-loading{display:flex;align-items:center;justify-content:center;gap:10px;}
        .spinner{width:15px;height:15px;border:2px solid rgba(255,255,255,0.35);border-top-color:#fff;border-radius:50%;animation:spin .7s linear infinite;display:inline-block;}
        @keyframes spin{to{transform:rotate(360deg);}}
        .form-privacy{font-size:11.5px;color:#7C8C92;text-align:center;margin-top:13px;}
        .form-api-error{background:#FDF1EF;border:1px solid #F2C4BD;color:var(--danger);font-size:12.5px;padding:9px 13px;border-radius:var(--r-sm);margin-bottom:10px;}
        .form-success{text-align:center;padding:20px 0;}
        .success-mark{width:46px;height:46px;border-radius:50%;background:var(--teal);color:#fff;display:flex;align-items:center;justify-content:center;font-size:22px;margin:0 auto 16px;animation:pop .4s ease;}
        @keyframes pop{from{transform:scale(0);}to{transform:scale(1);}}
        .form-success p{font-size:15.5px;color:var(--ink);line-height:1.6;}

        /* ── FAQ ── */
        .faq-section{background:var(--white);}
        .faq-list{max-width:680px;}
        .faq-item{border-bottom:1px solid var(--line);}
        .faq-q{
          width:100%;background:none;border:none;cursor:pointer;text-align:left;
          display:flex;justify-content:space-between;align-items:center;gap:16px;
          padding:20px 0;font-size:16px;font-weight:600;color:var(--ink);
        }
        .faq-plus{color:var(--teal);font-size:20px;flex-shrink:0;}
        .faq-a{font-size:14.5px;line-height:1.75;color:var(--slate);padding-bottom:20px;max-width:600px;}

        /* ── RESPONSIVE ── */
        @media (max-width:960px){
          .hero{grid-template-columns:1fr;text-align:center;padding:100px 5vw 60px;}
          .hero-actions,.hero-badges{justify-content:center;}
          .hero-sub{margin-inline:auto;}
          .chart-headline{text-align:center;}
        }
        @media (max-width:600px){
          .lead-card{padding:28px 22px;}
          .section{padding:72px 6vw;}
          .lead-strip{flex-direction:column;}
          .strip-field{width:100%;}
        }

        :focus-visible{outline:2px solid var(--sand);outline-offset:2px;}

        .top-line{
          background:var(--sand);color:var(--ink);text-align:center;
          font-size:13px;font-weight:600;letter-spacing:.3px;padding:9px 6vw;
        }
      `}</style>

      {/* ── TOP LINE ─────────────────────────────────── */}
      <div className="top-line">Best Healthcare in Delhi</div>

      {/* ── HERO ─────────────────────────────────────── */}
      <section className="hero">
        <div className="hero-left">
          <span className="eyebrow">Lucenta Vision Institute · Delhi</span>
          <h1 className={`chart-headline ${focused ? "in-focus" : "pre-focus"}`}>
            <span className="l1">SEE</span>
            <span className="l2">without glasses</span>
            <span className="l3">in fifteen minutes</span>
          </h1>
          <p className="hero-sub">
            Blade-free LASIK performed by fellowship-trained ophthalmologists.
            No injections, no stitches — most patients wake up to clear vision the very next morning.
          </p>
          <div className="hero-actions">
            <button className="btn-ghost-cta" onClick={focusHeroForm}>Book free consultation</button>
          </div>
          <div className="hero-badges">
            <span className="badge">NABH-accredited centre</span>
            <span className="badge">Blade-free laser technology</span>
            <span className="badge">15-minute procedure</span>
          </div>
        </div>

        <div>
          <EyeIllustration focused={focused} />
          <LeadCard />
        </div>
      </section>

      {/* ── TRUST STRIP ──────────────────────────────── */}
      <div className="trust-strip">
        <span className="trust-item">4.9★ average patient rating</span>
        <span className="trust-item">Senior, fellowship-trained surgeons</span>
        <span className="trust-item">Transparent, upfront pricing</span>
      </div>

      {/* ── STATS ────────────────────────────────────── */}
      <div className="stats-band">
        <Stat value="25,000+" label="Procedures performed" />
        <Stat value="12+" label="Years in practice" />
        <Stat value="98%" label="Patient satisfaction" />
        <Stat value="20,000+" label="Happy patients" />
        <Stat value="5" label="Centres across Delhi NCR" />
      </div>

      {/* ── BENEFITS ─────────────────────────────────── */}
      <section className="section benefits-section">
        <p className="eyebrow-sm">Why LASIK</p>
        <h2 className="section-title">A permanent fix, not another pair of lenses</h2>
        <p className="section-lead">
          LASIK reshapes the cornea so light focuses correctly on the retina — permanently.
          Here's what that means for your day-to-day life.
        </p>
        <div className="benefits-grid">
          <BenefitCard icon={<IconSunrise />} title="Clear vision by morning" desc="Most patients reach 6/6 vision or better within 24 hours of the procedure." />
          <BenefitCard icon={<IconBolt />} title="Quick and painless" desc="The procedure itself takes about 15 minutes, with numbing drops and no needles." />
          <BenefitCard icon={<IconInfinity />} title="Built to last" desc="LASIK corrects your vision permanently — most patients never reach for glasses again." />
          <BenefitCard icon={<IconCalendar />} title="Back to normal fast" desc="Drive, work, and resume daily activities within a day or two of surgery." />
          <BenefitCard icon={<IconScan />} title="Blade-free precision" desc="All-laser technology maps your cornea in 3D for a level of accuracy a blade can't match." />
          <BenefitCard icon={<IconShield />} title="Care that doesn't stop at surgery" desc="Scheduled follow-ups and round-the-clock support through your full recovery." />
        </div>
      </section>

      {/* ── TESTIMONIALS ─────────────────────────────── */}
      <section className="section testimonials-section">
        <p className="eyebrow-sm">Patient Stories</p>
        <h2 className="section-title">What clear vision actually feels like</h2>
        <div className="testimonial-grid">
          <Testimonial quote="I'd worn glasses since I was nine. Reading my phone at 2am without fumbling for them still feels like a small miracle." name="Priya S." role="Software Engineer" />
          <Testimonial quote="The screening was more thorough than I expected — they actually talked me through whether I was a good fit before booking anything." name="Arjun M." role="Commercial Pilot" />
          <Testimonial quote="I was back in the classroom two days later. The follow-up calls checking on my recovery made the whole thing feel looked-after." name="Neha K." role="School Teacher" />
        </div>
        <p className="testimonial-note">Shared with patients' permission. Individual results vary by eye condition and candidacy.</p>
      </section>

      {/* ── PROCESS ──────────────────────────────────── */}
      <section className="section process-section">
        <p className="eyebrow-sm">What To Expect</p>
        <h2 className="section-title">Four steps, start to clear vision</h2>
        <p className="section-lead">Each step sharpens the picture — literally. Here's the path from first call to follow-up.</p>
        <div className="process-grid">
          <ProcessStep letter="E" scale={2.6} title="Free consultation call" desc="We call you back to understand your eyes, your lifestyle, and answer every question." />
          <ProcessStep letter="F" scale={2.1} title="Detailed eye screening" desc="A thorough pre-LASIK workup confirms whether you're a good candidate for the procedure." />
          <ProcessStep letter="P" scale={1.7} title="The LASIK procedure" desc="A precise, blade-free, 15-minute laser procedure performed by a senior surgeon." />
          <ProcessStep letter="T" scale={1.3} title="Recovery & follow-up" desc="Scheduled check-ins make sure your eyes heal exactly as they should." />
        </div>
      </section>

      {/* ── WHY CHOOSE US ────────────────────────────── */}
      <section className="section why-section">
        <p className="eyebrow-sm">Why Lucenta</p>
        <h2 className="section-title">What sets the experience apart</h2>
        <p className="section-lead">Plenty of clinics offer LASIK. Here's what we think actually matters once you're in the chair.</p>
        <div className="why-grid">
          <WhyCard icon={<IconScan />} title="Latest blade-free technology" desc="3D corneal mapping and all-laser cuts for a level of precision older methods can't reach." />
          <WhyCard icon={<IconBadge />} title="Senior surgeons, not residents" desc="Every procedure is performed by a fellowship-trained ophthalmologist with years of LASIK experience." />
          <WhyCard icon={<IconTag />} title="Transparent, fair pricing" desc="One clear quote after your screening — no hidden add-ons once you're already committed." />
          <WhyCard icon={<IconHeart />} title="Aftercare that's actually proactive" desc="We call to check on you, not the other way around, through every stage of recovery." />
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────── */}
      <section className="section faq-section">
        <p className="eyebrow-sm">Common Questions</p>
        <h2 className="section-title">Before you book, the answers most people want</h2>
        <div className="faq-list">
          {FAQS.map((item, i) => (
            <FaqItem key={item.q} q={item.q} a={item.a} open={openFaq === i} onToggle={() => setOpenFaq(openFaq === i ? null : i)} />
          ))}
        </div>
      </section>

      {/* ── FINAL CTA ────────────────────────────────── */}
      <section className="closing-section">
        <div className="closing-inner">
          <h2>Ready to see the world without reaching for your glasses?</h2>
          <p>Book a free eye screening with our specialists. No obligation — just clarity on whether LASIK is right for you.</p>
          <LeadStrip />
        </div>
      </section>
    </>
  );
}