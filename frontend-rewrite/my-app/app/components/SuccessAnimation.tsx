"use client";

import { useEffect, useState } from "react";
import { Check } from "lucide-react";

interface SuccessAnimationProps {
  onComplete?: () => void;
  message?: string;
}

export default function SuccessAnimation({ onComplete, message = "Success!" }: SuccessAnimationProps) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(() => onComplete?.(), 300);
    }, 2000);

    return () => clearTimeout(timer);
  }, [onComplete]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-3xl p-8 shadow-2xl transform scale-100 animate-scale-in">
        <div className="flex flex-col items-center gap-4">
          <div className="w-20 h-20 bg-gradient-to-br from-[#00D9A5] to-[#00B894] rounded-full flex items-center justify-center animate-scale-in">
            <Check className="w-10 h-10 text-white" strokeWidth={3} />
          </div>
          <p className="text-xl font-bold text-[#0A2540]">{message}</p>
        </div>
      </div>
    </div>
  );
}
