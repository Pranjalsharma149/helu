'use client';

import { useState } from 'react';

// ── CONTACT CONSTANTS ────────────────────────────────────────────────────────
const WA_NUMBER = '919310984753';
const WA_MSG = encodeURIComponent("Hi, I'd like to book a free Cataract checkup");
const WA_URL = `https://wa.me/${WA_NUMBER}?text=${WA_MSG}`;
const TEL_URL = `tel:+${WA_NUMBER}`;

// ── CITY DATA ────────────────────────────────────────────────────────────────
export type CityKey = 'delhi' | 'mumbai' | 'gurugram' | 'noida' | 'ghaziabad' | 'faridabad' | 'pune';

interface CityData {
  name: string;
}

const CITY_DATA: Record<CityKey, CityData> = {
  delhi: { name: 'Delhi' },
  mumbai: { name: 'Mumbai' },
  gurugram: { name: 'Gurugram' },
  noida: { name: 'Noida' },
  ghaziabad: { name: 'Ghaziabad' },
  faridabad: { name: 'Faridabad' },
  pune: { name: 'Pune' },
};

// Each of these is a full composite hero graphic — headline, sub-headline,
// feature icons, and the city badge are all baked into the image itself.
// Drop each city's version into /public with these filenames.
const HERO_IMAGES: Record<CityKey, string> = {
  delhi: '/c-delhi.png',
  mumbai: '/c-mumbai.png',
  gurugram: '/c-gurugram.png',
  noida: '/c-noida.png',
  ghaziabad: '/c-ghaziabad.png',
  faridabad: '/c-faridabad.png',
  pune: '/c-pune.png',
};

// Drop the composite insurance-partner graphic into /public with this filename.
const INSURANCE_IMAGE = '/insurance.png';

const INSURANCE_NAMES = [
  'Acko General Insurance',
  'Aditya Birla Health Insurance',
  'Bharti AXA General Insurance',
  'Chola MS General Insurance',
  'Edelweiss General Insurance',
  'Future Generali',
  'Digit General Insurance',
  'IFFCO-Tokio General Insurance',
  'Kotak General Insurance',
  'Liberty General Insurance',
  'Magma HDI General Insurance',
  'Manipal Cigna Health Insurance',
  'Navi General Insurance',
  'National Insurance Company',
  'Reliance General Insurance',
  'Royal Sundaram General Insurance',
  'The New India Assurance',
  'Oriental Insurance',
  'United India Insurance',
  'Universal Sompo General Insurance',
  'Star Health Insurance',
  'Care Health Insurance',
  'Niva Bupa Health Insurance',
  'HDFC ERGO General Insurance',
  'ICICI Lombard General Insurance',
  'Bajaj Allianz General Insurance',
  'SBI General Insurance',
  'Tata AIG General Insurance',
  'Religare Health Insurance',
  'Cigna TTK Health Insurance',
];

// Second-line trust signals — shown as their own scrolling strip.
const TRUST_BADGES = [
  'NABH Accredited Hospitals',
  '15,000+ Successful Surgeries',
  '500+ Trusted Doctors',
  '0% EMI Available',
  '4.8/5 Patient Rating',
  'Cashless Treatment',
  'Same-Day Discharge',
  '20+ Insurance Partners',
];

// Drop these two procedure photos into /public with these filenames.
const ABOUT_IMAGES = {
  consult: '/cataract.1.png',
  procedure: '/cataract.2.png',
};

// Drop the before/after composite graphic into /public with this filename —
// a single image with "Before/After Cataract Surgery" already baked into it.
const EXPERIENCE_IMAGE = '/c-b-a.png';

// Drop the 3-step "How Does Cataract Surgery Work?" composite graphic into
// /public with this filename — the steps, icons, and captions are baked in.
const PROCESS_IMAGE = '/cataract-work.png';

// Common cataract warning signs — split into early vs progressed, so
// readers can quickly self-identify where they are.
const EARLY_SIGNS = [
  'Things look blurry or out of focus, even with glasses on',
  'Colours look faded, dull, or slightly yellow',
  'Bright lights feel too harsh or cause glare',
  'Oncoming headlights at night look like starbursts',
  'You need more light than before to read comfortably',
];

const PROGRESSED_SIGNS = [
  'Vision is very cloudy or foggy all the time',
  'Double vision in one eye',
  'You keep needing stronger glasses every few months',
  'Difficulty recognising faces from a distance',
  'Trouble watching TV or reading even with strong glasses',
];

// Drop each specialist's headshot into /public with these filenames.
// If a photo is missing, the card falls back to a plain initials avatar
// automatically, so this won't ever show a broken-image icon.
const DOCTORS = [
  { name: 'Dr. Ananya Sharma', role: 'Senior Cataract Surgeon', exp: '15+ yrs experience', photo: '/c-doctor-1.png' },
  { name: 'Dr. Rohan Mehta', role: 'Senior Ophthalmologist', exp: '12+ yrs experience', photo: '/c-doctor-2.png' },
  { name: 'Dr. Kavita Nair', role: 'Cataract & Retina Specialist', exp: '10+ yrs experience', photo: '/c-doctor-3.png' },
  { name: 'Dr. Arjun Verma', role: 'Phacoemulsification Expert', exp: '14+ yrs experience', photo: '/c-doctor-4.png' },
  { name: 'Dr. Priya Iyer', role: 'Cornea & Cataract Specialist', exp: '9+ yrs experience', photo: '/c-doctor-5.png' },
  { name: 'Dr. Sameer Khan', role: 'Cataract & IOL Surgeon', exp: '11+ yrs experience', photo: '/c-doctor-6.png' },
];

const CATARACT_STATS = [
  { value: '15-30 min', label: 'Procedure duration' },
  { value: '15K+', label: 'Successful surgeries' },
  { value: 'Blade-Free', label: 'All-laser technology' },
  { value: 'Same Day', label: 'Discharge home' },
];

// PLACEHOLDER reviews — swap in your real patients' names, photos, and
// actual quotes once you have them. Photos are optional (falls back to an
// initials avatar, same as the doctor cards).
const REVIEWS = [
  {
    name: 'Patient Name',
    photo: '/c-review-1.png',
    headline: 'Reading the newspaper again after years',
    quote: "I was scared of surgery, but it was over in 20 minutes and completely painless. The very next morning I could read without my glasses for the first time in years.",
  },
  {
    name: 'Patient Name',
    photo: '/c-review-2.png',
    headline: 'Colours look vivid and bright again',
    quote: "I didn't realise how faded my vision had become until after the surgery. Everything looks so much sharper and brighter now. It's like getting a new pair of eyes.",
  },
  {
    name: 'Patient Name',
    photo: '/c-review-3.png',
    headline: 'Back home the very same evening',
    quote: "The team explained every step before we started, so I felt calm throughout. I was home resting by evening and back to my normal routine within a few days.",
  },
];

// PLACEHOLDER video testimonials — swap in your real YouTube video IDs and
// details once you have them. The ID is the part after "v=" in a YouTube
// URL (e.g. youtube.com/watch?v=KH34CgQXBP8 → 'KH34CgQXBP8').
const TESTIMONIALS = [
  { youtubeId: 'dQw4w9WgXcQ', name: 'Ramesh Gupta', procedure: 'Cataract Surgery' },
  { youtubeId: 'dQw4w9WgXcQ', name: 'Sunita Mehta', procedure: 'Cataract Surgery' },
  { youtubeId: 'dQw4w9WgXcQ', name: 'Vikram Sethi', procedure: 'Cataract Surgery' },
  { youtubeId: 'dQw4w9WgXcQ', name: 'Deepak Jain', procedure: 'Cataract Surgery' },
];

