"use client";

import { useState, useEffect, useRef } from "react";

/* ============================================================
   ICONS
   ============================================================ */
const ip = {
  viewBox: "0 0 24 24", fill: "none", stroke: "currentColor",
  strokeWidth: 1.7, strokeLinecap: "round" as const, strokeLinejoin: "round" as const,
};

const IconEye = () => (
  <svg {...ip}><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8Z" /><circle cx="12" cy="12" r="3" /></svg>
);
const IconSun = () => (
  <svg {...ip}><circle cx="12" cy="12" r="4.5" /><path d="M12 2v2M12 20v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M2 12h2M20 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" /></svg>
);
const IconHeart = () => (
  <svg {...ip}><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78Z" /></svg>
);
const IconCheck = () => (
  <svg {...ip}><polyline points="20 6 9 17 4 12" /></svg>
);
const IconClock = () => (
  <svg {...ip}><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3.5 2" /></svg>
);
const IconShield = () => (
  <svg {...ip}><path d="M12 3 5 6.5v5c0 4.5 3.1 8.4 7 9.5 3.9-1.1 7-5 7-9.5v-5L12 3Z" /><polyline points="9 12 11 14 15 10" /></svg>
);
const IconStar = () => (
  <svg {...ip} fill="currentColor"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>
);
const IconPhone = () => (
  <svg {...ip}><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.37 2 2 0 0 1 3.6 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.56a16 16 0 0 0 6 6l.92-.92a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92Z" /></svg>
);
const IconPin = () => (
  <svg {...ip}><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0Z" /><circle cx="12" cy="10" r="3" /></svg>
);
const IconArrow = () => (
  <svg {...ip}><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>
);
const IconCare = () => (
  <svg {...ip}><path d="M3 9a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9Z" /><path d="M3 9l9 6 9-6" /></svg>
);

/* ============================================================
   LEAD FORM LOGIC
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
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name.trim(), phone, service: "Cataract", source }),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok || data.duplicate) {
        setStatus("success");
        setMessage(data.message || "Thank you — our care team will call you within the hour.");
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

/* ── Hero Lead Card ── */
function LeadCard({ anchor }: { anchor: string }) {
  const f = useLeadForm();
  return (
    <div className="lead-card" id={anchor}>
      <div className="lc-eyebrow">
        <span className="lc-dot" />
        Free Consultation Available Today
      </div>
      <h3 className="lc-title">Check if your vision can be restored</h3>
      <p className="lc-sub">Our specialists will call you back — no waiting rooms, no obligations.</p>

      {f.status === "success" ? (
        <div className="form-success">
          <div className="success-icon"><IconCheck /></div>
          <p>{f.message}</p>
        </div>
      ) : (
        <form onSubmit={(e) => f.handleSubmit(e, `cataract-noida-${anchor}`)} noValidate>
          <div className="field-row">
            <label htmlFor={`${anchor}-name`}>Your name</label>
            <input id={`${anchor}-name`} type="text" placeholder="e.g. Ramesh Gupta" value={f.name} onChange={f.handleNameChange} className={f.nameError ? "inp-err" : ""} />
            {f.nameError && <span className="err-msg">{f.nameError}</span>}
          </div>
          <div className="field-row">
            <label htmlFor={`${anchor}-phone`}>Mobile number</label>
            <input id={`${anchor}-phone`} type="tel" placeholder="98765 43210" value={f.phone} onChange={f.handlePhoneChange} maxLength={14} className={f.phoneError ? "inp-err" : ""} />
            {f.phoneError && <span className="err-msg">{f.phoneError}</span>}
          </div>
          {f.status === "error" && <p className="api-err">{f.message}</p>}
          <button type="submit" className="btn-cta" disabled={f.status === "loading"}>
            {f.status === "loading"
              ? <span className="btn-loading"><span className="spinner" />Booking your call…</span>
              : <><span>Book free consultation</span><IconArrow /></>}
          </button>
          <p className="privacy-note">🔒 We never share or sell your number.</p>
        </form>
      )}
    </div>
  );
}

/* ── Closing strip form ── */
function LeadStrip() {
  const f = useLeadForm();
  if (f.status === "success") {
    return (
      <div className="strip-success">
        <span className="success-icon small"><IconCheck /></span>
        <p>{f.message}</p>
      </div>
    );
  }
  return (
    <form className="lead-strip" onSubmit={(e) => f.handleSubmit(e, "cataract-noida-closing")} noValidate>
      <div className="sf">
        <input type="text" placeholder="Your name" value={f.name} onChange={f.handleNameChange} className={f.nameError ? "inp-err" : ""} aria-label="Name" />
        {f.nameError && <span className="err-msg light">{f.nameError}</span>}
      </div>
      <div className="sf">
        <input type="tel" placeholder="Mobile number" value={f.phone} onChange={f.handlePhoneChange} maxLength={14} className={f.phoneError ? "inp-err" : ""} aria-label="Mobile" />
        {f.phoneError && <span className="err-msg light">{f.phoneError}</span>}
      </div>
      <button type="submit" className="btn-strip" disabled={f.status === "loading"}>
        {f.status === "loading" ? "Booking…" : "Get a callback"}
      </button>
      {f.status === "error" && <p className="err-msg light">{f.message}</p>}
    </form>
  );
}

/* ── Sub-components ── */
function Stat({ value, label, sub }: { value: string; label: string; sub?: string }) {
  return (
    <div className="stat-block">
      <span className="stat-val">{value}</span>
      <span className="stat-lbl">{label}</span>
      {sub && <span className="stat-sub">{sub}</span>}
    </div>
  );
}

function SymptomTag({ text }: { text: string }) {
  return <span className="symptom-tag"><span className="symptom-dot" />{text}</span>;
}

function InfoCard({ icon, title, body }: { icon: React.ReactNode; title: string; body: string }) {
  return (
    <div className="info-card">
      <div className="info-icon">{icon}</div>
      <h3>{title}</h3>
      <p>{body}</p>
    </div>
  );
}

