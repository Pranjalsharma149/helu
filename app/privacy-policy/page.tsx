import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy | Healviacare+ LLP",
  description:
    "Privacy Policy for Healviacare+ LLP — how we collect, use, and protect your personal information.",
};

export default function PrivacyPage() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=Inter:wght@300;400;500;600&display=swap');

        :root {
          --teal-dark:   #0F3D3E;
          --teal-mid:    #1D646B;
          --teal-soft:   #3BA99C;
          --teal-pale:   #E6F4F4;
          --teal-glass:  rgba(29,100,107,0.08);
          --gold:        #D4A853;
          --gold-light:  #FDF3DC;
          --ink:         #0D1F22;
          --slate:       #4A5E61;
          --mist:        #8AA5A7;
          --white:       #FFFFFF;
          --surface:     #F7FAFA;
          --line:        rgba(29,100,107,0.15);
          --font-display: 'Playfair Display', Georgia, serif;
          --font-body:    'Inter', system-ui, sans-serif;
          --radius:       16px;
          --shadow-sm:    0 2px 12px rgba(15,61,62,0.08);
          --shadow-md:    0 8px 32px rgba(15,61,62,0.12);
          --shadow-lg:    0 20px 60px rgba(15,61,62,0.18);
        }

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        .pp-root {
          font-family: var(--font-body);
          color: var(--ink);
          background: var(--white);
          line-height: 1.7;
          overflow-x: hidden;
        }

        /* ── NAV ── */
        .pp-nav {
          position: sticky;
          top: 0;
          z-index: 100;
          background: rgba(255,255,255,0.92);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border-bottom: 1px solid var(--line);
          padding: 0 6vw;
          height: 68px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .pp-nav-logo {
          font-family: var(--font-display);
          font-size: 22px;
          font-weight: 700;
          color: var(--teal-dark);
          text-decoration: none;
          display: flex;
          align-items: center;
          gap: 2px;
        }
        .pp-nav-logo span { color: var(--gold); }
        .pp-nav-back {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 13px;
          font-weight: 500;
          color: var(--teal-mid);
          text-decoration: none;
          padding: 8px 16px;
          border: 1.5px solid var(--teal-mid);
          border-radius: 100px;
          transition: all 0.2s;
        }
        .pp-nav-back:hover {
          background: var(--teal-mid);
          color: white;
        }

        /* ── HERO ── */
        .pp-hero {
          position: relative;
          overflow: hidden;
          background: var(--teal-dark);
          padding: 80px 6vw 100px;
        }
        .pp-hero::before {
          content: '';
          position: absolute;
          inset: 0;
          background:
            radial-gradient(ellipse 70% 80% at 80% 20%, rgba(59,169,156,0.25) 0%, transparent 60%),
            radial-gradient(ellipse 50% 60% at 10% 80%, rgba(212,168,83,0.12) 0%, transparent 55%);
        }
        .pp-hero-grid {
          position: absolute;
          inset: 0;
          opacity: 0.04;
          background-image: linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px);
          background-size: 40px 40px;
        }
        .pp-hero-inner {
          position: relative;
          z-index: 2;
          max-width: 760px;
        }
        .pp-hero-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: rgba(212,168,83,0.15);
          border: 1px solid rgba(212,168,83,0.4);
          color: var(--gold);
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 1.5px;
          text-transform: uppercase;
          padding: 6px 16px;
          border-radius: 100px;
          margin-bottom: 24px;
        }
        .pp-hero h1 {
          font-family: var(--font-display);
          font-size: clamp(36px, 5vw, 64px);
          font-weight: 700;
          color: #fff;
          line-height: 1.1;
          margin-bottom: 20px;
          letter-spacing: -0.5px;
        }
        .pp-hero h1 em {
          font-style: normal;
          color: var(--teal-soft);
        }
        .pp-hero-desc {
          font-size: 16px;
          color: rgba(255,255,255,0.65);
          max-width: 520px;
          line-height: 1.75;
          margin-bottom: 28px;
        }
        .pp-hero-meta {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          background: rgba(255,255,255,0.08);
          border: 1px solid rgba(255,255,255,0.15);
          border-radius: 100px;
          padding: 8px 18px;
          font-size: 13px;
          color: rgba(255,255,255,0.7);
          font-weight: 500;
        }
        .pp-hero-meta svg { opacity: 0.6; }

        /* ── TRUST STRIP ── */
        .pp-trust {
          background: var(--gold-light);
          border-bottom: 1px solid rgba(212,168,83,0.2);
          padding: 14px 6vw;
          display: flex;
          align-items: center;
          gap: 32px;
          flex-wrap: wrap;
          justify-content: center;
        }
        .pp-trust-item {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 13px;
          font-weight: 600;
          color: #7A5A1E;
        }
        .pp-trust-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: var(--gold);
        }

        /* ── LAYOUT ── */
        .pp-layout {
          display: grid;
          grid-template-columns: 260px 1fr;
          max-width: 1100px;
          margin: 0 auto;
          padding: 60px 4vw 80px;
          gap: 56px;
          align-items: start;
        }

        /* ── SIDEBAR TOC ── */
        .pp-sidebar {
          position: sticky;
          top: 88px;
        }
        .pp-toc-card {
          background: var(--surface);
          border: 1px solid var(--line);
          border-radius: var(--radius);
          overflow: hidden;
        }
        .pp-toc-header {
          background: var(--teal-dark);
          padding: 18px 22px;
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .pp-toc-header h2 {
          font-family: var(--font-display);
          font-size: 15px;
          font-weight: 600;
          color: white;
          letter-spacing: 0.3px;
        }
        .pp-toc-list {
          padding: 12px 0;
          list-style: none;
        }
        .pp-toc-list li a {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 9px 22px;
          font-size: 13px;
          font-weight: 500;
          color: var(--slate);
          text-decoration: none;
          transition: all 0.18s;
          border-left: 3px solid transparent;
        }
        .pp-toc-list li a:hover {
          background: var(--teal-glass);
          color: var(--teal-mid);
          border-left-color: var(--teal-mid);
        }
        .pp-toc-num {
          min-width: 20px;
          height: 20px;
          border-radius: 4px;
          background: var(--teal-pale);
          color: var(--teal-mid);
          font-size: 10px;
          font-weight: 700;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        /* ── CONTENT ── */
        .pp-content { min-width: 0; }

        .pp-section {
          margin-bottom: 56px;
          scroll-margin-top: 90px;
        }

        .pp-section-head {
          display: flex;
          align-items: flex-start;
          gap: 16px;
          margin-bottom: 24px;
          padding-bottom: 20px;
          border-bottom: 1px solid var(--line);
        }
        .pp-section-icon {
          width: 44px;
          height: 44px;
          min-width: 44px;
          border-radius: 12px;
          background: var(--teal-pale);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 20px;
          flex-shrink: 0;
        }
        .pp-section-head h2 {
          font-family: var(--font-display);
          font-size: clamp(20px, 2.2vw, 26px);
          font-weight: 700;
          color: var(--teal-dark);
          line-height: 1.25;
          padding-top: 6px;
        }

        .pp-section p {
          font-size: 15px;
          color: var(--slate);
          margin-bottom: 14px;
          line-height: 1.85;
        }
        .pp-section h3 {
          font-size: 14px;
          font-weight: 700;
          color: var(--teal-mid);
          text-transform: uppercase;
          letter-spacing: 0.8px;
          margin: 28px 0 12px;
        }
        .pp-section ul, .pp-section ol {
          padding-left: 0;
          margin-bottom: 14px;
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .pp-section li {
          font-size: 15px;
          color: var(--slate);
          line-height: 1.75;
          padding: 10px 14px 10px 40px;
          background: var(--surface);
          border-radius: 10px;
          position: relative;
          border: 1px solid transparent;
          transition: border-color 0.18s;
        }
        .pp-section li:hover { border-color: var(--line); }
        .pp-section li::before {
          content: '✓';
          position: absolute;
          left: 14px;
          top: 10px;
          color: var(--teal-soft);
          font-weight: 700;
          font-size: 13px;
        }
        .pp-section ol li::before {
          content: counter(item);
          counter-increment: item;
          background: var(--teal-mid);
          color: white;
          width: 18px;
          height: 18px;
          border-radius: 4px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 10px;
          font-weight: 700;
          top: 13px;
        }
        .pp-section ol { counter-reset: item; }

        .pp-highlight {
          background: linear-gradient(135deg, var(--teal-pale) 0%, rgba(230,244,244,0.4) 100%);
          border: 1px solid rgba(29,100,107,0.2);
          border-left: 4px solid var(--teal-mid);
          border-radius: 0 12px 12px 0;
          padding: 18px 22px;
          margin: 22px 0;
          font-size: 14.5px;
          color: var(--ink);
          line-height: 1.8;
        }
        .pp-highlight a { color: var(--teal-mid); font-weight: 600; }

        .pp-gold-box {
          background: linear-gradient(135deg, var(--gold-light) 0%, #FFF8EC 100%);
          border: 1px solid rgba(212,168,83,0.3);
          border-radius: 14px;
          padding: 20px 24px;
          margin: 22px 0;
          font-size: 14.5px;
          color: #5A420E;
          line-height: 1.8;
          display: flex;
          gap: 14px;
          align-items: flex-start;
        }
        .pp-gold-box-icon { font-size: 22px; flex-shrink: 0; }

        .pp-chip-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 12px;
          margin: 16px 0;
        }
        .pp-chip {
          background: white;
          border: 1.5px solid var(--line);
          border-radius: 12px;
          padding: 14px 16px;
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 13.5px;
          font-weight: 600;
          color: var(--ink);
          transition: box-shadow 0.18s;
        }
        .pp-chip:hover { box-shadow: var(--shadow-sm); }
        .pp-chip-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: var(--teal-soft);
          flex-shrink: 0;
        }

        a { color: var(--teal-mid); text-decoration: underline; }

        /* ── RIGHTS CARDS ── */
        .pp-rights-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 14px;
          margin: 16px 0;
        }
        .pp-right-card {
          background: white;
          border: 1.5px solid var(--line);
          border-radius: 14px;
          padding: 18px;
          transition: all 0.2s;
        }
        .pp-right-card:hover {
          border-color: var(--teal-soft);
          box-shadow: var(--shadow-sm);
          transform: translateY(-2px);
        }
        .pp-right-card-icon {
          font-size: 24px;
          margin-bottom: 10px;
          display: block;
        }
        .pp-right-card h4 {
          font-size: 13px;
          font-weight: 700;
          color: var(--teal-dark);
          margin-bottom: 6px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }
        .pp-right-card p {
          font-size: 13px !important;
          margin-bottom: 0 !important;
          line-height: 1.6 !important;
        }

        /* ── SECURITY BADGES ── */
        .pp-security-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          gap: 14px;
          margin: 16px 0;
        }
        .pp-security-badge {
          background: linear-gradient(135deg, var(--teal-dark) 0%, var(--teal-mid) 100%);
          border-radius: 14px;
          padding: 18px;
          color: white;
        }
        .pp-security-badge-icon {
          font-size: 22px;
          margin-bottom: 10px;
          display: block;
        }
        .pp-security-badge h4 {
          font-size: 13px;
          font-weight: 700;
          margin-bottom: 5px;
          color: rgba(255,255,255,0.95);
        }
        .pp-security-badge p {
          font-size: 12.5px;
          color: rgba(255,255,255,0.65);
          line-height: 1.55;
          margin: 0 !important;
        }

        /* ── CONTACT BOX ── */
        .pp-contact-box {
          position: relative;
          overflow: hidden;
          background: var(--teal-dark);
          border-radius: 20px;
          padding: 48px 40px;
          margin-top: 60px;
          text-align: center;
        }
        .pp-contact-box::before {
          content: '';
          position: absolute;
          inset: 0;
          background: radial-gradient(ellipse 80% 60% at 50% 0%, rgba(59,169,156,0.3) 0%, transparent 60%);
        }
        .pp-contact-box-inner { position: relative; z-index: 2; }
        .pp-contact-box h2 {
          font-family: var(--font-display);
          font-size: 28px;
          font-weight: 700;
          color: white;
          margin-bottom: 10px;
        }
        .pp-contact-box p {
          font-size: 15px;
          color: rgba(255,255,255,0.6);
          margin-bottom: 28px !important;
          max-width: 380px;
          margin-left: auto;
          margin-right: auto;
        }
        .pp-contact-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: var(--gold);
          color: var(--ink);
          font-weight: 700;
          font-size: 15px;
          padding: 14px 32px;
          border-radius: 12px;
          text-decoration: none;
          transition: all 0.2s;
          box-shadow: 0 4px 20px rgba(212,168,83,0.35);
        }
        .pp-contact-btn:hover {
          background: #C89840;
          transform: translateY(-2px);
          box-shadow: 0 8px 28px rgba(212,168,83,0.45);
          color: var(--ink);
        }

        /* ── FOOTER ── */
        .pp-footer {
          background: var(--ink);
          padding: 28px 6vw;
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 16px;
          margin-top: 0;
        }
        .pp-footer-logo {
          font-family: var(--font-display);
          font-size: 18px;
          font-weight: 700;
          color: rgba(255,255,255,0.85);
        }
        .pp-footer-logo span { color: var(--gold); }
        .pp-footer-links {
          display: flex;
          align-items: center;
          gap: 20px;
        }
        .pp-footer-links a {
          font-size: 12.5px;
          color: rgba(255,255,255,0.4);
          text-decoration: none;
          transition: color 0.18s;
        }
        .pp-footer-links a:hover { color: rgba(255,255,255,0.75); }
        .pp-footer-copy {
          font-size: 12.5px;
          color: rgba(255,255,255,0.35);
        }

        /* ── RESPONSIVE ── */
        @media (max-width: 768px) {
          .pp-layout {
            grid-template-columns: 1fr;
            padding: 40px 5vw 60px;
            gap: 0;
          }
          .pp-sidebar { display: none; }
          .pp-rights-grid,
          .pp-security-grid { grid-template-columns: 1fr 1fr; }
          .pp-contact-box { padding: 36px 24px; }
          .pp-trust { gap: 16px; }
        }
        @media (max-width: 480px) {
          .pp-rights-grid,
          .pp-security-grid,
          .pp-chip-grid { grid-template-columns: 1fr; }
          .pp-hero { padding: 60px 5vw 80px; }
        }
      `}</style>

      <div className="pp-root">

        {/* NAV */}
        <nav className="pp-nav">
          <Link href="/" className="pp-nav-logo">
            HealviaCare<span>+</span>
          </Link>
          <Link href="/" className="pp-nav-back">
            ← Back to Home
          </Link>
        </nav>

        {/* HERO */}
        <div className="pp-hero">
          <div className="pp-hero-grid" />
          <div className="pp-hero-inner">
            <div className="pp-hero-badge">
              🔒 Legal Document
            </div>
            <h1>Your Privacy,<br /><em>Our Responsibility</em></h1>
            <p className="pp-hero-desc">
              At Healviacare+, we believe trust is the foundation of care.
              This policy explains exactly what we collect, why we collect it,
              and how we keep it safe — in plain language.
            </p>
            <div className="pp-hero-meta">
              <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
              </svg>
              Last updated: June 23, 2025 &nbsp;·&nbsp; Effective immediately
            </div>
          </div>
        </div>

        {/* TRUST STRIP */}
        <div className="pp-trust">
          <div className="pp-trust-item"><div className="pp-trust-dot" /> We never sell your data</div>
          <div className="pp-trust-item"><div className="pp-trust-dot" /> HTTPS encrypted always</div>
          <div className="pp-trust-item"><div className="pp-trust-dot" /> Delete request in 30 days</div>
          <div className="pp-trust-item"><div className="pp-trust-dot" /> No spam, ever</div>
        </div>

        {/* BODY LAYOUT */}
        <div className="pp-layout">

          {/* SIDEBAR */}
          <aside className="pp-sidebar">
            <div className="pp-toc-card">
              <div className="pp-toc-header">
                <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth="2">
                  <line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="15" y2="18" />
                </svg>
                <h2>Contents</h2>
              </div>
              <ul className="pp-toc-list">
                {[
                  [1, "Who We Are"],
                  [2, "Info We Collect"],
                  [3, "How We Use It"],
                  [4, "Sharing Your Data"],
                  [5, "Meta & Google Ads"],
                  [6, "Cookies"],
                  [7, "Data Retention"],
                  [8, "Your Rights"],
                  [9, "Data Security"],
                  [10, "Children's Privacy"],
                  [11, "Policy Changes"],
                  [12, "Contact Us"],
                ].map(([num, label]) => (
                  <li key={num}>
                    <a href={`#section-${num}`}>
                      <span className="pp-toc-num">{num}</span>
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </aside>

          {/* MAIN CONTENT */}
          <main className="pp-content">

            {/* 1 */}
            <div className="pp-section" id="section-1">
              <div className="pp-section-head">
                <div className="pp-section-icon">🏥</div>
                <h2>1. Who We Are</h2>
              </div>
              <p>
                <strong>Healviacare+ LLP</strong> is a healthcare services company registered in India.
                We operate digital platforms that connect patients with specialist doctors and
                healthcare providers for treatments including LASIK, cataract surgery, orthopedics,
                and more.
              </p>
              <p>
                For all privacy-related matters, you can reach us directly at{" "}
                <a href="mailto:info@healviacare.in">info@healviacare.in</a>.
              </p>
            </div>

            {/* 2 */}
            <div className="pp-section" id="section-2">
              <div className="pp-section-head">
                <div className="pp-section-icon">📋</div>
                <h2>2. Information We Collect</h2>
              </div>

              <h3>What you tell us directly</h3>
              <ul>
                <li><strong>Your name</strong> — when you fill out a consultation or lead form</li>
                <li><strong>Mobile number</strong> — so our care team can contact you</li>
                <li><strong>Treatment interest</strong> — e.g., LASIK, cataract, orthopedics</li>
                <li><strong>Your city</strong> — to connect you with the nearest available specialist</li>
              </ul>

              <h3>Collected automatically when you visit</h3>
              <ul>
                <li><strong>IP address</strong> — logged automatically on every page load</li>
                <li><strong>Device & browser info</strong> — type, version, screen size</li>
                <li><strong>Pages visited & time spent</strong> — to improve your experience</li>
                <li><strong>Referral source</strong> — how you found us (Google, Meta, organic)</li>
                <li><strong>Cookie data</strong> — see Section 6 for full details</li>
              </ul>

              <div className="pp-gold-box">
                <span className="pp-gold-box-icon">🛡️</span>
                <div>
                  We never collect sensitive data like Aadhaar numbers, financial details, or
                  medical records unless you explicitly provide them for a specific service and
                  give your consent.
                </div>
              </div>
            </div>

            {/* 3 */}
            <div className="pp-section" id="section-3">
              <div className="pp-section-head">
                <div className="pp-section-icon">⚙️</div>
                <h2>3. How We Use Your Information</h2>
              </div>
              <p>Everything we collect is used to serve you better — nothing else.</p>
              <ul>
                <li>Call you back and schedule a free consultation or screening</li>
                <li>Connect you with the right specialist or clinic near you</li>
                <li>Send follow-up messages related only to your inquiry</li>
                <li>Improve our website, flows, and overall user experience</li>
                <li>Run and optimise our Meta and Google ad campaigns</li>
                <li>Detect and prevent fraudulent or fake form submissions</li>
                <li>Comply with applicable laws and regulations in India</li>
              </ul>
              <div className="pp-highlight">
                We will only ever contact you about the service you asked about.
                We do not use your information for unrelated marketing without explicit consent.
              </div>
            </div>

            {/* 4 */}
            <div className="pp-section" id="section-4">
              <div className="pp-section-head">
                <div className="pp-section-icon">🤝</div>
                <h2>4. Sharing Your Information</h2>
              </div>
              <p>
                Healviacare+ LLP <strong>does not sell</strong> your personal information to anyone —
                ever. We only share data in the narrow circumstances below.
              </p>

              <h3>Partner hospitals & clinics</h3>
              <p>
                Your name, phone number, and treatment interest are shared with our network of
                partner hospitals solely to book your consultation. All partners are bound by
                strict confidentiality agreements.
              </p>

              <h3>Technology platforms we rely on</h3>
              <div className="pp-chip-grid">
                <div className="pp-chip"><div className="pp-chip-dot" />Supabase — secure database</div>
                <div className="pp-chip"><div className="pp-chip-dot" />Vercel — website hosting</div>
                <div className="pp-chip"><div className="pp-chip-dot" />Meta Platforms — ad tracking</div>
                <div className="pp-chip"><div className="pp-chip-dot" />Google LLC — analytics & ads</div>
              </div>

              <h3>Legal obligations</h3>
              <p>
                We may disclose data if compelled by law, court order, or a government authority
                under applicable Indian law.
              </p>
            </div>

            {/* 5 */}
            <div className="pp-section" id="section-5">
              <div className="pp-section-head">
                <div className="pp-section-icon">📣</div>
                <h2>5. Meta Ads & Google Ads</h2>
              </div>
              <p>
                We use advertising tools from Meta and Google to measure campaign performance
                and show relevant ads to people who may benefit from our services.
              </p>

              <h3>Meta Pixel (Facebook/Instagram)</h3>
              <p>
                The Meta Pixel tracks actions on our site — like form submissions — to help us
                measure conversions and build better audiences. Meta handles this data under its
                own{" "}
                <a href="https://www.facebook.com/policy.php" target="_blank" rel="noopener noreferrer">
                  Data Policy
                </a>.
              </p>

              <h3>Google Analytics & Google Ads</h3>
              <p>
                Google Analytics tells us how visitors use our site; Google Ads conversion
                tracking measures ad performance. Learn more in{" "}
                <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">
                  Google's Privacy Policy
                </a>.
              </p>

              <div className="pp-highlight">
                <strong>Opt out anytime:</strong> Meta personalised ads →{" "}
                <a href="https://www.facebook.com/ads/preferences" target="_blank" rel="noopener noreferrer">Facebook Ad Preferences</a>.
                {" "}Google personalised ads →{" "}
                <a href="https://adssettings.google.com" target="_blank" rel="noopener noreferrer">Google Ad Settings</a>.
              </div>
            </div>

            {/* 6 */}
            <div className="pp-section" id="section-6">
              <div className="pp-section-head">
                <div className="pp-section-icon">🍪</div>
                <h2>6. Cookies & Tracking Technologies</h2>
              </div>
              <p>
                Cookies are small files stored in your browser. We use them to keep our site
                working, understand visitor behaviour, and power our advertising.
              </p>
              <ul>
                <li><strong>Essential cookies</strong> — the site cannot function without these</li>
                <li><strong>Analytics cookies</strong> — help us understand how people use our pages (Google Analytics)</li>
                <li><strong>Advertising cookies</strong> — Meta Pixel and Google Ads use these to track and optimise ad campaigns</li>
              </ul>
              <p>
                You can manage or disable cookies in your browser settings at any time.
                Note that essential cookies cannot be disabled without breaking site functionality.
              </p>
            </div>

            {/* 7 */}
            <div className="pp-section" id="section-7">
              <div className="pp-section-head">
                <div className="pp-section-icon">🗂️</div>
                <h2>7. Data Retention</h2>
              </div>
              <p>We keep your data only as long as genuinely needed.</p>
              <ul>
                <li>Lead and contact form data is held for up to <strong>2 years</strong> from submission</li>
                <li>Deletion requests are processed within <strong>30 days</strong> of receipt</li>
                <li>Anonymised analytics data may be retained indefinitely — it cannot identify you</li>
              </ul>
            </div>

            {/* 8 */}
            <div className="pp-section" id="section-8">
              <div className="pp-section-head">
                <div className="pp-section-icon">⚖️</div>
                <h2>8. Your Rights</h2>
              </div>
              <p>You are in control of your data. Here is what you can ask us to do:</p>

              <div className="pp-rights-grid">
                {[
                  { icon: "👁️", title: "Access", desc: "Request a copy of all data we hold about you" },
                  { icon: "✏️", title: "Correct", desc: "Ask us to fix inaccurate or incomplete records" },
                  { icon: "🗑️", title: "Delete", desc: "Request full erasure of your personal data" },
                  { icon: "🔕", title: "Withdraw", desc: "Withdraw consent to be contacted at any time" },
                  { icon: "📭", title: "Opt Out", desc: "Stop receiving marketing communications" },
                ].map((r) => (
                  <div key={r.title} className="pp-right-card">
                    <span className="pp-right-card-icon">{r.icon}</span>
                    <h4>{r.title}</h4>
                    <p>{r.desc}</p>
                  </div>
                ))}
              </div>

              <div className="pp-highlight" style={{ marginTop: 20 }}>
                To exercise any right, email{" "}
                <a href="mailto:info@healviacare.in">info@healviacare.in</a> with the subject
                line <strong>"Data Request"</strong>. We'll respond within 30 days.
              </div>
            </div>

            {/* 9 */}
            <div className="pp-section" id="section-9">
              <div className="pp-section-head">
                <div className="pp-section-icon">🔐</div>
                <h2>9. Data Security</h2>
              </div>
              <p>
                We take security seriously and apply multiple layers of protection to your data.
              </p>

              <div className="pp-security-grid">
                {[
                  { icon: "🔒", title: "Encrypted Storage", desc: "Supabase with row-level security and encryption at rest" },
                  { icon: "🌐", title: "HTTPS Everywhere", desc: "All traffic is encrypted in transit via TLS" },
                  { icon: "🚦", title: "Rate Limiting", desc: "Form submissions are rate-limited to block abuse" },
                  { icon: "👤", title: "Access Controls", desc: "Only authorised staff can access lead data" },
                ].map((b) => (
                  <div key={b.title} className="pp-security-badge">
                    <span className="pp-security-badge-icon">{b.icon}</span>
                    <h4>{b.title}</h4>
                    <p>{b.desc}</p>
                  </div>
                ))}
              </div>

              <p style={{ marginTop: 16 }}>
                No internet transmission is 100% secure. If you ever suspect unauthorised
                use of your data, contact us immediately at{" "}
                <a href="mailto:info@healviacare.in">info@healviacare.in</a>.
              </p>
            </div>

            {/* 10 */}
            <div className="pp-section" id="section-10">
              <div className="pp-section-head">
                <div className="pp-section-icon">👶</div>
                <h2>10. Children's Privacy</h2>
              </div>
              <p>
                Our services are not intended for anyone under 18. We do not knowingly collect
                data from minors. If you believe we have done so inadvertently, please email{" "}
                <a href="mailto:info@healviacare.in">info@healviacare.in</a> and we will
                delete it immediately.
              </p>
            </div>

            {/* 11 */}
            <div className="pp-section" id="section-11">
              <div className="pp-section-head">
                <div className="pp-section-icon">🔄</div>
                <h2>11. Changes to This Policy</h2>
              </div>
              <p>
                We may update this policy to reflect changes in our practices, technology,
                or legal requirements. When we do, we'll update the "Last updated" date at
                the top of this page.
              </p>
              <p>
                Continuing to use our website after any update means you accept the revised
                policy. We encourage you to check back periodically.
              </p>
            </div>

            {/* 12 */}
            <div className="pp-section" id="section-12">
              <div className="pp-section-head">
                <div className="pp-section-icon">📬</div>
                <h2>12. Contact Us</h2>
              </div>
              <p>
                Questions, concerns, or data requests? We're here to help:
              </p>
              <ul>
                <li><strong>Company:</strong> Healviacare+ LLP</li>
                <li><strong>Email:</strong> <a href="mailto:info@healviacare.in">info@healviacare.in</a></li>
                <li><strong>Subject line:</strong> Privacy Policy Inquiry</li>
                <li><strong>Response time:</strong> Within 5 business days</li>
              </ul>
            </div>

            {/* CONTACT CTA */}
            <div className="pp-contact-box">
              <div className="pp-contact-box-inner">
                <h2>Have a privacy question?</h2>
                <p>Our team is ready to help with any data or privacy request — no jargon, just answers.</p>
                <a href="mailto:info@healviacare.in" className="pp-contact-btn">
                  ✉️ Email info@healviacare.in
                </a>
              </div>
            </div>

          </main>
        </div>

        {/* FOOTER */}
        <footer className="pp-footer">
          <div className="pp-footer-logo">HealviaCare<span>+</span></div>
          <div className="pp-footer-links">
            <a href="/">Home</a>
            <a href="mailto:info@healviacare.in">Contact</a>
          </div>
          <p className="pp-footer-copy">© 2026 Healviacare+ LLP. All rights reserved.</p>
        </footer>

      </div>
    </>
  );
}