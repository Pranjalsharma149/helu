'use client';

import { useState } from 'react';
import { CITY_DATA, type CityKey } from '@/lib/lasik-city-data';

const WA_NUMBER = '919310984753';
const WA_MSG = encodeURIComponent("Hi, I'd like to book a free LASIK screening");
const WA_URL = `https://wa.me/${WA_NUMBER}?text=${WA_MSG}`;
const TEL_URL = `tel:+${WA_NUMBER}`;

// Drop each city's hero photo into /public with these filenames.
const HERO_IMAGES: Record<CityKey, string> = {
  mumbai: '/l-mumbai.png',
  delhi: '/l-delhi.png',
  gurugram: '/l-gurugram.png',
  noida: '/l-noida.png',
  ghaziabad: '/l-ghaziabad.png',
  faridabad: '/l-faridabad.png',
  pune: '/l-pune.png',
};

// Drop the composite insurance-partner graphic into /public with this filename.
const INSURANCE_IMAGE = '/insurance.png';

// We don't have individual logos for every insurer, so the rest are shown
// as a scrolling name strip next to the logo graphic.
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
  '1000+ Successful Surgeries',
  '500+ Trusted Doctors',
  '0% EMI Available',
  '4.8/5 Patient Rating',
  'Cashless Treatment',
  'Hassle-free Documentation',
  '20+ Insurance Partners',
];

// Drop these two procedure photos into /public with these filenames.
const ABOUT_IMAGES = {
  consult: '/lasik-1.png',
  procedure: '/lasik-2.png',
};

// Drop the before/after composite graphic into /public with this filename —
// it's a single image with "Before/After LASIK" already baked into it.
const EXPERIENCE_IMAGE = '/b-a.png';

// Drop the 3-step "How Does LASIK Work?" composite graphic into /public
// with this filename — the steps, icons, and captions are baked into it.
const PROCESS_IMAGE = '/lasik-work.png';

// Drop the "Types of LASIK" composite graphic into /public with this
// filename — the icons, names, and descriptions are baked into it.
const TYPES_IMAGE = '/eye-type.png';

// Drop each specialist's headshot into /public with these filenames.
// If a photo is missing, the card falls back to a plain initials avatar
// automatically, so this won't ever show a broken-image icon.
const DOCTORS = [
  { name: 'Dr. Ananya Sharma', role: 'Lead LASIK Surgeon', exp: '15+ yrs experience', photo: '/doctor-1.png' },
  { name: 'Dr. Rohan Mehta', role: 'Senior Ophthalmologist', exp: '12+ yrs experience', photo: '/doctor-2.png' },
  { name: 'Dr. Kavita Nair', role: 'Cataract & LASIK Specialist', exp: '10+ yrs experience', photo: '/doctor-3.png' },
  { name: 'Dr. Arjun Verma', role: 'Refractive Surgery Expert', exp: '14+ yrs experience', photo: '/doctor-4.png' },
  { name: 'Dr. Priya Iyer', role: 'Corneal Specialist', exp: '9+ yrs experience', photo: '/doctor-5.png' },
  { name: 'Dr. Sameer Khan', role: 'LASIK & SMILE Surgeon', exp: '11+ yrs experience', photo: '/doctor-6.png' },
];

// PLACEHOLDER reviews — swap in your real patients' names, photos, and
// actual quotes once you have them. Photos are optional (falls back to an
// initials avatar, same as the doctor cards).
const REVIEWS = [
  {
    name: 'Patient Name',
    photo: '/review-1.png',
    headline: 'Glasses-free after years of depending on them',
    quote: "I was nervous before the surgery, but the team explained every step and made sure I was comfortable. The procedure was quick, and I could see clearly the very next day. Best decision I've made for myself.",
  },
  {
    name: 'Patient Name',
    photo: '/review-2.png',
    headline: 'Painless procedure, honest advice throughout',
    quote: "What stood out was how upfront the doctors were about what to expect. No pressure, no rush — just clear answers to every question I had. My vision has been sharp ever since.",
  },
  {
    name: 'Patient Name',
    photo: '/review-3.png',
    headline: 'Back to work the very next day',
    quote: "I was worried about downtime, but I was back to my normal routine within 24 hours. The follow-up care gave me a lot of confidence that everything was healing the right way.",
  },
];

// PLACEHOLDER video testimonials — swap in your real YouTube video IDs and
// details once you have them. The ID is the part after "v=" in a YouTube
// URL (e.g. youtube.com/watch?v=KH34CgQXBP8 → 'KH34CgQXBP8').
const TESTIMONIALS = [
  { youtubeId: 'dQw4w9WgXcQ', name: 'Tanvi Makharia', procedure: 'Femto LASIK' },
  { youtubeId: 'dQw4w9WgXcQ', name: 'Rahul Kapoor', procedure: 'Contoura Vision' },
  { youtubeId: 'dQw4w9WgXcQ', name: 'Sneha Reddy', procedure: 'SMILE LASIK' },
  { youtubeId: 'dQw4w9WgXcQ', name: 'Arjun Malhotra', procedure: 'Standard LASIK' },
];

const LASIK_STATS = [
  { value: '15 min', label: 'Procedure duration' },
  { value: '99.9%', label: 'Precision accuracy' },
  { value: 'Blade-Free', label: 'All-laser technology' },
  { value: '24 hrs', label: 'Back to daily routine' },
];

// Rejects anything that isn't a real, plausible Indian mobile number —
// wrong length, wrong starting digit, all-same-digit, or straight
// sequences — so junk/fake leads don't reach the sales team.
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

// Original WhatsApp glyph
const WaIcon = ({ size = 26 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
    <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.553 4.118 1.527 5.846L0 24l6.335-1.502A11.955 11.955 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 01-5.006-1.375l-.36-.213-3.73.885.927-3.636-.233-.374A9.816 9.816 0 012.182 12C2.182 6.578 6.578 2.182 12 2.182S21.818 6.578 21.818 12 17.422 21.818 12 21.818z" />
  </svg>
);

// Original filled phone-call glyph
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
    <div className="llp-doc-card">
      <div className="llp-doc-photo">
        {!imgFailed ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={doctor.photo}
            alt={doctor.name}
            onError={() => setImgFailed(true)}
          />
        ) : (
          <div className="llp-doc-avatar" aria-hidden="true">
            {getInitials(doctor.name)}
          </div>
        )}
      </div>
      <div className="llp-doc-info">
        <div className="llp-doc-name">{doctor.name}</div>
        <div className="llp-doc-role">{doctor.role}</div>
        <div className="llp-doc-exp">{doctor.exp}</div>
      </div>
    </div>
  );
}

