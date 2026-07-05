import React, { useState } from "react";
import { ChevronDown, ChevronRight, RotateCcw } from "lucide-react";

interface FilterSidebarProps {
  categories: { [mainCategory: string]: string[] };
  selectedSubcategories: string[];
  onToggleSubcategory: (subcategory: string) => void;
  onClearFilters: () => void;
  productCounts: { [subcategory: string]: number };
  mainCategoryCounts: { [mainCategory: string]: number };
}

export const FilterSidebar: React.FC<FilterSidebarProps> = ({
  categories,
  selectedSubcategories,
  onToggleSubcategory,
  onClearFilters,
  productCounts,
  mainCategoryCounts
}) => {
  // Track expanded state of accordion categories (default to open)
  const [expanded, setExpanded] = useState<Record<string, boolean>>(
    Object.keys(categories).reduce((acc, cat) => ({ ...acc, [cat]: true }), {})
  );

  const toggleExpand = (mainCat: string) => {
    setExpanded((prev) => ({ ...prev, [mainCat]: !prev[mainCat] }));
  };

  const hasFilters = selectedSubcategories.length > 0;

  return (
    <aside className="w-full md:w-68 bg-white border border-slate-200 rounded-xl p-5 shadow-sm h-fit sticky top-24">
      {/* Sidebar Header */}
      <div className="flex items-center justify-between mb-5">
        <h3 className="text-sm font-bold text-slate-800 tracking-wide uppercase flex items-center gap-1.5">
          Filter Catalog
        </h3>
        {hasFilters && (
          <button
            onClick={onClearFilters}
            className="text-xs text-blue-600 hover:text-blue-800 transition-colors flex items-center gap-1 font-medium hover:underline cursor-pointer"
          >
            <RotateCcw size={12} />
            Reset
          </button>
        )}
      </div>

      <div className="space-y-4">
        {Object.entries(categories).map(([mainCat, subCats]) => {
          const isExpanded = expanded[mainCat];
          const count = mainCategoryCounts[mainCat] || 0;

          return (
            <div key={mainCat} className="border-b border-slate-100 pb-3 last:border-0 last:pb-0">
              {/* Accordion Trigger Header */}
              <button
                onClick={() => toggleExpand(mainCat)}
                className="w-full flex items-center justify-between text-left py-2 hover:text-blue-900 group transition-colors focus:outline-none cursor-pointer"
              >
                <span className="text-xs font-bold text-slate-700 uppercase tracking-wider group-hover:text-blue-900">
                  {mainCat} <span className="text-[10px] text-slate-400 font-mono">({count})</span>
                </span>
                <span className="text-slate-400 group-hover:text-slate-600 transition-colors">
                  {isExpanded ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                </span>
              </button>

              {/* Accordion Content (Subcategories List) */}
              {isExpanded && (
                <div className="mt-2 pl-1 space-y-2.5 animate-slide-down">
                  {subCats.map((subCat) => {
                    const isChecked = selectedSubcategories.includes(subCat);
                    const subCount = productCounts[subCat] || 0;

                    return (
                      <label
                        key={subCat}
                        className="flex items-start gap-2.5 text-xs text-slate-600 hover:text-slate-900 cursor-pointer select-none group py-0.5"
                      >
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => onToggleSubcategory(subCat)}
                          className="mt-0.5 w-3.5 h-3.5 rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                        />
                        <span className="leading-normal">
                          {subCat}{" "}
                          <span className="text-[10px] text-slate-400 font-mono ml-0.5">
                            ({subCount})
                          </span>
                        </span>
                      </label>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </aside>
  );
};
