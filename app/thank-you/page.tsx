
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import { CheckCircle2, Phone, MessageCircle, Home } from "lucide-react";

export default function ThankYouPage() {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-br from-[#e6f4f5] via-white to-[#d4eeed] flex items-center justify-center px-4 pt-24 pb-12">
        <div className="w-full max-w-lg bg-white rounded-[40px] shadow-2xl p-10 border border-slate-200 text-center">

          <div className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 size={48} />
          </div>

          <h1 className="text-4xl font-black text-[#1D646B] mb-3">Thank You!</h1>
          <p className="text-slate-600 text-base mb-2 font-medium">
            Your consultation has been booked successfully.
          </p>
          <p className="text-slate-500 text-sm mb-8">
            Our medical coordinator will contact you within{" "}
            <span className="font-bold text-[#1D646B]">5 to 10 minutes</span>.
          </p>

          <div className="bg-[#f5fbfb] border border-teal-100 rounded-2xl p-6 mb-8 text-left">
            <h3 className="text-sm font-black text-[#1D646B] uppercase tracking-widest mb-4">
              What happens next?
            </h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <span className="w-6 h-6 bg-[#1D646B] text-white rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">1</span>
                <p className="text-sm text-slate-600">Our coordinator reviews your request within minutes.</p>
              </div>
              <div className="flex items-start gap-3">
                <span className="w-6 h-6 bg-[#1D646B] text-white rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">2</span>
                <p className="text-sm text-slate-600">You receive a call from our medical team to understand your needs.</p>
              </div>
              <div className="flex items-start gap-3">
                <span className="w-6 h-6 bg-[#1D646B] text-white rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">3</span>
                <p className="text-sm text-slate-600">We connect you with the right specialist and schedule your consultation.</p>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 mb-8">
            <Link
              href="tel:+918882804301"
              className="flex-1 flex items-center justify-center gap-2 bg-[#1D646B] text-white py-4 rounded-2xl font-bold hover:bg-[#155055] transition"
            >
              <Phone size={18} />
              Call Us Now
            </Link>
            <Link
              href="https://wa.me/918882804301"
              target="_blank"
              className="flex-1 flex items-center justify-center gap-2 bg-green-500 text-white py-4 rounded-2xl font-bold hover:bg-green-600 transition"
            >
              <MessageCircle size={18} />
              WhatsApp Us
            </Link>
          </div>

          <Link
            href="/"
            className="flex items-center justify-center gap-2 text-sm text-slate-500 hover:text-[#1D646B] transition font-medium"
          >
            <Home size={16} />
            Back to Home
          </Link>

        </div>
      </div>
      <Footer />
    </>
  );
}
