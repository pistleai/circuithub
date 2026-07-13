"use client";

import React, { useState, useEffect } from "react";
import { X, ShoppingCart, Download, Check, FileText, Settings, Layers } from "lucide-react";
import { Product } from "../types/product";
import { useCart } from "../context/CartContext";
import { ProductImage } from "./ProductImage";
import { Badge } from "./ui/Badge";

interface ProductDetailModalProps {
  product: Product;
  onClose: () => void;
}

export const getProductPrice = (id: string): number => {
  const num = parseInt(id.replace(/\D/g, ""), 10) || 1;
  if (num % 15 === 0) return 49.99;
  if (num % 10 === 0) return 24.99;
  if (num % 7 === 0) return 12.49;
  if (num % 5 === 0) return 8.99;
  if (num % 3 === 0) return 3.49;
  if (num % 2 === 0) return 1.99;
  return 0.79;
};

export const getProductDescription = (product: Product): string => {
  const clean = product.cleanName;
  const sub = product.subcategory;
  const main = product.mainCategory;

  if (main === "Development Boards") {
    return `The ${clean} is a high-performance prototyping platform designed for embedded developers, hobbyists, and engineers. It offers exceptional processing capabilities, extensive GPIO breakout headers, and robust communication protocols. Perfect for IoT nodes, control systems, and automation projects.`;
  }
  if (main === "Sensors") {
    return `The ${clean} provides highly accurate physical environmental telemetry. Calibrated for high-precision measurement, this sensor module integrates seamlessly via standard I2C, SPI, or analog interfaces. Ideal for robotics, smart home automation, and data logging systems.`;
  }
  if (sub === "Connectors") {
    return `Industrial-grade ${clean} designed for secure, low-resistance electrical connections in printed circuit boards and wire harnesses. Built with premium materials to ensure vibration resistance, high mating cycles, and durable electrical integrity under load.`;
  }
  if (sub === "Wires & Cables") {
    return `High-flexibility ${clean} engineered for signal transmission and power delivery in electronics prototyping and hardware assembly. Features premium insulation and high-purity conductor cores to reduce signal loss and resist thermal degradation.`;
  }
  if (main === "DIY and Maker Kits") {
    return `The ${clean} is an all-in-one educational and maker bundle. It comes fully equipped with the necessary breakout modules, cables, and detailed step-by-step schematics to guide students and hobbyists through building robotics and automation experiments.`;
  }
  if (sub === "Integrated Circuits (ICs)") {
    return `Standard ${clean} silicon integrated circuit. Offers reliable signal processing, power management, or logic functions within embedded boards. Manufactured in accordance with industrial standards for low power consumption and high thermal stability.`;
  }
  return `The CircuitHub ${clean} is a certified, professional-grade electronic component engineered for hardware engineering design, workbench testing, and volume PCB assembly. Reliable, cost-effective, and fully documented with standard footprint specifications.`;
};

