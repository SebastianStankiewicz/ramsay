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
      title="You're all set!"
      subtitle="Ready to get started?"
      buttonText="Go to Dashboard"
      onButtonClick={onComplete}
      showBack={!!onBack}
      onBack={onBack}
    >
      <div className="flex flex-col items-center gap-4">
        <div className="w-20 h-20 bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center animate-scale-in">
          <CheckCircle2 className="w-10 h-10 text-white" />
        </div>
        <div className="flex items-center gap-3 bg-white/20 backdrop-blur-xl rounded-2xl p-5 text-white border border-white/30 w-full">
          <Sparkles className="w-6 h-6" />
          <div className="text-left">
            <p className="font-semibold">Start Earning</p>
            <p className="text-white/70 text-sm">Deposit and watch your money grow</p>
          </div>
        </div>
      </div>
    </OnboardingLayout>
  );
}
