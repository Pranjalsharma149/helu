  "use client";

import { useState, useEffect } from "react";

/* ============================================================
   ICONS — minimal line set, currentColor, shared stroke weight
   ============================================================ */
const ip = { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.6, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };

const IconMonitor = () => (
  <svg {...ip}><rect x="3" y="4.5" width="18" height="12" rx="1.6" /><path d="M9 20.5h6M12 16.5v4" /></svg>
);
const IconGlassesOff = () => (
  <svg {...ip}><circle cx="6.5" cy="14.5" r="3.2" /><circle cx="17.5" cy="14.5" r="3.2" /><path d="M9.7 14.5h4.6M3 14.5l1.3-7c.3-1.6 1.4-2.5 3-2.5M21 14.5l-1.3-7c-.3-1.6-1.4-2.5-3-2.5" /><path d="M3 21 21 3" /></svg>
);
const IconClock = () => (
  <svg {...ip}><circle cx="12" cy="12" r="8.5" /><path d="M12 7.5V12l3 2" /></svg>
);
const IconZap = () => (
  <svg {...ip}><path d="M12 2 5 14h5l-1 8 8-12h-5l1-8Z" /></svg>
);
const IconLoop = () => (
  <svg {...ip}><path d="M7 9.5a3.5 3.5 0 1 0 0 5 13 13 0 0 0 5-5 13 13 0 0 0 5-5 3.5 3.5 0 1 1 0 5 13 13 0 0 1-5 5 13 13 0 0 1-5-5Z" /></svg>
);
const IconShield = () => (
  <svg {...ip}><path d="M12 3 5 6v6c0 4.2 3 7.4 7 9 4-1.6 7-4.8 7-9V6l-7-3Z" /><path d="M9 12l2 2 4-4.2" /></svg>
);
const IconCpu = () => (
  <svg {...ip}><rect x="6" y="6" width="12" height="12" rx="1.6" /><rect x="9.3" y="9.3" width="5.4" height="5.4" rx="1" /><path d="M9 2.5v2M15 2.5v2M9 19.5v2M15 19.5v2M2.5 9h2M2.5 15h2M19.5 9h2M19.5 15h2" /></svg>
);
const IconPin = () => (
  <svg {...ip}><path d="M12 21s-6.5-5.7-6.5-11A6.5 6.5 0 0 1 18.5 10c0 5.3-6.5 11-6.5 11Z" /><circle cx="12" cy="10" r="2.3" /></svg>
);

/* ============================================================
   SHARED LEAD-FORM LOGIC
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
        body: JSON.stringify({ name: name.trim(), phone, service: "LASIK", source }),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok || data.duplicate) {
        setStatus("success");
        setMessage(data.message || "Got it — our care team will call you shortly.");
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

/* ── Hero lead card ── */
function LeadCard() {
  const f = useLeadForm();
  return (
    <div className="lead-card" id="lead-card-anchor">
      <div className="lead-card-tag">Free Screen-Strain Screening</div>
      <h3 className="lead-card-title">See if LASIK fits your eyes</h3>
      <p className="lead-card-sub">Drop your number — a specialist calls back within minutes.</p>

      {f.status === "success" ? (
        <div className="form-success">
          <div className="success-mark">✓</div>
          <p>{f.message}</p>
        </div>
      ) : (
        <form onSubmit={(e) => f.handleSubmit(e, "lasik-noida-hero")} noValidate>
          <div className="field-group">
            <label htmlFor="noida-name-input">Name</label>
            <input id="noida-name-input" type="text" placeholder="Ankit Verma" value={f.name} onChange={f.handleNameChange} className={f.nameError ? "input-error" : ""} />
            {f.nameError && <span className="field-err">{f.nameError}</span>}
          </div>
          <div className="field-group">
            <label htmlFor="noida-phone-input">Mobile number</label>
            <input id="noida-phone-input" type="tel" placeholder="98765 43210" value={f.phone} onChange={f.handlePhoneChange} maxLength={14} className={f.phoneError ? "input-error" : ""} />
            {f.phoneError && <span className="field-err">{f.phoneError}</span>}
          </div>
          {f.status === "error" && <p className="form-api-error">{f.message}</p>}
          <button type="submit" className="btn-primary" disabled={f.status === "loading"}>
            {f.status === "loading" ? <span className="btn-loading"><span className="spinner" />Booking…</span> : "Book free screening"}
          </button>
          <p className="form-privacy">No spam calls. Your number stays private.</p>
        </form>
      )}
    </div>
  );
}

