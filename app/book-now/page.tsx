"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Loader2, ShieldCheck, Info, AlertCircle } from "lucide-react";

export default function BookNowPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    name: "",
    phone: "",
    service: "",
  });
  const [agreed, setAgreed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [phoneError, setPhoneError] = useState("");

  // Fake/invalid number patterns to block
  const FAKE_PATTERNS = [
    /^(\d)\1{9}$/, // all same digits: 9999999999, 1111111111
    /^1234567890$/,
    /^0987654321$/,
    /^1234554321$/,
    /^0000000000$/,
    /^9876543210$/,
  ];

  const validatePhone = (phone: string): string => {
    if (!phone) return "Phone number is required";
    if (!/^\d{10}$/.test(phone)) return "Enter a valid 10-digit number";
    if (!/^[6-9]/.test(phone)) return "Indian numbers must start with 6, 7, 8, or 9";
    if (FAKE_PATTERNS.some((p) => p.test(phone))) return "Enter a real phone number";
    return "";
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (name === "phone") {
      const digits = value.replace(/\D/g, "").slice(0, 10);
      setForm({ ...form, phone: digits });
      if (digits.length > 0) setPhoneError(validatePhone(digits));
      else setPhoneError("");
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const error = validatePhone(form.phone);
    if (error) {
      setPhoneError(error);
      return;
    }

    setLoading(true);

    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name.trim(),
          phone: form.phone,
          service: form.service,
          source: 'book-now-page',
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Something went wrong');

      router.push('/thank-you');

    } catch (error: any) {
      alert('Error: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

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
                value={form.name}
                onChange={handleChange}
                required
                minLength={2}
                className="w-full p-4 bg-slate-100 border border-slate-300 rounded-2xl text-slate-900 placeholder-slate-400 font-medium focus:outline-none focus:ring-2 focus:ring-[#1D646B] focus:border-transparent transition"
              />
            </div>

            {/* Phone Number */}
            <div>
              <label className="block text-xs font-black text-slate-700 uppercase tracking-widest mb-2 ml-1">
                Phone Number <span className="text-red-500">*</span>
              </label>
              <div className="flex">
                <span className="flex items-center px-4 bg-slate-100 border border-r-0 border-slate-300 rounded-l-2xl text-slate-600 font-bold">
                  +91
                </span>
                <input
                  type="tel"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  required
                  maxLength={10}
                  placeholder="10-digit mobile number"
                  className={`w-full p-4 bg-slate-100 border rounded-r-2xl text-slate-900 placeholder-slate-400 font-medium focus:outline-none focus:ring-2 focus:border-transparent transition ${
                    phoneError
                      ? "border-red-400 focus:ring-red-400"
                      : form.phone.length === 10 && !phoneError
                      ? "border-green-400 focus:ring-green-400"
                      : "border-slate-300 focus:ring-[#1D646B]"
                  }`}
                />
              </div>

              {/* Phone error message */}
              {phoneError && (
                <div className="flex items-center gap-1.5 mt-2">
                  <AlertCircle size={14} className="text-red-500 shrink-0" />
                  <p className="text-xs text-red-500 font-medium">{phoneError}</p>
                </div>
              )}

              {/* Phone valid message */}
              {form.phone.length === 10 && !phoneError && (
                <p className="text-xs text-green-600 font-medium mt-2">✓ Valid phone number</p>
              )}
            </div>

            {/* Choose Treatment */}
            <div>
              <label className="block text-xs font-black text-slate-700 uppercase tracking-widest mb-2 ml-1">
                Choose Treatment
              </label>
              <select
                name="service"
                value={form.service}
                onChange={handleChange}
                required
                className="w-full p-4 bg-slate-100 border border-slate-300 rounded-2xl text-slate-900 font-medium focus:outline-none focus:ring-2 focus:ring-[#1D646B] focus:border-transparent transition appearance-none cursor-pointer"
              >
                <option value="" disabled>Select Treatment</option>
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

            {/* Privacy Notice */}
            <div className="bg-blue-50 border border-blue-100 rounded-2xl p-4">
              <div className="flex gap-2 items-start mb-2">
                <ShieldCheck size={18} className="text-[#1D646B] mt-0.5 shrink-0" />
                <p className="text-xs font-bold text-[#1D646B] uppercase tracking-wide">Privacy Notice</p>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                The personal information you provide (name, phone number, and treatment preference) will be collected and stored securely by HealviaCare. This information will only be used to contact you regarding your consultation request and will not be sold or shared with any third parties.
              </p>
            </div>

            {/* Disclaimer */}
            <div className="bg-amber-50 border border-amber-100 rounded-2xl p-4">
              <div className="flex gap-2 items-start mb-2">
                <Info size={18} className="text-amber-600 mt-0.5 shrink-0" />
                <p className="text-xs font-bold text-amber-700 uppercase tracking-wide">Medical Disclaimer</p>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                This form is for booking a free consultation only and does not constitute medical advice. HealviaCare coordinators will connect you with qualified doctors. Please consult a licensed medical professional before making any health decisions.
              </p>
            </div>

            {/* Consent Checkbox */}
            <div className="flex items-start gap-3">
              <input
                type="checkbox"
                id="consent"
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
                required
                className="mt-1 w-4 h-4 accent-[#1D646B] cursor-pointer shrink-0"
              />
              <label htmlFor="consent" className="text-xs text-slate-600 leading-relaxed cursor-pointer">
                I agree to the collection and use of my personal information as described above. I consent to being contacted by HealviaCare regarding my consultation request. I understand this is not a substitute for professional medical advice.
              </label>
            </div>

            <button
              type="submit"
              disabled={loading || !agreed || !!phoneError || form.phone.length !== 10}
              className="w-full bg-gradient-to-r from-[#1D646B] to-[#2a8d96] text-white py-5 rounded-2xl font-bold text-lg shadow-xl hover:shadow-2xl hover:-translate-y-0.5 active:scale-95 flex items-center justify-center gap-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0"
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