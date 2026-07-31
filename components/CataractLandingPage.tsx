'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
import Script from 'next/script';

// ── CONSTANTS ──────────────────────────────────────────────────────────────────
const LEADS_ENDPOINT = '/api/leads';
const PHONE_TEL = '+919310984753';
const PHONE_DISPLAY = '+91 93109 84753';
const WA_NUMBER = '919310984753';
const WA_MSG = encodeURIComponent("Hi, I'd like to book a free Cataract screening");
const WA_URL = `https://wa.me/${WA_NUMBER}?text=${WA_MSG}`;

// ── IMAGES ─────────────────────────────────────────────────────────────────────
const IMG_ELDERLY_EYE = 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&w=1400&q=80';
const IMG_SURGERY_ROOM = 'https://images.unsplash.com/photo-1551190822-a9333d879b1f?auto=format&fit=crop&w=900&q=80';
const IMG_SLIT_LAMP = 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=900&q=80';
const IMG_ELDERLY_READING = 'https://images.unsplash.com/photo-1516733725897-1aa73b87c8e8?auto=format&fit=crop&w=900&q=80';
const IMG_CLEAR_VISION = 'https://images.unsplash.com/photo-1494869042583-f6c911f04b4c?auto=format&fit=crop&w=900&q=80';
// Creative doctor image for hero — ophthalmologist with slit lamp, professional look
const IMG_HERO_DOCTOR = 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=800&q=85';

// ── TYPES ──────────────────────────────────────────────────────────────────────
type CityKey = 'delhi' | 'mumbai' | 'gurugram' | 'noida' | 'ghaziabad' | 'faridabad' | 'pune';

interface CityData {
  name: string;
  headline: string;
  headlineEm: string;
  sub: string;
  areasTitle: string;
  areasLead: string;
  areas: string[];
  testimonials: { quote: string; name: string; role: string }[];
  closingHeadline: string;
  closingSub: string;
  formSource: string;
}

// ── CITY DATA ──────────────────────────────────────────────────────────────────
const CITY_DATA: Record<CityKey, CityData> = {
  delhi: {
    name: 'Delhi',
    headline: 'Clear Vision Again —',
    headlineEm: 'Cataract Surgery in Delhi',
    sub: 'Blurry, cloudy or faded vision? A cataract may be the reason. Our surgeons in Delhi remove it safely and quickly — most patients see clearly the very next day.',
    areasTitle: 'We Serve These Areas in Delhi',
    areasLead: 'Our partner eye hospitals are spread across Delhi so you don\'t have to travel far.',
    areas: ['Connaught Place', 'Dwarka', 'Rohini', 'Lajpat Nagar', 'Karol Bagh', 'Janakpuri', 'Saket', 'Pitampura', 'Vasant Kunj', 'Shahdara'],
    testimonials: [
      { quote: 'I was scared of surgery but it was over in 20 minutes. The next morning I could read my newspaper without glasses for the first time in years. Unbelievable.', name: 'Ramesh Gupta', role: 'Retired Teacher, Delhi' },
      { quote: 'My mother\'s cataract was making her very sad. After the surgery she could see her grandchildren\'s faces clearly. We are so grateful to the team.', name: 'Priya Sharma', role: 'Working Professional, Delhi' },
    ],
    closingHeadline: 'Ready to See Clearly Again?',
    closingSub: 'Book a free eye checkup in Delhi. We\'ll tell you exactly what\'s happening with your vision — no pressure, no jargon.',
    formSource: 'cataract-delhi-lp',
  },
  mumbai: {
    name: 'Mumbai',
    headline: 'See the World Clearly Again —',
    headlineEm: 'Cataract Surgery in Mumbai',
    sub: 'Cataracts don\'t have to slow you down. Our expert eye surgeons in Mumbai remove cloudy lenses and replace them — so you can get back to doing what you love.',
    areasTitle: 'We Serve These Areas in Mumbai',
    areasLead: 'Easily reachable from all parts of Mumbai and the suburbs.',
    areas: ['Andheri', 'Bandra', 'Borivali', 'Dadar', 'Thane', 'Navi Mumbai', 'Powai', 'Malad', 'Goregaon', 'Kurla'],
    testimonials: [
      { quote: 'I kept putting it off for years thinking it was a big surgery. It\'s actually very quick and I felt no pain at all. My doctor was very calm and explained everything.', name: 'Sunita Mehta', role: 'Homemaker, Andheri' },
      { quote: 'Colours look so vivid now! I didn\'t realise how faded my vision had become until after the surgery. It\'s like getting a new pair of eyes.', name: 'Arvind Nair', role: 'Retired Engineer, Bandra' },
    ],
    closingHeadline: 'Don\'t Wait Any Longer',
    closingSub: 'Cataracts grow slowly — but the sooner you act, the easier the surgery. Book a free checkup in Mumbai today.',
    formSource: 'cataract-mumbai-lp',
  },
  gurugram: {
    name: 'Gurugram',
    headline: 'Sharp, Clear Vision —',
    headlineEm: 'Cataract Surgery in Gurugram',
    sub: 'If you\'re struggling with cloudy or blurry vision, a cataract might be the reason. We offer safe, painless cataract surgery in Gurugram with same-day discharge.',
    areasTitle: 'We Serve These Areas in Gurugram',
    areasLead: 'Convenient eye care locations across Gurugram.',
    areas: ['DLF Phase 1–5', 'Sohna Road', 'Sector 14', 'Sector 56', 'Golf Course Road', 'MG Road', 'Udyog Vihar', 'Palam Vihar'],
    testimonials: [
      { quote: 'My father had his cataract removed here. The team was very professional and made him feel comfortable throughout. He was back home by evening.', name: 'Neha Kapoor', role: 'Software Engineer, DLF Phase 2' },
      { quote: 'I had been struggling at work because my vision was getting so bad. After the surgery I feel 20 years younger. Would highly recommend.', name: 'Vikram Sethi', role: 'Business Owner, Gurugram' },
    ],
    closingHeadline: 'Life\'s Too Short to See It Blurry',
    closingSub: 'Book your free cataract checkup in Gurugram. Our team will walk you through everything in plain, simple language.',
    formSource: 'cataract-gurugram-lp',
  },
  noida: {
    name: 'Noida',
    headline: 'Get Your Clear Vision Back —',
    headlineEm: 'Cataract Surgery in Noida',
    sub: 'Cataracts are very common and very treatable. Our eye surgeons in Noida use the latest technique to remove the cloudy lens and replace it — so you can see clearly again.',
    areasTitle: 'We Serve These Areas in Noida',
    areasLead: 'We cover all major sectors of Noida and Greater Noida.',
    areas: ['Sector 18', 'Sector 62', 'Sector 137', 'Greater Noida West', 'Greater Noida', 'Sector 44', 'Sector 76', 'Sector 100'],
    testimonials: [
      { quote: 'I was having trouble driving at night and reading small print. After cataract surgery I can do both without any glasses. Very happy with the results.', name: 'Deepak Jain', role: 'Teacher, Noida Sector 62' },
      { quote: 'The whole process from checkup to surgery was very smooth. The doctor explained my condition in simple words which I really appreciated.', name: 'Kamla Devi', role: 'Homemaker, Greater Noida' },
    ],
    closingHeadline: 'Clear Vision Is Just One Call Away',
    closingSub: 'Start with a free eye checkup in Noida. No cost, no commitment — just honest advice.',
    formSource: 'cataract-noida-lp',
  },
  ghaziabad: {
    name: 'Ghaziabad',
    headline: 'See Clearly Without the Clouds —',
    headlineEm: 'Cataract Surgery in Ghaziabad',
    sub: 'Is your vision getting cloudier day by day? That\'s a cataract, and it\'s very fixable. We offer painless cataract surgery in Ghaziabad — most patients see better the next morning.',
    areasTitle: 'We Serve These Areas in Ghaziabad',
    areasLead: 'Easily accessible eye care across Ghaziabad.',
    areas: ['Vaishali', 'Indirapuram', 'Raj Nagar', 'Kaushambi', 'Mohan Nagar', 'Sanjay Nagar', 'Loni', 'Crossings Republik'],
    testimonials: [
      { quote: 'My vision was so cloudy I could barely recognise faces. After surgery it was like a miracle — everything was so sharp and clear. Thank you so much.', name: 'Santosh Yadav', role: 'Shopkeeper, Indirapuram' },
      { quote: 'Very clean hospital, very caring staff. My mother had no pain during or after the surgery. We are very satisfied.', name: 'Ritu Saxena', role: 'Teacher, Vaishali' },
    ],
    closingHeadline: 'Cloudy Vision? Let\'s Fix It.',
    closingSub: 'Book your free cataract checkup in Ghaziabad. We\'ll tell you exactly what\'s happening with your eyes.',
    formSource: 'cataract-ghaziabad-lp',
  },
  faridabad: {
    name: 'Faridabad',
    headline: 'Bring Back Your Clear Vision —',
    headlineEm: 'Cataract Surgery in Faridabad',
    sub: 'Living with cataracts means missing out on the details of life. Our expert surgeons in Faridabad can fix it in under 30 minutes — with no blade and no stitches.',
    areasTitle: 'We Serve These Areas in Faridabad',
    areasLead: 'Cataract care made convenient across Faridabad.',
    areas: ['Sector 15', 'Sector 21', 'Sector 46', 'NIT', 'Old Faridabad', 'Ballabhgarh', 'Sector 88', 'Neharpar'],
    testimonials: [
      { quote: 'I thought poor vision was just part of getting old. My daughter brought me here and after the surgery I can see better than I could 10 years ago!', name: 'Bhagwati Prasad', role: 'Retired, Faridabad Sector 15' },
      { quote: 'Quick, safe, and painless. I had my surgery in the morning and was watching TV by evening. Very impressed with the entire team.', name: 'Meena Sharma', role: 'Homemaker, NIT Faridabad' },
    ],
    closingHeadline: 'Your Clear Vision Is Waiting',
    closingSub: 'Start with a free checkup in Faridabad. The surgery is quick and most patients go home the same day.',
    formSource: 'cataract-faridabad-lp',
  },
  pune: {
    name: 'Pune',
    headline: 'No More Cloudy Vision —',
    headlineEm: 'Cataract Surgery in Pune',
    sub: 'Cataracts are one of the most common — and most easily fixed — eye problems. Our surgeons in Pune use the latest bladeless technique so you can see clearly again, fast.',
    areasTitle: 'We Serve These Areas in Pune',
    areasLead: 'Our partner eye hospitals are spread across Pune and PCMC.',
    areas: ['Kothrud', 'Baner', 'Wakad', 'Hadapsar', 'Kharadi', 'Viman Nagar', 'Pimpri-Chinchwad', 'Shivajinagar', 'Aundh', 'Deccan'],
    testimonials: [
      { quote: 'I was very nervous before the surgery but it was so fast and painless. The next day I could see the trees outside my window so clearly. Amazing experience.', name: 'Suresh Patil', role: 'Retired Bank Officer, Kothrud' },
      { quote: 'The doctor was very patient and answered all my questions before the surgery. I felt safe and cared for. My vision is now excellent.', name: 'Anjali Deshpande', role: 'Teacher, Baner' },
    ],
    closingHeadline: 'Life Looks Better When You Can See It Clearly',
    closingSub: 'Book a free cataract checkup in Pune. Our team will explain everything in simple words before you make any decision.',
    formSource: 'cataract-pune-lp',
  },
};

