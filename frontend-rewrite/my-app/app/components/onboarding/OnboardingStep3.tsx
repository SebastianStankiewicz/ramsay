import React from 'react';
import { OnboardingLayout } from './OnboardingLayout';

interface OnboardingStep3Props {
  onComplete: () => void;
}

export function OnboardingStep3({ onComplete }: OnboardingStep3Props) {
  return (
    <OnboardingLayout
      title="You're all set!"
      subtitle="Ready to get started?"
      buttonText="Go to Dashboard"
      onButtonClick={onComplete}
    />
  );
}