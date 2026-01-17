"use client";

import { useRouter } from 'next/navigation';
import { ArrowRight, Zap, Shield, Sparkles } from 'lucide-react';

export default function WelcomePage() {
  const router = useRouter();

  const handleGetStarted = () => {
    router.push('/deposit');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0075FF] via-[#00A8FF] to-[#00D4FF] flex flex-col items-center justify-center px-6 relative overflow-hidden">
      {/* Animated Background Pattern */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 right-20 w-96 h-96 bg-white rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-white rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-white rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-md animate-bounce-in flex flex-col items-start">
        {/* Logo */}
        <div className="mb-8 relative animate-float">
          <div className="w-24 h-24 bg-white rounded-2xl flex items-center justify-center text-[#0075FF] text-5xl font-archivo-black shadow-2xl">
            R
          </div>
        </div>

        {/* Title */}
        <h1 className="text-5xl font-archivo-black text-white mb-6 tracking-tight text-left">
          Ramsay
        </h1>

        <div className="text-left w-full mb-2">
          <div className="font-archivo-black text-white text-[4.95rem] sm:text-[3.9rem] md:text-[4.9rem] leading-[0.8] tracking-tight">
            MONEY THAT<br />WORKS<br />HARDER.
          </div>
          <p className="text-white/80 text-[1.3rem] font-light mt-3">Because your Ramsay deserve to grow while you sleep. No hassle, just results.</p>
        </div>

        {/* Features */}
        <div className="space-y-3 mb-16 w-full mt-8">
          <div className="flex items-center gap-3 bg-white/10 rounded-xl p-4 text-white">
            <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center">
              <Zap className="w-5 h-5" />
            </div>
            <div className="flex-1 text-left">
              <p className="font-archivo-black text-sm mb-0.5">Instant transfers</p>
              <p className="text-white/60 text-xs font-normal">Move your money instantly, anywhere in the world</p>
            </div>
          </div>
          <div className="flex items-center gap-3 bg-white/10 rounded-xl p-4 text-white">
            <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center">
              <Shield className="w-5 h-5" />
            </div>
            <div className="flex-1 text-left">
              <p className="font-archivo-black text-sm mb-0.5">Powered by Hyperliquid</p>
              <p className="text-white/60 text-xs font-normal">Built on secure DeFi infrastructure you can trust</p>
            </div>
          </div>
          <div className="flex items-center gap-3 bg-white/10 rounded-xl p-4 text-white">
            <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center">
              <Sparkles className="w-5 h-5" />
            </div>
            <div className="flex-1 text-left">
              <p className="font-archivo-black text-sm mb-0.5">High yields</p>
              <p className="text-white/60 text-xs font-normal">Earn competitive APY on your Ramsay — watch them grow</p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Button */}
      <div className="absolute bottom-8 left-6 right-6">
        <button
          onClick={handleGetStarted}
          className="w-full max-w-md mx-auto bg-white text-[#0075FF] py-4 rounded-lg font-semibold text-base flex items-center justify-center gap-2 hover:bg-gray-50 active:bg-gray-100 transition-colors duration-150"
        >
          <span>Let's get started</span>
          <ArrowRight className="w-5 h-5" strokeWidth={2.5} />
        </button>
      </div>
    </div>
  );
}
