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
      <div className="relative z-10 text-center max-w-md animate-bounce-in">
        {/* Logo */}
        <div className="mb-12 relative">
          <div className="w-28 h-28 bg-white rounded-3xl flex items-center justify-center text-[#0075FF] text-6xl font-bold mx-auto shadow-2xl hover:scale-110 transition-transform duration-300 pulse-ring">
            R
          </div>
          {/* Floating particles */}
          <div className="absolute -top-2 -right-2 w-3 h-3 bg-white rounded-full opacity-60 animate-float" style={{ animationDelay: '0s' }} />
          <div className="absolute -bottom-2 -left-2 w-2 h-2 bg-white rounded-full opacity-60 animate-float" style={{ animationDelay: '1s' }} />
          <div className="absolute top-1/2 -right-4 w-2.5 h-2.5 bg-white rounded-full opacity-60 animate-float" style={{ animationDelay: '2s' }} />
        </div>

        {/* Title */}
        <h1 className="text-6xl font-bold text-white mb-4 tracking-tight animate-fade-in-delay font-balgin">
          Ramsay
        </h1>
        <p className="text-white/90 text-xl font-medium mb-12 animate-fade-in-delay-2 leading-relaxed px-4">
          <strong>Money that works harder</strong> — because your savings deserve to grow while you sleep. <strong>No hassle, just results.</strong>
        </p>

        {/* Features */}
        <div className="space-y-4 mb-16 animate-fade-in-delay-2">
          <div className="flex items-center gap-4 bg-white/20 backdrop-blur-xl rounded-2xl p-5 text-white border border-white/30 card-hover">
            <div className="w-12 h-12 bg-white/30 rounded-xl flex items-center justify-center backdrop-blur-sm">
              <Zap className="w-6 h-6" />
            </div>
            <div className="flex-1 text-left">
              <p className="font-semibold text-lg"><strong>Instant transfers</strong></p>
              <p className="text-white/70 text-sm">Move your money <strong>instantly</strong>, anywhere in the world</p>
            </div>
          </div>
          <div className="flex items-center gap-4 bg-white/20 backdrop-blur-xl rounded-2xl p-5 text-white border border-white/30 card-hover">
            <div className="w-12 h-12 bg-white/30 rounded-xl flex items-center justify-center backdrop-blur-sm">
              <Shield className="w-6 h-6" />
            </div>
            <div className="flex-1 text-left">
              <p className="font-semibold text-lg"><strong>Powered by Hyperliquid</strong></p>
              <p className="text-white/70 text-sm">Built on <strong>secure</strong> DeFi infrastructure you can trust</p>
            </div>
          </div>
          <div className="flex items-center gap-4 bg-white/20 backdrop-blur-xl rounded-2xl p-5 text-white border border-white/30 card-hover">
            <div className="w-12 h-12 bg-white/30 rounded-xl flex items-center justify-center backdrop-blur-sm">
              <Sparkles className="w-6 h-6" />
            </div>
            <div className="flex-1 text-left">
              <p className="font-semibold text-lg"><strong>High yields</strong></p>
              <p className="text-white/70 text-sm">Earn <strong>competitive APY</strong> on your savings — watch them grow</p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Button */}
      <div className="absolute bottom-8 left-6 right-6 animate-fade-in-delay-3">
        <button
          onClick={handleGetStarted}
          className="w-full bg-white text-[#0075FF] py-5 rounded-2xl font-semibold text-lg flex items-center justify-center gap-3 shadow-2xl hover:shadow-3xl hover:scale-[1.02] transition-all duration-200 active:scale-[0.98] ripple"
        >
          <span>Let's get started</span>
          <ArrowRight className="w-6 h-6" strokeWidth={2.5} />
        </button>
      </div>
    </div>
  );
}
