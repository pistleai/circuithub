import React from "react";
import { Headphones, Award, Globe } from "lucide-react";

export const WhyChoose: React.FC = () => {
  return (
    <section className="w-full max-w-7xl mx-auto px-4 py-16 border-b border-gray-150">
      <div className="text-center mb-12">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-blue-950 mb-4">Why Choose CircuitHub</h2>
        <p className="text-sm sm:text-base text-gray-650 max-w-2xl mx-auto">
          We are committed to providing the best components, support, and service to help you build your next great project.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Support */}
        <div className="flex flex-col items-center text-center p-6 bg-gray-50 rounded-xl border border-gray-150 hover:border-yellow-500/50 hover:shadow-md transition-all duration-300">
          <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mb-6 shadow-sm border border-gray-100 text-yellow-500">
            <Headphones size={32} />
          </div>
          <h3 className="text-lg font-bold text-blue-950 mb-3">Expert Technical Support</h3>
          <p className="text-xs sm:text-sm text-gray-500 leading-relaxed">
            Our team of experienced engineers is ready to assist you with component selection, troubleshooting, and project advice.
          </p>
        </div>
        {/* Quality */}
        <div className="flex flex-col items-center text-center p-6 bg-gray-50 rounded-xl border border-gray-150 hover:border-yellow-500/50 hover:shadow-md transition-all duration-300">
          <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mb-6 shadow-sm border border-gray-100 text-yellow-500">
            <Award size={32} />
          </div>
          <h3 className="text-lg font-bold text-blue-950 mb-3">Authenticity Guarantee</h3>
          <p className="text-xs sm:text-sm text-gray-500 leading-relaxed">
            We source directly from manufacturers and authorized distributors to ensure you receive 100% genuine parts every time.
          </p>
        </div>
        {/* Shipping */}
        <div className="flex flex-col items-center text-center p-6 bg-gray-50 rounded-xl border border-gray-150 hover:border-yellow-500/50 hover:shadow-md transition-all duration-300">
          <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mb-6 shadow-sm border border-gray-100 text-yellow-500">
            <Globe size={32} />
          </div>
          <h3 className="text-lg font-bold text-blue-950 mb-3">Global Shipping</h3>
          <p className="text-xs sm:text-sm text-gray-500 leading-relaxed">
            Fast, reliable shipping worldwide. Track your order easily and get your components delivered right to your workbench.
          </p>
        </div>
      </div>
    </section>
  );
};
