import React from 'react';

interface OnboardingLayoutProps {
  title: string;
  subtitle: string;
  buttonText: string;
  onButtonClick: () => void;
  children?: React.ReactNode;
}

export function OnboardingLayout({
  title,
  subtitle,
  buttonText,
  onButtonClick,
  children
}: OnboardingLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col justify-between items-center px-6 py-10">
      {/* Top Content */}
      <div className="flex flex-col items-center gap-4 mt-20 text-center">
        <div className="text-5xl sm:text-6xl font-bold tracking-tight">
          {title}
        </div>
        <div className="text-lg sm:text-2xl max-w-xs">
          {subtitle}
        </div>
        {children && <div className="mt-6 w-full max-w-md">{children}</div>}
      </div>

      {/* Bottom Button */}
      <div className="w-full max-w-sm mb-20">
        <button 
          onClick={onButtonClick}
          className="w-full py-4 bg-black rounded-xl text-lg font-medium border border-current transition active:scale-95 text-white hover:bg-gray-800"
        >
          {buttonText}
        </button>
      </div>
    </div>
  );
}