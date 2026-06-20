"use client";

import { useState, useEffect, useRef } from "react";

/* ============================================================
   ICONS — minimal line set, currentColor, shared stroke weight
   ============================================================ */
const iconProps = { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.6, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };

const IconClock = () => (
  <svg {...iconProps}><circle cx="12" cy="12" r="8.5" /><path d="M12 7.5V12l3.2 2" /></svg>
);
const IconAperture = () => (
  <svg {...iconProps}><circle cx="12" cy="12" r="8.5" /><path d="M12 5.5 14.6 10M12 5.5 9.4 10M18.5 12 14.6 10M18.5 12l-4 2.7M5.5 12l4-2M5.5 12l4 2.7M12 18.5 9.4 14M12 18.5l2.6-4.5" /></svg>
);
const IconGlare = () => (
  <svg {...iconProps}><circle cx="12" cy="12" r="2.6" /><path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M5.6 18.4l2.1-2.1M16.3 7.7l2.1-2.1" /></svg>
);
const IconPalette = () => (
  <svg {...iconProps}><path d="M12 3.5c-5 0-8.5 3.7-8.5 8 0 4 2.8 7 6.2 7 1 0 1.6-.6 1.6-1.4 0-.7-.5-1-.5-1.8 0-.9.8-1.5 1.8-1.5h2c3 0 5.4-2 5.4-5.4 0-3-3.2-4.9-8-4.9Z" /><circle cx="8" cy="11" r="1" fill="currentColor" stroke="none" /><circle cx="12" cy="8" r="1" fill="currentColor" stroke="none" /><circle cx="16" cy="11" r="1" fill="currentColor" stroke="none" /></svg>
);
const IconLens = () => (
  <svg {...iconProps}><path d="M4 12c2.8-5 13.2-5 16 0-2.8 5-13.2 5-16 0Z" /><circle cx="12" cy="12" r="2.6" /></svg>
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
const IconArrows = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M8 7 4 12l4 5M16 7l4 5-4 5" /></svg>
);

