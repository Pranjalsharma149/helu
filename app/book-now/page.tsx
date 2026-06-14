"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { CheckCircle2, Loader2 } from "lucide-react";

export default function BookNowPage() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    city: "",
    service: "",
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase
        .from("leads")
        .insert([
          {
            name: form.name,
            phone: form.phone,
            city: form.city,
            service: form.service,
            status: "New",
          },
        ]);

      if (error) throw error;
      setSubmitted(true);
      setForm({ name: "", phone: "", city: "", service: "" });
    } catch (error: any) {
      alert("Error: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <>
        <Header />
        <div className="min-h-screen flex items-center justify-center bg-[#f5fbfb] px-6">
          <div className="bg-white p-10 rounded-[40px] shadow-2xl text-center max-w-md w-full border border-teal-100">
            <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 size={40} />
            </div>
            <h2 className="text-3xl font-bold text-[#1D646B] mb-3">Booking Confirmed!</h2>
            <p className="text-slate-600 mb-8">Our medical coordinator will contact you within 5–10 minutes.</p>
            <button
              onClick={() => setSubmitted(false)}
              className="w-full bg-[#1D646B] text-white px-6 py-4 rounded-2xl font-bold hover:bg-[#155055] transition"
            >
              Book Another Consultation
            </button>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-br from-[#e6f4f5] via-white to-[#d4eeed] flex items-center justify-center px-4 pt-24 pb-12">
        <div className="w-full max-w-lg bg-white rounded-[40px] shadow-2xl p-10 border border-slate-200">

          <div className="text-center mb-10">
            <h2 className="text-4xl font-black text-[#1D646B] mb-3">Free Consultation</h2>
            <p className="text-slate-600 text-sm font-medium">Take the first step towards your recovery today.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">

            {/* Full Name */}
            <div>
              <label className="block text-xs font-black text-slate-700 uppercase tracking-widest mb-2 ml-1">
                Full Name
              </label>
              <input
                type="text"
                name="name"
                placeholder=""
                value={form.name}
                onChange={handleChange}
                required
                className="w-full p-4 bg-slate-100 border border-slate-300 rounded-2xl text-slate-900 placeholder-slate-400 font-medium focus:outline-none focus:ring-2 focus:ring-[#1D646B] focus:border-transparent transition"
              />
            </div>

            {/* Phone Number */}
            <div>
              <label className="block text-xs font-black text-slate-700 uppercase tracking-widest mb-2 ml-1">
                Phone Number
              </label>
              <div className="flex">
                <span className="flex items-center px-4 bg-slate-100 border border-r-0 border-slate-300 rounded-l-2xl text-slate-600 font-bold">
                  +91
                </span>
                <input
                  type="tel"
                  name="phone"
                  placeholder=""
                  value={form.phone}
                  onChange={handleChange}
                  required
                  pattern="[0-9]{10}"
                  maxLength={10}
                  className="w-full p-4 bg-slate-100 border border-slate-300 rounded-r-2xl text-slate-900 placeholder-slate-400 font-medium focus:outline-none focus:ring-2 focus:ring-[#1D646B] focus:border-transparent transition"
                />
              </div>
            </div>

            {/* City + Service */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-black text-slate-700 uppercase tracking-widest mb-2 ml-1">
                  City
                </label>
                <input
                  type="text"
                  name="city"
                  placeholder=""
                  value={form.city}
                  onChange={handleChange}
                  required
                  className="w-full p-4 bg-slate-100 border border-slate-300 rounded-2xl text-slate-900 placeholder-slate-400 font-medium focus:outline-none focus:ring-2 focus:ring-[#1D646B] focus:border-transparent transition"
                />
              </div>
              <div>
                <label className="block text-xs font-black text-slate-700 uppercase tracking-widest mb-2 ml-1">
                  Service
                </label>
                <select
                  name="service"
                  value={form.service}
                  onChange={handleChange}
                  required
                  className="w-full p-4 bg-slate-100 border border-slate-300 rounded-2xl text-slate-900 font-medium focus:outline-none focus:ring-2 focus:ring-[#1D646B] focus:border-transparent transition appearance-none cursor-pointer"
                >
                  <option value="" disabled>Select</option>
                  <option value="LASIK">LASIK</option>
                  <option value="Cataract">Cataract</option>
                  <option value="Urology">Urology</option>
                  <option value="Vascular">Vascular</option>
                  <option value="Orthopedics">Orthopedics</option>
                  <option value="Gastroenterology">Gastroenterology</option>
                  <option value="Piles">Piles (Proctology)</option>
                  <option value="Internal Medicine">Internal Medicine</option>
                </select>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-[#1D646B] to-[#2a8d96] text-white py-5 rounded-2xl font-bold text-lg shadow-xl hover:shadow-2xl hover:-translate-y-0.5 active:scale-95 flex items-center justify-center gap-2 transition-all"
            >
              {loading ? (
                <Loader2 className="animate-spin" size={22} />
              ) : (
                "Book Free Consultation"
              )}
            </button>

            <p className="text-center text-xs text-slate-500 font-medium pt-1">
              🔒 Your information is 100% secure and confidential.
            </p>

          </form>
        </div>
      </div>
      <Footer />
    </>
  );
}