// Review card: shows the patient photo if it loads, otherwise falls back
// to a plain initials avatar.
function ReviewCard({ review }: { review: (typeof REVIEWS)[number] }) {
  const [imgFailed, setImgFailed] = useState(false);

  return (
    <div className="llp-review-card">
      <div className="llp-review-avatar-wrap">
        {!imgFailed ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={review.photo}
            alt={review.name}
            className="llp-review-avatar-img"
            onError={() => setImgFailed(true)}
          />
        ) : (
          <div className="llp-review-avatar-fallback" aria-hidden="true">
            {getInitials(review.name)}
          </div>
        )}
      </div>
      <div className="llp-review-name">{review.name}</div>
      <div className="llp-review-headline">{review.headline}</div>
      <p className="llp-review-quote">&ldquo;{review.quote}&rdquo;</p>
    </div>
  );
}

// FAQ content — mostly evergreen, but the first question references the
// current city so it feels tailored to the page.
function getFaqs(cityName: string) {
  return [
    {
      q: `Is LASIK available near me in ${cityName}?`,
      a: `Yes — we have partner centres in ${cityName} with the full range of laser technology. Book a free screening and our team will confirm the nearest location and a slot that works for you.`,
    },
    {
      q: 'Is LASIK painful?',
      a: 'No. Numbing eye drops are used before the procedure, so most patients feel little to no pain — just mild pressure for a few seconds. Any discomfort afterward is usually minor and settles within a day.',
    },
    {
      q: 'How long does the procedure take?',
      a: 'The actual laser treatment takes about 10-15 minutes for both eyes. Including prep and post-procedure checks, plan for about an hour at the centre.',
    },
    {
      q: 'How soon can I go back to work?',
      a: 'Most patients resume normal activities, including screen work, within 24 hours. Your doctor will give you specific guidance based on your recovery.',
    },
    {
      q: 'Am I a good candidate for LASIK?',
      a: "It depends on factors like your prescription, corneal thickness, and eye health. The free screening includes a detailed eye exam to confirm whether LASIK — or an alternative like SMILE or Contoura Vision — is right for you.",
    },
    {
      q: 'Does insurance cover LASIK?',
      a: 'Many of our insurance partners offer cashless coverage for LASIK depending on your policy. Our team can check your eligibility and handle the paperwork for you.',
    },
    {
      q: 'Are the results permanent?',
      a: "LASIK permanently reshapes the cornea, so results are long-lasting for most patients. Natural age-related vision changes (like needing reading glasses later in life) can still occur, same as anyone else.",
    },
  ];
}

// Single accordion row: click the question to expand/collapse the answer.
function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div className={`llp-faq-item${open ? ' is-open' : ''}`}>
      <button
        type="button"
        className="llp-faq-q"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
      >
        <span>{q}</span>
        <span className="llp-faq-icon" aria-hidden="true">{open ? '−' : '+'}</span>
      </button>
      {open && <p className="llp-faq-a">{a}</p>}
    </div>
  );
}

interface LasikLandingPageProps {
  cityKey: CityKey;
}

