"use client";

import { useState } from "react";
import { CITY_DATA, SHARED_FAQS, CityKey } from "@/lib/lasik-city-data";

// ─── ICONS ───────────────────────────────────────────────────
const ic = {
  viewBox: "0 0 24 24", fill: "none", stroke: "currentColor",
  strokeWidth: 1.8, strokeLinecap: "round" as const, strokeLinejoin: "round" as const,
};
const IconSun    = () => <svg {...ic}><circle cx="12" cy="12" r="4.3"/><path d="M12 3v2.4M12 18.6V21M4.5 12h2.4M17.1 12h2.4M6.3 6.3l1.7 1.7M16 16l1.7 1.7M17.7 6.3 16 8M8 16l-1.7 1.7"/></svg>;
const IconBolt   = () => <svg {...ic}><path d="M12 2 5 14h5l-1 8 8-12h-5l1-8Z"/></svg>;
const IconShield = () => <svg {...ic}><path d="M12 3 5 6v6c0 4.2 3 7.4 7 9 4-1.6 7-4.8 7-9V6l-7-3Z"/><path d="M9 12l2 2 4-4.2"/></svg>;
const IconLayers = () => <svg {...ic}><path d="M12 3 3 8l9 5 9-5-9-5Z"/><path d="M3 13l9 5 9-5M3 17.5l9 4.5 9-4.5"/></svg>;
const IconLoop   = () => <svg {...ic}><path d="M7 9.5a3.5 3.5 0 1 0 0 5 13 13 0 0 0 5-5 13 13 0 0 0 5-5 3.5 3.5 0 1 1 0 5 13 13 0 0 1-5 5 13 13 0 0 1-5-5Z"/></svg>;
const IconUsers  = () => <svg {...ic}><circle cx="9" cy="8.5" r="3"/><path d="M3.5 19c0-3 2.5-5 5.5-5s5.5 2 5.5 5"/><path d="M16 9a2.6 2.6 0 1 0 0-5"/><path d="M16.5 14c2.3.3 4 2 4 5"/></svg>;

// ─── FORM HOOK ────────────────────────────────────────────────
type Status = "idle" | "loading" | "success" | "error";

function useLeadForm(cityKey: CityKey, formId: string) {
  const [name, setName]         = useState("");
  const [phone, setPhone]       = useState("");
  const [nameErr, setNameErr]   = useState("");
  const [phoneErr, setPhoneErr] = useState("");
  const [status, setStatus]     = useState<Status>("idle");
  const [message, setMessage]   = useState("");

  function validatePhone(v: string) {
    const c = v.replace(/\D/g, "");
    if (!c)             return "Mobile number is required";
    if (c.length !== 10) return "Enter a valid 10-digit number";
    if (!/^[6-9]/.test(c)) return "Enter a valid Indian mobile number";
    if (/^(\d)\1{9}$/.test(c) || c === "1234567890") return "Please enter a real number";
    return "";
  }

  const onName  = (e: React.ChangeEvent<HTMLInputElement>) => { setName(e.target.value); if (nameErr) setNameErr(""); };
  const onPhone = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = e.target.value.replace(/[^\d\s\-+()]/g, "");
    setPhone(v);
    if (phoneErr) setPhoneErr(validatePhone(v));
  };

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    const nE = name.trim().length < 2 ? "Name must be at least 2 characters" : "";
    const pE = validatePhone(phone);
    setNameErr(nE); setPhoneErr(pE);
    if (nE || pE) return;

    setStatus("loading");
    try {
      const res  = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name.trim(), phone, service: "LASIK", city: cityKey, source: CITY_DATA[cityKey].formSource + "-" + formId }),
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
      setMessage("Unable to connect. Please call us directly.");
    }
  }

  return { name, phone, nameErr, phoneErr, status, message, onName, onPhone, submit };
}

