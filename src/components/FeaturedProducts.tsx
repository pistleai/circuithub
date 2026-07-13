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
      id: "prod_uno",
      title: "Arduino Uno R3 Development Board",
      price: 24.99,
      image: "/arduino_uno.png",
      rating: 4.8,
      reviewsCount: 1245,
      bestseller: true,
    },
    {
      id: "prod_esp",
      title: "ESP32 DevKit V1 WiFi + Bluetooth",
      price: 12.99,
      image: "/esp32_devkit.png",
      rating: 4.9,
      reviewsCount: 986,
    },
    {
      id: "prod_sr04",
      title: "HC-SR04 Ultrasonic Sensor",
      price: 3.49,
      image: "/hc_sr04.png",
      rating: 4.5,
      reviewsCount: 654,
    },
    {
      id: "prod_car",
      title: "4WD Smart Robot Car Kit for Arduino",
      price: 49.99,
      image: "/smart_robot_car.png",
      rating: 4.7,
      reviewsCount: 432,
    },
    {
      id: "prod_bat",
      title: "18650 Li-ion Battery 3.7V 2600mAh",
      price: 4.99,
      image: "/battery_18650.png",
      rating: 4.3,
      reviewsCount: 345,
    },
    {
      id: "prod_iron",
      title: "60W Soldering Iron Kit",
      price: 19.99,
      image: "/soldering_iron.png",
      rating: 4.6,
      reviewsCount: 287,
    },
  ];

  const getCatalogLink = (id: string) => {
    if (id === "prod_uno") return "/products/prod-105";
    if (id === "prod_esp") return "/products/prod-117";
    if (id === "prod_sr04") return "/products/prod-167";
    if (id === "prod_car") return "/products/prod-182";
    if (id === "prod_bat") return "/products/prod-72";
    if (id === "prod_iron") return "/products/prod-142";
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
