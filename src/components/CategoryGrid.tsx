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
      name: "Arduino / Dev Boards",
      image: "/arduino_uno.png",
      link: "#components"
    },
    {
      name: "Sensors",
      image: "/hc_sr04.png",
      link: "#sensors"
    },
    {
      name: "Motors",
      image: "/dc_motor.png",
      link: "#components"
    },
    {
      name: "Robotics Kits",
      image: "/smart_robot_car.png",
      link: "#robotics-kits"
    },
    {
      name: "Tools",
      image: "/soldering_iron.png",
      link: "#tools"
    },
    {
      name: "STEM Learning",
      image: "/stem_kit.png",
      link: "#stem-learning"
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
                className="bg-white border border-gray-150 rounded-xl p-3 flex flex-row items-center gap-3.5 shadow-sm hover:shadow-md hover:border-blue-900/30 transition-all hover:-translate-y-0.5 group"
              >
                {/* Image Box on the left */}
                <div className="w-14 h-14 bg-gray-50 rounded-lg p-1.5 flex-shrink-0 flex items-center justify-center overflow-hidden border border-gray-100 group-hover:scale-105 transition-transform">
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="w-full h-full object-contain filter drop-shadow-sm"
                  />
                </div>

                {/* Title & Explore on the right */}
                <div className="flex flex-col text-left min-w-0">
                  <h3 className="font-bold text-xs sm:text-sm text-gray-900 leading-tight group-hover:text-blue-900 transition-colors truncate">
                    {cat.name}
                  </h3>
                  <span className="text-[11px] font-semibold text-blue-900 flex items-center gap-0.5 mt-1 group-hover:text-yellow-600 transition-colors">
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
