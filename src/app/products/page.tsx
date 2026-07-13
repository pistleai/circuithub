"use client";

import React, { useState, useMemo, useEffect, Suspense } from "react";
import { TopBar } from "../../components/TopBar";
import { Header } from "../../components/Header";
import { Footer } from "../../components/Footer";
import { FilterSidebar } from "../../components/FilterSidebar";
import { ProductCard } from "../../components/ProductCard";
import { products } from "../../data/products";
import { Search, SlidersHorizontal, Inbox, X } from "lucide-react";
import { useSearchParams, useRouter } from "next/navigation";
import { Product } from "../../types/product";
import Link from "next/link";

export default function ProductsPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center text-slate-500 font-mono text-sm gap-3">
        <div className="w-6 h-6 border-2 border-slate-350 border-t-blue-900 rounded-full animate-spin" />
        Loading CircuitHub Catalog...
      </div>
    }>
      <ProductsCatalog />
    </Suspense>
  );
}

function ProductsCatalog() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSubcategories, setSelectedSubcategories] = useState<string[]>([]);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  const searchParams = useSearchParams();
  const router = useRouter();

  // 1. Programmatically extract categories and subcategories
  const categoriesMap = useMemo(() => {
    const map: { [mainCategory: string]: string[] } = {};
    products.forEach((prod) => {
      if (!map[prod.mainCategory]) {
        map[prod.mainCategory] = [];
      }
      if (!map[prod.mainCategory].includes(prod.subcategory)) {
        map[prod.mainCategory].push(prod.subcategory);
      }
    });
    return map;
  }, []);

  // 1.5 Sync state with URL Search Parameters
  useEffect(() => {
    const category = searchParams?.get("category");
    const subcategory = searchParams?.get("subcategory");
    const search = searchParams?.get("search");

    if (search) {
      setSearchQuery(search);
    } else {
      setSearchQuery("");
    }

    if (subcategory) {
      setSelectedSubcategories(subcategory.split(","));
    } else if (category) {
      const subcats = categoriesMap[category] || [];
      setSelectedSubcategories(subcats);
    } else {
      setSelectedSubcategories([]);
    }
  }, [searchParams, categoriesMap]);

  // 2. Compute total product counts per category / subcategory
  const { productCounts, mainCategoryCounts } = useMemo(() => {
    const subCounts: { [subcategory: string]: number } = {};
    const mainCounts: { [mainCategory: string]: number } = {};

    products.forEach((prod) => {
      subCounts[prod.subcategory] = (subCounts[prod.subcategory] || 0) + 1;
      mainCounts[prod.mainCategory] = (mainCounts[prod.mainCategory] || 0) + 1;
    });

    return { productCounts: subCounts, mainCategoryCounts: mainCounts };
  }, []);

  // 3. Filter products based on search query and selected subcategories
  const filteredProducts = useMemo(() => {
    return products.filter((prod) => {
      const matchesSearch =
        prod.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        prod.cleanName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        prod.subcategory.toLowerCase().includes(searchQuery.toLowerCase()) ||
        prod.mainCategory.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesFilter =
        selectedSubcategories.length === 0 ||
        selectedSubcategories.includes(prod.subcategory);

      return matchesSearch && matchesFilter;
    });
  }, [searchQuery, selectedSubcategories]);

  // 4. Filter Handlers with URL synchronization
  const updateSearchQuery = (val: string) => {
    setSearchQuery(val);
    const params = new URLSearchParams(window.location.search);
    if (val) {
      params.set("search", val);
    } else {
      params.delete("search");
    }
    router.replace(`/products?${params.toString()}`, { scroll: false });
  };

  const handleToggleSubcategory = (subcategory: string) => {
    setSelectedSubcategories((prev) => {
      const next = prev.includes(subcategory)
        ? prev.filter((item) => item !== subcategory)
        : [...prev, subcategory];
      
      const params = new URLSearchParams(window.location.search);
      params.delete("category"); // clear category since we are selecting specific subcategories
      if (next.length === 1) {
        params.set("subcategory", next[0]);
      } else if (next.length > 1) {
        params.set("subcategory", next.join(","));
      } else {
        params.delete("subcategory");
      }
      router.replace(`/products?${params.toString()}`, { scroll: false });
      return next;
    });
  };

  const handleClearFilters = () => {
    setSelectedSubcategories([]);
    const params = new URLSearchParams(window.location.search);
    params.delete("category");
    params.delete("subcategory");
    router.replace(`/products?${params.toString()}`, { scroll: false });
  };

  return (
    <div className="bg-slate-50 text-slate-900 min-h-screen flex flex-col">
      {/* Global Navigation Components */}
      <TopBar />
      <Header />

      {/* Catalog Search & Sticky Title Header */}
      <section className="bg-white border-b border-slate-200 sticky top-[72px] z-30 py-4 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h1 className="text-xl md:text-2xl font-black text-slate-800 tracking-tight flex items-center gap-2">
              Hardware Catalog
              <span className="bg-slate-100 text-slate-500 font-mono text-xs font-semibold py-1 px-2.5 rounded-full border border-slate-200">
                {filteredProducts.length} Items
              </span>
            </h1>
            <p className="text-xs text-slate-400 mt-0.5">
              Browse components, breakout boards, sensors, and workbench utilities.
            </p>
          </div>

          {/* Sticky Search bar */}
          <div className="w-full sm:w-80 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search components..."
              value={searchQuery}
              onChange={(e) => updateSearchQuery(e.target.value)}
              className="w-full pl-9 pr-8 py-2 border border-slate-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 rounded-lg text-sm bg-slate-50 focus:bg-white transition-all placeholder-slate-400 focus:outline-none"
            />
            {searchQuery && (
              <button
                onClick={() => updateSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors p-0.5 rounded-full hover:bg-slate-200"
              >
                <X size={12} />
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Main Catalog Body */}
      <main className="max-w-7xl mx-auto w-full px-4 py-8 flex-grow flex flex-col md:flex-row gap-6">
        {/* Desktop Sidebar */}
        <div className="hidden md:block">
          <FilterSidebar
            categories={categoriesMap}
            selectedSubcategories={selectedSubcategories}
            onToggleSubcategory={handleToggleSubcategory}
            onClearFilters={handleClearFilters}
            productCounts={productCounts}
            mainCategoryCounts={mainCategoryCounts}
          />
        </div>

        {/* Mobile Filter Button */}
        <div className="md:hidden flex items-center justify-between bg-white border border-slate-200 p-3.5 rounded-xl shadow-sm">
          <span className="text-sm font-semibold text-slate-700">
            Filters {selectedSubcategories.length > 0 && `(${selectedSubcategories.length})`}
          </span>
          <button
            onClick={() => setIsMobileSidebarOpen(true)}
            className="flex items-center gap-1.5 bg-blue-900 text-white hover:bg-blue-900/90 text-xs font-bold py-2 px-4 rounded-lg shadow transition-colors cursor-pointer"
          >
            <SlidersHorizontal size={14} />
            Configure
          </button>
        </div>

        {/* Mobile Sidebar Overlay/Drawer */}
        {isMobileSidebarOpen && (
          <div className="fixed inset-0 z-50 flex md:hidden">
            {/* Backdrop */}
            <div
              className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm"
              onClick={() => setIsMobileSidebarOpen(false)}
            />

            {/* Content Drawer */}
            <div className="relative w-80 max-w-[85vw] bg-white h-full flex flex-col p-6 shadow-2xl animate-slide-in-right overflow-y-auto">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-4">
                <h2 className="text-sm font-bold uppercase tracking-wider text-slate-800">
                  Filter Catalog
                </h2>
                <button
                  onClick={() => setIsMobileSidebarOpen(false)}
                  className="p-1 rounded-full hover:bg-slate-100 text-slate-500 hover:text-slate-800 transition-colors"
                >
                  <X size={18} />
                </button>
              </div>

              <FilterSidebar
                categories={categoriesMap}
                selectedSubcategories={selectedSubcategories}
                onToggleSubcategory={handleToggleSubcategory}
                onClearFilters={handleClearFilters}
                productCounts={productCounts}
                mainCategoryCounts={mainCategoryCounts}
              />
            </div>
          </div>
        )}

        {/* Main Grid Content */}
        <div className="flex-grow flex flex-col">
          {filteredProducts.length === 0 ? (
            /* Empty State */
            <div className="flex flex-col items-center justify-center text-center p-12 bg-white border border-slate-200 rounded-xl shadow-sm my-auto min-h-[350px]">
              <div className="p-4 bg-slate-55 bg-gradient-to-tr from-slate-100 to-slate-200 border border-slate-200 rounded-full text-slate-400 mb-4">
                <Inbox size={42} strokeWidth={1.5} />
              </div>
              <h3 className="text-lg font-bold text-slate-800">No parts found</h3>
              <p className="text-slate-450 text-sm max-w-sm mt-1 leading-relaxed text-slate-500">
                We couldn't find anything matching your search or active filters. Try refining your spelling or clearing some subcategories.
              </p>
              {(searchQuery || selectedSubcategories.length > 0) && (
                <button
                  onClick={() => {
                    setSearchQuery("");
                    setSelectedSubcategories([]);
                  }}
                  className="mt-6 bg-slate-900 hover:bg-slate-800 text-white font-semibold py-2 px-5 rounded-lg text-sm shadow transition-colors cursor-pointer"
                >
                  Clear Search & Filters
                </button>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredProducts.map((product) => (
                <Link key={product.id} href={`/products/${product.id}`} className="block">
                  <ProductCard product={product} />
                </Link>
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
