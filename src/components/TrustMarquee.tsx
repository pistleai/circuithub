import React from "react";

export const TrustMarquee: React.FC = () => {
  const items = [
    "ISO 9001",
    "RoHS Compliant",
    "CE Certified",
    "FCC Approved",
    "Arduino Partner",
    "Raspberry Pi Auth",
    "Adafruit Distributor",
    "SparkFun Reseller"
  ];

  return (
    <section className="w-full bg-white py-8 border-b border-gray-150 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 mb-4 text-center">
        <h3 className="text-xs sm:text-sm font-bold uppercase tracking-widest text-gray-500">
          Trusted by Makers &amp; Compliant with Industry Standards
        </h3>
      </div>
      <div className="w-full relative flex overflow-hidden">
        {/* We wrap the items in a flex container that runs the marquee animation */}
        <div className="animate-marquee flex whitespace-nowrap items-center py-2 select-none">
          {/* First set */}
          <div className="flex items-center gap-16 px-8 text-gray-400 font-extrabold text-base sm:text-lg tracking-wider">
            {items.map((item, idx) => (
              <span key={`set1-${idx}`} className="hover:text-blue-900 transition-colors duration-200 cursor-default">
                {item}
              </span>
            ))}
          </div>
          {/* Duplicate set for seamless looping */}
          <div className="flex items-center gap-16 px-8 text-gray-400 font-extrabold text-base sm:text-lg tracking-wider">
            {items.map((item, idx) => (
              <span key={`set2-${idx}`} className="hover:text-blue-900 transition-colors duration-200 cursor-default">
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
