"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useCart } from "../context/CartContext";
import { Mail, Phone, MapPin, Send } from "lucide-react";

export const Footer: React.FC = () => {
  const { setIsGstinModalOpen } = useCart();
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail("");
      setTimeout(() => setSubscribed(false), 5000);
    }
  };

  return (
    <footer className="bg-blue-950 text-white pt-12 pb-6 px-4">
      {/* Top Row: Links & About & Newsletter */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 border-b border-blue-900/60 pb-10">
        
        {/* About / Corp Info Column */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center gap-2">
            <span className="bg-blue-900 text-yellow-500 px-2 py-1.5 rounded-lg text-sm font-mono font-bold">CH</span>
            <span className="font-bold text-lg tracking-wide text-white">CircuitHub</span>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed max-w-sm">
            CircuitHub is a premier distributor of electronic parts, sensor kits, and prototyping tools, dedicated to helping engineers, makers, and students build the hardware of tomorrow.
          </p>

          <div className="space-y-2.5 pt-2 text-xs text-slate-300">
            <div className="font-semibold text-slate-200 text-sm">Corporate Office:</div>
            <div className="flex items-start gap-2 max-w-sm">
              <MapPin size={15} className="text-yellow-500 mt-0.5 flex-shrink-0" />
              <span>
                <strong>Arul Technologies</strong>
                <br />
                REGD Off: 604/14, Highland Residency, Yashswi Nagar, kolsheth Rd, Thane (w) - 400607
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Phone size={15} className="text-yellow-500 flex-shrink-0" />
              <a href="tel:+919004696834" className="hover:text-yellow-500 transition-colors">
                +91 90046 96834
              </a>
            </div>
            <div className="flex items-center gap-2">
              <Mail size={15} className="text-yellow-500 flex-shrink-0" />
              <a href="mailto:aruldst@gmail.com" className="hover:text-yellow-500 transition-colors">
                aruldst@gmail.com
              </a>
            </div>
            <div className="pt-1">
              <button
                onClick={() => setIsGstinModalOpen(true)}
                className="inline-block bg-blue-900 hover:bg-blue-850 border border-blue-800 text-slate-200 font-mono text-[11px] px-2.5 py-1 rounded transition-colors text-left"
              >
                GSTIN: <strong>27ACDPT2420Q2Z7</strong>
              </button>
            </div>
          </div>
        </div>

        {/* Shop Navigation Column */}
        <div className="space-y-4">
          <h3 className="font-bold text-sm text-yellow-500 tracking-wider uppercase">Shop</h3>
          <ul className="space-y-2 text-xs text-slate-300">
            <li><a href="#categories" className="hover:text-yellow-500 transition-colors">All Categories</a></li>
            <li><a href="#robotics-kits" className="hover:text-yellow-500 transition-colors">Robotics Kits</a></li>
            <li><a href="#components" className="hover:text-yellow-500 transition-colors">Dev Boards</a></li>
            <li><a href="#sensors" className="hover:text-yellow-500 transition-colors">Sensors &amp; Modules</a></li>
            <li><a href="#components" className="hover:text-yellow-500 transition-colors">Active Components</a></li>
            <li><Link href="/deals" className="hover:text-yellow-500 transition-colors">Maker Deals</Link></li>
          </ul>
        </div>

        {/* Customer Service Column */}
        <div className="space-y-4">
          <h3 className="font-bold text-sm text-yellow-500 tracking-wider uppercase">Customer Service</h3>
          <ul className="space-y-2 text-xs text-slate-300">
            <li><a href="#track-order" className="hover:text-yellow-500 transition-colors">Track Order</a></li>
            <li><a href="#shipping" className="hover:text-yellow-500 transition-colors">Shipping &amp; Delivery</a></li>
            <li><a href="#returns" className="hover:text-yellow-500 transition-colors">Returns &amp; Refunds</a></li>
            <li><a href="#help-center" className="hover:text-yellow-500 transition-colors">Help Center / FAQs</a></li>
            <li>
              <button
                onClick={() => setIsGstinModalOpen(true)}
                className="hover:text-yellow-500 transition-colors text-left"
              >
                GST Tax Credit Claims
              </button>
            </li>
            <li><a href="#privacy" className="hover:text-yellow-500 transition-colors">Privacy Policy</a></li>
          </ul>
        </div>

        {/* Newsletter Column */}
        <div className="space-y-4">
          <h3 className="font-bold text-sm text-yellow-500 tracking-wider uppercase">Newsletter</h3>
          <p className="text-xs text-slate-300 leading-relaxed">
            Subscribe to get project guides, new product releases, and exclusive maker coupons.
          </p>

          <form onSubmit={handleSubscribe} className="space-y-2">
            <div className="flex border border-blue-900 rounded-lg overflow-hidden bg-white/5 focus-within:ring-2 focus-within:ring-yellow-500">
              <input
                type="email"
                required
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-transparent border-none px-3 py-2 text-xs text-white placeholder-slate-400 focus:outline-none focus:ring-0"
              />
              <button
                type="submit"
                className="bg-yellow-500 hover:bg-yellow-600 transition-colors text-blue-950 px-3 flex items-center justify-center font-bold"
                aria-label="Subscribe"
              >
                <Send size={14} />
              </button>
            </div>
            {subscribed && (
              <p className="text-[10px] text-yellow-500 font-semibold animate-pulse">
                Awesome! You have subscribed to our mailing list.
              </p>
            )}
          </form>
        </div>

      </div>

      {/* Bottom Row: Copyright, Socials, Payments */}
      <div className="max-w-7xl mx-auto pt-6 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-slate-400">
        <div>
          &copy; {new Date().getFullYear()} <strong>CircuitHub Electronics</strong>. All rights reserved. Registered under <strong>Arul Technologies</strong>.
        </div>
        
        {/* Payment Icons */}
        <div className="flex items-center gap-3 bg-white/5 py-1 px-3 rounded border border-white/5">
          <span className="text-[10px] text-slate-400 font-medium">Accepted Payments:</span>
          <div className="flex gap-2.5 font-bold tracking-tight text-white/90">
            <span className="hover:text-white transition-colors cursor-default">Visa</span>
            <span className="text-blue-900/60 font-normal">|</span>
            <span className="hover:text-white transition-colors cursor-default">Mastercard</span>
            <span className="text-blue-900/60 font-normal">|</span>
            <span className="hover:text-white transition-colors cursor-default">PayPal</span>
            <span className="text-blue-900/60 font-normal">|</span>
            <span className="hover:text-white transition-colors cursor-default">Apple Pay</span>
            <span className="text-blue-900/60 font-normal">|</span>
            <span className="hover:text-white transition-colors cursor-default">Google Pay</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
