"use client";

import React, { useState } from "react";
import { Hammer, Mail, ShieldAlert, ArrowRight, Check } from "lucide-react";

export default function Home() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail("");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-slate-950 via-blue-950 to-slate-950 text-white px-6 py-16 text-center relative overflow-hidden">
      {/* Decorative ambient glow circles */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-amber-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-2xl mx-auto flex flex-col items-center gap-8">
        {/* Animated Icon Container */}
        <div className="relative">
          <div className="absolute inset-0 bg-amber-500/20 rounded-full blur-xl animate-pulse" />
          <div className="bg-gradient-to-br from-amber-400 to-amber-600 text-slate-950 p-6 rounded-full shadow-lg relative border-2 border-amber-300 animate-bounce-slow">
            <Hammer size={48} strokeWidth={2} />
          </div>
        </div>

        {/* Text Section */}
        <div className="space-y-4">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-amber-500/10 text-amber-400 border border-amber-500/30">
            <ShieldAlert size={12} /> Under Construction
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-white via-slate-100 to-amber-255 bg-clip-text text-transparent">
            Something Amazing is Under Construction
          </h1>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed max-w-lg mx-auto">
            We are fine-tuning our supply chain, inventory catalog, and platform speed to provide the ultimate B2B electronics and robotics distribution experience.
          </p>
        </div>

        {/* Dynamic Progress/Status Block */}
        <div className="w-full max-w-md bg-slate-900/60 border border-slate-800 rounded-xl p-5 backdrop-blur-sm">
          <div className="flex justify-between items-center text-xs text-slate-400 mb-2">
            <span className="font-medium">Platform Integration</span>
            <span className="font-bold text-amber-400">85% Complete</span>
          </div>
          <div className="w-full bg-slate-800 h-2.5 rounded-full overflow-hidden">
            <div className="bg-gradient-to-r from-amber-500 to-amber-400 h-full w-[85%] rounded-full" />
          </div>
        </div>

        {/* Newsletter Signup Form */}
        <div className="w-full max-w-md mt-2">
          {subscribed ? (
            <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-xl p-4 text-emerald-400 flex items-center justify-center gap-2.5 animate-scale-up">
              <Check size={18} className="stroke-[3]" />
              <span className="text-sm font-semibold">You have been subscribed for launch updates!</span>
            </div>
          ) : (
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2.5">
              <div className="relative flex-grow">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 w-4 h-4" />
                <input
                  type="email"
                  required
                  placeholder="Enter email to get notified when we launch"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-slate-900/80 border border-slate-700/85 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 focus:outline-none rounded-lg pl-10 pr-4 py-3 text-sm placeholder-slate-500 transition-all"
                />
              </div>
              <button
                type="submit"
                className="bg-amber-500 hover:bg-amber-600 active:bg-amber-700 text-slate-950 font-bold px-6 py-3 rounded-lg text-sm transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-1.5 whitespace-nowrap cursor-pointer"
              >
                Notify Me
                <ArrowRight size={14} className="stroke-[2.5]" />
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
