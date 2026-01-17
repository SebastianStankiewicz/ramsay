import React from 'react';
import { OnboardingLayout } from './OnboardingLayout';
import { CheckCircle2, Sparkles } from 'lucide-react';

interface OnboardingStep3Props {
  onComplete: () => void;
  onBack?: () => void;
}

export function OnboardingStep3({ onComplete, onBack }: OnboardingStep3Props) {
  return (
    <OnboardingLayout
      title=""
      subtitle=""
      buttonText="Go to Dashboard"
      onButtonClick={onComplete}
      showBack={!!onBack}
      onBack={onBack}
    >
      <div className="flex flex-col w-full gap-8">
        {/* Hero headline - same size as step 1 & 2 */}
        <div className="text-left w-full">
          <div className="font-archivo-black text-white text-[4.95rem] sm:text-[3.9rem] md:text-[4.9rem] leading-[0.8] tracking-tight">
            YOU'RE ALL<br />SET.
          </div>
          <p className="text-white/80 text-[1.3rem] font-light mt-3">Ready to get started?</p>
        </div>
      </div>
    </OnboardingLayout>
  );
}