/* ── Compact closing strip ── */
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
    <form className="lead-strip" onSubmit={(e) => f.handleSubmit(e, "lasik-noida-closing")} noValidate>
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

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="stat">
      <span className="stat-value">{value}</span>
      <span className="stat-label">{label}</span>
    </div>
  );
}

function BenefitCard({ icon, title, desc, accent }: { icon: React.ReactNode; title: string; desc: string; accent?: boolean }) {
  return (
    <div className={`benefit-card ${accent ? "accent-violet" : ""}`}>
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

function ChatTestimonial({ quote, name, role }: { quote: string; name: string; role: string }) {
  return (
    <div className="chat-bubble">
      <p>{quote}</p>
      <span className="chat-tail" />
      <div className="chat-meta"><strong>{name}</strong><span>{role}</span></div>
    </div>
  );
}

function TimelineStep({ index, title, desc }: { index: string; title: string; desc: string }) {
  return (
    <div className="timeline-step">
      <span className="timeline-index">{index}</span>
      <h4>{title}</h4>
      <p>{desc}</p>
    </div>
  );
}

function TechCard({ name, tagline, desc, tag }: { name: string; tagline: string; desc: string; tag: string }) {
  return (
    <div className="tech-card">
      <span className="tech-tag">{tag}</span>
      <h4>{name}</h4>
      <p className="tech-tagline">{tagline}</p>
      <p className="tech-desc">{desc}</p>
    </div>
  );
}

function Avatar({ initials, hue }: { initials: string; hue: "violet" | "coral" | "lime" }) {
  return <span className={`avatar avatar-${hue}`}>{initials}</span>;
}

function DoctorCard({ initials, hue, name, role, detail }: { initials: string; hue: "violet" | "coral" | "lime"; name: string; role: string; detail: string }) {
  return (
    <div className="doctor-card">
      <Avatar initials={initials} hue={hue} />
      <h4>{name}</h4>
      <p className="doctor-role">{role}</p>
      <p className="doctor-detail">{detail}</p>
    </div>
  );
}

function FaqItem({ q, a, open, onToggle }: { q: string; a: string; open: boolean; onToggle: () => void }) {
  return (
    <div className={`faq-item ${open ? "faq-open" : ""}`}>
      <button className="faq-q" onClick={onToggle} aria-expanded={open}>
        <span><span className="faq-prefix">Q:</span> {q}</span>
        <span className="faq-plus">{open ? "−" : "+"}</span>
      </button>
      {open && <p className="faq-a"><span className="faq-prefix">A:</span> {a}</p>}
    </div>
  );
}

const AREAS = ["Sector 18", "Sector 62", "Sector 50", "Greater Noida", "Noida Extension", "Sector 137", "Sector 76", "Sector 15"];

const TECH = [
  { name: "Bladeless LASIK", tag: "Most popular", tagline: "All-laser, no blade, ever.", desc: "A femtosecond laser creates the corneal flap and an excimer laser reshapes it — fast, precise, and the standard choice for most prescriptions." },
  { name: "Contoura Vision", tag: "Topography-guided", tagline: "Mapped to your eye's unique surface.", desc: "Over 22,000 data points of your cornea guide the laser, correcting irregularities glasses never could." },
  { name: "SMILE", tag: "Minimally invasive", tagline: "No flap, smaller incision.", desc: "A keyhole-sized opening reshapes the cornea from within, suited to certain prescriptions and thinner corneas — common among long-hour screen workers." },
];

const FAQS = [
  { q: "I'm in front of a screen all day — does that rule out LASIK?", a: "No. Screen time doesn't disqualify you. What matters is your prescription stability and corneal health, both checked in the free screening." },
  { q: "Is the procedure painful?", a: "No. Numbing drops are used throughout. The 15-minute procedure is generally painless, with mild dryness for a day or two after." },
  { q: "How much does LASIK cost in Noida?", a: "It depends on your prescription and the technology used. You get one clear quote after your screening — no hidden charges later." },
  { q: "Which technology is right for me — LASIK, Contoura, or SMILE?", a: "It depends on your corneal thickness and prescription. The screening team walks you through which option fits your eyes, not just what's newest." },
  { q: "Do you cover patients outside central Noida?", a: "Yes — we see patients across Noida and Greater Noida, including Sector 62, Noida Extension, and the Expressway belt. Scheduling works around your commute." },
  { q: "How soon can I get back to my desk?", a: "Most patients are back at a screen within a day or two, once the surgeon confirms your eyes are healing on schedule." },
];

/* ============================================================
   PAGE
   ============================================================ */
export default function NoidaLasikPage() {
  const [revealed, setRevealed] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  useEffect(() => {
    const t = setTimeout(() => setRevealed(true), 80);
    return () => clearTimeout(t);
  }, []);

  function focusForm() {
    document.getElementById("lead-card-anchor")?.scrollIntoView({ behavior: "smooth", block: "center" });
    document.getElementById("noida-name-input")?.focus();
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@500;600&display=swap');

        :root{
          --ink:#1E1B3A; --violet:#5B3DF5; --coral:#FF5A36; --coral-deep:#D63F20;
          --paper:#F6F4FB; --white:#FFFFFF; --slate:#5B5770; --line:#E4E0F0;
          --lime:#B6FF6B; --danger:#D63F20;
          --r-md:6px; --r-lg:10px;
          --font-display:'Space Grotesk', system-ui, sans-serif;
          --font-body:'Inter', system-ui, sans-serif;
          --font-mono:'JetBrains Mono', monospace;
        }
        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
        html{scroll-behavior:smooth;}
        body{font-family:var(--font-body);color:var(--ink);background:var(--white);}
        h1,h2,h3,h4{font-family:var(--font-display);}
        button{font-family:inherit;}
        :focus-visible{outline:2px solid var(--coral);outline-offset:2px;}

        /* ── HERO ── */
        .hero{
          background:var(--ink);
          display:grid;grid-template-columns:1.15fr 420px;gap:56px;align-items:center;
          padding:110px 6vw 76px;position:relative;overflow:hidden;
        }
        .hero::before{
          content:'';position:absolute;inset:0;pointer-events:none;
          background:radial-gradient(ellipse 50% 55% at 80% 15%, rgba(91,61,245,0.25) 0%, transparent 70%),
                      radial-gradient(ellipse 45% 50% at 10% 85%, rgba(255,90,54,0.12) 0%, transparent 70%);
        }
        .hero-left{z-index:1;}
        .tag-pin{
          display:inline-flex;align-items:center;gap:7px;background:rgba(255,90,54,0.14);
          border:1px solid rgba(255,90,54,0.4);color:#FFB39E;font-family:var(--font-mono);
          font-size:11px;font-weight:600;letter-spacing:1.2px;text-transform:uppercase;
          padding:6px 14px;border-radius:100px;margin-bottom:28px;
        }
        .tag-pin svg{width:13px;height:13px;}

        /* glitch-to-clear NOIDA heading */
        .glitch-wrap{position:relative;display:inline-block;margin-bottom:14px;}
        .glitch-wrap .base{
          font-size:clamp(64px,11vw,128px);font-weight:700;line-height:0.92;color:var(--white);
          letter-spacing:-2px;position:relative;
        }
        .glitch-layer{
          position:absolute;top:0;left:0;font-size:clamp(64px,11vw,128px);font-weight:700;
          line-height:0.92;letter-spacing:-2px;pointer-events:none;
        }
        @media (prefers-reduced-motion: no-preference){
          .pre-glitch .glitch-layer.cy{opacity:1;color:#23E5C9;transform:translate(6px,-3px);}
          .pre-glitch .glitch-layer.mg{opacity:1;color:#FF5A36;transform:translate(-6px,3px);}
          .pre-glitch .base{opacity:0;}
          .revealed .glitch-layer{opacity:0;transition:opacity .5s ease, transform .5s ease;transform:translate(0,0);}
          .revealed .base{opacity:1;transition:opacity .5s ease .35s;}
        }
        @media (prefers-reduced-motion: reduce){
          .glitch-layer{display:none;}
        }
        .hero-subline{
          font-size:clamp(20px,2.6vw,28px);color:var(--lime);font-weight:600;margin-bottom:18px;
        }
        .hero-copy{font-size:16.5px;line-height:1.75;color:rgba(255,255,255,0.72);max-width:460px;margin-bottom:30px;}
        .hero-actions{margin-bottom:34px;}
        .btn-cta-coral{
          background:var(--coral);color:var(--white);border:none;cursor:pointer;
          font-weight:700;font-size:15px;padding:15px 30px;border-radius:var(--r-md);
          transition:transform .15s,background .2s;
        }
        .btn-cta-coral:hover{transform:translateY(-2px);background:var(--coral-deep);}
        .hero-badges{display:flex;gap:10px;flex-wrap:wrap;}
        .badge{
          display:flex;align-items:center;gap:7px;background:rgba(255,255,255,0.06);
          border:1px solid rgba(255,255,255,0.14);color:rgba(255,255,255,0.85);
          font-size:12.5px;padding:7px 13px;border-radius:var(--r-md);
        }

        /* ── TRUST STRIP ── */
        .trust-strip{background:var(--paper);border-bottom:1px solid var(--line);padding:16px 6vw;display:flex;justify-content:center;gap:32px;flex-wrap:wrap;}
        .trust-item{font-size:13px;font-weight:600;color:var(--violet);}

        /* ── STATS ── */
        .stats-band{background:var(--white);padding:52px 6vw;display:flex;justify-content:space-around;flex-wrap:wrap;gap:30px;border-bottom:1px solid var(--line);}
        .stat{text-align:center;}
        .stat-value{display:block;font-family:var(--font-mono);font-size:30px;font-weight:600;color:var(--coral);}
        .stat-label{display:block;font-size:12px;color:var(--slate);margin-top:6px;letter-spacing:.4px;text-transform:uppercase;}

        /* ── SECTION SHARED ── */
        .section{padding:88px 6vw;}
        .eyebrow-sm{font-family:var(--font-mono);font-size:11px;font-weight:600;letter-spacing:1.8px;text-transform:uppercase;color:var(--coral);margin-bottom:14px;}
        .section-title{font-size:clamp(27px,3.4vw,40px);font-weight:600;line-height:1.18;margin-bottom:16px;letter-spacing:-.5px;}
        .section-lead{font-size:16px;line-height:1.75;color:var(--slate);max-width:580px;margin-bottom:50px;}

        /* ── BENEFITS ── */
        .benefits-section{background:var(--paper);}
        .benefits-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(250px,1fr));gap:20px;}
        .benefit-card{background:var(--white);border:1px solid var(--line);border-left:3px solid var(--coral);border-radius:var(--r-md);padding:28px 24px;transition:transform .2s,box-shadow .2s;}
        .benefit-card.accent-violet{border-left-color:var(--violet);}
        .benefit-card:hover{transform:translateY(-3px);box-shadow:0 14px 32px rgba(30,27,58,0.08);}
        .benefit-icon{width:40px;height:40px;display:flex;align-items:center;justify-content:center;border-radius:8px;background:rgba(91,61,245,0.08);color:var(--violet);margin-bottom:16px;}
        .benefit-icon svg{width:21px;height:21px;}
        .benefit-card h3{font-size:17px;font-weight:600;margin-bottom:8px;}
        .benefit-card p{font-size:13.5px;line-height:1.7;color:var(--slate);}

        /* ── TESTIMONIALS (chat bubbles) ── */
        .testimonials-section{background:var(--white);}
        .chat-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(250px,1fr));gap:26px 22px;}
        .chat-bubble{position:relative;background:var(--paper);border:1px solid var(--line);border-radius:var(--r-lg) var(--r-lg) var(--r-lg) 2px;padding:22px 22px 18px;}
        .chat-bubble p{font-size:14.5px;line-height:1.7;color:var(--ink);}
        .chat-tail{position:absolute;bottom:-9px;left:18px;width:16px;height:16px;background:var(--paper);border-right:1px solid var(--line);border-bottom:1px solid var(--line);transform:rotate(45deg);}
        .chat-meta{margin-top:18px;font-size:12.5px;color:var(--slate);display:flex;gap:8px;}
        .chat-meta strong{color:var(--violet);font-weight:600;}
        .testimonial-note{font-size:12.5px;color:var(--slate);margin-top:30px;}

        /* ── PROCESS (timeline) ── */
        .process-section{background:var(--ink);color:var(--white);}
        .process-section .section-lead{color:rgba(255,255,255,0.68);}
        .timeline{display:grid;grid-template-columns:repeat(auto-fit,minmax(190px,1fr));gap:0;margin-top:50px;position:relative;}
        .timeline::before{content:'';position:absolute;top:22px;left:0;right:0;height:1px;background:rgba(255,255,255,0.15);}
        .timeline-step{position:relative;padding:0 18px 0 0;}
        .timeline-index{
          display:inline-flex;align-items:center;justify-content:center;width:44px;height:44px;
          border-radius:50%;background:var(--coral);color:var(--white);font-family:var(--font-mono);
          font-weight:600;font-size:14px;margin-bottom:20px;position:relative;z-index:1;
        }
        .timeline-step h4{font-size:16px;font-weight:600;margin-bottom:8px;}
        .timeline-step p{font-size:13.5px;line-height:1.7;color:rgba(255,255,255,0.62);}

        /* ── WHY CHOOSE US ── */
        .why-section{background:var(--paper);}
        .why-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:22px;}
        .why-card{display:flex;gap:16px;background:var(--white);border:1px solid var(--line);border-radius:var(--r-md);padding:24px;}
        .why-icon{flex-shrink:0;width:42px;height:42px;border-radius:9px;background:var(--ink);color:var(--lime);display:flex;align-items:center;justify-content:center;}
        .why-icon svg{width:21px;height:21px;}
        .why-card h4{font-size:15.5px;font-weight:600;margin-bottom:6px;}
        .why-card p{font-size:13px;line-height:1.7;color:var(--slate);}

        /* ── FAQ ── */
        .faq-section{background:var(--white);}
        .faq-list{max-width:680px;}
        .faq-item{border-bottom:1px solid var(--line);}
        .faq-q{width:100%;background:none;border:none;cursor:pointer;text-align:left;display:flex;justify-content:space-between;align-items:flex-start;gap:16px;padding:19px 0;font-size:15.5px;font-weight:600;color:var(--ink);}
        .faq-prefix{font-family:var(--font-mono);color:var(--coral);margin-right:4px;}
        .faq-plus{color:var(--violet);font-size:19px;flex-shrink:0;}
        .faq-a{font-size:14px;line-height:1.75;color:var(--slate);padding-bottom:19px;max-width:600px;}

        /* ── FINAL CTA ── */
        .closing-section{background:var(--coral);padding:84px 6vw;color:var(--white);position:relative;overflow:hidden;}
        .closing-section::before{content:'NOIDA';position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);font-family:var(--font-display);font-weight:700;font-size:22vw;color:rgba(255,255,255,0.06);white-space:nowrap;pointer-events:none;}
        .closing-inner{max-width:740px;margin:0 auto;text-align:center;position:relative;z-index:1;}
        .closing-inner h2{font-size:clamp(27px,3.8vw,42px);font-weight:700;margin-bottom:14px;letter-spacing:-.5px;}
        .closing-inner > p{font-size:16px;color:rgba(255,255,255,0.85);margin-bottom:38px;}

        .lead-strip{display:flex;gap:12px;flex-wrap:wrap;justify-content:center;background:rgba(30,27,58,0.16);border:1px solid rgba(255,255,255,0.25);border-radius:var(--r-lg);padding:18px;}
        .strip-field{display:flex;flex-direction:column;flex:1;min-width:180px;}
        .strip-field input{padding:13px 16px;border:1.5px solid rgba(255,255,255,0.3);border-radius:var(--r-md);background:rgba(255,255,255,0.08);color:var(--white);font-size:14.5px;outline:none;transition:border-color .2s;}
        .strip-field input::placeholder{color:rgba(255,255,255,0.6);}
        .strip-field input:focus{border-color:var(--ink);}
        .strip-field input.input-error{border-color:#2A2154;}
        .btn-strip{background:var(--ink);color:var(--white);border:none;cursor:pointer;font-weight:700;font-size:14.5px;padding:13px 26px;border-radius:var(--r-md);white-space:nowrap;transition:background .2s,transform .15s;}
        .btn-strip:hover:not(:disabled){background:#2A2154;transform:translateY(-1px);}
        .btn-strip:disabled{opacity:.7;cursor:not-allowed;}
        .strip-success{display:flex;align-items:center;gap:14px;justify-content:center;background:rgba(255,255,255,0.12);border:1px solid rgba(255,255,255,0.3);border-radius:var(--r-lg);padding:22px;font-size:15px;}
        .strip-api-error{flex-basis:100%;text-align:left;margin-top:4px;color:#2A2154;background:#fff;}

        /* ── LEAD CARD ── */
        .lead-card{background:var(--white);border-radius:14px;padding:36px 32px;box-shadow:0 24px 64px rgba(30,27,58,0.35);position:relative;z-index:2;border-top:4px solid var(--coral);}
        .lead-card-tag{display:inline-block;background:rgba(91,61,245,0.1);color:var(--violet);font-size:11px;font-weight:700;letter-spacing:1px;text-transform:uppercase;padding:5px 12px;border-radius:100px;margin-bottom:18px;}
        .lead-card-title{font-size:20px;font-weight:600;margin-bottom:6px;}
        .lead-card-sub{font-size:13.5px;color:var(--slate);margin-bottom:26px;}
        .field-group{margin-bottom:16px;}
        .field-group label{display:block;font-size:12.5px;font-weight:600;color:var(--ink);margin-bottom:6px;}
        .field-group input{width:100%;padding:12px 15px;border:1.5px solid #DCD8EC;border-radius:var(--r-md);font-size:15px;color:var(--ink);outline:none;background:#FBFAFE;transition:border-color .2s;}
        .field-group input:focus{border-color:var(--violet);background:var(--white);}
        .field-group input.input-error{border-color:var(--danger);}
        .field-err{display:block;margin-top:4px;font-size:12px;color:var(--danger);}
        .btn-primary{width:100%;background:var(--ink);color:var(--white);border:none;cursor:pointer;font-weight:700;font-size:15.5px;padding:15px;border-radius:var(--r-md);margin-top:6px;transition:opacity .2s,transform .15s;}
        .btn-primary:hover:not(:disabled){transform:translateY(-2px);opacity:.92;}
        .btn-primary:disabled{opacity:.7;cursor:not-allowed;}
        .btn-loading{display:flex;align-items:center;justify-content:center;gap:10px;}
        .spinner{width:15px;height:15px;border:2px solid rgba(255,255,255,0.35);border-top-color:#fff;border-radius:50%;animation:spin .7s linear infinite;display:inline-block;}
        @keyframes spin{to{transform:rotate(360deg);}}
        .form-privacy{font-size:11.5px;color:#8C88A0;text-align:center;margin-top:13px;}
        .form-api-error{background:#FDF0ED;border:1px solid #F3C3B5;color:var(--danger);font-size:12.5px;padding:9px 13px;border-radius:var(--r-md);margin-bottom:10px;}
        .form-success{text-align:center;padding:18px 0;}
        .success-mark{width:44px;height:44px;border-radius:50%;background:var(--coral);color:#fff;display:flex;align-items:center;justify-content:center;font-size:21px;margin:0 auto 16px;animation:pop .4s ease;}
        @keyframes pop{from{transform:scale(0);}to{transform:scale(1);}}
        .form-success p{font-size:15px;color:var(--ink);line-height:1.6;}

        /* ── RESPONSIVE ── */
        @media (max-width:960px){
          .hero{grid-template-columns:1fr;text-align:center;padding:96px 5vw 56px;}
          .hero-badges{justify-content:center;}
          .hero-copy{margin-inline:auto;}
          .glitch-wrap{display:block;}
          .timeline::before{display:none;}
        }
        @media (max-width:600px){
          .lead-card{padding:26px 20px;}
          .section{padding:68px 6vw;}
          .lead-strip{flex-direction:column;}
          .strip-field{width:100%;}
          .closing-section::before{font-size:38vw;}
        }
      `}</style>

      {/* ── HERO ─────────────────────────────────────── */}
      <section className="hero">
        <div className="hero-left">
          <span className="tag-pin"><IconPin />Noida</span>

          <div className={`glitch-wrap ${revealed ? "revealed" : "pre-glitch"}`}>
            <span className="glitch-layer cy">NOIDA</span>
            <span className="glitch-layer mg">NOIDA</span>
            <span className="base">NOIDA</span>
          </div>
          <p className="hero-subline">LASIK, without the screen strain.</p>

          <p className="hero-copy">
            Built for a city that lives on screens. Blade-free LASIK from fellowship-trained
            ophthalmologists — most patients see clearly by the next morning, no glasses required.
          </p>
          <div className="hero-actions">
            <button className="btn-cta-coral" onClick={focusForm}>Book free screening</button>
          </div>
          <div className="hero-badges">
            <span className="badge">NABH-accredited centre</span>
            <span className="badge">Blade-free laser technology</span>
            <span className="badge">15-minute procedure</span>
          </div>
        </div>

        <div>
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
        <Stat value="18,000+" label="Procedures performed" />
        <Stat value="10+" label="Years in practice" />
        <Stat value="97%" label="Patient satisfaction" />
        <Stat value="3" label="Centres across Noida" />
      </div>

      {/* ── BENEFITS ─────────────────────────────────── */}
      <section className="section benefits-section">
        <p className="eyebrow-sm">Why LASIK</p>
        <h2 className="section-title">A permanent fix for a screen-heavy life</h2>
        <p className="section-lead">
          LASIK reshapes the cornea so light focuses correctly on the retina — permanently.
          Here's what that means once you're back at your desk.
        </p>
        <div className="benefits-grid">
          <BenefitCard icon={<IconMonitor />} title="Less end-of-day strain" desc="Without a prescription to fight, many patients notice less fatigue during long screen hours." />
          <BenefitCard icon={<IconZap />} title="Quick and painless" accent desc="The procedure itself takes about 15 minutes, with numbing drops and no needles." />
          <BenefitCard icon={<IconLoop />} title="Built to last" desc="LASIK corrects your vision permanently — most patients never reach for glasses again." />
          <BenefitCard icon={<IconClock />} title="Back to your desk fast" accent desc="Most patients return to screen-based work within a day or two of surgery." />
          <BenefitCard icon={<IconGlassesOff />} title="One less thing to carry" desc="No more fogged-up glasses on the metro, no contacts to manage before meetings." />
          <BenefitCard icon={<IconShield />} title="Aftercare that checks in" accent desc="Scheduled follow-ups and support through your full recovery, not just the surgery day." />
        </div>
      </section>

      {/* ── TESTIMONIALS ─────────────────────────────── */}
      <section className="section testimonials-section">
        <p className="eyebrow-sm">Patient Stories</p>
        <h2 className="section-title">From Noida's IT corridor to clear vision</h2>
        <div className="chat-grid">
          <ChatTestimonial quote="Ten-hour shifts staring at three monitors used to wreck my eyes by 6pm. That part of the day just doesn't exist for me anymore." name="Rohit T." role="Software Engineer, Sector 62" />
          <ChatTestimonial quote="I commute on the Noida Expressway every day — not having to deal with glasses fogging up on the bike is genuinely life-changing." name="Sana A." role="Product Manager" />
          <ChatTestimonial quote="The screening team was upfront that I'd need a few months of stable prescription first. Appreciated the honesty over an upsell." name="Karan B." role="Business Analyst" />
        </div>
        <p className="testimonial-note">Shared with patients' permission. Individual results vary by eye condition and candidacy.</p>
      </section>

      {/* ── PROCESS ──────────────────────────────────── */}
      <section className="section process-section">
        <p className="eyebrow-sm">What To Expect</p>
        <h2 className="section-title">From first call to clear vision</h2>
        <p className="section-lead">Four steps, start to finish — each one designed to remove a reason to hesitate.</p>
        <div className="timeline">
          <TimelineStep index="01" title="Free consultation call" desc="We call you back to understand your eyes, your screen habits, and answer every question." />
          <TimelineStep index="02" title="Detailed eye screening" desc="A thorough pre-LASIK workup confirms whether you're a good candidate for the procedure." />
          <TimelineStep index="03" title="The LASIK procedure" desc="A precise, blade-free, 15-minute laser procedure performed by a senior surgeon." />
          <TimelineStep index="04" title="Recovery & follow-up" desc="Scheduled check-ins make sure your eyes heal exactly as they should." />
        </div>
      </section>

      {/* ── WHY CHOOSE US ────────────────────────────── */}
      <section className="section why-section">
        <p className="eyebrow-sm">Why This Clinic</p>
        <h2 className="section-title">What actually matters once you're in the chair</h2>
        <p className="section-lead">Plenty of clinics offer LASIK in Noida. Here's what we think sets the experience apart.</p>
        <div className="why-grid">
          <WhyCard icon={<IconCpu />} title="Latest blade-free technology" desc="3D corneal mapping and all-laser cuts for precision older methods can't reach." />
          <WhyCard icon={<IconShield />} title="Senior surgeons, not residents" desc="Every procedure is performed by a fellowship-trained ophthalmologist." />
          <WhyCard icon={<IconZap />} title="Transparent, fair pricing" desc="One clear quote after your screening — no hidden add-ons later." />
          <WhyCard icon={<IconLoop />} title="Aftercare that's proactive" desc="We call to check on you through every stage of recovery, not the other way around." />
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
          <h2>Noida runs on screens. Your eyes shouldn't have to keep up alone.</h2>
          <p>Book a free screening with our specialists. No obligation — just clarity on whether LASIK is right for you.</p>
          <LeadStrip />
        </div>
      </section>
    </>
  );
}