"use client";

import { useState, useEffect } from "react";

/* ============================================================
   ICONS — minimal line set, currentColor, shared stroke weight
   ============================================================ */
const ip = { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.6, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };

const IconSun = () => (
  <svg {...ip}><circle cx="12" cy="12" r="4.3" /><path d="M12 3v2.4M12 18.6V21M4.5 12h2.4M17.1 12h2.4M6.3 6.3l1.7 1.7M16 16l1.7 1.7M17.7 6.3 16 8M8 16l-1.7 1.7" /></svg>
);
const IconBolt = () => (
  <svg {...ip}><path d="M12 2 5 14h5l-1 8 8-12h-5l1-8Z" /></svg>
);
const IconLoop = () => (
  <svg {...ip}><path d="M7 9.5a3.5 3.5 0 1 0 0 5 13 13 0 0 0 5-5 13 13 0 0 0 5-5 3.5 3.5 0 1 1 0 5 13 13 0 0 1-5 5 13 13 0 0 1-5-5Z" /></svg>
);
const IconShield = () => (
  <svg {...ip}><path d="M12 3 5 6v6c0 4.2 3 7.4 7 9 4-1.6 7-4.8 7-9V6l-7-3Z" /><path d="M9 12l2 2 4-4.2" /></svg>
);
const IconLayers = () => (
  <svg {...ip}><path d="M12 3 3 8l9 5 9-5-9-5Z" /><path d="M3 13l9 5 9-5M3 17.5l9 4.5 9-4.5" /></svg>
);
const IconPin = () => (
  <svg {...ip}><path d="M12 21s-6.5-5.7-6.5-11A6.5 6.5 0 0 1 18.5 10c0 5.3-6.5 11-6.5 11Z" /><circle cx="12" cy="10" r="2.3" /></svg>
);
const IconUsers = () => (
  <svg {...ip}><circle cx="9" cy="8.5" r="3" /><path d="M3.5 19c0-3 2.5-5 5.5-5s5.5 2 5.5 5" /><path d="M16 9a2.6 2.6 0 1 0 0-5" /><path d="M16.5 14c2.3.3 4 2 4 5" /></svg>
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
      <div className="lead-card-tag">Free Eye Screening</div>
      <h3 className="lead-card-title">Check your LASIK eligibility</h3>
      <p className="lead-card-sub">Share your number — a specialist calls back within minutes.</p>

      {f.status === "success" ? (
        <div className="form-success">
          <div className="success-mark">✓</div>
          <p>{f.message}</p>
        </div>
      ) : (
        <form onSubmit={(e) => f.handleSubmit(e, "lasik-pune-hero")} noValidate>
          <div className="field-group">
            <label htmlFor="pune-name-input">Name</label>
            <input id="pune-name-input" type="text" placeholder="Onkar Patil" value={f.name} onChange={f.handleNameChange} className={f.nameError ? "input-error" : ""} />
            {f.nameError && <span className="field-err">{f.nameError}</span>}
          </div>
          <div className="field-group">
            <label htmlFor="pune-phone-input">Mobile number</label>
            <input id="pune-phone-input" type="tel" placeholder="98765 43210" value={f.phone} onChange={f.handlePhoneChange} maxLength={14} className={f.phoneError ? "input-error" : ""} />
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
    <form className="lead-strip" onSubmit={(e) => f.handleSubmit(e, "lasik-pune-closing")} noValidate>
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

function BenefitCard({ icon, title, desc }: { icon: React.ReactNode; title: string; desc: string }) {
  return (
    <div className="benefit-card">
      <span className="benefit-icon">{icon}</span>
      <h3>{title}</h3>
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

function Avatar({ initials, hue }: { initials: string; hue: "green" | "saffron" | "sky" }) {
  return <span className={`avatar avatar-${hue}`}>{initials}</span>;
}

function DoctorCard({ initials, hue, name, role, detail }: { initials: string; hue: "green" | "saffron" | "sky"; name: string; role: string; detail: string }) {
  return (
    <div className="doctor-card">
      <Avatar initials={initials} hue={hue} />
      <h4>{name}</h4>
      <p className="doctor-role">{role}</p>
      <p className="doctor-detail">{detail}</p>
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

function ProcessStep({ index, title, desc }: { index: string; title: string; desc: string }) {
  return (
    <div className="process-step">
      <span className="process-index">{index}</span>
      <h4>{title}</h4>
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

const AREAS = ["Koregaon Park", "Kothrud", "Viman Nagar", "Hinjewadi", "Baner", "Camp", "Aundh", "Hadapsar"];

const TECH = [
  { name: "Bladeless LASIK", tag: "Most popular", tagline: "All-laser, no blade, ever.", desc: "A femtosecond laser creates the corneal flap and an excimer laser reshapes it — precise, fast, and the standard choice for most prescriptions." },
  { name: "Contoura Vision", tag: "Topography-guided", tagline: "Mapped to your eye's unique surface.", desc: "Over 22,000 data points of your cornea guide the laser, correcting irregularities glasses never could." },
  { name: "SMILE", tag: "Minimally invasive", tagline: "No flap, smaller incision.", desc: "A keyhole-sized opening reshapes the cornea from within, suited to certain prescriptions and thinner corneas." },
];

const FAQS = [
  { q: "Is LASIK painful?", a: "No. Numbing drops are used throughout, so the 15-minute procedure is generally painless. Mild dryness or light sensitivity for a day or two afterward is normal." },
  { q: "Am I a good candidate for LASIK?", a: "Most adults with stable vision and healthy corneas qualify. Your free screening checks corneal thickness, prescription stability, and overall eye health." },
  { q: "How much does LASIK cost in Pune?", a: "It depends on your prescription and the technology used. You'll get one clear, itemised quote after your screening — no hidden charges added later." },
  { q: "Which technology is right for me — LASIK, Contoura, or SMILE?", a: "It depends on your corneal thickness and prescription. The screening team walks you through which option actually fits your eyes, not just what's newest." },
  { q: "Do you serve patients outside central Pune?", a: "Yes — we see patients from across Pune, including Hinjewadi, Kothrud, Viman Nagar, and Hadapsar. Pickup and consultation scheduling can work around your commute." },
  { q: "How soon can I go back to work?", a: "Most patients return to desk-based work within a day or two, and to driving once the surgeon confirms your vision has stabilised at follow-up." },
];

/* ============================================================
   PAGE
   ============================================================ */
export default function PuneLasikPage() {
  const [revealed, setRevealed] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  useEffect(() => {
    const t = setTimeout(() => setRevealed(true), 100);
    return () => clearTimeout(t);
  }, []);

  function focusForm() {
    document.getElementById("lead-card-anchor")?.scrollIntoView({ behavior: "smooth", block: "center" });
    document.getElementById("pune-name-input")?.focus();
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display&family=DM+Sans:wght@400;500;600;700&family=Space+Mono:wght@500;600&display=swap');

        :root{
          --ink:#16261C; --green:#2F6B4F; --green-deep:#1F4A36;
          --saffron:#F2A93B; --saffron-deep:#D98F22; --sky:#6FB7E0;
          --cream:#FFF8EC; --white:#FFFFFF; --slate:#57645A; --line:#E9E2CB;
          --danger:#C0392B; --r-md:10px; --r-lg:18px;
          --font-display:'DM Serif Display', Georgia, serif;
          --font-body:'DM Sans', system-ui, sans-serif;
          --font-mono:'Space Mono', monospace;
        }
        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
        html{scroll-behavior:smooth;}
        body{font-family:var(--font-body);color:var(--ink);background:var(--white);}
        h1,h2,h3,h4{font-family:var(--font-display);font-weight:400;}
        button{font-family:inherit;}
        :focus-visible{outline:2px solid var(--saffron-deep);outline-offset:2px;}

        /* ── HERO ── */
        .hero{
          background:linear-gradient(170deg,#E9F3EC 0%, var(--cream) 55%, var(--white) 100%);
          display:grid;grid-template-columns:1.1fr 420px;gap:54px;align-items:center;
          padding:108px 6vw 70px;position:relative;overflow:hidden;
        }
        .hero-left{z-index:1;}
        .tag-pin{
          display:inline-flex;align-items:center;gap:7px;background:rgba(47,107,79,0.1);
          border:1px solid rgba(47,107,79,0.3);color:var(--green-deep);font-family:var(--font-mono);
          font-size:11px;font-weight:600;letter-spacing:1.2px;text-transform:uppercase;
          padding:6px 14px;border-radius:100px;margin-bottom:26px;
        }
        .tag-pin svg{width:13px;height:13px;}
        .hero-headline{font-size:clamp(34px,5.2vw,58px);line-height:1.18;color:var(--ink);margin-bottom:18px;}
        .hero-headline em{font-style:normal;color:var(--saffron-deep);}
        .hero-copy{font-size:16.5px;line-height:1.75;color:var(--slate);max-width:480px;margin-bottom:30px;}
        .hero-actions{margin-bottom:32px;}
        .btn-cta{
          background:var(--green);color:var(--white);border:none;cursor:pointer;
          font-weight:600;font-size:15px;padding:15px 30px;border-radius:var(--r-md);
          transition:transform .15s,background .2s;
        }
        .btn-cta:hover{transform:translateY(-2px);background:var(--green-deep);}
        .hero-badges{display:flex;gap:10px;flex-wrap:wrap;}
        .badge{
          display:flex;align-items:center;gap:7px;background:var(--white);
          border:1px solid var(--line);color:var(--ink);
          font-size:12.5px;padding:7px 13px;border-radius:var(--r-md);
        }

        /* clouds-part-for-sun signature */
        .sky-scene{position:relative;width:100%;max-width:380px;height:200px;margin:0 auto 24px;}
        .sky-scene svg{position:absolute;inset:0;}
        .sun-disc{transform-origin:190px 110px;}
        @media (prefers-reduced-motion: no-preference){
          .cloud-l{transition:transform 1.3s cubic-bezier(.2,.7,.2,1), opacity 1.3s ease;}
          .cloud-r{transition:transform 1.3s cubic-bezier(.2,.7,.2,1), opacity 1.3s ease;}
          .pre .cloud-l{transform:translateX(0);}
          .pre .cloud-r{transform:translateX(0);}
          .revealed .cloud-l{transform:translateX(-70px);opacity:0;}
          .revealed .cloud-r{transform:translateX(70px);opacity:0;}
          .pre .sun-disc{opacity:0;transform:scale(.7);}
          .revealed .sun-disc{opacity:1;transform:scale(1);transition:opacity 1s ease .3s, transform 1s ease .3s;}
        }

        /* ── TRUST STRIP ── */
        .trust-strip{background:var(--white);border-bottom:1px solid var(--line);padding:16px 6vw;display:flex;justify-content:center;gap:32px;flex-wrap:wrap;}
        .trust-item{font-size:13px;font-weight:600;color:var(--green-deep);}

        /* ── STATS ── */
        .stats-band{background:var(--cream);padding:50px 6vw;display:flex;justify-content:space-around;flex-wrap:wrap;gap:28px;border-bottom:1px solid var(--line);}
        .stat{text-align:center;}
        .stat-value{display:block;font-family:var(--font-mono);font-size:30px;font-weight:600;color:var(--green);}
        .stat-label{display:block;font-size:12px;color:var(--slate);margin-top:6px;letter-spacing:.4px;text-transform:uppercase;}

        /* ── SECTION SHARED ── */
        .section{padding:86px 6vw;}
        .eyebrow-sm{font-family:var(--font-mono);font-size:11px;font-weight:600;letter-spacing:1.8px;text-transform:uppercase;color:var(--saffron-deep);margin-bottom:14px;}
        .section-title{font-size:clamp(27px,3.4vw,40px);font-weight:400;line-height:1.22;margin-bottom:16px;}
        .section-lead{font-size:16px;line-height:1.75;color:var(--slate);max-width:600px;margin-bottom:48px;}

        /* ── BENEFITS ── */
        .benefits-section{background:var(--white);}
        .benefits-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(250px,1fr));gap:20px;}
        .benefit-card{background:var(--cream);border:1px solid var(--line);border-radius:var(--r-lg);padding:28px 24px;transition:transform .2s,box-shadow .2s;}
        .benefit-card:hover{transform:translateY(-3px);box-shadow:0 14px 32px rgba(22,38,28,0.08);}
        .benefit-icon{width:40px;height:40px;display:flex;align-items:center;justify-content:center;border-radius:9px;background:rgba(47,107,79,0.12);color:var(--green);margin-bottom:16px;}
        .benefit-icon svg{width:21px;height:21px;}
        .benefit-card h3{font-size:17px;font-weight:400;margin-bottom:8px;}
        .benefit-card p{font-size:13.5px;line-height:1.7;color:var(--slate);}

        /* ── TECHNOLOGY ── */
        .tech-section{background:var(--green-deep);color:var(--white);}
        .tech-section .section-lead{color:rgba(255,255,255,0.72);}
        .tech-section .eyebrow-sm{color:var(--sky);}
        .tech-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:22px;}
        .tech-card{background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.14);border-radius:var(--r-lg);padding:28px 24px;}
        .tech-tag{display:inline-block;background:var(--saffron);color:var(--ink);font-size:11px;font-weight:600;letter-spacing:.4px;text-transform:uppercase;padding:4px 11px;border-radius:100px;margin-bottom:16px;}
        .tech-card h4{font-size:19px;font-weight:400;margin-bottom:6px;}
        .tech-tagline{font-size:13.5px;color:var(--sky);margin-bottom:12px;}
        .tech-desc{font-size:13.5px;line-height:1.7;color:rgba(255,255,255,0.72);}

        /* ── SURGEONS ── */
        .doctors-section{background:var(--cream);}
        .doctors-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:22px;}
        .doctor-card{background:var(--white);border:1px solid var(--line);border-radius:var(--r-lg);padding:28px 24px;text-align:center;}
        .avatar{display:inline-flex;align-items:center;justify-content:center;width:56px;height:56px;border-radius:50%;font-family:var(--font-mono);font-weight:600;font-size:15px;margin-bottom:16px;}
        .avatar-green{background:var(--green);color:var(--white);}
        .avatar-saffron{background:var(--saffron);color:var(--ink);}
        .avatar-sky{background:var(--sky);color:var(--ink);}
        .doctor-card h4{font-size:17px;font-weight:400;margin-bottom:4px;}
        .doctor-role{font-size:12.5px;color:var(--saffron-deep);font-weight:600;margin-bottom:10px;}
        .doctor-detail{font-size:13px;line-height:1.65;color:var(--slate);}

        /* ── TESTIMONIALS ── */
        .testimonials-section{background:var(--white);}
        .testimonial-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(250px,1fr));gap:22px;}
        .testimonial{background:var(--cream);border:1px solid var(--line);border-radius:var(--r-lg);padding:26px 24px;display:flex;flex-direction:column;gap:16px;}
        .testimonial blockquote{font-size:14.5px;line-height:1.75;color:var(--ink);}
        .testimonial figcaption{display:flex;flex-direction:column;font-size:13px;color:var(--slate);}
        .testimonial figcaption strong{color:var(--green-deep);font-weight:600;}
        .testimonial-note{font-size:12.5px;color:var(--slate);margin-top:28px;}

        /* ── PROCESS ── */
        .process-section{background:var(--ink);color:var(--white);text-align:center;}
        .process-section .section-lead{color:rgba(255,255,255,0.68);margin-inline:auto;}
        .process-section .eyebrow-sm{color:var(--saffron);}
        .process-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:26px;margin-top:50px;text-align:left;}
        .process-step{background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.12);border-radius:var(--r-lg);padding:30px 22px;}
        .process-index{display:inline-flex;align-items:center;justify-content:center;width:38px;height:38px;border-radius:50%;background:var(--saffron);color:var(--ink);font-family:var(--font-mono);font-weight:600;font-size:13px;margin-bottom:18px;}
        .process-step h4{font-size:16px;font-weight:400;margin-bottom:8px;}
        .process-step p{font-size:13.5px;line-height:1.7;color:rgba(255,255,255,0.62);}

        /* ── WHY CHOOSE US ── */
        .why-section{background:var(--white);}
        .why-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:22px;}
        .why-card{display:flex;gap:16px;background:var(--cream);border:1px solid var(--line);border-radius:var(--r-lg);padding:24px;}
        .why-icon{flex-shrink:0;width:42px;height:42px;border-radius:11px;background:var(--green-deep);color:var(--white);display:flex;align-items:center;justify-content:center;}
        .why-icon svg{width:21px;height:21px;}
        .why-card h4{font-size:15.5px;font-weight:600;margin-bottom:6px;}
        .why-card p{font-size:13px;line-height:1.7;color:var(--slate);}

        /* ── AREAS SERVED ── */
        .areas-section{background:var(--cream);text-align:center;}
        .areas-section .section-lead{margin-inline:auto;}
        .areas-list{display:flex;justify-content:center;gap:12px;flex-wrap:wrap;max-width:760px;margin:0 auto;}
        .area-chip{display:flex;align-items:center;gap:6px;background:var(--white);border:1px solid var(--line);color:var(--ink);font-size:13.5px;font-weight:500;padding:9px 16px;border-radius:100px;}
        .area-chip svg{width:14px;height:14px;color:var(--saffron-deep);}

        /* ── FAQ ── */
        .faq-section{background:var(--white);}
        .faq-list{max-width:700px;}
        .faq-item{border-bottom:1px solid var(--line);}
        .faq-q{width:100%;background:none;border:none;cursor:pointer;text-align:left;display:flex;justify-content:space-between;align-items:center;gap:16px;padding:19px 0;font-size:15.5px;font-weight:600;color:var(--ink);}
        .faq-plus{color:var(--green);font-size:19px;flex-shrink:0;}
        .faq-a{font-size:14px;line-height:1.75;color:var(--slate);padding-bottom:19px;max-width:620px;}

        /* ── FINAL CTA ── */
        .closing-section{background:linear-gradient(165deg, var(--green-deep) 0%, var(--ink) 100%);padding:84px 6vw;color:var(--white);}
        .closing-inner{max-width:740px;margin:0 auto;text-align:center;}
        .closing-inner h2{font-size:clamp(27px,3.8vw,42px);font-weight:400;margin-bottom:14px;}
        .closing-inner > p{font-size:16px;color:rgba(255,255,255,0.78);margin-bottom:38px;}

        .lead-strip{display:flex;gap:12px;flex-wrap:wrap;justify-content:center;background:rgba(255,255,255,0.07);border:1px solid rgba(255,255,255,0.16);border-radius:var(--r-lg);padding:18px;}
        .strip-field{display:flex;flex-direction:column;flex:1;min-width:180px;}
        .strip-field input{padding:13px 16px;border:1.5px solid rgba(255,255,255,0.22);border-radius:var(--r-md);background:rgba(255,255,255,0.06);color:var(--white);font-size:14.5px;outline:none;transition:border-color .2s;}
        .strip-field input::placeholder{color:rgba(255,255,255,0.55);}
        .strip-field input:focus{border-color:var(--saffron);}
        .strip-field input.input-error{border-color:#E8918A;}
        .btn-strip{background:var(--saffron);color:var(--ink);border:none;cursor:pointer;font-weight:700;font-size:14.5px;padding:13px 26px;border-radius:var(--r-md);white-space:nowrap;transition:background .2s,transform .15s;}
        .btn-strip:hover:not(:disabled){background:#F3BC5F;transform:translateY(-1px);}
        .btn-strip:disabled{opacity:.7;cursor:not-allowed;}
        .strip-success{display:flex;align-items:center;gap:14px;justify-content:center;background:rgba(255,255,255,0.09);border:1px solid rgba(255,255,255,0.18);border-radius:var(--r-lg);padding:22px;font-size:15px;}
        .strip-api-error{flex-basis:100%;text-align:left;margin-top:4px;}

        /* ── LEAD CARD ── */
        .lead-card{background:var(--white);border-radius:18px;padding:36px 32px;box-shadow:0 24px 64px rgba(22,38,28,0.18);position:relative;z-index:2;border:1px solid rgba(242,169,59,0.3);}
        .lead-card-tag{display:inline-block;background:linear-gradient(90deg,var(--saffron),#F3BC5F);color:var(--ink);font-size:11px;font-weight:700;letter-spacing:1px;text-transform:uppercase;padding:5px 12px;border-radius:100px;margin-bottom:18px;}
        .lead-card-title{font-size:20px;font-weight:400;margin-bottom:6px;}
        .lead-card-sub{font-size:13.5px;color:var(--slate);margin-bottom:26px;}
        .field-group{margin-bottom:16px;}
        .field-group label{display:block;font-size:12.5px;font-weight:600;color:var(--ink);margin-bottom:6px;}
        .field-group input{width:100%;padding:12px 15px;border:1.5px solid #DCE6DA;border-radius:var(--r-md);font-size:15px;color:var(--ink);outline:none;background:#FBFCFA;transition:border-color .2s;}
        .field-group input:focus{border-color:var(--green);background:var(--white);}
        .field-group input.input-error{border-color:var(--danger);}
        .field-err{display:block;margin-top:4px;font-size:12px;color:var(--danger);}
        .btn-primary{width:100%;background:var(--green);color:var(--white);border:none;cursor:pointer;font-weight:700;font-size:15.5px;padding:15px;border-radius:var(--r-md);margin-top:6px;transition:opacity .2s,transform .15s;}
        .btn-primary:hover:not(:disabled){transform:translateY(-2px);opacity:.92;}
        .btn-primary:disabled{opacity:.7;cursor:not-allowed;}
        .btn-loading{display:flex;align-items:center;justify-content:center;gap:10px;}
        .spinner{width:15px;height:15px;border:2px solid rgba(255,255,255,0.35);border-top-color:#fff;border-radius:50%;animation:spin .7s linear infinite;display:inline-block;}
        @keyframes spin{to{transform:rotate(360deg);}}
        .form-privacy{font-size:11.5px;color:#8B968B;text-align:center;margin-top:13px;}
        .form-api-error{background:#FCEFEC;border:1px solid #EEC0B8;color:var(--danger);font-size:12.5px;padding:9px 13px;border-radius:var(--r-md);margin-bottom:10px;}
        .form-success{text-align:center;padding:18px 0;}
        .success-mark{width:44px;height:44px;border-radius:50%;background:var(--green);color:#fff;display:flex;align-items:center;justify-content:center;font-size:21px;margin:0 auto 16px;animation:pop .4s ease;}
        @keyframes pop{from{transform:scale(0);}to{transform:scale(1);}}
        .form-success p{font-size:15px;color:var(--ink);line-height:1.6;}

        /* ── RESPONSIVE ── */
        @media (max-width:960px){
          .hero{grid-template-columns:1fr;text-align:center;padding:96px 5vw 56px;}
          .hero-badges{justify-content:center;}
          .hero-copy{margin-inline:auto;}
        }
        @media (max-width:600px){
          .lead-card{padding:26px 20px;}
          .section{padding:64px 6vw;}
          .lead-strip{flex-direction:column;}
          .strip-field{width:100%;}
        }
      `}</style>

      {/* ── HERO ─────────────────────────────────────── */}
      <section className="hero">
        <div className="hero-left">
          <span className="tag-pin"><IconPin />Pune</span>
          <h1 className="hero-headline">See Pune like it's just <em>stopped raining</em></h1>
          <p className="hero-copy">
            Advanced LASIK from fellowship-trained ophthalmologists. No injections, no stitches —
            most patients wake up to clear vision the very next morning.
          </p>
          <div className="hero-actions">
            <button className="btn-cta" onClick={focusForm}>Book free screening</button>
          </div>
          <div className="hero-badges">
            <span className="badge">NABH-accredited centre</span>
            <span className="badge">Bladeless &amp; Contoura LASIK</span>
            <span className="badge">15-minute procedure</span>
          </div>
        </div>

        <div>
          <div className={`sky-scene ${revealed ? "revealed" : "pre"}`}>
            <svg viewBox="0 0 380 200" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <radialGradient id="sunG" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#FFE3A0" />
                  <stop offset="100%" stopColor="var(--saffron)" />
                </radialGradient>
              </defs>
              <g className="sun-disc">
                <circle cx="190" cy="110" r="46" fill="url(#sunG)" />
                {[0,45,90,135,180,225,270,315].map((d) => (
                  <line key={d} x1="190" y1="110" x2="190" y2="110" stroke="var(--saffron)" strokeWidth="3" strokeLinecap="round"
                    transform={`rotate(${d} 190 110) translate(0 -68)`} />
                ))}
              </g>
              <g className="cloud-l">
                <ellipse cx="95" cy="85" rx="60" ry="26" fill="#FFFFFF" />
                <ellipse cx="60" cy="135" rx="50" ry="22" fill="#F3F0E4" />
              </g>
              <g className="cloud-r">
                <ellipse cx="285" cy="85" rx="60" ry="26" fill="#FFFFFF" />
                <ellipse cx="320" cy="135" rx="50" ry="22" fill="#F3F0E4" />
              </g>
            </svg>
          </div>
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
        <Stat value="22,000+" label="Procedures performed" />
        <Stat value="14+" label="Years in practice" />
        <Stat value="98%" label="Patient satisfaction" />
        <Stat value="20 min" label="Procedure duration" />
        <Stat value="4" label="Centres across Pune" />
      </div>

      {/* ── BENEFITS ─────────────────────────────────── */}
      <section className="section benefits-section">
        <p className="eyebrow-sm">Why LASIK</p>
        <h2 className="section-title">A permanent fix, not another pair of lenses</h2>
        <p className="section-lead">LASIK reshapes the cornea so light focuses correctly on the retina — permanently. Here's what that means for your everyday life.</p>
        <div className="benefits-grid">
          <BenefitCard icon={<IconSun />} title="Clear vision by morning" desc="Most patients reach 6/6 vision or better within 24 hours of the procedure." />
          <BenefitCard icon={<IconBolt />} title="Quick and painless" desc="The procedure itself takes about 15–20 minutes, with numbing drops and no needles." />
          <BenefitCard icon={<IconLoop />} title="Built to last" desc="LASIK corrects your vision permanently — most patients never reach for glasses again." />
          <BenefitCard icon={<IconUsers />} title="Back to normal fast" desc="Drive, work, and resume daily activities within a day or two of surgery." />
          <BenefitCard icon={<IconLayers />} title="A technology for every eye" desc="Bladeless, Contoura, or SMILE — we match the method to your prescription, not the other way round." />
          <BenefitCard icon={<IconShield />} title="Care that doesn't stop at surgery" desc="Scheduled follow-ups and support through your full recovery." />
        </div>
      </section>

      {/* ── TECHNOLOGY ───────────────────────────────── */}
      <section className="section tech-section">
        <p className="eyebrow-sm">The Technology</p>
        <h2 className="section-title">Three ways to get there — we'll tell you which fits</h2>
        <p className="section-lead">Not every eye suits the same method. Here's a plain-language look at the options your screening will weigh.</p>
        <div className="tech-grid">
          {TECH.map((t) => (
            <TechCard key={t.name} name={t.name} tag={t.tag} tagline={t.tagline} desc={t.desc} />
          ))}
        </div>
      </section>

      {/* ── SURGEONS ─────────────────────────────────── */}
      <section className="section doctors-section">
        <p className="eyebrow-sm">Your Surgical Team</p>
        <h2 className="section-title">Senior surgeons, not residents-in-training</h2>
        <p className="section-lead">Every procedure is performed by a fellowship-trained ophthalmologist — never delegated to a trainee.</p>
        <div className="doctors-grid">
          <DoctorCard initials="AK" hue="green" name="Dr. Aditi Kulkarni" role="Lead Refractive Surgeon" detail="15+ years in corneal & refractive surgery, fellowship-trained in advanced LASIK techniques." />
          <DoctorCard initials="SJ" hue="saffron" name="Dr. Sameer Joshi" role="Senior Ophthalmologist" detail="Specialises in Contoura Vision and complex prescription cases." />
          <DoctorCard initials="RD" hue="sky" name="Dr. Rhea Deshpande" role="Cataract & Refractive Surgeon" detail="Focused on patient screening accuracy and long-term outcome tracking." />
        </div>
      </section>

      {/* ── TESTIMONIALS ─────────────────────────────── */}
      <section className="section testimonials-section">
        <p className="eyebrow-sm">Patient Stories</p>
        <h2 className="section-title">What clear vision actually feels like</h2>
        <div className="testimonial-grid">
          <Testimonial quote="I'd worn glasses since college. Riding to Hinjewadi without them fogging up in the monsoon still feels new." name="Onkar P." role="Marketing Manager" />
          <Testimonial quote="The screening was honest about which technology suited my prescription instead of pushing the priciest option." name="Maithili R." role="Architect" />
          <Testimonial quote="Follow-up calls checking on my recovery made the whole thing feel looked-after, not just a one-time appointment." name="Vivek S." role="College Lecturer" />
        </div>
        <p className="testimonial-note">Shared with patients' permission. Individual results vary by eye condition and candidacy.</p>
      </section>

      {/* ── PROCESS ──────────────────────────────────── */}
      <section className="section process-section">
        <p className="eyebrow-sm">What To Expect</p>
        <h2 className="section-title">Four steps, start to clear vision</h2>
        <p className="section-lead">A simple, predictable path from first call to follow-up.</p>
        <div className="process-grid">
          <ProcessStep index="01" title="Free consultation call" desc="We call you back to understand your eyes, your lifestyle, and answer every question." />
          <ProcessStep index="02" title="Detailed eye screening" desc="A thorough pre-LASIK workup confirms whether you're a good candidate, and for which technology." />
          <ProcessStep index="03" title="The LASIK procedure" desc="A precise, 15–20 minute laser procedure performed by a senior surgeon." />
          <ProcessStep index="04" title="Recovery & follow-up" desc="Scheduled check-ins make sure your eyes heal exactly as they should." />
        </div>
      </section>

      {/* ── WHY CHOOSE US ────────────────────────────── */}
      <section className="section why-section">
        <p className="eyebrow-sm">Why This Clinic</p>
        <h2 className="section-title">What sets the experience apart</h2>
        <p className="section-lead">Plenty of clinics offer LASIK in Pune. Here's what we think actually matters once you're in the chair.</p>
        <div className="why-grid">
          <WhyCard icon={<IconLayers />} title="Three technologies, one decision" desc="Bladeless, Contoura, and SMILE under one roof — matched to your eyes, not a single fixed offering." />
          <WhyCard icon={<IconShield />} title="Senior surgeons only" desc="Every procedure is performed by a fellowship-trained ophthalmologist with years of LASIK experience." />
          <WhyCard icon={<IconBolt />} title="Transparent, fair pricing" desc="One clear quote after your screening — no hidden add-ons once you're already committed." />
          <WhyCard icon={<IconLoop />} title="Proactive aftercare" desc="We call to check on you, not the other way around, through every stage of recovery." />
        </div>
      </section>

      {/* ── AREAS SERVED ─────────────────────────────── */}
      <section className="section areas-section">
        <p className="eyebrow-sm">Where We See Patients</p>
        <h2 className="section-title">Serving all of Pune, not just one neighbourhood</h2>
        <p className="section-lead">Screenings and follow-ups are scheduled around your commute, wherever in Pune you're coming from.</p>
        <div className="areas-list">
          {AREAS.map((a) => (
            <span key={a} className="area-chip"><IconPin />{a}</span>
          ))}
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
          <h2>Ready to see Pune without reaching for your glasses?</h2>
          <p>Book a free eye screening with our specialists. No obligation — just clarity on whether LASIK is right for you.</p>
          <LeadStrip />
        </div>
      </section>
    </>
  );
}