export const getProductSpecs = (product: Product) => {
  const num = parseInt(product.id.replace(/\D/g, ""), 10) || 1;
  const isRoHs = num % 3 !== 0;
  const leadTime = `${3 + (num % 5)} - ${5 + (num % 7)} Days`;
  
  let packaging = "Tray / Bulk";
  if (product.subcategory === "Connectors") packaging = "Bag / Bulk";
  if (product.subcategory === "Wires & Cables") packaging = "Spool / Box";
  if (product.subcategory === "Passives & Discrete Semiconductors") packaging = "Tape & Reel (TR)";
  if (product.subcategory === "Circuit Protection") packaging = "Box / Tray";
  if (product.subcategory === "Frequency Control") packaging = "Tape & Reel (TR) / Cut Tape";
  if (product.subcategory === "Integrated Circuits (ICs)") packaging = "Tray / Tube / Tape & Reel";
  if (product.mainCategory === "Development Boards") packaging = "Anti-Static Protective Box";
  if (product.mainCategory === "DIY and Maker Kits") packaging = "Retail Box / STEM Kit Pack";

  return [
    { label: "Product ID", value: product.id },
    { label: "Compliance", value: isRoHs ? "RoHS Compliant (Lead Free)" : "RoHS Compliant / Reach Exempt" },
    { label: "Packaging", value: packaging },
    { label: "Lead Time (B2B)", value: leadTime },
    { label: "Operating Temp", value: product.mainCategory === "Development Boards" || product.mainCategory === "Sensors" ? "-40°C to +85°C (Industrial)" : "-25°C to +70°C" },
    { label: "Supplier", value: "CircuitHub Distribution" }
  ];
};

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({ product, onClose }) => {
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [selectedVariation, setSelectedVariation] = useState<string | null>(null);
  const [addedToCart, setAddedToCart] = useState(false);
  const [downloadingSpecs, setDownloadingSpecs] = useState(false);
  const [downloadingCad, setDownloadingCad] = useState(false);

  useEffect(() => {
    if (product.variations && product.variations.length > 0) {
      setSelectedVariation(product.variations[0]);
    } else {
      setSelectedVariation(null);
    }
    setQuantity(1);
    setAddedToCart(false);
  }, [product]);

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

  // Safe escape key close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  return (
    <div className="fixed inset-0 bg-slate-900/70 backdrop-blur-md z-50 flex items-center justify-center p-4 overflow-y-auto animate-fade-in" onClick={onClose}>
      <div 
        className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[92vh] md:max-h-[85vh] overflow-hidden flex flex-col md:flex-row relative animate-scale-in border border-slate-100"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 p-2 rounded-full transition-all focus:outline-none z-50 shadow-sm border border-slate-200"
          aria-label="Close modal"
        >
          <X size={18} />
        </button>

        {/* Left Side - Image/CAD Blueprint */}
        <div className="w-full md:w-5/12 bg-slate-900 text-slate-350 p-6 flex flex-col justify-between border-r border-slate-850 relative min-h-[300px] md:min-h-0">
          {/* Grid lines background to look like CAD blueprint */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none opacity-50" />
          
          <div className="relative z-10 flex flex-col h-full justify-between">
            {/* Header info */}
            <div className="border-b border-slate-800 pb-3 text-left">
              <span className="text-[10px] font-mono tracking-widest text-blue-400 uppercase font-bold block">
                CAD SPEC // REV 1.2
              </span>
              <h3 className="text-white font-extrabold text-sm tracking-wide mt-0.5 truncate uppercase">
                {product.cleanName}
              </h3>
            </div>

            {/* Interactive Image Container */}
            <div className="my-8 flex-grow flex items-center justify-center relative p-4 bg-slate-950/40 rounded-xl border border-slate-800/80 shadow-[inset_0_4px_12px_rgba(0,0,0,0.5)]">
              <div className="w-full max-h-48 flex items-center justify-center">
                <ProductImage product={product} className="h-44 w-auto max-w-full object-contain filter drop-shadow-[0_4px_10px_rgba(255,255,255,0.08)]" />
              </div>
            </div>

            {/* B2B Documentation Action buttons */}
            <div className="space-y-2 border-t border-slate-800 pt-4">
              <button 
                onClick={handleDownloadDatasheet}
                disabled={downloadingSpecs}
                className="w-full bg-slate-800 hover:bg-slate-700 disabled:bg-slate-800/50 text-slate-100 hover:text-white transition-all py-2 rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 border border-slate-700 shadow-sm focus:outline-none cursor-pointer"
              >
                <FileText size={14} className="text-blue-400" />
                {downloadingSpecs ? "Generating PDF..." : "Download Technical Datasheet (.PDF)"}
              </button>
              
              <button 
                onClick={handleDownloadCad}
                disabled={downloadingCad}
                className="w-full bg-slate-800 hover:bg-slate-700 disabled:bg-slate-800/50 text-slate-100 hover:text-white transition-all py-2 rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 border border-slate-700 shadow-sm focus:outline-none cursor-pointer"
              >
                <Settings size={14} className="text-yellow-500 animate-spin-slow" />
                {downloadingCad ? "Generating CAD..." : "Download 3D STEP File (.STP)"}
              </button>
            </div>
          </div>
        </div>

        {/* Right Side - Details & Procurement */}
        <div className="w-full md:w-7/12 p-8 flex flex-col justify-between overflow-y-auto max-h-[50vh] md:max-h-full text-left">
          <div>
            {/* Category Breadcrumbs */}
            <div className="flex items-center gap-1.5 text-[10px] font-mono tracking-wider uppercase text-slate-400 font-bold mb-2">
              <span>{product.mainCategory}</span>
              <span>/</span>
              <span className="text-blue-600">{product.subcategory}</span>
            </div>

            {/* Product Title */}
            <h2 className="text-xl md:text-2xl font-black text-slate-800 tracking-tight leading-snug">
              {product.name}
            </h2>

            {/* Price section */}
            <div className="flex items-baseline gap-2 mt-4 bg-slate-50 border border-slate-150 p-3.5 rounded-xl">
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

            {/* Product Description */}
            <div className="mt-5">
              <p className="text-slate-600 text-sm leading-relaxed">
                {description}
              </p>
            </div>

            {/* Variations Selection (if any) */}
            {product.variations && product.variations.length > 0 && (
              <div className="mt-5 space-y-2">
                <span className="text-[10px] font-black text-slate-400 tracking-wider block uppercase">
                  Select Specifications / Variations:
                </span>
                <div className="flex flex-wrap gap-2">
                  {product.variations.map((variation) => (
                    <button
                      key={variation}
                      onClick={() => setSelectedVariation(variation)}
                      className={`text-xs font-semibold py-1.5 px-3 rounded-lg border transition-all cursor-pointer focus:outline-none ${
                        selectedVariation === variation
                          ? "bg-blue-900 border-blue-900 text-white shadow-sm"
                          : "bg-white border-slate-200 text-slate-600 hover:border-slate-350 hover:bg-slate-50"
                      }`}
                    >
                      {variation}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Spec Sheet Table */}
            <div className="mt-6 border border-slate-150 rounded-xl overflow-hidden bg-white">
              <div className="bg-slate-50 px-4 py-2 border-b border-slate-150 flex items-center gap-1.5">
                <Layers size={14} className="text-blue-905" />
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-700">
                  Technical Specifications
                </span>
              </div>
              <table className="w-full text-xs text-left border-collapse">
                <tbody>
                  {specs.map((spec, idx) => (
                    <tr key={idx} className="border-b border-slate-100 last:border-0 hover:bg-slate-50/50 transition-colors">
                      <td className="px-4 py-2.5 font-semibold text-slate-500 w-1/3 bg-slate-50/20">{spec.label}</td>
                      <td className="px-4 py-2.5 font-bold text-slate-700">{spec.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Action Row - Add to Cart */}
          <div className="mt-8 pt-5 border-t border-slate-150 flex flex-col sm:flex-row gap-4 items-stretch sm:items-center">
            {/* Quantity Selector */}
            <div className="flex items-center justify-between border border-slate-300 rounded-lg overflow-hidden bg-slate-50 h-11 self-start sm:self-auto min-w-[120px]">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="px-3.5 h-full hover:bg-slate-200 text-slate-600 hover:text-slate-900 font-extrabold text-base transition-colors focus:outline-none cursor-pointer"
              >
                -
              </button>
              <span className="px-3 text-sm font-mono font-bold text-slate-800">
                {quantity}
              </span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="px-3.5 h-full hover:bg-slate-200 text-slate-600 hover:text-slate-900 font-extrabold text-base transition-colors focus:outline-none cursor-pointer"
              >
                +
              </button>
            </div>

            {/* Action buttons */}
            <div className="flex-grow flex gap-3 h-11">
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
    </div>
  );
};
