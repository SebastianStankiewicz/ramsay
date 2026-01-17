import React from 'react';
import { OnboardingLayout } from './OnboardingLayout';
import Image from 'next/image';

interface OnboardingStep1Props {
  onNext: () => void;
}

export function OnboardingStep1({ onNext }: OnboardingStep1Props) {
  return (
    <OnboardingLayout
      title=""
      subtitle=""
      buttonText="Get Started"
      onButtonClick={onNext}
    >
      <div className="flex flex-col items-center justify-center w-full gap-8">
        <div className="text-left w-full">
          <div className="font-archivo-black text-white text-[4.95rem] sm:text-[3.9rem] md:text-[4.9rem] leading-[0.8] tracking-tight">
            EARN IN<br />YOUR<br />SLEEP.
          </div>
          <p className="text-white/80 text-[1.3rem] font-light mt-3">we are not kidding...</p>
        </div>
        <div className="relative w-full max-w-lg aspect-square animate-float">
          <Image
            src="/assets/cash.png"
            alt="Ramsay"
            fill
            className="object-contain"
            priority
          />
        </div>
      </div>
    </OnboardingLayout>
  );
}