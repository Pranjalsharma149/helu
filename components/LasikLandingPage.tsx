'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
import Script from 'next/script';
import { CITY_DATA, SHARED_FAQS, type CityKey } from '@/lib/lasik-city-data';

const LEADS_ENDPOINT = '/api/leads';
const PHONE_TEL = '+919310984753';
const PHONE_DISPLAY = '+91 93109 84753';
const WA_NUMBER = '919310984753';
const WA_MSG = encodeURIComponent("Hi, I'd like to book a free LASIK screening");
const WA_URL = `https://wa.me/${WA_NUMBER}?text=${WA_MSG}`;

const IMG_EYE_MACRO = 'https://images.unsplash.com/photo-1483519173755-be893fab1f46?auto=format&fit=crop&w=1400&q=80';
const IMG_EYE_TEST_MACHINE = 'https://images.unsplash.com/photo-1539036776273-021ec1d78bec?auto=format&fit=crop&w=900&q=80';
const IMG_IRIS_CLOSEUP = 'https://images.unsplash.com/photo-1549872901-c350913bd5cb?auto=format&fit=crop&w=900&q=80';
const IMG_GLASSES = 'https://images.unsplash.com/photo-1517948430535-1e2469d314fe?auto=format&fit=crop&w=900&q=80';
const IMG_EYE_EXAM = 'https://images.unsplash.com/photo-1576210117723-cd06449a467d?auto=format&fit=crop&w=900&q=80';
const IMG_DOCTOR_1 = 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&w=600&q=80';
const IMG_DOCTOR_2 = 'https://images.unsplash.com/photo-1645066928295-2506defde470?auto=format&fit=crop&w=600&q=80';
const IMG_DOCTOR_3 = 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=600&q=80';

interface FormData {
  name: string;
  phone: string;
  email: string;
  age: string;
  city: CityKey;
  eyeCondition: string;
  wearGlasses: string;
}

interface LasikLandingProps {
  cityKey: CityKey;
}

function validatePhone(digits: string): string {
  if (digits.length !== 10) return 'Enter a valid 10-digit mobile number';
  if (!/^[6-9]/.test(digits)) return 'Enter a valid Indian mobile number';
  const fake = [/^(\d)\1{9}$/, /^1234567890$/, /^0987654321$/, /^1234554321$/];
  if (fake.some(p => p.test(digits))) return 'Enter a real mobile number';
  return '';
}