export default function LasikLandingPage({ cityKey }: LasikLandingPageProps) {
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
    <div className="llp">
      <style>{`
        .llp *, .llp *::before, .llp *::after { box-sizing: border-box; margin: 0; padding: 0; }
        .llp {
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
        .llp-wrap { max-width: 1280px; margin: 0 auto; padding: 0 32px; }

        .llp-hero { padding: 56px 0 72px; }

        .llp-hero-grid { display: grid; grid-template-columns: 1.05fr 0.95fr; gap: 40px; align-items: stretch; }

        .llp-hero-visual { border-radius: 16px; overflow: hidden; border: 1px solid var(--line); height: 100%; min-width: 0; }
        .llp-hero-visual img { width: 100%; height: 100%; object-fit: cover; display: block; }

        .llp-lead {
          background: #fff; border: 1px solid var(--line); border-radius: 16px;
          padding: 30px 30px 26px; align-self: center; min-width: 0;
        }
        .llp-lead-eyebrow { font-size: 11px; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; color: var(--accent-deep); margin-bottom: 8px; }
        .llp-lead h3 { font-family: 'Fraunces', serif; font-weight: 500; font-size: 22px; color: var(--ink); margin-bottom: 4px; }
        .llp-lead-sub { font-size: 13.5px; color: var(--muted); margin-bottom: 22px; line-height: 1.6; }

        .llp-field { margin-bottom: 16px; }
        .llp-field label { display: block; font-size: 11px; font-weight: 700; color: var(--muted); text-transform: uppercase; letter-spacing: 0.06em; margin-bottom: 7px; }
        .llp-field input { width: 100%; border: none; border-bottom: 1.5px solid var(--line); padding: 7px 2px 9px; font-size: 15px; font-family: 'Manrope', sans-serif; color: var(--ink); background: transparent; outline: none; transition: border-color .2s ease; }
        .llp-field input::placeholder { color: #B7C2BF; }
        .llp-field input:focus { border-color: var(--accent); }

        .llp-phone-field { display: flex; align-items: flex-end; gap: 8px; border-bottom: 1.5px solid var(--line); transition: border-color .2s ease; }
        .llp-phone-field:focus-within { border-color: var(--accent); }
        .llp-phone-field .prefix { font-size: 15px; color: var(--muted); font-weight: 600; padding-bottom: 9px; }
        .llp-phone-field input { border-bottom: none; flex: 1; }

        .llp-lead-error { background: #FDECEC; color: #A32D2D; font-size: 12.5px; font-weight: 600; padding: 9px 12px; border-radius: 8px; margin-bottom: 14px; }
        .llp-lead-success { background: var(--accent-soft); color: var(--accent-deep); font-size: 13.5px; font-weight: 600; padding: 14px 16px; border-radius: 10px; text-align: center; }

        .llp-lead-submit { width: 100%; padding: 13px; border: none; border-radius: 10px; background: var(--ink); color: #fff; font-size: 14px; font-weight: 700; cursor: pointer; margin-top: 4px; transition: background .2s ease, transform .2s ease; }
        .llp-lead-submit:hover:not(:disabled) { background: var(--accent-deep); transform: translateY(-1px); }
        .llp-lead-submit:disabled { opacity: 0.65; cursor: not-allowed; }

        .llp-lead-trust { display: flex; justify-content: space-between; margin-top: 16px; padding-top: 14px; border-top: 1px solid var(--line); }
        .llp-lead-trust span { font-size: 10.5px; color: var(--muted); font-weight: 600; }

        .llp-trust { padding: 8px 0 60px; overflow-x: hidden; }
        .llp-trust-grid { display: grid; grid-template-columns: 0.85fr 1.15fr; gap: 40px; align-items: center; margin-bottom: 34px; }
        .llp-trust-visual { border-radius: 16px; overflow: hidden; border: 1px solid var(--line); min-width: 0; }
        .llp-trust-visual img { width: 100%; display: block; }
        .llp-trust-copy { min-width: 0; }
        .llp-trust-copy h3 { font-family: 'Fraunces', serif; font-weight: 500; font-size: 25px; color: var(--ink); margin: 6px 0 10px; line-height: 1.28; }
        .llp-trust-sub { font-size: 14px; color: var(--muted); margin-bottom: 18px; line-height: 1.6; }

        .llp-marquee { min-width: 0; max-width: 100%; overflow: hidden; -webkit-mask-image: linear-gradient(90deg, transparent, #000 6%, #000 94%, transparent); mask-image: linear-gradient(90deg, transparent, #000 6%, #000 94%, transparent); }
        .llp-marquee-track { display: flex; gap: 12px; width: max-content; animation: llp-scroll 36s linear infinite; }
        .llp-marquee:hover .llp-marquee-track { animation-play-state: paused; }
        .llp-marquee-reverse .llp-marquee-track { animation-direction: reverse; animation-duration: 26s; }
        @keyframes llp-scroll { from { transform: translateX(0); } to { transform: translateX(-50%); } }

        .llp-pill { flex: 0 0 auto; padding: 9px 18px; border: 1px solid var(--line); border-radius: 999px; font-size: 13px; font-weight: 600; color: var(--ink); background: #fff; white-space: nowrap; }

        .llp-badges-strip { border-top: 1px solid var(--line); border-bottom: 1px solid var(--line); padding: 18px 0; }
        .llp-badge-pill { flex: 0 0 auto; display: flex; align-items: center; gap: 8px; padding: 9px 20px; font-size: 13.5px; font-weight: 700; color: var(--accent-deep); white-space: nowrap; }
        .llp-badge-pill .dot { width: 7px; height: 7px; border-radius: 50%; background: var(--accent-deep); flex-shrink: 0; }

        .llp-types { padding: 10px 0 64px; }
        .llp-types-visual { border-radius: 16px; overflow: hidden; border: 1px solid var(--line); margin-bottom: 30px; }
        .llp-types-visual img { width: 100%; height: auto; display: block; }
        .llp-types-cta { text-align: center; }
        .llp-types-cta button { padding: 15px 32px; border: none; border-radius: 10px; background: var(--ink); color: #fff; font-size: 14.5px; font-weight: 700; cursor: pointer; transition: background .2s ease, transform .2s ease; }
        .llp-types-cta button:hover { background: var(--accent-deep); transform: translateY(-1px); }

        .llp-process { padding: 10px 0 64px; }
        .llp-process-head { max-width: 640px; margin: 0 auto 30px; text-align: center; }
        .llp-process-head .llp-lead-eyebrow { display: block; text-align: center; }
        .llp-process-head p { font-size: 15px; color: var(--muted); line-height: 1.75; margin-top: 10px; }
        .llp-process-visual { border-radius: 16px; overflow: hidden; border: 1px solid var(--line); background: #F4F7F6; margin-bottom: 30px; }
        .llp-process-visual img { width: 100%; height: auto; display: block; }
        .llp-process-cta { text-align: center; }
        .llp-process-cta button { padding: 15px 32px; border: none; border-radius: 10px; background: var(--ink); color: #fff; font-size: 14.5px; font-weight: 700; cursor: pointer; transition: background .2s ease, transform .2s ease; }
        .llp-process-cta button:hover { background: var(--accent-deep); transform: translateY(-1px); }

        .llp-experience { padding: 10px 0 64px; }
        .llp-exp-head { max-width: 640px; margin: 0 auto 34px; text-align: center; }
        .llp-exp-head .llp-lead-eyebrow { display: block; text-align: center; }
        .llp-exp-head h2 { font-family: 'Fraunces', serif; font-weight: 500; font-size: clamp(28px, 3.4vw, 38px); color: var(--ink); margin: 8px 0 14px; line-height: 1.22; }
        .llp-exp-head p { font-size: 15px; color: var(--muted); line-height: 1.75; }

        .llp-exp-visual { border-radius: 16px; overflow: hidden; border: 1px solid var(--line); background: #F4F7F6; margin-bottom: 34px; }
        .llp-exp-visual img { width: 100%; height: auto; display: block; }

        .llp-exp-cta { text-align: center; }
        .llp-exp-cta button { padding: 15px 32px; border: none; border-radius: 10px; background: var(--ink); color: #fff; font-size: 14.5px; font-weight: 700; cursor: pointer; transition: background .2s ease, transform .2s ease; }
        .llp-exp-cta button:hover { background: var(--accent-deep); transform: translateY(-1px); }

        .llp-about { padding: 10px 0 64px; }
        .llp-about-head { max-width: 640px; margin: 0 auto 34px; text-align: center; }
        .llp-about-head .llp-lead-eyebrow { display: block; text-align: center; }
        .llp-about-head h2 { font-family: 'Fraunces', serif; font-weight: 500; font-size: clamp(28px, 3.4vw, 38px); color: var(--ink); margin: 8px 0 14px; line-height: 1.22; }
        .llp-about-head p { font-size: 15px; color: var(--muted); line-height: 1.75; }

        .llp-about-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; margin-bottom: 28px; }
        .llp-about-img { border-radius: 16px; overflow: hidden; border: 1px solid var(--line); aspect-ratio: 4 / 3; min-width: 0; }
        .llp-about-img img { width: 100%; height: 100%; object-fit: cover; display: block; }

        .llp-about-fact { background: var(--accent-soft); border-radius: 14px; padding: 18px 22px; margin-bottom: 32px; font-size: 14px; color: var(--accent-deep); font-weight: 600; line-height: 1.65; display: flex; gap: 12px; align-items: flex-start; }
        .llp-about-fact .spark { flex-shrink: 0; font-size: 18px; line-height: 1; }

        .llp-about-stats { display: grid; grid-template-columns: repeat(4, 1fr); gap: 18px; margin-bottom: 34px; }
        .llp-about-stat { text-align: center; padding: 22px 12px; border: 1px solid var(--line); border-radius: 14px; }
        .llp-about-stat .value { font-family: 'Fraunces', serif; font-weight: 600; font-size: 25px; color: var(--accent-deep); display: block; }
        .llp-about-stat .label { font-size: 11.5px; color: var(--muted); font-weight: 600; margin-top: 6px; display: block; }

        .llp-about-cta { text-align: center; }
        .llp-about-cta button { padding: 15px 32px; border: none; border-radius: 10px; background: var(--ink); color: #fff; font-size: 14.5px; font-weight: 700; cursor: pointer; transition: background .2s ease, transform .2s ease; }
        .llp-about-cta button:hover { background: var(--accent-deep); transform: translateY(-1px); }

        .llp-company { padding: 10px 0 64px; overflow: hidden; position: relative; }
        .llp-company-card {
          background: var(--ink); border-radius: 24px; padding: 56px 48px;
          position: relative; overflow: hidden; color: #fff;
        }
        .llp-company-glow {
          position: absolute; width: 420px; height: 420px; border-radius: 50%;
          background: radial-gradient(circle, rgba(14,140,130,0.55) 0%, rgba(14,140,130,0) 70%);
          top: -160px; right: -120px; pointer-events: none;
        }
        .llp-company-glow-2 {
          position: absolute; width: 320px; height: 320px; border-radius: 50%;
          background: radial-gradient(circle, rgba(234,246,243,0.10) 0%, rgba(234,246,243,0) 70%);
          bottom: -140px; left: -80px; pointer-events: none;
        }
        .llp-company-inner { position: relative; z-index: 1; }
        .llp-company-eyebrow { font-size: 11px; font-weight: 700; letter-spacing: 0.14em; text-transform: uppercase; color: #8FD8CE; margin-bottom: 16px; }
        .llp-company-headline {
          font-family: 'Fraunces', serif; font-weight: 500; font-size: clamp(26px, 3.6vw, 42px);
          line-height: 1.28; max-width: 780px; margin-bottom: 22px;
        }
        .llp-company-headline em { font-style: italic; color: #8FD8CE; }
        .llp-company-sub { font-size: 15.5px; line-height: 1.8; color: rgba(255,255,255,0.78); max-width: 620px; margin-bottom: 36px; }

        .llp-company-points { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; margin-bottom: 40px; }
        .llp-company-point { border: 1px solid rgba(255,255,255,0.14); border-radius: 14px; padding: 20px 20px 22px; background: rgba(255,255,255,0.04); }
        .llp-company-point .num { font-family: 'Fraunces', serif; font-size: 22px; color: #8FD8CE; display: block; margin-bottom: 8px; }
        .llp-company-point .txt { font-size: 13.5px; line-height: 1.6; color: rgba(255,255,255,0.82); }

        .llp-company-actions { display: flex; align-items: center; gap: 20px; flex-wrap: wrap; }
        .llp-company-cta {
          padding: 15px 30px; border: none; border-radius: 10px; background: #fff; color: var(--ink);
          font-size: 14.5px; font-weight: 700; cursor: pointer; transition: transform .2s ease, background .2s ease;
        }
        .llp-company-cta:hover { background: #8FD8CE; transform: translateY(-1px); }
        .llp-company-note { font-size: 12.5px; color: rgba(255,255,255,0.6); }

        .llp-doctors { padding: 10px 0 64px; overflow-x: hidden; }
        .llp-doc-head { max-width: 640px; margin: 0 auto 34px; text-align: center; }
        .llp-doc-head .llp-lead-eyebrow { display: block; text-align: center; }
        .llp-doc-head h2 { font-family: 'Fraunces', serif; font-weight: 500; font-size: clamp(28px, 3.4vw, 38px); color: var(--ink); margin: 8px 0 14px; line-height: 1.22; }
        .llp-doc-head p { font-size: 15px; color: var(--muted); line-height: 1.75; }

        .llp-doc-marquee { min-width: 0; max-width: 100%; overflow: hidden; -webkit-mask-image: linear-gradient(90deg, transparent, #000 4%, #000 96%, transparent); mask-image: linear-gradient(90deg, transparent, #000 4%, #000 96%, transparent); }
        .llp-doc-track { display: flex; gap: 22px; width: max-content; animation: llp-scroll 42s linear infinite; }
        .llp-doc-marquee:hover .llp-doc-track { animation-play-state: paused; }

        .llp-doc-card { flex: 0 0 auto; width: 220px; border: 1px solid var(--line); border-radius: 16px; overflow: hidden; background: #fff; }
        .llp-doc-photo { width: 100%; aspect-ratio: 4 / 5; background: var(--accent-soft); }
        .llp-doc-photo img { width: 100%; height: 100%; object-fit: cover; display: block; }
        .llp-doc-avatar {
          width: 100%; height: 100%; display: flex; align-items: center; justify-content: center;
          font-family: 'Fraunces', serif; font-weight: 600; font-size: 34px; color: var(--accent-deep);
          background: var(--accent-soft);
        }
        .llp-doc-info { padding: 16px 16px 18px; }
        .llp-doc-name { font-size: 15px; font-weight: 700; color: var(--ink); margin-bottom: 3px; }
        .llp-doc-role { font-size: 12.5px; color: var(--accent-deep); font-weight: 600; margin-bottom: 3px; }
        .llp-doc-exp { font-size: 12px; color: var(--muted); }

        .llp-faq { padding: 10px 0 64px; }
        .llp-faq-head { max-width: 640px; margin: 0 auto 30px; text-align: center; }
        .llp-faq-head .llp-lead-eyebrow { display: block; text-align: center; }
        .llp-faq-head h2 { font-family: 'Fraunces', serif; font-weight: 500; font-size: clamp(28px, 3.4vw, 38px); color: var(--ink); margin: 8px 0 14px; line-height: 1.22; }
        .llp-faq-head p { font-size: 15px; color: var(--muted); line-height: 1.75; }

        .llp-faq-list { max-width: 780px; margin: 0 auto; display: flex; flex-direction: column; gap: 12px; }
        .llp-faq-item { border: 1px solid var(--line); border-radius: 14px; overflow: hidden; background: #fff; }
        .llp-faq-item.is-open { border-color: var(--accent); }
        .llp-faq-q {
          width: 100%; display: flex; align-items: center; justify-content: space-between; gap: 16px;
          text-align: left; background: none; border: none; cursor: pointer;
          padding: 18px 20px; font-size: 14.5px; font-weight: 700; color: var(--ink); font-family: 'Manrope', sans-serif;
        }
        .llp-faq-icon { flex-shrink: 0; width: 26px; height: 26px; border-radius: 50%; background: var(--accent-soft); color: var(--accent-deep); display: flex; align-items: center; justify-content: center; font-size: 16px; font-weight: 700; line-height: 1; }
        .llp-faq-a { padding: 0 20px 20px; font-size: 13.5px; line-height: 1.75; color: var(--muted); }

        .llp-final-cta { padding: 10px 0 64px; }
        .llp-final-cta-card {
          background: var(--accent-soft); border-radius: 20px; padding: 44px 40px;
          display: flex; align-items: center; justify-content: space-between; gap: 24px; flex-wrap: wrap;
        }
        .llp-final-cta-text h3 { font-family: 'Fraunces', serif; font-weight: 500; font-size: clamp(22px, 2.6vw, 28px); color: var(--ink); margin-bottom: 8px; }
        .llp-final-cta-text p { font-size: 14px; color: var(--muted); }
        .llp-final-cta-btn { flex-shrink: 0; padding: 15px 32px; border: none; border-radius: 10px; background: var(--ink); color: #fff; font-size: 14.5px; font-weight: 700; cursor: pointer; transition: background .2s ease, transform .2s ease; }
        .llp-final-cta-btn:hover { background: var(--accent-deep); transform: translateY(-1px); }

        .llp-footer-logo { height: 72px; width: auto; display: block; }

        .llp-footer { position: relative; background: var(--ink); color: rgba(255,255,255,0.88); padding: 72px 0 0; overflow: hidden; margin-top: 8px; }
        .llp-footer::before {
          content: ''; position: absolute; top: 0; left: 0; right: 0; height: 4px;
          background: linear-gradient(90deg, var(--accent) 0%, #8FD8CE 50%, var(--accent) 100%);
        }
        .llp-footer-glow {
          position: absolute; width: 460px; height: 460px; border-radius: 50%;
          background: radial-gradient(circle, rgba(14,140,130,0.35) 0%, rgba(14,140,130,0) 70%);
          top: -220px; right: -140px; pointer-events: none;
        }

        .llp-footer-top { position: relative; z-index: 1; display: grid; grid-template-columns: 1.3fr 1fr 1fr 1fr; gap: 40px; padding-bottom: 48px; }

        .llp-footer-logo-mark { background: #fff; display: inline-flex; padding: 10px 16px; border-radius: 12px; margin-bottom: 16px; }
        .llp-footer-about-text { font-size: 13.5px; line-height: 1.75; color: rgba(255,255,255,0.62); max-width: 300px; margin-bottom: 20px; }
        .llp-footer-social { display: flex; gap: 10px; }
        .llp-footer-social a {
          width: 38px; height: 38px; border-radius: 50%; border: 1px solid rgba(255,255,255,0.18);
          display: flex; align-items: center; justify-content: center; color: #fff; text-decoration: none;
          transition: background .2s ease, border-color .2s ease, transform .2s ease;
        }
        .llp-footer-social a:hover { background: var(--accent); border-color: var(--accent); transform: translateY(-2px); }

        .llp-footer-col-title { font-size: 12px; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; color: #8FD8CE; margin-bottom: 20px; }
        .llp-footer-col-links { display: flex; flex-direction: column; gap: 13px; }
        .llp-footer-col-links a, .llp-footer-col-links button {
          background: none; border: none; padding: 0; text-align: left; cursor: pointer;
          font-size: 13.5px; color: rgba(255,255,255,0.72); text-decoration: none;
          font-family: 'Manrope', sans-serif; transition: color .2s ease, padding-left .2s ease;
        }
        .llp-footer-col-links a:hover, .llp-footer-col-links button:hover { color: #fff; padding-left: 4px; }

        .llp-footer-contact-item { display: flex; gap: 10px; align-items: flex-start; font-size: 13.5px; color: rgba(255,255,255,0.72); margin-bottom: 16px; line-height: 1.6; }
        .llp-footer-contact-item svg { flex-shrink: 0; margin-top: 2px; color: #8FD8CE; }
        .llp-footer-contact-item a { color: inherit; text-decoration: none; }
        .llp-footer-contact-item a:hover { color: #fff; }

        .llp-footer-bottom {
          position: relative; z-index: 1; border-top: 1px solid rgba(255,255,255,0.12);
          padding: 22px 0; display: flex; justify-content: space-between; align-items: center; gap: 16px; flex-wrap: wrap;
        }
        .llp-footer-copy { font-size: 12px; color: rgba(255,255,255,0.5); }
        .llp-footer-bottom-links { display: flex; gap: 20px; }
        .llp-footer-bottom-links a { font-size: 12px; color: rgba(255,255,255,0.5); text-decoration: none; }
        .llp-footer-bottom-links a:hover { color: #fff; }

        .llp-reviews { padding: 10px 0 64px; }
        .llp-review-head { max-width: 640px; margin: 0 auto 34px; text-align: center; }
        .llp-review-head .llp-lead-eyebrow { display: block; text-align: center; }
        .llp-review-head h2 { font-family: 'Fraunces', serif; font-weight: 500; font-size: clamp(28px, 3.4vw, 38px); color: var(--ink); margin: 8px 0 14px; line-height: 1.22; }
        .llp-review-head p { font-size: 15px; color: var(--muted); line-height: 1.75; }

        .llp-review-row { display: grid; grid-template-columns: repeat(3, 1fr); gap: 22px; }
        .llp-review-card { background: var(--ink); border-radius: 18px; padding: 32px 26px 30px; text-align: center; }
        .llp-review-avatar-wrap { width: 84px; height: 84px; border-radius: 50%; margin: 0 auto 18px; overflow: hidden; border: 2px solid rgba(255,255,255,0.18); }
        .llp-review-avatar-img { width: 100%; height: 100%; object-fit: cover; display: block; }
        .llp-review-avatar-fallback {
          width: 100%; height: 100%; display: flex; align-items: center; justify-content: center;
          font-family: 'Fraunces', serif; font-weight: 600; font-size: 24px; color: #fff;
          background: rgba(255,255,255,0.12);
        }
        .llp-review-name { font-size: 14px; font-weight: 700; color: rgba(255,255,255,0.9); margin-bottom: 12px; }
        .llp-review-headline { font-family: 'Fraunces', serif; font-weight: 500; font-size: 17px; color: #8FD8CE; line-height: 1.4; margin-bottom: 14px; }
        .llp-review-quote { font-size: 13.5px; line-height: 1.75; color: rgba(255,255,255,0.72); }

        .llp-testimonials { padding: 10px 0 64px; }
        .llp-testi-head { max-width: 640px; margin: 0 auto 34px; text-align: center; }
        .llp-testi-head .llp-lead-eyebrow { display: block; text-align: center; }
        .llp-testi-head h2 { font-family: 'Fraunces', serif; font-weight: 500; font-size: clamp(28px, 3.4vw, 38px); color: var(--ink); margin: 8px 0 14px; line-height: 1.22; }
        .llp-testi-head p { font-size: 15px; color: var(--muted); line-height: 1.75; }

        .llp-testi-row { display: flex; gap: 22px; overflow-x: auto; scroll-snap-type: x mandatory; padding-bottom: 8px; scrollbar-width: thin; scrollbar-color: var(--line) transparent; }
        .llp-testi-row::-webkit-scrollbar { height: 6px; }
        .llp-testi-row::-webkit-scrollbar-thumb { background: var(--line); border-radius: 999px; }

        .llp-testi-card { flex: 0 0 auto; width: 320px; scroll-snap-align: start; border: 1px solid var(--line); border-radius: 16px; overflow: hidden; background: #fff; }
        .llp-testi-video { position: relative; width: 100%; aspect-ratio: 16 / 9; background: #0E2B27; }
        .llp-testi-video iframe { width: 100%; height: 100%; display: block; border: none; }
        .llp-testi-info { padding: 14px 16px 16px; }
        .llp-testi-name { font-size: 14.5px; font-weight: 700; color: var(--ink); margin-bottom: 2px; }
        .llp-testi-procedure { font-size: 12.5px; color: var(--accent-deep); font-weight: 600; }

        /* Fixed WhatsApp + Call buttons, stuck to the page as you scroll */
        .llp-float-stack { position: fixed; right: 22px; bottom: 90px; display: flex; flex-direction: column; gap: 14px; z-index: 999; }
        .llp-float-btn {
          width: 52px; height: 52px; border-radius: 50%; display: flex; align-items: center; justify-content: center;
          color: #fff; text-decoration: none; box-shadow: 0 6px 18px rgba(0,0,0,0.22);
          transition: transform .2s ease, box-shadow .2s ease;
        }
        .llp-float-btn:hover { transform: translateY(-2px) scale(1.04); box-shadow: 0 8px 22px rgba(0,0,0,0.28); }
        .llp-float-wa { background: #25D366; }
        .llp-float-call { background: #0E8C82; }

        @media (max-width: 900px) {
          .llp-hero-grid { grid-template-columns: 1fr; gap: 28px; }
          .llp-hero-visual { order: -1; height: auto; }
          .llp-lead { align-self: stretch; }
          .llp-trust-grid { grid-template-columns: 1fr; gap: 24px; }
          .llp-about-grid { grid-template-columns: 1fr; }
          .llp-about-stats { grid-template-columns: repeat(2, 1fr); }
          .llp-type-divider { display: none; }
          .llp-type-item { padding: 0 16px; max-width: 140px; }
          .llp-company-card { padding: 40px 26px; }
          .llp-company-points { grid-template-columns: 1fr; }
          .llp-review-row { grid-template-columns: 1fr; }
          .llp-final-cta-card { flex-direction: column; text-align: center; padding: 34px 26px; }
          .llp-final-cta-btn { width: 100%; }
          .llp-footer-top { grid-template-columns: 1fr 1fr; gap: 32px; padding-bottom: 40px; }
        }
        @media (max-width: 560px) {
          .llp-wrap { padding: 0 20px; }
          .llp-hero { padding: 32px 0 48px; }
          .llp-lead { padding: 22px 20px 20px; }
          .llp-float-stack { right: 14px; bottom: 70px; gap: 10px; }
          .llp-float-btn { width: 46px; height: 46px; }
          .llp-trust-copy h3 { font-size: 21px; }
          .llp-doc-card { width: 170px; }
          .llp-testi-card { width: 260px; }
          .llp-company-card { padding: 32px 20px; }
          .llp-faq-q { padding: 15px 16px; font-size: 13.5px; }
          .llp-footer { padding: 48px 0 0; }
          .llp-footer-top { grid-template-columns: 1fr; gap: 32px; }
          .llp-footer-bottom { flex-direction: column; align-items: flex-start; }
          .llp-company-actions { flex-direction: column; align-items: stretch; }
          .llp-company-cta { width: 100%; }
        }
      `}</style>

      <section className="llp-hero">
        <div className="llp-wrap">
          <div className="llp-hero-grid">

            <div className="llp-hero-visual">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={heroImage} alt={`LASIK patient free from glasses in ${cityData.name}`} />
            </div>

            <div className="llp-lead" id="lead">
              <div className="llp-lead-eyebrow">Free screening · {cityData.name}</div>
              <h3>Check your eligibility</h3>
              <p className="llp-lead-sub">Share your details — our care team calls within 5 minutes.</p>

              {submitted ? (
                <div className="llp-lead-success">Thanks! Our team will call you shortly.</div>
              ) : (
                <form onSubmit={handleSubmit}>
                  {error && <div className="llp-lead-error">{error}</div>}
                  <div className="llp-field">
                    <label htmlFor="llp-name">Full name</label>
                    <input
                      id="llp-name"
                      type="text"
                      placeholder="Enter your name"
                      autoComplete="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      disabled={loading}
                    />
                  </div>
                  <div className="llp-field">
                    <label htmlFor="llp-phone">Mobile number</label>
                    <div className="llp-phone-field">
                      <span className="prefix">+91</span>
                      <input
                        id="llp-phone"
                        type="tel"
                        placeholder="10-digit number"
                        maxLength={10}
                        value={phone}
                        onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                        disabled={loading}
                      />
                    </div>
                  </div>
                  <button className="llp-lead-submit" type="submit" disabled={loading}>
                    {loading ? 'Checking...' : 'Check my eligibility'}
                  </button>
                </form>
              )}

              <div className="llp-lead-trust">
                <span>Free</span>
                <span>No obligation</span>
                <span>Confidential</span>
              </div>
            </div>

          </div>
        </div>
      </section>

      <section className="llp-trust">
        <div className="llp-wrap">
          <div className="llp-trust-grid">
            <div className="llp-trust-visual">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={INSURANCE_IMAGE} alt="HealviaCare cashless insurance partners" />
            </div>

            <div className="llp-trust-copy">
              <div className="llp-lead-eyebrow">Cashless Insurance</div>
              <h3>All these insurers are accepted at HealviaCare</h3>
              <p className="llp-trust-sub">
                We work with 20+ leading insurance partners for cashless treatment, plus many more
                general and health insurers accepted on reimbursement:
              </p>
              <div className="llp-marquee">
                <div className="llp-marquee-track">
                  {[...INSURANCE_NAMES, ...INSURANCE_NAMES].map((name, i) => (
                    <span className="llp-pill" key={`${name}-${i}`}>{name}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="llp-marquee llp-marquee-reverse llp-badges-strip">
            <div className="llp-marquee-track">
              {[...TRUST_BADGES, ...TRUST_BADGES].map((badge, i) => (
                <span className="llp-badge-pill" key={`${badge}-${i}`}>
                  <span className="dot" />
                  {badge}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="llp-company">
        <div className="llp-wrap">
          <div className="llp-company-card">
            <div className="llp-company-glow" aria-hidden="true" />
            <div className="llp-company-glow-2" aria-hidden="true" />
            <div className="llp-company-inner">
              <div className="llp-company-eyebrow">Who We Are</div>
              <h2 className="llp-company-headline">
                Glasses off. <em>Life on.</em> That&apos;s the whole idea behind HealviaCare.
              </h2>
              <p className="llp-company-sub">
                We&apos;re a network of NABH-accredited eye hospitals built around one simple goal —
                give you clear, natural vision without the wait, the confusion, or the worry. Real
                surgeons, honest advice, and a team that treats every question like it matters.
                Because it does.
              </p>

              <div className="llp-company-points">
                <div className="llp-company-point">
                  <span className="num">01</span>
                  <span className="txt">Every patient gets a free, unhurried eligibility check before any decision is made.</span>
                </div>
                <div className="llp-company-point">
                  <span className="num">02</span>
                  <span className="txt">Surgeries by senior doctors using blade-free, all-laser technology — nothing outsourced.</span>
                </div>
                <div className="llp-company-point">
                  <span className="num">03</span>
                  <span className="txt">Cashless insurance, simple paperwork, and support that stays with you after surgery too.</span>
                </div>
              </div>

              <div className="llp-company-actions">
                <button
                  type="button"
                  className="llp-company-cta"
                  onClick={() => document.getElementById('lead')?.scrollIntoView({ behavior: 'smooth', block: 'center' })}
                >
                  Talk to Our Expert
                </button>
                <span className="llp-company-note">Free · 5-minute call · No obligation</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="llp-about">
        <div className="llp-wrap">
          <div className="llp-about-head">
            <span className="llp-lead-eyebrow">The Procedure</span>
            <h2>Blink. And Freedom Begins.</h2>
            <p>
              LASIK uses a computer-guided laser to gently reshape your cornea, correcting exactly
              how light focuses on your retina — in one sitting, with no blade and no stitches.
              Most patients are back to reading, driving, and scrolling their phone within a day,
              glasses-free for good.
            </p>
          </div>

          <div className="llp-about-grid">
            <div className="llp-about-img">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={ABOUT_IMAGES.consult} alt="Eye specialist examining a patient before LASIK" />
            </div>
            <div className="llp-about-img">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={ABOUT_IMAGES.procedure} alt="Patient undergoing laser-guided LASIK surgery" />
            </div>
          </div>

          <div className="llp-about-fact">
            <span className="spark">✦</span>
            <span>
              Did you know? The laser reshapes each cornea in under 20 seconds per eye — faster
              than the blink it&apos;s replacing.
            </span>
          </div>

          <div className="llp-about-stats">
            {LASIK_STATS.map((stat) => (
              <div className="llp-about-stat" key={stat.label}>
                <span className="value">{stat.value}</span>
                <span className="label">{stat.label}</span>
              </div>
            ))}
          </div>

          <div className="llp-about-cta">
            <button
              type="button"
              onClick={() => document.getElementById('lead')?.scrollIntoView({ behavior: 'smooth', block: 'center' })}
            >
              Book Free Consultation
            </button>
          </div>
        </div>
      </section>

      <section className="llp-experience">
        <div className="llp-wrap">
          <div className="llp-exp-head">
            <span className="llp-lead-eyebrow">Experience Clear Vision</span>
            <h2>See The World With HealviaCare Clarity</h2>
            <p>
              Before LASIK, life is squinting at street signs, wiping foggy lenses, and reaching
              for glasses first thing every morning. After LASIK, it&apos;s waking up and simply
              seeing — mountains, menus, faces across the room, all in focus, no glass between you
              and the world.
            </p>
          </div>

          <div className="llp-exp-visual">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={EXPERIENCE_IMAGE} alt="HealviaCare LASIK — before and after clarity" />
          </div>

          <div className="llp-exp-cta">
            <button
              type="button"
              onClick={() => document.getElementById('lead')?.scrollIntoView({ behavior: 'smooth', block: 'center' })}
            >
              Book Now
            </button>
          </div>
        </div>
      </section>

      <section className="llp-process">
        <div className="llp-wrap">
          <div className="llp-process-head">
            <span className="llp-lead-eyebrow">The Process</span>
            <p>
              At HealviaCare, every patient follows this same three-step path — a thorough
              consultation to check your eligibility, a precise 10–15 minute laser procedure, and
              a guided recovery with follow-ups until your vision fully settles. Nothing skipped,
              nothing rushed.
            </p>
          </div>

          <div className="llp-process-visual">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={PROCESS_IMAGE} alt="How LASIK works: consultation, procedure, and recovery" />
          </div>

          <div className="llp-process-cta">
            <button
              type="button"
              onClick={() => document.getElementById('lead')?.scrollIntoView({ behavior: 'smooth', block: 'center' })}
            >
              Book Free Consultation
            </button>
          </div>
        </div>
      </section>

      <section className="llp-types">
        <div className="llp-wrap">
          <div className="llp-types-visual">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={TYPES_IMAGE} alt="Types of LASIK: Standard, Femto, SMILE, Silk, and Contoura Vision" />
          </div>

          <div className="llp-types-cta">
            <button
              type="button"
              onClick={() => document.getElementById('lead')?.scrollIntoView({ behavior: 'smooth', block: 'center' })}
            >
              Book Now — Free Consultation
            </button>
          </div>
        </div>
      </section>

      <section className="llp-doctors">
        <div className="llp-wrap">
          <div className="llp-doc-head">
            <span className="llp-lead-eyebrow">Meet Our Experts</span>
            <h2>Surgeons You Can Trust</h2>
            <p>
              A team of experienced, board-certified ophthalmologists and refractive surgeons —
              each one has guided hundreds of patients from glasses to 20/20 vision.
            </p>
          </div>

          <div className="llp-doc-marquee">
            <div className="llp-doc-track">
              {[...DOCTORS, ...DOCTORS].map((doctor, i) => (
                <DoctorCard doctor={doctor} key={`${doctor.name}-${i}`} />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="llp-reviews">
        <div className="llp-wrap">
          <div className="llp-review-head">
            <span className="llp-lead-eyebrow">Patient Reviews</span>
            <h2>What Our Patients Have to Say</h2>
            <p>A few words from people who trusted us with their vision.</p>
          </div>

          <div className="llp-review-row">
            {REVIEWS.map((review, i) => (
              <ReviewCard review={review} key={`${review.name}-${i}`} />
            ))}
          </div>
        </div>
      </section>

      <section className="llp-testimonials">
        <div className="llp-wrap">
          <div className="llp-testi-head">
            <span className="llp-lead-eyebrow">Real Stories</span>
            <h2>See What Our Happy Patients Are Saying</h2>
            <p>Hear it straight from the people who made the switch — in their own words.</p>
          </div>

          <div className="llp-testi-row">
            {TESTIMONIALS.map((testimonial, i) => (
              <div className="llp-testi-card" key={`${testimonial.youtubeId}-${i}`}>
                <div className="llp-testi-video">
                  <iframe
                    src={`https://www.youtube.com/embed/${testimonial.youtubeId}`}
                    title={`${testimonial.name} — ${testimonial.procedure} patient story`}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    loading="lazy"
                  />
                </div>
                <div className="llp-testi-info">
                  <div className="llp-testi-name">{testimonial.name}</div>
                  <div className="llp-testi-procedure">{testimonial.procedure}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="llp-faq">
        <div className="llp-wrap">
          <div className="llp-faq-head">
            <span className="llp-lead-eyebrow">Questions & Answers</span>
            <h2>Frequently Asked Questions</h2>
            <p>Everything patients usually ask before booking a LASIK screening.</p>
          </div>

          <div className="llp-faq-list">
            {faqs.map((faq, i) => (
              <FaqItem q={faq.q} a={faq.a} key={i} />
            ))}
          </div>
        </div>
      </section>

      <section className="llp-final-cta">
        <div className="llp-wrap">
          <div className="llp-final-cta-card">
            <div className="llp-final-cta-text">
              <h3>Still have questions?</h3>
              <p>Talk to our expert for a free, no-obligation LASIK screening in {cityData.name}.</p>
            </div>
            <button
              type="button"
              className="llp-final-cta-btn"
              onClick={() => document.getElementById('lead')?.scrollIntoView({ behavior: 'smooth', block: 'center' })}
            >
              Talk to Our Expert
            </button>
          </div>
        </div>
      </section>

      <footer className="llp-footer">
        <div className="llp-footer-glow" aria-hidden="true" />
        <div className="llp-wrap">
          <div className="llp-footer-top">

            <div>
              <div className="llp-footer-logo-mark">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/vv.png" alt="HealviaCare logo" className="llp-footer-logo" />
              </div>
              <p className="llp-footer-about-text">
                A network of NABH-accredited eye hospitals focused on one thing — clear, natural
                vision without the wait, the confusion, or the worry.
              </p>
              <div className="llp-footer-social">
                <a href={WA_URL} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
                  <WaIcon size={16} />
                </a>
                <a href={TEL_URL} aria-label="Call">
                  <PhoneIcon size={15} />
                </a>
              </div>
            </div>

            <div>
              <div className="llp-footer-col-title">Explore</div>
              <div className="llp-footer-col-links">
                <button type="button" onClick={() => document.querySelector('.llp-company')?.scrollIntoView({ behavior: 'smooth' })}>About Us</button>
                <button type="button" onClick={() => document.querySelector('.llp-doctors')?.scrollIntoView({ behavior: 'smooth' })}>Meet Our Doctors</button>
                <button type="button" onClick={() => document.querySelector('.llp-reviews')?.scrollIntoView({ behavior: 'smooth' })}>Patient Reviews</button>
                <button type="button" onClick={() => document.querySelector('.llp-faq')?.scrollIntoView({ behavior: 'smooth' })}>FAQs</button>
              </div>
            </div>

            <div>
              <div className="llp-footer-col-title">Care</div>
              <div className="llp-footer-col-links">
                <button type="button" onClick={() => document.querySelector('.llp-types')?.scrollIntoView({ behavior: 'smooth' })}>Types of LASIK</button>
                <button type="button" onClick={() => document.querySelector('.llp-trust')?.scrollIntoView({ behavior: 'smooth' })}>Insurance Partners</button>
                <button type="button" onClick={() => document.getElementById('lead')?.scrollIntoView({ behavior: 'smooth', block: 'center' })}>Free Screening</button>
                <button type="button" onClick={() => document.getElementById('lead')?.scrollIntoView({ behavior: 'smooth', block: 'center' })}>Book Consultation</button>
              </div>
            </div>

            <div>
              <div className="llp-footer-col-title">Get In Touch</div>
              <div className="llp-footer-contact-item">
                <PhoneIcon size={15} />
                <a href={TEL_URL}>+91 93109 84753</a>
              </div>
              <div className="llp-footer-contact-item">
                <WaIcon size={15} />
                <a href={WA_URL} target="_blank" rel="noopener noreferrer">Chat with us on WhatsApp</a>
              </div>
              <div className="llp-footer-contact-item">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ marginTop: 2 }}>
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                <span>Serving {cityData.name} & nearby areas</span>
              </div>
            </div>

          </div>

          <div className="llp-footer-bottom">
            <div className="llp-footer-copy" suppressHydrationWarning>
              © {new Date().getFullYear()} HealviaCare. All rights reserved.
            </div>
            <div className="llp-footer-bottom-links">
              <a href="#lead" onClick={(e) => { e.preventDefault(); document.getElementById('lead')?.scrollIntoView({ behavior: 'smooth', block: 'center' }); }}>
                Book Free Screening
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* Fixed WhatsApp + Call buttons, visible throughout the page */}
      <div className="llp-float-stack">
        <a
          href={WA_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="llp-float-btn llp-float-wa"
          aria-label="Chat on WhatsApp"
        >
          <WaIcon size={26} />
        </a>
        <a href={TEL_URL} className="llp-float-btn llp-float-call" aria-label="Call us">
          <PhoneIcon size={22} />
        </a>
      </div>
    </div>
  );
}