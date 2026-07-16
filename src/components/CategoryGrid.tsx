import React from "react";
import { ChevronRight } from "lucide-react";

interface Category {
  name: string;
  image: string;
  link: string;
}

export const CategoryGrid: React.FC = () => {
  const categories: Category[] = [
    {
      name: "Connectors & Plugs",
      image: "/cat_connectors.png",
      link: "/products?subcategory=Connectors"
    },
    {
      name: "Switches & Relays",
      image: "/cat_switches.png",
      link: "/products?subcategory=Switches & Relays"
    },
    {
      name: "Control Knobs & Caps",
      image: "/cat_knobs.png",
      link: "/products?subcategory=Passives & Hardware Accessories"
    },
    {
      name: "USB to RS485 Converters",
      image: "/cat_rs485.png",
      link: "/products?search=RS485"
    },
    {
      name: "Embedded & IoT Modules",
      image: "/cat_embedded.png",
      link: "/products?category=Development Boards"
    },
    {
      name: "Precision Resistors",
      image: "/cat_resistors.png",
      link: "/products?subcategory=Passives & Discrete Semiconductors"
    },
    {
      name: "Passive Components",
      image: "/cat_passives.png",
      link: "/products?subcategory=Passives & Discrete Semiconductors"
    },
    {
      name: "Active Components & ICs",
      image: "/cat_active.png",
      link: "/products?subcategory=Integrated Circuits (ICs)"
    },
    {
      name: "Regulated Power Supplies",
      image: "/cat_powersupply.png",
      link: "/products?subcategory=Power & Magnetic Elements"
    },
    {
      name: "Displays & LED Indicators",
      image: "/cat_displays.png",
      link: "/products?subcategory=Optoelectronics"
    },
    {
      name: "Prototyping & Test Equipment",
      image: "/cat_prototyping.png",
      link: "/products?subcategory=Measuring Instruments"
    },
    {
      name: "Circuit Protection Devices",
      image: "/cat_protection.png",
      link: "/products?subcategory=Circuit Protection"
    }
  ];

  return (
    <section id="categories" className="py-10 bg-white px-4 scroll-mt-20">
      <div className="max-w-7xl mx-auto relative">
        <div className="relative">
          {/* Categories Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 pr-0 xl:pr-4">
            {categories.map((cat, idx) => (
              <a
                key={idx}
                href={cat.link}
                className="bg-white border border-gray-150 rounded-xl p-3 flex flex-col items-center text-center gap-3 shadow-sm hover:shadow-md hover:border-blue-900/30 transition-all hover:-translate-y-0.5 group"
              >
                {/* Image Box on top */}
                <div className="w-full h-24 bg-gray-50 rounded-lg p-1 flex-shrink-0 flex items-center justify-center overflow-hidden border border-gray-100 group-hover:scale-105 transition-transform">
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="w-full h-full object-contain filter drop-shadow-sm"
                  />
                </div>

                {/* Title & Explore on the bottom */}
                <div className="flex flex-col items-center min-w-0 w-full">
                  <h3 className="font-bold text-xs sm:text-sm text-gray-900 leading-tight group-hover:text-blue-900 transition-colors line-clamp-2 h-8 flex items-center justify-center">
                    {cat.name}
                  </h3>
                  <span className="text-[11px] font-bold text-blue-900 flex items-center gap-0.5 mt-1.5 group-hover:text-yellow-600 transition-colors">
                    Explore
                    <span className="inline-block transition-transform group-hover:translate-x-1 font-mono">&rarr;</span>
                  </span>
                </div>
              </a>
            ))}
          </div>

          {/* Right Slider Arrow Indicator */}
          <button 
            className="absolute -right-4 top-1/2 -translate-y-1/2 bg-white border border-gray-200 text-gray-400 hover:text-blue-900 hover:border-gray-300 w-8 h-8 rounded-full hidden xl:flex items-center justify-center shadow-md hover:shadow-lg transition-all z-10 focus:outline-none cursor-pointer"
            aria-label="Next slide"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </section>
  );
};
