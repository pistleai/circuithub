import React from "react";
import { Product } from "../types/product";

interface ProductImageProps {
  product: Product;
  className?: string;
}

// Simple deterministic hash to vary color bands or pins dynamically
const getHash = (str: string) => {
  return str.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);
};

// Blueprint CAD-style container for inline SVGs
const BlueprintContainer: React.FC<{ children: React.ReactNode; code?: string }> = ({ children, code }) => {
  return (
    <div className="w-full h-full relative bg-slate-950 overflow-hidden flex items-center justify-center">
      {/* Blueprint Grid Background */}
      <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:16px_16px] opacity-60" />
      <div className="absolute top-2 left-2.5 text-[7px] font-mono text-slate-500 uppercase tracking-widest pointer-events-none select-none flex flex-col gap-0.5">
        <span>CAD SPEC // REV 1.2</span>
        {code && <span className="text-slate-600 text-[6px] font-semibold">{code}</span>}
      </div>
      <div className="relative z-10 w-full h-full flex items-center justify-center p-6">
        {children}
      </div>
    </div>
  );
};

// -------------------------------------------------------------
// Base SVGs
// -------------------------------------------------------------

// Base Capacitor SVG
const CapacitorSvg = () => (
  <svg viewBox="0 0 100 100" className="w-20 h-20 filter drop-shadow-[0_4px_6px_rgba(0,0,0,0.4)]">
    <line x1="42" y1="65" x2="42" y2="92" stroke="#cbd5e1" strokeWidth="3" strokeLinecap="round" />
    <line x1="58" y1="65" x2="58" y2="82" stroke="#cbd5e1" strokeWidth="3" strokeLinecap="round" />
    <rect x="30" y="15" width="40" height="50" rx="3" fill="#2563eb" stroke="#1d4ed8" strokeWidth="1.5" />
    <rect x="56" y="15" width="10" height="50" fill="#cbd5e1" />
    <line x1="59" y1="25" x2="63" y2="25" stroke="#475569" strokeWidth="2.5" />
    <line x1="59" y1="40" x2="63" y2="40" stroke="#475569" strokeWidth="2.5" />
    <line x1="59" y1="55" x2="63" y2="55" stroke="#475569" strokeWidth="2.5" />
    <line x1="30" y1="62" x2="70" y2="62" stroke="#0f172a" strokeWidth="3.5" />
  </svg>
);

// Base LED SVG (Glowing / Pulsing)
const LedSvg = () => (
  <svg viewBox="0 0 100 100" className="w-20 h-20 filter drop-shadow-[0_4px_6px_rgba(0,0,0,0.4)]">
    <defs>
      <radialGradient id="ledGlow" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.7" />
        <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
      </radialGradient>
    </defs>
    <circle cx="50" cy="40" r="30" fill="url(#ledGlow)" className="animate-pulse" />
    <line x1="44" y1="60" x2="44" y2="92" stroke="#cbd5e1" strokeWidth="3" strokeLinecap="round" />
    <line x1="56" y1="60" x2="56" y2="82" stroke="#cbd5e1" strokeWidth="3" strokeLinecap="round" />
    <path d="M35,60 L35,42 A15,15 0 0,1 65,42 L65,60 Z" fill="#3b82f6" fillOpacity="0.85" stroke="#2563eb" strokeWidth="1.5" />
    <rect x="31" y="57" width="38" height="4.5" rx="1.5" fill="#3b82f6" stroke="#2563eb" strokeWidth="0.5" />
    <path d="M43,44 L47,52 L47,58 M57,47 L53,52 L53,58" stroke="#e2e8f0" strokeWidth="1.5" fill="none" />
  </svg>
);

// Base Fuse SVG
const FuseSvg = () => (
  <svg viewBox="0 0 100 100" className="w-20 h-20 filter drop-shadow-[0_4px_6px_rgba(0,0,0,0.4)]">
    <rect x="25" y="38" width="50" height="24" rx="1" fill="#f8fafc" fillOpacity="0.25" stroke="#cbd5e1" strokeWidth="1.5" />
    <path d="M25,50 Q50,47 75,50" fill="none" stroke="#94a3b8" strokeWidth="1.5" />
    <rect x="16" y="35" width="13" height="30" rx="2" fill="url(#fuseMetal)" stroke="#64748b" strokeWidth="0.5" />
    <rect x="71" y="35" width="13" height="30" rx="2" fill="url(#fuseMetal)" stroke="#64748b" strokeWidth="0.5" />
    <defs>
      <linearGradient id="fuseMetal" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#cbd5e1" />
        <stop offset="50%" stopColor="#f8fafc" />
        <stop offset="100%" stopColor="#94a3b8" />
      </linearGradient>
    </defs>
  </svg>
);

// Base Crystal Oscillator SVG
const CrystalSvg = () => (
  <svg viewBox="0 0 100 100" className="w-20 h-20 filter drop-shadow-[0_4px_6px_rgba(0,0,0,0.4)]">
    <line x1="42" y1="65" x2="42" y2="92" stroke="#cbd5e1" strokeWidth="3" />
    <line x1="58" y1="65" x2="58" y2="92" stroke="#cbd5e1" strokeWidth="3" />
    <ellipse cx="50" cy="62" rx="22" ry="4.5" fill="#64748b" stroke="#475569" strokeWidth="1" />
    <rect x="30" y="22" width="40" height="38" rx="4" fill="url(#crystalMetal)" stroke="#94a3b8" strokeWidth="1" />
    <line x1="30" y1="26" x2="70" y2="26" stroke="#cbd5e1" strokeWidth="0.5" />
    <text x="50" y="46" textAnchor="middle" fill="#475569" fontSize="8.5" fontFamily="monospace" fontWeight="bold">16.000</text>
    <defs>
      <linearGradient id="crystalMetal" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stopColor="#94a3b8" />
        <stop offset="30%" stopColor="#cbd5e1" />
        <stop offset="70%" stopColor="#f1f5f9" />
        <stop offset="100%" stopColor="#64748b" />
      </linearGradient>
    </defs>
  </svg>
);

