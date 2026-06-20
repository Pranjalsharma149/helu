"use client";

import { useState, useEffect, useRef } from "react";

// ─── Lead Form Card ────────────────────────────────────────────────────────
function LeadCard() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [nameError, setNameError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  function validatePhone(value: string) {
    const cleaned = value.replace(/\D/g, "");
    if (!cleaned) return "Mobile number is required";
    if (cleaned.length !== 10) return "Enter a valid 10-digit number";
    if (!/^[6-9]/.test(cleaned)) return "Enter a valid Indian mobile number";
    const fakePatterns = [/^(\d)\1{9}$/, /^1234567890$/, /^0987654321$/, /^9876543210$/];
    if (fakePatterns.some((p) => p.test(cleaned))) return "Please enter a real number";
    return "";
  }

  function handlePhoneChange(e: React.ChangeEvent<HTMLInputElement>) {
    const val = e.target.value.replace(/[^\d\s\-+()]/g, "");
    setPhone(val);
    if (phoneError) setPhoneError(validatePhone(val));
  }

  async function handleSubmit(e: React.FormEvent) {
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
        body: JSON.stringify({
          name: name.trim(),
          phone,
          service: "LASIK",
          source: "lasik-gurugram-landing",
        }),
      });
      const data = await res.json();
      if (res.ok || data.duplicate) {
        setStatus("success");
        setMessage(data.message || "Our specialist will call you shortly.");
      } else {
        setStatus("error");
        setMessage(data.error || "Something went wrong. Please try again.");
      }
    } catch {
      setStatus("error");
      setMessage("Unable to connect. Please call us directly.");
    }
  }

  return (
    <div className="lead-card">
      <div className="lead-card-badge">Free Consultation</div>
      <h3 className="lead-card-title">Check Your LASIK Eligibility</h3>
      <p className="lead-card-sub">Our eye specialist will call you within minutes</p>

      {status === "success" ? (
        <div className="success-state">
          <div className="success-icon">✦</div>
          <p className="success-msg">{message}</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} noValidate>
          <div className="field-group">
            <label htmlFor="name">Your Name</label>
            <input
              id="name"
              type="text"
              placeholder="Rahul Sharma"
              value={name}
              onChange={(e) => { setName(e.target.value); if (nameError) setNameError(""); }}
              className={nameError ? "input-error" : ""}
            />
            {nameError && <span className="err">{nameError}</span>}
          </div>

          <div className="field-group">
            <label htmlFor="phone">Mobile Number</label>
            <input
              id="phone"
              type="tel"
              placeholder="9876543210"
              value={phone}
              onChange={handlePhoneChange}
              maxLength={14}
              className={phoneError ? "input-error" : ""}
            />
            {phoneError && <span className="err">{phoneError}</span>}
          </div>

          {status === "error" && <p className="api-error">{message}</p>}

          <button type="submit" className="cta-btn" disabled={status === "loading"}>
            {status === "loading" ? (
              <span className="spinner-wrap"><span className="spinner" /> Booking...</span>
            ) : (
              "Book Free Eye Check →"
            )}
          </button>

          <p className="privacy-note">🔒 Your information is kept private</p>
        </form>
      )}
    </div>
  );
}

