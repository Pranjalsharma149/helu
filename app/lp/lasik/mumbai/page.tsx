"use client";

import { useState, useEffect } from "react";

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
const IconRaindrop = () => (
  <svg {...iconProps}><path d="M12 3s6 7.2 6 11.2A6 6 0 0 1 6 14.2C6 10.2 12 3 12 3Z" /><path d="M9.5 14.2a2.5 2.5 0 0 0 2.5 2.5" /></svg>
);
const IconTrain = () => (
  <svg {...iconProps}><rect x="4.5" y="4" width="15" height="13" rx="2.5" /><path d="M4.5 11h15M8 17l-2 3M16 17l2 3" /><circle cx="8.5" cy="14" r="0.6" fill="currentColor" stroke="none" /><circle cx="15.5" cy="14" r="0.6" fill="currentColor" stroke="none" /></svg>
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
   SHARED LEAD-FORM LOGIC — identical rules to the Delhi page
   (name + 10-digit Indian mobile validation, same submit flow)
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
      // Same lead-capture endpoint used by the Delhi page — distinguished by `source`.
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
        <form onSubmit={(e) => f.handleSubmit(e, "lasik-mumbai-hero")} noValidate>
          <div className="field-group">
            <label htmlFor="hero-name-input">Your name</label>
            <input
              id="hero-name-input"
              type="text"
              placeholder="Aditya Kulkarni"
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
    <form className="lead-strip" onSubmit={(e) => f.handleSubmit(e, "lasik-mumbai-closing")} noValidate>
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

/* ── Signature illustration: the "Queen's Necklace" —
   Marine Drive's curve of streetlights, rendered blurred like
   uncorrected vision, then resolving sharp on load. ── */
function MarineDriveIllustration({ focused }: { focused: boolean }) {
  const lightX = [46, 78, 112, 148, 186, 224, 262, 298, 332];
  const lightY = [150, 132, 118, 108, 104, 108, 118, 132, 150];
  return (
    <svg viewBox="0 0 380 230" className={`necklace-illustration ${focused ? "in-focus" : "pre-focus"}`} xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="skyG" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0D1422" />
          <stop offset="100%" stopColor="#060910" />
        </linearGradient>
        <radialGradient id="moonGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#E7C873" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#E7C873" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect x="0" y="0" width="380" height="230" fill="url(#skyG)" />
      <circle cx="312" cy="42" r="34" fill="url(#moonGlow)" />
      <circle cx="312" cy="42" r="13" fill="#F4EEDD" fillOpacity="0.9" />

      {/* deco skyline silhouette */}
      <g fill="#0A0F1A" stroke="#C9A227" strokeOpacity="0.5" strokeWidth="1">
        <rect x="10" y="172" width="26" height="48" />
        <rect x="14" y="160" width="18" height="12" />
        <rect x="44" y="184" width="22" height="36" />
        <rect x="74" y="166" width="20" height="54" />
        <rect x="78" y="154" width="12" height="12" />
        <rect x="290" y="178" width="24" height="42" />
        <rect x="320" y="188" width="20" height="32" />
        <rect x="324" y="176" width="12" height="12" />
        <rect x="348" y="170" width="22" height="50" />
      </g>

      {/* the bay curve / promenade */}
      <path d="M30 168 Q190 70 350 168" fill="none" stroke="#1B2433" strokeWidth="10" strokeLinecap="round" />

      {/* the necklace lights */}
      <g className="necklace-lights">
        {lightX.map((x, i) => (
          <g key={i}>
            <circle cx={x} cy={lightY[i]} r="6.5" fill="#E7C873" fillOpacity="0.18" />
            <circle cx={x} cy={lightY[i]} r="2.6" fill="#E7C873">
              {i % 3 === 0 && (
                <animate attributeName="fill-opacity" values="1;0.55;1" dur="3.4s" repeatCount="indefinite" begin={`${i * 0.4}s`} />
              )}
            </circle>
          </g>
        ))}
      </g>
    </svg>
  );
}

/* ── Deco medallion numbering for the process section —
   each step adds one more ring, the necklace's circles
   gradually completing as the journey moves forward. ── */
function DecoMark({ numeral, rings }: { numeral: string; rings: number }) {
  const radii = Array.from({ length: rings }, (_, i) => 16 + i * 7);
  return (
    <svg viewBox="0 0 64 64" className="deco-mark">
      {radii.map((r, i) => (
        <circle key={i} cx="32" cy="32" r={r} className="deco-ring" style={{ opacity: 0.25 + i * 0.18 }} />
      ))}
      <circle cx="32" cy="32" r="12" className="deco-core" />
      <text x="32" y="37" textAnchor="middle" className="deco-numeral">{numeral}</text>
    </svg>
  );
}

function ChevronDivider() {
  return (
    <div className="chevron-divider" aria-hidden="true">
      <svg viewBox="0 0 200 14" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
        <polyline points="0,14 8,0 16,14 24,0 32,14 40,0 48,14 56,0 64,14 72,0 80,14 88,0 96,14 104,0 112,14 120,0 128,14 136,0 144,14 152,0 160,14 168,0 176,14 184,0 192,14 200,0" />
      </svg>
    </div>
  );
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

function ProcessStep({ numeral, rings, title, desc }: { numeral: string; rings: number; title: string; desc: string }) {
  return (
    <div className="process-step">
      <DecoMark numeral={numeral} rings={rings} />
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
  { q: "How much does LASIK cost in Mumbai?", a: "Pricing depends on the technology used and your prescription. You'll get one clear, itemised quote after your screening at any of our Mumbai centres — no hidden charges added later." },
  { q: "Will Mumbai's monsoon affect my recovery?", a: "Not if you follow the aftercare plan. We adjust follow-up scheduling around heavy-rain days, and recommend avoiding swimming pools, sea spray, and unfiltered rainwater near the eyes for the first couple of weeks." },
];

/* ============================================================
   PAGE
   ============================================================ */
export default function LasikMumbaiLandingPage() {
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
        @import url('https://fonts.googleapis.com/css2?family=Bodoni+Moda:opsz,wght@6..96,400;6..96,500;6..96,600;6..96,700&family=Jost:wght@400;500;600;700&family=Space+Mono:wght@500;600&display=swap');

        :root{
          --night:#0A0F1A; --night-deep:#060910;
          --gold:#C9A227; --gold-soft:#E7C873;
          --wine:#7A2331; --cream:#F4EEDD; --ivory:#FFFDF7;
          --ink:#181F2A; --slate:#5B6470; --line:#E3DBC2; --danger:#B23A2E;
          --r-lg:6px; --r-md:4px; --r-sm:3px;
          --font-display:'Bodoni Moda', Georgia, serif;
          --font-body:'Jost', system-ui, sans-serif;
          --font-mono:'Space Mono', monospace;
        }
        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
        html{scroll-behavior:smooth;}
        body{font-family:var(--font-body);color:var(--ink);background:var(--ivory);}
        h1,h2,h3,h4{font-family:var(--font-display);}
        button{font-family:inherit;}

        .pre-focus{opacity:0;}
        .in-focus{opacity:1;transition:opacity .9s ease;}
        @media (prefers-reduced-motion: no-preference){
          .pre-focus{filter:blur(14px);opacity:0;transform:scale(1.02);}
          .in-focus{filter:blur(0);opacity:1;transform:scale(1);transition:filter 1.1s cubic-bezier(.2,.7,.2,1), opacity 1.1s ease, transform 1.1s ease;}
        }

        /* ── HERO ── */
        .hero{
          min-height:100vh;
          background:radial-gradient(ellipse 60% 50% at 75% 20%, rgba(201,162,39,0.10) 0%, transparent 60%), linear-gradient(165deg,#0A0F1A 0%, var(--night-deep) 100%);
          display:grid;grid-template-columns:1.1fr 420px;gap:56px;align-items:center;
          padding:120px 6vw 70px;position:relative;overflow:hidden;
        }
        .hero-left{z-index:1;}
        .eyebrow{
          display:inline-flex;align-items:center;gap:8px;
          background:transparent;border:1px solid rgba(201,162,39,0.55);
          color:var(--gold-soft);font-family:var(--font-mono);font-size:11px;font-weight:600;
          letter-spacing:1.6px;text-transform:uppercase;padding:6px 14px;border-radius:100px;margin-bottom:30px;
        }
        .deco-headline{margin-bottom:8px;}
        .deco-headline span{display:block;color:var(--ivory);font-weight:600;line-height:0.98;}
        .deco-headline .l1{font-size:clamp(48px,8vw,96px);}
        .deco-headline .l2{font-size:clamp(28px,4.6vw,48px);color:var(--gold-soft);margin-top:8px;}
        .deco-headline .l3{font-size:clamp(18px,2.6vw,26px);color:rgba(244,238,221,0.7);margin-top:10px;font-weight:400;font-style:italic;font-family:var(--font-body);}

        .hero-sub{
          font-size:16.5px;line-height:1.8;color:rgba(244,238,221,0.7);
          max-width:470px;margin:28px 0 32px;
        }
        .hero-actions{display:flex;align-items:center;gap:20px;flex-wrap:wrap;margin-bottom:36px;}
        .btn-primary-cta{
          background:var(--gold);color:var(--night);border:none;cursor:pointer;
          font-weight:700;font-size:15px;padding:15px 30px;border-radius:var(--r-sm);
          transition:transform .15s,background .2s;
        }
        .btn-primary-cta:hover{transform:translateY(-2px);background:var(--gold-soft);}
        .hero-badges{display:flex;gap:10px;flex-wrap:wrap;}
        .badge{
          display:flex;align-items:center;gap:7px;background:rgba(244,238,221,0.05);
          border:1px solid rgba(244,238,221,0.16);color:rgba(244,238,221,0.85);
          font-size:13px;padding:7px 14px;border-radius:var(--r-sm);
        }
        .necklace-illustration{width:100%;max-width:380px;display:block;margin:0 auto 28px;}

        /* ── CHEVRON DIVIDER ── */
        .chevron-divider{width:100%;height:14px;background:var(--cream);overflow:hidden;}
        .chevron-divider svg{width:100%;height:14px;display:block;}
        .chevron-divider polyline{fill:none;stroke:var(--gold);stroke-width:1.6;}

        /* ── TRUST STRIP ── */
        .trust-strip{
          background:var(--cream);border-bottom:1px solid var(--line);
          padding:18px 6vw;display:flex;justify-content:center;gap:36px;flex-wrap:wrap;
        }
        .trust-item{font-size:13px;font-weight:600;color:var(--wine);display:flex;align-items:center;gap:6px;}

        /* ── STATS ── */
        .stats-band{
          background:var(--ivory);padding:56px 6vw;display:flex;justify-content:space-around;
          flex-wrap:wrap;gap:32px;border-bottom:1px solid var(--line);
        }
        .stat{text-align:center;}
        .stat-value{display:block;font-family:var(--font-mono);font-size:30px;font-weight:600;color:var(--wine);}
        .stat-label{display:block;font-size:12.5px;color:var(--slate);margin-top:6px;letter-spacing:.4px;text-transform:uppercase;}

        /* ── SECTION SHARED ── */
        .section{padding:92px 6vw;}
        .eyebrow-sm{font-family:var(--font-mono);font-size:11px;font-weight:600;letter-spacing:2px;text-transform:uppercase;color:var(--wine);margin-bottom:14px;}
        .section-title{font-size:clamp(28px,3.6vw,42px);font-weight:600;line-height:1.18;margin-bottom:16px;}
        .section-lead{font-size:16.5px;line-height:1.75;color:var(--slate);max-width:580px;margin-bottom:52px;}

        /* ── BENEFITS ── */
        .benefits-section{background:var(--cream);}
        .benefits-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(250px,1fr));gap:22px;}
        .benefit-card{
          background:var(--ivory);border:1px solid var(--line);border-radius:var(--r-lg);
          padding:30px 26px;transition:transform .2s,box-shadow .2s;
        }
        .benefit-card:hover{transform:translateY(-4px);box-shadow:0 16px 40px rgba(24,31,42,0.08);}
        .benefit-icon{
          width:42px;height:42px;display:flex;align-items:center;justify-content:center;
          border-radius:50%;background:rgba(122,35,49,0.08);color:var(--wine);margin-bottom:18px;
        }
        .benefit-icon svg{width:22px;height:22px;}
        .benefit-card h3{font-size:17.5px;font-weight:600;margin-bottom:8px;color:var(--ink);}
        .benefit-card p{font-size:14px;line-height:1.7;color:var(--slate);}

        /* ── TESTIMONIALS ── */
        .testimonials-section{background:var(--ivory);}
        .testimonial-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:22px;}
        .testimonial{
          background:var(--cream);border:1px solid var(--line);border-radius:var(--r-lg);
          padding:28px 26px;display:flex;flex-direction:column;gap:18px;
        }
        .testimonial blockquote{font-size:15px;line-height:1.75;color:var(--ink);font-style:italic;}
        .testimonial figcaption{display:flex;flex-direction:column;font-size:13px;color:var(--slate);}
        .testimonial figcaption strong{color:var(--wine);font-weight:600;}
        .testimonial-note{font-size:12.5px;color:var(--slate);margin-top:28px;}

        /* ── PROCESS ── */
        .process-section{background:var(--night);color:var(--ivory);text-align:center;}
        .process-section .section-lead{color:rgba(244,238,221,0.65);margin-inline:auto;}
        .process-section .eyebrow-sm{color:var(--gold-soft);}
        .process-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:28px;margin-top:54px;text-align:left;}
        .process-step{background:rgba(244,238,221,0.04);border:1px solid rgba(244,238,221,0.12);border-radius:var(--r-lg);padding:32px 24px;}
        .deco-mark{width:56px;height:56px;display:block;margin-bottom:18px;}
        .deco-ring{fill:none;stroke:var(--gold-soft);stroke-width:1.2;}
        .deco-core{fill:var(--gold);}
        .deco-numeral{font-family:var(--font-display);font-weight:700;font-size:15px;fill:var(--night);}
        .process-step h4{font-size:16.5px;font-weight:600;margin-bottom:8px;}
        .process-step p{font-size:13.5px;line-height:1.7;color:rgba(244,238,221,0.6);}

        /* ── WHY CHOOSE US ── */
        .why-section{background:var(--cream);}
        .why-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:24px;}
        .why-card{display:flex;gap:18px;background:var(--ivory);border:1px solid var(--line);border-radius:var(--r-lg);padding:26px;}
        .why-icon{
          flex-shrink:0;width:44px;height:44px;border-radius:50%;background:var(--wine);
          color:var(--ivory);display:flex;align-items:center;justify-content:center;
        }
        .why-icon svg{width:22px;height:22px;}
        .why-card h4{font-size:16px;font-weight:600;margin-bottom:6px;color:var(--ink);}
        .why-card p{font-size:13.5px;line-height:1.7;color:var(--slate);}

        /* ── FINAL CTA ── */
        .closing-section{
          background:linear-gradient(165deg, var(--wine) 0%, var(--night) 100%);
          padding:88px 6vw;color:var(--ivory);
        }
        .closing-inner{max-width:760px;margin:0 auto;text-align:center;}
        .closing-inner h2{font-size:clamp(28px,4vw,44px);font-weight:600;margin-bottom:14px;}
        .closing-inner > p{font-size:16px;color:rgba(244,238,221,0.78);margin-bottom:40px;}

        .lead-strip{
          display:flex;gap:12px;flex-wrap:wrap;justify-content:center;align-items:flex-start;
          background:rgba(244,238,221,0.06);border:1px solid rgba(244,238,221,0.18);
          border-radius:var(--r-lg);padding:18px;
        }
        .strip-field{display:flex;flex-direction:column;flex:1;min-width:180px;}
        .strip-field input{
          padding:13px 16px;border:1.5px solid rgba(244,238,221,0.25);border-radius:var(--r-sm);
          background:rgba(244,238,221,0.05);color:var(--ivory);font-size:14.5px;outline:none;transition:border-color .2s;
        }
        .strip-field input::placeholder{color:rgba(244,238,221,0.5);}
        .strip-field input:focus{border-color:var(--gold);}
        .strip-field input.input-error{border-color:#E89486;}
        .btn-strip{
          background:var(--gold);color:var(--night);border:none;cursor:pointer;font-weight:700;
          font-size:14.5px;padding:13px 26px;border-radius:var(--r-sm);white-space:nowrap;
          transition:background .2s,transform .15s;
        }
        .btn-strip:hover:not(:disabled){background:var(--gold-soft);transform:translateY(-1px);}
        .btn-strip:disabled{opacity:.7;cursor:not-allowed;}
        .strip-success{
          display:flex;align-items:center;gap:14px;justify-content:center;
          background:rgba(244,238,221,0.08);border:1px solid rgba(244,238,221,0.2);
          border-radius:var(--r-lg);padding:22px;font-size:15px;
        }
        .strip-api-error{flex-basis:100%;text-align:left;margin-top:4px;}

        /* ── LEAD CARD (hero) ── */
        .lead-card{
          background:var(--ivory);border-radius:var(--r-lg);padding:38px 34px;
          box-shadow:0 28px 80px rgba(6,9,16,0.35);position:relative;z-index:2;
          border:1px solid rgba(201,162,39,0.3);
        }
        .lead-card::before, .lead-card::after{
          content:'';position:absolute;width:22px;height:22px;border:2px solid var(--gold);pointer-events:none;
        }
        .lead-card::before{top:-1px;left:-1px;border-right:none;border-bottom:none;}
        .lead-card::after{bottom:-1px;right:-1px;border-left:none;border-top:none;}
        .lead-card-badge{
          display:inline-block;background:var(--gold);
          color:var(--night);font-size:11px;font-weight:700;letter-spacing:1.2px;text-transform:uppercase;
          padding:5px 13px;border-radius:100px;margin-bottom:18px;
        }
        .lead-card-title{font-size:21px;font-weight:600;color:var(--ink);margin-bottom:6px;}
        .lead-card-sub{font-size:13.5px;color:var(--slate);margin-bottom:26px;}
        .field-group{margin-bottom:16px;}
        .field-group label{display:block;font-size:12.5px;font-weight:600;color:var(--ink);margin-bottom:6px;letter-spacing:.3px;}
        .field-group input{
          width:100%;padding:12px 15px;border:1.5px solid var(--line);border-radius:var(--r-sm);
          font-size:15px;color:var(--ink);outline:none;background:#FBF8EF;transition:border-color .2s;
        }
        .field-group input:focus{border-color:var(--gold);background:var(--ivory);}
        .field-group input.input-error{border-color:var(--danger);}
        .field-err{display:block;margin-top:4px;font-size:12px;color:var(--danger);}
        .btn-primary{
          width:100%;background:linear-gradient(135deg,var(--wine) 0%, #5C1A24 100%);
          color:var(--ivory);border:none;cursor:pointer;font-weight:700;font-size:15.5px;
          padding:15px;border-radius:var(--r-sm);margin-top:6px;transition:opacity .2s,transform .15s;
        }
        .btn-primary:hover:not(:disabled){transform:translateY(-2px);opacity:.93;}
        .btn-primary:disabled{opacity:.7;cursor:not-allowed;}
        .btn-loading{display:flex;align-items:center;justify-content:center;gap:10px;}
        .spinner{width:15px;height:15px;border:2px solid rgba(255,255,255,0.35);border-top-color:#fff;border-radius:50%;animation:spin .7s linear infinite;display:inline-block;}
        @keyframes spin{to{transform:rotate(360deg);}}
        .form-privacy{font-size:11.5px;color:#8A8270;text-align:center;margin-top:13px;}
        .form-api-error{background:#FCEEEA;border:1px solid #EFC3B8;color:var(--danger);font-size:12.5px;padding:9px 13px;border-radius:var(--r-sm);margin-bottom:10px;}
        .form-success{text-align:center;padding:20px 0;}
        .success-mark{width:46px;height:46px;border-radius:50%;background:var(--wine);color:#fff;display:flex;align-items:center;justify-content:center;font-size:22px;margin:0 auto 16px;animation:pop .4s ease;}
        @keyframes pop{from{transform:scale(0);}to{transform:scale(1);}}
        .form-success p{font-size:15.5px;color:var(--ink);line-height:1.6;}

        /* ── FAQ ── */
        .faq-section{background:var(--ivory);}
        .faq-list{max-width:680px;}
        .faq-item{border-bottom:1px solid var(--line);}
        .faq-q{
          width:100%;background:none;border:none;cursor:pointer;text-align:left;
          display:flex;justify-content:space-between;align-items:center;gap:16px;
          padding:20px 0;font-size:16px;font-weight:600;color:var(--ink);
        }
        .faq-plus{color:var(--wine);font-size:20px;flex-shrink:0;}
        .faq-a{font-size:14.5px;line-height:1.75;color:var(--slate);padding-bottom:20px;max-width:600px;}

        /* ── RESPONSIVE ── */
        @media (max-width:960px){
          .hero{grid-template-columns:1fr;text-align:center;padding:100px 5vw 60px;}
          .hero-actions,.hero-badges{justify-content:center;}
          .hero-sub{margin-inline:auto;}
          .deco-headline{text-align:center;}
        }
        @media (max-width:600px){
          .lead-card{padding:28px 22px;}
          .section{padding:72px 6vw;}
          .lead-strip{flex-direction:column;}
          .strip-field{width:100%;}
        }

        :focus-visible{outline:2px solid var(--gold);outline-offset:2px;}

        .top-line{
          background:var(--wine);color:var(--ivory);text-align:center;
          font-size:13px;font-weight:600;letter-spacing:.3px;padding:9px 6vw;
        }
      `}</style>

      {/* ── TOP LINE ─────────────────────────────────── */}
      <div className="top-line">Best Healthcare in Mumbai</div>

      {/* ── HERO ─────────────────────────────────────── */}
      <section className="hero">
        <div className="hero-left">
          <span className="eyebrow">Lucenta Vision Institute · Mumbai</span>
          <h1 className={`deco-headline ${focused ? "in-focus" : "pre-focus"}`}>
            <span className="l1">FOCUS</span>
            <span className="l2">Mumbai never blurs again</span>
            <span className="l3">blade-free LASIK, fifteen minutes flat</span>
          </h1>
          <p className="hero-sub">
            Fogged-up lenses on the 8:02 fast local. Headlight glare on the Sea Link in the rain.
            Squinting at menus in monsoon humidity. LASIK fixes the one part of the commute you can
            actually control — your eyes — permanently, with no injections and no stitches.
          </p>
          <div className="hero-actions">
            <button className="btn-primary-cta" onClick={focusHeroForm}>Book free consultation</button>
          </div>
          <div className="hero-badges">
            <span className="badge">NABH-accredited centre</span>
            <span className="badge">Blade-free laser technology</span>
            <span className="badge">15-minute procedure</span>
          </div>
        </div>

        <div>
          <MarineDriveIllustration focused={focused} />
          <LeadCard />
        </div>
      </section>

      <ChevronDivider />

      {/* ── TRUST STRIP ──────────────────────────────── */}
      <div className="trust-strip">
        <span className="trust-item">4.9★ average patient rating</span>
        <span className="trust-item">Senior, fellowship-trained surgeons</span>
        <span className="trust-item">Bandra · Andheri · Powai · South Mumbai</span>
      </div>

      {/* ── STATS ────────────────────────────────────── */}
      <div className="stats-band">
        <Stat value="18,000+" label="Procedures performed" />
        <Stat value="10+" label="Years in practice" />
        <Stat value="97%" label="Patient satisfaction" />
        <Stat value="15,000+" label="Happy patients" />
        <Stat value="4" label="Centres across Mumbai" />
      </div>

      {/* ── BENEFITS ─────────────────────────────────── */}
      <section className="section benefits-section">
        <p className="eyebrow-sm">Why LASIK</p>
        <h2 className="section-title">A permanent fix for a city that doesn't stop</h2>
        <p className="section-lead">
          LASIK reshapes the cornea so light focuses correctly on the retina — permanently.
          Here's what that means once you're back in Mumbai's traffic, trains, and monsoon air.
        </p>
        <div className="benefits-grid">
          <BenefitCard icon={<IconSunrise />} title="Clear by the next local" desc="Most patients reach 6/6 vision or better within 24 hours — in time for the morning commute." />
          <BenefitCard icon={<IconBolt />} title="Fifteen minutes, start to finish" desc="Numbing drops, no needles, no stitches — done before your chai goes cold." />
          <BenefitCard icon={<IconRaindrop />} title="No more monsoon fog" desc="Corrected corneas don't steam up behind glasses on a packed train or fog over in the rain." />
          <BenefitCard icon={<IconTrain />} title="Back on the platform fast" desc="Most patients return to work and the daily commute within a day or two of surgery." />
          <BenefitCard icon={<IconScan />} title="Blade-free, laser-precise" desc="All-laser 3D corneal mapping built for accuracy a blade-based procedure can't match." />
          <BenefitCard icon={<IconShield />} title="Care that follows you home" desc="Scheduled follow-ups and round-the-clock support through recovery, wherever in the city you are." />
        </div>
      </section>

      {/* ── TESTIMONIALS ─────────────────────────────── */}
      <section className="section testimonials-section">
        <p className="eyebrow-sm">Patient Stories</p>
        <h2 className="section-title">What clear vision actually feels like</h2>
        <div className="testimonial-grid">
          <Testimonial quote="I used to wipe my glasses every two minutes on the fast local in July. This monsoon, for the first time in years, I just looked out the window." name="Rohan D." role="Investment Analyst, BKC" />
          <Testimonial quote="Running a kitchen in steam and heat with glasses sliding off my nose was its own daily fight. That part of my day is just gone now." name="Sana I." role="Restaurant Owner, Bandra" />
          <Testimonial quote="The screening was more thorough than I expected — they actually talked me through whether I was a good fit before booking anything." name="Kavita J." role="School Teacher, Andheri" />
        </div>
        <p className="testimonial-note">Shared with patients' permission. Individual results vary by eye condition and candidacy.</p>
      </section>

      {/* ── PROCESS ──────────────────────────────────── */}
      <section className="section process-section">
        <p className="eyebrow-sm">What To Expect</p>
        <h2 className="section-title">Four steps, start to clear vision</h2>
        <p className="section-lead">Like the necklace of lights along the bay, each step adds one more ring — by the fourth, the picture is whole.</p>
        <div className="process-grid">
          <ProcessStep numeral="I" rings={1} title="Free consultation call" desc="We call you back to talk through your eyes, your commute, and every question — no clinic visit needed yet." />
          <ProcessStep numeral="II" rings={2} title="Detailed eye screening" desc="A full pre-LASIK workup confirms candidacy — corneal thickness, prescription stability, eye health." />
          <ProcessStep numeral="III" rings={3} title="The LASIK procedure" desc="A precise, blade-free, fifteen-minute laser procedure performed by a senior surgeon." />
          <ProcessStep numeral="IV" rings={4} title="Recovery & follow-up" desc="Scheduled check-ins make sure your eyes heal exactly as they should, rain or no rain." />
        </div>
      </section>

      {/* ── WHY CHOOSE US ────────────────────────────── */}
      <section className="section why-section">
        <p className="eyebrow-sm">Why Lucenta</p>
        <h2 className="section-title">What sets the experience apart</h2>
        <p className="section-lead">Plenty of clinics offer LASIK across the city. Here's what we think actually matters once you're in the chair.</p>
        <div className="why-grid">
          <WhyCard icon={<IconScan />} title="Latest blade-free technology" desc="3D corneal mapping and all-laser cuts, built for Mumbai's heat, humidity, and dust." />
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
          <h2>Ready to see the Queen's Necklace without squinting?</h2>
          <p>Book a free eye screening with our specialists across Mumbai. No obligation — just clarity on whether LASIK is right for you.</p>
          <LeadStrip />
        </div>
      </section>
    </>
  );
}