"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/Header";
import { Mail, Lock, ArrowRight, Phone, User, ShieldCheck, MapPin } from "lucide-react";

export default function AuthPage() {
  const [isSignup, setIsSignup] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // Form State
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isSignup) {
        if (password !== confirmPassword) {
          alert("Passwords do not match!");
          setLoading(false);
          return;
        }

        const res = await fetch("/api/auth/signup", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ fullName, email, phone, city, password, confirmPassword }),
        });
        const data = await res.json().catch(() => ({}));

        if (!res.ok || data.error) {
          alert(data.error || "Something went wrong. Please try again.");
          return;
        }

        // No email verification step with the Mongo-backed auth, so the
        // signup response already sets a session cookie — go straight in.
        router.push("/");
      } else {
        const res = await fetch("/api/auth/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        });
        const data = await res.json().catch(() => ({}));

        if (!res.ok || data.error) {
          alert(data.error || "Invalid email or password");
          return;
        }

        router.push("/");
      }
    } catch (err) {
      console.error("Unexpected error:", err);
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col font-sans">
      <Header />
      
      <div className="flex flex-1 pt-20">
        {/* Left Side: Creative Branding */}
        <div className="hidden lg:flex w-1/2 bg-[#1D646B] items-center justify-center p-12 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32 blur-3xl" />
          <div className="relative z-10 max-w-md">
            <ShieldCheck size={48} className="mb-6 opacity-80" />
            <h2 className="text-5xl font-bold leading-tight">Expert Care Just a Click Away.</h2>
            <p className="mt-6 text-teal-50 text-lg opacity-90">
              Join HealviaCare to access zero-cost EMI surgeries and 24/7 medical assistance.
            </p>
          </div>
        </div>

        {/* Right Side: Advanced Form */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-gray-50/30">
          <div className="max-w-md w-full">
            <div className="mb-8">
              <h3 className="text-3xl font-bold text-slate-900">
                {isSignup ? "Patient Registration" : "Welcome Back"}
              </h3>
              <p className="text-slate-500 mt-2">
                {isSignup ? "Create an account to manage your treatments." : "Enter your email to access your dashboard."}
              </p>
            </div>

            <form onSubmit={handleAuth} className="space-y-4">
              {isSignup && (
                <>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <input
                      type="text"
                      placeholder="Full Name"
                      required
                      className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-[#1D646B] transition-all"
                      onChange={(e) => setFullName(e.target.value)}
                    />
                  </div>
                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <input
                      type="tel"
                      placeholder="Mobile Number"
                      required
                      className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-[#1D646B] transition-all"
                      onChange={(e) => setPhone(e.target.value)}
                    />
                  </div>
                  <div className="relative">
                    <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <input
                      type="text"
                      placeholder="Your City"
                      required
                      className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-[#1D646B] transition-all"
                      onChange={(e) => setCity(e.target.value)}
                    />
                  </div>
                </>
              )}

              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input
                  type="email"
                  placeholder="Email Address"
                  required
                  className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-[#1D646B] transition-all"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input
                  type="password"
                  placeholder="Password"
                  required
                  className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-[#1D646B] transition-all"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              {isSignup && (
                <div className="relative">
                  <ShieldCheck className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                  <input
                    type="password"
                    placeholder="Confirm Password"
                    required
                    className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-[#1D646B] transition-all"
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>
              )}

              <button
                disabled={loading}
                className="w-full py-4 bg-[#1D646B] text-white rounded-xl font-bold shadow-lg hover:bg-[#155a60] transition-all flex items-center justify-center gap-2 mt-4"
              >
                {loading ? "Please wait..." : isSignup ? "Create My Account" : "Sign In"}
                <ArrowRight size={18} />
              </button>
            </form>

            <div className="mt-8 text-center pt-6 border-t border-slate-100">
              <button
                onClick={() => setIsSignup(!isSignup)}
                className="text-slate-600 font-semibold hover:text-[#1D646B] transition-colors"
              >
                {isSignup ? "Already have an account? Sign In" : "New Patient? Create an account"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 