// ─── Floating Eye SVG ──────────────────────────────────────────────────────
function EyeOrb() {
  return (
    <svg viewBox="0 0 400 220" fill="none" xmlns="http://www.w3.org/2000/svg" className="eye-svg">
      <defs>
        <radialGradient id="irisGrad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#1B4FA8" />
          <stop offset="40%" stopColor="#0D2E6B" />
          <stop offset="100%" stopColor="#091A3E" />
        </radialGradient>
        <radialGradient id="glowGrad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#D4AF37" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#D4AF37" stopOpacity="0" />
        </radialGradient>
        <filter id="blur1">
          <feGaussianBlur stdDeviation="8" />
        </filter>
      </defs>
      {/* Glow */}
      <ellipse cx="200" cy="110" rx="160" ry="80" fill="url(#glowGrad)" filter="url(#blur1)" />
      {/* Eyelid shape */}
      <path d="M40 110 Q200 20 360 110 Q200 200 40 110Z" fill="#EBF2FF" stroke="#C5D7F5" strokeWidth="1.5" />
      {/* Iris */}
      <circle cx="200" cy="110" r="58" fill="url(#irisGrad)" />
      {/* Iris rings */}
      <circle cx="200" cy="110" r="58" fill="none" stroke="#2563EB" strokeWidth="1" strokeOpacity="0.4" />
      <circle cx="200" cy="110" r="46" fill="none" stroke="#3B82F6" strokeWidth="0.5" strokeOpacity="0.3" />
      {/* Pupil */}
      <circle cx="200" cy="110" r="26" fill="#050D1F" />
      {/* Gold laser ring */}
      <circle cx="200" cy="110" r="62" fill="none" stroke="#D4AF37" strokeWidth="2" strokeDasharray="6 4" strokeOpacity="0.7">
        <animateTransform attributeName="transform" type="rotate" from="0 200 110" to="360 200 110" dur="8s" repeatCount="indefinite" />
      </circle>
      {/* Catchlight */}
      <ellipse cx="218" cy="93" rx="10" ry="6" fill="white" fillOpacity="0.6" transform="rotate(-20 218 93)" />
      <circle cx="185" cy="100" r="3" fill="white" fillOpacity="0.3" />
      {/* Lashes top */}
      {[60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((x, i) => {
        const y1 = x < 200 ? 110 - Math.sqrt(Math.max(0, 14400 - (x - 200) ** 2)) * 0.85 : 110 - Math.sqrt(Math.max(0, 14400 - (x - 200) ** 2)) * 0.85;
        const y0 = y1 - 12 - (i % 3 === 1 ? 5 : 0);
        return <line key={x} x1={x} y1={y1} x2={x} y2={y0} stroke="#1a2e5a" strokeWidth="1.5" strokeLinecap="round" />;
      })}
    </svg>
  );
}

// ─── Stat Counter ──────────────────────────────────────────────────────────
function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="stat-item">
      <span className="stat-value">{value}</span>
      <span className="stat-label">{label}</span>
    </div>
  );
}

// ─── Process Step ──────────────────────────────────────────────────────────
function Step({ icon, title, desc }: { icon: string; title: string; desc: string }) {
  return (
    <div className="step-card">
      <div className="step-icon">{icon}</div>
      <h4 className="step-title">{title}</h4>
      <p className="step-desc">{desc}</p>
    </div>
  );
}

