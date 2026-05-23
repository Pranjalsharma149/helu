"use client";

import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Image from "next/image";

import {
  Eye,
  Droplets,
  HeartPulse,
  Bone,
  Stethoscope,
  Hospital,
  Activity,
} from "lucide-react";

import {
  UserGroupIcon,
  ClockIcon,
  BuildingOffice2Icon,
  CurrencyRupeeIcon,
} from "@heroicons/react/24/solid";

/* ---------------- SERVICES DATA ---------------- */
const services = [
  {
    title: "LASIK Eye Surgery",
    desc: "Freedom from glasses with SMILE Pro & Contoura Vision.",
    icon: Eye,
    href: "/lasik",
    color: "bg-[#E6F7F5]",
  },
  {
    title: "Cataract Surgery",
    desc: "Micro-incision surgery with premium lens options.",
    icon: Eye,
    href: "/cataract",
    color: "bg-[#EAF2FF]",
  },
  {
    title: "Urology",
    desc: "Laser treatment for Kidney Stones & Prostate.",
    icon: Droplets,
    href: "/urology",
    color: "bg-[#FFF4E6]",
  },
  {
    title: "Vascular Surgery",
    desc: "Modern Laser treatment for Varicose Veins & DVT.",
    icon: HeartPulse,
    href: "/vascular",
    color: "bg-[#FFECEF]",
  },
  {
    title: "Orthopedics",
    desc: "Knee/Hip Replacement & Spine Surgery.",
    icon: Bone,
    href: "/orthopedics",
    color: "bg-[#F1F5FF]",
  },
  {
    title: "Gastroenterology",
    desc: "Endoscopy, Colonoscopy & Liver care.",
    icon: Stethoscope,
    href: "/gastro",
    color: "bg-[#F0FFF4]",
  },
  {
    title: "Piles (Proctology)",
    desc: "Laser treatment for Piles, Fissure, and Fistula.",
    icon: Activity,
    href: "/piles",
    color: "bg-[#F5F3FF]",
  },
  {
    title: "Internal Medicine",
    desc: "Typhoid, Dengue & General Admissions.",
    icon: Hospital,
    href: "/internalmedicine",
    color: "bg-[#FFF0F6]",
  },
];

/* ---------------- INSURANCE DATA ---------------- */
const insurancePartners = [
  "Acko General Insurance", "Aditya Birla Health Insurance", "Bajaj Allianz General Insurance",
  "Bharti AXA General Insurance", "Care Health Insurance", "Cholamandalam MS General Insurance",
  "Edelweiss General Insurance", "Future Generali India Insurance", "Go Digit General Insurance",
  "HDFC ERGO General Insurance", "ICICI Lombard General Insurance", "Kotak Mahindra General Insurance",
  "IFFCO TOKIO General Insurance", "Liberty General Insurance", "Magma HDI General Insurance",
  "Manipal Cigna Health Insurance", "Max Bupa Health Insurance", "Navi General Insurance",
  "National Insurance Company", "Reliance General Insurance", "Royal Sundaram General Insurance",
  "SBI General Insurance", "Star Health and Allied Insurance", "Tata AIG General Insurance",
  "The New India Assurance Company", "The Oriental Insurance Company", "United India Insurance Company",
  "Universal Sompo General Insurance"
];