function TestimonialCard({ stars, quote, name, desc }: { stars: number; quote: string; name: string; desc: string }) {
  return (
    <div className="testimonial-card">
      <div className="stars">{Array(stars).fill(0).map((_, i) => <span key={i} className="star"><IconStar /></span>)}</div>
      <p className="tq">"{quote}"</p>
      <div className="tm">
        <span className="tm-name">{name}</span>
        <span className="tm-desc">{desc}</span>
      </div>
    </div>
  );
}

function ProcessStep({ num, title, body }: { num: string; title: string; body: string }) {
  return (
    <div className="proc-step">
      <div className="proc-num">{num}</div>
      <div className="proc-body">
        <h4>{title}</h4>
        <p>{body}</p>
      </div>
    </div>
  );
}

function FaqItem({ q, a, open, toggle }: { q: string; a: string; open: boolean; toggle: () => void }) {
  return (
    <div className={`faq-row ${open ? "faq-open" : ""}`}>
      <button className="faq-q" onClick={toggle} aria-expanded={open}>
        {q}
        <span className="faq-icon">{open ? "−" : "+"}</span>
      </button>
      {open && <p className="faq-a">{a}</p>}
    </div>
  );
}

function WarningSign({ text }: { text: string }) {
  return (
    <div className="warning-sign">
      <span className="ws-dot" />
      <span>{text}</span>
    </div>
  );
}

const FAQS = [
  { q: "Is cataract surgery safe at an older age?", a: "Yes — cataract surgery is one of the most common and safest surgical procedures worldwide, routinely performed for patients in their 60s, 70s, and even 80s. Your surgeon will review your overall health beforehand to ensure you're a good candidate." },
  { q: "Will I need glasses after the surgery?", a: "Many patients significantly reduce their dependence on glasses. With premium intraocular lenses, some patients can see clearly at both distance and near without spectacles — your surgeon will discuss the best lens option for your lifestyle." },
  { q: "How long does the procedure take?", a: "The phacoemulsification procedure itself takes roughly 15–20 minutes per eye. You'll spend a couple of hours at the centre for preparation and recovery monitoring before going home the same day." },
  { q: "When can I resume daily activities?", a: "Most patients can read, watch television, and manage light activities within a day or two. Driving and strenuous activity timelines depend on your healing, confirmed at your first follow-up visit." },
  { q: "Is cataract surgery done on both eyes at the same time?", a: "Typically, eyes are operated on separately — usually a week or two apart — so the first eye can heal and vision can be assessed before the second procedure." },
  { q: "What does cataract surgery cost in Noida?", a: "Cost depends on the type of intraocular lens chosen (monofocal vs. premium multifocal). After your free screening, you'll receive a complete, itemised quote with no hidden charges." },
];

/* ============================================================
   PAGE
   ============================================================ */
