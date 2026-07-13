"use client";

import React from "react";
import Link from "next/link";
import { Hammer, Cpu, Wrench, ExternalLink } from "lucide-react";

export default function ConstructionPage() {
  return (
    <div className="relative min-h-screen bg-slate-950 text-slate-100 flex flex-col items-center justify-center p-4 overflow-hidden">
      {/* Background Ambient Glows */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-900/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Futuristic Grid Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-30 pointer-events-none" />

      <div className="relative z-10 max-w-lg w-full text-center px-6 py-12 rounded-3xl bg-slate-900/40 backdrop-blur-xl border border-slate-800/80 shadow-2xl flex flex-col items-center">
        {/* Logo Container */}
        <div className="mb-8 p-3 bg-slate-950/60 rounded-2xl border border-slate-800 shadow-inner flex items-center justify-center">
          <img 
            src="/logo.png" 
            alt="CircuitHub Logo" 
            className="h-14 md:h-16 w-auto object-contain select-none filter drop-shadow-[0_0_15px_rgba(30,58,138,0.3)]" 
          />
        </div>

        {/* Animated Construction Indicator */}
        <div className="flex items-center justify-center gap-3 mb-6 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-bold uppercase tracking-wider animate-pulse">
          <Hammer size={14} className="animate-bounce" />
          <span>Platform Upgrade in Progress</span>
        </div>

        {/* Main Header */}
        <h1 className="text-3xl md:text-4xl font-black tracking-tight text-white mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-100 to-slate-400">
          Under Construction
        </h1>

        {/* Sub-description */}
        <p className="text-sm md:text-base text-slate-400 leading-relaxed mb-10 max-w-sm">
          We are currently upgrading CircuitHub to resolve supply friction and deliver a premium B2B sourcing experience. We will be back online shortly.
        </p>

        {/* Dynamic Card for Components/Specs */}
        <div className="w-full grid grid-cols-2 gap-4 mb-10 text-left">
          <div className="p-4 rounded-xl bg-slate-950/40 border border-slate-800/60 hover:border-slate-800 transition-colors">
            <Cpu size={18} className="text-blue-500 mb-2" />
            <h3 className="text-xs font-bold text-slate-200">Catalog Expanded</h3>
            <p className="text-[10px] text-slate-500 mt-1">Adding 10k+ verified microcontroller & robotics components.</p>
          </div>
          <div className="p-4 rounded-xl bg-slate-950/40 border border-slate-800/60 hover:border-slate-800 transition-colors">
            <Wrench size={18} className="text-amber-500 mb-2" />
            <h3 className="text-xs font-bold text-slate-200">B2B Integration</h3>
            <p className="text-[10px] text-slate-500 mt-1">Seamless volume quoting & GST compliance workflows.</p>
          </div>
        </div>

        {/* Main CTA Link to Temporary Site */}
        <Link 
          href="/h"
          className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-650 hover:to-yellow-600 text-slate-950 font-bold py-3.5 px-6 rounded-xl text-sm tracking-wide shadow-lg shadow-yellow-500/10 hover:shadow-yellow-500/20 transform hover:-translate-y-0.5 transition-all duration-200"
        >
          <span>Enter Temporary Site</span>
          <ExternalLink size={16} />
        </Link>
      </div>

      {/* Footer copyright */}
      <div className="absolute bottom-6 left-0 right-0 text-center text-xs text-slate-600 z-10 select-none">
        &copy; {new Date().getFullYear()} CircuitHub Electronics. All rights reserved.
      </div>
    </div>
  );
}
