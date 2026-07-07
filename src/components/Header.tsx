"use client";

import React, { useState, useMemo, useEffect } from "react";
import { useCart } from "../context/CartContext";
import { Search, ShoppingCart, User, Menu, X, Trash2, ChevronDown, ChevronRight } from "lucide-react";
import { B2BGstinModal } from "./B2BGstinModal";
import { products } from "../data/products";
import { useRouter, useSearchParams, usePathname } from "next/navigation";

export const Header: React.FC = () => {
  const { cart, cartCount, cartTotal, removeFromCart, updateQuantity, isCartOpen, setIsCartOpen, animateCartIcon, isGstinModalOpen, setIsGstinModalOpen } = useCart();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchCategory, setSearchCategory] = useState("All Categories");
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const isHome = pathname === "/";
  const isProducts = pathname?.startsWith("/products");
  const [searchQuery, setSearchQuery] = useState(() => {
    return searchParams?.get("search") || "";
  });
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);

  useEffect(() => {
    setSearchQuery(searchParams?.get("search") || "");
  }, [searchParams]);

  // States for Cascading Mega Menu
  const [hoveredMainCategory, setHoveredMainCategory] = useState<string>("Electronic Components");
  const [hoveredSubcategory, setHoveredSubcategory] = useState<string>("Connectors");

  // Pre-calculate structured cascading menu data
  const menuStructure = useMemo(() => {
    const structure: Record<string, Record<string, string[]>> = {};
    products.forEach((prod) => {
      if (!structure[prod.mainCategory]) {
        structure[prod.mainCategory] = {};
      }
      if (!structure[prod.mainCategory][prod.subcategory]) {
        structure[prod.mainCategory][prod.subcategory] = [];
      }
      if (!structure[prod.mainCategory][prod.subcategory].includes(prod.cleanName)) {
        structure[prod.mainCategory][prod.subcategory].push(prod.cleanName);
      }
    });
    return structure;
  }, []);

  const handleMainCategoryHover = (mainCat: string) => {
    setHoveredMainCategory(mainCat);
    const subCats = Object.keys(menuStructure[mainCat] || {});
    if (subCats.length > 0) {
      setHoveredSubcategory(subCats[0]);
    } else {
      setHoveredSubcategory("");
    }
  };


  const router = useRouter();

  const handleSearch = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setIsMobileMenuOpen(false);
    
    let targetUrl = `/products?search=${encodeURIComponent(searchQuery.trim())}`;
    
    if (searchCategory !== "All Categories") {
      if (searchCategory === "Robotics Kits") {
        targetUrl += `&subcategory=${encodeURIComponent("Robotics Kits")}`;
      } else if (searchCategory === "Dev Boards") {
        targetUrl += `&category=${encodeURIComponent("Development Boards")}`;
      } else if (searchCategory === "Sensors") {
        targetUrl += `&category=${encodeURIComponent("Sensors")}`;
      } else if (searchCategory === "Motors") {
        targetUrl += `&subcategory=${encodeURIComponent("Motors")}`;
      } else if (searchCategory === "Tools") {
        targetUrl += `&category=${encodeURIComponent("Mechanical Parts, Measurement & Workbench Tools")}`;
      } else if (searchCategory === "STEM Learning") {
        targetUrl += `&category=${encodeURIComponent("DIY and Maker Kits")}`;
      }
    }
    
    router.push(targetUrl);
  };

  const categories = [
    "All Categories",
    "Robotics Kits",
    "Dev Boards",
    "Sensors",
    "Motors",
    "Tools",
    "STEM Learning"
  ];

  return (
    <header className="bg-white border-b border-gray-150 sticky top-0 z-40 shadow-sm">
      {/* Row 1: Logo, Search, Cart & User */}
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
        {/* Logo */}
        <a href="/" className="flex items-center flex-shrink-0" aria-label="CircuitHub Home">
          <img src="/logo.png" alt="CircuitHub Logo" className="h-11 md:h-13 w-auto object-contain" />
        </a>

        {/* Search Bar - Hidden on mobile, flex on desktop */}
        <form onSubmit={handleSearch} className="hidden md:flex flex-grow max-w-2xl border border-gray-300 rounded-md focus-within:ring-2 focus-within:ring-blue-900 focus-within:border-blue-900 overflow-hidden bg-white">
          <input
            type="text"
            placeholder="Search for products, components, kits..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-grow px-4 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:outline-none"
          />

          {/* Category Dropdown on the right side of the input field */}
          <div className="relative border-l border-gray-300">
            <button
              type="button"
              onClick={() => setShowCategoryDropdown(!showCategoryDropdown)}
              className="bg-gray-50 px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-100 flex items-center gap-1.5 focus:outline-none whitespace-nowrap h-full animate-none"
            >
              {searchCategory}
              <ChevronDown size={14} className="text-gray-500" />
            </button>
            {showCategoryDropdown && (
              <div className="absolute right-0 mt-1 bg-white border border-gray-200 rounded-md shadow-lg py-1 z-50 min-w-[160px]">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => {
                      setSearchCategory(cat);
                      setShowCategoryDropdown(false);
                    }}
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors focus:outline-none"
                  >
                    {cat}
                  </button>
                ))}
              </div>
            )}
          </div>

          <button type="submit" className="bg-yellow-500 hover:bg-yellow-600 transition-colors text-blue-950 font-semibold px-6 py-2.5 flex items-center justify-center border-l border-gray-300">
            <Search size={18} />
          </button>
        </form>

        {/* User Utility Area */}
        <div className="flex items-center gap-4 flex-shrink-0">
          <button className="text-gray-700 hover:text-blue-900 transition-colors p-2 rounded-full hover:bg-gray-50 hidden sm:block" aria-label="User account">
            <User size={20} />
          </button>

          {/* Cart Workspace Trigger */}
          <button
            onClick={() => setIsCartOpen(!isCartOpen)}
            className={`flex items-center gap-2 bg-gray-50 hover:bg-gray-100 transition-all border border-gray-200 px-3.5 py-2 rounded-md relative ${
              animateCartIcon ? "scale-105 border-yellow-500 shadow-md ring-2 ring-yellow-500/20" : ""
            }`}
            aria-label="Open cart workspace"
          >
            <ShoppingCart size={18} className="text-blue-900" />
            <span className="font-semibold text-sm text-gray-800 hidden md:inline">Cart Workspace</span>
            <span className={`bg-blue-900 text-white text-xs px-2 py-0.5 rounded-full font-bold transition-all ${
              animateCartIcon ? "bg-yellow-500 scale-110" : ""
            }`}>
              {cartCount}
            </span>
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-gray-700 hover:text-blue-900 transition-colors p-2 rounded-full hover:bg-gray-50 md:hidden"
            aria-label="Toggle Navigation Menu"
          >
            <Menu size={22} />
          </button>
        </div>
      </div>

      {/* Row 2: Secondary Navigation Bar (Desktop) */}
      <nav className="hidden md:block border-t border-gray-150 bg-white">
        <div className="max-w-7xl mx-auto px-4 py-2 flex items-center">
          <div className="flex items-center gap-8 py-0.5">
            <a
              href="/"
              className={isHome
                ? "text-yellow-500 hover:text-yellow-600 font-bold text-sm tracking-wide transition-colors relative py-1 border-b-2 border-yellow-500"
                : "text-gray-700 hover:text-blue-900 font-semibold text-sm tracking-wide transition-colors relative py-1 border-b-2 border-transparent hover:border-blue-900/40"
              }
            >
              Home
            </a>
            {/* Interactive Product List Link with Hover Menu */}
            <div className="relative group py-1">
              <a 
                href="/products" 
                className={isProducts
                  ? "text-yellow-500 hover:text-yellow-600 font-bold text-sm tracking-wide transition-colors flex items-center gap-1 py-1 border-b-2 border-yellow-500 cursor-pointer"
                  : "text-gray-700 hover:text-blue-900 font-semibold text-sm tracking-wide transition-colors flex items-center gap-1 py-1 border-b-2 border-transparent hover:border-blue-900/45 cursor-pointer"
                }
              >
                Product List
                <ChevronDown size={14} className={isProducts ? "text-yellow-500 group-hover:text-yellow-650 transition-colors" : "text-gray-400 group-hover:text-blue-900 transition-colors"} />
              </a>

              {/* Mega Dropdown Menu - Cascading 3-Panel Grid */}
              <div className="absolute left-0 mt-2 w-[850px] bg-white border border-gray-200 rounded-2xl shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 transform translate-y-1 group-hover:translate-y-0 grid grid-cols-[260px_260px_1fr] h-[450px] overflow-hidden">
                
                {/* Column 1: Main Categories (Level 1) */}
                <div className="bg-slate-50 border-r border-gray-150/70 overflow-y-auto py-2.5">
                  <div className="px-4 pb-2 mb-2 border-b border-slate-100">
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">
                      Main Categories
                    </span>
                  </div>
                  <a 
                    href="/products" 
                    className="flex items-center justify-between px-4 py-2.5 text-xs font-bold text-slate-800 hover:bg-slate-100 hover:text-blue-900 transition-colors border-l-4 border-transparent"
                  >
                    All Catalog Products
                    <span className="bg-blue-100 text-[10px] text-blue-900 px-1.5 py-0.5 rounded-full font-mono font-bold">
                      {products.length}
                    </span>
                  </a>
                  <div className="h-[1px] bg-slate-200/50 my-2" />
                  {Object.keys(menuStructure).map((mainCat) => (
                    <div 
                      key={mainCat}
                      onMouseEnter={() => handleMainCategoryHover(mainCat)}
                      className={`flex items-center justify-between px-4 py-2.5 text-[11px] font-extrabold uppercase tracking-wider transition-all duration-150 cursor-pointer ${
                        hoveredMainCategory === mainCat 
                          ? "bg-white text-blue-900 border-l-4 border-blue-900 pl-3 shadow-[inset_1px_1px_3px_rgba(0,0,0,0.02)]" 
                          : "text-slate-505 hover:text-slate-800 hover:bg-slate-100/55 pl-4 border-l-4 border-transparent"
                      }`}
                    >
                      <a href={`/products?category=${encodeURIComponent(mainCat)}`} className="flex-grow truncate py-0.5">
                        {mainCat}
                      </a>
                      <ChevronRight size={12} className={`transition-transform flex-shrink-0 ${hoveredMainCategory === mainCat ? "text-blue-900 translate-x-0.5" : "text-slate-350"}`} />
                    </div>
                  ))}
                </div>

                {/* Column 2: Subcategories (Level 2) */}
                <div className="bg-white border-r border-gray-150/70 overflow-y-auto py-2.5">
                  <div className="px-4 pb-2 mb-2 border-b border-slate-100">
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">
                      Subcategories
                    </span>
                  </div>
                  {hoveredMainCategory && menuStructure[hoveredMainCategory] ? (
                    Object.keys(menuStructure[hoveredMainCategory]).map((subCat) => (
                      <div
                        key={subCat}
                        onMouseEnter={() => setHoveredSubcategory(subCat)}
                        className={`flex items-center justify-between px-4 py-2.5 text-xs font-bold tracking-wide transition-all duration-150 cursor-pointer ${
                          hoveredSubcategory === subCat
                            ? "bg-slate-50 text-blue-800 font-extrabold pl-5 border-l-4 border-blue-800"
                            : "text-slate-600 hover:text-slate-900 hover:bg-slate-50/50 pl-4 border-l-4 border-transparent"
                        }`}
                      >
                        <a href={`/products?subcategory=${encodeURIComponent(subCat)}`} className="flex-grow truncate py-0.5">
                          {subCat}
                        </a>
                        <ChevronRight size={12} className={`transition-transform flex-shrink-0 ${hoveredSubcategory === subCat ? "text-blue-800 translate-x-0.5" : "text-slate-300"}`} />
                      </div>
                    ))
                  ) : (
                    <div className="px-4 py-8 text-center text-xs text-slate-400 italic">
                      Hover a category to view
                    </div>
                  )}
                </div>

                {/* Column 3: Product Groups (Level 3) */}
                <div className="bg-slate-50/30 overflow-y-auto py-2.5">
                  <div className="px-5 pb-2 mb-2 border-b border-slate-100">
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">
                      Product Groups
                    </span>
                  </div>
                  {hoveredMainCategory && hoveredSubcategory && menuStructure[hoveredMainCategory]?.[hoveredSubcategory] ? (
                    menuStructure[hoveredMainCategory][hoveredSubcategory].map((prodName) => (
                      <a
                        key={prodName}
                        href={`/products?search=${encodeURIComponent(prodName)}`}
                        className="block px-5 py-2 text-xs text-slate-600 hover:text-blue-900 hover:bg-blue-50/50 transition-colors font-medium border-b border-slate-100/30 last:border-0 truncate"
                        title={prodName}
                      >
                        {prodName}
                      </a>
                    ))
                  ) : (
                    <div className="px-5 py-8 text-center text-xs text-slate-400 italic">
                      Hover a subcategory to view items
                    </div>
                  )}
                </div>

              </div>
            </div>
            <a href="#deals" className="text-gray-700 hover:text-blue-900 font-semibold text-sm tracking-wide flex items-center gap-1.5 transition-colors relative py-1 border-b-2 border-transparent hover:border-blue-900/40">
              Deals
              <span className="bg-red-500 text-[10px] text-white px-1.5 py-0.5 rounded font-bold uppercase animate-pulse leading-none">
                HOT
              </span>
            </a>
            <a href="#about" className="text-gray-700 hover:text-blue-900 font-semibold text-sm tracking-wide transition-colors relative py-1 border-b-2 border-transparent hover:border-blue-900/40">
              About
            </a>
            <a href="#contact" className="text-gray-700 hover:text-blue-900 font-semibold text-sm tracking-wide transition-colors relative py-1 border-b-2 border-transparent hover:border-blue-900/40">
              Contact
            </a>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer Slide-in Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 md:hidden flex justify-end transition-opacity animate-fade-in">
          <div className="bg-white w-[300px] h-full flex flex-col p-6 shadow-2xl relative animate-slide-in">
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 focus:outline-none p-1 rounded-full hover:bg-gray-50"
            >
              <X size={24} />
            </button>

            {/* Mobile Logo */}
            <div className="mb-8 pr-6">
              <span className="font-bold text-xl text-blue-900 flex items-center gap-2">
                <span className="bg-blue-900 text-yellow-500 p-1.5 rounded-lg text-xs font-mono">CH</span>
                CircuitHub
              </span>
              <p className="text-[10px] text-gray-500 font-medium tracking-wide mt-1">Electronics & Robotics</p>
            </div>

            {/* Mobile Search */}
            <div className="mb-6">
              <form onSubmit={handleSearch} className="flex border border-gray-300 rounded-md overflow-hidden focus-within:ring-2 focus-within:ring-blue-900">
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-3 py-2 text-sm focus:outline-none"
                />
                <button type="submit" className="bg-yellow-500 px-4 flex items-center justify-center text-blue-950 font-semibold">
                  <Search size={16} />
                </button>
              </form>
            </div>

            {/* Navigation Links */}
            <div className="flex flex-col gap-4 text-base font-semibold text-gray-800">
              <a
                href="/"
                onClick={() => setIsMobileMenuOpen(false)}
                className={isHome
                  ? "text-yellow-500 hover:text-yellow-600 transition-colors py-1 border-b border-yellow-500"
                  : "hover:text-blue-900 transition-colors py-1 border-b border-gray-50"
                }
              >
                Home
              </a>
              <a
                href="/products"
                onClick={() => setIsMobileMenuOpen(false)}
                className={isProducts
                  ? "text-yellow-500 hover:text-yellow-650 transition-colors py-1 border-b border-yellow-500"
                  : "hover:text-blue-900 transition-colors py-1 border-b border-gray-50"
                }
              >
                Product List
              </a>
              <a
                href="#deals"
                onClick={() => setIsMobileMenuOpen(false)}
                className="hover:text-blue-900 transition-colors py-1 border-b border-gray-50 flex items-center gap-2"
              >
                Deals
                <span className="bg-red-500 text-[10px] text-white px-1.5 py-0.5 rounded font-bold uppercase">
                  HOT
                </span>
              </a>
              <a
                href="#about"
                onClick={() => setIsMobileMenuOpen(false)}
                className="hover:text-blue-900 transition-colors py-1 border-b border-gray-50"
              >
                About
              </a>
              <a
                href="#contact"
                onClick={() => setIsMobileMenuOpen(false)}
                className="hover:text-blue-900 transition-colors py-1 border-b border-gray-50"
              >
                Contact
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Cart Workspace Side Drawer (Glows/Slides out) */}
      {isCartOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex justify-end animate-fade-in">
          <div className="bg-white w-full sm:w-[450px] h-full flex flex-col shadow-2xl relative animate-slide-in">
            {/* Drawer Header */}
            <div className="p-5 border-b border-gray-200 flex justify-between items-center bg-blue-950 text-white">
              <div className="flex items-center gap-2">
                <ShoppingCart className="text-yellow-500" size={20} />
                <h2 className="font-bold text-lg">Cart Workspace</h2>
              </div>
              <button
                onClick={() => setIsCartOpen(false)}
                className="text-gray-300 hover:text-white p-1 rounded-full hover:bg-white/10"
              >
                <X size={20} />
              </button>
            </div>

            {/* Drawer Items list */}
            <div className="flex-grow overflow-y-auto p-5 space-y-4">
              {cart.length === 0 ? (
                <div className="h-full flex flex-col justify-center items-center text-center py-12">
                  <ShoppingCart size={48} className="text-gray-300 mb-3" />
                  <p className="font-semibold text-gray-500">Your Cart is Empty</p>
                  <p className="text-xs text-gray-400 mt-1 max-w-[200px]">Add high-quality components and kits to get started on your hardware build.</p>
                </div>
              ) : (
                cart.map((item) => (
                  <div key={item.id} className="flex gap-4 p-3 bg-gray-50 border border-gray-150 rounded-lg hover:shadow-sm transition-shadow">
                    <div className="w-16 h-16 bg-white border border-gray-200 rounded flex-shrink-0 flex items-center justify-center p-1.5 overflow-hidden">
                      <img src={item.image} alt={item.title} className="w-full h-full object-contain" />
                    </div>
                    <div className="flex-grow min-w-0">
                      <h3 className="font-semibold text-sm text-gray-900 truncate">{item.title}</h3>
                      <p className="text-xs font-bold text-blue-900 mt-0.5">${item.price.toFixed(2)}</p>
                      
                      {/* Quantity Controls */}
                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center border border-gray-300 rounded overflow-hidden">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="px-2 py-0.5 bg-white hover:bg-gray-100 text-gray-600 font-bold text-xs"
                          >
                            -
                          </button>
                          <span className="px-3 text-xs font-mono font-semibold text-gray-700 bg-gray-50">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="px-2 py-0.5 bg-white hover:bg-gray-100 text-gray-600 font-bold text-xs"
                          >
                            +
                          </button>
                        </div>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-red-500 hover:text-red-600 transition-colors p-1"
                          aria-label="Remove item"
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Drawer Footer */}
            {cart.length > 0 && (
              <div className="p-5 border-t border-gray-200 bg-gray-55/80 space-y-4">
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal:</span>
                    <span>${cartTotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Shipping:</span>
                    <span className="text-green-600 font-medium">FREE</span>
                  </div>
                  <div className="flex justify-between font-bold text-gray-900 text-base pt-2 border-t border-gray-200">
                    <span>Total Cost:</span>
                    <span className="text-blue-900">${cartTotal.toFixed(2)}</span>
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    onClick={() => {
                      alert(`Proceeding to checkout with: $${cartTotal.toFixed(2)}`);
                      setIsCartOpen(false);
                    }}
                    className="w-full bg-yellow-500 hover:bg-yellow-600 transition-all text-blue-950 font-bold py-3 rounded-lg text-sm text-center shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 active:shadow-md"
                  >
                    Proceed to B2B Billing
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* GSTIN Verification Modal */}
      <B2BGstinModal isOpen={isGstinModalOpen} onClose={() => setIsGstinModalOpen(false)} />
    </header>
  );
};
