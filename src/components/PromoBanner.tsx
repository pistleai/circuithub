"use client";

import React, { useState } from "react";
import { Percent, Clipboard, Check } from "lucide-react";

export const PromoBanner: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const code = "MAKER10";

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="bg-blue-900 text-white py-6 px-4">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row justify-between items-center gap-6">
        
        {/* Left Side: Text and Icon */}
        <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
          <div className="bg-yellow-500 text-blue-950 p-3.5 rounded-full shadow-md animate-bounce-slow">
            <Percent size={24} strokeWidth={2.5} />
          </div>
          <div>
            <h2 className="font-extrabold text-lg sm:text-xl tracking-tight text-white">
              Maker Deal of the Week!
            </h2>
            <p className="text-xs sm:text-sm text-blue-100 mt-0.5">
              Get <span className="text-yellow-400 font-bold">10% OFF</span> on orders above $100. Limited time offer!
            </p>
          </div>
        </div>

        {/* Right Side: Code & Shop Button */}
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
          {/* Promo code click-to-copy box */}
          <button
            onClick={handleCopy}
            className="flex items-center justify-between gap-3 bg-blue-950/60 border border-blue-800/80 px-4 py-2.5 rounded-lg text-xs font-mono w-full sm:w-auto hover:bg-blue-950 hover:border-yellow-500/50 transition-all relative group"
            title="Click to copy promo code"
          >
            <span className="text-slate-400">PROMO CODE:</span>
            <span className="text-yellow-400 font-bold tracking-wider">{code}</span>
            {copied ? (
              <Check size={14} className="text-green-400 animate-scale-up" />
            ) : (
              <Clipboard size={14} className="text-slate-400 group-hover:text-yellow-400 transition-colors" />
            )}
          </button>

          {/* Shop button */}
          <a
            href="#featured-products"
            className="bg-yellow-500 hover:bg-yellow-600 transition-all text-blue-950 font-bold px-6 py-3 rounded-lg text-xs text-center w-full sm:w-auto shadow-md hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-1.5"
          >
            Shop Now
            <span className="font-mono font-semibold text-sm">&rarr;</span>
          </a>
        </div>

      </div>
    </section>
  );
};