/* ============================================================
   SHARED LEAD-FORM LOGIC — same validation rules as the other
   city pages (name + 10-digit Indian mobile), same submit flow
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
      // Same lead-capture endpoint used by the other city pages — distinguished by `source`.
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          phone,
          service: "Cataract Surgery",
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

/* ── Hero / primary lead card (glass panel) ── */
function LeadCard() {
  const f = useLeadForm();
  return (
    <div className="lead-card" id="lead-card-anchor">
      <div className="lead-card-badge">Free Cataract Screening</div>
      <h3 className="lead-card-title">Check your eyes, no obligation</h3>
      <p className="lead-card-sub">A specialist calls you back — usually within minutes.</p>

      {f.status === "success" ? (
        <div className="form-success">
          <div className="success-mark">✓</div>
          <p>{f.message}</p>
        </div>
      ) : (
        <form onSubmit={(e) => f.handleSubmit(e, "cataract-gurugram-hero")} noValidate>
          <div className="field-group">
            <label htmlFor="hero-name-input">Your name</label>
            <input
              id="hero-name-input"
              type="text"
              placeholder="Rohit Sharma"
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
            {f.status === "loading" ? <span className="btn-loading"><span className="spinner" />Booking…</span> : "Book free screening"}
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
    <form className="lead-strip" onSubmit={(e) => f.handleSubmit(e, "cataract-gurugram-closing")} noValidate>
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

/* ============================================================
   SIGNATURE ELEMENT — the Cyber City skyline rendered twice,
   clouded vs. clear, with a draggable divider. The metaphor is
   literal: Gurugram is a city of glass towers, and a cataract
   is a clouded lens — so the page lets you wipe the glass clean.
   ============================================================ */
function CyberSkylineSVG() {
  return (
    <svg viewBox="0 0 420 260" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
      <rect x="0" y="0" width="420" height="260" fill="#0B1626" />
      <circle cx="340" cy="46" r="46" fill="#FFB454" opacity="0.16" />
      <circle cx="340" cy="46" r="15" fill="#FFE3AE" />
      {/* distant haze band — NCR sky */}
      <rect x="0" y="120" width="420" height="40" fill="#1B3148" opacity="0.5" />
      {/* glass towers, Cyber City silhouette */}
      <g>
        <rect x="18" y="150" width="30" height="92" fill="#142436" stroke="#2FE0D0" strokeOpacity="0.35" />
        <rect x="56" y="120" width="26" height="122" fill="#102132" stroke="#2FE0D0" strokeOpacity="0.35" />
        <rect x="90" y="170" width="22" height="72" fill="#142436" stroke="#2FE0D0" strokeOpacity="0.3" />
        <rect x="150" y="96" width="34" height="146" fill="#0E1E30" stroke="#FFB454" strokeOpacity="0.3" />
        <rect x="192" y="130" width="24" height="112" fill="#142436" stroke="#2FE0D0" strokeOpacity="0.3" />
        <rect x="226" y="70" width="38" height="172" fill="#0E1E30" stroke="#2FE0D0" strokeOpacity="0.4" />
        <rect x="272" y="140" width="24" height="102" fill="#142436" stroke="#FFB454" strokeOpacity="0.3" />
        <rect x="304" y="108" width="30" height="134" fill="#102132" stroke="#2FE0D0" strokeOpacity="0.3" />
        <rect x="360" y="160" width="26" height="82" fill="#142436" stroke="#2FE0D0" strokeOpacity="0.3" />
        <rect x="392" y="180" width="20" height="62" fill="#102132" stroke="#2FE0D0" strokeOpacity="0.3" />
      </g>
      {/* lit windows */}
      <g fill="#2FE0D0">
        <rect x="22" y="160" width="3" height="3" /><rect x="30" y="172" width="3" height="3" /><rect x="38" y="186" width="3" height="3" />
        <rect x="60" y="132" width="3" height="3" /><rect x="68" y="150" width="3" height="3" /><rect x="74" y="170" width="3" height="3" />
        <rect x="160" y="110" width="3" height="3" /><rect x="170" y="130" width="3" height="3" /><rect x="160" y="160" width="3" height="3" /><rect x="174" y="180" width="3" height="3" />
        <rect x="232" y="86" width="3" height="3" /><rect x="244" y="104" width="3" height="3" /><rect x="232" y="130" width="3" height="3" /><rect x="252" y="150" width="3" height="3" />
        <rect x="310" y="122" width="3" height="3" /><rect x="320" y="142" width="3" height="3" /><rect x="312" y="166" width="3" height="3" />
      </g>
      <g fill="#FFB454">
        <rect x="156" y="150" width="3" height="3" /><rect x="178" y="120" width="3" height="3" />
        <rect x="280" y="156" width="3" height="3" /><rect x="290" y="180" width="3" height="3" />
      </g>
      {/* the expressway, Golf Course Extension Rd */}
      <path d="M0 226 Q210 206 420 226" fill="none" stroke="#0A141F" strokeWidth="26" />
      <path d="M0 226 Q210 206 420 226" fill="none" stroke="#3A4B5E" strokeWidth="1.4" strokeDasharray="10 10" />
      {/* oncoming headlights with halo bloom */}
      <g>
        <circle cx="120" cy="220" r="13" fill="#FFE9C2" opacity="0.22" />
        <circle cx="120" cy="220" r="4" fill="#FFF6E2" />
        <circle cx="252" cy="214" r="13" fill="#FFE9C2" opacity="0.22" />
        <circle cx="252" cy="214" r="4" fill="#FFF6E2" />
        <circle cx="340" cy="222" r="10" fill="#FF9A7A" opacity="0.2" />
        <circle cx="340" cy="222" r="3.4" fill="#FFC9B6" />
      </g>
    </svg>
  );
}

function ClaritySlider() {
  const [percent, setPercent] = useState(48);
  const [dragging, setDragging] = useState(false);
  const trackRef = useRef<HTMLDivElement>(null);

  function updateFromClientX(clientX: number) {
    const el = trackRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    let p = ((clientX - rect.left) / rect.width) * 100;
    p = Math.max(0, Math.min(100, p));
    setPercent(p);
  }

  useEffect(() => {
    if (!dragging) return;
    function onMove(e: MouseEvent | TouchEvent) {
      const clientX = e instanceof TouchEvent ? e.touches[0]?.clientX : (e as MouseEvent).clientX;
      if (clientX !== undefined) updateFromClientX(clientX);
    }
    function onUp() {
      setDragging(false);
    }
    window.addEventListener("mousemove", onMove);
    window.addEventListener("touchmove", onMove);
    window.addEventListener("mouseup", onUp);
    window.addEventListener("touchend", onUp);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("touchmove", onMove);
      window.removeEventListener("mouseup", onUp);
      window.removeEventListener("touchend", onUp);
    };
  }, [dragging]);

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "ArrowLeft") setPercent((p) => Math.max(0, p - 4));
    if (e.key === "ArrowRight") setPercent((p) => Math.min(100, p + 4));
  }

  return (
    <div className="clarity-slider-wrap">
      <div
        className="clarity-slider"
        ref={trackRef}
        onMouseDown={(e) => { setDragging(true); updateFromClientX(e.clientX); }}
        onTouchStart={(e) => { setDragging(true); updateFromClientX(e.touches[0].clientX); }}
      >
        <div className="slider-layer layer-foggy"><CyberSkylineSVG /></div>
        <div className="slider-layer layer-clear" style={{ clipPath: `inset(0 ${100 - percent}% 0 0)` }}>
          <CyberSkylineSVG />
        </div>
        <div className="slider-divider" style={{ left: `${percent}%` }} />
        <div
          className="slider-handle"
          style={{ left: `${percent}%` }}
          role="slider"
          tabIndex={0}
          aria-label="Compare cataract vision to vision after surgery"
          aria-valuenow={Math.round(percent)}
          aria-valuemin={0}
          aria-valuemax={100}
          onKeyDown={handleKeyDown}
        >
          <IconArrows />
        </div>
        <span className="slider-label label-left">Cataract vision</span>
        <span className="slider-label label-right">After surgery</span>
      </div>
      <p className="slider-hint">Drag the divider to see the difference</p>
    </div>
  );
}

/* ============================================================
   INTERACTIVE — IOL lens selector. A real choice patients make,
   so a segmented control with a live detail panel earns its
   place rather than decorating the page.
   ============================================================ */
const LENS_OPTIONS = [
  {
    id: "mono",
    label: "Monofocal",
    tag: "Most common",
    desc: "A single, fixed focusing power — almost always set for clear distance vision. Sharp for driving and screens; reading glasses are typically still needed for fine print.",
    bullets: ["Lowest cost of the three", "Excellent, predictable distance vision", "Reading glasses usually still required"],
  },
  {
    id: "multi",
    label: "Multifocal",
    tag: "Least glasses dependence",
    desc: "Built with multiple focusing zones, so distance, midrange, and near vision are all addressed by one lens. Most patients reach for glasses far less often.",
    bullets: ["Distance, midrange and near covered", "Some patients notice mild halos at night", "Best for those who want glasses-free days"],
  },
  {
    id: "toric",
    label: "Toric",
    tag: "Corrects astigmatism",
    desc: "Shaped to counter an irregular, football-shaped cornea, alongside treating the cataract itself. Recommended whenever astigmatism is part of the diagnosis.",
    bullets: ["Built for corneas with astigmatism", "Can be combined with multifocal optics", "Precise alignment during surgery is key"],
  },
];

function LensSelector() {
  const [active, setActive] = useState(LENS_OPTIONS[0].id);
  const current = LENS_OPTIONS.find((l) => l.id === active) ?? LENS_OPTIONS[0];
  return (
    <div className="lens-selector">
      <div className="lens-tabs" role="tablist" aria-label="IOL lens types">
        {LENS_OPTIONS.map((l) => (
          <button
            key={l.id}
            role="tab"
            aria-selected={active === l.id}
            className={`lens-tab ${active === l.id ? "lens-tab-active" : ""}`}
            onClick={() => setActive(l.id)}
          >
            {l.label}
          </button>
        ))}
      </div>
      <div className="lens-panel">
        <span className="lens-tag">{current.tag}</span>
        <p className="lens-desc">{current.desc}</p>
        <ul className="lens-bullets">
          {current.bullets.map((b) => (
            <li key={b}>{b}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

/* ============================================================
   INTERACTIVE — symptom self-check. Informational only: it
   reflects common early signs back at the reader without ever
   diagnosing, and nudges toward a free screening.
   ============================================================ */
const SYMPTOMS = [
  { id: "halos", text: "Headlights look like they have starbursts or rings around them at night" },
  { id: "colors", text: "Colours seem duller, or everything looks slightly yellow or brown-tinted" },
  { id: "light", text: "You need brighter light than before to read comfortably" },
  { id: "rx", text: "Your glasses prescription has changed more than once in the last two years" },
  { id: "glare", text: "Sunlight or oncoming traffic feels harder to handle while driving" },
];

function SymptomCheck() {
  const [checked, setChecked] = useState<Record<string, boolean>>({});
  const count = Object.values(checked).filter(Boolean).length;

  function toggle(id: string) {
    setChecked((c) => ({ ...c, [id]: !c[id] }));
  }

  let message = "Tick anything that sounds familiar.";
  let tone = "neutral";
  if (count >= 1 && count <= 1) {
    message = "Just the one — likely nothing urgent, but an annual screening is still a good habit.";
    tone = "low";
  } else if (count >= 2 && count <= 3) {
    message = "A few of these are common early cataract signs. Worth a quick, free screening.";
    tone = "mid";
  } else if (count >= 4) {
    message = "These line up closely with cataract symptoms. We'd recommend booking a screening soon.";
    tone = "high";
  }

  return (
    <div className="symptom-check">
      <ul className="symptom-list">
        {SYMPTOMS.map((s) => (
          <li key={s.id}>
            <label className="symptom-item">
              <input type="checkbox" checked={!!checked[s.id]} onChange={() => toggle(s.id)} />
              <span className="symptom-box" aria-hidden="true">{checked[s.id] ? "✓" : ""}</span>
              <span>{s.text}</span>
            </label>
          </li>
        ))}
      </ul>
      <div className={`symptom-result symptom-result-${tone}`}>
        <span className="symptom-count">{count}/5</span>
        <p>{message}</p>
      </div>
    </div>
  );
}

/* ── Progress ring — each step's arc closes a little further,
   ending fully closed: the journey from clouded to clear. ── */
function ProgressRing({ step, total, numeral }: { step: number; total: number; numeral: string }) {
  const r = 24;
  const c = 2 * Math.PI * r;
  const filled = (step / total) * c;
  return (
    <svg viewBox="0 0 64 64" className="progress-ring">
      <circle cx="32" cy="32" r={r} className="ring-track" />
      <circle cx="32" cy="32" r={r} className="ring-fill" style={{ strokeDasharray: `${filled} ${c}` }} transform="rotate(-90 32 32)" />
      <text x="32" y="38" textAnchor="middle" className="ring-numeral">{numeral}</text>
    </svg>
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

function ProcessStep({ step, numeral, title, desc }: { step: number; numeral: string; title: string; desc: string }) {
  return (
    <div className="process-step">
      <ProgressRing step={step} total={4} numeral={numeral} />
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
  { q: "Is cataract surgery painful?", a: "No. Numbing eye drops are used throughout, and most procedures are over in 10-15 minutes. Mild grittiness or light sensitivity for a day or two afterward is normal." },
  { q: "How do I know if I have a cataract?", a: "Common signs include hazy or dim vision, halos around lights at night, and colours looking faded or yellow-tinted. A short, painless eye screening confirms it either way." },
  { q: "Which IOL lens is right for me?", a: "It depends on your lifestyle, your astigmatism, and how often you're willing to wear glasses afterward. Your surgeon walks you through Monofocal, Multifocal, and Toric options after your screening." },
  { q: "How much does cataract surgery cost in Gurugram?", a: "Cost varies with the lens you choose and the technology used. You'll get one clear, itemised quote after your screening at any of our Gurugram centres — no hidden charges added later." },
  { q: "How soon can I drive or get back to office?", a: "Most patients resume light office work within a day or two, and driving once vision is confirmed stable at the first follow-up — usually within a week." },
];

/* ============================================================
   PAGE
   ============================================================ */
export default function CataractGurugramLandingPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  function focusHeroForm() {
    document.getElementById("lead-card-anchor")?.scrollIntoView({ behavior: "smooth", block: "center" });
    document.getElementById("hero-name-input")?.focus();
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter:wght@400;500;600;700&family=IBM+Plex+Mono:wght@500;600&display=swap');

        :root{
          --ink:#0B1626; --ink-soft:#13233A; --ink-deep:#060B14;
          --clarity:#2FE0D0; --clarity-soft:#7FF0E6;
          --glint:#FFB454; --glint-soft:#FFD9A0;
          --fog:#9FB3C8;
          --paper:#F3F7FB; --paper-deep:#E7EEF6; --white:#FFFFFF;
          --text:#0E1B2C; --muted:#5C7088; --line:#D9E2EC; --danger:#E0455B;
          --r-lg:14px; --r-md:10px; --r-sm:8px;
          --font-display:'Space Grotesk', system-ui, sans-serif;
          --font-body:'Inter', system-ui, sans-serif;
          --font-mono:'IBM Plex Mono', monospace;
        }
        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
        html{scroll-behavior:smooth;}
        body{font-family:var(--font-body);color:var(--text);background:var(--paper);}
        h1,h2,h3,h4{font-family:var(--font-display);}
        button{font-family:inherit;}

        /* ── glass utility ── */
        .glass{background:rgba(255,255,255,0.07);border:1px solid rgba(255,255,255,0.16);backdrop-filter:blur(18px);-webkit-backdrop-filter:blur(18px);}
        .glass-light{background:rgba(255,255,255,0.66);border:1px solid rgba(11,22,38,0.08);backdrop-filter:blur(14px);-webkit-backdrop-filter:blur(14px);}

        /* ── TOP LINE ── */
        .top-line{background:var(--ink);color:var(--clarity-soft);text-align:center;font-family:var(--font-mono);font-size:12.5px;font-weight:500;letter-spacing:.4px;padding:9px 6vw;}

        /* ── HERO ── */
        .hero{
          background:radial-gradient(ellipse 65% 55% at 78% 12%, rgba(47,224,208,0.16) 0%, transparent 60%), radial-gradient(ellipse 50% 40% at 10% 90%, rgba(255,180,84,0.10) 0%, transparent 60%), linear-gradient(160deg,var(--ink) 0%, var(--ink-deep) 100%);
          display:grid;grid-template-columns:1fr 460px;gap:60px;align-items:start;
          padding:96px 6vw 80px;position:relative;overflow:hidden;
        }
        .hero-left{z-index:1;padding-top:14px;}
        .eyebrow{
          display:inline-flex;align-items:center;gap:8px;
          background:rgba(47,224,208,0.08);border:1px solid rgba(47,224,208,0.4);
          color:var(--clarity-soft);font-family:var(--font-mono);font-size:11px;font-weight:600;
          letter-spacing:1.4px;text-transform:uppercase;padding:6px 14px;border-radius:100px;margin-bottom:26px;
        }
        .hero-headline{margin-bottom:6px;color:var(--white);font-weight:700;line-height:1.02;}
        .hero-headline .l1{display:block;font-size:clamp(46px,7.4vw,86px);background:linear-gradient(100deg,var(--white) 30%,var(--clarity-soft) 100%);-webkit-background-clip:text;background-clip:text;color:transparent;}
        .hero-headline .l2{display:block;font-size:clamp(22px,3.4vw,34px);color:rgba(255,255,255,0.92);margin-top:10px;font-weight:600;}
        .hero-headline .l3{display:block;font-size:clamp(15px,2vw,18px);color:var(--glint-soft);margin-top:10px;font-weight:500;font-family:var(--font-mono);}

        .hero-sub{font-size:16px;line-height:1.8;color:rgba(255,255,255,0.68);max-width:520px;margin:26px 0 32px;}
        .hero-actions{display:flex;align-items:center;gap:18px;flex-wrap:wrap;margin-bottom:30px;}
        .btn-primary-cta{
          background:linear-gradient(100deg,var(--clarity) 0%, var(--clarity-soft) 100%);color:var(--ink);border:none;cursor:pointer;
          font-weight:700;font-size:15px;padding:15px 30px;border-radius:var(--r-sm);
          transition:transform .15s,box-shadow .2s;
        }
        .btn-primary-cta:hover{transform:translateY(-2px);box-shadow:0 12px 30px rgba(47,224,208,0.25);}
        .hero-badges{display:flex;gap:10px;flex-wrap:wrap;}
        .badge{
          display:flex;align-items:center;gap:7px;background:rgba(255,255,255,0.05);
          border:1px solid rgba(255,255,255,0.14);color:rgba(255,255,255,0.82);
          font-size:12.5px;padding:7px 14px;border-radius:var(--r-sm);
        }

        /* ── CLARITY SLIDER (signature) ── */
        .clarity-slider-wrap{margin-bottom:26px;}
        .clarity-slider{
          position:relative;width:100%;aspect-ratio:420/260;border-radius:var(--r-lg);overflow:hidden;
          border:1px solid rgba(255,255,255,0.16);cursor:ew-resize;touch-action:none;
          box-shadow:0 30px 70px rgba(6,11,20,0.5);
        }
        .slider-layer{position:absolute;inset:0;}
        .slider-layer svg{width:100%;height:100%;display:block;}
        .layer-foggy{filter:blur(3.5px) saturate(0.45) brightness(0.78) sepia(0.25);}
        .layer-clear{filter:saturate(1.15) brightness(1.04);}
        .slider-divider{position:absolute;top:0;bottom:0;width:2px;background:rgba(255,255,255,0.85);transform:translateX(-1px);pointer-events:none;}
        .slider-handle{
          position:absolute;top:50%;width:42px;height:42px;border-radius:50%;
          background:var(--white);color:var(--ink);display:flex;align-items:center;justify-content:center;
          transform:translate(-50%,-50%);box-shadow:0 6px 18px rgba(6,11,20,0.4);cursor:ew-resize;
        }
        .slider-handle svg{width:20px;height:20px;}
        .slider-label{
          position:absolute;bottom:12px;font-family:var(--font-mono);font-size:11px;font-weight:500;
          color:rgba(255,255,255,0.85);background:rgba(6,11,20,0.5);padding:5px 10px;border-radius:100px;
          pointer-events:none;letter-spacing:.3px;
        }
        .label-left{left:12px;}
        .label-right{right:12px;}
        .slider-hint{text-align:center;font-size:12.5px;color:rgba(255,255,255,0.45);margin-top:10px;font-family:var(--font-mono);}

        /* ── LEAD CARD (hero, glass) ── */
        .lead-card{
          border-radius:var(--r-lg);padding:32px 30px;position:relative;z-index:2;
        }
        .lead-card.glass{}
        .lead-card-badge{
          display:inline-block;background:var(--glint);
          color:var(--ink);font-size:11px;font-weight:700;letter-spacing:1.1px;text-transform:uppercase;
          padding:5px 13px;border-radius:100px;margin-bottom:16px;
        }
        .lead-card-title{font-size:20px;font-weight:600;color:var(--white);margin-bottom:6px;}
        .lead-card-sub{font-size:13.5px;color:rgba(255,255,255,0.6);margin-bottom:24px;}
        .field-group{margin-bottom:15px;}
        .field-group label{display:block;font-size:12.5px;font-weight:600;color:rgba(255,255,255,0.85);margin-bottom:6px;letter-spacing:.3px;}
        .field-group input{
          width:100%;padding:12px 15px;border:1.5px solid rgba(255,255,255,0.2);border-radius:var(--r-sm);
          font-size:15px;color:var(--white);outline:none;background:rgba(255,255,255,0.06);transition:border-color .2s;
        }
        .field-group input::placeholder{color:rgba(255,255,255,0.35);}
        .field-group input:focus{border-color:var(--clarity);background:rgba(255,255,255,0.1);}
        .field-group input.input-error{border-color:#FF8FA0;}
        .field-err{display:block;margin-top:4px;font-size:12px;color:#FF8FA0;}
        .btn-primary{
          width:100%;background:linear-gradient(100deg,var(--clarity) 0%, var(--clarity-soft) 100%);
          color:var(--ink);border:none;cursor:pointer;font-weight:700;font-size:15.5px;
          padding:15px;border-radius:var(--r-sm);margin-top:4px;transition:opacity .2s,transform .15s;
        }
        .btn-primary:hover:not(:disabled){transform:translateY(-2px);opacity:.93;}
        .btn-primary:disabled{opacity:.7;cursor:not-allowed;}
        .btn-loading{display:flex;align-items:center;justify-content:center;gap:10px;}
        .spinner{width:15px;height:15px;border:2px solid rgba(11,22,38,0.3);border-top-color:var(--ink);border-radius:50%;animation:spin .7s linear infinite;display:inline-block;}
        @keyframes spin{to{transform:rotate(360deg);}}
        .form-privacy{font-size:11.5px;color:rgba(255,255,255,0.4);text-align:center;margin-top:13px;}
        .form-api-error{background:rgba(224,69,91,0.12);border:1px solid rgba(224,69,91,0.4);color:#FF8FA0;font-size:12.5px;padding:9px 13px;border-radius:var(--r-sm);margin-bottom:10px;}
        .form-success{text-align:center;padding:16px 0;}
        .success-mark{width:46px;height:46px;border-radius:50%;background:var(--clarity);color:var(--ink);display:flex;align-items:center;justify-content:center;font-size:22px;margin:0 auto 16px;animation:pop .4s ease;}
        @keyframes pop{from{transform:scale(0);}to{transform:scale(1);}}
        .form-success p{font-size:15px;color:var(--white);line-height:1.6;}

        /* ── TRUST STRIP ── */
        .trust-strip{
          background:var(--ink-soft);border-bottom:1px solid rgba(255,255,255,0.08);
          padding:18px 6vw;display:flex;justify-content:center;gap:36px;flex-wrap:wrap;
        }
        .trust-item{font-size:13px;font-weight:600;color:var(--clarity-soft);font-family:var(--font-mono);}

        /* ── STATS ── */
        .stats-band{
          background:var(--paper);padding:54px 6vw;display:flex;justify-content:space-around;
          flex-wrap:wrap;gap:32px;border-bottom:1px solid var(--line);
        }
        .stat{text-align:center;}
        .stat-value{display:block;font-family:var(--font-mono);font-size:28px;font-weight:600;color:var(--ink);background:linear-gradient(100deg,var(--ink) 30%, #0E7A75 100%);-webkit-background-clip:text;background-clip:text;}
        .stat-label{display:block;font-size:12px;color:var(--muted);margin-top:6px;letter-spacing:.3px;text-transform:uppercase;}

        /* ── SECTION SHARED ── */
        .section{padding:88px 6vw;}
        .eyebrow-sm{font-family:var(--font-mono);font-size:11px;font-weight:600;letter-spacing:1.8px;text-transform:uppercase;color:#0E7A75;margin-bottom:14px;}
        .section-title{font-size:clamp(26px,3.4vw,40px);font-weight:700;line-height:1.18;margin-bottom:16px;color:var(--text);}
        .section-lead{font-size:16px;line-height:1.75;color:var(--muted);max-width:580px;margin-bottom:50px;}

        /* ── BENEFITS ── */
        .benefits-section{background:var(--white);}
        .benefits-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(250px,1fr));gap:20px;}
        .benefit-card{
          background:var(--paper);border:1px solid var(--line);border-radius:var(--r-lg);
          padding:28px 24px;transition:transform .2s,box-shadow .2s;
        }
        .benefit-card:hover{transform:translateY(-4px);box-shadow:0 16px 36px rgba(11,22,38,0.08);}
        .benefit-icon{
          width:42px;height:42px;display:flex;align-items:center;justify-content:center;
          border-radius:12px;background:rgba(47,224,208,0.12);color:#0E7A75;margin-bottom:16px;
        }
        .benefit-icon svg{width:22px;height:22px;}
        .benefit-card h3{font-size:17px;font-weight:600;margin-bottom:8px;color:var(--text);}
        .benefit-card p{font-size:14px;line-height:1.7;color:var(--muted);}

        /* ── CLARITY-CHECK (interactive band) ── */
        .check-section{background:linear-gradient(160deg,var(--ink) 0%, var(--ink-soft) 100%);color:var(--white);}
        .check-section .eyebrow-sm{color:var(--glint-soft);}
        .check-section .section-lead{color:rgba(255,255,255,0.62);}
        .check-grid{display:grid;grid-template-columns:1.1fr 0.9fr;gap:40px;align-items:start;}
        .symptom-list{list-style:none;display:flex;flex-direction:column;gap:12px;margin-bottom:0;}
        .symptom-item{display:flex;align-items:flex-start;gap:12px;cursor:pointer;font-size:14.5px;line-height:1.6;color:rgba(255,255,255,0.85);}
        .symptom-item input{position:absolute;opacity:0;width:0;height:0;}
        .symptom-box{
          flex-shrink:0;width:20px;height:20px;border-radius:6px;border:1.5px solid rgba(255,255,255,0.3);
          display:flex;align-items:center;justify-content:center;font-size:12px;color:var(--ink);
          background:rgba(255,255,255,0.05);margin-top:1px;transition:background .15s,border-color .15s;
        }
        .symptom-item input:checked + .symptom-box{background:var(--clarity);border-color:var(--clarity);}
        .symptom-result{
          margin-top:24px;padding:20px;border-radius:var(--r-lg);display:flex;gap:16px;align-items:center;
          background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.14);
        }
        .symptom-count{font-family:var(--font-mono);font-size:20px;font-weight:600;color:var(--clarity-soft);flex-shrink:0;}
        .symptom-result p{font-size:13.5px;line-height:1.6;color:rgba(255,255,255,0.82);}
        .symptom-result-high{border-color:rgba(255,180,84,0.5);background:rgba(255,180,84,0.08);}
        .symptom-result-high .symptom-count{color:var(--glint-soft);}

        .lens-selector{background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.14);border-radius:var(--r-lg);padding:22px;}
        .lens-tabs{display:flex;gap:8px;margin-bottom:18px;flex-wrap:wrap;}
        .lens-tab{
          background:transparent;border:1px solid rgba(255,255,255,0.2);color:rgba(255,255,255,0.7);
          font-size:13.5px;font-weight:600;padding:9px 16px;border-radius:100px;cursor:pointer;transition:all .15s;
        }
        .lens-tab-active{background:var(--clarity);border-color:var(--clarity);color:var(--ink);}
        .lens-tag{display:inline-block;font-family:var(--font-mono);font-size:11px;color:var(--glint-soft);letter-spacing:.4px;text-transform:uppercase;margin-bottom:10px;}
        .lens-desc{font-size:14px;line-height:1.7;color:rgba(255,255,255,0.78);margin-bottom:16px;}
        .lens-bullets{list-style:none;display:flex;flex-direction:column;gap:8px;}
        .lens-bullets li{font-size:13.5px;color:rgba(255,255,255,0.7);padding-left:18px;position:relative;}
        .lens-bullets li::before{content:'';position:absolute;left:0;top:7px;width:7px;height:7px;border-radius:50%;background:var(--clarity);}

        /* ── TESTIMONIALS ── */
        .testimonials-section{background:var(--paper);}
        .testimonial-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:20px;}
        .testimonial{
          background:var(--white);border:1px solid var(--line);border-radius:var(--r-lg);
          padding:26px 24px;display:flex;flex-direction:column;gap:16px;
        }
        .testimonial blockquote{font-size:14.5px;line-height:1.75;color:var(--text);}
        .testimonial figcaption{display:flex;flex-direction:column;font-size:13px;color:var(--muted);}
        .testimonial figcaption strong{color:#0E7A75;font-weight:600;}
        .testimonial-note{font-size:12.5px;color:var(--muted);margin-top:26px;}

        /* ── PROCESS ── */
        .process-section{background:var(--white);}
        .process-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:24px;margin-top:8px;}
        .process-step{background:var(--paper);border:1px solid var(--line);border-radius:var(--r-lg);padding:28px 22px;}
        .progress-ring{width:52px;height:52px;display:block;margin-bottom:16px;}
        .ring-track{fill:none;stroke:var(--line);stroke-width:5;}
        .ring-fill{fill:none;stroke:var(--clarity);stroke-width:5;stroke-linecap:round;transition:stroke-dasharray .3s;}
        .ring-numeral{font-family:var(--font-mono);font-weight:600;font-size:14px;fill:var(--text);}
        .process-step h4{font-size:16px;font-weight:600;margin-bottom:8px;color:var(--text);}
        .process-step p{font-size:13.5px;line-height:1.7;color:var(--muted);}

        /* ── WHY CHOOSE US ── */
        .why-section{background:var(--paper);}
        .why-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:22px;}
        .why-card{display:flex;gap:18px;background:var(--white);border:1px solid var(--line);border-radius:var(--r-lg);padding:24px;}
        .why-icon{
          flex-shrink:0;width:44px;height:44px;border-radius:12px;background:var(--ink);
          color:var(--clarity-soft);display:flex;align-items:center;justify-content:center;
        }
        .why-icon svg{width:22px;height:22px;}
        .why-card h4{font-size:15.5px;font-weight:600;margin-bottom:6px;color:var(--text);}
        .why-card p{font-size:13.5px;line-height:1.7;color:var(--muted);}

        /* ── FAQ ── */
        .faq-section{background:var(--white);}
        .faq-list{max-width:680px;}
        .faq-item{border-bottom:1px solid var(--line);}
        .faq-q{
          width:100%;background:none;border:none;cursor:pointer;text-align:left;
          display:flex;justify-content:space-between;align-items:center;gap:16px;
          padding:20px 0;font-size:15.5px;font-weight:600;color:var(--text);
        }
        .faq-plus{color:#0E7A75;font-size:20px;flex-shrink:0;}
        .faq-a{font-size:14px;line-height:1.75;color:var(--muted);padding-bottom:20px;max-width:600px;}

        /* ── FINAL CTA ── */
        .closing-section{
          background:linear-gradient(160deg, var(--ink) 0%, var(--ink-deep) 100%);
          padding:84px 6vw;color:var(--white);
        }
        .closing-inner{max-width:760px;margin:0 auto;text-align:center;}
        .closing-inner h2{font-size:clamp(26px,3.8vw,42px);font-weight:700;margin-bottom:14px;}
        .closing-inner > p{font-size:15.5px;color:rgba(255,255,255,0.65);margin-bottom:38px;}

        .lead-strip{
          display:flex;gap:12px;flex-wrap:wrap;justify-content:center;align-items:flex-start;
          background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.16);
          border-radius:var(--r-lg);padding:18px;
        }
        .strip-field{display:flex;flex-direction:column;flex:1;min-width:180px;}
        .strip-field input{
          padding:13px 16px;border:1.5px solid rgba(255,255,255,0.2);border-radius:var(--r-sm);
          background:rgba(255,255,255,0.05);color:var(--white);font-size:14.5px;outline:none;transition:border-color .2s;
        }
        .strip-field input::placeholder{color:rgba(255,255,255,0.45);}
        .strip-field input:focus{border-color:var(--clarity);}
        .strip-field input.input-error{border-color:#FF8FA0;}
        .btn-strip{
          background:linear-gradient(100deg,var(--clarity) 0%, var(--clarity-soft) 100%);color:var(--ink);border:none;cursor:pointer;font-weight:700;
          font-size:14.5px;padding:13px 26px;border-radius:var(--r-sm);white-space:nowrap;
          transition:transform .15s;
        }
        .btn-strip:hover:not(:disabled){transform:translateY(-1px);}
        .btn-strip:disabled{opacity:.7;cursor:not-allowed;}
        .strip-success{
          display:flex;align-items:center;gap:14px;justify-content:center;
          background:rgba(255,255,255,0.08);border:1px solid rgba(255,255,255,0.2);
          border-radius:var(--r-lg);padding:22px;font-size:15px;
        }
        .strip-api-error{flex-basis:100%;text-align:left;margin-top:4px;}

        /* ── RESPONSIVE ── */
        @media (max-width:960px){
          .hero{grid-template-columns:1fr;}
          .check-grid{grid-template-columns:1fr;}
        }
        @media (max-width:600px){
          .lead-card{padding:26px 22px;}
          .section{padding:64px 6vw;}
          .lead-strip{flex-direction:column;}
          .strip-field{width:100%;}
          .hero{padding:88px 5vw 56px;}
        }

        :focus-visible{outline:2px solid var(--clarity);outline-offset:2px;}
      `}</style>

      {/* ── TOP LINE ─────────────────────────────────── */}
      <div className="top-line">Best Healthcare in Gurugram</div>

      {/* ── HERO ─────────────────────────────────────── */}
      <section className="hero">
        <div className="hero-left">
          <span className="eyebrow">Lucenta Vision Institute · Gurugram</span>
          <h1 className="hero-headline">
            <span className="l1">CLEAR</span>
            <span className="l2">Cyber City, back in focus</span>
            <span className="l3">// blade-optional cataract surgery · day-care procedure</span>
          </h1>
          <p className="hero-sub">
            Headlights turning into starbursts on the Golf Course Extension Road. Your boardroom
            deck looking washed out under office lights. The skyline going a little grey through
            the haze that isn't outside your window — it's in your lens. Cataract surgery clears
            it, permanently, in a same-day procedure.
          </p>
          <div className="hero-actions">
            <button className="btn-primary-cta" onClick={focusHeroForm}>Book free screening</button>
          </div>
          <div className="hero-badges">
            <span className="badge">NABH-accredited centre</span>
            <span className="badge">Femto-laser & micro-incision options</span>
            <span className="badge">Day-care — home the same evening</span>
          </div>
        </div>

        <div>
          <ClaritySlider />
          <LeadCard />
        </div>
      </section>

      {/* ── TRUST STRIP ──────────────────────────────── */}
      <div className="trust-strip">
        <span className="trust-item">4.9★ average patient rating</span>
        <span className="trust-item">Senior, fellowship-trained surgeons</span>
        <span className="trust-item">Cyber City · Golf Course Rd · Sohna Rd · MG Road</span>
      </div>

      {/* ── STATS ────────────────────────────────────── */}
      <div className="stats-band">
        <Stat value="22,000+" label="Cataract surgeries" />
        <Stat value="12+" label="Years in practice" />
        <Stat value="98%" label="Patient satisfaction" />
        <Stat value="16,000+" label="Happy patients" />
        <Stat value="5" label="Centres across Gurugram" />
      </div>

      {/* ── BENEFITS ─────────────────────────────────── */}
      <section className="section benefits-section">
        <p className="eyebrow-sm">Why act on it</p>
        <h2 className="section-title">A permanent fix for a city that runs on sharp vision</h2>
        <p className="section-lead">
          Cataract surgery replaces the eye's clouded natural lens with a clear artificial one.
          Here's what that means once you're back at your desk, behind the wheel, or on the green.
        </p>
        <div className="benefits-grid">
          <BenefitCard icon={<IconClock />} title="Day-care, not a hospital stay" desc="Walk in for your procedure in the morning, walk out by evening — no overnight admission." />
          <BenefitCard icon={<IconAperture />} title="Femto-laser precision" desc="Bladeless, computer-mapped incisions accurate to the micron, where available." />
          <BenefitCard icon={<IconGlare />} title="No more headlight halos" desc="The starbursts and glare around oncoming traffic on NH-48 and the expressway fade with the cataract." />
          <BenefitCard icon={<IconPalette />} title="Colours back to full saturation" desc="The yellow-brown tint a cataract adds to everything you see lifts once it's removed." />
          <BenefitCard icon={<IconLens />} title="A lens for your lifestyle" desc="Monofocal, multifocal, or toric IOLs — chosen around how you actually use your eyes." />
          <BenefitCard icon={<IconShield />} title="Care that follows you home" desc="Scheduled follow-ups and round-the-clock support through recovery." />
        </div>
      </section>

      {/* ── INTERACTIVE: SYMPTOM CHECK + LENS SELECTOR ── */}
      <section className="section check-section">
        <p className="eyebrow-sm">Two things worth five minutes</p>
        <h2 className="section-title">Check your symptoms. Then explore your lens options.</h2>
        <p className="section-lead">
          Neither of these replaces a real screening — but both make the conversation with your
          surgeon a lot more useful.
        </p>
        <div className="check-grid">
          <div>
            <h3 style={{ fontSize: "17px", marginBottom: "16px", fontWeight: 600 }}>Could it be a cataract?</h3>
            <SymptomCheck />
          </div>
          <div>
            <h3 style={{ fontSize: "17px", marginBottom: "16px", fontWeight: 600 }}>Compare lens (IOL) types</h3>
            <LensSelector />
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ─────────────────────────────── */}
      <section className="section testimonials-section">
        <p className="eyebrow-sm">Patient Stories</p>
        <h2 className="section-title">What clear vision actually feels like</h2>
        <div className="testimonial-grid">
          <Testimonial quote="I drive back from Cyber Hub most nights on the Golf Course Extension Road, and oncoming headlights had turned into starbursts. That's just gone now." name="Anil M." role="Strategy Lead, DLF Phase 3" />
          <Testimonial quote="Reading the green in afternoon glare used to take three tries. Now I just play." name="Renu K." role="Retired Banker, Golf Course Road" />
          <Testimonial quote="My boardroom deck looked washed out for two years before I realised it was my eyes, not the projector." name="Vikram S." role="Operations Director, Cyber City" />
        </div>
        <p className="testimonial-note">Shared with patients' permission. Individual results vary by eye condition and candidacy.</p>
      </section>

      {/* ── PROCESS ──────────────────────────────────── */}
      <section className="section process-section">
        <p className="eyebrow-sm">What To Expect</p>
        <h2 className="section-title">Four steps, start to clear vision</h2>
        <p className="section-lead">Each step closes the ring a little further — by the fourth, it's complete.</p>
        <div className="process-grid">
          <ProcessStep step={1} numeral="01" title="Free consultation call" desc="We call you back to talk through your symptoms and every question — no clinic visit needed yet." />
          <ProcessStep step={2} numeral="02" title="Detailed eye screening" desc="Biometry and IOL power calculation confirm candidacy and the right lens fit for you." />
          <ProcessStep step={3} numeral="03" title="The cataract procedure" desc="A precise, day-care procedure performed by a senior surgeon, typically under 15 minutes." />
          <ProcessStep step={4} numeral="04" title="Recovery & follow-up" desc="Scheduled check-ins make sure your eyes heal exactly as they should." />
        </div>
      </section>

      {/* ── WHY CHOOSE US ────────────────────────────── */}
      <section className="section why-section">
        <p className="eyebrow-sm">Why Lucenta</p>
        <h2 className="section-title">What sets the experience apart</h2>
        <p className="section-lead">Plenty of clinics offer cataract surgery across Gurugram. Here's what we think actually matters once you're in the chair.</p>
        <div className="why-grid">
          <WhyCard icon={<IconAperture />} title="Latest femto-laser technology" desc="Bladeless, computer-guided precision where it's clinically indicated." />
          <WhyCard icon={<IconBadge />} title="Senior surgeons, not residents" desc="Every procedure is performed by a fellowship-trained ophthalmologist with years of experience." />
          <WhyCard icon={<IconTag />} title="Transparent, fair pricing" desc="One clear quote after your screening, across every lens option — no surprise add-ons." />
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
          <h2>Ready to see Cyber City in full colour again?</h2>
          <p>Book a free cataract screening with our specialists across Gurugram. No obligation — just clarity on whether it's time.</p>
          <LeadStrip />
        </div>
      </section>
    </>
  );
}