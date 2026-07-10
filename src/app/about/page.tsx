"use client";

import React, { Suspense } from "react";
import { TopBar } from "../../components/TopBar";
import { Header } from "../../components/Header";
import { Footer } from "../../components/Footer";
import { ShieldCheck, Truck, Cpu, Award, Users, BookOpen } from "lucide-react";

export default function AboutPage() {
  const values = [
    {
      icon: <ShieldCheck className="text-yellow-500" size={24} />,
      title: "100% Genuine Sourcing",
      desc: "We work directly with original manufacturers and authorized distributors to ensure every chip, board, and sensor is 100% authentic."
    },
    {
      icon: <Cpu className="text-yellow-500" size={24} />,
      title: "Engineered for Makers",
      desc: "From basic microcontrollers to advanced robotics chassis, we provide complete prototyping packages for students, educators, and labs."
    },
    {
      icon: <Truck className="text-yellow-500" size={24} />,
      title: "Logistics Excellence",
      desc: "With reliable shipping networks, your hardware list reaches your lab workbench quickly and safely with fully trackable consignments."
    }
  ];

  return (
    <div className="bg-gray-50 text-gray-900 min-h-screen flex flex-col">
      <TopBar />
      <Suspense fallback={<div className="h-20 bg-white border-b border-gray-150 animate-pulse" />}>
        <Header />
      </Suspense>

      <main className="flex-grow max-w-7xl w-full mx-auto px-4 py-12">
        {/* Page Title Header */}
        <div className="mb-10 text-left border-l-4 border-yellow-500 pl-4">
          <h1 className="text-3xl font-extrabold text-blue-950">About CircuitHub</h1>
          <p className="text-sm text-gray-500 mt-1">Sourcing platform engineered to resolve supply friction in the B2B electronics market.</p>
        </div>

        {/* Company Pitch and Intro */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-16">
          <div className="lg:col-span-7 space-y-6">
            <h2 className="text-2xl font-bold text-blue-950 leading-tight">
              Powering hardware innovation from prototyping to mass production.
            </h2>
            <p className="text-sm sm:text-base text-gray-650 leading-relaxed">
              CircuitHub (operated under <strong>Arul Technologies</strong>) is a premium electronic components distributor. We specialize in supply-chain logistics for microcontroller development boards, IoT sensor modules, active components, mechanical fixtures, and workbench tools.
            </p>
            <p className="text-sm sm:text-base text-gray-650 leading-relaxed">
              Founded by electronics enthusiasts and engineers, our mission is to eliminate supply friction by providing makers, research institutes, and hardware startups with premium, quality-tested parts with clear documentation and excellent support.
            </p>

            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-gray-200">
              <div className="text-left">
                <div className="text-2xl font-extrabold text-blue-950">10,000+</div>
                <div className="text-xs text-gray-550 font-medium">SKUs Listed</div>
              </div>
              <div className="text-left">
                <div className="text-2xl font-extrabold text-blue-950">50,000+</div>
                <div className="text-xs text-gray-550 font-medium">Makers Served</div>
              </div>
              <div className="text-left">
                <div className="text-2xl font-extrabold text-blue-950">100%</div>
                <div className="text-xs text-gray-550 font-medium">Authentic Parts</div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 bg-blue-950 rounded-2xl p-8 text-white relative overflow-hidden shadow-lg border border-blue-900">
            {/* Ambient Background glow */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-500/10 rounded-full blur-2xl pointer-events-none" />
            
            <h3 className="text-lg font-bold text-yellow-400 mb-4 tracking-tight uppercase">Corporate Profile</h3>
            <div className="space-y-4 text-xs sm:text-sm text-blue-100">
              <div>
                <span className="block text-gray-400 text-xs font-semibold">Registered Entity</span>
                <span className="font-bold text-white">Arul Technologies</span>
              </div>
              <div>
                <span className="block text-gray-400 text-xs font-semibold">Registration Address</span>
                <span className="text-slate-350 leading-relaxed block">
                  604/14, Highland Residency, Yashswi Nagar,<br />
                  Kolsheth Rd, Thane (W) - 400607,<br />
                  Maharashtra, India
                </span>
              </div>
              <div>
                <span className="block text-gray-400 text-xs font-semibold">Contact Executive</span>
                <span className="font-bold text-white">Dhananjay Singh Thakur</span>
              </div>
              <div className="pt-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-white/10 text-white border border-white/20">
                  <Award size={12} className="text-yellow-400" /> ISO 9001:2015 Registered
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Company Core Values Grid */}
        <div className="border-t border-gray-200 pt-16">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-extrabold text-blue-950">Our Sourcing Standards</h2>
            <p className="text-sm text-gray-550 mt-1 max-w-xl mx-auto">
              Every part in our catalog passes rigorous functional quality verification so you can build with absolute confidence.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((v, idx) => (
              <div key={idx} className="bg-white border border-gray-150 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="bg-blue-950 text-white w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                  {v.icon}
                </div>
                <h3 className="font-bold text-lg text-blue-950 mb-2">{v.title}</h3>
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
