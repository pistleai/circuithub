import React from "react";
import { ShieldCheck, Truck, Cpu, Tags } from "lucide-react";

export const ValueProps: React.FC = () => {
  const props = [
    {
      icon: <ShieldCheck className="text-blue-900 flex-shrink-0" size={28} />,
      title: "Genuine Products",
      desc: "100% authentic & quality checked products"
    },
    {
      icon: <Truck className="text-blue-900 flex-shrink-0" size={28} />,
      title: "Fast Delivery",
      desc: "Quick shipping across the USA"
    },
    {
      icon: <Cpu className="text-blue-900 flex-shrink-0" size={28} />,
      title: "Technical Support",
      desc: "Expert support for your projects"
    },
    {
      icon: <Tags className="text-blue-900 flex-shrink-0" size={28} />,
      title: "Best Prices",
      desc: "Competitive prices & exciting deals"
    }
  ];

  return (
    <section className="bg-gray-100/80 border-t border-b border-gray-150 py-10 px-4">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {props.map((item, idx) => (
          <div
            key={idx}
            className="flex items-start gap-4 p-4 rounded-xl bg-white/50 border border-white/20 shadow-sm"
          >
            <div className="bg-blue-900/10 p-2.5 rounded-lg">
              {item.icon}
            </div>
            <div className="space-y-0.5">
              <h3 className="font-extrabold text-sm text-gray-900">
                {item.title}
              </h3>
              <p className="text-xs text-gray-550 leading-normal">
                {item.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
