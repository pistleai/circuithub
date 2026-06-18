"use client";

import React, { useState, useEffect } from "react";
import { Hammer, X } from "lucide-react";

export const ConstructionBanner: React.FC = () => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const isDismissed = localStorage.getItem("construction-banner-dismissed");
    if (isDismissed === "true") {
      setIsVisible(false);
    }
  }, []);

  const handleDismiss = () => {
    setIsVisible(false);
    localStorage.setItem("construction-banner-dismissed", "true");
  };

  if (!isVisible) return null;

  return (
    <div className="bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500 text-amber-950 py-2.5 px-4 shadow-md relative z-50 flex items-center justify-center text-center">
      <div className="max-w-7xl mx-auto flex items-center justify-center gap-2 text-xs sm:text-sm font-bold tracking-wide">
        <Hammer size={16} className="animate-bounce-slow text-amber-950 flex-shrink-0" />
        <span>
          Under Construction: We are currently upgrading CircuitHub. Some features might be temporarily limited.
        </span>
      </div>
      <button
        onClick={handleDismiss}
        className="absolute right-3 p-1 rounded-full hover:bg-amber-600/20 hover:text-black transition-colors"
        aria-label="Dismiss banner"
      >
        <X size={16} />
      </button>
    </div>
  );
};
