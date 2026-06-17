"use client";

import React from "react";
import { Shield, Globe, Users, ArrowRight, ChevronRight } from "lucide-react";
import Image from 'next/image';

export const Hero: React.FC = () => {
  const categories = [
    {
      name: "Arduino / Dev Boards",
      image: "/arduino_uno.png",
      link: "#components"
    },
    {
      name: "Sensors",
      image: "/hc_sr04.png",
      link: "#sensors"
    },
    {
      name: "Motors",
      image: "/dc_motor.png",
      link: "#components"
    },
    {
      name: "Robotics Kits",
      image: "/smart_robot_car.png",
      link: "#robotics-kits"
    },
    {
      name: "Tools",
      image: "/soldering_iron.png",
      link: "#tools"
    },
    {
      name: "STEM Learning",
      image: "/stem_kit.png",
      link: "#stem-learning"
    }
  ];

  return (
    <section className="w-full bg-gradient-to-b from-blue-50/70 via-indigo-50/15 to-white pt-5 pb-6 px-4 sm:px-6 lg:px-8 border-b border-gray-150">
      <div className="max-w-7xl mx-auto flex flex-col gap-5 lg:gap-6">

        {/* Row 1: Copywriting Left / Wide Illustration Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">

          {/* Left Text Block */}
          <div className="lg:col-span-5 xl:col-span-5 space-y-4 text-left">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[42px] xl:text-[46px] font-extrabold tracking-tight text-blue-950 leading-tight">
              Build the Future <br className="hidden sm:inline" />
              with Electronics &amp; Robotics
            </h1>

            <p className="text-gray-600 text-sm md:text-[15px] leading-relaxed max-w-xl">
              Explore high-quality components, modules, kits, and tools <br className="hidden md:inline" />
              for students, hobbyists, and engineers.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-1">
              <a
                href="#featured-products"
                className="bg-yellow-500 hover:bg-yellow-600 text-blue-950 font-bold px-6 py-2.5 rounded-lg text-sm transition-all shadow-sm flex items-center gap-1.5 hover:-translate-y-0.5 duration-150"
              >
                Shop Now
                <ArrowRight size={16} />
              </a>
              <a
                href="#categories"
                className="bg-transparent hover:bg-blue-50/50 text-blue-900 font-semibold border-2 border-blue-900/70 px-6 py-2.5 rounded-lg text-sm transition-all"
              >
                Explore Kits
              </a>
            </div>

            {/* Trust metrics */}
            <div className="flex items-center gap-6 lg:gap-8 pt-3">
              <div className="flex items-center gap-2.5">
                <Shield className="text-blue-900 w-5 h-5 flex-shrink-0" />
                <div className="text-left">
                  <div className="font-extrabold text-sm md:text-base text-gray-900 leading-none">10,000+</div>
                  <div className="text-[10px] md:text-xs text-gray-500 font-semibold mt-0.5">Products</div>
                </div>
              </div>

              <div className="flex items-center gap-2.5 border-l border-gray-200 pl-6 lg:pl-8">
                <Globe className="text-blue-900 w-5 h-5 flex-shrink-0" />
                <div className="text-left">
                  <div className="font-extrabold text-sm md:text-base text-gray-900 leading-none">500+</div>
                  <div className="text-[10px] md:text-xs text-gray-550 font-semibold mt-0.5">Brands</div>
                </div>
              </div>

              <div className="flex items-center gap-2.5 border-l border-gray-200 pl-6 lg:pl-8">
                <Users className="text-blue-900 w-5 h-5 flex-shrink-0" />
                <div className="text-left">
                  <div className="font-extrabold text-sm md:text-base text-gray-900 leading-none">50,000+</div>
                  <div className="text-[10px] md:text-xs text-gray-555 font-semibold mt-0.5">Happy Makers</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Showcase Image - Spans horizontally without card container */}
          <div className="lg:col-span-7 xl:col-span-7 flex justify-center lg:justify-end items-center w-full">
            <div className="relative w-full h-auto max-w-[650px] lg:max-w-none">
              <Image
                src="/home scollor.png" // Ensure this file sits in your /public folder
                alt="Cohesive composition of robotics components"
                width={1000} // Set an explicit base width aspect ratio
                height={450} // Set an explicit base height aspect ratio
                priority // Tells Next.js to load this instantly without lazy-loading (crucial for Above-the-Fold Hero sections)
                className="w-full h-auto object-contain filter drop-shadow-md select-none transform hover:scale-[1.01] transition-transform duration-300"
              />
            </div>
          </div>
        </div>

        {/* Row 2: Categories quick-links row */}
        <div className="w-full mt-2 relative">
          <div className="relative">
            {/* Horizontal Categories Row */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 pr-0 xl:pr-4">
              {categories.map((cat, idx) => (
                <a
                  key={idx}
                  href={cat.link}
                  className="bg-white border border-gray-150 rounded-xl p-3 flex flex-row items-center gap-3.5 shadow-sm hover:shadow-md hover:border-blue-900/30 transition-all hover:-translate-y-0.5 group"
                >
                  {/* Thumbnail Image on the left */}
                  <div className="w-12 h-12 bg-gray-50 rounded-lg p-1.5 flex-shrink-0 flex items-center justify-center overflow-hidden border border-gray-100 group-hover:scale-105 transition-transform">
                    <img
                      src={cat.image}
                      alt={cat.name}
                      className="w-full h-full object-contain filter drop-shadow-sm"
                    />
                  </div>

                  {/* Title & Explore Link */}
                  <div className="flex flex-col text-left min-w-0">
                    <h3 className="font-bold text-xs sm:text-sm text-gray-900 leading-tight group-hover:text-blue-900 transition-colors truncate">
                      {cat.name}
                    </h3>
                    <span className="text-[11px] font-semibold text-blue-900 flex items-center gap-0.5 mt-1 group-hover:text-yellow-600 transition-colors">
                      Explore
                      <span className="inline-block transition-transform group-hover:translate-x-1 font-mono">&rarr;</span>
                    </span>
                  </div>
                </a>
              ))}
            </div>

            {/* Slider Arrow Button (Overlay) */}
            <button
              className="absolute -right-4 top-1/2 -translate-y-1/2 bg-white border border-gray-200 text-gray-400 hover:text-blue-900 hover:border-gray-300 w-8 h-8 rounded-full hidden xl:flex items-center justify-center shadow-md hover:shadow-lg transition-all z-10 focus:outline-none cursor-pointer"
              aria-label="Next slide"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};