// ── SHARED FAQs ────────────────────────────────────────────────────────────────
const SHARED_FAQS = [
  {
    q: 'What is a cataract, in simple words?',
    a: 'The natural lens inside your eye is normally clear. As you get older, this lens can start to turn cloudy — like a dirty windshield. That cloudy lens is called a cataract. It makes everything look blurry, foggy, or faded. The good news: removing it is a safe, routine surgery.',
  },
  {
    q: 'Is cataract surgery painful?',
    a: 'No. We put numbing eye drops in before the surgery so you feel nothing. Most patients say they only feel a little pressure, not pain. The whole procedure is done in about 15–30 minutes. You are awake but comfortable the whole time.',
  },
  {
    q: 'How will I know if I have a cataract?',
    a: 'Common signs include: blurry or cloudy vision, things looking faded or yellowish, glare from lights at night, double vision in one eye, and needing stronger glasses more often. If you have any of these, a free eye checkup with us will tell you exactly what\'s going on.',
  },
  {
    q: 'Will I need glasses after cataract surgery?',
    a: 'That depends on the type of lens we put in. With a basic lens you may still need glasses for reading. With a premium multifocal lens, many people can do most activities without glasses. We\'ll explain which lens suits you best at your free checkup.',
  },
  {
    q: 'Can I go home the same day?',
    a: 'Yes. Cataract surgery is a day procedure — you come in, have the surgery, rest for a few hours, and go home. No overnight hospital stay is needed.',
  },
  {
    q: 'What if I\'m scared of surgery?',
    a: 'That\'s completely normal. Our team takes extra time to explain every step to you before we start. The surgery itself takes about 15–30 minutes and most patients are surprised by how quick and easy it was. We also follow up with you after to make sure your recovery is going well.',
  },
  {
    q: 'Can cataracts come back after surgery?',
    a: 'No, the cloudy lens is removed permanently and replaced with an artificial one that does not cloud up. However, sometimes the thin covering around the new lens can get a little hazy months or years later. This is called a secondary cataract and it is easily fixed with a quick, painless laser treatment.',
  },
  {
    q: 'What is the cost of cataract surgery?',
    a: 'The cost depends on the type of lens used. Basic lenses covered by insurance are very affordable. Premium lenses that reduce your need for glasses cost more. We\'ll give you an honest price breakdown at your free checkup with no hidden charges.',
  },
  {
    q: 'Can I have both eyes done?',
    a: 'Yes. If both eyes have cataracts, we usually do one eye at a time, waiting about a week or two before doing the second eye. This lets the first eye heal properly and gives you a clearer picture of your vision before the second surgery.',
  },
  {
    q: 'Is it safe for elderly patients?',
    a: 'Absolutely. Most cataract patients are aged 60 and above. The surgery is very safe even for patients in their 80s. We do a full health check before surgery to make sure everything is in order. Cataract surgery is actually one of the most commonly performed surgeries in the world.',
  },
];

// ── FORM ───────────────────────────────────────────────────────────────────────
interface FormData {
  name: string;
  phone: string;
  city: CityKey;
}

function validatePhone(digits: string): string {
  if (digits.length !== 10) return 'Please enter a valid 10-digit mobile number';
  if (!/^[6-9]/.test(digits)) return 'Please enter a valid Indian mobile number';
  const fake = [/^(\d)\1{9}$/, /^1234567890$/, /^0987654321$/];
  if (fake.some((p) => p.test(digits))) return 'Please enter a real mobile number';
  return '';
}