// FAQ content — mostly evergreen, but the first question references the
// current city so it feels tailored to the page.
function getFaqs(cityName: string) {
  return [
    {
      q: `Is cataract surgery available near me in ${cityName}?`,
      a: `Yes — we have partner centres in ${cityName} with modern, blade-free cataract technology. Book a free checkup and our team will confirm the nearest location and a slot that works for you.`,
    },
    {
      q: 'What is a cataract, in simple words?',
      a: 'The natural lens inside your eye is normally clear. As you get older, this lens can slowly turn cloudy — like a dirty windshield. That cloudy lens is called a cataract. It makes everything look blurry, foggy, or faded. The good news: removing it is a safe, routine surgery.',
    },
    {
      q: 'Is cataract surgery painful?',
      a: 'No. Numbing eye drops are used before the surgery so you feel nothing — most patients only feel a little pressure, not pain. The whole procedure takes about 15-30 minutes, and you stay awake but comfortable throughout.',
    },
    {
      q: 'How will I know if I have a cataract?',
      a: 'Common signs include blurry or cloudy vision, colours looking faded or yellowish, glare from lights at night, and needing stronger glasses more often. A free eye checkup with us will tell you exactly what\'s going on.',
    },
    {
      q: 'Will I need glasses after cataract surgery?',
      a: 'That depends on the type of lens used. With a basic lens you may still need glasses for reading. With a premium multifocal lens, many people can do most activities without glasses. We\'ll explain which lens suits you best at your free checkup.',
    },
    {
      q: 'Can I go home the same day?',
      a: 'Yes. Cataract surgery is a day procedure — you come in, have the surgery, rest for a few hours, and go home. No overnight hospital stay is needed.',
    },
    {
      q: 'Does insurance cover cataract surgery?',
      a: 'Many of our insurance partners offer cashless coverage for cataract surgery depending on your policy. Our team can check your eligibility and handle the paperwork for you.',
    },
    {
      q: 'Is it safe for elderly patients?',
      a: 'Absolutely. Most cataract patients are aged 60 and above, and the surgery is very safe even for patients in their 80s. We do a full health check before surgery to make sure everything is in order.',
    },
  ];
}

// ── VALIDATION ───────────────────────────────────────────────────────────────
function validatePhone(digits: string): string {
  if (digits.length !== 10) return 'Enter a valid 10-digit mobile number';
  if (!/^[6-9]/.test(digits)) return 'Enter a valid Indian mobile number';
  const fake = [
    /^(\d)\1{9}$/,
    /^1234567890$/,
    /^0987654321$/,
    /^1234554321$/,
    /^(\d{2})\1{4}$/,
    /^(\d{5})\1$/,
  ];
  if (fake.some((p) => p.test(digits))) return 'Enter a real mobile number';
  return '';
}

function validateName(value: string): string {
  const trimmed = value.trim();
  if (trimmed.length < 2) return 'Enter your full name';
  if (!/^[a-zA-Z\s.'-]+$/.test(trimmed)) return 'Name can only contain letters';
  return '';
}

// Turns "Dr. Ananya Sharma" into "AS" for the fallback avatar.
function getInitials(fullName: string): string {
  return fullName
    .replace(/^Dr\.\s*/i, '')
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join('')
    .toUpperCase();
}

// ── ICONS ────────────────────────────────────────────────────────────────────
const WaIcon = ({ size = 26 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
    <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.553 4.118 1.527 5.846L0 24l6.335-1.502A11.955 11.955 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 01-5.006-1.375l-.36-.213-3.73.885.927-3.636-.233-.374A9.816 9.816 0 012.182 12C2.182 6.578 6.578 2.182 12 2.182S21.818 6.578 21.818 12 17.422 21.818 12 21.818z" />
  </svg>
);

const PhoneIcon = ({ size = 24 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M6.62 10.79a15.09 15.09 0 006.59 6.59l2.2-2.2a1 1 0 011.02-.24 11.36 11.36 0 003.57.57 1 1 0 011 1V20a1 1 0 01-1 1C10.61 21 3 13.39 3 4a1 1 0 011-1h3.5a1 1 0 011 1 11.36 11.36 0 00.57 3.57 1 1 0 01-.25 1.02l-2.2 2.2z" />
  </svg>
);

// Doctor card: shows the headshot if it loads, otherwise falls back to a
// plain initials avatar — never a broken-image icon.
function DoctorCard({ doctor }: { doctor: (typeof DOCTORS)[number] }) {
  const [imgFailed, setImgFailed] = useState(false);

  return (
    <div className="clp2-doc-card">
      <div className="clp2-doc-photo">
        {!imgFailed ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={doctor.photo}
            alt={doctor.name}
            onError={() => setImgFailed(true)}
          />
        ) : (
          <div className="clp2-doc-avatar" aria-hidden="true">
            {getInitials(doctor.name)}
          </div>
        )}
      </div>
      <div className="clp2-doc-info">
        <div className="clp2-doc-name">{doctor.name}</div>
        <div className="clp2-doc-role">{doctor.role}</div>
        <div className="clp2-doc-exp">{doctor.exp}</div>
      </div>
    </div>
  );
}

// Review card: shows the patient photo if it loads, otherwise falls back
// to a plain initials avatar.
function ReviewCard({ review }: { review: (typeof REVIEWS)[number] }) {
  const [imgFailed, setImgFailed] = useState(false);

  return (
    <div className="clp2-review-card">
      <div className="clp2-review-avatar-wrap">
        {!imgFailed ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={review.photo}
            alt={review.name}
            className="clp2-review-avatar-img"
            onError={() => setImgFailed(true)}
          />
        ) : (
          <div className="clp2-review-avatar-fallback" aria-hidden="true">
            {getInitials(review.name)}
          </div>
        )}
      </div>
      <div className="clp2-review-name">{review.name}</div>
      <div className="clp2-review-headline">{review.headline}</div>
      <p className="clp2-review-quote">&ldquo;{review.quote}&rdquo;</p>
    </div>
  );
}

// Single accordion row: click the question to expand/collapse the answer.
function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div className={`clp2-faq-item${open ? ' is-open' : ''}`}>
      <button
        type="button"
        className="clp2-faq-q"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
      >
        <span>{q}</span>
        <span className="clp2-faq-icon" aria-hidden="true">{open ? '−' : '+'}</span>
      </button>
      {open && <p className="clp2-faq-a">{a}</p>}
    </div>
  );
}

// ── PROPS ────────────────────────────────────────────────────────────────────
interface CataractLandingPageProps {
  cityKey: CityKey;
}

