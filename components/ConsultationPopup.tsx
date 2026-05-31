"use client";

import { useState, useEffect } from "react";
import { X, CheckCircle2, Loader2, Phone, Stethoscope, CalendarCheck } from "lucide-react";
import { supabase } from "@/lib/supabase";

const steps = [
  { icon: Phone, text: "Care coordinator will contact you." },
  { icon: Stethoscope, text: "They'll understand your symptoms." },
  { icon: CalendarCheck, text: "Consultation scheduled at the earliest." },
];

const stats = [
  { value: "50+", label: "Doctors" },
  { value: "20+", label: "Diseases" },
  { value: "10+", label: "Cities" },
];

export default function ConsultationPopup() {
  const [isVisible, setIsVisible] = useState(false);
  const [form, setForm] = useState({ name: "", phone: "", city: "" });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    // Show on every page load/refresh after 1 second
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setIsVisible(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (!form.name || !form.phone || !form.city) return;
    setLoading(true);
    try {
      const { error } = await supabase.from("leads").insert([
        {
          name: form.name,
          phone: form.phone,
          city: form.city,
          status: "New",
        },
      ]);
      if (error) throw error;
      setSubmitted(true);
      setTimeout(() => setIsVisible(false), 3000);
    } catch (error: any) {
      alert("Error: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  if (!isVisible) return null;

  return (
    <>
      <div
        className="fixed inset-0 z-[200] bg-black/50 backdrop-blur-sm"
        onClick={handleClose}
        style={{ animation: "fadeIn 0.3s ease forwards" }}
      />

      <div
        className="fixed inset-0 z-[201] flex items-center justify-center p-4"
        style={{ animation: "slideUp 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards" }}
      >
        <div className="bg-white rounded-2xl shadow-2xl w-full max-w-[680px] overflow-hidden relative">

          {/* HEADER */}
          <div className="bg-gradient-to-r from-[#1D646B] to-[#3BA99C] px-5 py-3.5 flex items-center justify-between">
            <h2 className="text-white font-bold text-sm md:text-base">
              Book Your Free Consultation
            </h2>
            <button
              onClick={handleClose}
              className="text-white/80 hover:text-white transition p-1 rounded-full hover:bg-white/20 active:scale-95"
            >
              <X size={18} />
            </button>
          </div>

          {submitted ? (
            <div className="flex flex-col items-center justify-center py-10 px-8 text-center">
              <div className="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center mb-3">
                <CheckCircle2 size={30} className="text-[#1D646B]" />
              </div>
              <h3 className="text-lg font-bold text-slate-800 mb-1">Booking Confirmed!</h3>
              <p className="text-slate-500 text-sm">
                Our coordinator will contact you within 5–10 minutes.
              </p>
            </div>
          ) : (
            <div className="flex flex-col md:flex-row">

              {/* LEFT PANEL */}
              <div className="md:w-[42%] p-5 border-b md:border-b-0 md:border-r border-slate-100 bg-[#f5fbfb]">
                <h3 className="text-base font-bold text-slate-800 mb-0.5">
                  Simplifying Surgery
                </h3>
                <p className="text-slate-500 text-xs mb-4">
                  Expert surgeons for 50+ diseases
                </p>

                <div className="space-y-3 mb-5">
                  {steps.map((step, i) => (
                    <div key={i} className="flex items-start gap-2.5">
                      <div className="w-7 h-7 rounded-full bg-[#1D646B]/10 flex items-center justify-center shrink-0 mt-0.5">
                        <step.icon size={13} className="text-[#1D646B]" />
                      </div>
                      <p className="text-xs text-slate-600 leading-relaxed">{step.text}</p>
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-3 gap-2">
                  {stats.map((s) => (
                    <div key={s.label} className="bg-white rounded-xl p-2 text-center border border-slate-100 shadow-sm">
                      <p className="text-base font-black text-[#1D646B]">{s.value}</p>
                      <p className="text-[10px] text-slate-500 font-semibold">{s.label}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* RIGHT PANEL - FORM */}
              <div className="md:w-[58%] p-5 flex flex-col justify-center gap-3">

                <input
                  type="text"
                  name="name"
                  placeholder="Name"
                  value={form.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-slate-100 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#1D646B] focus:border-transparent transition"
                />

                <input
                  type="tel"
                  name="phone"
                  placeholder="Mobile Number"
                  value={form.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-slate-100 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#1D646B] focus:border-transparent transition"
                />

                <input
                  type="text"
                  name="city"
                  placeholder="City"
                  value={form.city}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-slate-100 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#1D646B] focus:border-transparent transition"
                />

                <button
                  onClick={handleSubmit}
                  disabled={loading || !form.name || !form.phone || !form.city}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-[#1D646B] to-[#3BA99C] text-white font-bold text-sm shadow-md hover:shadow-lg hover:-translate-y-0.5 active:scale-95 flex items-center justify-center gap-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0"
                >
                  {loading ? <Loader2 className="animate-spin" size={18} /> : "Book Free Consultation"}
                </button>

                <p className="text-center text-[11px] text-slate-400">
                  🔒 Your information is 100% secure and confidential.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(30px) scale(0.97); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
      `}</style>
    </>
  );
}