export default function Home() {
  return (
    <>
      <style jsx global>{`
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(calc(-250px * 6)); }
        }
        .animate-scroll {
          animation: scroll 30s linear infinite;
        }
        .value-card {
          @apply flex-shrink-0 w-[250px] bg-white rounded-3xl p-8 border border-slate-100 shadow-sm text-center transition-all;
        }
        .value-card h3 { @apply font-bold text-[#1D646B] mb-2; }
        .value-card p { @apply text-slate-500 text-sm; }
        .value-card .icon { @apply text-3xl mb-4; }
        .value-card.green { @apply bg-[#F0FFF4]; }
        .value-card.light { @apply bg-[#F5F3FF]; }
      `}</style>

      <Header />

      {/* ---------------- HERO SECTION ---------------- */}
      <section className="relative w-full overflow-hidden bg-white pt-[72px] md:pt-[88px]">
        <div className="w-full h-auto flex flex-col items-center">
          <Image
            src="/her.png"
            alt="HealviaCare Banner"
            width={1920}
            height={1080}
            sizes="100vw"
            style={{
              width: '100%',
              height: 'auto',
            }}
            priority
          />
        </div>
      </section>

      {/* ---------------- SERVICES SECTION ---------------- */}
      <section className="py-12 md:py-20 bg-gradient-to-b from-white to-slate-50">
        <div className="max-w-7xl mx-auto px-6 text-center mb-10 md:mb-14">
          <h2 className="text-3xl md:text-4xl font-bold text-[#1D646B]">
            Our Specialities
          </h2>
          <p className="text-slate-500 mt-3 text-sm md:text-base">
            Advanced surgical solutions for all your medical needs
          </p>
        </div>

        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((s, i) => {
            const Icon = s.icon;
            return (
              <Link key={i} href={s.href}>
                <div className="group p-6 rounded-3xl bg-white shadow-sm border border-slate-100 hover:shadow-xl hover:-translate-y-2 transition-all duration-300 cursor-pointer flex flex-col h-full">
                  <div className={`w-14 h-14 md:w-16 md:h-16 flex items-center justify-center rounded-2xl mb-5 ${s.color} group-hover:scale-110 transition`}>
                    <Icon size={28} className="text-[#1D646B]" />
                  </div>
                  <h3 className="text-lg font-bold text-[#1D646B] mb-2">
                    {s.title}
                  </h3>
                  <p className="text-slate-500 text-sm mb-6 flex-grow">
                    {s.desc}
                  </p>
                  <div className="text-xs font-bold text-[#1D646B] uppercase">
                    Consult Now →
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* ---------------- WHY CHOOSE US (ABOUT US ANCHOR) ---------------- */}
      <section 
        id="why-choose-us" 
        className="py-16 md:py-24 px-6 lg:px-20 bg-gradient-to-b from-[#f8fbfb] to-[#eef6f6] scroll-mt-20"
      >
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-[#1D646B]">
            Why Choose HealviaCare?
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 max-w-7xl mx-auto">
          {[
            {
              title: "Expert Doctors",
              desc: "Connect with 500+ verified specialists for accurate and trusted treatment.",
              icon: <UserGroupIcon className="w-8 h-8 text-[#1D646B]" />,
            },
            {
              title: "Instant Callback",
              desc: "Get a call within 5–10 minutes and skip long waiting times.",
              icon: <ClockIcon className="w-8 h-8 text-[#1D646B]" />,
            },
            {
              title: "Trusted Hospitals",
              desc: "Partnered with NABH accredited hospitals across India.",
              icon: <BuildingOffice2Icon className="w-8 h-8 text-[#1D646B]" />,
            },
            {
              title: "Affordable Care",
              desc: "Transparent pricing with zero hidden costs.",
              icon: <CurrencyRupeeIcon className="w-8 h-8 text-[#1D646B]" />,
            },
          ].map((item, i) => (
            <div
              key={i}
              className="group relative rounded-3xl p-[2px] bg-gradient-to-br from-[#1D646B]/20 via-[#2D8E98]/20 to-[#7BC6A1]/20 hover:from-[#1D646B] hover:to-[#2D8E98] transition-all duration-500"
            >
              <div className="bg-white rounded-3xl p-6 md:p-8 text-center h-full shadow-md group-hover:shadow-[0_20px_50px_rgba(29,100,107,0.25)] transition-all duration-500 group-hover:-translate-y-2">
                <div className="w-14 h-14 md:w-16 md:h-16 mx-auto mb-6 flex items-center justify-center rounded-2xl bg-[#1D646B]/10 group-hover:bg-[#1D646B]/20 transition">
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold text-[#1D646B] mb-2 group-hover:text-[#2D8E98] transition">
                  {item.title}
                </h3>
                <p className="text-slate-500 text-sm">
                  {item.desc}
                </p>
              </div>
              <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition duration-500 blur-xl bg-[#2D8E98]/30 -z-10"></div>
            </div>
          ))}
        </div>
      </section>

      {/* ---------------- INSURANCE PARTNERS SECTION ---------------- */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[#1D646B] mb-4">
              Our Trusted Insurance Partners
            </h2>
            <p className="text-slate-500 max-w-2xl mx-auto">
              We partner with leading insurance providers to ensure you receive the best care and coverage without financial stress.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {insurancePartners.map((partner, index) => (
              <div
                key={index}
                className="group relative flex items-center justify-center p-6 bg-white border border-slate-100 rounded-2xl shadow-sm transition-all duration-300 hover:border-[#1D646B]/30 hover:-translate-y-1 cursor-default h-24 md:h-28"
              >
                <div className="absolute inset-0 rounded-2xl bg-[#F0FFF4] opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10 shadow-[0_0_25px_rgba(29,100,107,0.15)]"></div>
                <p className="text-center text-xs md:text-sm font-semibold text-slate-700 group-hover:text-[#1D646B] transition-colors duration-300">
                  {partner}
                </p>
              </div>
            ))}
          </div>
          
          <div className="mt-12 text-center">
            <p className="text-slate-400 text-xs italic">
              *All logos and names are trademarks of their respective owners.
            </p>
          </div>
        </div>
      </section>

      {/* ---------------- MISSION, VISION & VALUES SECTION ---------------- */}
      <section className="py-16 md:py-24 px-6 lg:px-20 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-[#1D646B] mb-4">Our Mission</h2>
              <p className="text-slate-600 text-lg leading-relaxed">
                At HealviaCare, our mission is to simplify the complex healthcare journey by bridging the gap between world-class surgical expertise and patients in need. We are dedicated to providing 360-degree support, ensuring every individual receives timely, compassionate, and high-quality medical attention.
              </p>
            </div>
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-[#1D646B] mb-4">Our Vision</h2>
              <p className="text-slate-600 text-lg leading-relaxed">
                We envision a future where high-end healthcare is not a luxury but a standard accessible to all. By leveraging cutting-edge medical technology and a vast network of accredited hospitals, we aim to become India's most trusted healthcare partner.
              </p>
            </div>
          </div>

          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-[#1D646B]">Our Values</h2>
            <p className="text-slate-500 mt-2">The core principles that drive our commitment to you.</p>
          </div>

          <div className="relative overflow-hidden">
            <div className="flex gap-6 w-max animate-scroll">
              <div className="value-card"><div className="icon">❤️</div><h3>Compassion</h3><p>We treat every patient with care, empathy, and respect.</p></div>
              <div className="value-card green"><div className="icon">🤝</div><h3>Trust</h3><p>We build strong relationships through honesty and reliability.</p></div>
              <div className="value-card"><div className="icon">⚡</div><h3>Efficiency</h3><p>Quick and seamless healthcare services without delays.</p></div>
              <div className="value-card light"><div className="icon">🔍</div><h3>Transparency</h3><p>No hidden costs, no confusion — just clear communication.</p></div>
              <div className="value-card"><div className="icon">🏥</div><h3>Excellence</h3><p>Top-quality treatments delivered by expert doctors.</p></div>
              <div className="value-card green"><div className="icon">💡</div><h3>Innovation</h3><p>Modern technology to improve patient outcomes.</p></div>
              {/* Loop duplicates for animation */}
              <div className="value-card"><div className="icon">❤️</div><h3>Compassion</h3><p>We treat every patient with care, empathy, and respect.</p></div>
              <div className="value-card green"><div className="icon">🤝</div><h3>Trust</h3><p>We build strong relationships through honesty and reliability.</p></div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- PATIENT EXPERIENCES (COMMENTED OUT) ---------------- */}
      {/* 
      <section className="py-16 md:py-24 px-6 lg:px-20 bg-white">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16 items-center">
          <div className="text-center lg:text-left">
            <h2 className="text-3xl md:text-4xl font-bold text-[#1D646B] mb-6">Real Patient Experiences</h2>
            <p className="text-slate-500 text-base md:text-lg mb-8 max-w-md mx-auto lg:mx-0">Hear directly from our patients about their treatment journey with HealviaCare.</p>
          </div>

          <div className="relative flex flex-row lg:flex-none items-center justify-center lg:min-h-[450px] gap-4 lg:gap-0 mt-10 lg:mt-0">
            <div className="relative w-[160px] h-[280px] md:w-[220px] md:h-[380px] lg:w-[260px] lg:h-[420px] rounded-3xl overflow-hidden shadow-xl group z-20 bg-black">
              <video 
                className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity"
                src="/VAS.mp4"
                autoPlay
                muted
                loop
                playsInline
              />
              <div className="absolute bottom-4 left-2 right-2 md:left-4 md:right-4 bg-white/70 backdrop-blur-md rounded-xl px-2 py-2 text-[10px] md:text-sm font-semibold text-[#1D646B] text-center">
                LASIK Patient Story
              </div>
            </div>
            
            <div className="relative lg:absolute bottom-0 lg:left-0 lg:-translate-x-[20%] lg:translate-y-[10%] w-[140px] h-[240px] md:w-[180px] md:h-[260px] rounded-3xl overflow-hidden shadow-lg group z-30 bg-black">
              <video 
                className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity"
                src="/VAS.mp4"
                autoPlay
                muted
                loop
                playsInline
              />
              <div className="absolute bottom-3 left-2 right-2 bg-white/70 backdrop-blur-md rounded-lg px-2 py-1 text-[10px] md:text-xs font-semibold text-[#1D646B] text-center">
                Piles Patient Story
              </div>
            </div>
          </div>
        </div>
      </section>
      */}

      <div className="relative bg-white">
        {/* ---------------- DYNAMIC FAQ SECTION ---------------- */}
        <section className="py-24 px-6 lg:px-20 bg-white overflow-hidden">
          <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-16">
            
            {/* Left Side: Sticky Brand Trust (4 Cols) */}
            <div className="lg:col-span-4 lg:sticky lg:top-32 h-fit">
              <div className="bg-[#1D646B] rounded-[40px] p-10 text-white relative overflow-hidden shadow-2xl">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-3xl"></div>
                
                <h2 className="text-4xl font-black mb-6 leading-tight">
                  Common <br /> 
                  <span className="text-teal-300">Doubts?</span>
                </h2>
                <p className="text-teal-50/80 mb-8 leading-relaxed">
                  We understand that surgery is a big decision. Here are the facts to help you choose with confidence.
                </p>
                
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-teal-400/20 flex items-center justify-center text-teal-300">✓</div>
                    <span className="text-sm font-bold">Verified Surgeons</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-teal-400/20 flex items-center justify-center text-teal-300">✓</div>
                    <span className="text-sm font-bold">0% EMI Options</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side: Interactive Accordion (8 Cols) */}
            <div className="lg:col-span-8 space-y-4">
              {[
                {
                  q: "Is the first consultation really free?",
                  a: "Yes! At HealviaCare, your initial consultation with our medical experts is 100% free. We aim to help you understand your condition without any financial pressure.",
                },
                {
                  q: "Will you handle my insurance paperwork?",
                  a: "Completely. Our dedicated Care Managers coordinate directly with your insurance provider (TPA) for cashless approvals, usually in under 30 minutes.",
                },
                {
                  q: "What is the typical waiting time for surgery?",
                  a: "We prioritize efficiency. Once diagnosed, surgeries are typically scheduled within 24 to 48 hours at a premium hospital near you.",
                },
                {
                  q: "Are the hospitals NABH accredited?",
                  a: "Yes, we only partner with top-tier premium hospitals that meet the highest safety, hygiene, and luxury standards in India.",
                },
                {
                  q: "How does the Zero-Cost EMI work?",
                  a: "You can split your surgery cost into 6, 9, or 12 monthly installments. There is 0% interest and no hidden processing fees.",
                },
                {
                  q: "Do I get support after the surgery?",
                  a: "Yes. From diet plans to follow-up checkups with the surgeon, your Care Manager stays with you until you are 100% recovered.",
                },
              ].map((item, i) => (
                <details
                  key={i}
                  className="group border-b border-slate-100 bg-slate-50/50 rounded-3xl transition-all duration-500 open:bg-white open:shadow-[0_20px_40px_rgba(29,100,107,0.08)] open:border-teal-100"
                >
                  <summary className="flex items-center justify-between p-8 cursor-pointer list-none">
                    <div className="flex items-center gap-6">
                      <span className="text-slate-300 font-black text-2xl group-open:text-teal-500 transition-colors">
                        0{i + 1}
                      </span>
                      <span className="text-lg md:text-xl font-bold text-slate-700 group-open:text-[#1D646B] transition-colors">
                        {item.q}
                      </span>
                    </div>
                    <div className="w-10 h-10 rounded-xl bg-white shadow-sm border border-slate-100 flex items-center justify-center group-open:bg-[#1D646B] group-open:text-white transition-all duration-500">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="transition-transform duration-500 group-open:rotate-45"
                      >
                        <line x1="12" y1="5" x2="12" y2="19"></line>
                        <line x1="5" y1="12" x2="19" y2="12"></line>
                      </svg>
                    </div>
                  </summary>
                  <div className="px-8 pb-8 ml-14 text-slate-500 text-base leading-relaxed animate-in fade-in slide-in-from-top-4">
                    <p className="max-w-2xl">{item.a}</p>
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>
      </div>

      {/* ---------------- CTA SECTION ---------------- */}
      <section 
        id="talk-to-specialist"
        className="relative py-20 md:py-28 px-6 lg:px-20 overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-[#0F3D3E] via-[#145A5C] to-[#1D646B]"></div>
        <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-[#0F3D3E]/80 to-transparent"></div>
        <div className="relative z-10 max-w-5xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Talk to a Specialist Today</h2>
          <p className="text-base md:text-lg text-white/80 mb-10">Get expert guidance for the right treatment from trusted doctors.</p>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 md:gap-6 mb-10">
            <Link href="/book-now" className="w-full sm:w-auto">
              <button className="w-full px-10 py-4 rounded-xl bg-gradient-to-r from-[#1D646B] to-[#3BA99C] text-white font-semibold shadow-xl hover:scale-105 transition">
                Book Free Consultation
              </button>
            </Link>
            <a href="tel:8882804301" className="w-full sm:w-auto">
              <button className="w-full px-10 py-4 rounded-xl bg-black/40 backdrop-blur-md text-white font-semibold shadow-xl hover:scale-105 transition">
                Call Now: 8882804301
              </button>
            </a>
          </div>
          <p className="text-white/70 text-xs md:text-sm tracking-wide">
            No cost consultation&nbsp;&nbsp;|&nbsp;&nbsp;Quick response&nbsp;&nbsp;|&nbsp;&nbsp;100% assistance
          </p>
        </div>
      </section>

      <Footer />
    </>
  );
}