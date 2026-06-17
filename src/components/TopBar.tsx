import React from "react";
import { Mail, Phone, Package, HelpCircle } from "lucide-react";

export const TopBar: React.FC = () => {
  return (
    <div className="bg-blue-950 text-slate-200 text-xs py-2 px-4 border-b border-blue-900/40">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2">
        <div className="flex items-center gap-4">
          <a
            href="mailto:support@circuithub.com"
            className="flex items-center gap-1.5 hover:text-yellow-500 transition-colors"
          >
            <Mail size={12} className="text-yellow-500" />
            support@circuithub.com
          </a>
          <span className="text-blue-900/60 hidden sm:inline">|</span>
          <a
            href="tel:+18881234567"
            className="flex items-center gap-1.5 hover:text-yellow-500 transition-colors"
          >
            <Phone size={12} className="text-yellow-500" />
            +1 (888) 123-4567
          </a>
        </div>
        <div className="flex items-center gap-4">
          <a
            href="#track-order"
            className="flex items-center gap-1.5 hover:text-yellow-500 transition-colors"
          >
            <Package size={12} className="text-yellow-500" />
            Track Order
          </a>
          <span className="text-blue-900/60 hidden sm:inline">|</span>
          <a
            href="#help-center"
            className="flex items-center gap-1.5 hover:text-yellow-500 transition-colors"
          >
            <HelpCircle size={12} className="text-yellow-500" />
            Help Center
          </a>
        </div>
      </div>
    </div>
  );
};
