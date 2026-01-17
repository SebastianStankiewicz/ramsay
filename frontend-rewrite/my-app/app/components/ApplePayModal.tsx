"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";
import Image from "next/image";

interface ApplePayModalProps {
  isOpen: boolean;
  amount: number;
  onClose: () => void;
  onSuccess: () => void;
}

export default function ApplePayModal({ isOpen, amount, onSuccess, onClose }: ApplePayModalProps) {
  const [step, setStep] = useState<'authenticate' | 'processing'>('authenticate');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setStep('authenticate');
      setIsAuthenticated(false);
    }
  }, [isOpen]);

  const handleAuthenticate = () => {
    setIsAuthenticated(true);
    setTimeout(() => {
      setStep('processing');
      setTimeout(() => {
        onSuccess();
        onClose();
      }, 2000);
    }, 500);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-3xl w-full max-w-sm mx-4 shadow-2xl overflow-hidden animate-scale-in relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center bg-[#F5F7FA] rounded-full hover:bg-[#E8ECF1] transition-colors z-10"
        >
          <X className="w-4 h-4 text-[#0A2540]" />
        </button>

        {/* Content */}
        <div className="p-6 pt-8">
          {step === 'authenticate' && (
            <div className="space-y-6 animate-fade-in">
              <div className="text-center">
                <div className="flex items-center justify-center gap-2 mb-4">
                  <Image
                    src="https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg"
                    alt="Apple"
                    width={24}
                    height={30}
                    className="w-6 h-auto"
                  />
                  <span className="text-lg font-semibold text-[#0A2540]">Pay</span>
                </div>
                <p className="text-[#6B7C93] text-sm mb-2">Amount</p>
                <p className="text-4xl font-bold text-[#0A2540]">${amount.toFixed(2)}</p>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between p-4 bg-[#F5F7FA] rounded-xl">
                  <div>
                    <p className="text-sm font-semibold text-[#0A2540]">Card ending in 1234</p>
                    <p className="text-xs text-[#6B7C93]">Expires 12/25</p>
                  </div>
                  <div className="w-12 h-8 bg-gradient-to-r from-[#0075FF] to-[#00D4FF] rounded flex items-center justify-center">
                    <span className="text-white text-xs font-bold">•••</span>
                  </div>
                </div>
              </div>

              <button
                onClick={handleAuthenticate}
                className="w-full bg-black text-white py-4 rounded-2xl font-semibold text-base flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transition-all duration-200 active:scale-[0.98]"
              >
                <Image
                  src="https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg"
                  alt="Apple"
                  width={20}
                  height={25}
                  className="w-5 h-auto brightness-0 invert"
                />
                Authenticate with Face ID
              </button>
            </div>
          )}

          {step === 'processing' && (
            <div className="space-y-6 animate-fade-in text-center">
              <div className="flex flex-col items-center justify-center py-8">
                <div className="w-16 h-16 border-4 border-[#0075FF] border-t-transparent rounded-full animate-spin mb-4" />
                <p className="text-lg font-semibold text-[#0A2540]">Processing payment...</p>
                <p className="text-sm text-[#6B7C93] mt-2">Please wait</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
