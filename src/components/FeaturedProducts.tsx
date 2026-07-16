"use client";

import React from "react";
import { useCart } from "../context/CartContext";
import { Star, ShoppingCart } from "lucide-react";
import Link from "next/link";

interface Product {
  id: string;
  title: string;
  price: number;
  image: string;
  rating: number;
  reviewsCount: number;
  bestseller?: boolean;
}

export const FeaturedProducts: React.FC = () => {
  const { addToCart } = useCart();

  const products: Product[] = [
    {
      id: "prod_connectors",
      title: "Heavy-Duty Screw Terminal Block Connector Set",
      price: 6.99,
      image: "/cat_connectors.png",
      rating: 4.7,
      reviewsCount: 182,
      bestseller: true,
    },
    {
      id: "prod_switches",
      title: "Premium Tactile Push Button & Switch Kit (50-Pack)",
      price: 8.49,
      image: "/cat_switches.png",
      rating: 4.8,
      reviewsCount: 215,
    },
    {
      id: "prod_knobs",
      title: "Anodized Aluminum Rotary Potentiometer Control Knobs",
      price: 5.99,
      image: "/cat_knobs.png",
      rating: 4.6,
      reviewsCount: 94,
    },
    {
      id: "prod_rs485",
      title: "Industrial USB to RS485 Isolated Converter",
      price: 14.99,
      image: "/cat_rs485.png",
      rating: 4.9,
      reviewsCount: 312,
      bestseller: true,
    },
    {
      id: "prod_embedded",
      title: "ESP32 DevKit V1 WiFi + Bluetooth Module",
      price: 11.99,
      image: "/cat_embedded.png",
      rating: 4.9,
      reviewsCount: 1045,
      bestseller: true,
    },
    {
      id: "prod_resistors",
      title: "Precision Metal Film Resistors Assortment Kit (600-Pack)",
      price: 12.49,
      image: "/cat_resistors.png",
      rating: 4.8,
      reviewsCount: 412,
    },
    {
      id: "prod_passives",
      title: "Ceramic & Electrolytic Capacitors Component Assortment",
      price: 10.99,
      image: "/cat_passives.png",
      rating: 4.7,
      reviewsCount: 265,
    },
    {
      id: "prod_active",
      title: "Active Semiconductor IC Chips & Voltage Regulators Pack",
      price: 15.99,
      image: "/cat_active.png",
      rating: 4.5,
      reviewsCount: 118,
    },
    {
      id: "prod_powersupply",
      title: "Regulated AC-DC Buck Converter Power Supply Module",
      price: 18.99,
      image: "/cat_powersupply.png",
      rating: 4.7,
      reviewsCount: 188,
    },
    {
      id: "prod_displays",
      title: "16x2 Character LCD Display Module with Blue Backlight",
      price: 9.99,
      image: "/cat_displays.png",
      rating: 4.6,
      reviewsCount: 342,
    },
    {
      id: "prod_prototyping",
      title: "Solderless Breadboard & Premium Jumper Wires Kit",
      price: 7.99,
      image: "/cat_prototyping.png",
      rating: 4.8,
      reviewsCount: 524,
      bestseller: true,
    },
    {
      id: "prod_protection",
      title: "Glass Tube Fuse & Resettable PPTC Fuse Protection Kit",
      price: 8.99,
      image: "/cat_protection.png",
      rating: 4.7,
      reviewsCount: 156,
    },
  ];

  const getCatalogLink = (id: string) => {
    if (id === "prod_connectors") return "/products?subcategory=Connectors";
    if (id === "prod_switches") return "/products?subcategory=Switches & Relays";
    if (id === "prod_knobs") return "/products?subcategory=Passives & Hardware Accessories";
    if (id === "prod_rs485") return "/products?search=RS485";
    if (id === "prod_embedded") return "/products/prod-122";
    if (id === "prod_resistors") return "/products/prod-63";
    if (id === "prod_passives") return "/products/prod-67";
    if (id === "prod_active") return "/products/prod-90";
    if (id === "prod_powersupply") return "/products/prod-88";
    if (id === "prod_displays") return "/products/prod-81";
    if (id === "prod_prototyping") return "/products/prod-142";
    if (id === "prod_protection") return "/products/prod-75";
    return "/products";
  };

  // Helper to render stars based on numeric rating
  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    for (let i = 1; i <= 5; i++) {
      if (i <= fullStars) {
        stars.push(
          <Star key={i} size={13} fill="#eab308" className="text-yellow-500" />
        );
      } else if (i === fullStars + 1 && hasHalfStar) {
        stars.push(
          <Star key={i} size={13} fill="#eab308" className="text-yellow-500 opacity-70" />
        );
      } else {
        stars.push(
          <Star key={i} size={13} fill="none" className="text-gray-300" />
        );
      }
    }
    return stars;
  };

  return (
    <section id="featured-products" className="py-12 bg-gray-50 px-4 scroll-mt-20 border-t border-gray-150">
      <div className="max-w-7xl mx-auto">
        {/* Heading */}
        <div className="flex justify-between items-end mb-8">
          <div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-gray-900 border-l-4 border-blue-900 pl-3">
              Featured Products
            </h2>
            <p className="text-xs text-gray-500 mt-1 hidden sm:block">
              Top-selling hardware components and kits verified by makers worldwide.
            </p>
          </div>
          <Link
            href="/products"
            className="text-xs sm:text-sm font-bold text-blue-900 hover:text-blue-800 transition-colors flex items-center gap-1 group"
          >
            View All Products
            <span className="inline-block transition-transform group-hover:translate-x-1 font-mono">&rarr;</span>
          </Link>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-5">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white border border-gray-200 rounded-xl p-3 flex flex-col justify-between relative shadow-sm hover:shadow-md hover:border-blue-900/20 transition-all hover:-translate-y-1 group"
            >
              {/* Image & Badges */}
              <div className="relative">
                {product.bestseller && (
                  <span className="absolute top-0 left-0 bg-yellow-500 text-blue-950 text-[9px] font-extrabold px-1.5 py-0.5 rounded tracking-wider uppercase z-10 shadow-sm">
                    BESTSELLER
                  </span>
                )}
                
                {/* Centered Image */}
                <Link href={getCatalogLink(product.id)} className="block">
                  <div className="w-full h-32 bg-white rounded-lg mb-3 flex items-center justify-center p-2 overflow-hidden group-hover:scale-102 transition-transform cursor-pointer">
                    <img
                      src={product.image}
                      alt={product.title}
                      className="w-full h-full object-contain"
                    />
                  </div>
                </Link>
              </div>

              {/* Title & Info */}
              <div className="flex-grow flex flex-col justify-between space-y-2">
                <Link href={getCatalogLink(product.id)} className="block">
                  <h3 className="font-semibold text-xs sm:text-sm text-gray-800 line-clamp-2 leading-tight group-hover:text-blue-900 transition-colors h-8 sm:h-9 cursor-pointer">
                    {product.title}
                  </h3>
                </Link>

                {/* Rating */}
                <div className="flex items-center gap-1">
                  <div className="flex items-center">{renderStars(product.rating)}</div>
                  <span className="text-[10px] text-gray-500 font-semibold font-mono">
                    ({product.reviewsCount})
                  </span>
                </div>

                {/* Price and Cart Button */}
                <div className="flex justify-between items-center pt-1.5">
                  <span className="text-[10px] text-blue-900 font-bold uppercase tracking-wider bg-blue-50 px-2 py-0.5 rounded border border-blue-100/50">
                    Request Quote
                  </span>
                  
                  <button
                    onClick={() => addToCart({ id: product.id, title: product.title, price: product.price, image: product.image })}
                    className="bg-blue-900/5 hover:bg-yellow-500 hover:text-blue-950 text-blue-900 p-2 rounded-lg transition-all hover:scale-105 border border-blue-900/10 hover:border-yellow-500 active:scale-95 shadow-sm"
                    aria-label={`Add ${product.title} to cart`}
                  >
                    <ShoppingCart size={14} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
