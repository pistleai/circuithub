"use client";

import React, { Suspense } from "react";
import { TopBar } from "../../components/TopBar";
import { Header } from "../../components/Header";
import { Hero } from "../../components/Hero";
import { FeaturedProducts } from "../../components/FeaturedProducts";
import { ValueProps } from "../../components/ValueProps";
import { PromoBanner } from "../../components/PromoBanner";
import { Footer } from "../../components/Footer";

import { WhyChoose } from "../../components/WhyChoose";
import { TrustMarquee } from "../../components/TrustMarquee";
import { Testimonials } from "../../components/Testimonials";

export default function HomePage() {
  return (
    <div className="bg-gray-50 text-gray-900 min-h-screen flex flex-col">
      {/* Top Navigation Bar */}
      <TopBar />
      
      {/* Header with Search and Cart */}
      <Suspense fallback={<div className="h-20 bg-white border-b border-gray-150 animate-pulse" />}>
        <Header />
      </Suspense>
      
      <main className="flex-grow">
        {/* Hero Section */}
        <Hero />

        {/* Featured Products Section */}
        <FeaturedProducts />

        {/* Value Proposition Ribbon */}
        <ValueProps />

        {/* Why Choose Section */}
        <WhyChoose />

        {/* Trust & Certifications Marquee */}
        <TrustMarquee />

        {/* Maker Testimonials Section */}
        <Testimonials />

        {/* Promotional Deal Banner */}
        <PromoBanner />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