const WaIcon = ({ size = 17 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
    <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.553 4.118 1.527 5.846L0 24l6.335-1.502A11.955 11.955 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 01-5.006-1.375l-.36-.213-3.73.885.927-3.636-.233-.374A9.816 9.816 0 012.182 12C2.182 6.578 6.578 2.182 12 2.182S21.818 6.578 21.818 12 17.422 21.818 12 21.818z"/>
  </svg>
);

const PhoneIcon = ({ size = 15 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 10.8a19.79 19.79 0 01-3.07-8.67A2 2 0 012 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 14.92v2z"/>
  </svg>
);

export default function LasikLandingPage({ cityKey }: LasikLandingProps) {
  const cityData = CITY_DATA[cityKey];

  const [formData, setFormData] = useState<FormData>({
    name: '',
    phone: '',
    email: '',
    age: '',
    city: cityKey,
    eyeCondition: '',
    wearGlasses: '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [expandedFAQ, setExpandedFAQ] = useState(0);
  const nameRef = useRef<HTMLInputElement>(null);

  if (!cityData) return <div style={{ padding: 40 }}>City not found: &quot;{cityKey}&quot;</div>;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const trimName = formData.name.trim();
    if (trimName.length < 2) {
      setError('Enter your full name');
      return;
    }

    const digits = formData.phone.replace(/\D/g, '');
    const phoneErr = validatePhone(digits);
    if (phoneErr) {
      setError(phoneErr);
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(LEADS_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: trimName,
          phone: digits,
          city: cityData.name,
          source: cityData.formSource,
          service: 'lasik',
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || 'Something went wrong. Please try again.');
      } else {
        window.location.href = '/thank-you';
      }
    } catch {
      setError('Could not reach our server. Check your connection and try again.');
    } finally {
      setLoading(false);
    }
  };

  const scrollToForm = () => {
    document.getElementById('lead-card')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    setTimeout(() => nameRef.current?.focus(), 400);
  };

  return (
    <div className="llp">
      {/* ── GOOGLE TAG MANAGER ── */}
      <Script
        id="gtm-script"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-5PJZFM59');`,
        }}
      />
      <noscript>
        <iframe
          src="https://www.googletagmanager.com/ns.html?id=GTM-5PJZFM59"
          height="0"
          width="0"
          style={{ display: 'none', visibility: 'hidden' }}
        />
      </noscript>
      <style>{`
        /* ── GLOBAL RESET ── */
        .llp *, .llp *::before, .llp *::after { box-sizing: border-box; margin: 0; padding: 0; }
        .llp {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', sans-serif;
          color: #1a1a1a;
          background: #ffffff;
          line-height: 1.6;
          --accent: #4CAF50;
        }

        /* ── HEADER ── */
        .llp-header {
          position: sticky;
          top: 0;
          z-index: 200;
          background: #ffffff;
          border-bottom: 1.5px solid #e5e7eb;
          box-shadow: 0 1px 8px rgba(0,0,0,0.04);
        }
        .llp-header-inner {
          max-width: 1400px;
          margin: 0 auto;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 2px 24px;
          gap: 16px;
          min-height: 52px;
        }
        .llp-logo {
          display: flex;
          align-items: center;
          text-decoration: none;
          flex-shrink: 0;
          transition: transform 0.3s ease;
        }
        .llp-logo:hover { transform: scale(1.04); }
        .llp-logo img, .llp-logo-img {
          height: auto;
          width: auto;
          max-height: 50px;
          max-width: 240px;
          display: block;
          object-fit: contain;
        }
        .llp-nav { display: flex; align-items: center; gap: 10px; }

        /* ── NAV BUTTONS ── */
        .llp-btn-wa {
          display: flex;
          align-items: center;
          gap: 7px;
          background: var(--accent);
          color: #fff;
          text-decoration: none;
          padding: 8px 14px;
          border-radius: 8px;
          font-size: 13px;
          font-weight: 700;
          transition: all 0.3s ease;
        }
        .llp-btn-wa:hover { transform: translateY(-2px); box-shadow: 0 6px 14px rgba(76, 175, 80, 0.3); }
        .llp-btn-call {
          display: flex;
          align-items: center;
          gap: 7px;
          background: #fff;
          color: #111827;
          border: 1.5px solid #e5e7eb;
          text-decoration: none;
          padding: 8px 14px;
          border-radius: 8px;
          font-size: 13px;
          font-weight: 700;
          transition: all 0.3s ease;
        }
        .llp-btn-call:hover { transform: translateY(-2px); border-color: var(--accent); }
        .llp-btn-screen {
          background: var(--accent);
          color: #fff;
          border: none;
          padding: 8px 16px;
          border-radius: 8px;
          font-size: 13px;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        .llp-btn-screen:hover { transform: translateY(-2px); box-shadow: 0 6px 14px rgba(0,0,0,0.15); }

        /* ── CITY BAR ── */
        .llp-city-bar {
          background: #ffffff;
          border-bottom: 1.5px solid #e5e7eb;
          padding: 10px 24px;
          display: flex;
          align-items: center;
          gap: 12px;
          flex-wrap: wrap;
          justify-content: center;
        }
        .llp-city-bar-label { font-size: 11px; font-weight: 800; color: #374151; text-transform: uppercase; letter-spacing: 0.08em; }
        .llp-city-tabs { display: flex; gap: 8px; flex-wrap: wrap; }
        .llp-city-tab {
          padding: 6px 16px; border-radius: 999px; font-size: 12px; font-weight: 600;
          border: 1.5px solid #e5e7eb; color: #374151; background: #fff; cursor: pointer;
          transition: all 0.3s ease; text-decoration: none; display: inline-block;
        }
        .llp-city-tab.active, .llp-city-tab:hover {
          background: var(--accent); color: #fff; border-color: var(--accent);
        }

        /* ── PAGE LAYOUT ── */
        .llp-page { max-width: 1400px; margin: 0 auto; padding: 28px 24px 0; background: #ffffff; }
        .llp-grid { display: grid; grid-template-columns: 1fr 340px; gap: 28px; align-items: start; }
        .llp-main { min-width: 0; }
        .llp-side { position: sticky; top: 84px; }

        /* ── HERO ── */
        .llp-hero {
          background: #ffffff;
          border: 1.5px solid #e5e7eb;
          border-radius: 18px;
          padding: 44px 40px;
          margin-bottom: 28px;
          overflow: hidden;
          position: relative;
        }
        .llp-hero-grid { position: relative; z-index: 1; display: grid; grid-template-columns: 1.1fr 1fr; gap: 36px; align-items: center; }
        .llp-hero-badge {
          display: inline-flex; align-items: center; gap: 8px;
          background: #ffffff; color: #374151;
          font-size: 12px; font-weight: 700; letter-spacing: 0.06em; text-transform: uppercase;
          padding: 7px 14px; border-radius: 999px; margin-bottom: 18px;
          border: 1px solid #e5e7eb;
        }
        .llp-hero h1 { font-size: 42px; line-height: 1.18; font-weight: 900; color: var(--accent); margin-bottom: 14px; }
        .llp-hero h1 em { font-style: normal; color: #111827; text-decoration: underline; text-decoration-color: var(--accent); text-underline-offset: 4px; }
        .llp-hero-sub { font-size: 15.5px; color: #374151; line-height: 1.75; margin-bottom: 24px; max-width: 520px; }
        .llp-hero-pills { display: flex; flex-wrap: wrap; gap: 10px; margin-bottom: 26px; }
        .llp-hero-pill {
          display: flex; align-items: center; gap: 8px;
          background: #fff; border: 1px solid #e5e7eb;
          padding: 9px 14px; border-radius: 999px; font-size: 13px; color: #374151; font-weight: 600;
        }
        .llp-dot { width: 7px; height: 7px; background: var(--accent); border-radius: 50%; flex-shrink: 0; }
        .llp-hero-cta { display: flex; gap: 12px; flex-wrap: wrap; }
        .llp-hero-cta-primary {
          background: var(--accent); color: #fff; border: none;
          padding: 13px 22px; border-radius: 10px; font-weight: 800; font-size: 14px; cursor: pointer;
          transition: all 0.3s ease;
        }
        .llp-hero-cta-primary:hover { filter: brightness(1.06); transform: translateY(-1px); }
        .llp-hero-cta-secondary {
          background: #fff; color: #111827; border: 1.5px solid #e5e7eb;
          padding: 13px 22px; border-radius: 10px; font-weight: 700; font-size: 14px; text-decoration: none;
          display: flex; align-items: center; gap: 8px; transition: all 0.3s ease;
        }
        .llp-hero-cta-secondary:hover { background: #ffffff; }
        .llp-hero-visual { position: relative; }
        .llp-hero-img-wrap {
          border-radius: 16px; overflow: hidden; height: 320px;
          border: 2px solid #e5e7eb;
        }
        .llp-hero-img-wrap img { width: 100%; height: 100%; object-fit: cover; display: block; }
        .llp-hero-floatcard {
          position: absolute; background: #fff; color: #1a1a1a; border-radius: 12px;
          padding: 12px 14px; box-shadow: 0 4px 16px rgba(0,0,0,0.10); display: flex; align-items: center; gap: 10px;
          min-width: 168px; border: 1.5px solid #e5e7eb;
        }
        .llp-hero-floatcard .num { font-size: 18px; font-weight: 900; color: var(--accent); line-height: 1; }
        .llp-hero-floatcard .lbl { font-size: 11px; color: #6b7280; font-weight: 600; }
        .llp-hero-fc-1 { top: -16px; right: -8px; }
        .llp-hero-fc-2 { bottom: -16px; left: -10px; }

        /* ── STATS ── */
        .llp-stats {
          display: grid; grid-template-columns: repeat(3, 1fr); gap: 14px;
          margin-bottom: 28px;
        }
        .llp-stat {
          background: #fff; border: 1.5px solid #e5e7eb; border-radius: 12px;
          padding: 22px 16px; text-align: center;
        }
        .llp-stat-num { font-size: 30px; font-weight: 900; color: var(--accent); }
        .llp-stat-label { font-size: 13px; color: #6b7280; margin-top: 4px; font-weight: 600; }

        /* ── SECTIONS ── */
        .llp-section {
          background: #ffffff;
          border: 1.5px solid #e5e7eb;
          border-radius: 14px;
          padding: 34px 32px;
          margin-bottom: 22px;
        }
        .llp-section-tint { background: #ffffff; border: 1.5px solid #e5e7eb; }
        .llp-section h2 { font-size: 26px; font-weight: 900; color: var(--accent); margin-bottom: 8px; }
        .llp-section-lead { font-size: 15px; color: #6b7280; margin-bottom: 22px; line-height: 1.7; }

        /* ── WHY GRID ── */
        .llp-why-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 14px; }
        .llp-why-card {
          display: flex; gap: 14px; align-items: flex-start; padding: 18px;
          border: 1.5px solid #e5e7eb; border-radius: 10px; background: #fff; transition: all 0.3s ease;
        }
        .llp-why-card:hover { border-color: var(--accent); box-shadow: 0 4px 12px rgba(0,0,0,0.08); }
        .llp-why-icon { font-size: 26px; line-height: 1; flex-shrink: 0; }
        .llp-why-text { font-size: 14px; color: #1a1a1a; font-weight: 500; line-height: 1.6; }

        /* ── PROCESS GRID ── */
        .llp-process-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 14px; }
        .llp-process-card { background: #fff; border: 1.5px solid #e5e7eb; border-radius: 10px; padding: 22px 18px; text-align: center; transition: all 0.3s ease; }
        .llp-process-card:hover { border-color: var(--accent); box-shadow: 0 6px 16px rgba(0,0,0,0.08); }
        .llp-process-num {
          display: inline-flex; width: 42px; height: 42px;
          background: var(--accent); color: #fff;
          border-radius: 50%; align-items: center; justify-content: center; font-size: 17px; font-weight: 900; margin-bottom: 12px;
        }
        .llp-process-card h3 { font-size: 15px; font-weight: 700; color: var(--accent); margin-bottom: 8px; }
        .llp-process-card p { font-size: 13px; color: #6b7280; line-height: 1.6; }

        /* ── PHOTO GRID ── */
        .llp-img-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; margin-bottom: 24px; }
        .llp-img-grid-item { width: 100%; height: 190px; border-radius: 12px; overflow: hidden; border: 1.5px solid #e5e7eb; }
        .llp-img-grid-item img { width: 100%; height: 100%; object-fit: cover; display: block; }
        .llp-img-caption { font-size: 12px; color: #9ca3af; text-align: center; margin-top: 8px; font-weight: 500; }

        /* ── LISTS ── */
        .llp-check { list-style: none; }
        .llp-check li { display: flex; gap: 12px; margin-bottom: 13px; font-size: 14px; color: #1a1a1a; line-height: 1.6; }
        .llp-check li::before { content: "✓"; color: var(--accent); font-weight: 900; flex-shrink: 0; font-size: 16px; }
        .llp-cross { list-style: none; }
        .llp-cross li { display: flex; gap: 12px; margin-bottom: 13px; font-size: 14px; color: #6b7280; line-height: 1.6; }
        .llp-cross li::before { content: "✗"; color: #dc2626; font-weight: 900; flex-shrink: 0; font-size: 16px; }
        .llp-two { display: grid; grid-template-columns: 1fr 1fr; gap: 28px; }
        .llp-two h3 { font-size: 15px; font-weight: 700; margin-bottom: 16px; }

        /* ── COMPARE ── */
        .llp-compare { display: grid; grid-template-columns: 1fr 1fr; gap: 18px; }
        .llp-compare-col { border-radius: 12px; overflow: hidden; border: 1.5px solid #e5e7eb; }
        .llp-compare-img { height: 170px; overflow: hidden; }
        .llp-compare-img img { width: 100%; height: 100%; object-fit: cover; display: block; }
        .llp-compare-body { padding: 18px; }
        .llp-compare-body h3 { font-size: 15px; font-weight: 800; margin-bottom: 12px; color: var(--accent); }
        .llp-compare-col.bad .llp-compare-body h3 { color: #dc2626; }
        .llp-compare-col.good .llp-compare-body h3 { color: var(--accent); }
        .llp-compare-col.good { border-color: var(--accent); }

        /* ── DOCTOR CARDS ── */
        .llp-doctor-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; }
        .llp-doctor-card { border: 1.5px solid #e5e7eb; border-radius: 12px; overflow: hidden; background: #fff; transition: all 0.3s ease; }
        .llp-doctor-card:hover { border-color: var(--accent); box-shadow: 0 8px 20px rgba(0,0,0,0.08); }
        .llp-doctor-photo { height: 190px; overflow: hidden; }
        .llp-doctor-photo img { width: 100%; height: 100%; object-fit: cover; display: block; }
        .llp-doctor-info { padding: 14px 16px; }
        .llp-doctor-info h3 { font-size: 15px; font-weight: 800; margin-bottom: 2px; color: var(--accent); }
        .llp-doctor-info .role { font-size: 12.5px; color: #374151; font-weight: 700; margin-bottom: 6px; }
        .llp-doctor-info .exp { font-size: 12.5px; color: #9ca3af; }

        /* ── EMI CARDS ── */
        .llp-emi-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 14px; margin-bottom: 22px; }
        .llp-emi-card { border: 1.5px solid #e5e7eb; border-radius: 10px; padding: 18px; text-align: center; }
        .llp-emi-card .tenure { font-size: 22px; font-weight: 900; color: var(--accent); }
        .llp-emi-card .note { font-size: 12.5px; color: #9ca3af; margin-top: 4px; }

        /* ── TABLE ── */
        .llp-tbl-wrap { overflow-x: auto; }
        .llp-tbl { width: 100%; border-collapse: collapse; border: 1.5px solid #e5e7eb; border-radius: 10px; overflow: hidden; }
        .llp-tbl thead { background: #ffffff; }
        .llp-tbl th { padding: 14px 16px; text-align: left; font-size: 13px; font-weight: 700; color: var(--accent); border-bottom: 2px solid #e5e7eb; }
        .llp-tbl td { padding: 14px 16px; font-size: 13px; color: #6b7280; border-bottom: 1px solid #f3f4f6; }
        .llp-tbl tr:last-child td { border-bottom: none; }

        /* ── FAQ ── */
        .llp-faq { border: 1.5px solid #e5e7eb; border-radius: 10px; margin-bottom: 10px; overflow: hidden; transition: all 0.3s ease; }
        .llp-faq.active { border-color: var(--accent); box-shadow: 0 4px 12px rgba(0,0,0,0.08); }
        .llp-faq-q {
          padding: 16px 18px; background: #ffffff; cursor: pointer; display: flex; justify-content: space-between;
          align-items: center; font-size: 14px; font-weight: 700; color: var(--accent); gap: 12px; border: none; width: 100%;
          text-align: left; transition: all 0.3s ease;
        }
        .llp-faq.active .llp-faq-q { background: #ffffff; color: var(--accent); }
        .llp-faq-icon { flex-shrink: 0; transition: transform 0.3s ease; font-size: 16px; }
        .llp-faq.active .llp-faq-icon { transform: rotate(180deg); }
        .llp-faq-a { max-height: 0; overflow: hidden; transition: max-height 0.3s ease; }
        .llp-faq.active .llp-faq-a { max-height: 400px; }
        .llp-faq-a-inner { padding: 16px 18px; font-size: 13px; color: #6b7280; line-height: 1.8; background: #fff; }

        /* ── CHIPS ── */
        .llp-chips { display: flex; flex-wrap: wrap; gap: 10px; }
        .llp-chip {
          padding: 8px 16px; border-radius: 999px; background: #ffffff; color: #374151;
          font-size: 13px; font-weight: 700; border: 1px solid #e5e7eb; transition: all 0.3s ease;
        }
        .llp-chip:hover { background: var(--accent); color: #fff; border-color: var(--accent); }

        /* ── TESTIMONIALS ── */
        .llp-testi { background: #fff; border: 1.5px solid #e5e7eb; border-radius: 10px; padding: 20px 18px; margin-bottom: 14px; transition: all 0.3s ease; }
        .llp-testi:hover { border-color: #111827; box-shadow: 0 4px 12px rgba(0,0,0,0.08); }
        .llp-testi-stars { color: #fbbf24; font-size: 14px; margin-bottom: 10px; }
        .llp-testi-quote { font-size: 13px; color: #374151; line-height: 1.7; margin-bottom: 12px; font-style: italic; }
        .llp-testi-name { font-size: 13px; font-weight: 700; color: var(--accent); }
        .llp-testi-role { font-size: 12px; color: #9ca3af; }

        /* ── CLOSING ── */
        .llp-closing {
          background: #ffffff;
          border: 1.5px solid #e5e7eb;
          border-radius: 14px; padding: 38px 36px; text-align: center; margin-bottom: 0;
        }
        .llp-closing h2 { font-size: 26px; font-weight: 900; margin-bottom: 10px; color: var(--accent); }
        .llp-closing p { font-size: 15px; color: #374151; margin-bottom: 22px; line-height: 1.7; }
        .llp-closing-btns { display: flex; gap: 12px; justify-content: center; flex-wrap: wrap; }
        .llp-cb-wa {
          display: flex; align-items: center; gap: 8px;
          background: var(--accent); color: #fff; text-decoration: none;
          padding: 13px 26px; border-radius: 10px; font-weight: 700; font-size: 14px; transition: all 0.3s ease;
        }
        .llp-cb-wa:hover { transform: translateY(-2px); }
        .llp-cb-screen {
          background: var(--accent); color: #fff; border: none;
          padding: 13px 26px; border-radius: 10px; font-weight: 700; font-size: 14px; cursor: pointer; transition: all 0.3s ease;
        }
        .llp-cb-screen:hover { filter: brightness(1.06); }

        /* ── LEAD CARD ── */
        .llp-lead {
          background: #ffffff;
          border: 1.5px solid #e5e7eb;
          color: #1a1a1a; border-radius: 16px; padding: 22px 20px;
          position: relative; overflow: hidden;
          box-shadow: 0 4px 16px rgba(0,0,0,0.06);
        }
        .llp-lead-content { position: relative; z-index: 1; }
        .llp-lead-eyebrow { font-size: 10px; font-weight: 800; letter-spacing: 0.1em; text-transform: uppercase; color: #6b7280; margin-bottom: 6px; }
        .llp-lead h3 { font-size: 19px; font-weight: 900; color: var(--accent); margin-bottom: 4px; line-height: 1.2; }
        .llp-lead-sub { font-size: 13px; color: #6b7280; margin-bottom: 16px; line-height: 1.5; }
        .llp-lead-field { margin-bottom: 12px; }
        .llp-lead-label { display: block; font-size: 11px; font-weight: 700; color: #6b7280; margin-bottom: 5px; text-transform: uppercase; letter-spacing: 0.05em; }
        .llp-lead-input {
          width: 100%; padding: 10px 13px; border: 1.5px solid #e5e7eb; border-radius: 8px;
          font-size: 13px; background: #fff; color: #111827; outline: none; transition: all 0.3s ease;
        }
        .llp-lead-input::placeholder { color: #9ca3af; }
        .llp-lead-input:focus { border-color: var(--accent); }
        .llp-phone-row { display: flex; align-items: center; border: 1.5px solid #e5e7eb; border-radius: 8px; overflow: hidden; background: #fff; transition: all 0.3s ease; }
        .llp-phone-row:focus-within { border-color: var(--accent); }
        .llp-phone-pre { padding: 10px 10px; font-size: 13px; color: #6b7280; border-right: 1px solid #e5e7eb; white-space: nowrap; background: #ffffff; font-weight: 600; }
        .llp-phone-row input { border: none; padding: 10px 13px; font-size: 13px; background: transparent; color: #111827; outline: none; width: 100%; }
        .llp-phone-row input::placeholder { color: #9ca3af; }
        .llp-lead-submit {
          width: 100%; padding: 12px; background: var(--accent); color: #fff;
          border: none; border-radius: 8px; font-weight: 800; font-size: 14px; cursor: pointer; margin-top: 6px; transition: all 0.3s ease;
        }
        .llp-lead-submit:hover:not(:disabled) { filter: brightness(1.06); transform: translateY(-1px); }
        .llp-lead-submit:disabled { opacity: 0.6; cursor: not-allowed; }
        .llp-lead-error { background: #fef2f2; border: 1px solid #fecaca; color: #dc2626; padding: 10px 12px; border-radius: 6px; font-size: 12px; margin-bottom: 12px; }
        .llp-lead-success { background: #ffffff; border: 1px solid var(--accent); color: var(--accent); padding: 13px; border-radius: 8px; font-size: 13px; font-weight: 700; text-align: center; }
        .llp-lead-trust { display: flex; justify-content: space-around; margin-top: 12px; font-size: 11px; color: #9ca3af; font-weight: 700; }

        /* ── FLOATING BUTTONS ── */
        .llp-fab { position: fixed; right: 20px; bottom: 26px; z-index: 300; display: flex; flex-direction: column; gap: 14px; }
        .llp-fab-btn {
          width: 56px; height: 56px; border-radius: 50%; display: flex; align-items: center; justify-content: center;
          color: #fff; box-shadow: 0 8px 22px rgba(0,0,0,0.18); position: relative; transition: transform 0.25s ease; text-decoration: none;
        }
        .llp-fab-btn:hover { transform: scale(1.08); }
        .llp-fab-wa { background: var(--accent); }
        .llp-fab-call { background: var(--accent); }
        .llp-fab-ping { position: absolute; inset: 0; border-radius: 50%; background: var(--accent); opacity: 0.55; animation: fabping 2.2s ease-out infinite; }
        @keyframes fabping { 0% { transform: scale(1); opacity: 0.5; } 100% { transform: scale(1.6); opacity: 0; } }

        /* ── MOBILE STICKY CTA ── */
        .llp-sticky-cta { display: none; }
        .llp-sticky-cta button {
          width: 100%; padding: 13px; border: none; border-radius: 10px;
          background: var(--accent); color: #fff; font-weight: 800; font-size: 14px; cursor: pointer;
        }

        /* ── FOOTER ── */
        .llp-footer { background: #ffffff; border-top: 1.5px solid #e5e7eb; color: #1a1a1a; padding: 52px 24px 24px; margin-top: 24px; }
        .llp-footer-inner { max-width: 1400px; margin: 0 auto; display: grid; grid-template-columns: 2fr 1fr 1fr 1fr; gap: 40px; margin-bottom: 32px; }
        .llp-footer-brand-logo { display: flex; align-items: center; gap: 10px; margin-bottom: 14px; }
        .llp-footer-brand-logo img { width: 180px !important; height: auto !important; object-fit: contain; }
        .llp-footer-brand p { font-size: 13px; color: #6b7280; line-height: 1.7; margin-bottom: 18px; }
        .llp-footer-wa-btn {
          display: inline-flex; align-items: center; gap: 6px; background: var(--accent);
          color: #fff; text-decoration: none; padding: 10px 16px; border-radius: 8px; font-size: 13px; font-weight: 700; transition: all 0.3s ease;
        }
        .llp-footer-wa-btn:hover { transform: translateY(-2px); }
        .llp-footer-section h4 { font-size: 12px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.08em; color: var(--accent); margin-bottom: 16px; }
        .llp-footer-section ul { list-style: none; }
        .llp-footer-section li { margin-bottom: 10px; font-size: 13px; }
        .llp-footer-section a { color: #374151; text-decoration: none; transition: color 0.3s ease; }
        .llp-footer-section a:hover { color: var(--accent); }
        .llp-footer-bottom { border-top: 1px solid #e5e7eb; padding-top: 20px; text-align: center; font-size: 12px; color: #9ca3af; max-width: 1400px; margin: 0 auto; }
        .llp-footer-bottom a { color: #6b7280; text-decoration: none; transition: color 0.3s ease; }
        .llp-footer-bottom a:hover { color: var(--accent); }

        /* ── RESPONSIVE ── */
        @media (max-width: 1024px) {
          .llp-grid { grid-template-columns: 1fr; }
          .llp-side { position: static; order: -1; }
          .llp { padding-bottom: 86px; }
          .llp-nav .llp-btn-wa, .llp-nav .llp-btn-call { display: none; }
          .llp-hero { padding: 30px 22px; }
          .llp-hero-grid { grid-template-columns: 1fr; gap: 24px; }
          .llp-hero h1 { font-size: 32px; }
          .llp-hero-img-wrap { height: 220px; }
          .llp-footer-inner { grid-template-columns: 1fr 1fr; }
          .llp-fab { bottom: 92px; right: 16px; }
          .llp-fab-btn { width: 50px; height: 50px; }
          .llp-sticky-cta { display: block; position: fixed; left: 0; right: 0; bottom: 0; z-index: 290; background: #fff; border-top: 1.5px solid #e5e7eb; padding: 10px 16px 14px; box-shadow: 0 -4px 16px rgba(0,0,0,0.08); }
        }

        @media (max-width: 640px) {
          .llp-page { padding: 18px 16px; }
          .llp-why-grid, .llp-process-grid, .llp-two, .llp-img-grid, .llp-compare, .llp-doctor-grid, .llp-emi-grid { grid-template-columns: 1fr; }
          .llp-nav .llp-btn-screen { display: none; }
          .llp-section { padding: 22px 18px; }
          .llp-hero h1 { font-size: 27px; }
          .llp-hero-floatcard { position: static; margin-top: 10px; width: fit-content; }
          .llp-hero-fc-1, .llp-hero-fc-2 { position: static; }
          .llp-lead { padding: 18px 14px; }
          .llp-lead h3 { font-size: 18px; }
          .llp-footer-inner { grid-template-columns: 1fr; gap: 24px; }
          .llp-stats { grid-template-columns: 1fr; }
          .llp-section h2 { font-size: 21px; }
          .llp-logo img, .llp-logo-img { max-height: 40px; }
        }
      `}</style>

      {/* ── HEADER ── */}
      <header className="llp-header">
        <div className="llp-header-inner">
          <a href="/" className="llp-logo">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/vv.png" alt="HealviaCare" className="llp-logo-img" />
          </a>
          <nav className="llp-nav">
            <a href={WA_URL} className="llp-btn-wa" target="_blank" rel="noopener noreferrer">
              <WaIcon size={15} /> WhatsApp
            </a>
            <a href={`tel:${PHONE_TEL}`} className="llp-btn-call">
              <PhoneIcon size={14} /> Call Us
            </a>
            <button className="llp-btn-screen" onClick={scrollToForm}>
              Free Checkup
            </button>
          </nav>
        </div>
      </header>

      {/* ── FLOATING BUTTONS ── */}
      <div className="llp-fab">
        <a href={WA_URL} target="_blank" rel="noopener noreferrer" className="llp-fab-btn llp-fab-wa" aria-label="Chat on WhatsApp">
          <span className="llp-fab-ping" />
          <WaIcon size={26} />
        </a>
        <a href={`tel:${PHONE_TEL}`} className="llp-fab-btn llp-fab-call" aria-label="Call us">
          <PhoneIcon size={22} />
        </a>
      </div>

      {/* ── CITY BAR ── */}
      <div className="llp-city-bar">
        <span className="llp-city-bar-label">Select City:</span>
        <div className="llp-city-tabs">
          {(['delhi', 'mumbai', 'gurugram', 'noida', 'ghaziabad', 'faridabad', 'pune'] as CityKey[]).map((k) => (
            <a key={k} href={`/lp/lasik/${k}`} className={`llp-city-tab${k === cityKey ? ' active' : ''}`}>
              {CITY_DATA[k].name}
            </a>
          ))}
        </div>
      </div>

      {/* ── PAGE BODY ── */}
      <div className="llp-page">
        <div className="llp-grid">

          {/* ── MAIN CONTENT ── */}
          <div className="llp-main">

            {/* HERO */}
            <section className="llp-hero">
              <div className="llp-hero-grid">
                <div>
                  <div className="llp-hero-badge">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="3" />
                      <path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7-10-7-10-7z" />
                    </svg>
                    Laser Eye Surgery, No Blade Used
                  </div>
                  <h1 dangerouslySetInnerHTML={{ __html: `${cityData.headline} <em>${cityData.headlineEm}</em>` }} />
                  <p className="llp-hero-sub">{cityData.sub}</p>
                  <div className="llp-hero-pills">
                    {['Done In 15 Minutes', 'No Blade Used', 'No More Glasses', 'Free Eye Checkup'].map((t) => (
                      <div className="llp-hero-pill" key={t}><span className="llp-dot" />{t}</div>
                    ))}
                  </div>
                  <div className="llp-hero-cta">
                    <button className="llp-hero-cta-primary" onClick={scrollToForm}>Book Free Checkup</button>
                  </div>
                </div>
                <div className="llp-hero-visual">
                  <div className="llp-hero-img-wrap">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={IMG_EYE_MACRO} alt="Close-up of a human eye" />
                  </div>
                  <div className="llp-hero-floatcard llp-hero-fc-1">
                    <div><div className="num">10K+</div><div className="lbl">Surgeries Done</div></div>
                  </div>
                  <div className="llp-hero-floatcard llp-hero-fc-2">
                    <div><div className="num">98%</div><div className="lbl">Happy Patients</div></div>
                  </div>
                </div>
              </div>
            </section>

            {/* STATS */}
            <div className="llp-stats">
              <div className="llp-stat"><div className="llp-stat-num">10K+</div><div className="llp-stat-label">Successful Surgeries</div></div>
              <div className="llp-stat"><div className="llp-stat-num">7</div><div className="llp-stat-label">Cities Covered</div></div>
              <div className="llp-stat"><div className="llp-stat-num">98%</div><div className="llp-stat-label">Patients Satisfied</div></div>
            </div>

            {/* WHY US */}
            <section className="llp-section">
              <h2>Why People Choose Us</h2>
              <p className="llp-section-lead">We only suggest LASIK if it's actually right for your eyes — never to make a sale.</p>
              <div className="llp-why-grid">
                {[
                  { icon: '🔬', text: 'Modern, blade-free laser — approved and widely used' },
                  { icon: '🧑‍⚕️', text: 'Senior eye surgeons with years of hands-on experience' },
                  { icon: '📋', text: "Honest checkup first — we say no if LASIK isn't right for you" },
                  { icon: '📞', text: "We call and check on you after surgery, not just hand you a discharge slip" },
                ].map((c, i) => (
                  <div className="llp-why-card" key={i}>
                    <span className="llp-why-icon">{c.icon}</span>
                    <span className="llp-why-text">{c.text}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* AREAS */}
            <section className="llp-section llp-section-tint">
              <h2>{cityData.areasTitle}</h2>
              <p className="llp-section-lead">{cityData.areasLead}</p>
              <div className="llp-chips">
                {cityData.areas.map((a) => <span className="llp-chip" key={a}>{a}</span>)}
              </div>
            </section>

            {/* WHAT IS LASIK */}
            <section className="llp-section">
              <h2>What Is LASIK?</h2>
              <p className="llp-section-lead">LASIK is a quick laser treatment for your eyes. It reshapes the clear front part of your eye (the cornea) so you can see clearly — often without needing glasses or contact lenses anymore.</p>
              <div className="llp-img-grid">
                <div>
                  <div className="llp-img-grid-item">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={IMG_IRIS_CLOSEUP} alt="Close-up of an eye iris" />
                  </div>
                  <div className="llp-img-caption">Your Eye, Up Close</div>
                </div>
                <div>
                  <div className="llp-img-grid-item">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={IMG_EYE_TEST_MACHINE} alt="Laser eye treatment equipment" />
                  </div>
                  <div className="llp-img-caption">The Laser Machine Used</div>
                </div>
              </div>
              <ul className="llp-check">
                <li>Fixes nearsightedness (trouble seeing things far away) — even strong numbers</li>
                <li>Fixes farsightedness (trouble seeing things up close)</li>
                <li>Fixes astigmatism (blurry or stretched-looking vision)</li>
                <li>Day procedure — you go home the same day, no hospital stay</li>
                <li>Most patients don't need glasses or contacts after this</li>
              </ul>
            </section>

            {/* GLASSES VS LASIK */}
            <section className="llp-section llp-section-tint">
              <h2>Glasses & Contacts vs. LASIK</h2>
              <p className="llp-section-lead">A simple way to compare your two options.</p>
              <div className="llp-compare">
                <div className="llp-compare-col bad">
                  <div className="llp-compare-img">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={IMG_GLASSES} alt="A pair of eyeglasses" />
                  </div>
                  <div className="llp-compare-body">
                    <h3>Glasses & Contacts</h3>
                    <ul className="llp-cross">
                      <li>Something to carry, clean and replace, every day</li>
                      <li>Can fog up, slip, or break</li>
                      <li>Ongoing cost — new pairs, new lenses, every year</li>
                    </ul>
                  </div>
                </div>
                <div className="llp-compare-col good">
                  <div className="llp-compare-img">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={IMG_EYE_EXAM} alt="Eye examination" />
                  </div>
                  <div className="llp-compare-body">
                    <h3>LASIK (One-Time)</h3>
                    <ul className="llp-check">
                      <li>One 15-minute procedure, done once</li>
                      <li>Wake up, work out, swim — without worrying about glasses</li>
                      <li>One upfront cost — no recurring lens expenses</li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>

            {/* HOW IT WORKS */}
            <section className="llp-section">
              <h2>How It Works — 3 Simple Steps</h2>
              <p className="llp-section-lead">The whole thing takes about 15 minutes. Numbing eye drops mean you won't feel pain.</p>
              <div className="llp-process-grid">
                {[
                  { n: '1', title: 'A Thin Flap Is Opened', p: 'A laser gently lifts a thin flap on the surface of your eye. No blade is used.' },
                  { n: '2', title: 'Your Eye Is Reshaped', p: 'A second laser reshapes the surface in under a minute, matching your exact prescription.' },
                  { n: '3', title: 'The Flap Heals On Its Own', p: 'The flap is placed back down and heals naturally overnight — no stitches needed.' },
                ].map((s) => (
                  <div className="llp-process-card" key={s.n}>
                    <div className="llp-process-num">{s.n}</div>
                    <h3>{s.title}</h3>
                    <p>{s.p}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* PROCEDURE TYPES */}
            <section className="llp-section llp-section-tint">
              <h2>Types of LASIK We Offer</h2>
              <p className="llp-section-lead">After your free checkup, we'll tell you which one suits your eyes.</p>
              <div className="llp-tbl-wrap">
                <table className="llp-tbl">
                  <thead><tr><th>Procedure</th><th>How It Works</th><th>Good For</th></tr></thead>
                  <tbody>
                    <tr><td><strong>Femto LASIK</strong></td><td>Blade-free laser flap</td><td>Most people — our most common choice</td></tr>
                    <tr><td><strong>Contoura Vision</strong></td><td>Maps your eye's shape before reshaping</td><td>Irregular corneas, sharper night vision</td></tr>
                    <tr><td><strong>SMILE</strong></td><td>Smallest cut, fully laser-based</td><td>Faster, more comfortable healing</td></tr>
                    <tr><td><strong>PRK / TransPRK</strong></td><td>Reshapes the surface, no flap</td><td>Thinner corneas, special cases</td></tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* ELIGIBILITY */}
            <section className="llp-section">
              <h2>Is LASIK Right For You?</h2>
              <p className="llp-section-lead">Every eye is different — the only way to really know is a free checkup with us.</p>
              <div className="llp-two">
                <div>
                  <h3 style={{ color: 'var(--accent)' }}>✓ Usually a Good Fit</h3>
                  <ul className="llp-check">
                    <li>18 years or older</li>
                    <li>Eye power hasn't changed much in the last 12 months</li>
                    <li>Cornea (front of the eye) is a normal thickness</li>
                    <li>No active eye infection right now</li>
                    <li>Not pregnant or breastfeeding</li>
                  </ul>
                </div>
                <div>
                  <h3 style={{ color: '#dc2626' }}>✗ May Need a Different Plan</h3>
                  <ul className="llp-cross">
                    <li>Very dry eyes</li>
                    <li>Thin or irregularly-shaped cornea</li>
                    <li>Keratoconus (a cornea-thinning condition)</li>
                    <li>Glaucoma that isn't under control</li>
                    <li>Certain autoimmune conditions</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* COST & EMI */}
            <section className="llp-section llp-section-tint">
              <h2>Cost & Easy Payment Options</h2>
              <p className="llp-section-lead">Your exact cost depends on which procedure your eyes need — we'll confirm this for free at your checkup.</p>
              <div className="llp-emi-grid">
                <div className="llp-emi-card"><div className="tenure">0%</div><div className="note">Interest On EMI</div></div>
                <div className="llp-emi-card"><div className="tenure">3–12</div><div className="note">Month Plans Available</div></div>
                <div className="llp-emi-card"><div className="tenure">Insurance</div><div className="note">Accepted At Most Centres</div></div>
              </div>
              <p className="llp-section-lead" style={{ marginBottom: 0 }}>Ask our team on WhatsApp for the exact price list for your city and procedure.</p>
            </section>

            {/* RISKS */}
            <section className="llp-section">
              <h2>Possible Side Effects</h2>
              <p className="llp-section-lead">LASIK is considered safe when the right checkup is done first. Here's what to expect.</p>
              <div className="llp-two">
                <div>
                  <h3>Common — Usually Goes Away</h3>
                  <ul className="llp-check">
                    <li>Dry eyes for a few months</li>
                    <li>Glare or halos at night for 2–4 weeks</li>
                    <li>Mild discomfort for the first 24–48 hours</li>
                  </ul>
                </div>
                <div>
                  <h3 style={{ color: '#dc2626' }}>Rare But Serious</h3>
                  <ul className="llp-cross">
                    <li>Cornea thinning over time (ectasia)</li>
                    <li>Infection or strong inflammation</li>
                    <li>Vision slightly over- or under-corrected, needing a touch-up</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* RECOVERY */}
            <section className="llp-section llp-section-tint">
              <h2>What Recovery Looks Like</h2>
              <p className="llp-section-lead">Most people are back to normal life within a few days.</p>
              <div className="llp-tbl-wrap">
                <table className="llp-tbl">
                  <thead><tr><th>Time After Surgery</th><th>What You'll Notice</th></tr></thead>
                  <tbody>
                    <tr><td><strong>First 24 hours</strong></td><td>Vision improves noticeably. Mild redness is normal. Rest your eyes and skip screens.</td></tr>
                    <tr><td><strong>1 week</strong></td><td>Big improvement. Most daily activities are safe to resume.</td></tr>
                    <tr><td><strong>1 month</strong></td><td>Vision settles for most people. Sports and intense work are usually fine.</td></tr>
                    <tr><td><strong>3–6 months</strong></td><td>Full healing. Any dryness usually clears up. Final vision achieved.</td></tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* SPECIALISTS */}
            <section className="llp-section">
              <h2>Meet Our Eye Specialists</h2>
              <p className="llp-section-lead">Experienced surgeons who'll walk you through every step.</p>
              <div className="llp-doctor-grid">
                {[
                  { img: IMG_DOCTOR_1, name: 'Add Doctor Name', role: 'LASIK & Cornea Specialist', exp: '12+ years experience' },
                  { img: IMG_DOCTOR_2, name: 'Add Doctor Name', role: 'Refractive Surgeon', exp: '15+ years experience' },
                  { img: IMG_DOCTOR_3, name: 'Add Doctor Name', role: 'Cataract & LASIK Surgeon', exp: '10+ years experience' },
                ].map((d, i) => (
                  <div className="llp-doctor-card" key={i}>
                    <div className="llp-doctor-photo">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={d.img} alt={d.role} />
                    </div>
                    <div className="llp-doctor-info">
                      <h3>{d.name}</h3>
                      <div className="role">{d.role}</div>
                      <div className="exp">{d.exp}</div>
                    </div>
                  </div>
                ))}
              </div>
              <p className="llp-img-caption" style={{ marginTop: 14 }}>
                Placeholder photos — replace with your actual surgeons' real photos and names before this goes live.
              </p>
            </section>

            {/* FAQ */}
            <section className="llp-section llp-section-tint">
              <h2>Common Questions</h2>
              <br />
              {SHARED_FAQS.map((item, i) => (
                <div key={i} className={`llp-faq${expandedFAQ === i ? ' active' : ''}`}>
                  <button className="llp-faq-q" onClick={() => setExpandedFAQ(expandedFAQ === i ? -1 : i)}>
                    <span>{item.q}</span>
                    <span className="llp-faq-icon">▾</span>
                  </button>
                  <div className="llp-faq-a">
                    <div className="llp-faq-a-inner">{item.a}</div>
                  </div>
                </div>
              ))}
            </section>

            {/* TESTIMONIALS */}
            <section className="llp-section">
              <h2>What Patients in {cityData.name} Say</h2>
              <p className="llp-section-lead">Real stories, real results. No sponsored reviews.</p>
              {cityData.testimonials.map((t, i) => (
                <div className="llp-testi" key={i}>
                  <div className="llp-testi-stars">★★★★★</div>
                  <p className="llp-testi-quote">&ldquo;{t.quote}&rdquo;</p>
                  <div className="llp-testi-name">{t.name}</div>
                  <div className="llp-testi-role">{t.role}</div>
                </div>
              ))}
            </section>

            {/* CLOSING */}
            <section className="llp-closing">
              <h2>{cityData.closingHeadline}</h2>
              <p>{cityData.closingSub}</p>
              <div className="llp-closing-btns">
                <a href={WA_URL} className="llp-cb-wa" target="_blank" rel="noopener noreferrer">
                  <WaIcon size={17} /> WhatsApp Us Now
                </a>
                <button className="llp-cb-screen" onClick={scrollToForm}>
                  Book Your Free Checkup
                </button>
              </div>
            </section>
          </div>

          {/* ── LEAD CARD ── */}
          <div className="llp-side">
            <div className="llp-lead" id="lead-card">
              <div className="llp-lead-content">
                <div className="llp-lead-eyebrow">🏥 {cityData.name} · Free Checkup</div>
                <h3>Book Your Free Checkup</h3>
                <p className="llp-lead-sub">Drop your name & number — we'll call within 5 minutes.</p>

                <form onSubmit={handleSubmit}>
                  {error && <div className="llp-lead-error">{error}</div>}
                  <div className="llp-lead-field">
                    <label className="llp-lead-label" htmlFor="llp-name">Full Name</label>
                    <input
                      className="llp-lead-input"
                      id="llp-name"
                      ref={nameRef}
                      type="text"
                      name="name"
                      placeholder="Your full name"
                      autoComplete="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      disabled={loading}
                      required
                    />
                  </div>
                  <div className="llp-lead-field">
                    <label className="llp-lead-label" htmlFor="llp-phone">Mobile Number</label>
                    <div className="llp-phone-row">
                      <span className="llp-phone-pre">+91</span>
                      <input
                        id="llp-phone"
                        type="tel"
                        name="phone"
                        placeholder="10-digit number"
                        maxLength={10}
                        value={formData.phone}
                        onChange={(e) => {
                          const v = e.target.value.replace(/\D/g, '');
                          if (v.length <= 10) setFormData((prev) => ({ ...prev, phone: v }));
                        }}
                        disabled={loading}
                        required
                      />
                    </div>
                  </div>
                  <button className="llp-lead-submit" type="submit" disabled={loading}>
                    {loading ? 'Booking...' : '✓ Book Free Checkup'}
                  </button>
                </form>

                <div className="llp-lead-trust">
                  <span>✓ Free</span>
                  <span>✓ No obligation</span>
                  <span>✓ Confidential</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* ── MOBILE STICKY CTA ── */}
      <div className="llp-sticky-cta">
        <button onClick={scrollToForm}>Book Free Checkup</button>
      </div>

      {/* ── FOOTER ── */}
      <footer className="llp-footer">
        <div className="llp-footer-inner">
          <div className="llp-footer-brand">
            <div className="llp-footer-brand-logo">
              <Image src="/vv.png" alt="Healvia" width={180} height={64} style={{ objectFit: 'contain', width: '180px', height: 'auto' }} />
            </div>
            <p>India's most trusted LASIK partner. Free checkups, honest advice, real follow-up calls. Serving 7 cities with world-class eye care.</p>
            <a href={WA_URL} className="llp-footer-wa-btn" target="_blank" rel="noopener noreferrer">
              <WaIcon size={15} /> Message on WhatsApp
            </a>
          </div>
          <div className="llp-footer-section">
            <h4>Services</h4>
            <ul>
              <li><a href="#">Femto LASIK</a></li>
              <li><a href="#">SMILE Procedure</a></li>
              <li><a href="#">Contoura Vision</a></li>
              <li><a href="#">PRK/TransPRK</a></li>
            </ul>
          </div>
          <div className="llp-footer-section">
            <h4>Locations</h4>
            <ul>
              {(['delhi', 'mumbai', 'gurugram', 'noida', 'ghaziabad', 'faridabad', 'pune'] as CityKey[]).map((k) => (
                <li key={k}><a href={`/lp/lasik/${k}`}>{CITY_DATA[k].name}</a></li>
              ))}
            </ul>
          </div>
          <div className="llp-footer-section">
            <h4>Contact</h4>
            <ul>
              <li><a href={`tel:${PHONE_TEL}`}>📞 {PHONE_DISPLAY}</a></li>
              <li><a href={WA_URL} target="_blank" rel="noopener noreferrer">💬 WhatsApp</a></li>
              <li><a href="mailto:info@healviacare.com">✉️ info@healviacare.com</a></li>
            </ul>
          </div>
        </div>
        <div className="llp-footer-bottom">
          © {new Date().getFullYear()} HealviaCare. All rights reserved. &nbsp;|&nbsp;
          <a href="#">Privacy Policy</a> &nbsp;|&nbsp; <a href="#">Terms of Use</a>
        </div>
      </footer>
    </div>
  );
}