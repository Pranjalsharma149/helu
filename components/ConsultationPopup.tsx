"use client";

import { useState, useEffect, useRef } from "react";
import { X, CheckCircle2, Loader2, Phone, Stethoscope, CalendarCheck } from "lucide-react";
import { supabase } from "@/lib/supabase";

const steps = [
  { icon: Phone, text: "Our care coordinator will get in touch with you." },
  { icon: Stethoscope, text: "They'll understand your symptoms in detail." },
  { icon: CalendarCheck, text: "Your consultation will be scheduled at the earliest." },
];

const stats = [
  { value: "50+", label: "Doctors" },
  { value: "20+", label: "Diseases" },
  { value: "10+", label: "Cities" },
];

export default function ConsultationPopup() {
  const [isVisible, setIsVisible] = useState(false);
  const [form, setForm] = useState({ name: "", phone: "", city: "", service: "" });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const submittedRef = useRef(false);

  useEffect(() => {
    // First appearance after 15 seconds
    const firstTimer = setTimeout(() => {
      setIsVisible(true);
    }, 15000);

    // Keep reappearing every 15 seconds if closed and not submitted
    const interval = setInterval(() => {
      if (!submittedRef.current) {
        setIsVisible(true);
      }
    }, 15000);

    return () => {
      clearTimeout(firstTimer);
      clearInterval(interval);
    };
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (!form.name || !form.phone || !form.city || !form.service) return;
    setLoading(true);

    try {
      const { error } = await supabase.from("leads").insert([
        {
          name: form.name,
          phone: form.phone,
          city: form.city,
          service: form.service,
          status: "New",
        },
      ]);
      if (error) throw error;
      submittedRef.current = true;
      setSubmitted(true);
      setTimeout(() => setIsVisible(false), 3000);
    } catch (error: any) {
      alert("Error: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => setIsVisible(false);

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
        style={{ animation: "slideUp 0.45s cubic-bezier(0.16, 1, 0.3, 1) forwards" }}
      >
        <div className="bg-white rounded-3xl shadow-2xl w-full max-w-[820px] max-h-[92vh] overflow-y-auto relative">

          <div className="bg-gradient-to-r from-[#1D646B] to-[#3BA99C] px-6 py-4 rounded-t-3xl flex items-center justify-between sticky top-0 z-10">
            <h2 className="text-white font-bold text-base md:text-lg">
              Book Your Free Consultation
            </h2>
            <button
              onClick={handleClose}
              className="text-white/80 hover:text-white transition p-1 rounded-full hover:bg-white/20 active:scale-95"
            >
              <X size={22} />
            </button>
          </div>

          {submitted ? (
            <div className="flex flex-col items-center justify-center py-16 px-8 text-center">
              <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mb-4">
                <CheckCircle2 size={40} className="text-[#1D646B]" />
              </div>
              <h3 className="text-2xl font-bold text-slate-800 mb-2">Booking Confirmed!</h3>
              <p className="text-slate-500">
                Our medical coordinator will contact you within 5–10 minutes.
              </p>
            </div>
          ) : (
            <div className="flex flex-col md:flex-row">

              {/* LEFT PANEL */}
              <div className="md:w-[45%] p-6 md:p-8 border-b md:border-b-0 md:border-r border-slate-100 bg-[#f5fbfb]">
                <h3 className="text-xl font-bold text-slate-800 mb-1">
                  Simplifying Surgery Experience
                </h3>
                <p className="text-slate-500 text-sm mb-6">
                  Consult with our expert surgeons for more than 50+ diseases
                </p>

                <p className="text-xs font-black uppercase tracking-widest text-[#1D646B] mb-4">
                  Next Steps
                </p>
                <div className="space-y-5 mb-8">
                  {steps.map((step, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className="w-9 h-9 rounded-full bg-[#1D646B]/10 flex items-center justify-center shrink-0 mt-0.5">
                        <step.icon size={16} className="text-[#1D646B]" />
                      </div>
                      <p className="text-sm text-slate-600 leading-relaxed">{step.text}</p>
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-3 gap-3">
                  {stats.map((s) => (
                    <div key={s.label} className="bg-white rounded-2xl p-3 text-center border border-slate-100 shadow-sm">
                      <p className="text-lg font-black text-[#1D646B]">{s.value}</p>
                      <p className="text-[11px] text-slate-500 font-semibold">{s.label}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* RIGHT PANEL - FORM */}
              <div className="md:w-[55%] p-6 md:p-8 flex flex-col justify-center gap-4">

                <div>
                  <label className="block text-xs font-black text-slate-700 uppercase tracking-widest mb-2 ml-1">
                    Patient Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    placeholder="John Doe"
                    value={form.name}
                    onChange={handleChange}
                    className="w-full p-4 bg-slate-100 border border-slate-200 rounded-2xl text-slate-900 placeholder-slate-400 font-medium focus:outline-none focus:ring-2 focus:ring-[#1D646B] focus:border-transparent transition"
                  />
                </div>

                <div>
                  <label className="block text-xs font-black text-slate-700 uppercase tracking-widest mb-2 ml-1">
                    Mobile Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Enter 10 digit mobile number"
                    value={form.phone}
                    onChange={handleChange}
                    className="w-full p-4 bg-slate-100 border border-slate-200 rounded-2xl text-slate-900 placeholder-slate-400 font-medium focus:outline-none focus:ring-2 focus:ring-[#1D646B] focus:border-transparent transition"
                  />
                </div>

                <div>
                  <label className="block text-xs font-black text-slate-700 uppercase tracking-widest mb-2 ml-1">
                    City
                  </label>
                  <input
                    type="text"
                    name="city"
                    placeholder="Delhi, Gurgaon, Noida..."
                    value={form.city}
                    onChange={handleChange}
                    className="w-full p-4 bg-slate-100 border border-slate-200 rounded-2xl text-slate-900 placeholder-slate-400 font-medium focus:outline-none focus:ring-2 focus:ring-[#1D646B] focus:border-transparent transition"
                  />
                </div>

                <div>
                  <label className="block text-xs font-black text-slate-700 uppercase tracking-widest mb-2 ml-1">
                    Select Disease / Service
                  </label>
                  <select
                    name="service"
                    value={form.service}
                    onChange={handleChange}
                    className="w-full p-4 bg-slate-100 border border-slate-200 rounded-2xl text-slate-900 font-medium focus:outline-none focus:ring-2 focus:ring-[#1D646B] focus:border-transparent transition appearance-none cursor-pointer"
                  >
                    <option value="" disabled>Select Disease</option>
                    <option value="LASIK">LASIK Eye Surgery</option>
                    <option value="Cataract">Cataract Surgery</option>
                    <option value="Urology">Urology (Kidney Stones)</option>
                    <option value="Vascular">Vascular (Varicose Veins)</option>
                    <option value="Orthopedics">Orthopedics</option>
                    <option value="Gastroenterology">Gastroenterology</option>
                    <option value="Piles">Piles (Proctology)</option>
                    <option value="Internal Medicine">Internal Medicine</option>
                  </select>
                </div>

                <button
                  onClick={handleSubmit}
                  disabled={loading || !form.name || !form.phone || !form.city || !form.service}
                  className="w-full py-4 rounded-2xl bg-gradient-to-r from-[#1D646B] to-[#3BA99C] text-white font-bold text-base shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:scale-95 flex items-center justify-center gap-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0"
                >
                  {loading ? (
                    <Loader2 className="animate-spin" size={20} />
                  ) : (
                    "Book Free Consultation"
                  )}
                </button>

                <p className="text-center text-xs text-slate-400 font-medium">
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
          from { opacity: 0; transform: translateY(40px) scale(0.97); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
      `}</style>
    </>
  );
}