// ─── Main Page ─────────────────────────────────────────────────────────────
export default function LasikPage() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <>
      <style>{`
        /* ── Tokens ── */
        :root {
          --navy:    #0D2E6B;
          --royal:   #1B4FA8;
          --sky:     #EBF2FF;
          --gold:    #D4AF37;
          --gold-lt: #F0D97A;
          --white:   #FFFFFF;
          --slate:   #4A5568;
          --mist:    #F7F9FC;
          --radius:  12px;
        }

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        body { font-family: 'Georgia', serif; background: var(--white); color: var(--navy); }

        /* ── Hero ── */
        .hero {
          min-height: 100vh;
          background: linear-gradient(135deg, #091A3E 0%, #0D2E6B 55%, #1B4FA8 100%);
          display: grid;
          grid-template-columns: 1fr 420px;
          gap: 48px;
          align-items: center;
          padding: 120px 6vw 80px;
          position: relative;
          overflow: hidden;
        }
        .hero::before {
          content: '';
          position: absolute;
          inset: 0;
          background: radial-gradient(ellipse 60% 70% at 30% 50%, rgba(212,175,55,0.07) 0%, transparent 70%),
                      radial-gradient(ellipse 40% 40% at 80% 20%, rgba(255,255,255,0.04) 0%, transparent 60%);
          pointer-events: none;
        }

        .hero-left { z-index: 1; }

        .eyebrow {
          display: inline-flex; align-items: center; gap: 8px;
          background: rgba(212,175,55,0.15);
          border: 1px solid rgba(212,175,55,0.4);
          color: var(--gold-lt);
          font-family: 'Arial', sans-serif;
          font-size: 12px; font-weight: 600; letter-spacing: 2px;
          text-transform: uppercase;
          padding: 6px 16px; border-radius: 100px;
          margin-bottom: 28px;
        }
        .eyebrow::before { content: '✦'; font-size: 10px; }

        .hero-headline {
          font-size: clamp(36px, 5vw, 64px);
          font-weight: 400;
          line-height: 1.1;
          color: var(--white);
          margin-bottom: 10px;
        }
        .hero-headline em {
          font-style: normal;
          color: var(--gold);
          position: relative;
        }
        .hero-headline em::after {
          content: '';
          position: absolute;
          bottom: -4px; left: 0; right: 0; height: 2px;
          background: linear-gradient(90deg, var(--gold), transparent);
        }

        .hero-sub {
          font-family: 'Arial', sans-serif;
          font-size: 18px; line-height: 1.7;
          color: rgba(255,255,255,0.75);
          max-width: 480px;
          margin: 24px 0 40px;
        }

        .hero-badges {
          display: flex; gap: 12px; flex-wrap: wrap;
        }
        .badge {
          display: flex; align-items: center; gap: 8px;
          background: rgba(255,255,255,0.08);
          border: 1px solid rgba(255,255,255,0.15);
          color: rgba(255,255,255,0.9);
          font-family: 'Arial', sans-serif;
          font-size: 13px; padding: 8px 16px;
          border-radius: 8px;
        }
        .badge-icon { font-size: 16px; }

        .eye-svg { width: 100%; max-width: 400px; display: block; }

        /* ── Stats Bar ── */
        .stats-bar {
          background: var(--white);
          border-bottom: 1px solid #E2EAF4;
          padding: 28px 6vw;
          display: flex; justify-content: space-around; flex-wrap: wrap; gap: 24px;
        }
        .stat-item { text-align: center; }
        .stat-value {
          display: block;
          font-size: 34px; font-weight: 700;
          color: var(--royal);
          line-height: 1;
        }
        .stat-label {
          display: block;
          font-family: 'Arial', sans-serif;
          font-size: 13px; color: var(--slate);
          margin-top: 4px; letter-spacing: 0.5px;
        }

        /* ── Why Section ── */
        .why-section {
          background: var(--mist);
          padding: 88px 6vw;
        }
        .section-eyebrow {
          font-family: 'Arial', sans-serif;
          font-size: 12px; font-weight: 700; letter-spacing: 2.5px;
          text-transform: uppercase;
          color: var(--royal); margin-bottom: 12px;
        }
        .section-title {
          font-size: clamp(28px, 3.5vw, 44px);
          font-weight: 400; line-height: 1.2;
          color: var(--navy); margin-bottom: 16px;
        }
        .section-title strong { color: var(--royal); }
        .section-lead {
          font-family: 'Arial', sans-serif;
          font-size: 17px; line-height: 1.7;
          color: var(--slate); max-width: 560px;
          margin-bottom: 56px;
        }

        .benefits-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
          gap: 24px;
        }
        .benefit-card {
          background: var(--white);
          border: 1px solid #E2EAF4;
          border-radius: var(--radius);
          padding: 32px 28px;
          transition: transform 0.2s, box-shadow 0.2s;
        }
        .benefit-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 40px rgba(13,46,107,0.1);
        }
        .benefit-icon { font-size: 32px; margin-bottom: 16px; display: block; }
        .benefit-title {
          font-size: 18px; font-weight: 600;
          color: var(--navy); margin-bottom: 8px;
        }
        .benefit-desc {
          font-family: 'Arial', sans-serif;
          font-size: 14px; line-height: 1.7;
          color: var(--slate);
        }

        /* ── Process ── */
        .process-section {
          background: var(--navy);
          padding: 88px 6vw;
          text-align: center;
        }
        .process-section .section-eyebrow { color: var(--gold-lt); }
        .process-section .section-title { color: var(--white); text-align: center; }
        .steps-row {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 32px; margin-top: 56px;
          position: relative;
        }
        .step-card {
          background: rgba(255,255,255,0.06);
          border: 1px solid rgba(255,255,255,0.12);
          border-radius: var(--radius);
          padding: 36px 24px;
          text-align: center;
        }
        .step-icon { font-size: 36px; margin-bottom: 16px; display: block; }
        .step-title { font-size: 17px; font-weight: 600; color: var(--white); margin-bottom: 8px; }
        .step-desc {
          font-family: 'Arial', sans-serif;
          font-size: 14px; line-height: 1.7;
          color: rgba(255,255,255,0.65);
        }

        /* ── CTA Strip ── */
        .cta-strip {
          background: linear-gradient(135deg, #0D2E6B 0%, #1B4FA8 100%);
          padding: 72px 6vw;
          display: grid;
          grid-template-columns: 1fr auto;
          gap: 40px; align-items: center;
        }
        .cta-strip-title { font-size: clamp(24px, 3vw, 38px); color: var(--white); margin-bottom: 8px; }
        .cta-strip-sub {
          font-family: 'Arial', sans-serif;
          font-size: 16px; color: rgba(255,255,255,0.7);
        }
        .strip-btn {
          background: var(--gold);
          color: var(--navy);
          border: none; cursor: pointer;
          font-family: 'Arial', sans-serif;
          font-weight: 700; font-size: 15px;
          padding: 16px 36px; border-radius: 8px;
          white-space: nowrap;
          transition: background 0.2s, transform 0.15s;
        }
        .strip-btn:hover { background: var(--gold-lt); transform: translateY(-2px); }

        /* ── Lead Card ── */
        .lead-card {
          background: var(--white);
          border-radius: 20px;
          padding: 40px 36px;
          box-shadow: 0 24px 80px rgba(13,46,107,0.18);
          position: relative;
          z-index: 2;
          border: 1px solid rgba(212,175,55,0.2);
        }
        .lead-card-badge {
          display: inline-block;
          background: linear-gradient(90deg, var(--gold), var(--gold-lt));
          color: var(--navy);
          font-family: 'Arial', sans-serif;
          font-size: 11px; font-weight: 700;
          letter-spacing: 1.5px; text-transform: uppercase;
          padding: 5px 14px; border-radius: 100px;
          margin-bottom: 20px;
        }
        .lead-card-title {
          font-size: 22px; font-weight: 600;
          color: var(--navy); margin-bottom: 6px;
        }
        .lead-card-sub {
          font-family: 'Arial', sans-serif;
          font-size: 14px; color: var(--slate);
          margin-bottom: 28px;
        }

        .field-group { margin-bottom: 18px; }
        .field-group label {
          display: block;
          font-family: 'Arial', sans-serif;
          font-size: 13px; font-weight: 600;
          color: var(--navy); margin-bottom: 6px;
          letter-spacing: 0.3px;
        }
        .field-group input {
          width: 100%;
          padding: 12px 16px;
          border: 1.5px solid #CBD5E0;
          border-radius: 8px;
          font-family: 'Arial', sans-serif;
          font-size: 15px; color: var(--navy);
          outline: none; transition: border-color 0.2s;
          background: #FAFBFF;
        }
        .field-group input:focus { border-color: var(--royal); background: var(--white); }
        .field-group input.input-error { border-color: #E53E3E; }
        .err {
          display: block; margin-top: 4px;
          font-family: 'Arial', sans-serif;
          font-size: 12px; color: #E53E3E;
        }

        .cta-btn {
          width: 100%;
          background: linear-gradient(135deg, var(--royal) 0%, var(--navy) 100%);
          color: var(--white);
          border: none; cursor: pointer;
          font-family: 'Arial', sans-serif;
          font-weight: 700; font-size: 16px;
          padding: 16px; border-radius: 10px;
          margin-top: 8px;
          transition: opacity 0.2s, transform 0.15s;
          position: relative; overflow: hidden;
        }
        .cta-btn::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(212,175,55,0.15), transparent);
        }
        .cta-btn:hover:not(:disabled) { transform: translateY(-2px); opacity: 0.93; }
        .cta-btn:disabled { opacity: 0.7; cursor: not-allowed; }

        .spinner-wrap { display: flex; align-items: center; justify-content: center; gap: 10px; }
        .spinner {
          width: 16px; height: 16px;
          border: 2px solid rgba(255,255,255,0.3);
          border-top-color: white;
          border-radius: 50%;
          animation: spin 0.7s linear infinite;
          display: inline-block;
        }
        @keyframes spin { to { transform: rotate(360deg); } }

        .privacy-note {
          font-family: 'Arial', sans-serif;
          font-size: 12px; color: #718096;
          text-align: center; margin-top: 14px;
        }
        .api-error {
          background: #FFF5F5; border: 1px solid #FEB2B2;
          color: #C53030;
          font-family: 'Arial', sans-serif; font-size: 13px;
          padding: 10px 14px; border-radius: 8px;
          margin-bottom: 12px;
        }

        .success-state { text-align: center; padding: 24px 0; }
        .success-icon {
          font-size: 48px; color: var(--gold);
          display: block; margin-bottom: 16px;
          animation: pop 0.4s ease;
        }
        @keyframes pop { from { transform: scale(0); } to { transform: scale(1); } }
        .success-msg {
          font-family: 'Arial', sans-serif;
          font-size: 17px; color: var(--navy);
          line-height: 1.6;
        }

        /* ── Trust Bar ── */
        .trust-bar {
          background: var(--sky);
          border-top: 1px solid #DCEAF8;
          border-bottom: 1px solid #DCEAF8;
          padding: 20px 6vw;
          display: flex; justify-content: center;
          align-items: center; gap: 40px; flex-wrap: wrap;
        }
        .trust-item {
          font-family: 'Arial', sans-serif;
          font-size: 13px; color: var(--navy);
          display: flex; align-items: center; gap: 6px;
          font-weight: 500;
        }

        /* ── Responsive ── */
        @media (max-width: 900px) {
          .hero {
            grid-template-columns: 1fr;
            padding: 100px 5vw 60px;
            text-align: center;
          }
          .hero-badges { justify-content: center; }
          .hero-sub { margin-inline: auto; }
          .eye-svg { max-width: 300px; margin: 0 auto; }
          .cta-strip {
            grid-template-columns: 1fr;
            text-align: center;
          }
          .strip-btn { width: 100%; }
        }
        @media (max-width: 600px) {
          .lead-card { padding: 28px 20px; }
          .stats-bar { gap: 16px; }
          .stat-value { font-size: 26px; }
        }
      `}</style>

      {/* ── HERO ─────────────────────────────────────────── */}
      <section className="hero">
        <div className="hero-left">
          <span className="eyebrow">Gurugram's Eye Care Specialists</span>
          <h1 className="hero-headline">
            Life Without<br />
            <em>Glasses or Lenses</em><br />
            Starts Here
          </h1>
          <p className="hero-sub">
            Advanced LASIK surgery performed by experienced ophthalmologists.
            Most patients see clearly by the very next morning.
          </p>
          <div className="hero-badges">
            <span className="badge"><span className="badge-icon">🏥</span> NABH Accredited</span>
            <span className="badge"><span className="badge-icon">👁️</span> Blade-Free LASIK</span>
            <span className="badge"><span className="badge-icon">✅</span> 15 Min Procedure</span>
          </div>
        </div>

        <div>
          <EyeOrb />
          <LeadCard />
        </div>
      </section>

      {/* ── TRUST BAR ─────────────────────────────────────── */}
      <div className="trust-bar">
        <span className="trust-item">⭐ 4.9 Patient Rating</span>
        <span className="trust-item">🏆 Most Trusted Eye Care in Gurugram</span>
        <span className="trust-item">👨‍⚕️ Senior Ophthalmologists</span>
        <span className="trust-item">🔬 Latest Laser Technology</span>
      </div>

      {/* ── STATS ─────────────────────────────────────────── */}
      <div className="stats-bar">
        <Stat value="20,000+" label="Procedures Performed" />
        <Stat value="15 min" label="Surgery Duration" />
        <Stat value="99%" label="Patient Satisfaction" />
        <Stat value="Next Day" label="Return to Work" />
      </div>

      {/* ── WHY LASIK ─────────────────────────────────────── */}
      <section className="why-section">
        <p className="section-eyebrow">Why Choose LASIK</p>
        <h2 className="section-title">A Permanent Solution for <strong>Clear Vision</strong></h2>
        <p className="section-lead">
          LASIK is the world's most performed vision correction procedure.
          It permanently reshapes the cornea so light focuses correctly on your retina.
        </p>
        <div className="benefits-grid">
          {[
            { icon: "🌅", title: "Wake Up Seeing Clearly", desc: "Most patients achieve 6/6 or better vision within 24 hours of the procedure." },
            { icon: "⚡", title: "Quick & Painless", desc: "The entire procedure takes about 15 minutes. No injections, no stitches." },
            { icon: "♾️", title: "Long-Lasting Results", desc: "LASIK permanently corrects your vision. Most patients never need glasses again." },
            { icon: "🏃", title: "Back to Life Quickly", desc: "Resume driving, work, and normal activities within a day or two." },
            { icon: "🔬", title: "Blade-Free Technology", desc: "We use all-laser, blade-free LASIK for maximum precision and safety." },
            { icon: "🛡️", title: "Full Aftercare Support", desc: "Follow-up visits and aftercare included. We are with you every step." },
          ].map((b) => (
            <div key={b.title} className="benefit-card">
              <span className="benefit-icon">{b.icon}</span>
              <h3 className="benefit-title">{b.title}</h3>
              <p className="benefit-desc">{b.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── PROCESS ───────────────────────────────────────── */}
      <section className="process-section">
        <p className="section-eyebrow">What to Expect</p>
        <h2 className="section-title">Your Journey to Clear Vision</h2>
        <div className="steps-row">
          <Step icon="📞" title="Free Consultation Call" desc="Our team calls you within minutes to understand your vision needs and answer questions." />
          <Step icon="🔍" title="Detailed Eye Screening" desc="A thorough pre-LASIK evaluation checks if you are the right candidate for the procedure." />
          <Step icon="👁️" title="The LASIK Procedure" desc="A precise 15-minute, blade-free laser procedure performed by our senior surgeon." />
          <Step icon="✨" title="Clear Vision Next Morning" desc="Wake up, see the world clearly. Follow-up care ensures your eyes heal perfectly." />
        </div>
      </section>

      {/* ── CTA STRIP ─────────────────────────────────────── */}
      <section className="cta-strip">
        <div>
          <h2 className="cta-strip-title">Ready to See Life More Clearly?</h2>
          <p className="cta-strip-sub">Book a free eye screening with our specialists today. No obligation, just clarity.</p>
        </div>
        <button className="strip-btn" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
          Get Free Consultation →
        </button>
      </section>
    </>
  );
}