// ─── HERO LEAD CARD ──────────────────────────────────────────
function LeadCard({ cityKey }: { cityKey: CityKey }) {
  const f = useLeadForm(cityKey, "hero");
  return (
    <div className="lc-card" id="lead-anchor">
      <span className="lc-tag">Free Eye Screening</span>
      <h3 className="lc-title">Check your LASIK eligibility</h3>
      <p className="lc-sub">Share your number — a specialist calls back within minutes.</p>

      {f.status === "success" ? (
        <div className="lc-success">
          <div className="lc-check">✓</div>
          <p>{f.message}</p>
        </div>
      ) : (
        <form onSubmit={f.submit} noValidate>
          {f.status === "error" && <p className="lc-api-err">{f.message}</p>}
          <div className="lc-field">
            <label htmlFor="lc-name">Name</label>
            <input id="lc-name" type="text" placeholder="Your name" value={f.name} onChange={f.onName} className={f.nameErr ? "input-err" : ""} />
            {f.nameErr && <span className="ferr">{f.nameErr}</span>}
          </div>
          <div className="lc-field">
            <label htmlFor="lc-phone">Mobile number</label>
            <input id="lc-phone" type="tel" placeholder="98765 43210" value={f.phone} onChange={f.onPhone} maxLength={14} className={f.phoneErr ? "input-err" : ""} />
            {f.phoneErr && <span className="ferr">{f.phoneErr}</span>}
          </div>
          <button type="submit" className="btn-primary" disabled={f.status === "loading"}>
            {f.status === "loading" ? <span className="spin-wrap"><span className="spinner" />Booking…</span> : "Book free screening"}
          </button>
          <p className="lc-note">No spam calls. Your number stays private.</p>
        </form>
      )}
    </div>
  );
}

// ─── CLOSING STRIP ───────────────────────────────────────────
function LeadStrip({ cityKey }: { cityKey: CityKey }) {
  const f = useLeadForm(cityKey, "closing");
  if (f.status === "success") {
    return (
      <div className="strip-success">
        <span className="lc-check">✓</span>
        <p>{f.message}</p>
      </div>
    );
  }
  return (
    <form className="strip" onSubmit={f.submit} noValidate>
      <div className="strip-f">
        <input type="text" placeholder="Your name" value={f.name} onChange={f.onName} className={f.nameErr ? "input-err" : ""} aria-label="Name" />
        {f.nameErr && <span className="ferr ferr-light">{f.nameErr}</span>}
      </div>
      <div className="strip-f">
        <input type="tel" placeholder="Mobile number" value={f.phone} onChange={f.onPhone} maxLength={14} className={f.phoneErr ? "input-err" : ""} aria-label="Mobile number" />
        {f.phoneErr && <span className="ferr ferr-light">{f.phoneErr}</span>}
      </div>
      <button type="submit" className="btn-strip" disabled={f.status === "loading"}>
        {f.status === "loading" ? "Booking…" : "Get a callback"}
      </button>
      {f.status === "error" && <p className="strip-api-err">{f.message}</p>}
    </form>
  );
}

// ─── FAQ ─────────────────────────────────────────────────────
function FaqList() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className="faq-list">
      {SHARED_FAQS.map((item, i) => (
        <div key={i} className="faq-item">
          <button className="faq-q" onClick={() => setOpen(open === i ? null : i)} aria-expanded={open === i}>
            {item.q}
            <span className="faq-icon">{open === i ? "−" : "+"}</span>
          </button>
          {open === i && <p className="faq-a">{item.a}</p>}
        </div>
      ))}
    </div>
  );
}

