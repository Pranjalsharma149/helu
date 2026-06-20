"use client";

import { useState, useEffect } from "react";

/* ============================================================
   MODERN ICON SET — Bold, contemporary style
   ============================================================ */
const IconVision = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon-svg">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8Z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

const IconClock = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon-svg">
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
);

const IconShield = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon-svg">
    <path d="M12 22s-8-4-8-10V5l8-3 8 3v7c0 6-8 10-8 10Z" />
    <path d="M9 12l2 2 4-4" />
  </svg>
);

const IconLens = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon-svg">
    <circle cx="12" cy="12" r="7" />
    <circle cx="12" cy="12" r="3" />
    <path d="M12 1v4M12 19v4M23 12h-4M5 12H1M19.1 4.9l-2.8 2.8M7.7 16.3l-2.8 2.8M4.9 19.1l2.8-2.8M16.3 7.7l2.8-2.8" />
  </svg>
);

const IconStar = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="icon-svg">
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2Z" />
  </svg>
);

const IconCheck = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="icon-svg">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const IconCity = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon-svg">
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Z" />
    <polyline points="9 22 9 12 15 12 15 22" />
    <rect x="3" y="5" width="3" height="3" />
    <rect x="9" y="5" width="3" height="3" />
    <rect x="15" y="5" width="3" height="3" />
  </svg>
);

const IconTrendUp = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon-svg">
    <polyline points="23 6 13.5 15.5 8.5 10.5 1 17" />
    <polyline points="17 6 23 6 23 12" />
  </svg>
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
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name.trim(), phone, service: "Cataract", source }),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok || data.duplicate) {
        setStatus("success");
        setMessage(data.message || "Got it — our team will call you shortly.");
      } else {
        setStatus("error");
        setMessage(data.error || "Something went wrong. Please try again.");
      }
    } catch {
      setStatus("error");
      setMessage("Unable to connect. Please call us directly.");
    }
  }

  return { name, phone, nameError, phoneError, status, message, handleNameChange, handlePhoneChange, handleSubmit };
}

function HeroForm() {
  const f = useLeadForm();
  return (
    <div className="hero-form-card">
      <div className="form-header">
        <h3>Free Vision Check</h3>
        <p>See if you're ready for cataract surgery</p>
      </div>

      {f.status === "success" ? (
        <div className="form-success-state">
          <div className="success-icon"><IconCheck /></div>
          <p className="success-title">Thank you!</p>
          <p className="success-msg">{f.message}</p>
        </div>
      ) : (
        <form onSubmit={(e) => f.handleSubmit(e, "cataract-mumbai-hero")} noValidate className="hero-form">
          <div className="form-field">
            <input 
              id="hero-name" 
              type="text" 
              placeholder="Your name" 
              value={f.name} 
              onChange={f.handleNameChange} 
              className={f.nameError ? "input-error" : ""} 
              aria-label="Your name"
            />
            {f.nameError && <span className="field-error">{f.nameError}</span>}
          </div>

          <div className="form-field">
            <input 
              id="hero-phone" 
              type="tel" 
              placeholder="Mobile number" 
              value={f.phone} 
              onChange={f.handlePhoneChange} 
              maxLength={14}
              className={f.phoneError ? "input-error" : ""}
              aria-label="Mobile number"
            />
            {f.phoneError && <span className="field-error">{f.phoneError}</span>}
          </div>

          {f.status === "error" && <p className="form-error-msg">{f.message}</p>}

          <button type="submit" className="btn-submit" disabled={f.status === "loading"}>
            {f.status === "loading" ? (
              <><span className="spinner"></span> Booking...</>
            ) : (
              "Get Free Screening"
            )}
          </button>

          <p className="form-disclaimer">✓ No spam • ✓ Confidential • ✓ Same-day callback</p>
        </form>
      )}
    </div>
  );
}

function StatCard({ value, label, icon }: { value: string; label: string; icon: React.ReactNode }) {
  return (
    <div className="stat-card">
      <div className="stat-icon">{icon}</div>
      <div className="stat-content">
        <div className="stat-value">{value}</div>
        <div className="stat-label">{label}</div>
      </div>
    </div>
  );
}

