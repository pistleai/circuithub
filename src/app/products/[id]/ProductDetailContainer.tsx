"use client";

import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { ArrowLeft, ShoppingCart, Check, FileText, Settings, Layers } from "lucide-react";
import { products } from "../../../data/products";
import { useCart } from "../../../context/CartContext";
import { ProductImage } from "../../../components/ProductImage";
import { ProductCard } from "../../../components/ProductCard";
import { TopBar } from "../../../components/TopBar";
import { Header } from "../../../components/Header";
import { Footer } from "../../../components/Footer";
import { Badge } from "../../../components/ui/Badge";
import {
  getProductPrice,
  getProductDescription,
  getProductSpecs
} from "../../../components/ProductDetailModal";

interface ProductDetailContainerProps {
  productId: string;
}

export const ProductDetailContainer: React.FC<ProductDetailContainerProps> = ({ productId }) => {
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [selectedVariation, setSelectedVariation] = useState<string | null>(null);
  const [addedToCart, setAddedToCart] = useState(false);
  const [downloadingSpecs, setDownloadingSpecs] = useState(false);
  const [downloadingCad, setDownloadingCad] = useState(false);

  const product = products.find((p) => p.id === productId);

  const relatedProducts = useMemo(() => {
    if (!product) return [];
    let list = products.filter(
      (p) => p.subcategory === product.subcategory && p.id !== product.id
    );
    if (list.length < 4) {
      const extra = products.filter(
        (p) => p.mainCategory === product.mainCategory && p.id !== product.id && !list.some(item => item.id === p.id)
      );
      list = [...list, ...extra];
    }
    return list.slice(0, 4);
  }, [product]);

  useEffect(() => {
    if (product && product.variations && product.variations.length > 0) {
      setSelectedVariation(product.variations[0]);
    } else {
      setSelectedVariation(null);
    }
    setQuantity(1);
    setAddedToCart(false);
  }, [product]);

  if (!product) {
    return (
      <div className="bg-slate-50 text-slate-900 min-h-screen flex flex-col">
        <TopBar />
        <Header />
        <main className="max-w-7xl mx-auto w-full px-4 py-16 flex-grow flex flex-col items-center justify-center text-center">
          <h2 className="text-xl font-bold text-slate-800">Product Not Found</h2>
          <p className="text-sm text-slate-500 mt-2">The requested electronic component does not exist in our distributor catalog.</p>
          <Link
            href="/products"
            className="mt-6 bg-blue-900 hover:bg-blue-950 text-white font-bold py-2.5 px-6 rounded-lg text-sm transition-all"
          >
            Return to Catalog
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  const price = getProductPrice(product.id);
  const specs = getProductSpecs(product);
  const description = getProductDescription(product);

  const handleAddToCart = () => {
    let title = product.cleanName;
    if (selectedVariation) {
      title += ` (${selectedVariation})`;
    }
    
    for (let i = 0; i < quantity; i++) {
      addToCart({
        id: product.id,
        title,
        price,
        image: product.mainCategory === "Development Boards" && product.subcategory === "Arduino Ecosystem" ? "/arduino_uno.png" : 
               product.mainCategory === "Sensors" ? "/hc_sr04.png" : 
               product.subcategory === "Motors" ? "/dc_motor.png" :
               product.mainCategory === "DIY and Maker Kits" ? "/stem_kit.png" :
               product.subcategory === "Soldering Tools & Equipment" ? "/soldering_iron.png" : "/cat_arduino_ref.png"
      });
    }
    
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  const handleDownloadDatasheet = () => {
    setDownloadingSpecs(true);
    setTimeout(() => {
      setDownloadingSpecs(false);
      alert(`Datasheet PDF for ${product.cleanName} has been downloaded successfully.`);
    }, 1200);
  };

  const handleDownloadCad = () => {
    setDownloadingCad(true);
    setTimeout(() => {
      setDownloadingCad(false);
      alert(`3D CAD Model (STEP format) for ${product.cleanName} has been generated and downloaded.`);
    }, 1500);
  };

  return (
    <div className="bg-slate-50 text-slate-900 min-h-screen flex flex-col">
      {/* Global Navigation */}
      <TopBar />
      <Header />

      {/* Main product display section */}
      <main className="max-w-7xl mx-auto w-full px-4 py-8 flex-grow">
        {/* Back Button */}
        <Link 
          href="/products" 
          className="inline-flex items-center gap-1.5 text-xs text-blue-900 font-bold hover:underline mb-6 group"
        >
          <ArrowLeft size={14} className="transition-transform group-hover:-translate-x-0.5" /> 
          Back to Catalog
        </Link>

        {/* Product Details Container */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden flex flex-col md:flex-row min-h-[500px]">
          
          {/* Left Column: Blueprint visual & CAD Actions */}
          <div className="w-full md:w-5/12 bg-slate-900 text-slate-350 p-8 flex flex-col justify-between border-r border-slate-850 relative">
            {/* Grid lines background for blueprint design */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none opacity-50" />
            
            <div className="relative z-10 flex flex-col h-full justify-between gap-8">
              {/* Header CAD spec info */}
              <div className="border-b border-slate-800 pb-3 text-left">
                <span className="text-[10px] font-mono tracking-widest text-blue-400 uppercase font-bold block">
                  CAD SPEC // REV 1.2
                </span>
                <h3 className="text-white font-extrabold text-sm tracking-wide mt-0.5 truncate uppercase">
                  {product.cleanName}
                </h3>
              </div>

              {/* Large CAD schematic image */}
              <div className="my-auto flex items-center justify-center p-6 bg-slate-950/40 rounded-2xl border border-slate-800/80 shadow-[inset_0_4px_12px_rgba(0,0,0,0.5)] min-h-[220px]">
                <div className="w-full max-h-56 flex items-center justify-center">
                  <ProductImage product={product} className="h-52 w-auto max-w-full object-contain filter drop-shadow-[0_4px_12px_rgba(255,255,255,0.08)]" />
                </div>
              </div>

              {/* Documentation action panel */}
              <div className="space-y-3.5 border-t border-slate-800 pt-5">
                <button 
                  onClick={handleDownloadDatasheet}
                  disabled={downloadingSpecs}
                  className="w-full bg-slate-800 hover:bg-slate-700 disabled:bg-slate-800/50 text-slate-100 hover:text-white transition-all py-2.5 rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 border border-slate-700 shadow-sm focus:outline-none cursor-pointer"
                >
                  <FileText size={14} className="text-blue-400" />
                  {downloadingSpecs ? "Generating PDF..." : "Download Technical Datasheet (.PDF)"}
                </button>
                
                <button 
                  onClick={handleDownloadCad}
                  disabled={downloadingCad}
                  className="w-full bg-slate-800 hover:bg-slate-700 disabled:bg-slate-800/50 text-slate-100 hover:text-white transition-all py-2.5 rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 border border-slate-700 shadow-sm focus:outline-none cursor-pointer"
                >
                  <Settings size={14} className="text-yellow-500 animate-spin-slow" />
                  {downloadingCad ? "Generating CAD..." : "Download 3D STEP File (.STP)"}
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Spec metadata, procurement console */}
          <div className="w-full md:w-7/12 p-8 md:p-12 flex flex-col justify-between text-left">
            <div>
              {/* Category Breadcrumbs */}
              <div className="flex items-center gap-1.5 text-[10px] font-mono tracking-wider uppercase text-slate-400 font-bold mb-2">
                <span>{product.mainCategory}</span>
                <span>/</span>
                <span className="text-blue-600">{product.subcategory}</span>
              </div>

              {/* Product Title */}
              <h1 className="text-2xl md:text-3xl font-black text-slate-800 tracking-tight leading-snug">
                {product.name}
              </h1>

              {/* B2B pricing segment */}
              <div className="flex items-baseline gap-2 mt-5 bg-slate-50 border border-slate-150 p-4 rounded-xl">
                <div>
                  <span className="text-[10px] font-semibold text-slate-450 uppercase tracking-wide block">B2B Pricing</span>
                  <span className="text-lg font-bold text-blue-900 uppercase tracking-wider">Price on Request</span>
                  <span className="text-xs text-slate-400 font-medium block mt-0.5">Submit cart for volume RFQ</span>
                </div>
                <div className="ml-auto border-l border-slate-200 pl-4 text-left">
                  <span className="text-[9px] font-bold text-green-600 uppercase tracking-wide block bg-green-50 px-1.5 py-0.5 rounded border border-green-200/50 w-fit">In Stock</span>
                  <span className="text-xs text-slate-500 font-semibold font-mono mt-0.5 block">5,000+ Units Ready</span>
                </div>
              </div>

              {/* Description */}
              <div className="mt-6">
                <p className="text-slate-650 text-sm md:text-base leading-relaxed">
                  {description}
                </p>
              </div>

              {/* Variations selector (if any) */}
              {product.variations && product.variations.length > 0 && (
                <div className="mt-6 space-y-2.5">
                  <span className="text-[10px] font-black text-slate-400 tracking-wider block uppercase">
                    Select Specifications / Variations:
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {product.variations.map((variation) => (
                      <button
                        key={variation}
                        onClick={() => setSelectedVariation(variation)}
                        className={`text-xs font-semibold py-2 px-3.5 rounded-lg border transition-all cursor-pointer focus:outline-none ${
                          selectedVariation === variation
                            ? "bg-blue-900 border-blue-900 text-white shadow-sm"
                            : "bg-white border-slate-200 text-slate-600 hover:border-slate-355 hover:bg-slate-50"
                        }`}
                      >
                        {variation}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Spec sheet table */}
              <div className="mt-8 border border-slate-150 rounded-xl overflow-hidden bg-white">
                <div className="bg-slate-50 px-4 py-2.5 border-b border-slate-150 flex items-center gap-1.5">
                  <Layers size={14} className="text-blue-900" />
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-700">
                    Technical Specifications
                  </span>
                </div>
                <table className="w-full text-xs md:text-sm text-left border-collapse">
                  <tbody>
                    {specs.map((spec, idx) => (
                      <tr key={idx} className="border-b border-slate-100 last:border-0 hover:bg-slate-50/50 transition-colors">
                        <td className="px-4 py-3 font-semibold text-slate-500 w-1/3 bg-slate-50/20">{spec.label}</td>
                        <td className="px-4 py-3 font-bold text-slate-700">{spec.value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Action Row - Add to Cart Console */}
            <div className="mt-10 pt-6 border-t border-slate-150 flex flex-col sm:flex-row gap-4 items-stretch sm:items-center">
              {/* Quantity counter */}
              <div className="flex items-center justify-between border border-slate-300 rounded-lg overflow-hidden bg-slate-55 h-12 self-start sm:self-auto min-w-[130px]">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-4 h-full hover:bg-slate-200 text-slate-600 hover:text-slate-900 font-extrabold text-lg transition-colors focus:outline-none cursor-pointer"
                >
                  -
                </button>
                <span className="px-3 text-sm font-mono font-bold text-slate-800">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-4 h-full hover:bg-slate-200 text-slate-600 hover:text-slate-900 font-extrabold text-lg transition-colors focus:outline-none cursor-pointer"
                >
                  +
                </button>
              </div>

              {/* Add to Workspace trigger */}
              <div className="flex-grow flex gap-3 h-12">
                <button
                  onClick={handleAddToCart}
                  className={`flex-grow transition-all font-bold rounded-lg text-sm flex items-center justify-center gap-2 shadow-md cursor-pointer ${
                    addedToCart
                      ? "bg-green-600 text-white shadow-green-200/50 hover:bg-green-700"
                      : "bg-yellow-500 hover:bg-yellow-600 text-blue-950 shadow-yellow-100/50 hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 active:shadow-md"
                  }`}
                >
                  {addedToCart ? (
                    <>
                      <Check size={18} />
                      Added to Workspace!
                    </>
                  ) : (
                    <>
                      <ShoppingCart size={18} />
                      Add to Cart Workspace
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products Section */}
        {relatedProducts.length > 0 && (
          <section className="mt-12 border-t border-slate-200 pt-10 pb-6 text-left">
            <h2 className="text-xl font-extrabold text-slate-800 border-l-4 border-blue-900 pl-3 mb-6 font-black tracking-tight">
              Related B2B Components
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
              {relatedProducts.map((relProduct) => (
                <Link 
                  key={relProduct.id} 
                  href={`/products/${relProduct.id}`} 
                  className="block hover:no-underline"
                >
                  <ProductCard product={relProduct} />
                </Link>
              ))}
            </div>
          </section>
        )}
      </main>

      {/* Global Footer */}
      <Footer />
    </div>
  );
};