// ─── PAGE ─────────────────────────────────────────────────────
export default function LasikLandingPage({ cityKey }: { cityKey: CityKey }) {
  const city = CITY_DATA[cityKey];

  function scrollToForm() {
    document.getElementById("lead-anchor")?.scrollIntoView({ behavior: "smooth", block: "center" });
    setTimeout(() => document.getElementById("lc-name")?.focus(), 500);
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display&family=DM+Sans:wght@400;500;600;700&family=Space+Mono:wght@600&display=swap');

        :root {
          --ink: #111827;
          --white: #ffffff;
          --cream: #F8F9FA;
          --green: #1B6B3A;
          --green-light: #E8F5EE;
          --green-mid: #2E7D52;
          --saffron: #F59E0B;
          --saffron-light: #FEF3C7;
          --sky: #0EA5E9;
          --slate: #6B7280;
          --line: #E5E7EB;
          --danger: #DC2626;
          --r: 10px;
          --font-display: 'DM Serif Display', Georgia, serif;
          --font-body: 'DM Sans', system-ui, sans-serif;
          --font-mono: 'Space Mono', monospace;
        }

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        body { font-family: var(--font-body); color: var(--ink); background: var(--white); line-height: 1.6; }
        h1, h2, h3, h4 { font-family: var(--font-display); font-weight: 400; line-height: 1.2; }
        button, input { font-family: inherit; }
        :focus-visible { outline: 2px solid var(--saffron); outline-offset: 2px; }

        /* ── NAV ── */
        .nav {
          position: sticky; top: 0; z-index: 100;
          background: rgba(255,255,255,0.96); backdrop-filter: blur(8px);
          border-bottom: 1px solid var(--line);
          padding: 14px 6vw; display: flex; align-items: center; justify-content: space-between; gap: 16px;
        }
        .nav-logo { font-family: var(--font-display); font-size: 20px; color: var(--green); }
        .nav-logo span { color: var(--saffron); }
        .nav-city { font-family: var(--font-mono); font-size: 12px; color: var(--slate); letter-spacing: 1px; text-transform: uppercase; }
        .nav-cta {
          padding: 9px 20px; background: var(--green); color: #fff;
          border: none; border-radius: var(--r); font-size: 14px; font-weight: 600;
          cursor: pointer; transition: opacity .18s; white-space: nowrap;
        }
        .nav-cta:hover { opacity: .88; }

        /* ── HERO ── */
        .hero {
          background: linear-gradient(160deg, var(--green-light) 0%, #fff 60%);
          padding: 80px 6vw 64px;
          display: grid; grid-template-columns: 1fr 400px; gap: 56px; align-items: center;
        }
        .hero-eyebrow {
          display: inline-flex; align-items: center; gap: 8px;
          background: var(--green-light); border: 1px solid rgba(27,107,58,0.25);
          color: var(--green); font-family: var(--font-mono); font-size: 11px;
          letter-spacing: 1.4px; text-transform: uppercase;
          padding: 6px 14px; border-radius: 100px; margin-bottom: 22px;
        }
        .hero-dot {
          width: 7px; height: 7px; border-radius: 50%; background: var(--saffron);
          animation: pulse 1.8s ease-in-out infinite;
        }
        @keyframes pulse { 0%,100%{opacity:1;} 50%{opacity:.4;} }
        .hero h1 { font-size: clamp(32px,4.8vw,54px); color: var(--ink); margin-bottom: 16px; }
        .hero h1 em { font-style: normal; color: var(--green); }
        .hero-sub { font-size: 16px; color: var(--slate); max-width: 480px; margin-bottom: 28px; line-height: 1.8; }
        .hero-actions { display: flex; gap: 12px; flex-wrap: wrap; margin-bottom: 32px; }
        .btn-hero {
          padding: 14px 28px; background: var(--green); color: #fff; border: none;
          border-radius: var(--r); font-weight: 700; font-size: 15px; cursor: pointer;
          transition: transform .15s, background .2s;
        }
        .btn-hero:hover { transform: translateY(-2px); background: var(--green-mid); }
        .hero-badges { display: flex; gap: 10px; flex-wrap: wrap; }
        .badge {
          display: flex; align-items: center; gap: 6px; background: var(--white);
          border: 1px solid var(--line); font-size: 12.5px; font-weight: 500;
          padding: 7px 13px; border-radius: var(--r); color: var(--ink);
        }
        .badge-dot { width: 6px; height: 6px; border-radius: 50%; background: var(--green); }

        /* ── EYE SVG ── */
        .eye-svg { width: 100%; max-width: 360px; display: block; margin: 0 auto 24px; }

        /* ── LEAD CARD ── */
        .lc-card {
          background: var(--white); border-radius: 16px; padding: 32px 28px;
          box-shadow: 0 20px 60px rgba(0,0,0,0.12); border: 1px solid rgba(245,158,11,0.25);
        }
        .lc-tag {
          display: inline-block; background: var(--saffron); color: var(--ink);
          font-size: 11px; font-weight: 700; letter-spacing: .8px; text-transform: uppercase;
          padding: 4px 12px; border-radius: 100px; margin-bottom: 16px;
        }
        .lc-title { font-size: 19px; margin-bottom: 6px; }
        .lc-sub { font-size: 13.5px; color: var(--slate); margin-bottom: 22px; }
        .lc-field { margin-bottom: 14px; }
        .lc-field label { display: block; font-size: 12px; font-weight: 600; margin-bottom: 5px; }
        .lc-field input {
          width: 100%; padding: 11px 14px; border: 1.5px solid #D1D5DB;
          border-radius: var(--r); font-size: 14.5px; color: var(--ink);
          background: #FAFAFA; outline: none; transition: border-color .2s;
        }
        .lc-field input:focus { border-color: var(--green); background: var(--white); }
        .lc-field input.input-err { border-color: var(--danger); }
        .ferr { display: block; margin-top: 4px; font-size: 12px; color: var(--danger); }
        .ferr-light { color: #FCA5A5; }
        .lc-api-err {
          background: #FEF2F2; border: 1px solid #FCA5A5; color: var(--danger);
          font-size: 12.5px; padding: 9px 13px; border-radius: var(--r); margin-bottom: 10px;
        }
        .btn-primary {
          width: 100%; padding: 14px; background: var(--green); color: #fff; border: none;
          border-radius: var(--r); font-size: 15px; font-weight: 700; cursor: pointer;
          margin-top: 4px; transition: opacity .2s, transform .15s;
        }
        .btn-primary:hover:not(:disabled) { transform: translateY(-1px); opacity: .92; }
        .btn-primary:disabled { opacity: .65; cursor: not-allowed; }
        .lc-note { font-size: 11.5px; color: #9CA3AF; text-align: center; margin-top: 11px; }
        .lc-success { text-align: center; padding: 16px 0; }
        .lc-check {
          width: 48px; height: 48px; border-radius: 50%; background: var(--green); color: #fff;
          display: flex; align-items: center; justify-content: center;
          font-size: 22px; margin: 0 auto 14px; animation: pop .35s ease;
        }
        @keyframes pop { from{transform:scale(0);} to{transform:scale(1);} }
        .lc-success p { font-size: 15px; line-height: 1.65; }
        .spin-wrap { display: flex; align-items: center; justify-content: center; gap: 8px; }
        .spinner {
          width: 14px; height: 14px; border: 2px solid rgba(255,255,255,.35);
          border-top-color: #fff; border-radius: 50%; animation: spin .7s linear infinite; display: inline-block;
        }
        @keyframes spin { to { transform: rotate(360deg); } }

        /* ── TRUST ── */
        .trust {
          background: var(--white); border-bottom: 1px solid var(--line);
          padding: 14px 6vw; display: flex; justify-content: center; gap: 28px; flex-wrap: wrap;
        }
        .trust-item { font-size: 13px; font-weight: 600; color: var(--green-mid); }

        /* ── STATS ── */
        .stats {
          background: var(--green); padding: 48px 6vw;
          display: flex; justify-content: space-around; flex-wrap: wrap; gap: 24px;
        }
        .stat { text-align: center; }
        .stat-val { display: block; font-family: var(--font-mono); font-size: 28px; color: #fff; }
        .stat-lbl { display: block; font-size: 11.5px; color: rgba(255,255,255,.7); margin-top: 5px; text-transform: uppercase; letter-spacing: .5px; }

        /* ── SECTIONS ── */
        .section { padding: 80px 6vw; }
        .section.bg-cream { background: var(--cream); }
        .eyebrow { font-family: var(--font-mono); font-size: 11px; font-weight: 600; letter-spacing: 1.8px; text-transform: uppercase; color: var(--saffron); margin-bottom: 12px; }
        .section-title { font-size: clamp(26px,3.2vw,38px); margin-bottom: 14px; }
        .section-lead { font-size: 15.5px; color: var(--slate); max-width: 580px; margin-bottom: 44px; line-height: 1.78; }

        /* ── BENEFITS ── */
        .benefits-grid { display: grid; grid-template-columns: repeat(auto-fit,minmax(240px,1fr)); gap: 18px; }
        .benefit-card {
          background: var(--white); border: 1px solid var(--line); border-radius: 14px;
          padding: 26px 22px; transition: transform .2s, box-shadow .2s;
        }
        .benefit-card:hover { transform: translateY(-3px); box-shadow: 0 12px 28px rgba(0,0,0,.07); }
        .benefit-icon {
          width: 40px; height: 40px; border-radius: 10px; background: var(--green-light);
          color: var(--green); display: flex; align-items: center; justify-content: center; margin-bottom: 14px;
        }
        .benefit-icon svg { width: 20px; height: 20px; }
        .benefit-card h3 { font-size: 16px; font-weight: 600; margin-bottom: 7px; font-family: var(--font-body); }
        .benefit-card p { font-size: 13.5px; color: var(--slate); line-height: 1.7; }

        /* ── TECHNOLOGY ── */
        .tech-section { background: var(--ink); }
        .tech-section .eyebrow { color: var(--sky); }
        .tech-section .section-title { color: var(--white); }
        .tech-section .section-lead { color: rgba(255,255,255,.65); }
        .tech-grid { display: grid; grid-template-columns: repeat(auto-fit,minmax(230px,1fr)); gap: 20px; }
        .tech-card { background: rgba(255,255,255,.05); border: 1px solid rgba(255,255,255,.12); border-radius: 14px; padding: 26px 22px; }
        .tech-badge {
          display: inline-block; background: var(--saffron); color: var(--ink);
          font-size: 11px; font-weight: 700; letter-spacing: .4px; text-transform: uppercase;
          padding: 3px 10px; border-radius: 100px; margin-bottom: 14px;
        }
        .tech-card h4 { font-size: 18px; color: var(--white); margin-bottom: 6px; font-family: var(--font-display); }
        .tech-tagline { font-size: 13px; color: var(--sky); margin-bottom: 10px; }
        .tech-desc { font-size: 13px; color: rgba(255,255,255,.62); line-height: 1.7; }

        /* ── DOCTORS ── */
        .doctors-grid { display: grid; grid-template-columns: repeat(auto-fit,minmax(210px,1fr)); gap: 18px; }
        .doc-card { background: var(--white); border: 1px solid var(--line); border-radius: 14px; padding: 26px 22px; text-align: center; }
        .avatar {
          width: 54px; height: 54px; border-radius: 50%;
          display: inline-flex; align-items: center; justify-content: center;
          font-family: var(--font-mono); font-size: 14px; font-weight: 600; margin-bottom: 14px;
        }
        .av-g { background: var(--green); color: #fff; }
        .av-s { background: var(--saffron); color: var(--ink); }
        .av-k { background: var(--sky); color: #fff; }
        .doc-card h4 { font-size: 16.5px; margin-bottom: 4px; }
        .doc-role { font-size: 12px; color: var(--saffron); font-weight: 600; margin-bottom: 8px; text-transform: uppercase; letter-spacing: .4px; }
        .doc-detail { font-size: 13px; color: var(--slate); line-height: 1.65; }

        /* ── TESTIMONIALS ── */
        .testi-grid { display: grid; grid-template-columns: repeat(auto-fit,minmax(240px,1fr)); gap: 18px; }
        .testi { background: var(--green-light); border: 1px solid rgba(27,107,58,.15); border-radius: 14px; padding: 24px 22px; }
        .testi blockquote { font-size: 14.5px; line-height: 1.75; color: var(--ink); margin-bottom: 14px; }
        .testi-name { font-weight: 700; font-size: 13px; color: var(--green); display: block; }
        .testi-role { font-size: 12.5px; color: var(--slate); }
        .testi-note { font-size: 12px; color: var(--slate); margin-top: 22px; }

        /* ── PROCESS ── */
        .process-section { background: var(--cream); }
        .process-grid { display: grid; grid-template-columns: repeat(auto-fit,minmax(200px,1fr)); gap: 18px; }
        .process-step { background: var(--white); border: 1px solid var(--line); border-radius: 14px; padding: 26px 22px; }
        .process-num {
          width: 38px; height: 38px; border-radius: 50%; background: var(--green); color: #fff;
          font-family: var(--font-mono); font-size: 12px;
          display: flex; align-items: center; justify-content: center; margin-bottom: 16px;
        }
        .process-step h4 { font-size: 15.5px; font-weight: 600; margin-bottom: 7px; font-family: var(--font-body); }
        .process-step p { font-size: 13px; color: var(--slate); line-height: 1.7; }

        /* ── WHY ── */
        .why-grid { display: grid; grid-template-columns: repeat(auto-fit,minmax(270px,1fr)); gap: 18px; }
        .why-card { display: flex; gap: 14px; background: var(--cream); border: 1px solid var(--line); border-radius: 14px; padding: 22px; }
        .why-icon {
          flex-shrink: 0; width: 40px; height: 40px; border-radius: 10px;
          background: var(--green); color: #fff; display: flex; align-items: center; justify-content: center;
        }
        .why-icon svg { width: 20px; height: 20px; }
        .why-card h4 { font-size: 15px; font-weight: 600; margin-bottom: 5px; }
        .why-card p { font-size: 13px; color: var(--slate); line-height: 1.7; }

        /* ── FAQ ── */
        .faq-list { max-width: 680px; }
        .faq-item { border-bottom: 1px solid var(--line); }
        .faq-q {
          width: 100%; background: none; border: none; cursor: pointer; text-align: left;
          display: flex; justify-content: space-between; align-items: center; gap: 14px;
          padding: 18px 0; font-size: 15px; font-weight: 600; color: var(--ink);
        }
        .faq-icon { color: var(--green); font-size: 18px; flex-shrink: 0; }
        .faq-a { font-size: 13.5px; color: var(--slate); padding-bottom: 18px; line-height: 1.75; max-width: 600px; }

        /* ── CLOSING ── */
        .closing { background: linear-gradient(155deg, var(--green) 0%, var(--ink) 100%); padding: 80px 6vw; text-align: center; }
        .closing h2 { font-size: clamp(26px,3.6vw,40px); color: #fff; margin-bottom: 12px; }
        .closing > p { font-size: 16px; color: rgba(255,255,255,.75); margin-bottom: 36px; }
        .strip {
          display: flex; gap: 12px; flex-wrap: wrap; justify-content: center;
          max-width: 640px; margin: 0 auto;
          background: rgba(255,255,255,.08); border: 1px solid rgba(255,255,255,.18);
          border-radius: 14px; padding: 18px;
        }
        .strip-f { flex: 1; min-width: 170px; position: relative; }
        .strip-f input {
          width: 100%; padding: 12px 15px; border: 1.5px solid rgba(255,255,255,.22);
          border-radius: var(--r); background: rgba(255,255,255,.07); color: #fff;
          font-size: 14px; outline: none; transition: border-color .2s;
        }
        .strip-f input::placeholder { color: rgba(255,255,255,.5); }
        .strip-f input:focus { border-color: var(--saffron); }
        .strip-f input.input-err { border-color: #F87171; }
        .btn-strip {
          background: var(--saffron); color: var(--ink); border: none; cursor: pointer;
          font-weight: 700; font-size: 14.5px; padding: 12px 26px; border-radius: var(--r);
          white-space: nowrap; transition: transform .15s, background .18s;
        }
        .btn-strip:hover:not(:disabled) { background: #FBBF24; transform: translateY(-1px); }
        .btn-strip:disabled { opacity: .65; cursor: not-allowed; }
        .strip-success {
          display: flex; align-items: center; gap: 12px; justify-content: center;
          background: rgba(255,255,255,.08); border: 1px solid rgba(255,255,255,.2);
          border-radius: 14px; padding: 20px; font-size: 15px; color: #fff;
        }
        .strip-api-err { flex-basis: 100%; font-size: 12.5px; color: #FCA5A5; text-align: left; margin-top: 4px; }

        /* ── FOOTER ── */
        .footer {
          background: var(--ink); padding: 28px 6vw;
          display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 12px;
        }
        .footer-logo { font-family: var(--font-display); font-size: 18px; color: rgba(255,255,255,.8); }
        .footer-logo span { color: var(--saffron); }
        .footer-note { font-size: 12.5px; color: rgba(255,255,255,.4); }

        /* ── RESPONSIVE ── */
        @media (max-width: 960px) {
          .hero { grid-template-columns: 1fr; text-align: center; padding: 72px 5vw 52px; }
          .hero-badges, .hero-actions { justify-content: center; }
          .hero-sub { margin-inline: auto; }
          .section-lead { margin-inline: auto; }
        }
        @media (max-width: 600px) {
          .lc-card { padding: 24px 18px; }
          .section { padding: 56px 5vw; }
          .strip { flex-direction: column; }
          .strip-f { width: 100%; }
          .nav { padding: 12px 4vw; }
        }
      `}</style>

      {/* NAV */}
      <nav className="nav">
        <div className="nav-logo">Healvia<span>.</span></div>
        <span className="nav-city">LASIK · {city.name}</span>
        <button className="nav-cta" onClick={scrollToForm}>Free Screening</button>
      </nav>

      {/* HERO */}
      <section className="hero">
        <div>
          <div className="hero-eyebrow">
            <span className="hero-dot" />
            {city.name} &nbsp;·&nbsp; Advanced LASIK Centre
          </div>
          <h1>
            {city.headline}<br />
            <em>{city.headlineEm}</em>
          </h1>
          <p className="hero-sub">{city.sub}</p>
          <div className="hero-actions">
            <button className="btn-hero" onClick={scrollToForm}>Book Free Screening</button>
          </div>
          <div className="hero-badges">
            <span className="badge"><span className="badge-dot" />NABH-accredited</span>
            <span className="badge"><span className="badge-dot" />Bladeless &amp; Contoura LASIK</span>
            <span className="badge"><span className="badge-dot" />15-min procedure</span>
          </div>
        </div>

        <div>
          {/* Eye SVG illustration */}
          <svg className="eye-svg" viewBox="0 0 360 180" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <radialGradient id="eyeG" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#E8F5EE" />
                <stop offset="100%" stopColor="#fff" />
              </radialGradient>
              <radialGradient id="irisG" cx="50%" cy="45%" r="50%">
                <stop offset="0%" stopColor="#2E7D52" />
                <stop offset="100%" stopColor="#1B6B3A" />
              </radialGradient>
            </defs>
            <ellipse cx="180" cy="90" rx="140" ry="70" fill="url(#eyeG)" stroke="#D1D5DB" strokeWidth="1.2" />
            <circle cx="180" cy="90" r="42" fill="url(#irisG)" />
            <circle cx="180" cy="90" r="18" fill="#0F1F15" />
            <circle cx="193" cy="78" r="7" fill="rgba(255,255,255,0.55)" />
            <line x1="60" y1="90" x2="138" y2="90" stroke="#F59E0B" strokeWidth="2" strokeDasharray="4 3" opacity="0.8">
              <animate attributeName="opacity" values="0.4;1;0.4" dur="2s" repeatCount="indefinite" />
            </line>
            <line x1="300" y1="90" x2="222" y2="90" stroke="#F59E0B" strokeWidth="2" strokeDasharray="4 3" opacity="0.8">
              <animate attributeName="opacity" values="0.4;1;0.4" dur="2s" begin="0.3s" repeatCount="indefinite" />
            </line>
            <path d="M68 62 Q75 48 84 58" stroke="#9CA3AF" strokeWidth="1.5" fill="none" />
            <path d="M104 44 Q115 32 122 46" stroke="#9CA3AF" strokeWidth="1.5" fill="none" />
            <path d="M148 33 Q160 20 167 36" stroke="#9CA3AF" strokeWidth="1.5" fill="none" />
            <path d="M195 33 Q205 20 214 35" stroke="#9CA3AF" strokeWidth="1.5" fill="none" />
            <path d="M238 44 Q247 32 255 46" stroke="#9CA3AF" strokeWidth="1.5" fill="none" />
            <path d="M276 62 Q283 48 292 58" stroke="#9CA3AF" strokeWidth="1.5" fill="none" />
            <text x="180" y="156" textAnchor="middle" fontFamily="'Space Mono',monospace" fontSize="13" fontWeight="600" fill="#1B6B3A" letterSpacing="2">20/20</text>
          </svg>
          <LeadCard cityKey={cityKey} />
        </div>
      </section>

      {/* TRUST */}
      <div className="trust">
        <span className="trust-item">⭐ 4.9 avg patient rating</span>
        <span className="trust-item">Fellowship-trained surgeons</span>
        <span className="trust-item">Transparent upfront pricing</span>
      </div>

      {/* STATS */}
      <div className="stats">
        <div className="stat"><span className="stat-val">22,000+</span><span className="stat-lbl">Procedures</span></div>
        <div className="stat"><span className="stat-val">14+</span><span className="stat-lbl">Years in practice</span></div>
        <div className="stat"><span className="stat-val">98%</span><span className="stat-lbl">Satisfaction rate</span></div>
        <div className="stat"><span className="stat-val">20 min</span><span className="stat-lbl">Procedure time</span></div>
        <div className="stat"><span className="stat-val">7</span><span className="stat-lbl">Cities</span></div>
      </div>

      {/* BENEFITS */}
      <section className="section bg-cream">
        <p className="eyebrow">Why LASIK</p>
        <h2 className="section-title">A permanent fix, not another pair of lenses</h2>
        <p className="section-lead">LASIK reshapes the cornea so light focuses correctly on the retina — permanently. Here's what that means for daily life.</p>
        <div className="benefits-grid">
          {[
            { icon: <IconSun />,    title: "Clear vision by morning",       desc: "Most patients reach 6/6 vision or better within 24 hours of the procedure." },
            { icon: <IconBolt />,   title: "Quick and painless",            desc: "The procedure takes about 15–20 minutes with numbing drops and no needles." },
            { icon: <IconShield />, title: "Built to last",                 desc: "LASIK corrects your vision permanently — most patients never reach for glasses again." },
            { icon: <IconUsers />,  title: "Back to normal fast",           desc: "Drive, work, and resume daily activities within a day or two of surgery." },
            { icon: <IconLayers />, title: "A technology for every eye",    desc: "Bladeless, Contoura, or SMILE — we match the method to your prescription." },
            { icon: <IconLoop />,   title: "Care beyond surgery",           desc: "Scheduled follow-ups and support through your full recovery and beyond." },
          ].map((b) => (
            <div key={b.title} className="benefit-card">
              <div className="benefit-icon">{b.icon}</div>
              <h3>{b.title}</h3>
              <p>{b.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* TECHNOLOGY */}
      <section className="section tech-section">
        <p className="eyebrow">The Technology</p>
        <h2 className="section-title">Three ways — we'll match you to the right one</h2>
        <p className="section-lead">Not every eye suits the same method. Here's a plain-language look at your options.</p>
        <div className="tech-grid">
          {[
            { badge: "Most popular",       name: "Bladeless LASIK",  tagline: "All-laser, no blade, ever.",                    desc: "A femtosecond laser creates the corneal flap and an excimer laser reshapes it — precise, fast, and the standard choice for most prescriptions." },
            { badge: "Topography-guided",  name: "Contoura Vision",  tagline: "Mapped to your eye's unique surface.",          desc: "Over 22,000 data points of your cornea guide the laser, correcting irregularities glasses never could." },
            { badge: "Minimally invasive", name: "SMILE",            tagline: "No flap, smaller incision.",                   desc: "A keyhole-sized opening reshapes the cornea from within, suited to certain prescriptions and thinner corneas." },
          ].map((t) => (
            <div key={t.name} className="tech-card">
              <span className="tech-badge">{t.badge}</span>
              <h4>{t.name}</h4>
              <p className="tech-tagline">{t.tagline}</p>
              <p className="tech-desc">{t.desc}</p>
            </div>
          ))}
        </div>
      </section>

    

      {/* TESTIMONIALS — city-specific */}
      <section className="section bg-cream">
        <p className="eyebrow">Patient Stories</p>
        <h2 className="section-title">What clear vision actually feels like</h2>
        <div className="testi-grid">
          {city.testimonials.map((t) => (
            <figure key={t.name} className="testi">
              <blockquote>"{t.quote}"</blockquote>
              <figcaption>
                <span className="testi-name">{t.name}</span>
                <span className="testi-role">{t.role}</span>
              </figcaption>
            </figure>
          ))}
        </div>
        <p className="testi-note">Shared with patients' permission. Individual results vary by eye condition and candidacy.</p>
      </section>

      {/* PROCESS */}
      <section className="section process-section">
        <p className="eyebrow">What To Expect</p>
        <h2 className="section-title">Four steps from call to clear vision</h2>
        <p className="section-lead">A simple, predictable path with no surprises.</p>
        <div className="process-grid">
          {[
            { n: "01", title: "Free consultation call",  desc: "We call you back to understand your eyes, your lifestyle, and answer every question." },
            { n: "02", title: "Detailed eye screening",  desc: "A thorough pre-LASIK workup confirms candidacy and the right technology for your eyes." },
            { n: "03", title: "The LASIK procedure",     desc: "A precise 15–20 minute laser procedure by a senior surgeon with zero shortcuts." },
            { n: "04", title: "Recovery & follow-up",   desc: "Scheduled check-ins ensure your eyes heal exactly as they should." },
          ].map((s) => (
            <div key={s.n} className="process-step">
              <div className="process-num">{s.n}</div>
              <h4>{s.title}</h4>
              <p>{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* WHY */}
      <section className="section">
        <p className="eyebrow">Why This Clinic</p>
        <h2 className="section-title">What sets the experience apart</h2>
        <p className="section-lead">Plenty of clinics offer LASIK. Here's what we think actually matters once you're in the chair.</p>
        <div className="why-grid">
          {[
            { icon: <IconLayers />, title: "Three technologies, one decision", desc: "Bladeless, Contoura, and SMILE under one roof — matched to your eyes." },
            { icon: <IconShield />, title: "Senior surgeons only",             desc: "Fellowship-trained ophthalmologists perform every procedure, no exceptions." },
            { icon: <IconBolt />,   title: "Transparent, fair pricing",        desc: "One clear quote after your screening — no hidden add-ons once you're committed." },
            { icon: <IconLoop />,   title: "Proactive aftercare",              desc: "We call to check on you through every stage of recovery." },
          ].map((w) => (
            <div key={w.title} className="why-card">
              <div className="why-icon">{w.icon}</div>
              <div><h4>{w.title}</h4><p>{w.desc}</p></div>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="section" id="faq-anchor">
        <p className="eyebrow">Common Questions</p>
        <h2 className="section-title">Before you book — answers most people want</h2>
        <FaqList />
      </section>

      {/* CLOSING CTA */}
      <section className="closing">
        <h2>{city.closingHeadline}</h2>
        <p>{city.closingSub}</p>
        <LeadStrip cityKey={cityKey} />
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <div className="footer-logo">Healvia<span>.</span></div>
        <p className="footer-note">© 2025 Healvia Eye Care. All rights reserved.</p>
      </footer>
    </>
  );
}