export default function CataractLandingPage({ cityKey }: CataractLandingPageProps) {
  const cityData = CITY_DATA[cityKey];
  const heroImage = HERO_IMAGES[cityKey];

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  if (!cityData) return <div style={{ padding: 40 }}>City not found: &quot;{cityKey}&quot;</div>;

  const faqs = getFaqs(cityData.name);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const nameErr = validateName(name);
    if (nameErr) {
      setError(nameErr);
      return;
    }
    const phoneErr = validatePhone(phone);
    if (phoneErr) {
      setError(phoneErr);
      return;
    }

    setLoading(true);
    try {
      // Wire this up to /api/leads in a later step.
      await new Promise((resolve) => setTimeout(resolve, 500));
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="clp2">
      <style>{`
        .clp2 *, .clp2 *::before, .clp2 *::after { box-sizing: border-box; margin: 0; padding: 0; }
        .clp2 {
          font-family: 'Manrope', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
          color: #0E2B27;
          background: #ffffff;
          --ink: #0E2B27;
          --accent: #0E8C82;
          --accent-deep: #085F58;
          --accent-soft: #EAF6F3;
          --line: #E4E9E7;
          --muted: #5B6B67;
        }
        .clp2-wrap { max-width: 1280px; margin: 0 auto; padding: 0 32px; }

        /* ── HERO ── */
        .clp2-hero { padding: 56px 0 72px; }
        .clp2-hero-grid { display: grid; grid-template-columns: 1.15fr 0.85fr; gap: 40px; align-items: stretch; }

        .clp2-hero-visual { border-radius: 16px; overflow: hidden; border: 1px solid var(--line); height: 100%; min-width: 0; }
        .clp2-hero-visual img { width: 100%; height: 100%; object-fit: cover; display: block; }

        .clp2-lead {
          background: #fff; border: 1px solid var(--line); border-radius: 16px;
          padding: 30px 30px 26px; align-self: center; min-width: 0;
        }
        .clp2-lead-eyebrow { font-size: 11px; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; color: var(--accent-deep); margin-bottom: 8px; }
        .clp2-lead h3 { font-family: 'Fraunces', serif; font-weight: 500; font-size: 22px; color: var(--ink); margin-bottom: 4px; }
        .clp2-lead-sub { font-size: 13.5px; color: var(--muted); margin-bottom: 22px; line-height: 1.6; }

        .clp2-field { margin-bottom: 16px; }
        .clp2-field label { display: block; font-size: 11px; font-weight: 700; color: var(--muted); text-transform: uppercase; letter-spacing: 0.06em; margin-bottom: 7px; }
        .clp2-field input { width: 100%; border: none; border-bottom: 1.5px solid var(--line); padding: 7px 2px 9px; font-size: 15px; font-family: 'Manrope', sans-serif; color: var(--ink); background: transparent; outline: none; transition: border-color .2s ease; }
        .clp2-field input::placeholder { color: #B7C2BF; }
        .clp2-field input:focus { border-color: var(--accent); }

        .clp2-phone-field { display: flex; align-items: flex-end; gap: 8px; border-bottom: 1.5px solid var(--line); transition: border-color .2s ease; }
        .clp2-phone-field:focus-within { border-color: var(--accent); }
        .clp2-phone-field .prefix { font-size: 15px; color: var(--muted); font-weight: 600; padding-bottom: 9px; }
        .clp2-phone-field input { border-bottom: none; flex: 1; }

        .clp2-lead-error { background: #FDECEC; color: #A32D2D; font-size: 12.5px; font-weight: 600; padding: 9px 12px; border-radius: 8px; margin-bottom: 14px; }
        .clp2-lead-success { background: var(--accent-soft); color: var(--accent-deep); font-size: 13.5px; font-weight: 600; padding: 14px 16px; border-radius: 10px; text-align: center; }

        .clp2-lead-submit { width: 100%; padding: 13px; border: none; border-radius: 10px; background: var(--ink); color: #fff; font-size: 14px; font-weight: 700; cursor: pointer; margin-top: 4px; transition: background .2s ease, transform .2s ease; }
        .clp2-lead-submit:hover:not(:disabled) { background: var(--accent-deep); transform: translateY(-1px); }
        .clp2-lead-submit:disabled { opacity: 0.65; cursor: not-allowed; }

        .clp2-lead-trust { display: flex; justify-content: space-between; margin-top: 16px; padding-top: 14px; border-top: 1px solid var(--line); }
        .clp2-lead-trust span { font-size: 10.5px; color: var(--muted); font-weight: 600; }

        /* ── TRUST / INSURANCE ── */
        .clp2-trust { padding: 8px 0 60px; overflow-x: hidden; }
        .clp2-trust-grid { display: grid; grid-template-columns: 0.85fr 1.15fr; gap: 40px; align-items: center; margin-bottom: 34px; }
        .clp2-trust-visual { border-radius: 16px; overflow: hidden; border: 1px solid var(--line); min-width: 0; }
        .clp2-trust-visual img { width: 100%; display: block; }
        .clp2-trust-copy { min-width: 0; }
        .clp2-trust-copy h3 { font-family: 'Fraunces', serif; font-weight: 500; font-size: 25px; color: var(--ink); margin: 6px 0 10px; line-height: 1.28; }
        .clp2-trust-sub { font-size: 14px; color: var(--muted); margin-bottom: 18px; line-height: 1.6; }

        .clp2-marquee { min-width: 0; max-width: 100%; overflow: hidden; -webkit-mask-image: linear-gradient(90deg, transparent, #000 6%, #000 94%, transparent); mask-image: linear-gradient(90deg, transparent, #000 6%, #000 94%, transparent); }
        .clp2-marquee-track { display: flex; gap: 12px; width: max-content; animation: clp2-scroll 36s linear infinite; }
        .clp2-marquee:hover .clp2-marquee-track { animation-play-state: paused; }
        .clp2-marquee-reverse .clp2-marquee-track { animation-direction: reverse; animation-duration: 26s; }
        @keyframes clp2-scroll { from { transform: translateX(0); } to { transform: translateX(-50%); } }

        .clp2-pill { flex: 0 0 auto; padding: 9px 18px; border: 1px solid var(--line); border-radius: 999px; font-size: 13px; font-weight: 600; color: var(--ink); background: #fff; white-space: nowrap; }

        .clp2-badges-strip { border-top: 1px solid var(--line); border-bottom: 1px solid var(--line); padding: 18px 0; }
        .clp2-badge-pill { flex: 0 0 auto; display: flex; align-items: center; gap: 8px; padding: 9px 20px; font-size: 13.5px; font-weight: 700; color: var(--accent-deep); white-space: nowrap; }
        .clp2-badge-pill .dot { width: 7px; height: 7px; border-radius: 50%; background: var(--accent-deep); flex-shrink: 0; }

        /* ── ABOUT US (COMPANY) ── */
        .clp2-company { padding: 10px 0 64px; overflow: hidden; position: relative; }
        .clp2-company-card {
          background: var(--ink); border-radius: 24px; padding: 56px 48px;
          position: relative; overflow: hidden; color: #fff;
        }
        .clp2-company-glow {
          position: absolute; width: 420px; height: 420px; border-radius: 50%;
          background: radial-gradient(circle, rgba(14,140,130,0.55) 0%, rgba(14,140,130,0) 70%);
          top: -160px; right: -120px; pointer-events: none;
        }
        .clp2-company-glow-2 {
          position: absolute; width: 320px; height: 320px; border-radius: 50%;
          background: radial-gradient(circle, rgba(234,246,243,0.10) 0%, rgba(234,246,243,0) 70%);
          bottom: -140px; left: -80px; pointer-events: none;
        }
        .clp2-company-inner { position: relative; z-index: 1; }
        .clp2-company-eyebrow { font-size: 11px; font-weight: 700; letter-spacing: 0.14em; text-transform: uppercase; color: #8FD8CE; margin-bottom: 16px; }
        .clp2-company-headline {
          font-family: 'Fraunces', serif; font-weight: 500; font-size: clamp(26px, 3.6vw, 42px);
          line-height: 1.28; max-width: 780px; margin-bottom: 22px;
        }
        .clp2-company-headline em { font-style: italic; color: #8FD8CE; }
        .clp2-company-sub { font-size: 15.5px; line-height: 1.8; color: rgba(255,255,255,0.78); max-width: 620px; margin-bottom: 36px; }

        .clp2-company-points { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; margin-bottom: 40px; }
        .clp2-company-point { border: 1px solid rgba(255,255,255,0.14); border-radius: 14px; padding: 20px 20px 22px; background: rgba(255,255,255,0.04); }
        .clp2-company-point .num { font-family: 'Fraunces', serif; font-size: 22px; color: #8FD8CE; display: block; margin-bottom: 8px; }
        .clp2-company-point .txt { font-size: 13.5px; line-height: 1.6; color: rgba(255,255,255,0.82); }

        .clp2-company-actions { display: flex; align-items: center; gap: 20px; flex-wrap: wrap; }
        .clp2-company-cta {
          padding: 15px 30px; border: none; border-radius: 10px; background: #fff; color: var(--ink);
          font-size: 14.5px; font-weight: 700; cursor: pointer; transition: transform .2s ease, background .2s ease;
        }
        .clp2-company-cta:hover { background: #8FD8CE; transform: translateY(-1px); }
        .clp2-company-note { font-size: 12.5px; color: rgba(255,255,255,0.6); }

        /* ── ABOUT (PROCEDURE) ── */
        .clp2-about { padding: 10px 0 64px; }
        .clp2-about-head { max-width: 640px; margin: 0 auto 34px; text-align: center; }
        .clp2-about-head .clp2-lead-eyebrow { display: block; text-align: center; }
        .clp2-about-head h2 { font-family: 'Fraunces', serif; font-weight: 500; font-size: clamp(28px, 3.4vw, 38px); color: var(--ink); margin: 8px 0 14px; line-height: 1.22; }
        .clp2-about-head p { font-size: 15px; color: var(--muted); line-height: 1.75; }

        .clp2-about-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; margin-bottom: 28px; }
        .clp2-about-img { border-radius: 16px; overflow: hidden; border: 1px solid var(--line); aspect-ratio: 4 / 3; min-width: 0; }
        .clp2-about-img img { width: 100%; height: 100%; object-fit: cover; display: block; }

        .clp2-about-fact { background: var(--accent-soft); border-radius: 14px; padding: 18px 22px; margin-bottom: 32px; font-size: 14px; color: var(--accent-deep); font-weight: 600; line-height: 1.65; display: flex; gap: 12px; align-items: flex-start; }
        .clp2-about-fact .spark { flex-shrink: 0; font-size: 18px; line-height: 1; }

        .clp2-about-stats { display: grid; grid-template-columns: repeat(4, 1fr); gap: 18px; margin-bottom: 34px; }
        .clp2-about-stat { text-align: center; padding: 22px 12px; border: 1px solid var(--line); border-radius: 14px; }
        .clp2-about-stat .value { font-family: 'Fraunces', serif; font-weight: 600; font-size: 25px; color: var(--accent-deep); display: block; }
        .clp2-about-stat .label { font-size: 11.5px; color: var(--muted); font-weight: 600; margin-top: 6px; display: block; }

        .clp2-about-cta { text-align: center; }
        .clp2-about-cta button { padding: 15px 32px; border: none; border-radius: 10px; background: var(--ink); color: #fff; font-size: 14.5px; font-weight: 700; cursor: pointer; transition: background .2s ease, transform .2s ease; }
        .clp2-about-cta button:hover { background: var(--accent-deep); transform: translateY(-1px); }

        /* ── EXPERIENCE (BEFORE/AFTER) ── */
        .clp2-experience { padding: 10px 0 64px; }
        .clp2-exp-head { max-width: 640px; margin: 0 auto 34px; text-align: center; }
        .clp2-exp-head .clp2-lead-eyebrow { display: block; text-align: center; }
        .clp2-exp-head h2 { font-family: 'Fraunces', serif; font-weight: 500; font-size: clamp(28px, 3.4vw, 38px); color: var(--ink); margin: 8px 0 14px; line-height: 1.22; }
        .clp2-exp-head p { font-size: 15px; color: var(--muted); line-height: 1.75; }

        .clp2-exp-visual { border-radius: 16px; overflow: hidden; border: 1px solid var(--line); background: #F4F7F6; margin-bottom: 34px; }
        .clp2-exp-visual img { width: 100%; height: auto; display: block; }

        .clp2-exp-cta { text-align: center; }
        .clp2-exp-cta button { padding: 15px 32px; border: none; border-radius: 10px; background: var(--ink); color: #fff; font-size: 14.5px; font-weight: 700; cursor: pointer; transition: background .2s ease, transform .2s ease; }
        .clp2-exp-cta button:hover { background: var(--accent-deep); transform: translateY(-1px); }

        /* ── PROCESS ── */
        .clp2-process { padding: 10px 0 64px; }
        .clp2-process-head { max-width: 640px; margin: 0 auto 30px; text-align: center; }
        .clp2-process-head .clp2-lead-eyebrow { display: block; text-align: center; }
        .clp2-process-head p { font-size: 15px; color: var(--muted); line-height: 1.75; margin-top: 10px; }
        .clp2-process-visual { border-radius: 16px; overflow: hidden; border: 1px solid var(--line); background: #F4F7F6; margin-bottom: 30px; }
        .clp2-process-visual img { width: 100%; height: auto; display: block; }
        .clp2-process-cta { text-align: center; }
        .clp2-process-cta button { padding: 15px 32px; border: none; border-radius: 10px; background: var(--ink); color: #fff; font-size: 14.5px; font-weight: 700; cursor: pointer; transition: background .2s ease, transform .2s ease; }
        .clp2-process-cta button:hover { background: var(--accent-deep); transform: translateY(-1px); }

        /* ── SIGNS OF CATARACT ── */
        .clp2-signs { padding: 10px 0 64px; }
        .clp2-signs-head { max-width: 640px; margin: 0 auto 30px; text-align: center; }
        .clp2-signs-head .clp2-lead-eyebrow { display: block; text-align: center; }
        .clp2-signs-head h2 { font-family: 'Fraunces', serif; font-weight: 500; font-size: clamp(28px, 3.4vw, 38px); color: var(--ink); margin: 8px 0 14px; line-height: 1.22; }
        .clp2-signs-head p { font-size: 15px; color: var(--muted); line-height: 1.75; }

        .clp2-signs-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; margin-bottom: 30px; }
        .clp2-signs-card { border-radius: 16px; padding: 28px 26px; border: 1px solid var(--line); }
        .clp2-signs-card.early { background: var(--accent-soft); border-color: transparent; }
        .clp2-signs-card.late { background: #fff; }
        .clp2-signs-card h3 { font-family: 'Fraunces', serif; font-weight: 500; font-size: 18px; margin-bottom: 18px; }
        .clp2-signs-card.early h3 { color: var(--accent-deep); }
        .clp2-signs-card.late h3 { color: #A32D2D; }
        .clp2-signs-list { list-style: none; display: flex; flex-direction: column; gap: 13px; }
        .clp2-signs-list li { display: flex; gap: 10px; font-size: 13.5px; line-height: 1.6; color: var(--ink); }
        .clp2-signs-list li::before { content: '✓'; flex-shrink: 0; font-weight: 700; color: var(--accent-deep); }
        .clp2-signs-card.late .clp2-signs-list li { color: var(--muted); }
        .clp2-signs-card.late .clp2-signs-list li::before { content: '✗'; color: #A32D2D; }

        .clp2-signs-cta { text-align: center; }
        .clp2-signs-cta button { padding: 15px 32px; border: none; border-radius: 10px; background: var(--ink); color: #fff; font-size: 14.5px; font-weight: 700; cursor: pointer; transition: background .2s ease, transform .2s ease; }
        .clp2-signs-cta button:hover { background: var(--accent-deep); transform: translateY(-1px); }

        /* ── DOCTORS ── */
        .clp2-doctors { padding: 10px 0 64px; overflow-x: hidden; }
        .clp2-doc-head { max-width: 640px; margin: 0 auto 34px; text-align: center; }
        .clp2-doc-head .clp2-lead-eyebrow { display: block; text-align: center; }
        .clp2-doc-head h2 { font-family: 'Fraunces', serif; font-weight: 500; font-size: clamp(28px, 3.4vw, 38px); color: var(--ink); margin: 8px 0 14px; line-height: 1.22; }
        .clp2-doc-head p { font-size: 15px; color: var(--muted); line-height: 1.75; }

        .clp2-doc-marquee { min-width: 0; max-width: 100%; overflow: hidden; -webkit-mask-image: linear-gradient(90deg, transparent, #000 4%, #000 96%, transparent); mask-image: linear-gradient(90deg, transparent, #000 4%, #000 96%, transparent); }
        .clp2-doc-track { display: flex; gap: 22px; width: max-content; animation: clp2-scroll 42s linear infinite; }
        .clp2-doc-marquee:hover .clp2-doc-track { animation-play-state: paused; }

        .clp2-doc-card { flex: 0 0 auto; width: 220px; border: 1px solid var(--line); border-radius: 16px; overflow: hidden; background: #fff; }
        .clp2-doc-photo { width: 100%; aspect-ratio: 4 / 5; background: var(--accent-soft); }
        .clp2-doc-photo img { width: 100%; height: 100%; object-fit: cover; display: block; }
        .clp2-doc-avatar {
          width: 100%; height: 100%; display: flex; align-items: center; justify-content: center;
          font-family: 'Fraunces', serif; font-weight: 600; font-size: 34px; color: var(--accent-deep);
          background: var(--accent-soft);
        }
        .clp2-doc-info { padding: 16px 16px 18px; }
        .clp2-doc-name { font-size: 15px; font-weight: 700; color: var(--ink); margin-bottom: 3px; }
        .clp2-doc-role { font-size: 12.5px; color: var(--accent-deep); font-weight: 600; margin-bottom: 3px; }
        .clp2-doc-exp { font-size: 12px; color: var(--muted); }

        /* ── WRITTEN PATIENT REVIEWS ── */
        .clp2-reviews { padding: 10px 0 64px; }
        .clp2-review-head { max-width: 640px; margin: 0 auto 34px; text-align: center; }
        .clp2-review-head .clp2-lead-eyebrow { display: block; text-align: center; }
        .clp2-review-head h2 { font-family: 'Fraunces', serif; font-weight: 500; font-size: clamp(28px, 3.4vw, 38px); color: var(--ink); margin: 8px 0 14px; line-height: 1.22; }
        .clp2-review-head p { font-size: 15px; color: var(--muted); line-height: 1.75; }

        .clp2-review-row { display: grid; grid-template-columns: repeat(3, 1fr); gap: 22px; }
        .clp2-review-card { background: var(--ink); border-radius: 18px; padding: 32px 26px 30px; text-align: center; }
        .clp2-review-avatar-wrap { width: 84px; height: 84px; border-radius: 50%; margin: 0 auto 18px; overflow: hidden; border: 2px solid rgba(255,255,255,0.18); }
        .clp2-review-avatar-img { width: 100%; height: 100%; object-fit: cover; display: block; }
        .clp2-review-avatar-fallback {
          width: 100%; height: 100%; display: flex; align-items: center; justify-content: center;
          font-family: 'Fraunces', serif; font-weight: 600; font-size: 24px; color: #fff;
          background: rgba(255,255,255,0.12);
        }
        .clp2-review-name { font-size: 14px; font-weight: 700; color: rgba(255,255,255,0.9); margin-bottom: 12px; }
        .clp2-review-headline { font-family: 'Fraunces', serif; font-weight: 500; font-size: 17px; color: #8FD8CE; line-height: 1.4; margin-bottom: 14px; }
        .clp2-review-quote { font-size: 13.5px; line-height: 1.75; color: rgba(255,255,255,0.72); }

        /* ── VIDEO TESTIMONIALS ── */
        .clp2-testimonials { padding: 10px 0 64px; }
        .clp2-testi-head { max-width: 640px; margin: 0 auto 34px; text-align: center; }
        .clp2-testi-head .clp2-lead-eyebrow { display: block; text-align: center; }
        .clp2-testi-head h2 { font-family: 'Fraunces', serif; font-weight: 500; font-size: clamp(28px, 3.4vw, 38px); color: var(--ink); margin: 8px 0 14px; line-height: 1.22; }
        .clp2-testi-head p { font-size: 15px; color: var(--muted); line-height: 1.75; }

        .clp2-testi-row { display: flex; gap: 22px; overflow-x: auto; scroll-snap-type: x mandatory; padding-bottom: 8px; scrollbar-width: thin; scrollbar-color: var(--line) transparent; }
        .clp2-testi-row::-webkit-scrollbar { height: 6px; }
        .clp2-testi-row::-webkit-scrollbar-thumb { background: var(--line); border-radius: 999px; }

        .clp2-testi-card { flex: 0 0 auto; width: 320px; scroll-snap-align: start; border: 1px solid var(--line); border-radius: 16px; overflow: hidden; background: #fff; }
        .clp2-testi-video { position: relative; width: 100%; aspect-ratio: 16 / 9; background: #0E2B27; }
        .clp2-testi-video iframe { width: 100%; height: 100%; display: block; border: none; }
        .clp2-testi-info { padding: 14px 16px 16px; }
        .clp2-testi-name { font-size: 14.5px; font-weight: 700; color: var(--ink); margin-bottom: 2px; }
        .clp2-testi-procedure { font-size: 12.5px; color: var(--accent-deep); font-weight: 600; }

        /* ── FAQ ── */
        .clp2-faq { padding: 10px 0 64px; }
        .clp2-faq-head { max-width: 640px; margin: 0 auto 30px; text-align: center; }
        .clp2-faq-head .clp2-lead-eyebrow { display: block; text-align: center; }
        .clp2-faq-head h2 { font-family: 'Fraunces', serif; font-weight: 500; font-size: clamp(28px, 3.4vw, 38px); color: var(--ink); margin: 8px 0 14px; line-height: 1.22; }
        .clp2-faq-head p { font-size: 15px; color: var(--muted); line-height: 1.75; }

        .clp2-faq-list { max-width: 780px; margin: 0 auto; display: flex; flex-direction: column; gap: 12px; }
        .clp2-faq-item { border: 1px solid var(--line); border-radius: 14px; overflow: hidden; background: #fff; }
        .clp2-faq-item.is-open { border-color: var(--accent); }
        .clp2-faq-q {
          width: 100%; display: flex; align-items: center; justify-content: space-between; gap: 16px;
          text-align: left; background: none; border: none; cursor: pointer;
          padding: 18px 20px; font-size: 14.5px; font-weight: 700; color: var(--ink); font-family: 'Manrope', sans-serif;
        }
        .clp2-faq-icon { flex-shrink: 0; width: 26px; height: 26px; border-radius: 50%; background: var(--accent-soft); color: var(--accent-deep); display: flex; align-items: center; justify-content: center; font-size: 16px; font-weight: 700; line-height: 1; }
        .clp2-faq-a { padding: 0 20px 20px; font-size: 13.5px; line-height: 1.75; color: var(--muted); }

        /* ── FINAL CTA ── */
        .clp2-final-cta { padding: 10px 0 64px; }
        .clp2-final-cta-card {
          background: var(--accent-soft); border-radius: 20px; padding: 44px 40px;
          display: flex; align-items: center; justify-content: space-between; gap: 24px; flex-wrap: wrap;
        }
        .clp2-final-cta-text h3 { font-family: 'Fraunces', serif; font-weight: 500; font-size: clamp(22px, 2.6vw, 28px); color: var(--ink); margin-bottom: 8px; }
        .clp2-final-cta-text p { font-size: 14px; color: var(--muted); }
        .clp2-final-cta-btn { flex-shrink: 0; padding: 15px 32px; border: none; border-radius: 10px; background: var(--ink); color: #fff; font-size: 14.5px; font-weight: 700; cursor: pointer; transition: background .2s ease, transform .2s ease; }
        .clp2-final-cta-btn:hover { background: var(--accent-deep); transform: translateY(-1px); }

        /* ── FOOTER ── */
        .clp2-footer-logo { height: 72px; width: auto; display: block; }

        .clp2-footer { position: relative; background: var(--ink); color: rgba(255,255,255,0.88); padding: 72px 0 0; overflow: hidden; margin-top: 8px; }
        .clp2-footer::before {
          content: ''; position: absolute; top: 0; left: 0; right: 0; height: 4px;
          background: linear-gradient(90deg, var(--accent) 0%, #8FD8CE 50%, var(--accent) 100%);
        }
        .clp2-footer-glow {
          position: absolute; width: 460px; height: 460px; border-radius: 50%;
          background: radial-gradient(circle, rgba(14,140,130,0.35) 0%, rgba(14,140,130,0) 70%);
          top: -220px; right: -140px; pointer-events: none;
        }

        .clp2-footer-top { position: relative; z-index: 1; display: grid; grid-template-columns: 1.3fr 1fr 1fr 1fr; gap: 40px; padding-bottom: 48px; }

        .clp2-footer-logo-mark { background: #fff; display: inline-flex; padding: 10px 16px; border-radius: 12px; margin-bottom: 16px; }
        .clp2-footer-about-text { font-size: 13.5px; line-height: 1.75; color: rgba(255,255,255,0.62); max-width: 300px; margin-bottom: 20px; }
        .clp2-footer-social { display: flex; gap: 10px; }
        .clp2-footer-social a {
          width: 38px; height: 38px; border-radius: 50%; border: 1px solid rgba(255,255,255,0.18);
          display: flex; align-items: center; justify-content: center; color: #fff; text-decoration: none;
          transition: background .2s ease, border-color .2s ease, transform .2s ease;
        }
        .clp2-footer-social a:hover { background: var(--accent); border-color: var(--accent); transform: translateY(-2px); }

        .clp2-footer-col-title { font-size: 12px; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; color: #8FD8CE; margin-bottom: 20px; }
        .clp2-footer-col-links { display: flex; flex-direction: column; gap: 13px; }
        .clp2-footer-col-links a, .clp2-footer-col-links button {
          background: none; border: none; padding: 0; text-align: left; cursor: pointer;
          font-size: 13.5px; color: rgba(255,255,255,0.72); text-decoration: none;
          font-family: 'Manrope', sans-serif; transition: color .2s ease, padding-left .2s ease;
        }
        .clp2-footer-col-links a:hover, .clp2-footer-col-links button:hover { color: #fff; padding-left: 4px; }

        .clp2-footer-contact-item { display: flex; gap: 10px; align-items: flex-start; font-size: 13.5px; color: rgba(255,255,255,0.72); margin-bottom: 16px; line-height: 1.6; }
        .clp2-footer-contact-item svg { flex-shrink: 0; margin-top: 2px; color: #8FD8CE; }
        .clp2-footer-contact-item a { color: inherit; text-decoration: none; }
        .clp2-footer-contact-item a:hover { color: #fff; }

        .clp2-footer-bottom {
          position: relative; z-index: 1; border-top: 1px solid rgba(255,255,255,0.12);
          padding: 22px 0; display: flex; justify-content: space-between; align-items: center; gap: 16px; flex-wrap: wrap;
        }
        .clp2-footer-copy { font-size: 12px; color: rgba(255,255,255,0.5); }
        .clp2-footer-bottom-links { display: flex; gap: 20px; }
        .clp2-footer-bottom-links a { font-size: 12px; color: rgba(255,255,255,0.5); text-decoration: none; }
        .clp2-footer-bottom-links a:hover { color: #fff; }

        /* ── FLOATING BUTTONS ── */
        .clp2-float-stack { position: fixed; right: 22px; bottom: 90px; display: flex; flex-direction: column; gap: 14px; z-index: 999; }
        .clp2-float-btn {
          width: 52px; height: 52px; border-radius: 50%; display: flex; align-items: center; justify-content: center;
          color: #fff; text-decoration: none; box-shadow: 0 6px 18px rgba(0,0,0,0.22);
          transition: transform .2s ease, box-shadow .2s ease;
        }
        .clp2-float-btn:hover { transform: translateY(-2px) scale(1.04); box-shadow: 0 8px 22px rgba(0,0,0,0.28); }
        .clp2-float-wa { background: #25D366; }
        .clp2-float-call { background: #0E8C82; }

        /* ── RESPONSIVE ── */
        @media (max-width: 900px) {
          .clp2-hero-grid { grid-template-columns: 1fr; gap: 28px; }
          .clp2-hero-visual { order: -1; height: auto; }
          .clp2-lead { align-self: stretch; }
          .clp2-trust-grid { grid-template-columns: 1fr; gap: 24px; }
          .clp2-about-grid { grid-template-columns: 1fr; }
          .clp2-about-stats { grid-template-columns: repeat(2, 1fr); }
          .clp2-company-card { padding: 40px 26px; }
          .clp2-company-points { grid-template-columns: 1fr; }
          .clp2-review-row { grid-template-columns: 1fr; }
          .clp2-signs-grid { grid-template-columns: 1fr; }
          .clp2-final-cta-card { flex-direction: column; text-align: center; padding: 34px 26px; }
          .clp2-final-cta-btn { width: 100%; }
          .clp2-footer-top { grid-template-columns: 1fr 1fr; gap: 32px; }
        }
        @media (max-width: 560px) {
          .clp2-wrap { padding: 0 20px; }
          .clp2-hero { padding: 32px 0 48px; }
          .clp2-lead { padding: 22px 20px 20px; }
          .clp2-float-stack { right: 14px; bottom: 70px; gap: 10px; }
          .clp2-float-btn { width: 46px; height: 46px; }
          .clp2-trust-copy h3 { font-size: 21px; }
          .clp2-doc-card { width: 170px; }
          .clp2-testi-card { width: 260px; }
          .clp2-company-actions { flex-direction: column; align-items: stretch; }
          .clp2-company-cta { width: 100%; }
          .clp2-faq-q { padding: 15px 16px; font-size: 13.5px; }
          .clp2-footer { padding: 48px 0 0; }
          .clp2-footer-top { grid-template-columns: 1fr; gap: 32px; }
          .clp2-footer-bottom { flex-direction: column; align-items: flex-start; }
        }
      `}</style>

      {/* ── HERO ── */}
      <section className="clp2-hero">
        <div className="clp2-wrap">
          <div className="clp2-hero-grid">

            <div className="clp2-hero-visual">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={heroImage} alt={`Cataract treatment in ${cityData.name} — clear vision, better life`} />
            </div>

            <div className="clp2-lead" id="lead">
              <div className="clp2-lead-eyebrow">Free checkup · {cityData.name}</div>
              <h3>Check your eligibility</h3>
              <p className="clp2-lead-sub">Share your details — our care team calls within 5 minutes.</p>

              {submitted ? (
                <div className="clp2-lead-success">Thanks! Our team will call you shortly.</div>
              ) : (
                <form onSubmit={handleSubmit}>
                  {error && <div className="clp2-lead-error">{error}</div>}
                  <div className="clp2-field">
                    <label htmlFor="clp2-name">Full name</label>
                    <input
                      id="clp2-name"
                      type="text"
                      placeholder="Enter your name"
                      autoComplete="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      disabled={loading}
                    />
                  </div>
                  <div className="clp2-field">
                    <label htmlFor="clp2-phone">Mobile number</label>
                    <div className="clp2-phone-field">
                      <span className="prefix">+91</span>
                      <input
                        id="clp2-phone"
                        type="tel"
                        placeholder="10-digit number"
                        maxLength={10}
                        value={phone}
                        onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                        disabled={loading}
                      />
                    </div>
                  </div>
                  <button className="clp2-lead-submit" type="submit" disabled={loading}>
                    {loading ? 'Checking...' : 'Check my eligibility'}
                  </button>
                </form>
              )}

              <div className="clp2-lead-trust">
                <span>Free</span>
                <span>No obligation</span>
                <span>Confidential</span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── TRUST / INSURANCE ── */}
      <section className="clp2-trust">
        <div className="clp2-wrap">
          <div className="clp2-trust-grid">
            <div className="clp2-trust-visual">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={INSURANCE_IMAGE} alt="HealviaCare cashless insurance partners" />
            </div>

            <div className="clp2-trust-copy">
              <div className="clp2-lead-eyebrow">Cashless Insurance</div>
              <h3>All these insurers are accepted at HealviaCare</h3>
              <p className="clp2-trust-sub">
                We work with 20+ leading insurance partners for cashless treatment, plus many more
                general and health insurers accepted on reimbursement:
              </p>
              <div className="clp2-marquee">
                <div className="clp2-marquee-track">
                  {[...INSURANCE_NAMES, ...INSURANCE_NAMES].map((name, i) => (
                    <span className="clp2-pill" key={`${name}-${i}`}>{name}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="clp2-marquee clp2-marquee-reverse clp2-badges-strip">
            <div className="clp2-marquee-track">
              {[...TRUST_BADGES, ...TRUST_BADGES].map((badge, i) => (
                <span className="clp2-badge-pill" key={`${badge}-${i}`}>
                  <span className="dot" />
                  {badge}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── ABOUT US ── */}
      <section className="clp2-company">
        <div className="clp2-wrap">
          <div className="clp2-company-card">
            <div className="clp2-company-glow" aria-hidden="true" />
            <div className="clp2-company-glow-2" aria-hidden="true" />
            <div className="clp2-company-inner">
              <div className="clp2-company-eyebrow">Who We Are</div>
              <h2 className="clp2-company-headline">
                Cloudy vision fixed. <em>Life back in focus.</em> That&apos;s HealviaCare.
              </h2>
              <p className="clp2-company-sub">
                We&apos;re a network of NABH-accredited eye hospitals built around one simple goal —
                give you clear, natural vision without the wait, the confusion, or the worry. Real
                surgeons, honest advice, and a team that treats every question like it matters.
                Because it does.
              </p>

              <div className="clp2-company-points">
                <div className="clp2-company-point">
                  <span className="num">01</span>
                  <span className="txt">Every patient gets a free, unhurried eye checkup before any decision is made.</span>
                </div>
                <div className="clp2-company-point">
                  <span className="num">02</span>
                  <span className="txt">Surgeries by senior doctors using blade-free phacoemulsification — nothing outsourced.</span>
                </div>
                <div className="clp2-company-point">
                  <span className="num">03</span>
                  <span className="txt">Cashless insurance, simple paperwork, and support that stays with you after surgery too.</span>
                </div>
              </div>

              <div className="clp2-company-actions">
                <button
                  type="button"
                  className="clp2-company-cta"
                  onClick={() => document.getElementById('lead')?.scrollIntoView({ behavior: 'smooth', block: 'center' })}
                >
                  Talk to Our Expert
                </button>
                <span className="clp2-company-note">Free · 5-minute call · No obligation</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── ABOUT THE PROCEDURE ── */}
      <section className="clp2-about">
        <div className="clp2-wrap">
          <div className="clp2-about-head">
            <span className="clp2-lead-eyebrow">The Procedure</span>
            <h2>Cloudy Lens Out. Clear Vision In.</h2>
            <p>
              Inside your eye is a natural lens — normally clear, like glass. As you get older, it
              can slowly turn cloudy, making everything look blurry or faded. That cloudy lens is
              called a cataract. The fix is simple: a surgeon gently removes it and places a clear
              artificial lens in its spot, all in about 15-30 minutes.
            </p>
          </div>

          <div className="clp2-about-grid">
            <div className="clp2-about-img">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={ABOUT_IMAGES.consult} alt="Eye specialist examining a patient before cataract surgery" />
            </div>
            <div className="clp2-about-img">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={ABOUT_IMAGES.procedure} alt="Patient undergoing blade-free cataract surgery" />
            </div>
          </div>

          <div className="clp2-about-fact">
            <span className="spark">✦</span>
            <span>
              Did you know? Cataract surgery is one of the most commonly performed surgeries in the
              world — and one of the safest, even for patients in their 80s.
            </span>
          </div>

          <div className="clp2-about-stats">
            {CATARACT_STATS.map((stat) => (
              <div className="clp2-about-stat" key={stat.label}>
                <span className="value">{stat.value}</span>
                <span className="label">{stat.label}</span>
              </div>
            ))}
          </div>

          <div className="clp2-about-cta">
            <button
              type="button"
              onClick={() => document.getElementById('lead')?.scrollIntoView({ behavior: 'smooth', block: 'center' })}
            >
              Book Free Checkup
            </button>
          </div>
        </div>
      </section>

      {/* ── BEFORE / AFTER ── */}
      <section className="clp2-experience">
        <div className="clp2-wrap">
          <div className="clp2-exp-head">
            <span className="clp2-lead-eyebrow">Experience Clear Vision</span>
            <h2>See The World With HealviaCare Clarity</h2>
            <p>
              Before cataract surgery, life is blurry street signs, faded colours, and glare from
              every headlight at night. After surgery, it&apos;s waking up and simply seeing —
              faces, newspapers, the road ahead, all sharp again.
            </p>
          </div>

          <div className="clp2-exp-visual">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={EXPERIENCE_IMAGE} alt="HealviaCare cataract surgery — before and after clarity" />
          </div>

          <div className="clp2-exp-cta">
            <button
              type="button"
              onClick={() => document.getElementById('lead')?.scrollIntoView({ behavior: 'smooth', block: 'center' })}
            >
              Book Now
            </button>
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="clp2-process">
        <div className="clp2-wrap">
          <div className="clp2-process-head">
            <span className="clp2-lead-eyebrow">The Process</span>
            <p>
              At HealviaCare, every patient follows this same simple path — a thorough eye checkup
              to confirm the cataract, a quick 15-30 minute blade-free procedure, and a guided
              recovery with follow-ups until your vision fully settles. Nothing skipped, nothing
              rushed.
            </p>
          </div>

          <div className="clp2-process-visual">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={PROCESS_IMAGE} alt="How cataract surgery works: checkup, procedure, and recovery" />
          </div>

          <div className="clp2-process-cta">
            <button
              type="button"
              onClick={() => document.getElementById('lead')?.scrollIntoView({ behavior: 'smooth', block: 'center' })}
            >
              Book Free Checkup
            </button>
          </div>
        </div>
      </section>

      {/* ── SIGNS OF CATARACT ── */}
      <section className="clp2-signs">
        <div className="clp2-wrap">
          <div className="clp2-signs-head">
            <span className="clp2-lead-eyebrow">Know The Signs</span>
            <h2>Signs You May Have a Cataract</h2>
            <p>These are the most common warning signs. If you or a family member has any of these, a free eye checkup can confirm it quickly.</p>
          </div>

          <div className="clp2-signs-grid">
            <div className="clp2-signs-card early">
              <h3>Common Early Signs</h3>
              <ul className="clp2-signs-list">
                {EARLY_SIGNS.map((sign) => (
                  <li key={sign}>{sign}</li>
                ))}
              </ul>
            </div>
            <div className="clp2-signs-card late">
              <h3>Signs It Has Progressed</h3>
              <ul className="clp2-signs-list">
                {PROGRESSED_SIGNS.map((sign) => (
                  <li key={sign}>{sign}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className="clp2-signs-cta">
            <button
              type="button"
              onClick={() => document.getElementById('lead')?.scrollIntoView({ behavior: 'smooth', block: 'center' })}
            >
              Book Now — Free Checkup
            </button>
          </div>
        </div>
      </section>

      {/* ── DOCTORS ── */}
      <section className="clp2-doctors">
        <div className="clp2-wrap">
          <div className="clp2-doc-head">
            <span className="clp2-lead-eyebrow">Meet Our Experts</span>
            <h2>Surgeons You Can Trust</h2>
            <p>
              A team of experienced, board-certified ophthalmologists and cataract surgeons — each
              one has guided hundreds of patients back to clear vision.
            </p>
          </div>

          <div className="clp2-doc-marquee">
            <div className="clp2-doc-track">
              {[...DOCTORS, ...DOCTORS].map((doctor, i) => (
                <DoctorCard doctor={doctor} key={`${doctor.name}-${i}`} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── WRITTEN PATIENT REVIEWS ── */}
      <section className="clp2-reviews">
        <div className="clp2-wrap">
          <div className="clp2-review-head">
            <span className="clp2-lead-eyebrow">Patient Reviews</span>
            <h2>What Our Patients Have to Say</h2>
            <p>A few words from people who trusted us with their vision.</p>
          </div>

          <div className="clp2-review-row">
            {REVIEWS.map((review, i) => (
              <ReviewCard review={review} key={`${review.name}-${i}`} />
            ))}
          </div>
        </div>
      </section>

      {/* ── VIDEO TESTIMONIALS ── */}
      <section className="clp2-testimonials">
        <div className="clp2-wrap">
          <div className="clp2-testi-head">
            <span className="clp2-lead-eyebrow">Real Stories</span>
            <h2>See What Our Happy Patients Are Saying</h2>
            <p>Hear it straight from the people who made the switch — in their own words.</p>
          </div>

          <div className="clp2-testi-row">
            {TESTIMONIALS.map((testimonial, i) => (
              <div className="clp2-testi-card" key={`${testimonial.youtubeId}-${i}`}>
                <div className="clp2-testi-video">
                  <iframe
                    src={`https://www.youtube.com/embed/${testimonial.youtubeId}`}
                    title={`${testimonial.name} — ${testimonial.procedure} patient story`}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    loading="lazy"
                  />
                </div>
                <div className="clp2-testi-info">
                  <div className="clp2-testi-name">{testimonial.name}</div>
                  <div className="clp2-testi-procedure">{testimonial.procedure}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="clp2-faq">
        <div className="clp2-wrap">
          <div className="clp2-faq-head">
            <span className="clp2-lead-eyebrow">Questions & Answers</span>
            <h2>Frequently Asked Questions</h2>
            <p>Everything patients usually ask before booking a cataract checkup.</p>
          </div>

          <div className="clp2-faq-list">
            {faqs.map((faq, i) => (
              <FaqItem q={faq.q} a={faq.a} key={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section className="clp2-final-cta">
        <div className="clp2-wrap">
          <div className="clp2-final-cta-card">
            <div className="clp2-final-cta-text">
              <h3>Still have questions?</h3>
              <p>Talk to our expert for a free, no-obligation cataract checkup in {cityData.name}.</p>
            </div>
            <button
              type="button"
              className="clp2-final-cta-btn"
              onClick={() => document.getElementById('lead')?.scrollIntoView({ behavior: 'smooth', block: 'center' })}
            >
              Talk to Our Expert
            </button>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="clp2-footer">
        <div className="clp2-footer-glow" aria-hidden="true" />
        <div className="clp2-wrap">
          <div className="clp2-footer-top">

            <div>
              <div className="clp2-footer-logo-mark">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/vv.png" alt="HealviaCare logo" className="clp2-footer-logo" />
              </div>
              <p className="clp2-footer-about-text">
                A network of NABH-accredited eye hospitals focused on one thing — clear, natural
                vision without the wait, the confusion, or the worry.
              </p>
              <div className="clp2-footer-social">
                <a href={WA_URL} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
                  <WaIcon size={16} />
                </a>
                <a href={TEL_URL} aria-label="Call">
                  <PhoneIcon size={15} />
                </a>
              </div>
            </div>

            <div>
              <div className="clp2-footer-col-title">Explore</div>
              <div className="clp2-footer-col-links">
                <button type="button" onClick={() => document.querySelector('.clp2-company')?.scrollIntoView({ behavior: 'smooth' })}>About Us</button>
                <button type="button" onClick={() => document.querySelector('.clp2-doctors')?.scrollIntoView({ behavior: 'smooth' })}>Meet Our Doctors</button>
                <button type="button" onClick={() => document.querySelector('.clp2-reviews')?.scrollIntoView({ behavior: 'smooth' })}>Patient Reviews</button>
                <button type="button" onClick={() => document.querySelector('.clp2-faq')?.scrollIntoView({ behavior: 'smooth' })}>FAQs</button>
              </div>
            </div>

            <div>
              <div className="clp2-footer-col-title">Care</div>
              <div className="clp2-footer-col-links">
                <button type="button" onClick={() => document.querySelector('.clp2-signs')?.scrollIntoView({ behavior: 'smooth' })}>Signs of Cataract</button>
                <button type="button" onClick={() => document.querySelector('.clp2-trust')?.scrollIntoView({ behavior: 'smooth' })}>Insurance Partners</button>
                <button type="button" onClick={() => document.getElementById('lead')?.scrollIntoView({ behavior: 'smooth', block: 'center' })}>Free Checkup</button>
                <button type="button" onClick={() => document.getElementById('lead')?.scrollIntoView({ behavior: 'smooth', block: 'center' })}>Book Consultation</button>
              </div>
            </div>

            <div>
              <div className="clp2-footer-col-title">Get In Touch</div>
              <div className="clp2-footer-contact-item">
                <PhoneIcon size={15} />
                <a href={TEL_URL}>+91 93109 84753</a>
              </div>
              <div className="clp2-footer-contact-item">
                <WaIcon size={15} />
                <a href={WA_URL} target="_blank" rel="noopener noreferrer">Chat with us on WhatsApp</a>
              </div>
              <div className="clp2-footer-contact-item">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ marginTop: 2 }}>
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                <span>Serving {cityData.name} & nearby areas</span>
              </div>
            </div>

          </div>

          <div className="clp2-footer-bottom">
            <div className="clp2-footer-copy" suppressHydrationWarning>
              © {new Date().getFullYear()} HealviaCare. All rights reserved.
            </div>
            <div className="clp2-footer-bottom-links">
              <a href="#lead" onClick={(e) => { e.preventDefault(); document.getElementById('lead')?.scrollIntoView({ behavior: 'smooth', block: 'center' }); }}>
                Book Free Checkup
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* Fixed WhatsApp + Call buttons, visible throughout the page */}
      <div className="clp2-float-stack">
        <a
          href={WA_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="clp2-float-btn clp2-float-wa"
          aria-label="Chat on WhatsApp"
        >
          <WaIcon size={26} />
        </a>
        <a href={TEL_URL} className="clp2-float-btn clp2-float-call" aria-label="Call us">
          <PhoneIcon size={22} />
        </a>
      </div>
    </div>
  );
}