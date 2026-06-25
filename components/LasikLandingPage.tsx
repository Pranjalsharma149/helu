"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
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
    if (!c)              return "Mobile number is required";
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
        body: JSON.stringify({
          name: name.trim(), phone, service: "LASIK", city: cityKey,
          source: CITY_DATA[cityKey].formSource + "-" + formId,
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok || data.duplicate) {
        setStatus("success");
        setMessage(data.message || "Thank you. Our team will be in touch with you soon.");
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

// ─── HERO LEAD CARD ──────────────────────────────────────────
function LeadCard({ cityKey }: { cityKey: CityKey }) {
  const f = useLeadForm(cityKey, "hero");
  return (
    <div className="lc-card" id="lead-anchor">
      <span className="lc-tag">Free Eye Screening</span>
      <h3 className="lc-title">Check your LASIK eligibility</h3>
      <p className="lc-sub">Leave your details and a specialist will get in touch to discuss your options.</p>

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
            {f.status === "loading" ? <span className="spin-wrap"><span className="spinner" />Sending…</span> : "Book free screening"}
          </button>
          <p className="lc-note">Your information is kept private and never shared.</p>
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
        {f.status === "loading" ? "Sending…" : "Request a callback"}
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
            <span>{item.q}</span>
            <span className="faq-icon">{open === i ? "−" : "+"}</span>
          </button>
          {open === i && <p className="faq-a">{item.a}</p>}
        </div>
      ))}
    </div>
  );
}

