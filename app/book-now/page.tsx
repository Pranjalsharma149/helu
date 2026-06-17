"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Loader2, AlertCircle, X } from "lucide-react";

interface BookingPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

const FAKE_PATTERNS = [
  /^(\d)\1{9}$/,
  /^1234567890$/,
  /^0987654321$/,
  /^1234554321$/,
  /^0000000000$/,
  /^9876543210$/,
];

function validatePhone(phone: string): string {
  if (!phone) return "Phone number is required";
  if (!/^\d{10}$/.test(phone)) return "Enter a valid 10-digit number";
  if (!/^[6-9]/.test(phone)) return "Must start with 6, 7, 8, or 9";
  if (FAKE_PATTERNS.some((p) => p.test(phone))) return "Enter a real phone number";
  return "";
}

export default function BookingPopup({ isOpen, onClose }: BookingPopupProps) {
  const router = useRouter();

  const [form, setForm] = useState({ name: "", phone: "", service: "" });
  const [phoneError, setPhoneError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    },
    [onClose]
  );

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, handleKeyDown]);

  if (!isOpen) return null;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    if (name === "phone") {
      const digits = value.replace(/\D/g, "").slice(0, 10);
      setForm((f) => ({ ...f, phone: digits }));
      setPhoneError(digits.length > 0 ? validatePhone(digits) : "");
    } else {
      setForm((f) => ({ ...f, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const error = validatePhone(form.phone);
    if (error) { setPhoneError(error); return; }

    setLoading(true);
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name.trim(),
          phone: form.phone,
          service: form.service,
          source: "popup-form",
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Something went wrong");
      onClose();
      router.push("/thank-you");
    } catch (err: any) {
      alert("Error: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const isSubmittable =
    !phoneError && form.phone.length === 10 && form.name.trim().length >= 2 && form.service !== "" && !loading;

  return (
    <div
      className="fixed inset-0 z-[300] flex items-center justify-center px-4"
      style={{ background: "rgba(0,0,0,0.55)", backdropFilter: "blur(4px)" }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
      role="dialog"
      aria-modal="true"
      aria-labelledby="popup-title"
    >
      <div className="relative w-full max-w-md bg-white rounded-[28px] shadow-2xl border border-slate-200 p-8 animate-in fade-in zoom-in-95 duration-200">

        {/* Close button */}
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute top-5 right-5 w-8 h-8 flex items-center justify-center rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition"
        >
          <X size={18} />
        </button>

        {/* Header */}
        <div className="mb-7">
          <p className="text-xs font-bold text-[#1D646B] uppercase tracking-widest mb-1">
            HealviaCare
          </p>
          <h2
            id="popup-title"
            className="text-2xl font-black text-slate-900 mb-1"
          >
            Book Free Appointment
          </h2>
          <p className="text-sm text-slate-500">
            Talk to a care expert — no fees, no obligation.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5" noValidate>

          {/* Full Name */}
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            minLength={2}
            placeholder="Enter your name*"
            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#1D646B] focus:border-transparent transition"
          />

          {/* Phone */}
          <div>
            <div className="flex">
              <span className="flex items-center px-3 bg-slate-100 border border-r-0 border-slate-200 rounded-l-xl text-slate-500 text-sm font-semibold select-none">
                +91
              </span>
              <input
                type="tel"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                required
                maxLength={10}
                placeholder="Enter your mobile number*"
                className={`w-full px-4 py-3 bg-slate-50 border rounded-r-xl text-slate-900 placeholder-slate-400 text-sm font-medium focus:outline-none focus:ring-2 focus:border-transparent transition ${
                  phoneError
                    ? "border-red-400 focus:ring-red-400"
                    : form.phone.length === 10 && !phoneError
                    ? "border-green-400 focus:ring-green-400"
                    : "border-slate-200 focus:ring-[#1D646B]"
                }`}
              />
            </div>
            {phoneError && (
              <div className="flex items-center gap-1.5 mt-1.5">
                <AlertCircle size={13} className="text-red-500 shrink-0" />
                <p className="text-xs text-red-500 font-medium">{phoneError}</p>
              </div>
            )}
          </div>

          {/* Treatment */}
          <select
            name="service"
            value={form.service}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#1D646B] focus:border-transparent transition appearance-none cursor-pointer"
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

          {/* Submit */}
          <button
            type="submit"
            disabled={!isSubmittable}
            className="w-full bg-gradient-to-r from-[#1D646B] to-[#2a8d96] text-white py-4 rounded-xl font-bold text-sm shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:scale-95 flex items-center justify-center gap-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0"
          >
            {loading ? (
              <Loader2 className="animate-spin" size={18} />
            ) : (
              "Book Appointment"
            )}
          </button>

          {/* Terms */}
          <p className="text-center text-xs text-slate-400 pt-0.5">
            *By proceeding, you agree to our{" "}
            <a
              href="/terms-and-conditions"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#1D646B] font-semibold underline underline-offset-2 hover:text-[#2a8d96] transition-colors"
            >
              terms and conditions
            </a>
          </p>

        </form>
      </div>
    </div>
  );
}