function BenefitCard({ icon, title, desc }: { icon: React.ReactNode; title: string; desc: string }) {
  return (
    <div className="benefit-card">
      <div className="benefit-icon">{icon}</div>
      <h4>{title}</h4>
      <p>{desc}</p>
    </div>
  );
}

function ProcedureCard({ title, desc, features }: { title: string; desc: string; features: string[] }) {
  return (
    <div className="procedure-card">
      <h4>{title}</h4>
      <p className="procedure-desc">{desc}</p>
      <ul className="procedure-features">
        {features.map((f, i) => (
          <li key={i}><IconCheck /> {f}</li>
        ))}
      </ul>
    </div>
  );
}

function TestimonialCard({ quote, name, role, rating }: { quote: string; name: string; role: string; rating: number }) {
  return (
    <div className="testimonial-card">
      <div className="testimonial-stars">
        {[...Array(rating)].map((_, i) => (
          <IconStar key={i} />
        ))}
      </div>
      <p className="testimonial-quote">"{quote}"</p>
      <p className="testimonial-author">{name}</p>
      <p className="testimonial-role">{role}</p>
    </div>
  );
}

function FaqItem({ q, a, open, onToggle }: { q: string; a: string; open: boolean; onToggle: () => void }) {
  return (
    <div className={`faq-item ${open ? "faq-open" : ""}`}>
      <button className="faq-button" onClick={onToggle} aria-expanded={open}>
        <span className="faq-q">{q}</span>
        <span className="faq-toggle">{open ? "−" : "+"}</span>
      </button>
      {open && <p className="faq-a">{a}</p>}
    </div>
  );
}

const BENEFITS = [
  { icon: <IconVision />, title: "Clear Vision Fast", desc: "See 6/6 or better within 24 hours" },
  { icon: <IconClock />, title: "15-Minute Procedure", desc: "Painless, quick, blade-free surgery" },
  { icon: <IconShield />, title: "Lifetime Results", desc: "Once removed, cataracts never return" },
  { icon: <IconLens />, title: "Lens Choices", desc: "Monofocal, toric, or multifocal lenses" },
  { icon: <IconTrendUp />, title: "99% Success Rate", desc: "Mumbai's most trusted cataract centre" },
  { icon: <IconCity />, title: "5 Locations in Mumbai", desc: "Find a centre nearest to you" },
];

const PROCEDURES = [
  {
    title: "Phacoemulsification",
    desc: "The gold standard. Ultrasound breaks the cataract through a 2.8mm incision.",
    features: ["No stitches needed", "Self-sealing wound", "Fastest recovery"]
  },
  {
    title: "Laser-Assisted Surgery",
    desc: "Computer-guided laser for maximum precision and minimal trauma.",
    features: ["Advanced precision", "Reduced energy used", "Best for dense cataracts"]
  },
  {
    title: "Manual SICS",
    desc: "Slightly larger incision for very advanced cases. Same-day recovery.",
    features: ["For advanced cataracts", "Proven technique", "High success rate"]
  }
];

const TESTIMONIALS = [
  { quote: "I couldn't read my phone without squinting. Next morning, everything was crystal clear. Changed my life.", name: "Vikram S.", role: "Investment Banker", rating: 5 },
  { quote: "The team was transparent about lens options. Didn't feel pressured into premium choices I didn't need.", name: "Priya M.", role: "Homemaker", rating: 5 },
  { quote: "Recovery was faster than expected. Follow-up calls made me feel genuinely cared for, not just another patient.", name: "Rajesh P.", role: "Retired Executive", rating: 5 },
];

