"use client";

import React, { useState, useEffect, Suspense } from "react";
import { TopBar } from "../../components/TopBar";
import { Header } from "../../components/Header";
import { Footer } from "../../components/Footer";
import { useCart } from "../../context/CartContext";
import { Percent, ShoppingCart, Star, Clock, Gift, Clipboard, Check, ChevronRight } from "lucide-react";
// Define base deal products locally with pricing and image details to avoid undefined properties
const dealProductsBase = [
  {
    id: "prod_uno",
    title: "Arduino Uno R3 Development Board",
    price: 24.99,
    image: "/arduino_uno.png",
    rating: 4.8,
    reviewsCount: 1245
  },
  {
    id: "prod_esp",
    title: "ESP32 DevKit V1 WiFi + Bluetooth",
    price: 12.99,
    image: "/esp32_devkit.png",
    rating: 4.9,
    reviewsCount: 986
  },
  {
    id: "prod_sr04",
    title: "HC-SR04 Ultrasonic Sensor",
    price: 3.49,
    image: "/hc_sr04.png",
    rating: 4.5,
    reviewsCount: 654
  },
  {
    id: "prod_car",
    title: "4WD Smart Robot Car Kit for Arduino",
    price: 49.99,
    image: "/smart_robot_car.png",
    rating: 4.7,
    reviewsCount: 432
  },
  {
    id: "prod_bat",
    title: "18650 Li-ion Battery 3.7V 2600mAh",
    price: 4.99,
    image: "/battery_18650.png",
    rating: 4.3,
    reviewsCount: 345
  }
];

