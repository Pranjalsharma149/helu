"use client";
import { useState } from "react";
import { supabase } from "@/lib/supabase";
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
        // Double verification check
        if (password !== confirmPassword) {
          alert("Passwords do not match!");
          setLoading(false);
          return;
        }

        // 1. Create secure account in Supabase Auth
        const { data: authData, error: authError } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: { full_name: fullName, phone_number: phone }
          }
        });

        if (authError) {
          alert(authError.message); // This will catch the "rate limit exceeded" error
        } else if (authData.user) {
          // 2. Save lead data into 'leads' table (Matches your SQL schema)
          const { error: dbError } = await supabase
            .from('leads')
            .insert([
              { 
                name: fullName, 
                email: email, 
                phone: phone, 
                city: city, // Required by your SQL 'not null' constraint
                service: 'New Account Registration', // Required by your SQL 'not null' constraint
                status: 'New' 
              }
            ]);

          if (dbError) {
            console.error("Lead saving error:", dbError);
          }
          alert("Registration successful! Check your email for a verification link.");
          setIsSignup(false);
        }
      } else {
        // Login Logic
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) alert(error.message);
        else router.push("/");
      }
    } catch (err) {
      console.error("Unexpected error:", err);
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