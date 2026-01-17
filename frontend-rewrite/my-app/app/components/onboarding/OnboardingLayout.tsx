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
    <div className="min-h-screen bg-gradient-to-br from-[#0075FF] via-[#00A8FF] to-[#00D4FF] flex flex-col justify-between items-center px-6 py-8 relative overflow-hidden">
      {/* Minimal Background */}
      <div className="absolute inset-0 opacity-3">
        <div className="absolute top-20 right-20 w-96 h-96 bg-white rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-white rounded-full blur-3xl" />
      </div>

      {/* Back Button */}
      {showBack && onBack && (
        <button
          onClick={onBack}
          className="absolute top-6 left-6 z-10 p-2 text-white/80 hover:text-white transition-colors"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
      )}

      {/* Content */}
      <div className="flex flex-col items-center gap-5 mt-20 text-center relative z-10 w-full max-w-md flex-1 justify-center">
        {title && (
          <h1 className="text-4xl font-archivo-black text-white tracking-tight">
            {title}
          </h1>
        )}
        {subtitle && (
          <p className="text-base text-white/80 max-w-xs font-normal">
            {subtitle}
          </p>
        )}
        {children && <div className="w-full">{children}</div>}
      </div>

      {/* Button */}
      <div className="w-full max-w-md mb-8 relative z-10">
        <button 
          onClick={onButtonClick}
          className="w-full py-3.5 bg-white text-[#0075FF] rounded-lg text-base font-semibold hover:bg-gray-50 active:bg-gray-100 transition-colors duration-150"
        >
          {buttonText}
        </button>
      </div>
    </div>
  );
}