// ─── MOBILE NAV WITH HAMBURGER ────────────────────────────────
function MobileNav({ cityName, scrollToForm }: { cityName: string; scrollToForm: () => void }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const close = () => setOpen(false);

  const navLinks = [
    { href: "#benefits",   label: "Why LASIK" },
    { href: "#technology", label: "Technology" },
    { href: "#process",    label: "What to Expect" },
    { href: "#faq-anchor", label: "FAQ" },
  ];

  return (
    <>
      {/* Backdrop overlay */}
      {open && (
        <div className="nav-overlay" onClick={close} aria-hidden="true" />
      )}

      {/* Slide-in drawer */}
      <div className={`nav-drawer${open ? " nav-drawer--open" : ""}`} aria-hidden={!open}>
        <div className="nav-drawer-header">
          <Image src="/vv.png" alt="Healvia Eye Care" width={160} height={44} style={{ height: "44px", width: "auto" }} />
          <button className="drawer-close" onClick={close} aria-label="Close menu">
            <span /><span />
          </button>
        </div>
        <p className="drawer-city">LASIK · {cityName}</p>
        <nav>
          <ul className="drawer-links">
            {navLinks.map(l => (
              <li key={l.href}>
                <a href={l.href} onClick={close} className="drawer-link">{l.label}</a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="drawer-cta-wrap">
          <button
            className="btn-primary drawer-cta"
            onClick={() => { close(); scrollToForm(); }}
          >
            Book Free Screening
          </button>
        </div>
      </div>

      {/* Top navbar */}
      <nav className="nav">
        <div className="nav-logo">
          <Image src="/vv.png" alt="Healvia Eye Care" width={180} height={56} priority style={{ height: "96px", width: "auto" }} />
        </div>
        {/* City pill — hidden on very small screens, shown centre on mobile */}
        <span className="nav-city">LASIK · {cityName}</span>
        <div className="nav-right">
          {/* Desktop-only links */}
          <ul className="nav-links-desktop">
            {navLinks.map(l => (
              <li key={l.href}><a href={l.href}>{l.label}</a></li>
            ))}
          </ul>
          <button className="nav-cta nav-cta-desktop" onClick={scrollToForm}>Free Screening</button>
          {/* Hamburger — hidden on desktop */}
          <button
            className={`hamburger${open ? " hamburger--open" : ""}`}
            onClick={() => setOpen(!open)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
          >
            <span className="ham-bar" />
            <span className="ham-bar" />
            <span className="ham-bar" />
          </button>
        </div>
      </nav>
    </>
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
          --ink: #1a2236;
          --white: #ffffff;
          --cream: #f4f7fd;
          --green: #1B6B3A;
          --green-light: #e8f5ee;
          --green-mid: #2E7D52;
          --saffron: #F59E0B;
          --saffron-light: #FEF3C7;
          --sky: #0EA5E9;
          --slate: #5a6680;
          --line: #e8ecf4;
          --danger: #DC2626;
          --r: 10px;
          --font-display: 'DM Serif Display', Georgia, serif;
          --font-body: 'DM Sans', system-ui, sans-serif;
          --font-mono: 'Space Mono', monospace;
        }

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; -webkit-text-size-adjust: 100%; text-size-adjust: 100%; }
        body {
          font-family: var(--font-body); color: var(--ink); background: var(--white);
          line-height: 1.6; overflow-x: hidden;
          -webkit-font-smoothing: antialiased;
          /* space for sticky bottom bar on mobile */
          padding-bottom: 76px;
        }
        h1, h2, h3, h4 { font-family: var(--font-display); font-weight: 400; line-height: 1.2; }
        button, input { font-family: inherit; }
        img { max-width: 100%; }
        :focus-visible { outline: 2px solid var(--saffron); outline-offset: 2px; }

        /* ══════════════════════════════════════════════════════
           NAV
           ══════════════════════════════════════════════════════ */
        .nav {
          padding: 0 16px;
          height: 68px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 10px;
          background: var(--white);
          border-bottom: 1px solid var(--line);
          position: sticky;
          top: 0;
          z-index: 200;
        }
        .nav-logo { display: flex; align-items: center; flex-shrink: 0; }
        .nav-city {
          font-size: 11px;
          font-weight: 600;
          color: var(--slate);
          letter-spacing: 0.3px;
          background: var(--cream);
          padding: 4px 10px;
          border-radius: 100px;
          border: 1px solid var(--line);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          max-width: 160px;
          flex: 1;
          text-align: center;
        }
        .nav-right { display: flex; align-items: center; gap: 10px; flex-shrink: 0; }

        /* Desktop nav links — hidden on mobile */
        .nav-links-desktop {
          display: none;
          gap: 22px;
          list-style: none;
          align-items: center;
        }
        .nav-links-desktop a {
          font-size: 13.5px; font-weight: 500; color: var(--slate);
          text-decoration: none; transition: color 0.15s;
        }
        .nav-links-desktop a:hover { color: var(--green); }

        /* Desktop CTA button — hidden on mobile */
        .nav-cta-desktop {
          display: none;
          padding: 11px 20px;
          min-height: 44px;
          background: var(--green);
          color: #fff;
          border: none;
          border-radius: 8px;
          font-size: 13px;
          font-weight: 600;
          cursor: pointer;
          transition: background 0.18s;
          white-space: nowrap;
        }
        .nav-cta-desktop:hover { background: var(--green-mid); }

        /* ── HAMBURGER ── */
        .hamburger {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          gap: 5px;
          width: 42px;
          height: 42px;
          background: var(--cream);
          border: 1px solid var(--line);
          border-radius: 10px;
          cursor: pointer;
          padding: 0;
          flex-shrink: 0;
          -webkit-tap-highlight-color: transparent;
          touch-action: manipulation;
        }
        .ham-bar {
          display: block;
          width: 18px;
          height: 2px;
          background: var(--ink);
          border-radius: 2px;
          transition: transform 0.25s ease, opacity 0.25s ease;
          transform-origin: center;
        }
        .hamburger--open .ham-bar:nth-child(1) { transform: translateY(7px) rotate(45deg); }
        .hamburger--open .ham-bar:nth-child(2) { opacity: 0; transform: scaleX(0); }
        .hamburger--open .ham-bar:nth-child(3) { transform: translateY(-7px) rotate(-45deg); }

        /* ── BACKDROP OVERLAY ── */
        .nav-overlay {
          position: fixed;
          inset: 0;
          background: rgba(26, 34, 54, 0.45);
          z-index: 299;
          backdrop-filter: blur(2px);
          animation: fadeIn 0.2s ease;
        }
        @keyframes fadeIn { from { opacity: 0 } to { opacity: 1 } }

        /* ── SLIDE-IN DRAWER ── */
        .nav-drawer {
          position: fixed;
          top: 0; right: 0; bottom: 0;
          width: min(300px, 85vw);
          background: var(--white);
          z-index: 300;
          display: flex;
          flex-direction: column;
          box-shadow: -8px 0 40px rgba(0,0,0,0.15);
          transform: translateX(100%);
          transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .nav-drawer--open { transform: translateX(0); }
        .nav-drawer-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 18px 20px;
          border-bottom: 1px solid var(--line);
        }
        .drawer-close {
          width: 36px; height: 36px;
          border: none;
          background: var(--cream);
          border-radius: 8px;
          cursor: pointer;
          position: relative;
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
        }
        .drawer-close span {
          position: absolute;
          width: 16px; height: 2px;
          background: var(--ink);
          border-radius: 2px;
        }
        .drawer-close span:nth-child(1) { transform: rotate(45deg); }
        .drawer-close span:nth-child(2) { transform: rotate(-45deg); }
        .drawer-city {
          font-size: 11px; font-weight: 600; color: var(--slate);
          letter-spacing: 0.5px; text-transform: uppercase;
          padding: 14px 20px 10px;
          border-bottom: 1px solid #f0f2f7;
        }
        .drawer-links { list-style: none; padding: 8px 0; flex: 1; }
        .drawer-link {
          display: block;
          padding: 15px 20px;
          font-size: 16px; font-weight: 500;
          color: var(--ink); text-decoration: none;
          border-bottom: 1px solid #f0f2f7;
          transition: background 0.15s, color 0.15s;
        }
        .drawer-link:hover { background: var(--cream); color: var(--green); }
        .drawer-cta-wrap { padding: 20px; border-top: 1px solid var(--line); }
        .drawer-cta { width: 100%; padding: 15px; font-size: 16px; margin-top: 0; }

        /* ── STICKY BOTTOM CTA (mobile only) ── */
        .sticky-bottom-cta {
          position: fixed;
          bottom: 0; left: 0; right: 0;
          background: var(--white);
          border-top: 1px solid var(--line);
          padding: 12px 20px;
          z-index: 150;
          display: flex;
          gap: 12px;
          align-items: center;
          box-shadow: 0 -4px 20px rgba(0,0,0,0.08);
        }
        .sticky-bottom-cta .btn-primary { margin-top: 0; padding: 14px; font-size: 15px; }
        .sticky-tel {
          display: flex; align-items: center; justify-content: center;
          width: 48px; height: 48px;
          border-radius: 12px;
          background: var(--cream);
          border: 1px solid var(--line);
          flex-shrink: 0;
          text-decoration: none;
          font-size: 20px;
        }

        /* ══════════════════════════════════════════════════════
           HERO
           ══════════════════════════════════════════════════════ */
        .hero {
          background: linear-gradient(160deg, var(--green-light) 0%, #fff 60%);
          padding: 36px 20px 40px;
          display: flex;
          flex-direction: column;
          gap: 28px;
        }
        .hero-eyebrow {
          display: inline-flex; align-items: center; gap: 8px;
          background: var(--green-light); border: 1px solid rgba(27,107,58,0.25);
          color: var(--green); font-size: 12px; font-weight: 600;
          letter-spacing: 1px; text-transform: uppercase;
          padding: 5px 14px; border-radius: 100px; margin-bottom: 18px;
          align-self: flex-start;
        }
        .hero-dot {
          width: 6px; height: 6px; border-radius: 50%; background: var(--saffron);
          animation: pulse 1.8s ease-in-out infinite;
          flex-shrink: 0;
        }
        @keyframes pulse { 0%,100%{opacity:1;} 50%{opacity:.4;} }
        .hero h1 { font-size: clamp(28px, 7.5vw, 54px); color: var(--ink); margin-bottom: 14px; }
        .hero h1 em { font-style: normal; color: var(--green); }
        .hero-sub { font-size: 15px; color: var(--slate); margin-bottom: 20px; line-height: 1.8; }
        .hero-bullets { list-style: none; display: flex; flex-direction: column; gap: 10px; margin-bottom: 24px; }
        .hero-bullets li { display: flex; align-items: flex-start; gap: 10px; font-size: 14px; color: #3a4a66; line-height: 1.5; }
        .hero-bullets li::before { content: "✓"; color: var(--green); font-weight: 700; flex-shrink: 0; margin-top: 1px; }
        .hero-actions { display: flex; gap: 12px; flex-wrap: wrap; margin-bottom: 20px; }
        .btn-hero {
          padding: 15px 28px; min-height: 50px;
          background: var(--green); color: #fff; border: none;
          border-radius: var(--r); font-weight: 700; font-size: 15px; cursor: pointer;
          transition: background .2s;
          width: 100%;
          -webkit-tap-highlight-color: transparent;
          touch-action: manipulation;
        }
        .btn-hero:hover { background: var(--green-mid); }
        .hero-badges { display: flex; gap: 10px; flex-wrap: wrap; }
        .badge {
          display: flex; align-items: center; gap: 6px; background: var(--white);
          border: 1px solid var(--line); font-size: 12px; font-weight: 500;
          padding: 7px 12px; border-radius: var(--r); color: var(--ink);
        }
        .badge-dot { width: 6px; height: 6px; border-radius: 50%; background: var(--green); flex-shrink: 0; }

        /* ── EYE SVG ── */
        .eye-svg { width: 100%; max-width: 280px; display: block; margin: 0 auto 20px; }

        /* ── LEAD CARD ── */
        .lc-card {
          background: var(--white); border-radius: 16px; padding: 28px 22px;
          box-shadow: 0 8px 40px rgba(27,107,58,0.1), 0 1px 4px rgba(0,0,0,0.06);
          border: 1px solid var(--line);
        }
        .lc-tag {
          display: inline-block; background: var(--saffron); color: var(--ink);
          font-size: 11px; font-weight: 700; letter-spacing: .8px; text-transform: uppercase;
          padding: 4px 12px; border-radius: 100px; margin-bottom: 14px;
        }
        .lc-title { font-size: 20px; margin-bottom: 6px; }
        .lc-sub { font-size: 13.5px; color: var(--slate); margin-bottom: 20px; }
        .lc-field { margin-bottom: 14px; }
        .lc-field label { display: block; font-size: 12px; font-weight: 600; margin-bottom: 5px; }
        .lc-field input {
          width: 100%; padding: 14px 16px; border: 1.5px solid #dde2ed;
          border-radius: var(--r); font-size: 16px; color: var(--ink);
          background: #fafbfc; outline: none; transition: border-color .2s, background .2s;
          -webkit-appearance: none;
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
          width: 100%; padding: 14px; min-height: 50px;
          background: var(--green); color: #fff; border: none;
          border-radius: var(--r); font-size: 16px; font-weight: 700; cursor: pointer;
          margin-top: 4px; transition: background .18s;
          -webkit-tap-highlight-color: transparent;
          touch-action: manipulation;
        }
        .btn-primary:hover:not(:disabled) { background: var(--green-mid); }
        .btn-primary:active:not(:disabled) { background: #155c30; }
        .btn-primary:disabled { opacity: .65; cursor: not-allowed; }
        .lc-note { font-size: 11.5px; color: #9aa3b8; text-align: center; margin-top: 11px; }
        .lc-success { text-align: center; padding: 16px 0; }
        .lc-check {
          width: 52px; height: 52px; border-radius: 50%; background: var(--green); color: #fff;
          display: flex; align-items: center; justify-content: center;
          font-size: 22px; margin: 0 auto 14px; animation: pop .35s ease;
        }
        @keyframes pop { from{transform:scale(0);} to{transform:scale(1);} }
        .lc-success p { font-size: 15px; line-height: 1.65; }
        .spin-wrap { display: flex; align-items: center; justify-content: center; gap: 8px; }
        .spinner {
          width: 16px; height: 16px; border: 2px solid rgba(255,255,255,.35);
          border-top-color: #fff; border-radius: 50%; animation: spin .7s linear infinite; display: inline-block; flex-shrink: 0;
        }
        @keyframes spin { to { transform: rotate(360deg); } }

        /* ── TRUST BAR ── */
        .trust {
          background: var(--white); border-bottom: 1px solid var(--line);
          padding: 12px 20px; display: flex; justify-content: center;
          gap: 16px; flex-wrap: wrap;
        }
        .trust-item { font-size: 12.5px; font-weight: 600; color: var(--green-mid); }

        /* ── STATS ── */
        .stats {
          background: var(--cream); border-bottom: 1px solid var(--line);
          padding: 36px 20px;
          display: grid; grid-template-columns: repeat(2, 1fr); gap: 24px 12px;
        }
        .stat { text-align: center; }
        .stat:last-child { grid-column: 1 / -1; }
        .stat-val { display: block; font-family: var(--font-display); font-size: 26px; color: var(--green); }
        .stat-lbl { display: block; font-size: 11px; color: var(--slate); margin-top: 4px; text-transform: uppercase; letter-spacing: .5px; }

        /* ── GENERIC SECTIONS ── */
        .section { padding: 52px 20px; }
        .section.bg-cream { background: var(--cream); }
        .eyebrow { font-size: 10px; font-weight: 700; letter-spacing: 1.8px; text-transform: uppercase; color: var(--green); margin-bottom: 10px; }
        .section-title { font-size: clamp(24px, 6vw, 38px); margin-bottom: 12px; color: var(--ink); }
        .section-lead { font-size: 14.5px; color: var(--slate); margin-bottom: 32px; line-height: 1.78; }

        /* ── BENEFITS ── */
        .benefits-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
        .benefit-card {
          background: var(--white); border: 1px solid var(--line); border-radius: 14px; padding: 20px 16px;
        }
        .benefit-icon {
          width: 38px; height: 38px; border-radius: 10px; background: var(--green-light);
          color: var(--green); display: flex; align-items: center; justify-content: center; margin-bottom: 12px;
        }
        .benefit-icon svg { width: 20px; height: 20px; }
        .benefit-card h3 { font-size: 13.5px; font-weight: 600; margin-bottom: 6px; font-family: var(--font-body); color: var(--ink); }
        .benefit-card p { font-size: 12px; color: var(--slate); line-height: 1.7; }

        /* ── TECHNOLOGY ── */
        .tech-section { background: var(--ink); padding: 52px 20px; }
        .tech-section .eyebrow { color: #6fa3f5; }
        .tech-section .section-title { color: var(--white); }
        .tech-section .section-lead { color: rgba(255,255,255,.65); }
        .tech-grid { display: grid; grid-template-columns: 1fr; gap: 16px; }
        .tech-card { background: rgba(255,255,255,.05); border: 1px solid rgba(255,255,255,.12); border-radius: 14px; padding: 22px 18px; }
        .tech-badge {
          display: inline-block; background: var(--saffron); color: var(--ink);
          font-size: 10px; font-weight: 700; letter-spacing: .4px; text-transform: uppercase;
          padding: 3px 10px; border-radius: 100px; margin-bottom: 12px;
        }
        .tech-card h4 { font-size: 18px; color: var(--white); margin-bottom: 5px; font-family: var(--font-display); }
        .tech-tagline { font-size: 13px; color: #6fa3f5; margin-bottom: 8px; }
        .tech-desc { font-size: 13px; color: rgba(255,255,255,.62); line-height: 1.7; }

        /* ── TESTIMONIALS ── */
        .testi-grid { display: grid; grid-template-columns: 1fr; gap: 14px; margin-top: 4px; }
        .testi { background: var(--green-light); border: 1px solid rgba(27,107,58,.15); border-radius: 14px; padding: 22px 18px; }
        .testi blockquote { font-size: 14px; line-height: 1.75; color: var(--ink); margin-bottom: 14px; font-style: italic; }
        .testi-name { font-weight: 700; font-size: 13px; color: var(--green); display: block; }
        .testi-role { font-size: 12.5px; color: var(--slate); }
        .testi-note { font-size: 12px; color: var(--slate); margin-top: 20px; }

        /* ── PROCESS ── */
        .process-section { background: var(--cream); }
        .process-grid { display: grid; grid-template-columns: 1fr; gap: 14px; }
        .process-step { background: var(--white); border: 1px solid var(--line); border-radius: 14px; padding: 22px 18px; }
        .process-num {
          width: 38px; height: 38px; border-radius: 50%; background: var(--green); color: #fff;
          font-size: 12px; font-weight: 700;
          display: flex; align-items: center; justify-content: center; margin-bottom: 14px;
        }
        .process-step h4 { font-size: 15px; font-weight: 600; margin-bottom: 6px; font-family: var(--font-body); color: var(--ink); }
        .process-step p { font-size: 13px; color: var(--slate); line-height: 1.7; }

        /* ── WHY ── */
        .why-grid { display: grid; grid-template-columns: 1fr; gap: 14px; }
        .why-card { display: flex; gap: 14px; background: var(--cream); border: 1px solid var(--line); border-radius: 14px; padding: 20px 18px; }
        .why-icon {
          flex-shrink: 0; width: 40px; height: 40px; border-radius: 10px;
          background: var(--green); color: #fff; display: flex; align-items: center; justify-content: center;
        }
        .why-icon svg { width: 20px; height: 20px; }
        .why-card h4 { font-size: 14.5px; font-weight: 600; margin-bottom: 4px; color: var(--ink); }
        .why-card p { font-size: 13px; color: var(--slate); line-height: 1.7; }

        /* ── FAQ ── */
        .faq-list { margin-top: 28px; }
        .faq-item { border-bottom: 1px solid var(--line); }
        .faq-q {
          width: 100%; background: none; border: none; cursor: pointer; text-align: left;
          display: flex; justify-content: space-between; align-items: flex-start; gap: 14px;
          padding: 18px 0; font-size: 14.5px; font-weight: 600; color: var(--ink);
          -webkit-tap-highlight-color: transparent;
          touch-action: manipulation;
        }
        .faq-q span:first-child { flex: 1; }
        .faq-icon { color: var(--green); font-size: 22px; flex-shrink: 0; line-height: 1; }
        .faq-a { font-size: 13.5px; color: var(--slate); padding-bottom: 18px; line-height: 1.75; }

        /* ── CLOSING ── */
        .closing { background: linear-gradient(135deg, #1a2236 0%, #1d3a6e 100%); padding: 56px 20px; text-align: center; }
        .closing h2 { font-size: clamp(24px, 6vw, 40px); color: #fff; margin-bottom: 12px; }
        .closing > p { font-size: 15px; color: rgba(255,255,255,.75); margin-bottom: 28px; line-height: 1.7; }
        .strip {
          display: flex; flex-direction: column; gap: 12px;
          max-width: 480px; margin: 0 auto;
          background: rgba(255,255,255,.08); border: 1px solid rgba(255,255,255,.18);
          border-radius: 14px; padding: 18px;
        }
        .strip-f { position: relative; }
        .strip-f input {
          width: 100%; padding: 14px 15px; border: 1.5px solid rgba(255,255,255,.22);
          border-radius: var(--r); background: rgba(255,255,255,.07); color: #fff;
          font-size: 16px; outline: none; transition: border-color .2s;
          -webkit-appearance: none;
        }
        .strip-f input::placeholder { color: rgba(255,255,255,.5); }
        .strip-f input:focus { border-color: var(--saffron); }
        .strip-f input.input-err { border-color: #F87171; }
        .btn-strip {
          background: var(--saffron); color: var(--ink); border: none; cursor: pointer;
          font-weight: 700; font-size: 15px; padding: 14px 26px; min-height: 50px;
          border-radius: var(--r); width: 100%;
          transition: background .18s;
          -webkit-tap-highlight-color: transparent;
          touch-action: manipulation;
        }
        .btn-strip:hover:not(:disabled) { background: #FBBF24; }
        .btn-strip:disabled { opacity: .65; cursor: not-allowed; }
        .strip-success {
          display: flex; align-items: center; gap: 12px; justify-content: center;
          background: rgba(255,255,255,.08); border: 1px solid rgba(255,255,255,.2);
          border-radius: 14px; padding: 20px; font-size: 15px; color: #fff;
        }
        .strip-api-err { font-size: 12.5px; color: #FCA5A5; text-align: left; margin-top: 4px; }

        /* ── FOOTER ── */
        .footer {
          background: #111827; padding: 22px 20px;
          display: flex; flex-direction: column;
          align-items: center; gap: 12px; text-align: center;
        }
        .footer-logo { display: flex; align-items: center; }
        .footer-note { font-size: 12px; color: rgba(255,255,255,.4); }

        /* ══════════════════════════════════════════════════════
           TABLET ≥ 640px
           ══════════════════════════════════════════════════════ */
        @media (min-width: 640px) {
          .benefits-grid { grid-template-columns: repeat(3, 1fr); }
          .tech-grid { grid-template-columns: repeat(3, 1fr); }
          .testi-grid { grid-template-columns: repeat(2, 1fr); }
          .process-grid { grid-template-columns: repeat(2, 1fr); }
          .why-grid { grid-template-columns: repeat(2, 1fr); }
          .stats { grid-template-columns: repeat(3, 1fr); }
          .stats .stat:last-child { grid-column: auto; }
          .strip { flex-direction: row; }
          .strip-f { flex: 1; }
          .btn-strip { width: auto; }
        }

        /* ══════════════════════════════════════════════════════
           DESKTOP ≥ 900px
           ══════════════════════════════════════════════════════ */
        @media (min-width: 900px) {
          /* Remove body padding — no sticky bottom bar on desktop */
          body { padding-bottom: 0; }

          /* Hide sticky bottom CTA */
          .sticky-bottom-cta { display: none; }

          /* Nav */
          .nav { padding: 0 6vw; height: 72px; }
          .nav-city { flex: none; max-width: none; text-align: left; font-size: 12px; }
          .nav-links-desktop { display: flex; }
          .nav-cta-desktop { display: block; }
          .hamburger { display: none; }

          /* Hero — two-column */
          .hero {
            padding: 80px 6vw 64px;
            display: grid;
            grid-template-columns: 1fr 400px;
            column-gap: 56px;
            grid-template-areas: "intro visual" "rest visual";
            gap: 0;
          }
          .hero-intro { grid-area: intro; }
          .hero-rest  { grid-area: rest; }
          .hero-visual-card { grid-area: visual; }
          .hero-eyebrow { align-self: auto; }
          .btn-hero { width: auto; }
          .eye-svg { max-width: 360px; margin-bottom: 24px; }
          .lc-card { padding: 36px 32px; }

          /* Stats */
          .stats {
            padding: 48px 6vw;
            display: flex; justify-content: space-around; flex-wrap: wrap; gap: 24px;
          }
          .stat-val { font-size: 30px; }
          .stat-lbl { font-size: 11.5px; }

          /* Sections */
          .section { padding: 80px 6vw; }
          .tech-section { padding: 80px 6vw; }
          .section-lead { max-width: 580px; }

          /* Benefits */
          .benefits-grid { grid-template-columns: repeat(3, 1fr); gap: 18px; }
          .benefit-card { padding: 26px 22px; }
          .benefit-card h3 { font-size: 15.5px; }
          .benefit-card p { font-size: 13.5px; }

          /* Tech */
          .tech-grid { grid-template-columns: repeat(3, 1fr); gap: 20px; }
          .tech-card { padding: 26px 22px; }

          /* Testimonials */
          .testi-grid { grid-template-columns: repeat(3, 1fr); gap: 18px; }

          /* Process */
          .process-grid { grid-template-columns: repeat(4, 1fr); gap: 18px; }

          /* Why */
          .why-grid { grid-template-columns: repeat(2, 1fr); gap: 18px; }

          /* Closing */
          .closing { padding: 80px 6vw; }
          .strip { flex-direction: row; }
          .strip-f { flex: 1; }
          .btn-strip { width: auto; }

          /* Footer */
          .footer {
            flex-direction: row; justify-content: space-between;
            padding: 28px 6vw; text-align: left;
          }
        }

        /* ══════════════════════════════════════════════════════
           ACCESSIBILITY: reduced motion
           ══════════════════════════════════════════════════════ */
        @media (prefers-reduced-motion: reduce) {
          *, *::before, *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
            scroll-behavior: auto !important;
          }
        }
      `}</style>

      {/* ── NAV (hamburger on mobile, full links on desktop) ── */}
      <MobileNav cityName={city.name} scrollToForm={scrollToForm} />

      {/* ── STICKY BOTTOM CTA — mobile only ── */}
      <div className="sticky-bottom-cta">
        <a href="tel:+91XXXXXXXXXX" className="sticky-tel" aria-label="Call us">📞</a>
        <button className="btn-primary" onClick={scrollToForm}>
          Book Free Screening
        </button>
      </div>

      {/* ── HERO ── */}
      <section className="hero">
        <div className="hero-intro">
          <div className="hero-eyebrow">
            <span className="hero-dot" />
            {city.name} &nbsp;·&nbsp; Advanced LASIK Centre
          </div>
          <h1>
            {city.headline}<br />
            <em>{city.headlineEm}</em>
          </h1>
          <p className="hero-sub">{city.sub}</p>
        </div>

        <div className="hero-visual-card">
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
            <ellipse cx="180" cy="90" rx="140" ry="70" fill="url(#eyeG)" stroke="#e8ecf4" strokeWidth="1.2" />
            <circle cx="180" cy="90" r="42" fill="url(#irisG)" />
            <circle cx="180" cy="90" r="18" fill="#0F1F15" />
            <circle cx="193" cy="78" r="7" fill="rgba(255,255,255,0.55)" />
            <line x1="60" y1="90" x2="138" y2="90" stroke="#F59E0B" strokeWidth="2" strokeDasharray="4 3" opacity="0.8">
              <animate attributeName="opacity" values="0.4;1;0.4" dur="2s" repeatCount="indefinite" />
            </line>
            <line x1="300" y1="90" x2="222" y2="90" stroke="#F59E0B" strokeWidth="2" strokeDasharray="4 3" opacity="0.8">
              <animate attributeName="opacity" values="0.4;1;0.4" dur="2s" begin="0.3s" repeatCount="indefinite" />
            </line>
            <path d="M68 62 Q75 48 84 58" stroke="#c8d0e0" strokeWidth="1.5" fill="none" />
            <path d="M104 44 Q115 32 122 46" stroke="#c8d0e0" strokeWidth="1.5" fill="none" />
            <path d="M148 33 Q160 20 167 36" stroke="#c8d0e0" strokeWidth="1.5" fill="none" />
            <path d="M195 33 Q205 20 214 35" stroke="#c8d0e0" strokeWidth="1.5" fill="none" />
            <path d="M238 44 Q247 32 255 46" stroke="#c8d0e0" strokeWidth="1.5" fill="none" />
            <path d="M276 62 Q283 48 292 58" stroke="#c8d0e0" strokeWidth="1.5" fill="none" />
            <text x="180" y="156" textAnchor="middle" fontFamily="'Space Mono',monospace" fontSize="13" fontWeight="600" fill="#1B6B3A" letterSpacing="2">20/20</text>
          </svg>
          <LeadCard cityKey={cityKey} />
        </div>

        <div className="hero-rest">
          <ul className="hero-bullets">
            <li>Bladeless, Contoura &amp; SMILE — matched to your eyes</li>
            <li>Fellowship-trained ophthalmologists perform every procedure</li>
            <li>Free pre-LASIK screening to confirm candidacy</li>
            <li>Transparent pricing discussed after your screening</li>
          </ul>
          <div className="hero-actions">
            <button className="btn-hero" onClick={scrollToForm}>Book Free Screening</button>
          </div>
          <div className="hero-badges">
            <span className="badge"><span className="badge-dot" />NABH-accredited</span>
            <span className="badge"><span className="badge-dot" />Bladeless &amp; Contoura LASIK</span>
            <span className="badge"><span className="badge-dot" />Outpatient procedure</span>
          </div>
        </div>
      </section>

      {/* ── TRUST BAR ── */}
      <div className="trust">
        <span className="trust-item">⭐ 4.9 avg patient rating</span>
        <span className="trust-item">Fellowship-trained surgeons</span>
        <span className="trust-item">Transparent pricing</span>
      </div>

      {/* ── STATS ── */}
      <div className="stats">
        <div className="stat"><span className="stat-val">22,000+</span><span className="stat-lbl">Procedures performed</span></div>
        <div className="stat"><span className="stat-val">14+</span><span className="stat-lbl">Years in practice</span></div>
        <div className="stat"><span className="stat-val">98%</span><span className="stat-lbl">Patient satisfaction</span></div>
        <div className="stat"><span className="stat-val">~20 min</span><span className="stat-lbl">Procedure time</span></div>
        <div className="stat"><span className="stat-val">7</span><span className="stat-lbl">Cities</span></div>
      </div>

      {/* ── BENEFITS ── */}
      <section className="section bg-cream" id="benefits">
        <p className="eyebrow">Why LASIK</p>
        <h2 className="section-title">A permanent correction, not another pair of lenses</h2>
        <p className="section-lead">LASIK reshapes the cornea so light focuses correctly on the retina. Here's what that can mean for daily life — though outcomes vary by individual and prescription.</p>
        <div className="benefits-grid">
          {[
            { icon: <IconSun />,    title: "Improved vision",              desc: "Many patients achieve significantly clearer vision after the procedure. Your surgeon will discuss what to expect based on your prescription." },
            { icon: <IconBolt />,   title: "Short procedure time",         desc: "The laser portion of the procedure typically takes about 15–20 minutes per eye, performed under numbing drops." },
            { icon: <IconShield />, title: "Long-lasting correction",      desc: "For most patients, the vision correction is long-lasting. Your surgeon will explain what to expect given your specific eye profile." },
            { icon: <IconUsers />,  title: "Recovery for most is quick",  desc: "Most patients can return to desk work and daily activities within a few days, though this varies by individual." },
            { icon: <IconLayers />, title: "Multiple technology options",  desc: "Bladeless, Contoura, or SMILE — we assess your eye and discuss which technology is suitable for your needs." },
            { icon: <IconLoop />,   title: "Structured aftercare",        desc: "Scheduled follow-ups are part of the process, supporting your recovery through every stage." },
          ].map((b) => (
            <div key={b.title} className="benefit-card">
              <div className="benefit-icon">{b.icon}</div>
              <h3>{b.title}</h3>
              <p>{b.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── TECHNOLOGY ── */}
      <section className="section tech-section" id="technology">
        <p className="eyebrow">The Technology</p>
        <h2 className="section-title">Three approaches — matched to your eye</h2>
        <p className="section-lead">Not every eye suits the same method. Your pre-operative screening determines which technology is appropriate for you.</p>
        <div className="tech-grid">
          {[
            { badge: "Commonly chosen",    name: "Bladeless LASIK", tagline: "All-laser, no blade.",                          desc: "A femtosecond laser creates the corneal flap and an excimer laser reshapes it — a precise, well-established approach suited to most prescriptions." },
            { badge: "Topography-guided",  name: "Contoura Vision", tagline: "Guided by your cornea's unique surface map.",   desc: "Over 22,000 data points of your cornea shape the treatment, addressing irregularities that standard glasses cannot correct." },
            { badge: "Minimally invasive", name: "SMILE",           tagline: "Flapless, smaller incision.",                  desc: "A keyhole-sized opening is used to reshape the cornea without creating a flap. Suitability depends on prescription and corneal thickness." },
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

      {/* ── TESTIMONIALS ── */}
      <section className="section bg-cream">
        <p className="eyebrow">Patient Stories</p>
        <h2 className="section-title">Experiences shared by our patients in {city.name}</h2>
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

      {/* ── PROCESS ── */}
      <section className="section process-section" id="process">
        <p className="eyebrow">What To Expect</p>
        <h2 className="section-title">From first call to your follow-up</h2>
        <p className="section-lead">A clear, step-by-step process with no surprises along the way.</p>
        <div className="process-grid">
          {[
            { n: "01", title: "Initial consultation",   desc: "We get in touch to understand your eyes, your lifestyle, and to answer your questions before anything else." },
            { n: "02", title: "Detailed eye screening", desc: "A thorough pre-LASIK workup confirms whether you are a suitable candidate and which technology is appropriate for your eyes." },
            { n: "03", title: "The LASIK procedure",    desc: "A precise laser procedure performed by a senior surgeon. Duration varies but typically takes around 15–20 minutes per eye." },
            { n: "04", title: "Recovery and follow-up", desc: "Scheduled check-ins at defined intervals ensure your eyes are healing as expected." },
          ].map((s) => (
            <div key={s.n} className="process-step">
              <div className="process-num">{s.n}</div>
              <h4>{s.title}</h4>
              <p>{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── WHY ── */}
      <section className="section">
        <p className="eyebrow">Why This Clinic</p>
        <h2 className="section-title">What we focus on</h2>
        <p className="section-lead">Here's what we believe matters most — and what shapes how we work with every patient.</p>
        <div className="why-grid">
          {[
            { icon: <IconLayers />, title: "Multiple technologies available",   desc: "Bladeless, Contoura, and SMILE under one roof — the right fit is decided after your screening." },
            { icon: <IconShield />, title: "Senior surgeons perform every case", desc: "Fellowship-trained ophthalmologists are responsible for each procedure." },
            { icon: <IconBolt />,   title: "Pricing discussed after screening",  desc: "A clear quote is provided after your pre-operative assessment — no figures committed before we know your eyes." },
            { icon: <IconLoop />,   title: "Structured recovery support",        desc: "Follow-up appointments are scheduled as part of your care, not an afterthought." },
          ].map((w) => (
            <div key={w.title} className="why-card">
              <div className="why-icon">{w.icon}</div>
              <div><h4>{w.title}</h4><p>{w.desc}</p></div>
            </div>
          ))}
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="section bg-cream" id="faq-anchor">
        <p className="eyebrow">Common Questions</p>
        <h2 className="section-title">Answers to questions most patients ask</h2>
        <FaqList />
      </section>

      {/* ── CLOSING CTA ── */}
      <section className="closing">
        <h2>{city.closingHeadline}</h2>
        <p>{city.closingSub}</p>
        <LeadStrip cityKey={cityKey} />
      </section>

      {/* ── FOOTER ── */}
      <footer className="footer">
        <div className="footer-logo">
          <Image src="/vv.png" alt="Healvia Eye Care" width={160} height={42} style={{ height: "36px", width: "auto" }} />
        </div>
        <p className="footer-note">© 2025 Healvia Eye Care · {city.name}. All rights reserved.</p>
      </footer>
    </>
  );
}