const FAQS = [
  { q: "Is cataract surgery painful?", a: "No. Anaesthetic drops numb your eye completely. You may feel gentle pressure, but no pain. Mild grittiness for a day or two is normal and resolves quickly." },
  { q: "How quickly will I see clearly?", a: "Vision usually improves dramatically within 24 hours. Full stabilisation takes 4–6 weeks, but most patients return to work within a few days." },
  { q: "What lens should I choose?", a: "Monofocal lenses are standard and excellent. Toric lenses correct astigmatism. Multifocal lenses reduce glasses dependence. We recommend based on your lifestyle, not price." },
  { q: "Do I need surgery in both eyes?", a: "Usually yes, but typically spaced 1–2 weeks apart so you adjust to the first eye's improved vision before the second surgery." },
  { q: "Will I need glasses after surgery?", a: "Depends on your lens choice. Multifocal lenses may eliminate glasses for most activities. Monofocal may need glasses for reading. We discuss this before surgery." },
  { q: "How much does it cost?", a: "Costs depend on lens choice and any eye conditions. You get one clear quote after your free screening — no hidden charges, ever." },
];

const AREAS = ["Bandra", "Worli", "Andheri", "Powai", "Thane"];

/* ============================================================
   PAGE
   ============================================================ */
export default function MumbaiCataractPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  function scrollToForm() {
    document.getElementById("form-anchor")?.scrollIntoView({ behavior: "smooth", block: "center" });
    document.getElementById("hero-name")?.focus();
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@500;600;700;800&family=Inter:wght@400;500;600&display=swap');

        :root {
          --primary: #001F3F;
          --accent: #FFB800;
          --accent-light: #FFD633;
          --dark: #0A0E27;
          --light: #F8F9FF;
          --white: #FFFFFF;
          --gray: #6B7280;
          --gray-light: #F3F4F6;
          --success: #10B981;
          --danger: #EF4444;
          --radius-sm: 8px;
          --radius-md: 12px;
          --radius-lg: 16px;
          --shadow-sm: 0 2px 8px rgba(0,31,63,0.08);
          --shadow-md: 0 8px 24px rgba(0,31,63,0.12);
          --shadow-lg: 0 20px 48px rgba(0,31,63,0.16);
          --font-display: 'Poppins', sans-serif;
          --font-body: 'Inter', sans-serif;
        }

        * { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        body { font-family: var(--font-body); color: var(--primary); background: var(--white); }
        h1, h2, h3, h4, h5 { font-family: var(--font-display); font-weight: 700; }
        button { font-family: inherit; }

        .icon-svg {
          width: 24px;
          height: 24px;
        }

        /* ── HERO SECTION ── */
        .hero {
          background: linear-gradient(135deg, var(--primary) 0%, #002E5C 100%);
          color: var(--white);
          padding: 80px 6vw;
          position: relative;
          overflow: hidden;
        }

        .hero::before {
          content: '';
          position: absolute;
          top: -50%;
          right: -10%;
          width: 600px;
          height: 600px;
          background: radial-gradient(circle, var(--accent) 0%, transparent 70%);
          opacity: 0.1;
          border-radius: 50%;
          pointer-events: none;
        }

        .hero-container {
          display: grid;
          grid-template-columns: 1.2fr 1fr;
          gap: 60px;
          align-items: center;
          position: relative;
          z-index: 1;
        }

        .hero-content h1 {
          font-size: clamp(36px, 5vw, 56px);
          line-height: 1.2;
          margin-bottom: 20px;
        }

        .hero-content h1 em {
          font-style: normal;
          color: var(--accent);
          display: inline-block;
        }

        .hero-content p {
          font-size: 18px;
          line-height: 1.6;
          opacity: 0.9;
          margin-bottom: 32px;
          max-width: 500px;
        }

        .hero-badges {
          display: flex;
          gap: 12px;
          margin-bottom: 40px;
          flex-wrap: wrap;
        }

        .badge {
          background: rgba(255, 184, 0, 0.15);
          border: 1px solid var(--accent);
          color: var(--accent);
          padding: 8px 14px;
          border-radius: 100px;
          font-size: 12px;
          font-weight: 600;
          letter-spacing: 0.5px;
        }

        .hero-cta {
          display: inline-flex;
          gap: 14px;
          flex-wrap: wrap;
        }

        .btn-primary {
          background: var(--accent);
          color: var(--primary);
          border: none;
          padding: 14px 32px;
          border-radius: var(--radius-md);
          font-weight: 700;
          font-size: 15px;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 8px 24px rgba(255, 184, 0, 0.3);
        }

        .btn-primary:hover {
          transform: translateY(-3px);
          box-shadow: 0 12px 36px rgba(255, 184, 0, 0.4);
          background: var(--accent-light);
        }

        .btn-secondary {
          background: transparent;
          color: var(--white);
          border: 2px solid var(--white);
          padding: 12px 30px;
          border-radius: var(--radius-md);
          font-weight: 600;
          font-size: 15px;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .btn-secondary:hover {
          background: var(--white);
          color: var(--primary);
        }

        /* HERO FORM CARD */
        .hero-form-card {
          background: var(--white);
          border-radius: var(--radius-lg);
          padding: 36px;
          box-shadow: var(--shadow-lg);
          position: relative;
          z-index: 2;
        }

        .form-header {
          margin-bottom: 28px;
        }

        .form-header h3 {
          font-size: 22px;
          margin-bottom: 6px;
        }

        .form-header p {
          color: var(--gray);
          font-size: 14px;
        }

        .hero-form {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .form-field {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .form-field input {
          padding: 12px 14px;
          border: 2px solid var(--gray-light);
          border-radius: var(--radius-sm);
          font-size: 15px;
          transition: border-color 0.2s ease;
          font-family: inherit;
        }

        .form-field input:focus {
          outline: none;
          border-color: var(--accent);
          background: #FFF9E6;
        }

        .form-field input.input-error {
          border-color: var(--danger);
        }

        .field-error {
          font-size: 12px;
          color: var(--danger);
        }

        .form-error-msg {
          background: #FEE2E2;
          color: var(--danger);
          padding: 10px 12px;
          border-radius: var(--radius-sm);
          font-size: 13px;
          border-left: 3px solid var(--danger);
        }

        .btn-submit {
          background: var(--primary);
          color: var(--white);
          border: none;
          padding: 13px;
          border-radius: var(--radius-sm);
          font-weight: 700;
          font-size: 15px;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
        }

        .btn-submit:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: var(--shadow-md);
        }

        .btn-submit:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }

        .spinner {
          width: 14px;
          height: 14px;
          border: 2px solid rgba(255,255,255,0.3);
          border-top-color: white;
          border-radius: 50%;
          animation: spin 0.6s linear infinite;
        }

        @keyframes spin { to { transform: rotate(360deg); } }

        .form-disclaimer {
          text-align: center;
          font-size: 12px;
          color: var(--gray);
          margin-top: 12px;
        }

        .form-success-state {
          text-align: center;
          padding: 24px 0;
        }

        .success-icon {
          width: 50px;
          height: 50px;
          background: var(--success);
          color: var(--white);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 16px;
          animation: pop 0.4s ease;
        }

        @keyframes pop { from { transform: scale(0); } to { transform: scale(1); } }

        .success-title {
          font-family: var(--font-display);
          font-size: 18px;
          font-weight: 700;
          margin-bottom: 6px;
        }

        .success-msg {
          color: var(--gray);
          font-size: 14px;
        }

        /* ── TRUST STRIP ── */
        .trust-strip {
          background: var(--light);
          padding: 24px 6vw;
          display: flex;
          justify-content: center;
          gap: 40px;
          flex-wrap: wrap;
          border-bottom: 1px solid #E5E7EB;
        }

        .trust-item {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 14px;
          font-weight: 600;
          color: var(--primary);
        }

        /* ── STATS SECTION ── */
        .stats-section {
          background: var(--white);
          padding: 64px 6vw;
          border-bottom: 1px solid #E5E7EB;
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 20px;
        }

        .stat-card {
          background: var(--light);
          padding: 24px;
          border-radius: var(--radius-md);
          display: flex;
          gap: 16px;
          align-items: flex-start;
          border: 1px solid #E5E7EB;
          transition: all 0.3s ease;
        }

        .stat-card:hover {
          transform: translateY(-4px);
          box-shadow: var(--shadow-md);
          border-color: var(--accent);
        }

        .stat-icon {
          width: 44px;
          height: 44px;
          background: linear-gradient(135deg, var(--primary), #002E5C);
          border-radius: var(--radius-sm);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--accent);
          flex-shrink: 0;
        }

        .stat-content {
          flex: 1;
        }

        .stat-value {
          font-family: var(--font-display);
          font-size: 24px;
          font-weight: 800;
          line-height: 1;
          margin-bottom: 4px;
        }

        .stat-label {
          font-size: 12px;
          color: var(--gray);
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        /* ── BENEFITS SECTION ── */
        .benefits-section {
          padding: 80px 6vw;
          background: var(--white);
        }

        .section-header {
          text-align: center;
          margin-bottom: 60px;
          max-width: 700px;
          margin-left: auto;
          margin-right: auto;
        }

        .section-label {
          display: inline-block;
          background: var(--light);
          color: var(--accent);
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 1px;
          text-transform: uppercase;
          padding: 6px 12px;
          border-radius: 100px;
          margin-bottom: 16px;
        }

        .section-title {
          font-size: clamp(28px, 4vw, 42px);
          margin-bottom: 12px;
          line-height: 1.3;
        }

        .section-desc {
          color: var(--gray);
          font-size: 16px;
          line-height: 1.6;
        }

        .benefits-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
          gap: 24px;
        }

        .benefit-card {
          background: var(--light);
          border: 1px solid #E5E7EB;
          border-radius: var(--radius-lg);
          padding: 32px 24px;
          text-align: center;
          transition: all 0.3s ease;
        }

        .benefit-card:hover {
          transform: translateY(-8px);
          border-color: var(--accent);
          box-shadow: 0 12px 36px rgba(0,31,63,0.1);
        }

        .benefit-icon {
          width: 52px;
          height: 52px;
          background: linear-gradient(135deg, var(--accent), var(--accent-light));
          border-radius: var(--radius-md);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--primary);
          margin: 0 auto 16px;
        }

        .benefit-card h4 {
          font-size: 16px;
          margin-bottom: 8px;
        }

        .benefit-card p {
          font-size: 13.5px;
          color: var(--gray);
          line-height: 1.6;
        }

        /* ── PROCEDURES SECTION ── */
        .procedures-section {
          padding: 80px 6vw;
          background: linear-gradient(135deg, var(--primary) 0%, #002E5C 100%);
          color: var(--white);
        }

        .procedures-section .section-label {
          background: rgba(255, 184, 0, 0.15);
          color: var(--accent);
        }

        .procedures-section .section-title,
        .procedures-section .section-desc {
          color: var(--white);
        }

        .procedures-section .section-desc {
          opacity: 0.8;
        }

        .procedures-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
          gap: 24px;
        }

        .procedure-card {
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 184, 0, 0.2);
          border-radius: var(--radius-lg);
          padding: 28px;
          backdrop-filter: blur(10px);
          transition: all 0.3s ease;
        }

        .procedure-card:hover {
          border-color: var(--accent);
          background: rgba(255, 184, 0, 0.08);
          transform: translateY(-6px);
        }

        .procedure-card h4 {
          font-size: 18px;
          margin-bottom: 12px;
        }

        .procedure-desc {
          font-size: 14px;
          line-height: 1.6;
          opacity: 0.9;
          margin-bottom: 16px;
        }

        .procedure-features {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .procedure-features li {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 13px;
          opacity: 0.85;
        }

        .procedure-features svg {
          color: var(--accent);
          width: 16px;
          height: 16px;
        }

        /* ── TESTIMONIALS SECTION ── */
        .testimonials-section {
          padding: 80px 6vw;
          background: var(--light);
        }

        .testimonials-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 24px;
        }

        .testimonial-card {
          background: var(--white);
          border-radius: var(--radius-lg);
          padding: 28px;
          border: 1px solid #E5E7EB;
          transition: all 0.3s ease;
        }

        .testimonial-card:hover {
          transform: translateY(-6px);
          box-shadow: var(--shadow-md);
        }

        .testimonial-stars {
          display: flex;
          gap: 6px;
          margin-bottom: 14px;
        }

        .testimonial-stars svg {
          width: 16px;
          height: 16px;
          color: var(--accent);
        }

        .testimonial-quote {
          font-size: 14px;
          line-height: 1.7;
          color: var(--primary);
          margin-bottom: 16px;
          font-style: italic;
        }

        .testimonial-author {
          font-family: var(--font-display);
          font-weight: 700;
          font-size: 14px;
          color: var(--primary);
          margin-bottom: 2px;
        }

        .testimonial-role {
          font-size: 12px;
          color: var(--gray);
        }

        /* ── FAQ SECTION ── */
        .faq-section {
          padding: 80px 6vw;
          background: var(--white);
        }

        .faq-container {
          max-width: 700px;
          margin: 0 auto;
        }

        .faq-item {
          border-bottom: 1px solid #E5E7EB;
          padding: 20px 0;
        }

        .faq-item:first-child {
          padding-top: 0;
        }

        .faq-button {
          width: 100%;
          background: none;
          border: none;
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 16px;
          cursor: pointer;
          padding: 0;
          font-size: 15px;
          font-weight: 600;
          color: var(--primary);
          transition: color 0.2s ease;
        }

        .faq-button:hover {
          color: var(--accent);
        }

        .faq-toggle {
          font-size: 20px;
          flex-shrink: 0;
          color: var(--accent);
          transition: transform 0.3s ease;
        }

        .faq-open .faq-toggle {
          transform: rotate(180deg);
        }

        .faq-a {
          color: var(--gray);
          font-size: 14px;
          line-height: 1.7;
          max-width: 600px;
          margin-top: 12px;
        }

        /* ── CLOSING SECTION ── */
        .closing-section {
          background: linear-gradient(135deg, var(--primary) 0%, #002E5C 100%);
          color: var(--white);
          padding: 80px 6vw;
          text-align: center;
        }

        .closing-content {
          max-width: 700px;
          margin: 0 auto;
        }

        .closing-content h2 {
          font-size: clamp(28px, 4vw, 40px);
          margin-bottom: 14px;
        }

        .closing-content > p {
          font-size: 16px;
          opacity: 0.85;
          margin-bottom: 32px;
          line-height: 1.6;
        }

        .closing-cta {
          display: inline-flex;
          gap: 12px;
          flex-wrap: wrap;
          justify-content: center;
        }

        /* ── RESPONSIVE ── */
        @media (max-width: 960px) {
          .hero-container {
            grid-template-columns: 1fr;
            gap: 40px;
          }

          .hero {
            padding: 60px 6vw;
          }

          .hero::before {
            width: 400px;
            height: 400px;
          }

          .trust-strip {
            gap: 20px;
          }

          .stats-grid {
            grid-template-columns: 1fr 1fr;
          }
        }

        @media (max-width: 640px) {
          .hero-container {
            gap: 30px;
          }

          .hero-form-card {
            padding: 24px;
          }

          .form-header h3 {
            font-size: 18px;
          }

          .stats-grid {
            grid-template-columns: 1fr;
          }

          .stat-card {
            flex-direction: column;
            text-align: center;
          }

          .stat-icon {
            margin: 0 auto;
          }

          .benefits-section,
          .procedures-section,
          .testimonials-section,
          .faq-section,
          .closing-section {
            padding: 60px 6vw;
          }

          .section-header {
            margin-bottom: 40px;
          }

          .trust-strip {
            flex-direction: column;
            gap: 12px;
          }

          .trust-item {
            justify-content: center;
            width: 100%;
          }
        }
      `}</style>

      {/* ── HERO ─────────────────────────────────────────────── */}
      <section className="hero">
        <div className="hero-container">
          <div className="hero-content">
            <h1>See Mumbai Crystal <em>Clear</em></h1>
            <p>Advanced blade-free cataract surgery with the city's most trusted surgeons. 15 minutes. Clear vision by morning. Zero pain.</p>
            <div className="hero-badges">
              <span className="badge">15-Min Procedure</span>
              <span className="badge">99% Success Rate</span>
              <span className="badge">5 Locations</span>
            </div>
            <div className="hero-cta">
              <button className="btn-primary" onClick={scrollToForm}>Start Free Screening</button>
              <button className="btn-secondary">Call Us: +91-XXXXXXXXXX</button>
            </div>
          </div>

          <div id="form-anchor">
            <HeroForm />
          </div>
        </div>
      </section>

      {/* ── TRUST STRIP ──────────────────────────────────────── */}
      <div className="trust-strip">
        <span className="trust-item">✓ 4.9★ Patient Rating</span>
        <span className="trust-item">✓ 18,000+ Surgeries</span>
        <span className="trust-item">✓ Fellowship-Trained Surgeons</span>
      </div>

      {/* ── STATS SECTION ────────────────────────────────────── */}
      <section className="stats-section">
        <div className="stats-grid">
          <StatCard value="18,000+" label="Surgeries Performed" icon={<IconTrendUp />} />
          <StatCard value="99%" label="Success Rate" icon={<IconCheck />} />
          <StatCard value="24 hrs" label="Clear Vision" icon={<IconVision />} />
          <StatCard value="5" label="Locations in Mumbai" icon={<IconCity />} />
        </div>
      </section>

      {/* ── BENEFITS SECTION ────────────────────────────────── */}
      <section className="benefits-section">
        <div className="section-header">
          <div className="section-label">Why Cataract Surgery</div>
          <h2 className="section-title">Reclaim the clarity age steals slowly</h2>
          <p className="section-desc">Cataracts cloud your vision over time. Our surgeons remove the clouded lens and replace it with a crystal-clear artificial one. The result? Instant, permanent clarity.</p>
        </div>
        <div className="benefits-grid">
          {BENEFITS.map((b, i) => (
            <BenefitCard key={i} icon={b.icon} title={b.title} desc={b.desc} />
          ))}
        </div>
      </section>

      {/* ── PROCEDURES SECTION ──────────────────────────────── */}
      <section className="procedures-section">
        <div className="section-header">
          <div className="section-label">Three Proven Techniques</div>
          <h2 className="section-title">Every cataract is unique. So is the surgery.</h2>
          <p className="section-desc">We choose the surgical technique based on your eye's needs, not on what's newest or most expensive.</p>
        </div>
        <div className="procedures-grid">
          {PROCEDURES.map((p, i) => (
            <ProcedureCard key={i} title={p.title} desc={p.desc} features={p.features} />
          ))}
        </div>
      </section>

      {/* ── TESTIMONIALS SECTION ────────────────────────────── */}
      <section className="testimonials-section">
        <div className="section-header">
          <div className="section-label">Patient Stories</div>
          <h2 className="section-title">Clear vision. Real lives changed.</h2>
          <p className="section-desc">Hear from Mumbai patients who reclaimed their independence through cataract surgery.</p>
        </div>
        <div className="testimonials-grid">
          {TESTIMONIALS.map((t, i) => (
            <TestimonialCard key={i} quote={t.quote} name={t.name} role={t.role} rating={t.rating} />
          ))}
        </div>
      </section>

      {/* ── FAQ SECTION ──────────────────────────────────────── */}
      <section className="faq-section">
        <div className="section-header">
          <div className="section-label">Common Questions</div>
          <h2 className="section-title">Everything you need to know</h2>
        </div>
        <div className="faq-container">
          {FAQS.map((f, i) => (
            <FaqItem key={i} q={f.q} a={f.a} open={openFaq === i} onToggle={() => setOpenFaq(openFaq === i ? null : i)} />
          ))}
        </div>
      </section>

      {/* ── CLOSING SECTION ──────────────────────────────────── */}
      <section className="closing-section">
        <div className="closing-content">
          <h2>Ready to see Mumbai clearly again?</h2>
          <p>Book your free vision screening today. No obligation. No pressure. Just the honest facts about your eyes and the best path forward.</p>
          <div className="closing-cta">
            <button className="btn-primary" onClick={scrollToForm}>Get Free Screening</button>
          </div>
        </div>
      </section>
    </>
  );
}