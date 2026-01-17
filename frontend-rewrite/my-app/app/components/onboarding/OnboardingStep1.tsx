import React from 'react';
import { OnboardingLayout } from './OnboardingLayout';

interface OnboardingStep1Props {
  onNext: () => void;
}

export function OnboardingStep1({ onNext }: OnboardingStep1Props) {


  return (
    <OnboardingLayout
      title="RAMSAY"
      subtitle="It's basically free money"
      buttonText="Get Started"
      onButtonClick={onNext}
    />
  );
}