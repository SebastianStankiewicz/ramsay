import React from 'react';
import { OnboardingLayout } from './OnboardingLayout';

interface OnboardingStep2Props {
  onNext: () => void;
}

export function OnboardingStep2({ onNext }: OnboardingStep2Props) {
  return (
    <OnboardingLayout
      title="Welcome!"
      subtitle="Let's get you set up"
      buttonText="Continue"
      onButtonClick={onNext}
    />
  );
}