export default function CataractNoidaPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [visionRevealed, setVisionRevealed] = useState(false);
  const visionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisionRevealed(true); }, { threshold: 0.4 });
    if (visionRef.current) obs.observe(visionRef.current);
    return () => obs.disconnect();
  }, []);

  function scrollToForm() {
    document.getElementById("hero-card")?.scrollIntoView({ behavior: "smooth", block: "center" });
    document.getElementById("hero-card-name")?.focus();
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700;900&family=Source+Sans+3:wght@400;500;600;700&family=JetBrains+Mono:wght@500;600&display=swap');

        :root {
          --teal:       #0D4F5C;
          --teal-deep:  #093844;
          --teal-mid:   #156070;
          --amber:      #F0A500;
          --amber-pale: #FFF3CC;
          --coral:      #E05C2A;
          --coral-dark: #B8441A;
          --cream:      #FBF7F0;
          --white:      #FFFFFF;
          --ink:        #1A2332;
          --slate:      #4A5568;
          --muted:      #718096;
          --line:       #E8DDD0;
          --green:      #2D7D4C;
          --green-pale: #E8F5EE;

          --font-d: 'Playfair Display', Georgia, serif;
          --font-b: 'Source Sans 3', system-ui, sans-serif;
          --font-m: 'JetBrains Mono', monospace;

          --r-sm: 4px;
          --r-md: 8px;
          --r-lg: 14px;
          --r-xl: 20px;
        }

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        body { font-family: var(--font-b); color: var(--ink); background: var(--white); font-size: 17px; line-height: 1.6; }
        h1, h2, h3, h4 { font-family: var(--font-d); line-height: 1.2; }
        button { font-family: var(--font-b); }
        :focus-visible { outline: 2.5px solid var(--amber); outline-offset: 3px; }

        /* ── TOP BAR ── */
        .topbar {
          background: var(--teal-deep);
          padding: 10px 5vw;
          display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 8px;
        }
        .tb-brand { color: var(--white); font-family: var(--font-d); font-size: 20px; font-weight: 700; letter-spacing: -0.3px; }
        .tb-brand span { color: var(--amber); }
        .tb-right { display: flex; align-items: center; gap: 18px; }
        .tb-loc { display: flex; align-items: center; gap: 6px; color: rgba(255,255,255,0.72); font-size: 13px; }
        .tb-loc svg { width: 14px; height: 14px; }
        .tb-phone { display: flex; align-items: center; gap: 7px; color: var(--amber); font-size: 13.5px; font-weight: 600; text-decoration: none; }
        .tb-phone svg { width: 14px; height: 14px; }
        .tb-cta { background: var(--amber); color: var(--teal-deep); font-size: 13px; font-weight: 700; padding: 7px 16px; border: none; border-radius: 100px; cursor: pointer; transition: background .2s; }
        .tb-cta:hover { background: #D4920A; }

        /* ── HERO ── */
        .hero {
          background: linear-gradient(135deg, var(--teal-deep) 0%, var(--teal-mid) 55%, #1A7A8F 100%);
          padding: 80px 5vw 72px;
          display: grid; grid-template-columns: 1fr 420px; gap: 60px; align-items: center;
          position: relative; overflow: hidden;
        }
        .hero::after {
          content: '';
          position: absolute; inset: 0; pointer-events: none;
          background: radial-gradient(ellipse 60% 60% at 80% 50%, rgba(240,165,0,0.08) 0%, transparent 70%);
        }
        .hero-eyebrow {
          display: inline-flex; align-items: center; gap: 8px;
          background: rgba(240,165,0,0.15); border: 1px solid rgba(240,165,0,0.4);
          color: var(--amber); font-family: var(--font-m); font-size: 11.5px; letter-spacing: 1.5px;
          text-transform: uppercase; padding: 7px 16px; border-radius: 100px; margin-bottom: 24px;
        }
        .hero-eyebrow span { width: 7px; height: 7px; border-radius: 50%; background: var(--amber); display: inline-block; }
        .hero-h1 {
          font-size: clamp(38px, 5.5vw, 68px); font-weight: 900; color: var(--white);
          letter-spacing: -1.5px; margin-bottom: 10px; line-height: 1.05;
        }
        .hero-h1 em { color: var(--amber); font-style: normal; }
        .hero-tagline { font-size: clamp(17px, 2.2vw, 22px); color: rgba(255,255,255,0.78); margin-bottom: 22px; font-weight: 400; }
        .hero-copy { font-size: 16px; color: rgba(255,255,255,0.68); line-height: 1.8; max-width: 500px; margin-bottom: 32px; }
        .hero-actions { display: flex; gap: 14px; flex-wrap: wrap; margin-bottom: 36px; }
        .btn-hero-primary {
          background: var(--coral); color: var(--white); border: none; cursor: pointer;
          font-weight: 700; font-size: 16px; padding: 16px 32px; border-radius: var(--r-md);
          transition: background .2s, transform .15s; display: flex; align-items: center; gap: 8px;
        }
        .btn-hero-primary:hover { background: var(--coral-dark); transform: translateY(-2px); }
        .btn-hero-primary svg { width: 18px; height: 18px; }
        .btn-hero-ghost {
          background: transparent; color: var(--white); border: 1.5px solid rgba(255,255,255,0.3);
          cursor: pointer; font-weight: 600; font-size: 15px; padding: 15px 28px; border-radius: var(--r-md);
          transition: border-color .2s, background .2s;
        }
        .btn-hero-ghost:hover { border-color: rgba(255,255,255,0.7); background: rgba(255,255,255,0.06); }
        .hero-trust { display: flex; gap: 18px; flex-wrap: wrap; }
        .htag {
          display: flex; align-items: center; gap: 7px;
          background: rgba(255,255,255,0.08); border: 1px solid rgba(255,255,255,0.15);
          color: rgba(255,255,255,0.85); font-size: 13px; padding: 8px 14px; border-radius: var(--r-sm);
        }
        .htag svg { width: 15px; height: 15px; color: var(--amber); }

        /* ── LEAD CARD ── */
        .lead-card {
          background: var(--white); border-radius: var(--r-xl);
          box-shadow: 0 30px 80px rgba(9,56,68,0.4);
          padding: 36px 30px; position: relative; z-index: 2;
          border-top: 5px solid var(--amber);
        }
        .lc-eyebrow {
          display: flex; align-items: center; gap: 8px;
          font-size: 11.5px; font-weight: 700; text-transform: uppercase;
          letter-spacing: 1.2px; color: var(--green); margin-bottom: 14px; font-family: var(--font-m);
        }
        .lc-dot { width: 8px; height: 8px; border-radius: 50%; background: var(--green); animation: pulse 2s ease-in-out infinite; }
        @keyframes pulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.5;transform:scale(1.3)} }
        .lc-title { font-size: 21px; font-weight: 700; color: var(--teal-deep); margin-bottom: 6px; }
        .lc-sub { font-size: 13.5px; color: var(--slate); margin-bottom: 26px; line-height: 1.6; }
        .field-row { margin-bottom: 16px; }
        .field-row label { display: block; font-size: 13px; font-weight: 600; color: var(--ink); margin-bottom: 6px; }
        .field-row input {
          width: 100%; padding: 13px 16px; border: 1.5px solid var(--line); border-radius: var(--r-md);
          font-size: 16px; color: var(--ink); outline: none; background: #FDFCFB;
          transition: border-color .2s, box-shadow .2s; font-family: var(--font-b);
        }
        .field-row input:focus { border-color: var(--teal); box-shadow: 0 0 0 3px rgba(13,79,92,0.1); background: var(--white); }
        .field-row input.inp-err { border-color: var(--coral); }
        .err-msg { display: block; margin-top: 5px; font-size: 12.5px; color: var(--coral); }
        .err-msg.light { color: rgba(255,240,220,0.9); }
        .api-err { background: #FDF0ED; border: 1px solid #F3C3B5; color: var(--coral-dark); font-size: 13px; padding: 10px 14px; border-radius: var(--r-md); margin-bottom: 12px; }
        .btn-cta {
          width: 100%; background: var(--teal); color: var(--white); border: none; cursor: pointer;
          font-weight: 700; font-size: 16px; padding: 16px 20px; border-radius: var(--r-md);
          margin-top: 6px; display: flex; align-items: center; justify-content: center; gap: 10px;
          transition: background .2s, transform .15s;
        }
        .btn-cta svg { width: 18px; height: 18px; }
        .btn-cta:hover:not(:disabled) { background: var(--teal-deep); transform: translateY(-2px); }
        .btn-cta:disabled { opacity: .7; cursor: not-allowed; }
        .btn-loading { display: flex; align-items: center; justify-content: center; gap: 10px; }
        .spinner { width: 16px; height: 16px; border: 2px solid rgba(255,255,255,0.3); border-top-color: #fff; border-radius: 50%; animation: spin .7s linear infinite; }
        @keyframes spin { to { transform: rotate(360deg); } }
        .privacy-note { font-size: 12px; color: var(--muted); text-align: center; margin-top: 13px; }
        .form-success { text-align: center; padding: 20px 0; }
        .success-icon {
          width: 48px; height: 48px; border-radius: 50%; background: var(--green); color: #fff;
          display: flex; align-items: center; justify-content: center; margin: 0 auto 16px;
          animation: pop .4s ease;
        }
        .success-icon.small { width: 36px; height: 36px; }
        .success-icon svg { width: 22px; height: 22px; }
        @keyframes pop { from { transform: scale(0); } to { transform: scale(1); } }
        .form-success p { font-size: 15.5px; color: var(--teal); line-height: 1.6; font-weight: 500; }

        /* ── TRUST BAND ── */
        .trust-band {
          background: var(--amber-pale); border-top: 1px solid #EDD98A; border-bottom: 1px solid #EDD98A;
          padding: 14px 5vw; display: flex; justify-content: center; gap: 36px; flex-wrap: wrap;
        }
        .tb-item { font-size: 13.5px; font-weight: 600; color: var(--teal-deep); display: flex; align-items: center; gap: 7px; }
        .tb-item svg { width: 15px; height: 15px; color: var(--amber); }

        /* ── STATS ── */
        .stats-row {
          background: var(--teal-deep);
          padding: 56px 5vw; display: flex; justify-content: space-around; flex-wrap: wrap; gap: 32px;
        }
        .stat-block { text-align: center; }
        .stat-val { display: block; font-family: var(--font-m); font-size: 38px; font-weight: 600; color: var(--amber); }
        .stat-lbl { display: block; font-size: 14px; color: rgba(255,255,255,0.85); margin-top: 6px; font-weight: 600; }
        .stat-sub { display: block; font-size: 12px; color: rgba(255,255,255,0.5); margin-top: 4px; text-transform: uppercase; letter-spacing: .5px; }

        /* ── SECTION SHARED ── */
        .section { padding: 90px 5vw; }
        .section-eyebrow { font-family: var(--font-m); font-size: 12px; font-weight: 600; letter-spacing: 2px; text-transform: uppercase; color: var(--teal); margin-bottom: 12px; display: block; }
        .section-h2 { font-size: clamp(28px, 3.5vw, 44px); font-weight: 700; letter-spacing: -0.8px; margin-bottom: 16px; color: var(--teal-deep); }
        .section-lead { font-size: 17px; line-height: 1.8; color: var(--slate); max-width: 620px; margin-bottom: 52px; }

        /* ── VISION DEMO ── */
        .vision-section { background: var(--cream); }
        .vision-demo { position: relative; overflow: hidden; }
        .vision-compare {
          display: grid; grid-template-columns: 1fr 1fr; gap: 0; border-radius: var(--r-xl);
          overflow: hidden; border: 1px solid var(--line); margin-bottom: 20px;
          box-shadow: 0 20px 60px rgba(13,79,92,0.15);
        }
        .vc-pane { padding: 56px 44px; position: relative; }
        .vc-before {
          background: #ddd; /* foggy */
          filter: blur(0);
          position: relative; overflow: hidden;
        }
        .vc-before::before {
          content: '';
          position: absolute; inset: 0;
          background: repeating-linear-gradient(
            45deg,
            rgba(255,255,255,0.07) 0px,
            rgba(255,255,255,0.07) 2px,
            transparent 2px,
            transparent 10px
          );
        }
        .vc-before .inner { filter: blur(3.5px) brightness(0.85); }
        .vc-after { background: var(--teal-deep); }
        .vc-label {
          font-family: var(--font-m); font-size: 11px; letter-spacing: 2px; text-transform: uppercase;
          font-weight: 600; margin-bottom: 18px; display: flex; align-items: center; gap: 8px;
        }
        .vc-before .vc-label { color: #888; }
        .vc-after .vc-label { color: var(--amber); }
        .vc-label-dot { width: 8px; height: 8px; border-radius: 50%; }
        .vc-before .vc-label-dot { background: #aaa; }
        .vc-after .vc-label-dot { background: var(--amber); }
        .vc-icon { color: #aaa; margin-bottom: 16px; }
        .vc-after .vc-icon { color: var(--amber); }
        .vc-icon svg { width: 42px; height: 42px; }
        .vc-heading { font-size: 22px; font-weight: 700; margin-bottom: 10px; }
        .vc-before .vc-heading { color: #777; }
        .vc-after .vc-heading { color: var(--white); }
        .vc-list { list-style: none; display: flex; flex-direction: column; gap: 9px; }
        .vc-list li { display: flex; align-items: flex-start; gap: 10px; font-size: 15px; line-height: 1.5; }
        .vc-before .vc-list li { color: #888; }
        .vc-after .vc-list li { color: rgba(255,255,255,0.82); }
        .vc-check { flex-shrink: 0; margin-top: 2px; }
        .vc-check svg { width: 16px; height: 16px; }
        .vc-before .vc-check svg { color: #bbb; }
        .vc-after .vc-check svg { color: var(--amber); }
        .vc-divider {
          position: absolute; left: 50%; top: 0; bottom: 0; width: 3px;
          background: var(--amber); z-index: 2; transform: none;
        }
        .vc-badge {
          position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%) rotate(0deg);
          background: var(--amber); color: var(--teal-deep); font-family: var(--font-m);
          font-size: 10px; font-weight: 700; letter-spacing: 1px; text-transform: uppercase;
          padding: 8px 14px; border-radius: 100px; white-space: nowrap; z-index: 3;
          box-shadow: 0 4px 18px rgba(240,165,0,0.4);
        }
        .vision-caption { font-size: 13.5px; color: var(--muted); text-align: center; }

        /* ── SYMPTOMS ── */
        .symptoms-section { background: var(--white); }
        .symptoms-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 16px; margin-bottom: 36px; }
        .symptom-tag {
          display: flex; align-items: center; gap: 12px;
          background: var(--cream); border: 1px solid var(--line);
          border-left: 3px solid var(--amber); border-radius: var(--r-md);
          padding: 16px 20px; font-size: 15.5px; font-weight: 500; color: var(--ink);
        }
        .symptom-dot { width: 10px; height: 10px; border-radius: 50%; background: var(--amber); flex-shrink: 0; }
        .symptom-note {
          background: var(--green-pale); border: 1px solid #A3D4B8; border-radius: var(--r-md);
          padding: 18px 22px; font-size: 15px; color: var(--green); max-width: 660px; line-height: 1.7;
        }

        /* ── INFO CARDS ── */
        .info-section { background: var(--cream); }
        .info-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 22px; }
        .info-card {
          background: var(--white); border: 1px solid var(--line); border-radius: var(--r-lg);
          padding: 30px 26px; transition: transform .2s, box-shadow .2s;
          border-top: 3px solid var(--teal);
        }
        .info-card:hover { transform: translateY(-4px); box-shadow: 0 16px 48px rgba(13,79,92,0.1); }
        .info-icon {
          width: 48px; height: 48px; border-radius: 10px; background: rgba(13,79,92,0.08);
          color: var(--teal); display: flex; align-items: center; justify-content: center; margin-bottom: 18px;
        }
        .info-icon svg { width: 24px; height: 24px; }
        .info-card h3 { font-size: 18px; font-weight: 700; margin-bottom: 10px; color: var(--teal-deep); }
        .info-card p { font-size: 14.5px; line-height: 1.75; color: var(--slate); }

        /* ── WARNING SIGNS ── */
        .warning-section { background: #FFF8F5; border-top: 3px solid var(--coral); }
        .warning-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 14px; }
        .warning-sign {
          display: flex; align-items: center; gap: 14px;
          background: var(--white); border: 1px solid #F3C3B5; border-radius: var(--r-md);
          padding: 18px 20px; font-size: 15.5px; font-weight: 500; color: var(--ink);
        }
        .ws-dot { width: 10px; height: 10px; border-radius: 50%; background: var(--coral); flex-shrink: 0; }

        /* ── TESTIMONIALS ── */
        .testi-section { background: var(--teal-deep); }
        .testi-section .section-h2 { color: var(--white); }
        .testi-section .section-eyebrow { color: var(--amber); }
        .testi-section .section-lead { color: rgba(255,255,255,0.65); }
        .testi-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 22px; }
        .testimonial-card {
          background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.12);
          border-radius: var(--r-lg); padding: 28px 24px;
          transition: background .2s;
        }
        .testimonial-card:hover { background: rgba(255,255,255,0.1); }
        .stars { display: flex; gap: 4px; margin-bottom: 14px; }
        .star svg { width: 16px; height: 16px; color: var(--amber); }
        .tq { font-size: 15px; line-height: 1.75; color: rgba(255,255,255,0.85); margin-bottom: 20px; font-style: italic; }
        .tm { border-top: 1px solid rgba(255,255,255,0.12); padding-top: 14px; }
        .tm-name { display: block; font-weight: 700; font-size: 14px; color: var(--amber); margin-bottom: 2px; }
        .tm-desc { display: block; font-size: 12.5px; color: rgba(255,255,255,0.5); }
        .testi-note { font-size: 12.5px; color: rgba(255,255,255,0.4); margin-top: 28px; }

        /* ── PROCESS ── */
        .process-section { background: var(--white); }
        .process-steps { display: flex; flex-direction: column; gap: 0; max-width: 720px; }
        .proc-step {
          display: flex; gap: 24px; align-items: flex-start;
          padding: 30px 0; border-bottom: 1px solid var(--line);
          transition: background .2s;
        }
        .proc-step:last-child { border-bottom: none; }
        .proc-num {
          flex-shrink: 0; width: 52px; height: 52px; border-radius: 50%;
          background: var(--teal-deep); color: var(--amber);
          font-family: var(--font-m); font-size: 16px; font-weight: 600;
          display: flex; align-items: center; justify-content: center;
        }
        .proc-body h4 { font-size: 18px; font-weight: 700; color: var(--teal-deep); margin-bottom: 8px; }
        .proc-body p { font-size: 15px; line-height: 1.75; color: var(--slate); }

        /* ── IOL TABLE ── */
        .iol-section { background: var(--cream); }
        .iol-table-wrap { overflow-x: auto; }
        .iol-table {
          width: 100%; border-collapse: collapse; border-radius: var(--r-lg);
          overflow: hidden; font-size: 14.5px; box-shadow: 0 8px 32px rgba(13,79,92,0.1);
        }
        .iol-table thead tr { background: var(--teal-deep); }
        .iol-table thead th { color: var(--white); padding: 16px 20px; text-align: left; font-family: var(--font-b); font-size: 13px; letter-spacing: .4px; font-weight: 600; }
        .iol-table thead th:first-child { color: var(--amber); }
        .iol-table tbody tr { border-bottom: 1px solid var(--line); }
        .iol-table tbody tr:last-child { border-bottom: none; }
        .iol-table tbody tr:nth-child(even) { background: rgba(13,79,92,0.03); }
        .iol-table td { padding: 16px 20px; color: var(--ink); vertical-align: top; }
        .iol-table td:first-child { font-weight: 700; color: var(--teal-deep); }
        .iol-yes { color: var(--green); font-weight: 600; }
        .iol-partial { color: var(--amber); font-weight: 600; }
        .iol-best { background: var(--amber-pale) !important; }

        /* ── FAQ ── */
        .faq-section { background: var(--white); }
        .faq-list { max-width: 720px; }
        .faq-row { border-bottom: 1px solid var(--line); }
        .faq-q {
          width: 100%; background: none; border: none; cursor: pointer; text-align: left;
          display: flex; justify-content: space-between; align-items: flex-start; gap: 16px;
          padding: 22px 0; font-size: 16.5px; font-weight: 600; color: var(--teal-deep);
          font-family: var(--font-b);
        }
        .faq-icon { color: var(--amber); font-size: 22px; flex-shrink: 0; font-family: var(--font-m); line-height: 1; }
        .faq-a { font-size: 15px; line-height: 1.8; color: var(--slate); padding-bottom: 22px; }

        /* ── CLOSING ── */
        .closing-section {
          background: linear-gradient(135deg, var(--teal-deep) 0%, var(--teal-mid) 100%);
          padding: 90px 5vw; position: relative; overflow: hidden;
        }
        .closing-section::before {
          content: ''; position: absolute; inset: 0; pointer-events: none;
          background: radial-gradient(ellipse 70% 70% at 50% 50%, rgba(240,165,0,0.06) 0%, transparent 70%);
        }
        .closing-inner { max-width: 760px; margin: 0 auto; text-align: center; position: relative; z-index: 1; }
        .closing-inner h2 { font-size: clamp(28px, 4vw, 46px); font-weight: 700; color: var(--white); margin-bottom: 14px; letter-spacing: -0.5px; }
        .closing-inner > p { font-size: 17px; color: rgba(255,255,255,0.75); margin-bottom: 40px; line-height: 1.7; }
        .lead-strip {
          display: flex; gap: 14px; flex-wrap: wrap; justify-content: center;
          background: rgba(255,255,255,0.07); border: 1px solid rgba(255,255,255,0.18);
          border-radius: var(--r-lg); padding: 22px;
        }
        .sf { display: flex; flex-direction: column; flex: 1; min-width: 190px; }
        .sf input {
          padding: 15px 18px; border: 1.5px solid rgba(255,255,255,0.25);
          border-radius: var(--r-md); background: rgba(255,255,255,0.1); color: var(--white);
          font-size: 15px; outline: none; transition: border-color .2s; font-family: var(--font-b);
        }
        .sf input::placeholder { color: rgba(255,255,255,0.55); }
        .sf input:focus { border-color: var(--amber); }
        .sf input.inp-err { border-color: rgba(255,200,150,0.6); }
        .btn-strip {
          background: var(--amber); color: var(--teal-deep); border: none; cursor: pointer;
          font-weight: 700; font-size: 15px; padding: 15px 28px; border-radius: var(--r-md);
          white-space: nowrap; transition: background .2s, transform .15s;
        }
        .btn-strip:hover:not(:disabled) { background: #D4920A; transform: translateY(-2px); }
        .btn-strip:disabled { opacity: .7; cursor: not-allowed; }
        .strip-success {
          display: flex; align-items: center; gap: 16px; justify-content: center;
          background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.2);
          border-radius: var(--r-lg); padding: 24px; font-size: 15.5px; color: var(--white);
        }
        .closing-assurance { display: flex; gap: 22px; justify-content: center; flex-wrap: wrap; margin-top: 22px; }
        .c-item { font-size: 13px; color: rgba(255,255,255,0.6); display: flex; align-items: center; gap: 7px; }
        .c-item svg { width: 14px; height: 14px; color: var(--amber); }

        /* ── RESPONSIVE ── */
        @media (max-width: 980px) {
          .hero { grid-template-columns: 1fr; text-align: center; gap: 44px; }
          .hero-copy { margin: 0 auto 32px; }
          .hero-actions { justify-content: center; }
          .hero-trust { justify-content: center; }
          .lead-card { max-width: 480px; margin: 0 auto; }
        }
        @media (max-width: 640px) {
          .section { padding: 68px 5vw; }
          .vc-pane { padding: 36px 26px; }
          .lead-strip { flex-direction: column; }
          .sf { width: 100%; }
          .tb-right { gap: 10px; }
          .topbar { flex-direction: column; align-items: flex-start; }
          .vision-compare { grid-template-columns: 1fr; }
          .vc-divider { display: none; }
          .vc-badge { display: none; }
        }
      `}</style>

      {/* ── TOP BAR ── */}
      <nav className="topbar">
        <div className="tb-brand">Eye<span>Care</span> Noida</div>
        <div className="tb-right">
          <span className="tb-loc"><IconPin />Sector 18, Noida</span>
          <a href="tel:+911234567890" className="tb-phone"><IconPhone />+91-XXXXXXXXXX</a>
          <button className="tb-cta" onClick={() => document.getElementById("hero-card")?.scrollIntoView({ behavior: "smooth", block: "center" })}>Free Consultation</button>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section className="hero">
        <div className="hero-left">
          <div className="hero-eyebrow"><span />Advanced Cataract Surgery — Noida</div>
          <h1 className="hero-h1">
            See the world<br />
            <em>clearly again.</em>
          </h1>
          <p className="hero-tagline">Modern cataract surgery that gives back the vision clouded age has taken.</p>
          <p className="hero-copy">
            Phacoemulsification — the gold standard of cataract removal — performed by
            experienced ophthalmologists at our NABH-accredited centres in Noida. Most
            patients leave the same day and notice brighter, sharper vision within 24 hours.
          </p>
          <div className="hero-actions">
            <button className="btn-hero-primary" onClick={() => document.getElementById("hero-card")?.scrollIntoView({ behavior: "smooth", block: "center" })}>
              <IconPhone />Book free screening
            </button>
            <button className="btn-hero-ghost" onClick={() => document.getElementById("symptoms-sec")?.scrollIntoView({ behavior: "smooth", block: "start" })}>
              Am I a candidate?
            </button>
          </div>
          <div className="hero-trust">
            <span className="htag"><IconShield />NABH-accredited</span>
            <span className="htag"><IconClock />Day-care procedure</span>
            <span className="htag"><IconStar />4.9★ patient rating</span>
          </div>
        </div>
        <div>
          <LeadCard anchor="hero-card" />
        </div>
      </section>

      {/* ── TRUST BAND ── */}
      <div className="trust-band">
        <span className="tb-item"><IconCheck />Senior, fellowship-trained surgeons</span>
        <span className="tb-item"><IconCheck />Premium intraocular lenses available</span>
        <span className="tb-item"><IconCheck />Transparent, all-inclusive pricing</span>
        <span className="tb-item"><IconCheck />3 centres across Noida</span>
      </div>

      {/* ── STATS ── */}
      <div className="stats-row">
        <Stat value="22,000+" label="Cataract procedures performed" sub="since 2013" />
        <Stat value="99.2%" label="Patient satisfaction rate" sub="post-op survey" />
        <Stat value="12+" label="Years of surgical experience" sub="senior surgeons" />
        <Stat value="24 hrs" label="Average recovery to clear vision" sub="most patients" />
      </div>

      {/* ── VISION COMPARISON ── */}
      <section className="section vision-section" ref={visionRef}>
        <span className="section-eyebrow">What cataracts do to your vision</span>
        <h2 className="section-h2">One surgery. A world of difference.</h2>
        <p className="section-lead">
          Cataracts cause the eye's natural lens to cloud over time, scattering light and stealing colour, contrast,
          and sharpness. Cataract surgery replaces that clouded lens with a clear artificial one — restoring vision that feels like a new prescription for the world.
        </p>
        <div className="vision-demo">
          <div className="vision-compare">
            <div className="vc-pane vc-before">
              <div className="inner">
                <div className="vc-label"><span className="vc-label-dot" />Before surgery</div>
                <div className="vc-icon"><IconEye /></div>
                <div className="vc-heading">Clouded, dimmed vision</div>
                <ul className="vc-list">
                  <li><span className="vc-check"><IconCheck /></span>Everything looks hazy or frosted</li>
                  <li><span className="vc-check"><IconCheck /></span>Colours appear yellow or faded</li>
                  <li><span className="vc-check"><IconCheck /></span>Driving at night becomes dangerous</li>
                  <li><span className="vc-check"><IconCheck /></span>Reading and fine work grow difficult</li>
                  <li><span className="vc-check"><IconCheck /></span>Glare and halos around lights</li>
                </ul>
              </div>
            </div>
            <div className="vc-pane vc-after">
              <div className="vc-label"><span className="vc-label-dot" />After surgery</div>
              <div className="vc-icon"><IconSun /></div>
              <div className="vc-heading">Bright, sharp, natural vision</div>
              <ul className="vc-list">
                <li><span className="vc-check"><IconCheck /></span>Clear, crisp detail at distance and near</li>
                <li><span className="vc-check"><IconCheck /></span>True, vibrant colours restored</li>
                <li><span className="vc-check"><IconCheck /></span>Confident driving day and night</li>
                <li><span className="vc-check"><IconCheck /></span>Reading without strain</li>
                <li><span className="vc-check"><IconCheck /></span>Reduced or no dependence on glasses</li>
              </ul>
            </div>
            <div className="vc-divider" />
            <div className="vc-badge">Surgery changes this</div>
          </div>
          <p className="vision-caption">Illustrative comparison. Individual outcomes depend on eye health and lens choice.</p>
        </div>
      </section>

      {/* ── SYMPTOMS ── */}
      <section className="section symptoms-section" id="symptoms-sec">
        <span className="section-eyebrow">Signs you may have cataracts</span>
        <h2 className="section-h2">Does this sound familiar?</h2>
        <p className="section-lead">
          Cataracts develop slowly — many people adjust without realising how much vision they've lost.
          If you or a family member recognises any of these symptoms, a free screening will give you a clear answer.
        </p>
        <div className="symptoms-grid">
          <SymptomTag text="Blurred or hazy vision that glasses don't fully correct" />
          <SymptomTag text="Colours look yellowed, faded, or washed out" />
          <SymptomTag text="Glare and halos around lights, especially at night" />
          <SymptomTag text="Frequent changes in your spectacle prescription" />
          <SymptomTag text="Difficulty reading even with reading glasses" />
          <SymptomTag text="Sensitivity to bright light or sunlight" />
          <SymptomTag text="Double vision in one eye" />
          <SymptomTag text="Night driving feels unsafe or uncomfortable" />
        </div>
        <div className="symptom-note">
          <strong>A note from our surgeons:</strong> Cataracts are not dangerous to leave untreated in the very short term,
          but they will progress. The best time to seek assessment is before your daily activities — driving, reading,
          recognising faces — are meaningfully affected. A free consultation carries no obligation and takes under an hour.
        </div>
      </section>

      {/* ── INFO CARDS ── */}
      <section className="section info-section">
        <span className="section-eyebrow">About the procedure</span>
        <h2 className="section-h2">What cataract surgery actually involves</h2>
        <p className="section-lead">
          Modern cataract surgery has evolved dramatically. Today it is precise, brief, and designed around a comfortable patient experience.
        </p>
        <div className="info-grid">
          <InfoCard
            icon={<IconEye />}
            title="Phacoemulsification (Phaco)"
            body="A microscopic ultrasound probe breaks the clouded lens into tiny fragments and gently removes them. No large incisions — the entry point is under 3mm and self-sealing."
          />
          <InfoCard
            icon={<IconSun />}
            title="Intraocular lens (IOL) implant"
            body="A clear, permanent artificial lens is folded and placed through the same small opening. It unfolds inside the eye, restoring focus — often better than before cataracts developed."
          />
          <InfoCard
            icon={<IconClock />}
            title="Day-care procedure"
            body="The surgery itself takes 15–25 minutes. You arrive, rest briefly beforehand and for an hour after, then go home the same day. No overnight stay required."
          />
          <InfoCard
            icon={<IconShield />}
            title="Topical anaesthesia — no injections"
            body="Numbing eye drops make the procedure comfortable throughout. Most patients feel only mild pressure at most — no pain and no needle near the eye."
          />
          <InfoCard
            icon={<IconHeart />}
            title="Safe for most ages"
            body="Cataract surgery is one of the most commonly performed surgeries worldwide, routinely and safely performed for patients in their 60s, 70s, and 80s."
          />
          <InfoCard
            icon={<IconCare />}
            title="Structured aftercare"
            body="You receive a clear schedule of eye-drop medications and follow-up visits. Our team proactively calls to check your recovery at each stage."
          />
        </div>
      </section>

      {/* ── WARNING SIGNS (when to act urgently) ── */}
      <section className="section warning-section">
        <span className="section-eyebrow">When to act quickly</span>
        <h2 className="section-h2" style={{ color: "var(--coral-dark)" }}>Seek assessment sooner if you notice:</h2>
        <p className="section-lead">These signs suggest a cataract may be maturing quickly or another eye condition may be present alongside it.</p>
        <div className="warning-grid">
          <WarningSign text="Sudden worsening of vision in one or both eyes" />
          <WarningSign text="New pain inside the eye or significant redness" />
          <WarningSign text="Sudden onset of flashing lights or new floaters" />
          <WarningSign text="Rapid changes in prescription — month to month" />
          <WarningSign text="Near-sightedness that suddenly seems to improve (nuclear cataract sign)" />
          <WarningSign text="Difficulty recognising familiar faces at normal distance" />
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="section testi-section">
        <span className="section-eyebrow">Patient Stories</span>
        <h2 className="section-h2">Life after cataract surgery</h2>
        <p className="section-lead">Shared with patients' full permission. Every story is individual — outcomes vary with eye health and lens choice.</p>
        <div className="testi-grid">
          <TestimonialCard
            stars={5}
            quote="I hadn't realised how yellowed and dim everything had looked for years. After the surgery, stepping outside felt like someone had turned up the brightness on the whole world."
            name="Sunita Mehta"
            desc="Retired teacher, Sector 50, Noida"
          />
          <TestimonialCard
            stars={5}
            quote="My father was very anxious — he'd heard horror stories from an older generation. The team was patient with him at every step. He called me the next morning to say he could read the newspaper without glasses for the first time in years."
            name="Priya Agarwal"
            desc="Software manager; patient's daughter"
          />
          <TestimonialCard
            stars={5}
            quote="I was told I needed surgery but kept putting it off for two years. I wish I hadn't waited. The whole thing was over in twenty minutes and I was home for lunch."
            name="Vikram Sharma"
            desc="Retired civil servant, Greater Noida"
          />
          <TestimonialCard
            stars={5}
            quote="What I appreciated most was that they gave me a single clear price after the screening and didn't add extras later. No surprises."
            name="Anjali Srivastava"
            desc="Business owner, Noida Extension"
          />
        </div>
        <p className="testi-note">Individual results vary. Testimonials reflect personal experience and may not represent typical outcomes.</p>
      </section>

      {/* ── PROCESS ── */}
      <section className="section process-section">
        <span className="section-eyebrow">Your Journey</span>
        <h2 className="section-h2">From your first call to clear vision</h2>
        <p className="section-lead">Every step is designed to feel unhurried and fully explained — because your confidence matters as much as your outcome.</p>
        <div className="process-steps">
          <ProcessStep num="01" title="Book your free consultation" body="Call us, fill in the form, or walk in. A specialist calls you back within the hour to understand your symptoms, medical background, and any concerns before you visit." />
          <ProcessStep num="02" title="Comprehensive eye screening" body="A senior optometrist conducts a detailed pre-operative assessment including corneal mapping, retinal health check, and intraocular pressure measurement — all included at no cost." />
          <ProcessStep num="03" title="Surgeon review & clear quote" body="Your surgeon reviews the assessment results, confirms your suitability, explains the recommended lens type, and gives you a complete, transparent price — no add-ons later." />
          <ProcessStep num="04" title="Day of surgery" body="Arrive, relax, and receive numbing drops. The procedure itself takes 15–25 minutes per eye. You rest briefly at the centre and return home the same day with medication and clear instructions." />
          <ProcessStep num="05" title="Recovery & follow-up visits" body="Scheduled visits at day 1, week 1, and week 4 confirm your healing is on track. Our team calls proactively between appointments — you don't have to chase us." />
        </div>
      </section>

      {/* ── IOL LENS TABLE ── */}
      <section className="section iol-section">
        <span className="section-eyebrow">Lens options explained</span>
        <h2 className="section-h2">Choosing the right intraocular lens for you</h2>
        <p className="section-lead">
          The artificial lens implanted during cataract surgery is permanent. There is no single "right" choice — it depends on your lifestyle, how much you rely on near versus distance vision, and your budget. Our surgeons explain all options without pressure.
        </p>
        <div className="iol-table-wrap">
          <table className="iol-table">
            <thead>
              <tr>
                <th>Lens type</th>
                <th>Distance vision</th>
                <th>Near / reading vision</th>
                <th>Glasses dependence</th>
                <th>Best suited for</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Monofocal (standard)</td>
                <td className="iol-yes">Excellent</td>
                <td>Reading glasses needed</td>
                <td>Likely for near tasks</td>
                <td>Budget-conscious; happy with reading glasses</td>
              </tr>
              <tr className="iol-best">
                <td>Multifocal / MIOL</td>
                <td className="iol-yes">Excellent</td>
                <td className="iol-yes">Good to excellent</td>
                <td>Often glasses-free</td>
                <td>Active lifestyles; readers; those wanting independence</td>
              </tr>
              <tr>
                <td>Toric (astigmatism-correcting)</td>
                <td className="iol-yes">Excellent</td>
                <td>Reading glasses usually needed</td>
                <td className="iol-partial">Reduced (corrects astigmatism)</td>
                <td>Patients with pre-existing astigmatism</td>
              </tr>
              <tr>
                <td>Extended Depth of Focus (EDOF)</td>
                <td className="iol-yes">Excellent</td>
                <td className="iol-partial">Good for intermediate; some reading glasses</td>
                <td className="iol-partial">Minimal</td>
                <td>Computer users; drivers; intermediate vision priority</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="section faq-section">
        <span className="section-eyebrow">Common Questions</span>
        <h2 className="section-h2">What patients and families ask us most</h2>
        <div className="faq-list">
          {FAQS.map((item, i) => (
            <FaqItem
              key={item.q} q={item.q} a={item.a}
              open={openFaq === i}
              toggle={() => setOpenFaq(openFaq === i ? null : i)}
            />
          ))}
        </div>
      </section>

      {/* ── CLOSING CTA ── */}
      <section className="closing-section">
        <div className="closing-inner">
          <h2>Your vision is worth a conversation.</h2>
          <p>
            Book a free cataract screening at our Noida centre. A specialist will call you back within the hour
            — no waiting rooms, no obligations, and no pressure.
          </p>
          <LeadStrip />
          <div className="closing-assurance">
            <span className="c-item"><IconShield />NABH-accredited</span>
            <span className="c-item"><IconCheck />Free, no-obligation screening</span>
            <span className="c-item"><IconHeart />Senior ophthalmologists only</span>
            <span className="c-item"><IconClock />Callback within 1 hour</span>
          </div>
        </div>
      </section>
    </>
  );
}