export default function DealsPage() {
  const { addToCart } = useCart();
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  
  // Simulated deal countdown timer
  const [timeLeft, setTimeLeft] = useState({
    hours: 24,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else {
          return { hours: 24, minutes: 0, seconds: 0 }; // reset
        }
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  // Apply a 10% discount on the base products
  const dealProducts = dealProductsBase.map((p) => ({
    ...p,
    discountPrice: p.price * 0.9,
    discountPercent: 10
  }));

  const promoCodes = [
    { code: "MAKER10", desc: "10% OFF on all orders above $100", minOrder: "$100" },
    { code: "B2B18", desc: "18% GST Input tax credit savings + extra 5% bulk off", minOrder: "$500" },
    { code: "FREESHIP", desc: "Free delivery across all states in India", minOrder: "No minimum" }
  ];

  return (
    <div className="bg-gray-50 text-gray-900 min-h-screen flex flex-col">
      <TopBar />
      <Suspense fallback={<div className="h-20 bg-white border-b border-gray-150 animate-pulse" />}>
        <Header />
      </Suspense>

      <main className="flex-grow max-w-7xl w-full mx-auto px-4 py-12">
        {/* Page Title Header */}
        <div className="mb-10 text-left border-l-4 border-yellow-500 pl-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-extrabold text-blue-950 flex items-center gap-2">
              Maker Deals <span className="bg-red-500 text-white text-[10px] uppercase font-black px-1.5 py-0.5 rounded tracking-wide animate-pulse">HOT</span>
            </h1>
            <p className="text-sm text-gray-500 mt-1">Exclusive limited-time discounts and coupon codes for hardware hackers.</p>
          </div>

          {/* Real-time Countdown Timer */}
          <div className="bg-blue-950 text-white rounded-xl px-4 py-2 flex items-center gap-3 text-xs sm:text-sm font-semibold shadow-sm border border-blue-900/60 self-start sm:self-center">
            <Clock size={16} className="text-yellow-400 animate-pulse" />
            <span>Deals Refresh In:</span>
            <span className="font-mono text-yellow-400 font-extrabold tracking-wider">
              {String(timeLeft.hours).padStart(2, '0')}:{String(timeLeft.minutes).padStart(2, '0')}:{String(timeLeft.seconds).padStart(2, '0')}
            </span>
          </div>
        </div>

        {/* Promo Coupons Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {promoCodes.map((pc, idx) => (
            <div key={idx} className="bg-white border border-gray-150 rounded-2xl p-5 shadow-sm flex flex-col justify-between relative overflow-hidden group hover:border-yellow-500/40 transition-all duration-300">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-yellow-500">
                  <Gift size={18} />
                  <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Coupon Code</span>
                </div>
                <h3 className="text-lg font-bold text-blue-950 font-mono tracking-tight">{pc.code}</h3>
                <p className="text-xs sm:text-sm text-gray-650 leading-relaxed">{pc.desc}</p>
              </div>

              <div className="pt-4 mt-4 border-t border-gray-100 flex items-center justify-between gap-3">
                <span className="text-[10px] font-bold text-gray-400 uppercase">Min Order: {pc.minOrder}</span>
                <button
                  onClick={() => handleCopyCode(pc.code)}
                  className="bg-gray-50 hover:bg-yellow-500 hover:text-blue-950 text-gray-600 border border-gray-200 hover:border-yellow-500 px-3 py-1.5 rounded-lg text-xs font-mono font-bold flex items-center gap-1.5 transition-all cursor-pointer"
                >
                  {copiedCode === pc.code ? (
                    <>
                      <Check size={12} className="text-green-500" />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Clipboard size={12} />
                      Copy Code
                    </>
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Deal Products List */}
        <div className="bg-white border border-gray-150 rounded-2xl p-6 shadow-sm mb-12">
          <div className="border-b border-gray-150 pb-4 mb-6">
            <h2 className="text-xl font-bold text-blue-950 flex items-center gap-2">
              <Percent size={20} className="text-yellow-500" />
              Direct Product Discounts (10% Off Applied)
            </h2>
            <p className="text-xs text-gray-500 mt-0.5">Add to cart directly. Discount automatically computed.</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
            {dealProducts.map(product => (
              <div
                key={product.id}
                className="bg-gray-50 border border-gray-200 rounded-xl p-3 flex flex-col justify-between relative shadow-sm hover:shadow-md hover:border-blue-900/20 transition-all hover:-translate-y-1 group"
              >
                {/* Sale Tag */}
                <span className="absolute top-2 left-2 bg-red-500 text-white text-[9px] font-extrabold px-1.5 py-0.5 rounded tracking-wider uppercase z-10 shadow-sm animate-pulse">
                  -10% SALE
                </span>
                
                {/* Centered Image */}
                <div className="w-full h-32 bg-white rounded-lg mb-3 flex items-center justify-center p-2 overflow-hidden border border-gray-100 group-hover:scale-102 transition-transform">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-full object-contain"
                  />
                </div>

                {/* Title & Info */}
                <div className="flex-grow flex flex-col justify-between space-y-2">
                  <h3 className="font-semibold text-xs sm:text-sm text-gray-800 line-clamp-2 leading-tight group-hover:text-blue-900 transition-colors h-8 sm:h-9">
                    {product.title}
                  </h3>

                  {/* Price info */}
                  <div className="flex flex-col pt-1">
                    <span className="text-[10px] text-gray-400 line-through font-mono">
                      ${product.price.toFixed(2)}
                    </span>
                    <div className="flex justify-between items-center">
                      <span className="font-extrabold text-sm sm:text-base text-red-650 font-mono">
                        ${product.discountPrice.toFixed(2)}
                      </span>
                      
                      <button
                        onClick={() => addToCart({ id: product.id, title: product.title, price: product.discountPrice, image: product.image })}
                        className="bg-blue-900/5 hover:bg-yellow-500 hover:text-blue-950 text-blue-900 p-2 rounded-lg transition-all hover:scale-105 border border-blue-900/10 hover:border-yellow-500 active:scale-95 shadow-sm"
                        aria-label={`Add ${product.title} to cart`}
                      >
                        <ShoppingCart size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* GSTIN Bulk savings info card */}
        <div className="bg-gradient-to-r from-blue-950 to-indigo-900 text-white rounded-2xl p-6 sm:p-8 flex flex-col lg:flex-row items-center justify-between gap-6 shadow-md border border-blue-900">
          <div className="space-y-3">
            <span className="bg-yellow-500 text-blue-950 text-[10px] font-black px-2.5 py-1 rounded-full uppercase tracking-wider">
              B2B GST INVOICING
            </span>
            <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight">Save 18% GST Input Credit on Corporate Orders</h2>
            <p className="text-xs sm:text-sm text-blue-200 leading-relaxed max-w-2xl">
              We provide formal GST taxation invoices. Enter your company GSTIN during checkout (or via the Cart panel) to reclaim 18% in tax credit on development kits and workbench tools.
            </p>
          </div>
          <a
            href="/products"
            className="bg-yellow-500 hover:bg-yellow-600 transition-all text-blue-950 font-extrabold px-6 py-3 rounded-lg text-sm whitespace-nowrap flex items-center gap-1.5 shadow-sm hover:shadow hover:-translate-y-0.5"
          >
            Start Bulk Sourcing
            <ChevronRight size={16} />
          </a>
        </div>
      </main>

      <Footer />
    </div>
  );
}
