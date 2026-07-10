import React from "react";
import { Star, Quote } from "lucide-react";

export const Testimonials: React.FC = () => {
  const testimonials = [
    {
      initials: "SJ",
      name: "Sarah Jenkins",
      role: "Robotics Educator",
      rating: 5,
      quote: "CircuitHub has been my go-to for sourcing components for my robotics classes. The authenticity guarantee gives me peace of mind, and their support is unmatched."
    },
    {
      initials: "MC",
      name: "Mark Chen",
      role: "DIY Drone Builder",
      rating: 5,
      quote: "I was struggling with a complex sensor integration for my drone project. The technical support team at CircuitHub walked me through it step-by-step."
    },
    {
      initials: "ER",
      name: "Elena Rodriguez",
      role: "Hardware Engineer",
      rating: 4.5,
      quote: "Fastest shipping I've experienced for electronic parts. Everything arrives well-packaged and exactly as described. The Maker Deals are also fantastic."
    },
    {
      initials: "DP",
      name: "Daniel Patel",
      role: "IoT Hobbyist",
      rating: 5,
      quote: "The variety of dev boards available is incredible. It's so convenient to order my microcontrollers, sensors, and power supplies all from one trusted place."
    }
  ];

  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    for (let i = 1; i <= 5; i++) {
      if (i <= fullStars) {
        stars.push(<Star key={i} size={14} fill="#eab308" className="text-yellow-500" />);
      } else if (i === fullStars + 1 && hasHalfStar) {
        stars.push(<Star key={i} size={14} fill="#eab308" className="text-yellow-500 opacity-70" />);
      } else {
        stars.push(<Star key={i} size={14} fill="none" className="text-gray-300" />);
      }
    }
    return stars;
  };

  return (
    <section className="w-full max-w-7xl mx-auto px-4 py-16 border-b border-gray-150">
      <div className="border-l-4 border-yellow-500 pl-4 mb-10">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-blue-950">Maker Testimonials</h2>
        <p className="text-xs sm:text-sm text-gray-500 mt-1">Hear from the engineers and hobbyists who build with us.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {testimonials.map((t, idx) => (
          <div
            key={idx}
            className="bg-white border border-gray-150 rounded-xl p-6 relative flex flex-col shadow-sm hover:shadow-md hover:border-blue-900/10 transition-all duration-300 group"
          >
            {/* Quote Icon watermark */}
            <Quote
              className="text-gray-100 absolute top-4 right-4 group-hover:text-yellow-100 transition-colors duration-300 pointer-events-none"
              size={40}
              strokeWidth={1.5}
            />
            
            {/* Stars */}
            <div className="flex gap-0.5 mb-4 relative z-10">
              {renderStars(t.rating)}
            </div>

            {/* Testimonial Quote */}
            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed mb-6 italic flex-grow relative z-10">
              "{t.quote}"
            </p>

            {/* User Info */}
            <div className="flex items-center gap-3 mt-auto pt-4 border-t border-gray-100">
              <div className="w-10 h-10 bg-blue-950 text-white rounded-full flex items-center justify-center font-extrabold text-xs">
                {t.initials}
              </div>
              <div className="min-w-0">
                <div className="font-bold text-xs sm:text-sm text-gray-900 truncate">
                  {t.name}
                </div>
                <div className="text-[10px] sm:text-xs text-gray-500 font-semibold truncate">
                  {t.role}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
