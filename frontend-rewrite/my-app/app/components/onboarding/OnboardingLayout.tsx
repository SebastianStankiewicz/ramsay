import React from 'react';

interface OnboardingLayoutProps {
  title: string;
  subtitle: string;
  buttonText: string;
  onButtonClick: () => void;
  children?: React.ReactNode;
  showBack?: boolean;
  onBack?: () => void;
}

export function OnboardingLayout({
  title,
  subtitle,
  buttonText,
  onButtonClick,
  children,
  showBack,
  onBack
}: OnboardingLayoutProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0075FF] via-[#00A8FF] to-[#00D4FF] flex flex-col justify-between items-center px-6 py-10 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 right-20 w-64 h-64 bg-white rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 left-20 w-64 h-64 bg-white rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }} />
      </div>

      {/* Back Button */}
      {showBack && onBack && (
        <button
          onClick={onBack}
          className="absolute top-6 left-6 z-10 p-2 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-colors"
        >
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
      )}

      {/* Top Content */}
      <div className="flex flex-col items-center gap-6 mt-20 text-center relative z-10 animate-bounce-in">
        <div className="text-6xl font-bold text-white tracking-tight">
          {title}
        </div>
        <div className="text-xl text-white/90 max-w-xs font-medium">
          {subtitle}
        </div>
        {children && <div className="mt-6 w-full max-w-md animate-fade-in-delay">{children}</div>}
      </div>

      {/* Bottom Button */}
      <div className="w-full max-w-sm mb-20 relative z-10 animate-fade-in-delay-2">
        <button 
          onClick={onButtonClick}
          className="w-full py-5 bg-white text-[#0075FF] rounded-2xl text-lg font-semibold shadow-2xl hover:shadow-3xl hover:scale-[1.02] transition-all duration-200 active:scale-[0.98] ripple"
        >
          {buttonText}
        </button>
      </div>
    </div>
  );
}
