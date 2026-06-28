// lib/cataract-city-data.ts
// Place this file at: lib/cataract-city-data.ts (or wherever your lib folder is)
//
// Design: ONE shared content template. The only thing that changes
// per city is the city name itself, which gets substituted wherever
// the {city} token appears. No city-specific areas/testimonials —
// just the same content with the name swapped in.
//
// Language note: every line below has been simplified so it's easy to
// understand for a general reader — short sentences, plain everyday
// words, no medical jargon (no "IOL", "toric", "minimally invasive", etc).

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
  headline: "See Clearly Again In {city} —",
  headlineEm: "no more cloudy vision",
  sub:
    "Cataract surgery by experienced, trusted eye doctors. It's a quick, painless procedure, and most people see a big improvement within 24 hours. Trusted cataract care in {city}.",
  closingHeadline: "Want To See {city} Clearly Again?",
  closingSub:
    "Book a free eye checkup at our {city} centre. No pressure to buy anything — we'll simply tell you clearly if surgery will help your eyes.",
  areasTitle: "We Help Patients All Over {city}",
  areasLead:
    "We plan your checkup and follow-up visits around your travel time — no matter which part of {city} you're coming from.",
  areas: ["City Centre", "North {city}", "South {city}", "East {city}", "West {city}", "Old Town", "New Town", "Suburbs"],
  testimonials: [
    {
      quote:
        "I thought blurry, yellowish vision was just a normal part of growing old. After the surgery, I can see clearly again — I don't need to hold things far away to read anymore.",
      name: "Rajesh G.",
      role: "Retired Government Officer, {city}",
    },
    {
      quote:
        "The doctor checked my eyes carefully and explained, in simple words, why my vision was getting worse. The surgery itself did not hurt, and I recovered faster than I expected.",
      name: "Meera C.",
      role: "Homemaker, {city}",
    },
    {
      quote:
        "Driving at night had become scary because everything looked hazy. Now I drive with confidence again — my vision is so clear.",
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
  {
    q: "Is cataract surgery painful?",
    a: "No. We use numbing eye drops, so you won't feel pain during the 15-minute surgery. You may feel a little pressure, but not pain. Some mild discomfort or light sensitivity for a day or two afterward is normal.",
  },
  {
    q: "Is this surgery right for me?",
    a: "If blurry vision is making it hard for you to read, drive, or watch TV, this surgery can likely help. Your free checkup will tell you for sure — no guessing.",
  },
  {
    q: "How much does cataract surgery cost?",
    a: "It depends on the type of lens you choose. After your free checkup, we'll give you one clear price, with nothing hidden or added later.",
  },
  {
    q: "Which lens should I choose?",
    a: "This depends on your eyes and your daily routine. Our team will explain the lens options in simple words and suggest what suits you best — not the most expensive one.",
  },
  {
    q: "How soon can I go back to work?",
    a: "Most people go back to desk work in 3–5 days. Other normal activities — except swimming and heavy exercise — can usually start again in 1–2 weeks. Your doctor will give you a plan made for you.",
  },
  {
    q: "Do you see patients from all areas?",
    a: "Yes — we see patients from every part of the city and nearby areas. We can plan your checkup and follow-up visits to fit around your travel.",
  },
];