// ── ICONS ──────────────────────────────────────────────────────────────────────
const WaIcon = ({ size = 17 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
    <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.553 4.118 1.527 5.846L0 24l6.335-1.502A11.955 11.955 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 01-5.006-1.375l-.36-.213-3.73.885.927-3.636-.233-.374A9.816 9.816 0 012.182 12C2.182 6.578 6.578 2.182 12 2.182S21.818 6.578 21.818 12 17.422 21.818 12 21.818z" />
  </svg>
);

const PhoneIcon = ({ size = 15 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 10.8a19.79 19.79 0 01-3.07-8.67A2 2 0 012 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 14.92v2z" />
  </svg>
);

// ── PROPS ──────────────────────────────────────────────────────────────────────
interface CataractLandingProps {
  cityKey: CityKey;
}

// ── COMPONENT ──────────────────────────────────────────────────────────────────
export default function CataractLandingPage({ cityKey }: CataractLandingProps) {
  const cityData = CITY_DATA[cityKey];

  const [formData, setFormData] = useState<FormData>({ name: '', phone: '', city: cityKey });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [expandedFAQ, setExpandedFAQ] = useState(0);
  const nameRef = useRef<HTMLInputElement>(null);

  if (!cityData) return <div style={{ padding: 40 }}>City not found: &quot;{cityKey}&quot;</div>;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const trimName = formData.name.trim();
    if (trimName.length < 2) { setError('Please enter your full name'); return; }

    const digits = formData.phone.replace(/\D/g, '');
    const phoneErr = validatePhone(digits);
    if (phoneErr) { setError(phoneErr); return; }

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
          service: 'cataract',
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || 'Something went wrong. Please try again.');
      } else {
        window.location.href = '/thank-you';
      }
    } catch {
      setError('Could not reach our server. Please check your connection and try again.');
    } finally {
      setLoading(false);
    }
  };

  const scrollToForm = () => {
    document.getElementById('lead-card')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    setTimeout(() => nameRef.current?.focus(), 400);
  };

  return (
    <div className="clp">
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
        .clp *, .clp *::before, .clp *::after { box-sizing: border-box; margin: 0; padding: 0; }
        .clp {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', sans-serif;
          color: #1a1a1a;
          background: #ffffff;
          line-height: 1.6;
          --accent: #4CAF50;
        }

        /* ── HEADER ── */
        .clp-header {
          position: sticky; top: 0; z-index: 200;
          background: #ffffff; border-bottom: 1.5px solid #e5e7eb;
          box-shadow: 0 1px 8px rgba(0,0,0,0.04);
        }
        .clp-header-inner {
          max-width: 1400px; margin: 0 auto;
          display: flex; align-items: center; justify-content: space-between;
          padding: 2px 24px; gap: 16px; min-height: 52px;
        }
        .clp-logo { display: flex; align-items: center; text-decoration: none; flex-shrink: 0; transition: transform 0.3s ease; }
        .clp-logo:hover { transform: scale(1.04); }
        .clp-logo-img { height: auto; width: auto; max-height: 50px; max-width: 240px; display: block; object-fit: contain; }
        .clp-nav { display: flex; align-items: center; gap: 10px; }

        /* ── NAV BUTTONS ── */
        .clp-btn-wa {
          display: flex; align-items: center; gap: 7px;
          background: var(--accent); color: #fff; text-decoration: none;
          padding: 8px 14px; border-radius: 8px; font-size: 13px; font-weight: 700; transition: all 0.3s ease;
        }
        .clp-btn-wa:hover { transform: translateY(-2px); box-shadow: 0 6px 14px rgba(76,175,80,0.3); }
        .clp-btn-call {
          display: flex; align-items: center; gap: 7px;
          background: #fff; color: #111827; border: 1.5px solid #e5e7eb; text-decoration: none;
          padding: 8px 14px; border-radius: 8px; font-size: 13px; font-weight: 700; transition: all 0.3s ease;
        }
        .clp-btn-call:hover { transform: translateY(-2px); border-color: var(--accent); }
        .clp-btn-screen {
          background: var(--accent); color: #fff; border: none;
          padding: 8px 16px; border-radius: 8px; font-size: 13px; font-weight: 700; cursor: pointer; transition: all 0.3s ease;
        }
        .clp-btn-screen:hover { transform: translateY(-2px); box-shadow: 0 6px 14px rgba(0,0,0,0.15); }

        /* ── CITY BAR ── */
        .clp-city-bar {
          background: #ffffff; border-bottom: 1.5px solid #e5e7eb; padding: 10px 24px;
          display: flex; align-items: center; gap: 12px; flex-wrap: wrap; justify-content: center;
        }
        .clp-city-bar-label { font-size: 11px; font-weight: 800; color: #374151; text-transform: uppercase; letter-spacing: 0.08em; }
        .clp-city-tabs { display: flex; gap: 8px; flex-wrap: wrap; }
        .clp-city-tab {
          padding: 6px 16px; border-radius: 999px; font-size: 12px; font-weight: 600;
          border: 1.5px solid #e5e7eb; color: #374151; background: #fff; cursor: pointer;
          transition: all 0.3s ease; text-decoration: none; display: inline-block;
        }
        .clp-city-tab.active, .clp-city-tab:hover { background: var(--accent); color: #fff; border-color: var(--accent); }

        /* ── PAGE LAYOUT ── */
        .clp-page { max-width: 1400px; margin: 0 auto; padding: 28px 24px 0; background: #ffffff; }
        .clp-grid { display: grid; grid-template-columns: 1fr 340px; gap: 28px; align-items: start; }
        .clp-main { min-width: 0; }
        .clp-side { position: sticky; top: 84px; }

        /* ── HERO ── */
        .clp-hero {
          background: #ffffff; border: 1.5px solid #e5e7eb; border-radius: 18px;
          padding: 44px 40px; margin-bottom: 28px; overflow: hidden; position: relative;
        }
        .clp-hero-grid { position: relative; z-index: 1; display: grid; grid-template-columns: 1.1fr 1fr; gap: 36px; align-items: center; }
        .clp-hero-badge {
          display: inline-flex; align-items: center; gap: 8px;
          background: #ffffff; color: #374151; font-size: 12px; font-weight: 700;
          letter-spacing: 0.06em; text-transform: uppercase;
          padding: 7px 14px; border-radius: 999px; margin-bottom: 18px; border: 1px solid #e5e7eb;
        }
        .clp-hero h1 { font-size: 42px; line-height: 1.18; font-weight: 900; color: var(--accent); margin-bottom: 14px; }
        .clp-hero h1 em { font-style: normal; color: #111827; text-decoration: underline; text-decoration-color: var(--accent); text-underline-offset: 4px; }
        .clp-hero-sub { font-size: 15.5px; color: #374151; line-height: 1.75; margin-bottom: 24px; max-width: 520px; }
        .clp-hero-pills { display: flex; flex-wrap: wrap; gap: 10px; margin-bottom: 26px; }
        .clp-hero-pill {
          display: flex; align-items: center; gap: 8px;
          background: #fff; border: 1px solid #e5e7eb; padding: 9px 14px; border-radius: 999px;
          font-size: 13px; color: #374151; font-weight: 600;
        }
        .clp-dot { width: 7px; height: 7px; background: var(--accent); border-radius: 50%; flex-shrink: 0; }
        .clp-hero-cta { display: flex; gap: 12px; flex-wrap: wrap; }
        .clp-hero-cta-primary {
          background: var(--accent); color: #fff; border: none;
          padding: 13px 22px; border-radius: 10px; font-weight: 800; font-size: 14px; cursor: pointer; transition: all 0.3s ease;
        }
        .clp-hero-cta-primary:hover { filter: brightness(1.06); transform: translateY(-1px); }

        /* ── HERO VISUAL (doctor only) ── */
        .clp-hero-visual { position: relative; }

        /* Doctor portrait — full height, rounded, prominent */
        .clp-hero-doctor-wrap {
          border-radius: 16px; overflow: hidden;
          height: 380px; border: 2px solid #e5e7eb;
          position: relative;
        }
        .clp-hero-doctor-wrap img { width: 100%; height: 100%; object-fit: cover; object-position: top center; display: block; }

        /* Green tint overlay strip at bottom of doctor image */
        .clp-hero-doctor-overlay {
          position: absolute; bottom: 0; left: 0; right: 0;
          background: linear-gradient(to top, rgba(76,175,80,0.55) 0%, transparent 60%);
          padding: 14px 14px 12px;
          display: flex; align-items: flex-end; gap: 8px;
        }
        .clp-hero-doctor-label {
          color: #fff; font-size: 12px; font-weight: 800; line-height: 1.3;
          text-shadow: 0 1px 4px rgba(0,0,0,0.3);
        }
        .clp-hero-doctor-label span { display: block; font-size: 10px; font-weight: 600; opacity: 0.88; }

        /* ── STATS ── */
        .clp-stats { display: grid; grid-template-columns: repeat(3, 1fr); gap: 14px; margin-bottom: 28px; }
        .clp-stat { background: #fff; border: 1.5px solid #e5e7eb; border-radius: 12px; padding: 22px 16px; text-align: center; }
        .clp-stat-num { font-size: 30px; font-weight: 900; color: var(--accent); }
        .clp-stat-label { font-size: 13px; color: #6b7280; margin-top: 4px; font-weight: 600; }

        /* ── SECTIONS ── */
        .clp-section { background: #ffffff; border: 1.5px solid #e5e7eb; border-radius: 14px; padding: 34px 32px; margin-bottom: 22px; }
        .clp-section-tint { background: #ffffff; border: 1.5px solid #e5e7eb; }
        .clp-section h2 { font-size: 26px; font-weight: 900; color: var(--accent); margin-bottom: 8px; }
        .clp-section-lead { font-size: 15px; color: #6b7280; margin-bottom: 22px; line-height: 1.7; }

        /* ── WHY GRID ── */
        .clp-why-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 14px; }
        .clp-why-card {
          display: flex; gap: 14px; align-items: flex-start; padding: 18px;
          border: 1.5px solid #e5e7eb; border-radius: 10px; background: #fff; transition: all 0.3s ease;
        }
        .clp-why-card:hover { border-color: var(--accent); box-shadow: 0 4px 12px rgba(0,0,0,0.08); }
        .clp-why-icon { font-size: 26px; line-height: 1; flex-shrink: 0; }
        .clp-why-text { font-size: 14px; color: #1a1a1a; font-weight: 500; line-height: 1.6; }

        /* ── PROCESS GRID ── */
        .clp-process-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 14px; }
        .clp-process-card { background: #fff; border: 1.5px solid #e5e7eb; border-radius: 10px; padding: 22px 18px; text-align: center; transition: all 0.3s ease; }
        .clp-process-card:hover { border-color: var(--accent); box-shadow: 0 6px 16px rgba(0,0,0,0.08); }
        .clp-process-num {
          display: inline-flex; width: 42px; height: 42px;
          background: var(--accent); color: #fff; border-radius: 50%;
          align-items: center; justify-content: center; font-size: 17px; font-weight: 900; margin-bottom: 12px;
        }
        .clp-process-card h3 { font-size: 15px; font-weight: 700; color: var(--accent); margin-bottom: 8px; }
        .clp-process-card p { font-size: 13px; color: #6b7280; line-height: 1.6; }

        /* ── PHOTO GRID ── */
        .clp-img-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; margin-bottom: 24px; }
        .clp-img-grid-item { width: 100%; height: 190px; border-radius: 12px; overflow: hidden; border: 1.5px solid #e5e7eb; }
        .clp-img-grid-item img { width: 100%; height: 100%; object-fit: cover; display: block; }
        .clp-img-caption { font-size: 12px; color: #9ca3af; text-align: center; margin-top: 8px; font-weight: 500; }

        /* ── LISTS ── */
        .clp-check { list-style: none; }
        .clp-check li { display: flex; gap: 12px; margin-bottom: 13px; font-size: 14px; color: #1a1a1a; line-height: 1.6; }
        .clp-check li::before { content: "✓"; color: var(--accent); font-weight: 900; flex-shrink: 0; font-size: 16px; }
        .clp-cross { list-style: none; }
        .clp-cross li { display: flex; gap: 12px; margin-bottom: 13px; font-size: 14px; color: #6b7280; line-height: 1.6; }
        .clp-cross li::before { content: "✗"; color: #dc2626; font-weight: 900; flex-shrink: 0; font-size: 16px; }
        .clp-two { display: grid; grid-template-columns: 1fr 1fr; gap: 28px; }
        .clp-two h3 { font-size: 15px; font-weight: 700; margin-bottom: 16px; }

        /* ── COMPARE ── */
        .clp-compare { display: grid; grid-template-columns: 1fr 1fr; gap: 18px; }
        .clp-compare-col { border-radius: 12px; overflow: hidden; border: 1.5px solid #e5e7eb; }
        .clp-compare-img { height: 170px; overflow: hidden; }
        .clp-compare-img img { width: 100%; height: 100%; object-fit: cover; display: block; }
        .clp-compare-body { padding: 18px; }
        .clp-compare-body h3 { font-size: 15px; font-weight: 800; margin-bottom: 12px; color: var(--accent); }
        .clp-compare-col.bad .clp-compare-body h3 { color: #dc2626; }
        .clp-compare-col.good .clp-compare-body h3 { color: var(--accent); }
        .clp-compare-col.good { border-color: var(--accent); }

        /* ── LENS CARDS ── */
        .clp-lens-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 14px; margin-bottom: 22px; }
        .clp-lens-card { border: 1.5px solid #e5e7eb; border-radius: 10px; padding: 18px; text-align: center; }
        .clp-lens-card .lens-type { font-size: 16px; font-weight: 900; color: var(--accent); }
        .clp-lens-card .lens-note { font-size: 12.5px; color: #9ca3af; margin-top: 4px; }

        /* ── TABLE ── */
        .clp-tbl-wrap { overflow-x: auto; }
        .clp-tbl { width: 100%; border-collapse: collapse; border: 1.5px solid #e5e7eb; border-radius: 10px; overflow: hidden; }
        .clp-tbl thead { background: #ffffff; }
        .clp-tbl th { padding: 14px 16px; text-align: left; font-size: 13px; font-weight: 700; color: var(--accent); border-bottom: 2px solid #e5e7eb; }
        .clp-tbl td { padding: 14px 16px; font-size: 13px; color: #6b7280; border-bottom: 1px solid #f3f4f6; }
        .clp-tbl tr:last-child td { border-bottom: none; }

        /* ── FAQ ── */
        .clp-faq { border: 1.5px solid #e5e7eb; border-radius: 10px; margin-bottom: 10px; overflow: hidden; transition: all 0.3s ease; }
        .clp-faq.active { border-color: var(--accent); box-shadow: 0 4px 12px rgba(0,0,0,0.08); }
        .clp-faq-q {
          padding: 16px 18px; background: #ffffff; cursor: pointer; display: flex;
          justify-content: space-between; align-items: center; font-size: 14px; font-weight: 700;
          color: var(--accent); gap: 12px; border: none; width: 100%; text-align: left; transition: all 0.3s ease;
        }
        .clp-faq-icon { flex-shrink: 0; transition: transform 0.3s ease; font-size: 16px; }
        .clp-faq.active .clp-faq-icon { transform: rotate(180deg); }
        .clp-faq-a { max-height: 0; overflow: hidden; transition: max-height 0.3s ease; }
        .clp-faq.active .clp-faq-a { max-height: 400px; }
        .clp-faq-a-inner { padding: 16px 18px; font-size: 13px; color: #6b7280; line-height: 1.8; background: #fff; }

        /* ── CHIPS ── */
        .clp-chips { display: flex; flex-wrap: wrap; gap: 10px; }
        .clp-chip {
          padding: 8px 16px; border-radius: 999px; background: #ffffff; color: #374151;
          font-size: 13px; font-weight: 700; border: 1px solid #e5e7eb; transition: all 0.3s ease;
        }
        .clp-chip:hover { background: var(--accent); color: #fff; border-color: var(--accent); }

        /* ── TESTIMONIALS ── */
        .clp-testi { background: #fff; border: 1.5px solid #e5e7eb; border-radius: 10px; padding: 20px 18px; margin-bottom: 14px; transition: all 0.3s ease; }
        .clp-testi:hover { border-color: #111827; box-shadow: 0 4px 12px rgba(0,0,0,0.08); }
        .clp-testi-stars { color: #fbbf24; font-size: 14px; margin-bottom: 10px; }
        .clp-testi-quote { font-size: 13px; color: #374151; line-height: 1.7; margin-bottom: 12px; font-style: italic; }
        .clp-testi-name { font-size: 13px; font-weight: 700; color: var(--accent); }
        .clp-testi-role { font-size: 12px; color: #9ca3af; }

        /* ── CLOSING ── */
        .clp-closing {
          background: #ffffff; border: 1.5px solid #e5e7eb; border-radius: 14px;
          padding: 38px 36px; text-align: center; margin-bottom: 0;
        }
        .clp-closing h2 { font-size: 26px; font-weight: 900; margin-bottom: 10px; color: var(--accent); }
        .clp-closing p { font-size: 15px; color: #374151; margin-bottom: 22px; line-height: 1.7; }
        .clp-closing-btns { display: flex; gap: 12px; justify-content: center; flex-wrap: wrap; }
        .clp-cb-wa {
          display: flex; align-items: center; gap: 8px;
          background: var(--accent); color: #fff; text-decoration: none;
          padding: 13px 26px; border-radius: 10px; font-weight: 700; font-size: 14px; transition: all 0.3s ease;
        }
        .clp-cb-wa:hover { transform: translateY(-2px); }
        .clp-cb-screen {
          background: var(--accent); color: #fff; border: none;
          padding: 13px 26px; border-radius: 10px; font-weight: 700; font-size: 14px; cursor: pointer; transition: all 0.3s ease;
        }
        .clp-cb-screen:hover { filter: brightness(1.06); }

        /* ── LEAD CARD ── */
        .clp-lead {
          background: #ffffff; border: 1.5px solid #e5e7eb; color: #1a1a1a;
          border-radius: 16px; padding: 22px 20px; position: relative; overflow: hidden;
          box-shadow: 0 4px 16px rgba(0,0,0,0.06);
        }
        .clp-lead-content { position: relative; z-index: 1; }
        .clp-lead-eyebrow { font-size: 10px; font-weight: 800; letter-spacing: 0.1em; text-transform: uppercase; color: #6b7280; margin-bottom: 6px; }
        .clp-lead h3 { font-size: 19px; font-weight: 900; color: var(--accent); margin-bottom: 4px; line-height: 1.2; }
        .clp-lead-sub { font-size: 13px; color: #6b7280; margin-bottom: 16px; line-height: 1.5; }
        .clp-lead-field { margin-bottom: 12px; }
        .clp-lead-label { display: block; font-size: 11px; font-weight: 700; color: #6b7280; margin-bottom: 5px; text-transform: uppercase; letter-spacing: 0.05em; }
        .clp-lead-input {
          width: 100%; padding: 10px 13px; border: 1.5px solid #e5e7eb; border-radius: 8px;
          font-size: 13px; background: #fff; color: #111827; outline: none; transition: all 0.3s ease;
        }
        .clp-lead-input::placeholder { color: #9ca3af; }
        .clp-lead-input:focus { border-color: var(--accent); }
        .clp-phone-row { display: flex; align-items: center; border: 1.5px solid #e5e7eb; border-radius: 8px; overflow: hidden; background: #fff; transition: all 0.3s ease; }
        .clp-phone-row:focus-within { border-color: var(--accent); }
        .clp-phone-pre { padding: 10px 10px; font-size: 13px; color: #6b7280; border-right: 1px solid #e5e7eb; white-space: nowrap; background: #ffffff; font-weight: 600; }
        .clp-phone-row input { border: none; padding: 10px 13px; font-size: 13px; background: transparent; color: #111827; outline: none; width: 100%; }
        .clp-phone-row input::placeholder { color: #9ca3af; }
        .clp-lead-submit {
          width: 100%; padding: 12px; background: var(--accent); color: #fff;
          border: none; border-radius: 8px; font-weight: 800; font-size: 14px; cursor: pointer; margin-top: 6px; transition: all 0.3s ease;
        }
        .clp-lead-submit:hover:not(:disabled) { filter: brightness(1.06); transform: translateY(-1px); }
        .clp-lead-submit:disabled { opacity: 0.6; cursor: not-allowed; }
        .clp-lead-error { background: #fef2f2; border: 1px solid #fecaca; color: #dc2626; padding: 10px 12px; border-radius: 6px; font-size: 12px; margin-bottom: 12px; }
        .clp-lead-success { background: #ffffff; border: 1px solid var(--accent); color: var(--accent); padding: 13px; border-radius: 8px; font-size: 13px; font-weight: 700; text-align: center; }
        .clp-lead-trust { display: flex; justify-content: space-around; margin-top: 12px; font-size: 11px; color: #9ca3af; font-weight: 700; }

        /* ── FLOATING BUTTONS ── */
        .clp-fab { position: fixed; right: 20px; bottom: 26px; z-index: 300; display: flex; flex-direction: column; gap: 14px; }
        .clp-fab-btn {
          width: 56px; height: 56px; border-radius: 50%; display: flex; align-items: center; justify-content: center;
          color: #fff; box-shadow: 0 8px 22px rgba(0,0,0,0.18); position: relative; transition: transform 0.25s ease; text-decoration: none;
        }
        .clp-fab-btn:hover { transform: scale(1.08); }
        .clp-fab-wa { background: var(--accent); }
        .clp-fab-call { background: var(--accent); }
        .clp-fab-ping { position: absolute; inset: 0; border-radius: 50%; background: var(--accent); opacity: 0.55; animation: clpfabping 2.2s ease-out infinite; }
        @keyframes clpfabping { 0% { transform: scale(1); opacity: 0.5; } 100% { transform: scale(1.6); opacity: 0; } }

        /* ── MOBILE STICKY CTA ── */
        .clp-sticky-cta { display: none; }
        .clp-sticky-cta button {
          width: 100%; padding: 13px; border: none; border-radius: 10px;
          background: var(--accent); color: #fff; font-weight: 800; font-size: 14px; cursor: pointer;
        }

        /* ── FOOTER ── */
        .clp-footer { background: #ffffff; border-top: 1.5px solid #e5e7eb; color: #1a1a1a; padding: 52px 24px 24px; margin-top: 24px; }
        .clp-footer-inner { max-width: 1400px; margin: 0 auto; display: grid; grid-template-columns: 2fr 1fr 1fr 1fr; gap: 40px; margin-bottom: 32px; }
        .clp-footer-brand-logo { display: flex; align-items: center; gap: 10px; margin-bottom: 14px; }
        .clp-footer-brand-logo img { width: 180px !important; height: auto !important; object-fit: contain; }
        .clp-footer-brand p { font-size: 13px; color: #6b7280; line-height: 1.7; margin-bottom: 18px; }
        .clp-footer-wa-btn {
          display: inline-flex; align-items: center; gap: 6px; background: var(--accent);
          color: #fff; text-decoration: none; padding: 10px 16px; border-radius: 8px; font-size: 13px; font-weight: 700; transition: all 0.3s ease;
        }
        .clp-footer-wa-btn:hover { transform: translateY(-2px); }
        .clp-footer-section h4 { font-size: 12px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.08em; color: var(--accent); margin-bottom: 16px; }
        .clp-footer-section ul { list-style: none; }
        .clp-footer-section li { margin-bottom: 10px; font-size: 13px; }
        .clp-footer-section a { color: #374151; text-decoration: none; transition: color 0.3s ease; }
        .clp-footer-section a:hover { color: var(--accent); }
        .clp-footer-bottom { border-top: 1px solid #e5e7eb; padding-top: 20px; text-align: center; font-size: 12px; color: #9ca3af; max-width: 1400px; margin: 0 auto; }
        .clp-footer-bottom a { color: #6b7280; text-decoration: none; transition: color 0.3s ease; }
        .clp-footer-bottom a:hover { color: var(--accent); }

        /* ── RESPONSIVE ── */
        @media (max-width: 1024px) {
          .clp-grid { grid-template-columns: 1fr; }
          .clp-side { position: static; order: -1; }
          .clp { padding-bottom: 86px; }
          .clp-nav .clp-btn-wa, .clp-nav .clp-btn-call { display: none; }
          .clp-hero { padding: 30px 22px; }
          .clp-hero-grid { grid-template-columns: 1fr; gap: 24px; }
          .clp-hero h1 { font-size: 32px; }
          .clp-hero-doctor-wrap { height: 260px; }
          .clp-footer-inner { grid-template-columns: 1fr 1fr; }
          .clp-fab { bottom: 92px; right: 16px; }
          .clp-fab-btn { width: 50px; height: 50px; }
          .clp-sticky-cta { display: block; position: fixed; left: 0; right: 0; bottom: 0; z-index: 290; background: #fff; border-top: 1.5px solid #e5e7eb; padding: 10px 16px 14px; box-shadow: 0 -4px 16px rgba(0,0,0,0.08); }
        }

        @media (max-width: 640px) {
          .clp-page { padding: 18px 16px; }
          .clp-why-grid, .clp-process-grid, .clp-two, .clp-img-grid, .clp-compare, .clp-lens-grid { grid-template-columns: 1fr; }
          .clp-nav .clp-btn-screen { display: none; }
          .clp-section { padding: 22px 18px; }
          .clp-hero h1 { font-size: 27px; }
          .clp-lead { padding: 18px 14px; }
          .clp-lead h3 { font-size: 18px; }
          .clp-footer-inner { grid-template-columns: 1fr; gap: 24px; }
          .clp-stats { grid-template-columns: 1fr; }
          .clp-section h2 { font-size: 21px; }
          .clp-logo-img { max-height: 40px; }

        }
      `}</style>

      {/* ── HEADER ── */}
      <header className="clp-header">
        <div className="clp-header-inner">
          <a href="/" className="clp-logo">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/vv.png" alt="HealviaCare" className="clp-logo-img" />
          </a>
          <nav className="clp-nav">
            <a href={WA_URL} className="clp-btn-wa" target="_blank" rel="noopener noreferrer">
              <WaIcon size={15} /> WhatsApp
            </a>
            <a href={`tel:${PHONE_TEL}`} className="clp-btn-call">
              <PhoneIcon size={14} /> Call Us
            </a>
            <button className="clp-btn-screen" onClick={scrollToForm}>
              Free Checkup
            </button>
          </nav>
        </div>
      </header>

      {/* ── FLOATING BUTTONS ── */}
      <div className="clp-fab">
        <a href={WA_URL} target="_blank" rel="noopener noreferrer" className="clp-fab-btn clp-fab-wa" aria-label="Chat on WhatsApp">
          <span className="clp-fab-ping" />
          <WaIcon size={26} />
        </a>
        <a href={`tel:${PHONE_TEL}`} className="clp-fab-btn clp-fab-call" aria-label="Call us">
          <PhoneIcon size={22} />
        </a>
      </div>

      {/* ── CITY BAR ── */}
      <div className="clp-city-bar">
        <span className="clp-city-bar-label">Select City:</span>
        <div className="clp-city-tabs">
          {(['delhi', 'mumbai', 'gurugram', 'noida', 'ghaziabad', 'faridabad', 'pune'] as CityKey[]).map((k) => (
            <a key={k} href={`/lp/cataract/${k}`} className={`clp-city-tab${k === cityKey ? ' active' : ''}`}>
              {CITY_DATA[k].name}
            </a>
          ))}
        </div>
      </div>

      {/* ── PAGE BODY ── */}
      <div className="clp-page">
        <div className="clp-grid">

          {/* ── MAIN CONTENT ── */}
          <div className="clp-main">

            {/* HERO */}
            <section className="clp-hero">
              <div className="clp-hero-grid">
                <div>
                  <div className="clp-hero-badge">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="3" />
                      <path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7-10-7-10-7z" />
                    </svg>
                    Painless Cataract Surgery, No Stitches
                  </div>
                  <h1 dangerouslySetInnerHTML={{ __html: `${cityData.headline} <em>${cityData.headlineEm}</em>` }} />
                  <p className="clp-hero-sub">{cityData.sub}</p>
                  <div className="clp-hero-pills">
                    {['Done In 15–30 Minutes', 'No Stitches', 'See Clearly Next Day', 'Free Eye Checkup'].map((t) => (
                      <div className="clp-hero-pill" key={t}><span className="clp-dot" />{t}</div>
                    ))}
                  </div>
                  <div className="clp-hero-cta">
                    <button className="clp-hero-cta-primary" onClick={scrollToForm}>Book Free Checkup</button>
                  </div>
                </div>

                {/* ── CREATIVE DOCTOR VISUAL ── */}
                <div className="clp-hero-visual">
                  {/* Main doctor image with name overlay */}
                  <div className="clp-hero-doctor-wrap">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={IMG_HERO_DOCTOR} alt="Expert eye surgeon" />
                    <div className="clp-hero-doctor-overlay">
                      <div className="clp-hero-doctor-label">
                        Senior Eye Surgeon
                        <span>MBBS · MS Ophthalmology · 12+ yrs</span>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </section>

            {/* STATS */}
            <div className="clp-stats">
              <div className="clp-stat"><div className="clp-stat-num">15K+</div><div className="clp-stat-label">Successful Surgeries</div></div>
              <div className="clp-stat"><div className="clp-stat-num">7</div><div className="clp-stat-label">Cities Covered</div></div>
              <div className="clp-stat"><div className="clp-stat-num">98%</div><div className="clp-stat-label">Patients Satisfied</div></div>
            </div>

            {/* WHY US */}
            <section className="clp-section">
              <h2>Why People Choose Us</h2>
              <p className="clp-section-lead">We treat every patient like family. Honest advice, no rush, and a team that checks on you after surgery.</p>
              <div className="clp-why-grid">
                {[
                  { icon: '🔬', text: 'Modern phacoemulsification technique — no stitches, faster healing' },
                  { icon: '🧑‍⚕️', text: 'Senior eye surgeons with years of hands-on cataract experience' },
                  { icon: '📋', text: 'Free checkup first — we explain exactly what your eyes need before anything else' },
                  { icon: '📞', text: 'We call and check on you after surgery, not just hand you a discharge paper' },
                ].map((c, i) => (
                  <div className="clp-why-card" key={i}>
                    <span className="clp-why-icon">{c.icon}</span>
                    <span className="clp-why-text">{c.text}</span>
                  </div>
                ))}
              </div>
            </section>



            {/* WHAT IS CATARACT */}
            <section className="clp-section">
              <h2>What Is a Cataract?</h2>
              <p className="clp-section-lead">Inside your eye there is a natural lens — like a small glass disc. Normally it is perfectly clear. As you get older, this lens can slowly turn cloudy, making everything look blurry, foggy or faded. That cloudy lens is called a cataract. The fix is simple: a surgeon removes the cloudy lens and puts in a clear artificial one.</p>
              <div className="clp-img-grid">
                <div>
                  <div className="clp-img-grid-item">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={IMG_SLIT_LAMP} alt="Eye examination with slit lamp" />
                  </div>
                  <div className="clp-img-caption">Eye Examination Before Surgery</div>
                </div>
                <div>
                  <div className="clp-img-grid-item">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={IMG_SURGERY_ROOM} alt="Modern cataract surgery operation theatre" />
                  </div>
                  <div className="clp-img-caption">Our Modern Operation Theatre</div>
                </div>
              </div>
              <ul className="clp-check">
                <li>Most common reason for blindness worldwide — but also the most easily cured</li>
                <li>Develops slowly over months or years — many people don't notice until vision gets quite bad</li>
                <li>Both eyes can be affected — usually one eye is worse than the other</li>
                <li>Not caused by using your eyes too much — it's a natural part of ageing</li>
                <li>Surgery is the only cure — eye drops or glasses cannot remove a cataract</li>
              </ul>
            </section>

            {/* SIGNS OF CATARACT */}
            <section className="clp-section clp-section-tint">
              <h2>Signs You May Have a Cataract</h2>
              <p className="clp-section-lead">These are the most common warning signs. If you or a family member has any of these, a free eye checkup can confirm it quickly.</p>
              <div className="clp-two">
                <div>
                  <h3 style={{ color: 'var(--accent)' }}>Common Early Signs</h3>
                  <ul className="clp-check">
                    <li>Things look blurry or out of focus, even with your glasses on</li>
                    <li>Colours look faded, dull or slightly yellow</li>
                    <li>Bright lights feel too harsh or cause glare</li>
                    <li>Oncoming headlights at night look like starbursts</li>
                    <li>You need more light than before to read comfortably</li>
                  </ul>
                </div>
                <div>
                  <h3 style={{ color: '#dc2626' }}>Signs It Has Progressed</h3>
                  <ul className="clp-cross">
                    <li>Vision is very cloudy or foggy all the time</li>
                    <li>Double vision in one eye</li>
                    <li>You keep needing stronger glasses every few months</li>
                    <li>Difficulty recognising faces from a distance</li>
                    <li>Trouble watching TV or reading even with strong glasses</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* BEFORE vs AFTER */}
            <section className="clp-section">
              <h2>Life Before and After Cataract Surgery</h2>
              <p className="clp-section-lead">A simple picture of how life changes after treatment.</p>
              <div className="clp-compare">
                <div className="clp-compare-col bad">
                  <div className="clp-compare-img">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={IMG_ELDERLY_READING} alt="Elderly person struggling to read" />
                  </div>
                  <div className="clp-compare-body">
                    <h3>With a Cataract</h3>
                    <ul className="clp-cross">
                      <li>Blurry, foggy vision that keeps getting worse</li>
                      <li>Struggling to read, drive or recognise faces</li>
                      <li>Needing brighter lights and stronger glasses constantly</li>
                    </ul>
                  </div>
                </div>
                <div className="clp-compare-col good">
                  <div className="clp-compare-img">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={IMG_CLEAR_VISION} alt="Person with clear vision after surgery" />
                  </div>
                  <div className="clp-compare-body">
                    <h3>After Surgery</h3>
                    <ul className="clp-check">
                      <li>Sharp, clear vision — often better than before the cataract started</li>
                      <li>Back to reading, driving and daily life with confidence</li>
                      <li>Colours look vivid and bright again</li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>

            {/* HOW IT WORKS */}
            <section className="clp-section clp-section-tint">
              <h2>How Cataract Surgery Works — 3 Simple Steps</h2>
              <p className="clp-section-lead">The whole thing takes about 15–30 minutes. You stay awake but feel no pain — numbing drops are used.</p>
              <div className="clp-process-grid">
                {[
                  { n: '1', title: 'We Numb Your Eye', p: 'Eye drops are used to numb your eye completely. No injections in most cases. You are awake but relaxed and comfortable.' },
                  { n: '2', title: 'Cloudy Lens Is Removed', p: 'The surgeon makes a tiny opening and uses gentle ultrasound waves to break up and remove the cloudy lens. No stitches needed.' },
                  { n: '3', title: 'Clear Lens Is Placed In', p: 'A new clear artificial lens (called an IOL) is folded and placed inside. It unfolds and sits exactly where your natural lens was.' },
                ].map((s) => (
                  <div className="clp-process-card" key={s.n}>
                    <div className="clp-process-num">{s.n}</div>
                    <h3>{s.title}</h3>
                    <p>{s.p}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* LENS TYPES */}
            <section className="clp-section">
              <h2>Types of Lenses We Use</h2>
              <p className="clp-section-lead">After your free checkup, we'll help you choose the right lens for your eyes and your lifestyle. Here are the main options.</p>
              <div className="clp-tbl-wrap">
                <table className="clp-tbl">
                  <thead><tr><th>Lens Type</th><th>What It Does</th><th>Best For</th></tr></thead>
                  <tbody>
                    <tr><td><strong>Monofocal Lens</strong></td><td>Gives clear vision at one distance (usually far)</td><td>Most common, covered by most insurance plans</td></tr>
                    <tr><td><strong>Multifocal Lens</strong></td><td>Gives clear vision at different distances</td><td>People who want to depend less on glasses</td></tr>
                    <tr><td><strong>Toric Lens</strong></td><td>Corrects astigmatism along with the cataract</td><td>People who also have blurry/distorted vision</td></tr>
                    <tr><td><strong>Extended Depth of Focus (EDOF)</strong></td><td>Wider range of clear vision with fewer halos</td><td>Active people who want sharp vision far and mid-range</td></tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* ELIGIBILITY */}
            <section className="clp-section clp-section-tint">
              <h2>Who Can Have Cataract Surgery?</h2>
              <p className="clp-section-lead">Almost anyone with a cataract can be treated. The only way to confirm is a free eye checkup with us.</p>
              <div className="clp-two">
                <div>
                  <h3 style={{ color: 'var(--accent)' }}>✓ Usually Ready for Surgery</h3>
                  <ul className="clp-check">
                    <li>Vision is noticeably affecting daily life (reading, driving, watching TV)</li>
                    <li>No active eye infections or serious eye diseases</li>
                    <li>General health is stable (surgery is very safe even for patients in their 80s)</li>
                    <li>Cataract confirmed by a doctor during checkup</li>
                  </ul>
                </div>
                <div>
                  <h3 style={{ color: '#dc2626' }}>✗ May Need Extra Evaluation</h3>
                  <ul className="clp-cross">
                    <li>Active eye infection — must clear up first</li>
                    <li>Uncontrolled diabetes (blood sugar must be stable)</li>
                    <li>Serious cornea or retina problems — we check these first</li>
                    <li>Taking certain blood thinners — timing needs to be discussed with your doctor</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* COST & PAYMENT */}
            <section className="clp-section">
              <h2>Cost & Easy Payment Options</h2>
              <p className="clp-section-lead">The exact cost depends on which lens your eyes need. We'll give you a clear, honest price at your free checkup — no hidden charges.</p>
              <div className="clp-lens-grid">
                <div className="clp-lens-card"><div className="lens-type">0% EMI</div><div className="lens-note">No interest on monthly plans</div></div>
                <div className="clp-lens-card"><div className="lens-type">3–12 Months</div><div className="lens-note">Flexible payment durations</div></div>
                <div className="clp-lens-card"><div className="lens-type">Insurance</div><div className="lens-note">Accepted at most centres</div></div>
              </div>
              <p className="clp-section-lead" style={{ marginBottom: 0 }}>Basic lenses are very affordable and covered by many insurance plans. Premium lenses that reduce your need for glasses cost more. Ask us on WhatsApp for a price list for your city.</p>
            </section>

            {/* RISKS */}
            <section className="clp-section clp-section-tint">
              <h2>Possible Side Effects</h2>
              <p className="clp-section-lead">Cataract surgery is one of the safest surgeries in the world. Here's what to expect honestly.</p>
              <div className="clp-two">
                <div>
                  <h3>Common — Usually Clears Up On Its Own</h3>
                  <ul className="clp-check">
                    <li>Mild redness or watering for a few days</li>
                    <li>Slight blurring as the eye settles (first 24–48 hours)</li>
                    <li>Light sensitivity for the first week</li>
                    <li>Feeling of something in the eye — goes away soon</li>
                  </ul>
                </div>
                <div>
                  <h3 style={{ color: '#dc2626' }}>Rare But Possible</h3>
                  <ul className="clp-cross">
                    <li>Infection inside the eye (very rare, treatable)</li>
                    <li>Retinal detachment in rare cases</li>
                    <li>Secondary cataract — the lens covering gets hazy later, easily treated with a 5-minute laser</li>
                    <li>Glare or halos around lights — especially with multifocal lenses</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* RECOVERY */}
            <section className="clp-section">
              <h2>What Recovery Looks Like</h2>
              <p className="clp-section-lead">Most people go home the same day and are back to normal life within a week.</p>
              <div className="clp-tbl-wrap">
                <table className="clp-tbl">
                  <thead><tr><th>Time After Surgery</th><th>What to Expect</th></tr></thead>
                  <tbody>
                    <tr><td><strong>First 24 hours</strong></td><td>Vision begins to improve. Rest your eye. Avoid rubbing or pressing on it. Use the eye drops prescribed by your doctor.</td></tr>
                    <tr><td><strong>1 week</strong></td><td>Redness fades. Vision improves a lot. Most daily activities like reading and watching TV are fine.</td></tr>
                    <tr><td><strong>2–4 weeks</strong></td><td>You can go back to most normal activities. Avoid swimming, dusty environments and heavy lifting for now.</td></tr>
                    <tr><td><strong>6–8 weeks</strong></td><td>Full healing is done. Your doctor will confirm your final vision and update your glasses prescription if needed.</td></tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* FAQ */}
            <section className="clp-section clp-section-tint">
              <h2>Common Questions</h2>
              <br />
              {SHARED_FAQS.map((item, i) => (
                <div key={i} className={`clp-faq${expandedFAQ === i ? ' active' : ''}`}>
                  <button className="clp-faq-q" onClick={() => setExpandedFAQ(expandedFAQ === i ? -1 : i)}>
                    <span>{item.q}</span>
                    <span className="clp-faq-icon">▾</span>
                  </button>
                  <div className="clp-faq-a">
                    <div className="clp-faq-a-inner">{item.a}</div>
                  </div>
                </div>
              ))}
            </section>

            {/* TESTIMONIALS */}
            <section className="clp-section">
              <h2>What Patients in {cityData.name} Say</h2>
              <p className="clp-section-lead">Real stories from real patients. No sponsored reviews.</p>
              {cityData.testimonials.map((t, i) => (
                <div className="clp-testi" key={i}>
                  <div className="clp-testi-stars">★★★★★</div>
                  <p className="clp-testi-quote">&ldquo;{t.quote}&rdquo;</p>
                  <div className="clp-testi-name">{t.name}</div>
                  <div className="clp-testi-role">{t.role}</div>
                </div>
              ))}
            </section>

            {/* CLOSING */}
            <section className="clp-closing">
              <h2>{cityData.closingHeadline}</h2>
              <p>{cityData.closingSub}</p>
              <div className="clp-closing-btns">
                <a href={WA_URL} className="clp-cb-wa" target="_blank" rel="noopener noreferrer">
                  <WaIcon size={17} /> WhatsApp Us Now
                </a>
                <button className="clp-cb-screen" onClick={scrollToForm}>
                  Book Your Free Checkup
                </button>
              </div>
            </section>
          </div>

          {/* ── LEAD CARD ── */}
          <div className="clp-side">
            <div className="clp-lead" id="lead-card">
              <div className="clp-lead-content">
                <div className="clp-lead-eyebrow">🏥 {cityData.name} · Free Checkup</div>
                <h3>Book Your Free Eye Checkup</h3>
                <p className="clp-lead-sub">Drop your name & number — we'll call within 5 minutes.</p>

                <form onSubmit={handleSubmit}>
                  {error && <div className="clp-lead-error">{error}</div>}
                  <div className="clp-lead-field">
                    <label className="clp-lead-label" htmlFor="clp-name">Full Name</label>
                    <input
                      className="clp-lead-input"
                      id="clp-name"
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
                  <div className="clp-lead-field">
                    <label className="clp-lead-label" htmlFor="clp-phone">Mobile Number</label>
                    <div className="clp-phone-row">
                      <span className="clp-phone-pre">+91</span>
                      <input
                        id="clp-phone"
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
                  <button className="clp-lead-submit" type="submit" disabled={loading}>
                    {loading ? 'Booking...' : '✓ Book Free Checkup'}
                  </button>
                </form>

                <div className="clp-lead-trust">
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
      <div className="clp-sticky-cta">
        <button onClick={scrollToForm}>Book Free Checkup</button>
      </div>

      {/* ── FOOTER ── */}
      <footer className="clp-footer">
        <div className="clp-footer-inner">
          <div className="clp-footer-brand">
            <div className="clp-footer-brand-logo">
              <Image src="/vv.png" alt="Healvia" width={180} height={64} style={{ objectFit: 'contain', width: '180px', height: 'auto' }} />
            </div>
            <p>India's most trusted cataract care partner. Free checkups, honest advice, real follow-up calls. Serving 7 cities with world-class eye care.</p>
            <a href={WA_URL} className="clp-footer-wa-btn" target="_blank" rel="noopener noreferrer">
              <WaIcon size={15} /> Message on WhatsApp
            </a>
          </div>
          <div className="clp-footer-section">
            <h4>Services</h4>
            <ul>
              <li><a href="#">Phacoemulsification</a></li>
              <li><a href="#">Monofocal Lens</a></li>
              <li><a href="#">Multifocal Lens</a></li>
              <li><a href="#">Toric Lens</a></li>
            </ul>
          </div>
          <div className="clp-footer-section">
            <h4>Locations</h4>
            <ul>
              {(['delhi', 'mumbai', 'gurugram', 'noida', 'ghaziabad', 'faridabad', 'pune'] as CityKey[]).map((k) => (
                <li key={k}><a href={`/lp/cataract/${k}`}>{CITY_DATA[k].name}</a></li>
              ))}
            </ul>
          </div>
          <div className="clp-footer-section">
            <h4>Contact</h4>
            <ul>
              <li><a href={`tel:${PHONE_TEL}`}>📞 {PHONE_DISPLAY}</a></li>
              <li><a href={WA_URL} target="_blank" rel="noopener noreferrer">💬 WhatsApp</a></li>
              <li><a href="mailto:info@healviacare.com">✉️ info@healviacare.com</a></li>
            </ul>
          </div>
        </div>
        <div className="clp-footer-bottom">
          © {new Date().getFullYear()} HealviaCare. All rights reserved. &nbsp;|&nbsp;
          <a href="#">Privacy Policy</a> &nbsp;|&nbsp; <a href="#">Terms of Use</a>
        </div>
      </footer>
    </div>
  );
}