// Base Toroidal Transformer SVG
const TransformerSvg = () => (
  <svg viewBox="0 0 100 100" className="w-20 h-20 filter drop-shadow-[0_4px_6px_rgba(0,0,0,0.4)]">
    <circle cx="50" cy="50" r="30" fill="#334155" stroke="#1e293b" strokeWidth="2.5" />
    <circle cx="50" cy="50" r="13" fill="#0f172a" />
    <path d="
      M31,31 Q34,28 37,33
      M36,24 Q40,22 42,28
      M45,20 Q50,19 50,25
      M55,20 Q60,21 58,27
      M65,24 Q69,27 65,32
      M71,31 Q73,36 68,40
      M73,40 Q74,46 69,48
      M71,51 Q70,57 64,56
      M66,61 Q63,66 58,63
      M57,68 Q52,70 50,64
      M47,68 Q42,67 42,62
      M37,64 Q33,61 36,56
      M30,57 Q28,52 33,49
      M29,46 Q29,40 34,39
    " fill="none" stroke="url(#copperWire)" strokeWidth="4.5" strokeLinecap="round" />
    <path d="M22,25 C14,14 10,34 4,44" fill="none" stroke="#ef4444" strokeWidth="2.5" strokeLinecap="round" />
    <path d="M78,25 C86,14 90,34 96,44" fill="none" stroke="#2563eb" strokeWidth="2.5" strokeLinecap="round" />
    <defs>
      <linearGradient id="copperWire" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#f97316" />
        <stop offset="50%" stopColor="#ea580c" />
        <stop offset="100%" stopColor="#b45309" />
      </linearGradient>
    </defs>
  </svg>
);

// Base Relay SVG
const RelaySvg = () => (
  <svg viewBox="0 0 100 100" className="w-20 h-20 filter drop-shadow-[0_4px_6px_rgba(0,0,0,0.4)]">
    <rect x="20" y="20" width="60" height="60" rx="4" fill="#1e3a8a" stroke="#1d4ed8" strokeWidth="2" />
    <circle cx="34" cy="34" r="3" fill="#3b82f6" />
    <circle cx="34" cy="66" r="3" fill="#3b82f6" />
    <circle cx="66" cy="34" r="3" fill="#3b82f6" />
    <circle cx="66" cy="50" r="3" fill="#3b82f6" />
    <circle cx="66" cy="66" r="3" fill="#3b82f6" />
    <path d="M34,34 L44,34 M34,66 L44,66 M44,28 L44,40 M44,60 L44,72 M44,34 C47,30 51,38 54,34 C57,30 61,38 66,34" fill="none" stroke="#93c5fd" strokeWidth="1.5" />
    <path d="M66,50 L55,50 L50,56 M66,66 L55,66" fill="none" stroke="#93c5fd" strokeWidth="1.5" />
    <text x="50" y="77" textAnchor="middle" fill="#93c5fd" fontSize="7.5" fontFamily="monospace" fontWeight="bold">5V DC / 10A</text>
  </svg>
);

// Base IC (Microchip) SVG
const IcSvg = () => (
  <svg viewBox="0 0 100 100" className="w-20 h-20 filter drop-shadow-[0_4px_6px_rgba(0,0,0,0.4)]">
    <path d="M14,28 H25 M14,40 H25 M14,52 H25 M14,64 H25 M14,76 H25" stroke="#94a3b8" strokeWidth="3" strokeLinecap="round" />
    <path d="M75,28 H86 M75,40 H86 M75,52 H86 M75,64 H86 M75,76 H86" stroke="#94a3b8" strokeWidth="3" strokeLinecap="round" />
    <rect x="24" y="18" width="52" height="64" rx="2" fill="#1e293b" stroke="#334155" strokeWidth="1.5" />
    <path d="M43,18 A7,7 0 0,0 57,18" fill="#0f172a" stroke="#334155" strokeWidth="1" />
    <circle cx="33" cy="27" r="2.5" fill="#0f172a" />
    <text x="50" y="47" textAnchor="middle" fill="#94a3b8" fontSize="9" fontFamily="monospace" fontWeight="bold">CH9205</text>
    <text x="50" y="58" textAnchor="middle" fill="#64748b" fontSize="6.5" fontFamily="monospace">MCU CORE</text>
  </svg>
);

// Heatsink SVG (Finned, with rotating fan if "fan cooled" matching)
const HeatsinkSvg: React.FC<{ name: string }> = ({ name }) => {
  const hasFan = name.toLowerCase().includes("fan");
  return (
    <svg viewBox="0 0 100 100" className="w-20 h-20 filter drop-shadow-[0_4px_6px_rgba(0,0,0,0.4)]">
      <rect x="15" y="70" width="70" height="9" fill="#475569" stroke="#334155" strokeWidth="1.5" />
      <path d="
        M20,70 V24 H24 V70
        M29,70 V24 H33 V70
        M38,70 V24 H42 V70
        M47,70 V24 H51 V70
        M56,70 V24 H60 V70
        M65,70 V24 H69 V70
        M74,70 V24 H78 V70
      " fill="#64748b" stroke="#334155" strokeWidth="1.5" />
      {hasFan && (
        <g className="animate-spin-slow origin-[50px_45px]" style={{ transformBox: "fill-box" }}>
          <circle cx="50" cy="45" r="9" fill="#0f172a" stroke="#475569" strokeWidth="1.5" />
          <path d="M50,36 Q46,23 37,23 Q34,26 43,39 Z" fill="#1e293b" />
          <path d="M50,54 Q54,67 63,67 Q66,64 57,51 Z" fill="#1e293b" />
          <path d="M41,45 Q28,49 28,58 Q31,61 44,50 Z" fill="#1e293b" />
          <path d="M59,45 Q72,41 72,32 Q69,29 56,40 Z" fill="#1e293b" />
        </g>
      )}
    </svg>
  );
};

// Base Mechanical parts SVG (Screw & Nut)
const MechanicalSvg = () => (
  <svg viewBox="0 0 100 100" className="w-20 h-20 filter drop-shadow-[0_4px_6px_rgba(0,0,0,0.4)]">
    <g transform="translate(8, 0)">
      <rect x="25" y="35" width="14" height="42" fill="url(#mechMetal)" stroke="#475569" strokeWidth="0.5" />
      <line x1="25" y1="41" x2="39" y2="45" stroke="#475569" strokeWidth="1.75" />
      <line x1="25" y1="49" x2="39" y2="53" stroke="#475569" strokeWidth="1.75" />
      <line x1="25" y1="57" x2="39" y2="61" stroke="#475569" strokeWidth="1.75" />
      <line x1="25" y1="65" x2="39" y2="69" stroke="#475569" strokeWidth="1.75" />
      <line x1="25" y1="73" x2="39" y2="77" stroke="#475569" strokeWidth="1.75" />
      <path d="M14,20 L50,20 L44,35 L20,35 Z" fill="url(#mechMetal)" stroke="#475569" strokeWidth="1.5" />
      <line x1="32" y1="20" x2="32" y2="35" stroke="#cbd5e1" />
    </g>
    <g transform="translate(56, 44)">
      <polygon points="20,0 37,10 37,30 20,40 3,30 3,10" fill="url(#mechMetal)" stroke="#475569" strokeWidth="1.5" />
      <circle cx="20" cy="20" r="10" fill="#0f172a" stroke="#475569" strokeWidth="1" />
      <circle cx="20" cy="20" r="12" fill="none" stroke="#475569" strokeWidth="0.75" strokeDasharray="18 6" />
    </g>
    <defs>
      <linearGradient id="mechMetal" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stopColor="#94a3b8" />
        <stop offset="50%" stopColor="#f1f5f9" />
        <stop offset="100%" stopColor="#64748b" />
      </linearGradient>
    </defs>
  </svg>
);

// Printed Circuit Board SVG (Generic / Fallback PCB)
const PcbSvg = () => (
  <svg viewBox="0 0 100 100" className="w-20 h-20 filter drop-shadow-[0_4px_6px_rgba(0,0,0,0.4)]">
    <rect x="10" y="10" width="80" height="80" rx="6" fill="#065f46" stroke="#047857" strokeWidth="2.5" />
    <circle cx="18" cy="18" r="4.5" fill="#0f172a" stroke="#fbbf24" strokeWidth="1.5" />
    <circle cx="82" cy="18" r="4.5" fill="#0f172a" stroke="#fbbf24" strokeWidth="1.5" />
    <circle cx="18" cy="82" r="4.5" fill="#0f172a" stroke="#fbbf24" strokeWidth="1.5" />
    <circle cx="82" cy="82" r="4.5" fill="#0f172a" stroke="#fbbf24" strokeWidth="1.5" />
    <path d="M30,30 H70 V70 H30 Z" fill="none" stroke="#a7f3d0" strokeWidth="1" strokeDasharray="4 2" />
    <path d="M18,35 H45 V55 H30 V82" fill="none" stroke="#fbbf24" strokeWidth="1.75" />
    <path d="M82,45 H55 V65" fill="none" stroke="#fbbf24" strokeWidth="1.75" />
    <rect x="52" y="32" width="6.5" height="4.5" fill="#cbd5e1" stroke="#475569" strokeWidth="0.5" />
    <rect x="62" y="32" width="6.5" height="4.5" fill="#cbd5e1" stroke="#475569" strokeWidth="0.5" />
    <rect x="52" y="42" width="6.5" height="4.5" fill="#cbd5e1" stroke="#475569" strokeWidth="0.5" />
    <rect x="62" y="42" width="6.5" height="4.5" fill="#cbd5e1" stroke="#475569" strokeWidth="0.5" />
    <circle cx="45" cy="55" r="3" fill="#cbd5e1" stroke="#475569" strokeWidth="0.5" />
    <circle cx="30" cy="55" r="3" fill="#cbd5e1" stroke="#475569" strokeWidth="0.5" />
  </svg>
);

// -------------------------------------------------------------
// Parametric SVGs
// -------------------------------------------------------------

// 1. Connectors SVG (Parametric)
const ConnectorSvg: React.FC<{ name: string }> = ({ name }) => {
  const lowerName = name.toLowerCase();
  
  if (lowerName.includes("usb")) {
    // USB Connector (Type-C shape)
    return (
      <svg viewBox="0 0 100 100" className="w-20 h-20 filter drop-shadow-[0_4px_6px_rgba(0,0,0,0.4)]">
        <rect x="20" y="35" width="60" height="30" rx="10" fill="#1e293b" stroke="#475569" strokeWidth="2" />
        <rect x="25" y="40" width="50" height="20" rx="6" fill="#cbd5e1" stroke="#94a3b8" strokeWidth="1.5" />
        <line x1="33" y1="50" x2="67" y2="50" stroke="#f59e0b" strokeWidth="3" strokeDasharray="3 2" />
      </svg>
    );
  }

  if (lowerName.includes("ethernet") || lowerName.includes("modular") || lowerName.includes("rj")) {
    // RJ-45 Ethernet Connector
    return (
      <svg viewBox="0 0 100 100" className="w-20 h-20 filter drop-shadow-[0_4px_6px_rgba(0,0,0,0.4)]">
        <rect x="22" y="25" width="56" height="50" rx="3" fill="#334155" stroke="#475569" strokeWidth="2" />
        <path d="M40,75 L40,85 L60,85 L60,75 Z" fill="#475569" />
        <rect x="32" y="32" width="36" height="15" fill="#1e293b" />
        <line x1="35" y1="32" x2="35" y2="47" stroke="#fbbf24" strokeWidth="1.5" />
        <line x1="39" y1="32" x2="39" y2="47" stroke="#fbbf24" strokeWidth="1.5" />
        <line x1="43" y1="32" x2="43" y2="47" stroke="#fbbf24" strokeWidth="1.5" />
        <line x1="47" y1="32" x2="47" y2="47" stroke="#fbbf24" strokeWidth="1.5" />
        <line x1="51" y1="32" x2="51" y2="47" stroke="#fbbf24" strokeWidth="1.5" />
        <line x1="55" y1="32" x2="55" y2="47" stroke="#fbbf24" strokeWidth="1.5" />
        <line x1="59" y1="32" x2="59" y2="47" stroke="#fbbf24" strokeWidth="1.5" />
        <line x1="63" y1="32" x2="63" y2="47" stroke="#fbbf24" strokeWidth="1.5" />
      </svg>
    );
  }

  if (lowerName.includes("d sub") || lowerName.includes("db9") || lowerName.includes("db15")) {
    // D-Sub Connector
    return (
      <svg viewBox="0 0 100 100" className="w-22 h-22 filter drop-shadow-[0_4px_6px_rgba(0,0,0,0.4)]">
        <polygon points="15,35 85,35 77,65 23,65" fill="#cbd5e1" stroke="#475569" strokeWidth="2" />
        <polygon points="18,38 82,38 75,62 25,62" fill="#1e293b" />
        <circle cx="30" cy="46" r="2.5" fill="#fbbf24" />
        <circle cx="40" cy="46" r="2.5" fill="#fbbf24" />
        <circle cx="50" cy="46" r="2.5" fill="#fbbf24" />
        <circle cx="60" cy="46" r="2.5" fill="#fbbf24" />
        <circle cx="70" cy="46" r="2.5" fill="#fbbf24" />
        <circle cx="35" cy="54" r="2.5" fill="#fbbf24" />
        <circle cx="45" cy="54" r="2.5" fill="#fbbf24" />
        <circle cx="55" cy="54" r="2.5" fill="#fbbf24" />
        <circle cx="65" cy="54" r="2.5" fill="#fbbf24" />
      </svg>
    );
  }

  if (lowerName.includes("terminal block") || lowerName.includes("screw terminal")) {
    // Screw Terminal Block
    return (
      <svg viewBox="0 0 100 100" className="w-20 h-20 filter drop-shadow-[0_4px_6px_rgba(0,0,0,0.4)]">
        <rect x="15" y="25" width="70" height="50" rx="3" fill="#047857" stroke="#064e3b" strokeWidth="2" />
        <line x1="30" y1="75" x2="30" y2="85" stroke="#cbd5e1" strokeWidth="4" />
        <line x1="70" y1="75" x2="70" y2="85" stroke="#cbd5e1" strokeWidth="4" />
        <rect x="22" y="32" width="22" height="30" fill="#022c22" rx="1" />
        <rect x="56" y="32" width="22" height="30" fill="#022c22" rx="1" />
        <circle cx="33" cy="47" r="8" fill="#94a3b8" stroke="#475569" strokeWidth="1" />
        <line x1="28" y1="42" x2="38" y2="52" stroke="#475569" strokeWidth="2.5" />
        <circle cx="67" cy="47" r="8" fill="#94a3b8" stroke="#475569" strokeWidth="1" />
        <line x1="62" y1="42" x2="72" y2="52" stroke="#475569" strokeWidth="2.5" />
      </svg>
    );
  }

  if (lowerName.includes("sim card") || lowerName.includes("memory")) {
    // SIM Card Slot / Memory Card Connector
    return (
      <svg viewBox="0 0 100 100" className="w-20 h-20 filter drop-shadow-[0_4px_6px_rgba(0,0,0,0.4)]">
        <rect x="18" y="25" width="64" height="50" rx="2" fill="#cbd5e1" stroke="#64748b" strokeWidth="1.5" />
        <rect x="22" y="29" width="56" height="42" fill="#1e293b" />
        <path d="M22,60 H78 M32,29 V71 M44,29 V71 M56,29 V71 M68,29 V71" stroke="#475569" strokeWidth="0.75" />
        <rect x="14" y="35" width="4" height="6" fill="#fbbf24" />
        <rect x="14" y="55" width="4" height="6" fill="#fbbf24" />
        <rect x="82" y="35" width="4" height="6" fill="#fbbf24" />
        <rect x="82" y="55" width="4" height="6" fill="#fbbf24" />
      </svg>
    );
  }

  // Fallback: Pin Headers (Dupont / IDC / Berg)
  return (
    <svg viewBox="0 0 100 100" className="w-20 h-20 filter drop-shadow-[0_4px_6px_rgba(0,0,0,0.4)]">
      <rect x="15" y="45" width="70" height="18" rx="2" fill="#1e293b" stroke="#475569" strokeWidth="1" />
      <line x1="26" y1="45" x2="26" y2="63" stroke="#334155" strokeWidth="1" />
      <line x1="38" y1="45" x2="38" y2="63" stroke="#334155" strokeWidth="1" />
      <line x1="50" y1="45" x2="50" y2="63" stroke="#334155" strokeWidth="1" />
      <line x1="62" y1="45" x2="62" y2="63" stroke="#334155" strokeWidth="1" />
      <line x1="74" y1="45" x2="74" y2="63" stroke="#334155" strokeWidth="1" />
      
      <rect x="23" y="18" width="6" height="27" rx="1" fill="url(#goldGrad)" />
      <rect x="35" y="18" width="6" height="27" rx="1" fill="url(#goldGrad)" />
      <rect x="47" y="18" width="6" height="27" rx="1" fill="url(#goldGrad)" />
      <rect x="59" y="18" width="6" height="27" rx="1" fill="url(#goldGrad)" />
      <rect x="71" y="18" width="6" height="27" rx="1" fill="url(#goldGrad)" />
      
      <path d="M26,63 L26,75 M38,63 L38,75 M50,63 L50,75 M62,63 L62,75 M74,63 L74,75" stroke="#94a3b8" strokeWidth="3.5" strokeLinecap="round" />
      <defs>
        <linearGradient id="goldGrad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#fbbf24" />
          <stop offset="50%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
      </defs>
    </svg>
  );
};

// 2. Cables SVG (Parametric)
const CableSvg: React.FC<{ name: string }> = ({ name }) => {
  const lowerName = name.toLowerCase();

  if (lowerName.includes("frc") || lowerName.includes("ribbon")) {
    // Flat Flexible Ribbon Cable
    return (
      <svg viewBox="0 0 100 100" className="w-22 h-22 filter drop-shadow-[0_4px_6px_rgba(0,0,0,0.4)]">
        <path d="M15,10 V90 H45 V10" fill="#cbd5e1" stroke="#94a3b8" strokeWidth="1" />
        <rect x="15" y="10" width="4" height="80" fill="#ef4444" />
        <line x1="23" y1="10" x2="23" y2="90" stroke="#b2c1d3" strokeWidth="0.75" />
        <line x1="27" y1="10" x2="27" y2="90" stroke="#b2c1d3" strokeWidth="0.75" />
        <line x1="31" y1="10" x2="31" y2="90" stroke="#b2c1d3" strokeWidth="0.75" />
        <line x1="35" y1="10" x2="35" y2="90" stroke="#b2c1d3" strokeWidth="0.75" />
        <line x1="39" y1="10" x2="39" y2="90" stroke="#b2c1d3" strokeWidth="0.75" />
        <line x1="43" y1="10" x2="43" y2="90" stroke="#b2c1d3" strokeWidth="0.75" />
        <rect x="11" y="25" width="38" height="10" fill="#1e293b" stroke="#475569" strokeWidth="1" />
      </svg>
    );
  }

  // Wires (silicone / pvc / hookup)
  return (
    <svg viewBox="0 0 100 100" className="w-20 h-20 filter drop-shadow-[0_4px_6px_rgba(0,0,0,0.4)]">
      <path d="M10,25 Q30,15 50,45 T90,35" fill="none" stroke="#ef4444" strokeWidth="4.5" strokeLinecap="round" />
      <path d="M10,40 Q30,30 50,60 T90,50" fill="none" stroke="#3b82f6" strokeWidth="4.5" strokeLinecap="round" />
      <path d="M10,55 Q30,45 50,75 T90,65" fill="none" stroke="#eab308" strokeWidth="4.5" strokeLinecap="round" />
      <path d="M10,70 Q30,60 50,90 T90,80" fill="none" stroke="#10b981" strokeWidth="4.5" strokeLinecap="round" />
      <circle cx="90" cy="35" r="2.5" fill="#cbd5e1" />
      <circle cx="90" cy="50" r="2.5" fill="#cbd5e1" />
      <circle cx="90" cy="65" r="2.5" fill="#cbd5e1" />
      <circle cx="90" cy="80" r="2.5" fill="#cbd5e1" />
    </svg>
  );
};

// 3. Resistors & Passives SVG (Parametric)
const PassivesSvg: React.FC<{ name: string }> = ({ name }) => {
  const lowerName = name.toLowerCase();

  if (lowerName.includes("ldr") || lowerName.includes("light")) {
    // Light Dependent Resistor LDR
    return (
      <svg viewBox="0 0 100 100" className="w-20 h-20 filter drop-shadow-[0_4px_6px_rgba(0,0,0,0.4)]">
        <line x1="40" y1="55" x2="40" y2="90" stroke="#94a3b8" strokeWidth="2.5" />
        <line x1="60" y1="55" x2="60" y2="90" stroke="#94a3b8" strokeWidth="2.5" />
        <circle cx="50" cy="35" r="22" fill="#ea580c" stroke="#c2410c" strokeWidth="1.5" />
        <circle cx="50" cy="35" r="18" fill="#fed7aa" />
        <path d="M38,30 H62 L38,36 H62 L38,42 H62" fill="none" stroke="#dc2626" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }

  if (lowerName.includes("thermistor")) {
    // Thermistor
    return (
      <svg viewBox="0 0 100 100" className="w-20 h-20 filter drop-shadow-[0_4px_6px_rgba(0,0,0,0.4)]">
        <line x1="44" y1="42" x2="44" y2="90" stroke="#94a3b8" strokeWidth="2" />
        <line x1="56" y1="42" x2="56" y2="90" stroke="#94a3b8" strokeWidth="2" />
        <path d="M50,20 C42,20 40,30 44,45 C47,50 53,50 56,45 C60,30 58,20 50,20 Z" fill="#0f172a" stroke="#1e293b" strokeWidth="1.5" />
        <circle cx="50" cy="27" r="4" fill="#2563eb" />
      </svg>
    );
  }

  if (lowerName.includes("potentiometer") || lowerName.includes("trimmer")) {
    // Rotary Potentiometer
    return (
      <svg viewBox="0 0 100 100" className="w-20 h-20 filter drop-shadow-[0_4px_6px_rgba(0,0,0,0.4)]">
        <rect x="22" y="32" width="56" height="42" rx="3" fill="#2563eb" stroke="#1d4ed8" strokeWidth="2" />
        <circle cx="50" cy="53" r="14" fill="#cbd5e1" stroke="#94a3b8" strokeWidth="1.5" />
        <line x1="50" y1="53" x2="50" y2="42" stroke="#ef4444" strokeWidth="3.5" strokeLinecap="round" />
        <circle cx="50" cy="22" r="5" fill="#f1f5f9" stroke="#64748b" strokeWidth="1" />
        <line x1="47" y1="22" x2="53" y2="22" stroke="#64748b" strokeWidth="2" />
        <rect x="28" y="74" width="6" height="14" fill="#cbd5e1" />
        <rect x="47" y="74" width="6" height="14" fill="#cbd5e1" />
        <rect x="66" y="74" width="6" height="14" fill="#cbd5e1" />
      </svg>
    );
  }

  if (lowerName.includes("capacitor")) {
    if (lowerName.includes("ceramic") || lowerName.includes("disc") || lowerName.includes("mlcc")) {
      // Ceramic Disc Capacitor
      return (
        <svg viewBox="0 0 100 100" className="w-20 h-20 filter drop-shadow-[0_4px_6px_rgba(0,0,0,0.4)]">
          <line x1="42" y1="52" x2="42" y2="90" stroke="#cbd5e1" strokeWidth="2.5" />
          <line x1="58" y1="52" x2="58" y2="90" stroke="#cbd5e1" strokeWidth="2.5" />
          <circle cx="50" cy="35" r="18" fill="#ea580c" stroke="#c2410c" strokeWidth="1" />
          <text x="50" y="38" textAnchor="middle" fill="#fdf2e9" fontSize="9" fontFamily="sans-serif" fontWeight="bold">104</text>
        </svg>
      );
    }
    return <CapacitorSvg />;
  }

  if (lowerName.includes("diode")) {
    // Diode
    return (
      <svg viewBox="0 0 100 100" className="w-20 h-20 filter drop-shadow-[0_4px_6px_rgba(0,0,0,0.4)]">
        <line x1="5" y1="50" x2="95" y2="50" stroke="#cbd5e1" strokeWidth="3" strokeLinecap="round" />
        <rect x="24" y="38" width="52" height="24" rx="2" fill="#0f172a" stroke="#1e293b" strokeWidth="1" />
        <rect x="62" y="38" width="8" height="24" fill="#cbd5e1" />
      </svg>
    );
  }

  if (lowerName.includes("inductor") || lowerName.includes("bead") || lowerName.includes("coil")) {
    // Inductor
    return (
      <svg viewBox="0 0 100 100" className="w-20 h-20 filter drop-shadow-[0_4px_6px_rgba(0,0,0,0.4)]">
        <line x1="5" y1="50" x2="95" y2="50" stroke="#94a3b8" strokeWidth="3" strokeLinecap="round" />
        <rect x="25" y="38" width="50" height="24" rx="4" fill="#475569" stroke="#334155" strokeWidth="1" />
        <rect x="29" y="35" width="5" height="30" rx="2" fill="#d97706" />
        <rect x="37" y="35" width="5" height="30" rx="2" fill="#d97706" />
        <rect x="45" y="35" width="5" height="30" rx="2" fill="#d97706" />
        <rect x="53" y="35" width="5" height="30" rx="2" fill="#d97706" />
        <rect x="61" y="35" width="5" height="30" rx="2" fill="#d97706" />
        <rect x="69" y="35" width="5" height="30" rx="2" fill="#d97706" />
      </svg>
    );
  }

  // Standard Resistor
  const hash = getHash(name);
  const colorBands = ["#78350f", "#ef4444", "#f97316", "#eab308", "#10b981", "#3b82f6", "#8b5cf6", "#64748b", "#cbd5e1"];
  const b1 = colorBands[hash % colorBands.length];
  const b2 = colorBands[(hash + 2) % colorBands.length];
  const b3 = colorBands[(hash + 5) % colorBands.length];

  return (
    <svg viewBox="0 0 100 100" className="w-20 h-20 filter drop-shadow-[0_4px_6px_rgba(0,0,0,0.4)]">
      <line x1="5" y1="50" x2="95" y2="50" stroke="#94a3b8" strokeWidth="3" strokeLinecap="round" />
      <rect x="25" y="36" width="50" height="28" rx="6" fill="#f8fafc" stroke="#64748b" strokeWidth="1" />
      <rect x="33" y="34" width="34" height="32" rx="2" fill="#e2e8f0" stroke="#64748b" strokeWidth="0.5" />
      
      <rect x="32" y="34" width="4.5" height="32" fill={b1} />
      <rect x="42" y="36" width="4.5" height="28" fill={b2} />
      <rect x="52" y="36" width="4.5" height="28" fill={b3} />
      <rect x="64" y="34" width="4.5" height="32" fill="#d97706" />
    </svg>
  );
};

// 4. Optoelectronics SVG (Parametric)
const OptoelectronicsSvg: React.FC<{ name: string }> = ({ name }) => {
  const lowerName = name.toLowerCase();

  if (lowerName.includes("rgb")) {
    // RGB LED
    return (
      <svg viewBox="0 0 100 100" className="w-20 h-20 filter drop-shadow-[0_4px_6px_rgba(0,0,0,0.4)]">
        <defs>
          <radialGradient id="rgbGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#10b981" stopOpacity="0.4" />
            <stop offset="50%" stopColor="#ef4444" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
          </radialGradient>
        </defs>
        <circle cx="50" cy="40" r="30" fill="url(#rgbGlow)" className="animate-pulse" />
        <line x1="38" y1="60" x2="38" y2="92" stroke="#cbd5e1" strokeWidth="2.2" />
        <line x1="46" y1="60" x2="46" y2="92" stroke="#cbd5e1" strokeWidth="2.2" />
        <line x1="54" y1="60" x2="54" y2="92" stroke="#cbd5e1" strokeWidth="2.2" />
        <line x1="62" y1="60" x2="62" y2="92" stroke="#cbd5e1" strokeWidth="2.2" />
        <path d="M32,60 L32,42 A18,18 0 0,1 68,42 L68,60 Z" fill="#cbd5e1" fillOpacity="0.4" stroke="#94a3b8" strokeWidth="1.5" />
        <rect x="29" y="57" width="42" height="4.5" rx="1.5" fill="#cbd5e1" stroke="#94a3b8" strokeWidth="0.5" />
        <rect x="39" y="47" width="4" height="4" fill="#ef4444" />
        <rect x="48" y="47" width="4" height="4" fill="#10b981" />
        <rect x="57" y="47" width="4" height="4" fill="#3b82f6" />
      </svg>
    );
  }

  if (lowerName.includes("panel") || lowerName.includes("indicator")) {
    // Metal Panel LED Indicator
    return (
      <svg viewBox="0 0 100 100" className="w-20 h-20 filter drop-shadow-[0_4px_6px_rgba(0,0,0,0.4)]">
        <rect x="25" y="42" width="50" height="28" rx="2" fill="url(#panelMetal)" stroke="#475569" strokeWidth="1.5" />
        <circle cx="50" cy="56" r="10" fill="#ef4444" stroke="#b91c1c" strokeWidth="1" className="animate-pulse" />
        <rect x="35" y="70" width="30" height="15" fill="#475569" stroke="#334155" strokeWidth="0.5" />
        <line x1="35" y1="75" x2="65" y2="75" stroke="#334155" strokeWidth="1" />
        <line x1="35" y1="80" x2="65" y2="80" stroke="#334155" strokeWidth="1" />
        <defs>
          <linearGradient id="panelMetal" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#94a3b8" />
            <stop offset="50%" stopColor="#f1f5f9" />
            <stop offset="100%" stopColor="#64748b" />
          </linearGradient>
        </defs>
      </svg>
    );
  }

  return <LedSvg />;
};

// 5. Switches & Relays (Parametric)
const RelayParametricSvg: React.FC<{ name: string }> = ({ name }) => {
  const lowerName = name.toLowerCase();

  if (lowerName.includes("solid state")) {
    // Solid State Relay SSR
    return (
      <svg viewBox="0 0 100 100" className="w-22 h-22 filter drop-shadow-[0_4px_6px_rgba(0,0,0,0.4)]">
        <rect x="15" y="15" width="70" height="70" rx="4" fill="#1e293b" stroke="#334155" strokeWidth="2.5" />
        <rect x="10" y="45" width="5" height="20" fill="#cbd5e1" />
        <rect x="85" y="45" width="5" height="20" fill="#cbd5e1" />
        <rect x="22" y="22" width="22" height="18" fill="#0f172a" rx="1" stroke="#334155" />
        <rect x="56" y="22" width="22" height="18" fill="#0f172a" rx="1" stroke="#334155" />
        <rect x="22" y="60" width="22" height="18" fill="#0f172a" rx="1" stroke="#334155" />
        <rect x="56" y="60" width="22" height="18" fill="#0f172a" rx="1" stroke="#334155" />
        <circle cx="33" cy="31" r="5" fill="#94a3b8" />
        <circle cx="67" cy="31" r="5" fill="#94a3b8" />
        <circle cx="33" cy="69" r="5" fill="#94a3b8" />
        <circle cx="67" cy="69" r="5" fill="#94a3b8" />
        <circle cx="50" cy="50" r="3.5" fill="#ef4444" className="animate-pulse" />
      </svg>
    );
  }

  return <RelaySvg />;
};

// 6. Integrated Circuits SVG (Parametric)
const IcParametricSvg: React.FC<{ name: string }> = ({ name }) => {
  const lowerName = name.toLowerCase();
  let cleanLabel = "IC CHIP";
  
  const matches = name.match(/[a-zA-Z]*\d+[a-zA-Z\d]*/g);
  if (matches && matches.length > 0) {
    const chipCode = matches.reduce((longest, current) => {
      return (current.length > longest.length && /\d/.test(current)) ? current : longest;
    }, "");
    if (chipCode.length >= 3) {
      cleanLabel = chipCode.toUpperCase();
    }
  } else {
    const firstWord = name.split(" ")[0].replace(/[^a-zA-Z]/g, "");
    if (firstWord.length > 2) {
      cleanLabel = firstWord.toUpperCase();
    }
  }

  cleanLabel = cleanLabel.substring(0, 10);

  if (lowerName.includes("microcontroller") || lowerName.includes("arm") || lowerName.includes("fpga") || lowerName.includes("switching ic")) {
    // QFP Square Package
    return (
      <svg viewBox="0 0 100 100" className="w-22 h-22 filter drop-shadow-[0_4px_6px_rgba(0,0,0,0.4)]">
        <path d="M12,30 H25 M12,40 H25 M12,50 H25 M12,60 H25 M12,70 H25" stroke="#cbd5e1" strokeWidth="2.5" />
        <path d="M75,30 H88 M75,40 H88 M75,50 H88 M75,60 H88 M75,70 H88" stroke="#cbd5e1" strokeWidth="2.5" />
        <path d="M30,12 V25 M40,12 V25 M50,12 V25 M60,12 V25 M70,12 V25" stroke="#cbd5e1" strokeWidth="2.5" />
        <path d="M30,75 V88 M40,75 V88 M50,75 V88 M60,75 V88 M70,75 V88" stroke="#cbd5e1" strokeWidth="2.5" />
        
        <rect x="22" y="22" width="56" height="56" rx="4" fill="#1e293b" stroke="#334155" strokeWidth="1.5" />
        <polygon points="26,26 34,26 26,34" fill="#0f172a" />
        <text x="50" y="47" textAnchor="middle" fill="#94a3b8" fontSize="8" fontFamily="monospace" fontWeight="bold">{cleanLabel}</text>
        <text x="50" y="58" textAnchor="middle" fill="#64748b" fontSize="5.5" fontFamily="monospace" fontWeight="bold">ARM CORE</text>
      </svg>
    );
  }

  // DIP Package
  return (
    <svg viewBox="0 0 100 100" className="w-20 h-20 filter drop-shadow-[0_4px_6px_rgba(0,0,0,0.4)]">
      <path d="M14,28 H25 M14,40 H25 M14,52 H25 M14,64 H25 M14,76 H25" stroke="#94a3b8" strokeWidth="3" strokeLinecap="round" />
      <path d="M75,28 H86 M75,40 H86 M75,52 H86 M75,64 H86 M75,76 H86" stroke="#94a3b8" strokeWidth="3" strokeLinecap="round" />
      <rect x="24" y="18" width="52" height="64" rx="2" fill="#1e293b" stroke="#334155" strokeWidth="1.5" />
      <path d="M43,18 A7,7 0 0,0 57,18" fill="#0f172a" stroke="#334155" strokeWidth="1" />
      <circle cx="33" cy="27" r="2.5" fill="#0f172a" />
      <text x="50" y="48" textAnchor="middle" fill="#cbd5e1" fontSize="9" fontFamily="monospace" fontWeight="bold">{cleanLabel}</text>
      <text x="50" y="58" textAnchor="middle" fill="#64748b" fontSize="6.5" fontFamily="monospace">GENERIC IC</text>
    </svg>
  );
};

// 7. Mechanical Hardware SVG (Parametric)
const MechanicalParametricSvg: React.FC<{ name: string }> = ({ name }) => {
  const lowerName = name.toLowerCase();

  if (lowerName.includes("extrusion") || lowerName.includes("profile")) {
    // Aluminum Extrusion profile
    return (
      <svg viewBox="0 0 100 100" className="w-20 h-20 filter drop-shadow-[0_4px_6px_rgba(0,0,0,0.4)]">
        <path d="
          M30,20 H70 V30 H60 V40 H70 V45 H60 V55 H70 V60 H60 V70 H70 V80 H30 V70 H40 V60 H30 V55 H40 V45 H30 V40 H40 V30 H30 Z
        " fill="url(#profileMetal)" stroke="#475569" strokeWidth="1.5" />
        <circle cx="50" cy="50" r="10" fill="#0f172a" stroke="#64748b" strokeWidth="1" />
        <rect x="15" y="46" width="10" height="8" fill="#0f172a" />
        <rect x="75" y="46" width="10" height="8" fill="#0f172a" />
        <rect x="46" y="15" width="8" height="10" fill="#0f172a" />
        <rect x="46" y="75" width="8" height="10" fill="#0f172a" />
        <defs>
          <linearGradient id="profileMetal" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#cbd5e1" />
            <stop offset="50%" stopColor="#f1f5f9" />
            <stop offset="100%" stopColor="#94a3b8" />
          </linearGradient>
        </defs>
      </svg>
    );
  }

  if (lowerName.includes("bearing")) {
    // Ball Bearing Ring
    return (
      <svg viewBox="0 0 100 100" className="w-20 h-20 filter drop-shadow-[0_4px_6px_rgba(0,0,0,0.4)]">
        <circle cx="50" cy="50" r="38" fill="none" stroke="url(#mechMetal)" strokeWidth="8" />
        <circle cx="50" cy="50" r="24" fill="#0f172a" stroke="url(#mechMetal)" strokeWidth="6" />
        <circle cx="50" cy="19" r="4.5" fill="#f1f5f9" stroke="#475569" />
        <circle cx="72" cy="28" r="4.5" fill="#f1f5f9" stroke="#475569" />
        <circle cx="81" cy="50" r="4.5" fill="#f1f5f9" stroke="#475569" />
        <circle cx="72" cy="72" r="4.5" fill="#f1f5f9" stroke="#475569" />
        <circle cx="50" cy="81" r="4.5" fill="#f1f5f9" stroke="#475569" />
        <circle cx="28" cy="72" r="4.5" fill="#f1f5f9" stroke="#475569" />
        <circle cx="19" cy="50" r="4.5" fill="#f1f5f9" stroke="#475569" />
        <circle cx="28" cy="28" r="4.5" fill="#f1f5f9" stroke="#475569" />
        <defs>
          <linearGradient id="mechMetal" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#94a3b8" />
            <stop offset="50%" stopColor="#f1f5f9" />
            <stop offset="100%" stopColor="#64748b" />
          </linearGradient>
        </defs>
      </svg>
    );
  }

  if (lowerName.includes("standoff") || lowerName.includes("spacer")) {
    // Brass Hex Standoff
    return (
      <svg viewBox="0 0 100 100" className="w-20 h-20 filter drop-shadow-[0_4px_6px_rgba(0,0,0,0.4)]">
        <polygon points="30,15 70,15 82,32 82,68 70,85 30,85 18,68 18,32" fill="url(#brassStandoff)" stroke="#d97706" strokeWidth="1.5" />
        <circle cx="50" cy="50" r="14" fill="#0f172a" stroke="#d97706" strokeWidth="1" strokeDasharray="3 2" />
        <line x1="30" y1="15" x2="30" y2="85" stroke="#f59e0b" strokeWidth="1.5" />
        <line x1="70" y1="15" x2="70" y2="85" stroke="#b45309" strokeWidth="1.5" />
        <defs>
          <linearGradient id="brassStandoff" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#fbbf24" />
            <stop offset="50%" stopColor="#f59e0b" />
            <stop offset="100%" stopColor="#92400e" />
          </linearGradient>
        </defs>
      </svg>
    );
  }

  return <MechanicalSvg />;
};

// 8. Wireless RF Module SVG
const WirelessModuleSvg = () => {
  return (
    <svg viewBox="0 0 100 100" className="w-20 h-20 filter drop-shadow-[0_4px_6px_rgba(0,0,0,0.4)]">
      <rect x="15" y="15" width="70" height="70" rx="4" fill="#1e3a8a" stroke="#1d4ed8" strokeWidth="2" />
      <rect x="10" y="25" width="5" height="5" fill="#fbbf24" />
      <rect x="10" y="38" width="5" height="5" fill="#fbbf24" />
      <rect x="10" y="51" width="5" height="5" fill="#fbbf24" />
      <rect x="10" y="64" width="5" height="5" fill="#fbbf24" />
      <rect x="85" y="25" width="5" height="5" fill="#fbbf24" />
      <rect x="85" y="38" width="5" height="5" fill="#fbbf24" />
      <rect x="85" y="51" width="5" height="5" fill="#fbbf24" />
      <rect x="85" y="64" width="5" height="5" fill="#fbbf24" />
      <path d="M22,25 H30 V20 H38 V25 H46 V20 H54 V25 H62 V20 H70" fill="none" stroke="#fbbf24" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="25" y="36" width="50" height="42" rx="2" fill="url(#shieldMetal)" stroke="#64748b" strokeWidth="1" />
      <line x1="25" y1="40" x2="75" y2="40" stroke="#94a3b8" strokeWidth="0.5" />
      <text x="50" y="60" textAnchor="middle" fill="#94a3b8" fontSize="7" fontFamily="monospace" fontWeight="bold">FCC ID</text>
      <defs>
        <linearGradient id="shieldMetal" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#94a3b8" />
          <stop offset="50%" stopColor="#cbd5e1" />
          <stop offset="100%" stopColor="#475569" />
        </linearGradient>
      </defs>
    </svg>
  );
};

// -------------------------------------------------------------
// Main Component
// -------------------------------------------------------------
export const ProductImage: React.FC<ProductImageProps> = ({ product, className }) => {
  if (product.image) {
    return (
      <div className={`relative overflow-hidden bg-white flex items-center justify-center p-4 ${className || "h-40"}`}>
        <img
          src={product.image}
          alt={product.cleanName}
          className="w-full h-full object-contain filter drop-shadow-sm select-none"
          loading="lazy"
        />
      </div>
    );
  }

  const nameLower = product.name.toLowerCase();
  const cleanLower = product.cleanName.toLowerCase();
  
  // Direct matches
  if (cleanLower.includes("arduino uno") || nameLower.includes("official arduino") || nameLower.includes("original arduino")) {
    return (
      <div className={`relative overflow-hidden bg-white flex items-center justify-center p-4 ${className || "h-40"}`}>
        <img src="/arduino_uno.png" alt={product.cleanName} className="w-full h-full object-contain filter drop-shadow-sm select-none" loading="lazy" />
      </div>
    );
  }
  
  if (cleanLower.includes("esp32") || cleanLower.includes("devkit") || nameLower.includes("espressif")) {
    return (
      <div className={`relative overflow-hidden bg-white flex items-center justify-center p-4 ${className || "h-40"}`}>
        <img src="/esp32_devkit.png" alt={product.cleanName} className="w-full h-full object-contain filter drop-shadow-sm select-none" loading="lazy" />
      </div>
    );
  }
  
  if (cleanLower.includes("hc-sr04") || cleanLower.includes("ultrasonic sensor")) {
    return (
      <div className={`relative overflow-hidden bg-white flex items-center justify-center p-4 ${className || "h-40"}`}>
        <img src="/hc_sr04.png" alt={product.cleanName} className="w-full h-full object-contain filter drop-shadow-sm select-none" loading="lazy" />
      </div>
    );
  }
  
  if (cleanLower.includes("robot car") || cleanLower.includes("robotic arm") || cleanLower.includes("robot kit")) {
    return (
      <div className={`relative overflow-hidden bg-white flex items-center justify-center p-4 ${className || "h-40"}`}>
        <img src="/smart_robot_car.png" alt={product.cleanName} className="w-full h-full object-contain filter drop-shadow-sm select-none" loading="lazy" />
      </div>
    );
  }

  if (cleanLower.includes("18650") || cleanLower.includes("battery") || cleanLower.includes("li-ion")) {
    return (
      <div className={`relative overflow-hidden bg-white flex items-center justify-center p-4 ${className || "h-40"}`}>
        <img src="/battery_18650.png" alt={product.cleanName} className="w-full h-full object-contain filter drop-shadow-sm select-none" loading="lazy" />
      </div>
    );
  }

  if (cleanLower.includes("soldering iron") || cleanLower.includes("soldering station")) {
    return (
      <div className={`relative overflow-hidden bg-white flex items-center justify-center p-4 ${className || "h-40"}`}>
        <img src="/soldering_iron.png" alt={product.cleanName} className="w-full h-full object-contain filter drop-shadow-sm select-none" loading="lazy" />
      </div>
    );
  }

  if (cleanLower.includes("stem kit") || cleanLower.includes("learning kit") || cleanLower.includes("robotic kit") || cleanLower.includes("project kit")) {
    return (
      <div className={`relative overflow-hidden bg-white flex items-center justify-center p-4 ${className || "h-40"}`}>
        <img src="/stem_kit.png" alt={product.cleanName} className="w-full h-full object-contain filter drop-shadow-sm select-none" loading="lazy" />
      </div>
    );
  }

  if (cleanLower.includes("motor") || cleanLower.includes("servo") || cleanLower.includes("stepper")) {
    return (
      <div className={`relative overflow-hidden bg-white flex items-center justify-center p-4 ${className || "h-40"}`}>
        <img src="/dc_motor.png" alt={product.cleanName} className="w-full h-full object-contain filter drop-shadow-sm select-none" loading="lazy" />
      </div>
    );
  }

  // Category & Subcategory logic
  const mainCat = product.mainCategory;
  const subCat = product.subcategory;

  if (mainCat === "Electronic Components") {
    return (
      <div className={className || "h-40"}>
        <BlueprintContainer code={product.id}>
          {(() => {
            if (subCat === "Connectors") return <ConnectorSvg name={product.name} />;
            if (subCat === "Wires & Cables") return <CableSvg name={product.name} />;
            if (subCat === "Circuit Protection") return <FuseSvg />;
            if (subCat === "Frequency Control") return <CrystalSvg />;
            if (subCat === "Optoelectronics") return <OptoelectronicsSvg name={product.name} />;
            if (subCat === "Switches & Relays") return <RelayParametricSvg name={product.name} />;
            if (subCat === "Power & Magnetic Elements") return <TransformerSvg />;
            if (subCat === "Integrated Circuits (ICs)") return <IcParametricSvg name={product.name} />;
            if (subCat === "Passives & Discrete Semiconductors" || subCat === "Passives & Hardware Accessories") {
              return <PassivesSvg name={product.name} />;
            }
            return <PcbSvg />;
          })()}
        </BlueprintContainer>
      </div>
    );
  }

  if (mainCat === "Development Boards") {
    let imgPath = "/cat_arduino_ref.png";
    if (subCat === "Arduino Ecosystem") imgPath = "/cat_arduino_ref.png";
    else if (subCat === "Microcontroller Platforms") imgPath = "/esp32_devkit.png";
    else if (subCat === "Single Board Computers (SBC)") imgPath = "/cat_robotics_ref.png";
    else {
      return (
        <div className={className || "h-40"}>
          <BlueprintContainer code={product.id}>
            <PcbSvg />
          </BlueprintContainer>
        </div>
      );
    }
    return (
      <div className={`relative overflow-hidden bg-white flex items-center justify-center p-4 ${className || "h-40"}`}>
        <img src={imgPath} alt={product.cleanName} className="w-full h-full object-contain filter drop-shadow-sm select-none" loading="lazy" />
      </div>
    );
  }

  if (mainCat === "Sensors") {
    if (nameLower.includes("rfid") || nameLower.includes("transceiver") || nameLower.includes("bluetooth") || nameLower.includes("wifi")) {
      return (
        <div className={className || "h-40"}>
          <BlueprintContainer code={product.id}>
            <WirelessModuleSvg />
          </BlueprintContainer>
        </div>
      );
    }
    let imgPath = "/cat_sensors_ref.png";
    if (subCat === "Ultrasonic, Radar & Lidar") imgPath = "/hc_sr04.png";
    return (
      <div className={`relative overflow-hidden bg-white flex items-center justify-center p-4 ${className || "h-40"}`}>
        <img src={imgPath} alt={product.cleanName} className="w-full h-full object-contain filter drop-shadow-sm select-none" loading="lazy" />
      </div>
    );
  }

  if (mainCat === "DIY and Maker Kits") {
    return (
      <div className={`relative overflow-hidden bg-white flex items-center justify-center p-4 ${className || "h-40"}`}>
        <img src="/cat_stem_ref.png" alt={product.cleanName} className="w-full h-full object-contain filter drop-shadow-sm select-none" loading="lazy" />
      </div>
    );
  }

  if (mainCat === "Mechanical Parts, Measurement & Workbench Tools") {
    if (subCat === "Thermal Management") {
      return (
        <div className={className || "h-40"}>
          <BlueprintContainer code={product.id}>
            <HeatsinkSvg name={product.name} />
          </BlueprintContainer>
        </div>
      );
    }
    
    if (subCat === "Mechanical Hardware" || subCat === "Structural Elements") {
      return (
        <div className={className || "h-40"}>
          <BlueprintContainer code={product.id}>
            <MechanicalParametricSvg name={product.name} />
          </BlueprintContainer>
        </div>
      );
    }

    let imgPath = "/cat_tools_ref.png";
    if (subCat === "Soldering Tools & Equipment") imgPath = "/soldering_iron.png";
    return (
      <div className={`relative overflow-hidden bg-white flex items-center justify-center p-4 ${className || "h-40"}`}>
        <img src={imgPath} alt={product.cleanName} className="w-full h-full object-contain filter drop-shadow-sm select-none" loading="lazy" />
      </div>
    );
  }

  return (
    <div className={className || "h-40"}>
      <BlueprintContainer code={product.id}>
        <PcbSvg />
      </BlueprintContainer>
    </div>
  );
};
