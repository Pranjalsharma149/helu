"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { MapPin, Star, Hotel, ShieldCheck, ArrowRight } from "lucide-react";

const allHospitals = [
  {
    id: 1,
    name: "HealviaCare Super Specialty",
    city: "Delhi",
    area: "Greater Kailash",
    specialties: ["LASIK", "Cataract", "Urology"],
    rating: 5.0,
    img: "https://images.unsplash.com/photo-1587350859728-117699f4a1ec?q=80&w=600",
    beds: "100+ Beds",
  },
  {
    id: 2,
    name: "Elite Vision & Surgical Centre",
    city: "Mumbai",
    area: "Andheri West",
    specialties: ["Ophthalmology", "Vascular"],
    rating: 4.9,
    img: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=600",
    beds: "50+ Beds",
  },
  {
    id: 3,
    name: "HealviaCare Laser Clinic",
    city: "Pune",
    area: "Koregaon Park",
    specialties: ["Urology", "Gastroenterology"],
    rating: 4.8,
    img: "https://images.unsplash.com/photo-1512678080530-7760d81faba6?q=80&w=600",
    beds: "30+ Beds",
  },
  {
    id: 4,
    name: "City Multispecialty Hospital",
    city: "Ahmedabad",
    area: "Navrangpura",
    specialties: ["Orthopedics", "Neurology"],
    rating: 4.7,
    img: "https://images.unsplash.com/photo-1632833232227-023a1050800b?q=80&w=600",
    beds: "150+ Beds",
  },
  {
    id: 5,
    name: "Regency Surgical Institute",
    city: "Bangalore",
    area: "Indiranagar",
    specialties: ["General Surgery", "Internal Medicine"],
    rating: 4.9,
    img: "https://images.unsplash.com/photo-1516549655169-df83a0774514?q=80&w=600",
    beds: "80+ Beds",
  },
  {
    id: 6,
    name: "Metro Laser Hub",
    city: "Surat",
    area: "Vesu",
    specialties: ["Vascular", "Urology"],
    rating: 4.8,
    img: "https://images.unsplash.com/photo-1504813184591-01572f98c85f?q=80&w=600",
    beds: "40+ Beds",
  }
];

const cities = ["All", "Delhi", "Mumbai", "Pune", "Ahmedabad", "Surat", "Bangalore"];

export default function HospitalsPageClient() {
  const [filter, setFilter] = useState("All");

  const filteredHospitals = filter === "All" 
    ? allHospitals 
    : allHospitals.filter(h => h.city === filter);

  return (
    <>
      <Header />
      
      <main className="pt-32 pb-20 bg-white min-h-screen">
        <div className="max-w-7xl mx-auto px-6">
          
          {/* --- PAGE TITLE --- */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-50 text-emerald-700 text-xs font-black uppercase tracking-widest mb-4">
              <ShieldCheck size={14} /> NABH Accredited Network
            </div>
            <h1 className="text-5xl lg:text-6xl font-black text-slate-900 mb-6 tracking-tight">
              Our Partner <span className="text-[#1D646B]">Hospitals.</span>
            </h1>
            <p className="text-slate-500 max-w-2xl mx-auto text-lg leading-relaxed">
              We partner exclusively with top-tier facilities to ensure 
              the highest standards of surgical safety and clinical excellence.
            </p>
          </div>

          {/* --- CITY FILTER --- */}
          <div className="flex flex-wrap justify-center gap-3 mb-16">
            {cities.map((city) => (
              <button
                key={city}
                onClick={() => setFilter(city)}
                className={`px-8 py-3 rounded-2xl font-bold transition-all duration-300 shadow-sm border ${
                  filter === city
                    ? "bg-[#1D646B] text-white border-[#1D646B] shadow-xl shadow-teal-900/20 scale-105"
                    : "bg-white text-slate-500 border-slate-100 hover:border-teal-200 hover:text-[#1D646B]"
                }`}
              >
                {city}
              </button>
            ))}
          </div>

          {/* --- HOSPITALS GRID --- */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {filteredHospitals.map((hospital) => (
              <div 
                key={hospital.id} 
                className="bg-white rounded-[40px] overflow-hidden border border-slate-100 shadow-sm hover:shadow-2xl transition-all duration-500 group"
              >
                {/* Image Section */}
                <div className="relative h-72 overflow-hidden">
                  <Image 
                    src={hospital.img} 
                    alt={hospital.name} 
                    fill 
                    className="object-cover group-hover:scale-110 transition-transform duration-1000"
                  />
                  <div className="absolute top-6 right-6 bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-2xl text-[#1D646B] font-black text-xs shadow-xl flex items-center gap-1">
                    <Star size={14} className="fill-yellow-400 text-yellow-400" /> {hospital.rating}
                  </div>
                  <div className="absolute bottom-6 left-6 bg-[#1D646B] text-white px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest">
                    {hospital.city}
                  </div>
                </div>

                {/* Content Section */}
                <div className="p-10">
                  <h3 className="text-2xl font-black text-slate-900 mb-3 group-hover:text-[#1D646B] transition-colors leading-tight">
                    {hospital.name}
                  </h3>
                  <p className="text-slate-400 text-sm mb-6 flex items-center gap-2 font-medium">
                    <MapPin size={16} className="text-teal-500" /> {hospital.area}, {hospital.city}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-8">
                    {hospital.specialties.map((spec, idx) => (
                      <span 
                        key={idx} 
                        className="bg-slate-50 text-slate-600 text-[10px] font-bold uppercase px-3 py-1.5 rounded-lg border border-slate-100"
                      >
                        {spec}
                      </span>
                    ))}
                  </div>

                  <div className="pt-8 border-t border-slate-50 flex items-center justify-between">
                    <div className="flex items-center gap-2 text-slate-500 font-bold text-xs uppercase tracking-tighter">
                      <Hotel size={16} className="text-slate-300" /> {hospital.beds}
                    </div>
                    <Link 
                      href="/book-now" 
                      className="bg-[#1D646B] text-white p-3 rounded-2xl hover:bg-[#155a60] transition-all group/btn"
                    >
                      <ArrowRight size={20} className="group-hover/btn:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* --- EMPTY STATE --- */}
          {filteredHospitals.length === 0 && (
            <div className="text-center py-32 bg-slate-50 rounded-[40px] border border-dashed border-slate-200">
              <p className="text-slate-400 text-xl font-bold">New hospitals coming soon to {filter}!</p>
              <Link href="/hospitals" onClick={() => setFilter("All")} className="text-[#1D646B] font-bold mt-4 inline-block hover:underline">
                View all locations
              </Link>
            </div>
          )}

        </div>
      </main>

      <Footer />
    </>
  );
}