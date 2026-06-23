// lib/lasik-city-data.ts
// Place this file at: lib/lasik-city-data.ts (or wherever your lib folder is)

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

export const CITY_DATA: Record<CityKey, CityData> = {
  delhi: {
    name: "Delhi",
    headline: "See Delhi like it was always",
    headlineEm: "meant to be seen",
    sub: "Advanced LASIK from fellowship-trained ophthalmologists — no injections, no stitches. Most patients in Delhi wake up to clear vision the very next morning.",
    closingHeadline: "Ready to see Delhi without reaching for your glasses?",
    closingSub: "Book a free eye screening at our Delhi centre. No obligation — just clarity on whether LASIK is right for you.",
    areas: ["Connaught Place", "Dwarka", "Rohini", "Lajpat Nagar", "Janakpuri", "Vasant Kunj", "Saket", "Pitampura"],
    areasTitle: "Serving patients across Delhi NCR",
    areasLead: "Screenings and follow-ups are scheduled around your commute, wherever in Delhi you're coming from.",
    testimonials: [
      { quote: "After years of struggling with glasses in Delhi's pollution, LASIK changed everything. I can see the skyline from India Gate perfectly now.", name: "Rahul M.", role: "Software Engineer, Dwarka" },
      { quote: "The screening team was extremely honest — they told me Contoura suited my eyes better than standard LASIK. That trust meant everything.", name: "Priya S.", role: "Teacher, Rohini" },
      { quote: "Follow-up calls from the Delhi centre made me feel genuinely cared for, not just another patient.", name: "Amit K.", role: "Marketing Manager, Saket" },
    ],
    formSource: "lasik-delhi-lp",
  },
  mumbai: {
    name: "Mumbai",
    headline: "See Mumbai from the",
    headlineEm: "sea link to the skyline",
    sub: "Advanced LASIK from fellowship-trained ophthalmologists — no injections, no stitches. Most patients in Mumbai wake up to clear vision the very next morning.",
    closingHeadline: "Ready to see Mumbai without reaching for your glasses?",
    closingSub: "Book a free eye screening at our Mumbai centre. No obligation — just clarity on whether LASIK is right for you.",
    areas: ["Bandra", "Andheri", "Powai", "Worli", "Borivali", "Thane", "Dadar", "Lower Parel"],
    areasTitle: "Serving patients across Mumbai & suburbs",
    areasLead: "Screenings are scheduled around your local train and commute, wherever in Mumbai you're based.",
    testimonials: [
      { quote: "Commuting on the local every day with glasses was a nightmare. LASIK changed my entire Mumbai life.", name: "Sneha T.", role: "Finance Analyst, Bandra" },
      { quote: "Sea breeze, no glasses fogging up. I didn't realise how much I was missing until after the procedure.", name: "Rohan D.", role: "Architect, Powai" },
      { quote: "Completely transparent pricing — no surprise charges added after the screening. Rare in Mumbai.", name: "Kavita N.", role: "HR Manager, Andheri" },
    ],
    formSource: "lasik-mumbai-lp",
  },
  gurugram: {
    name: "Gurugram",
    headline: "See Gurugram's skyline the way",
    headlineEm: "it deserves to be seen",
    sub: "Advanced LASIK from fellowship-trained ophthalmologists — no injections, no stitches. Most patients in Gurugram wake up to clear vision the very next morning.",
    closingHeadline: "Ready to see Gurugram without reaching for your glasses?",
    closingSub: "Book a free eye screening at our Gurugram centre. No obligation — just clarity on whether LASIK is right for you.",
    areas: ["DLF Phase 1–5", "Sohna Road", "Golf Course Road", "Sector 29", "Cyber City", "South City", "MG Road", "Palam Vihar"],
    areasTitle: "Serving patients across Gurugram",
    areasLead: "Screenings fit around your work schedule — we know Gurugram runs on tight timelines.",
    testimonials: [
      { quote: "Working long hours in Cyber City with dry eyes from screens and glasses was draining. Post-LASIK life is genuinely easier.", name: "Nisha G.", role: "Product Manager, Cyber City" },
      { quote: "Straightforward, honest advice — they didn't try to upsell me something I didn't need.", name: "Vikram S.", role: "Consultant, Golf Course Road" },
      { quote: "The whole process from screening to recovery felt smooth and looked after. Very professional centre.", name: "Aisha M.", role: "Entrepreneur, DLF Phase 3" },
    ],
    formSource: "lasik-gurugram-lp",
  },
  noida: {
    name: "Noida",
    headline: "See Noida's new skyline the way",
    headlineEm: "it was always meant to look",
    sub: "Advanced LASIK from fellowship-trained ophthalmologists — no injections, no stitches. Most patients in Noida wake up to clear vision the very next morning.",
    closingHeadline: "Ready to see Noida without reaching for your glasses?",
    closingSub: "Book a free eye screening at our Noida centre. No obligation — just clarity on whether LASIK is right for you.",
    areas: ["Sector 18", "Sector 62", "Sector 50", "Greater Noida", "Sector 137", "Expressway", "Sector 76", "Sector 44"],
    areasTitle: "Serving patients across Noida & Greater Noida",
    areasLead: "Screenings are scheduled around your Metro commute, wherever in Noida you're based.",
    testimonials: [
      { quote: "Long screen hours at my Sector 62 office made glasses unbearable. LASIK was the best investment I've made for myself.", name: "Deepak R.", role: "IT Consultant, Sector 62" },
      { quote: "Very honest team — they explained every step of my screening and never rushed me into a decision.", name: "Sneha P.", role: "Graphic Designer, Sector 50" },
      { quote: "Quick recovery, great follow-up support. Back to work in two days without any issues.", name: "Kartik S.", role: "Finance Analyst, Greater Noida" },
    ],
    formSource: "lasik-noida-lp",
  },
  ghaziabad: {
    name: "Ghaziabad",
    headline: "See Ghaziabad clearly —",
    headlineEm: "every detail, every day",
    sub: "Advanced LASIK from fellowship-trained ophthalmologists — no injections, no stitches. Most patients in Ghaziabad wake up to clear vision the very next morning.",
    closingHeadline: "Ready to see Ghaziabad without reaching for your glasses?",
    closingSub: "Book a free eye screening at our Ghaziabad centre. No obligation — just clarity on whether LASIK is right for you.",
    areas: ["Indirapuram", "Vaishali", "Raj Nagar Extension", "Kaushambi", "Vasundhara", "Mohan Nagar", "Crossings Republik", "Siddharth Vihar"],
    areasTitle: "Serving patients across Ghaziabad",
    areasLead: "Screenings are scheduled around your commute from any part of Ghaziabad or nearby NCR.",
    testimonials: [
      { quote: "Commuting daily from Indirapuram with glasses was exhausting. After LASIK, mornings feel completely different.", name: "Ritu M.", role: "School Teacher, Indirapuram" },
      { quote: "I was nervous about the procedure but the team explained everything so clearly. Completely painless.", name: "Mohit S.", role: "Bank Officer, Vaishali" },
      { quote: "Best decision for my health in years. Follow-up care was excellent and very timely.", name: "Anjali K.", role: "HR Executive, Raj Nagar Extension" },
    ],
    formSource: "lasik-ghaziabad-lp",
  },
  faridabad: {
    name: "Faridabad",
    headline: "See Faridabad with",
    headlineEm: "complete clarity",
    sub: "Advanced LASIK from fellowship-trained ophthalmologists — no injections, no stitches. Most patients in Faridabad wake up to clear vision the very next morning.",
    closingHeadline: "Ready to see Faridabad without reaching for your glasses?",
    closingSub: "Book a free eye screening at our Faridabad centre. No obligation — just clarity on whether LASIK is right for you.",
    areas: ["Sector 15", "Sector 21", "NIT Faridabad", "Old Faridabad", "Sector 28", "Sector 46", "Ballabhgarh", "Neharpar"],
    areasTitle: "Serving patients across Faridabad",
    areasLead: "Screenings are scheduled at your convenience — we know Faridabad's commute can be demanding.",
    testimonials: [
      { quote: "I had been postponing LASIK for years. The team at this centre made the whole process easy and stress-free.", name: "Sanjay T.", role: "Factory Supervisor, Ballabhgarh" },
      { quote: "Affordable, clear pricing — no tricks. Exactly what I needed before committing to surgery.", name: "Pooja R.", role: "Accountant, NIT Faridabad" },
      { quote: "Vision cleared up the very next morning. Still feels like a miracle every time I wake up.", name: "Harish K.", role: "Teacher, Sector 21" },
    ],
    formSource: "lasik-faridabad-lp",
  },
  pune: {
    name: "Pune",
    headline: "See Pune like it's just",
    headlineEm: "stopped raining",
    sub: "Advanced LASIK from fellowship-trained ophthalmologists — no injections, no stitches. Most patients in Pune wake up to clear vision the very next morning.",
    closingHeadline: "Ready to see Pune without reaching for your glasses?",
    closingSub: "Book a free eye screening at our Pune centre. No obligation — just clarity on whether LASIK is right for you.",
    areas: ["Koregaon Park", "Kothrud", "Viman Nagar", "Hinjewadi", "Baner", "Camp", "Aundh", "Hadapsar"],
    areasTitle: "Serving all of Pune, not just one neighbourhood",
    areasLead: "Screenings and follow-ups are scheduled around your commute, wherever in Pune you're coming from.",
    testimonials: [
      { quote: "Riding to Hinjewadi without glasses fogging up in the monsoon still feels new. Best decision I've made.", name: "Onkar P.", role: "Marketing Manager, Baner" },
      { quote: "The screening was honest about which technology suited my prescription instead of pushing the priciest option.", name: "Maithili R.", role: "Architect, Koregaon Park" },
      { quote: "Follow-up calls after my recovery made the whole thing feel looked-after, not just a one-time appointment.", name: "Vivek S.", role: "Lecturer, Kothrud" },
    ],
    formSource: "lasik-pune-lp",
  },
};

export const SHARED_FAQS = [
  { q: "Is LASIK painful?", a: "No. Numbing drops are used throughout, so the 15-minute procedure is generally painless. Mild dryness or light sensitivity for a day or two afterward is normal." },
  { q: "Am I a good candidate for LASIK?", a: "Most adults with stable vision and healthy corneas qualify. Your free screening checks corneal thickness, prescription stability, and overall eye health." },
  { q: "How much does LASIK cost?", a: "It depends on your prescription and the technology used. You'll get one clear, itemised quote after your screening — no hidden charges added later." },
  { q: "Which technology is right for me — LASIK, Contoura, or SMILE?", a: "It depends on your corneal thickness and prescription. The screening team walks you through which option fits your eyes, not just what's newest or most expensive." },
  { q: "How soon can I go back to work?", a: "Most patients return to desk-based work within a day or two, and to driving once the surgeon confirms your vision has stabilised at follow-up." },
  { q: "Do you serve patients across the city?", a: "Yes — we see patients from across the city and surrounding areas. Scheduling can work around your commute." },
];