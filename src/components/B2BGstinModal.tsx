"use client";

import React, { useState } from "react";
import { X, CheckCircle, AlertCircle, Building, MapPin, Check } from "lucide-react";

interface B2BGstinModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const B2BGstinModal: React.FC<B2BGstinModalProps> = ({ isOpen, onClose }) => {
  const [gstin, setGstin] = useState("");
  const [result, setResult] = useState<{
    status: "success" | "error" | "idle";
    companyName?: string;
    address?: string;
    phone?: string;
    email?: string;
    message?: string;
  }>({ status: "idle" });

  const targetGstin = "27ACDPT2420Q2Z7";

  const handleValidate = (e: React.FormEvent) => {
    e.preventDefault();
    const formatted = gstin.trim().toUpperCase();

    if (!formatted) {
      setResult({
        status: "error",
        message: "Please enter a GSTIN number."
      });
      return;
    }

    if (formatted.length !== 15) {
      setResult({
        status: "error",
        message: "A valid GSTIN must be exactly 15 characters long."
      });
      return;
    }

    if (formatted === targetGstin) {
      setResult({
        status: "success",
        companyName: "Arul Technologies",
        address: "604/14, Highland Residency, Yashswi Nagar, kolsheth Rd, Thane (w)-400607",
        phone: "+91 9004696834",
        email: "aruldst@gmail.com",
        message: "Active GSTIN. Tax Credit Transfer Enabled (100% Eligible)."
      });
    } else {
      setResult({
        status: "error",
        message: `GSTIN "${formatted}" not found in current distribution registry. Try the demo code: ${targetGstin}`
      });
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl relative border border-gray-150 animate-scale-up">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 p-1.5 rounded-full hover:bg-gray-100 transition-colors"
          aria-label="Close modal"
        >
          <X size={18} />
        </button>

        {/* Modal Header */}
        <div className="bg-blue-950 text-white p-6">
          <div className="flex items-center gap-3">
            <Building className="text-yellow-500" size={24} />
            <div>
              <h2 className="font-bold text-lg">B2B GSTIN Identification Service</h2>
              <p className="text-xs text-slate-300">Validate commercial registrations to enable correct input tax credits</p>
            </div>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6">
          <form onSubmit={handleValidate} className="space-y-4">
            <div>
              <label htmlFor="modal-gstin-input" className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
                15-Character National GSTIN Number
              </label>
              <div className="flex flex-col sm:flex-row gap-2">
                <input
                  type="text"
                  id="modal-gstin-input"
                  placeholder="e.g. 27AAAAA1111A1Z1"
                  maxLength={15}
                  value={gstin}
                  onChange={(e) => setGstin(e.target.value)}
                  className="flex-grow bg-gray-50 border border-gray-300 rounded-lg px-3.5 py-2.5 text-sm font-mono uppercase focus:bg-white focus:border-blue-900 focus:outline-none"
                />
                <button
                  type="submit"
                  className="bg-blue-900 hover:bg-blue-950 transition-colors text-white font-bold px-6 py-2.5 rounded-lg text-sm whitespace-nowrap shadow-sm hover:shadow"
                >
                  Verify GSTIN
                </button>
              </div>
              <p className="text-[10px] text-gray-400 mt-2 font-mono">
                Structure: State Code (2-dig) + PAN (10-char) + Entity (1-char) + Z (Default) + Check Digit
              </p>
            </div>
          </form>

          {/* Validation Feedback */}
          {result.status !== "idle" && (
            <div
              className={`rounded-xl border p-5 space-y-3 transition-all animate-scale-up ${
                result.status === "success"
                  ? "bg-green-50/50 border-green-200 text-green-800"
                  : "bg-red-50/50 border-red-200 text-red-800"
              }`}
            >
              <div className="flex items-start gap-3">
                {result.status === "success" ? (
                  <CheckCircle className="text-green-600 flex-shrink-0 mt-0.5" size={18} />
                ) : (
                  <AlertCircle className="text-red-600 flex-shrink-0 mt-0.5" size={18} />
                )}
                <div className="flex-grow min-w-0">
                  <p className="font-bold text-sm">
                    {result.status === "success" ? "Verification Successful" : "Verification Failed"}
                  </p>
                  <p className="text-xs text-gray-600 mt-1 leading-relaxed">{result.message}</p>
                </div>
              </div>

              {result.status === "success" && (
                <div className="border-t border-green-200/50 pt-3 mt-3 grid grid-cols-1 gap-2.5 text-xs text-gray-700">
                  <div className="flex items-center gap-2">
                    <Building size={14} className="text-green-600" />
                    <span><strong>Company:</strong> {result.companyName}</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <MapPin size={14} className="text-green-600 mt-0.5 flex-shrink-0" />
                    <span><strong>Registered Address:</strong> {result.address}</span>
                  </div>
                  <div className="flex items-center gap-2 font-mono text-[10px]">
                    <Check size={12} className="text-green-600" />
                    <span>Active Status Check: Verified B2B Corporate Partner</span>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Helper details */}
          <div className="bg-gray-50 border border-gray-150 rounded-xl p-4 text-xs text-gray-500 leading-relaxed">
            <span className="font-bold text-gray-700 block mb-1">Demo Hint:</span>
            To see validation succeed, enter the approved registered company ID: <code className="bg-gray-200 px-1 py-0.5 rounded font-mono font-bold text-gray-800">{targetGstin}</code>.
          </div>
        </div>
      </div>
    </div>
  );
};
