// lib/cataract-city-data.ts
// Place this file at: lib/cataract-city-data.ts (or wherever your lib folder is)
//
// Design: ONE shared content template. The only thing that changes
// per city is the city name itself, which gets substituted wherever
// the {city} token appears. No city-specific areas/testimonials —
// just the same content with the name swapped in.

export type CityKey = "delhi" | "mumbai" | "gurugram" | "noida" | "ghaziabad" | "faridabad" | "pune";

export interface CityData {
  name: string;
  headline: string;
  headlineEm: string; // the <em> part
  sub: string;
  closingHeadline: string;
  closingSub: string;
  areas: string[];
  areasTitle: string;
  areasLead: string;
  testimonials: { quote: string; name: string; role: string }[];
  formSource: string;
}

// ---- Shared template (single source of truth) ----
// Use {city} anywhere the city name should be inserted.

const TEMPLATE = {
  headline: "Clear vision again in {city} —",
  headlineEm: "without the cloudy haze",
  sub:
    "Advanced cataract surgery from fellowship-trained ophthalmologists — minimally invasive, painless, and most patients see dramatic improvement within 24 hours. {city}'s trusted cataract care.",
  closingHeadline: "Ready to see {city} clearly again?",
  closingSub:
    "Book a free eye screening at our {city} centre. No obligation — just a clear diagnosis of whether cataract surgery is right for you.",
  areasTitle: "Serving patients across {city}",
  areasLead:
    "Screenings and post-operative follow-ups are scheduled around your commute, wherever in {city} you're coming from.",
  areas: ["City Centre", "North {city}", "South {city}", "East {city}", "West {city}", "Old Town", "New Town", "Suburbs"],
  testimonials: [
    {
      quote:
        "I thought blurred vision and a yellow tint was just part of getting older. The surgery gave me my sight back — I can read without holding things at arm's length again.",
      name: "Rajesh G.",
      role: "Retired Government Officer, {city}",
    },
    {
      quote:
        "The screening was thorough and the surgeon explained exactly what was causing my vision loss. The procedure itself was painless and recovery was faster than expected.",
      name: "Meera C.",
      role: "Homemaker, {city}",
    },
    {
      quote:
        "Night driving had become dangerous because of the haze. Now I drive confidently again — the clarity is incredible.",
      name: "Suresh M.",
      role: "Business Owner, {city}",
    },
  ],
};

// ---- City names + form sources only ----

const CITIES: Record<CityKey, { name: string; formSource: string }> = {
  delhi: { name: "Delhi", formSource: "cataract-delhi-lp" },
  mumbai: { name: "Mumbai", formSource: "cataract-mumbai-lp" },
  gurugram: { name: "Gurugram", formSource: "cataract-gurugram-lp" },
  noida: { name: "Noida", formSource: "cataract-noida-lp" },
  ghaziabad: { name: "Ghaziabad", formSource: "cataract-ghaziabad-lp" },
  faridabad: { name: "Faridabad", formSource: "cataract-faridabad-lp" },
  pune: { name: "Pune", formSource: "cataract-pune-lp" },
};

// ---- Helper: fill {city} token, build full CityData ----

function fill(str: string, city: string): string {
  return str.replace(/\{city\}/g, city);
}

function buildCityData(name: string, formSource: string): CityData {
  return {
    name,
    headline: fill(TEMPLATE.headline, name),
    headlineEm: TEMPLATE.headlineEm,
    sub: fill(TEMPLATE.sub, name),
    closingHeadline: fill(TEMPLATE.closingHeadline, name),
    closingSub: fill(TEMPLATE.closingSub, name),
    areas: TEMPLATE.areas.map((a) => fill(a, name)),
    areasTitle: fill(TEMPLATE.areasTitle, name),
    areasLead: fill(TEMPLATE.areasLead, name),
    testimonials: TEMPLATE.testimonials.map((t) => ({ ...t, role: fill(t.role, name) })),
    formSource,
  };
}

export const CITY_DATA: Record<CityKey, CityData> = Object.fromEntries(
  (Object.keys(CITIES) as CityKey[]).map((key) => [key, buildCityData(CITIES[key].name, CITIES[key].formSource)])
) as Record<CityKey, CityData>;

export const SHARED_FAQS = [
  { q: "Is cataract surgery painful?", a: "No. Numbing drops are used throughout, so the 15-minute procedure is painless. You may feel mild pressure, but no pain. Some mild discomfort or light sensitivity for a day or two afterward is normal." },
  { q: "Am I a good candidate for cataract surgery?", a: "If your cataract is affecting your daily activities (reading, driving, watching TV), you're likely a good candidate. Your free screening evaluates your eye health and confirms if surgery will help." },
  { q: "How much does cataract surgery cost?", a: "It depends on the lens technology you choose (standard IOL, premium IOL for astigmatism correction, or multifocal). You'll get one clear, itemised quote after your screening — no hidden charges added later." },
  { q: "Which lens is right for me — standard IOL, toric, or multifocal?", a: "It depends on your prescription, astigmatism, and lifestyle. The screening team explains which lens gives you the best vision for your daily activities — not the most expensive option." },
  { q: "How soon can I go back to work?", a: "Most patients return to desk-based work within 3–5 days, and to normal activities (except water exposure and strenuous exercise) within 1–2 weeks. Your surgeon will give you a personalised timeline." },
  { q: "Do you serve patients across the city?", a: "Yes — we see patients from across the city and surrounding areas. Screening appointments and post-surgery follow-ups can work around your commute." },
];