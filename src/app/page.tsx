import React from "react";
import { Hero } from "../components/Hero";
import { FeaturedProducts } from "../components/FeaturedProducts";
import { ValueProps } from "../components/ValueProps";
import { PromoBanner } from "../components/PromoBanner";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section (Includes Category Quick-Links Grid) */}
      <Hero />

      {/* Featured Products Section */}
      <FeaturedProducts />

      {/* Value Proposition Ribbon */}
      <ValueProps />

      {/* Promotional Deal Banner */}
      <PromoBanner />
    </div>
  );
}
