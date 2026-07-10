"use client";

import React, { useState, Suspense } from "react";
import { TopBar } from "../../components/TopBar";
import { Header } from "../../components/Header";
import { Footer } from "../../components/Footer";
import { MapPin, Phone, Mail, User, Send, Check } from "lucide-react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.email && formData.message) {
      setSubmitted(true);
      setFormData({ name: "", email: "", subject: "", message: "" });
      setTimeout(() => setSubmitted(false), 5000);
    }
  };

  return (
    <div className="bg-gray-50 text-gray-900 min-h-screen flex flex-col">
      <TopBar />
      <Suspense fallback={<div className="h-20 bg-white border-b border-gray-150 animate-pulse" />}>
        <Header />
      </Suspense>

      <main className="flex-grow max-w-7xl w-full mx-auto px-4 py-12">
        {/* Page Title Header */}
        <div className="mb-10 text-left border-l-4 border-yellow-500 pl-4">
          <h1 className="text-3xl font-extrabold text-blue-950">Contact Us</h1>
          <p className="text-sm text-gray-500 mt-1">Get in touch with CircuitHub for inquiries, orders, and technical support.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Contact Details Card (Left Column) */}
          <div className="lg:col-span-5 bg-white border border-gray-150 rounded-2xl p-6 shadow-sm space-y-6">
            <h2 className="text-xl font-bold text-blue-950 border-b border-gray-100 pb-3">Corporate Office</h2>
            
            <div className="space-y-4">
              {/* Company & Name */}
              <div className="flex items-start gap-4">
                <div className="bg-blue-900/10 p-2.5 rounded-lg text-blue-900 mt-0.5">
                  <User size={20} />
                </div>
                <div>
                  <h3 className="font-extrabold text-sm text-gray-900">Registered Corporate Entity</h3>
                  <p className="text-sm text-gray-600 mt-0.5">Arul Technologies</p>
                  <p className="text-xs text-gray-500 mt-0.5 font-medium">Contact Person: Dhananjay Singh Thakur</p>
                </div>
              </div>

              {/* Address */}
              <div className="flex items-start gap-4">
                <div className="bg-blue-900/10 p-2.5 rounded-lg text-blue-900 mt-0.5">
                  <MapPin size={20} />
                </div>
                <div>
                  <h3 className="font-extrabold text-sm text-gray-900">Registered Office</h3>
                  <p className="text-sm text-gray-600 mt-0.5 leading-relaxed">
                    604/14, Highland Residency, Yashswi Nagar,<br />
                    Kolsheth Rd, Thane (W) - 400607,<br />
                    Maharashtra, India
                  </p>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-start gap-4">
                <div className="bg-blue-900/10 p-2.5 rounded-lg text-blue-900 mt-0.5">
                  <Phone size={20} />
                </div>
                <div>
                  <h3 className="font-extrabold text-sm text-gray-900">Phone Support</h3>
                  <a href="tel:+919004696834" className="text-sm text-blue-900 hover:text-blue-800 hover:underline mt-0.5 block font-semibold">
                    +91 90046 96834
                  </a>
                  <p className="text-xs text-gray-400 mt-0.5">Mon - Sat: 10:00 AM - 6:00 PM IST</p>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-4">
                <div className="bg-blue-900/10 p-2.5 rounded-lg text-blue-900 mt-0.5">
                  <Mail size={20} />
                </div>
                <div>
                  <h3 className="font-extrabold text-sm text-gray-900">Email Address</h3>
                  <a href="mailto:aruldst@gmail.com" className="text-sm text-blue-900 hover:text-blue-800 hover:underline mt-0.5 block font-semibold">
                    aruldst@gmail.com
                  </a>
                  <p className="text-xs text-gray-400 mt-0.5">We reply within 24 hours</p>
                </div>
              </div>
            </div>

            {/* Extra Info */}
            <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-xl p-4 text-xs text-gray-700 leading-relaxed">
              <strong>Need custom quotation?</strong> Send your Bill of Materials (BOM) list to our email, and our sales team will draft a corporate bulk pricing invoice for you.
            </div>
          </div>

          {/* Contact Form (Right Column) */}
          <div className="lg:col-span-7 bg-white border border-gray-150 rounded-2xl p-6 shadow-sm">
            <h2 className="text-xl font-bold text-blue-950 border-b border-gray-100 pb-3 mb-6">Send us a Message</h2>

            {submitted ? (
              <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl p-6 flex flex-col items-center text-center gap-3 animate-scale-up">
                <div className="bg-emerald-100 text-emerald-600 p-3 rounded-full">
                  <Check size={28} className="stroke-[3]" />
                </div>
                <h3 className="font-extrabold text-lg">Thank You!</h3>
                <p className="text-sm text-emerald-700 max-w-md">
                  Your message has been sent successfully. Dhananjay and our support team will get back to you shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label htmlFor="name" className="text-xs font-bold text-gray-700">Full Name *</label>
                    <input
                      type="text"
                      id="name"
                      required
                      placeholder="e.g. John Doe"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-gray-50 border border-gray-250 focus:border-yellow-500 focus:bg-white rounded-lg px-4 py-2.5 text-sm focus:outline-none transition-all"
                    />
                  </div>
                  <div className="space-y-1">
                    <label htmlFor="email" className="text-xs font-bold text-gray-700">Email Address *</label>
                    <input
                      type="email"
                      id="email"
                      required
                      placeholder="e.g. john@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-gray-50 border border-gray-250 focus:border-yellow-500 focus:bg-white rounded-lg px-4 py-2.5 text-sm focus:outline-none transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label htmlFor="subject" className="text-xs font-bold text-gray-700">Subject</label>
                  <input
                    type="text"
                    id="subject"
                    placeholder="e.g. Bulk Order Inquiry / Product support"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full bg-gray-50 border border-gray-250 focus:border-yellow-500 focus:bg-white rounded-lg px-4 py-2.5 text-sm focus:outline-none transition-all"
                  />
                </div>

                <div className="space-y-1">
                  <label htmlFor="message" className="text-xs font-bold text-gray-700">Message *</label>
                  <textarea
                    id="message"
                    required
                    rows={5}
                    placeholder="Describe your inquiry or order details..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full bg-gray-50 border border-gray-250 focus:border-yellow-500 focus:bg-white rounded-lg px-4 py-2.5 text-sm focus:outline-none transition-all resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="bg-yellow-500 hover:bg-yellow-600 active:bg-yellow-700 text-blue-950 font-extrabold px-6 py-3 rounded-lg text-sm transition-all shadow-sm hover:shadow flex items-center justify-center gap-2 cursor-pointer w-full sm:w-auto ml-auto"
                >
                  Send Message
                  <Send size={14} />
                </button>
              </form>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
