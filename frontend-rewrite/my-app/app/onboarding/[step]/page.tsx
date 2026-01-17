"use client";

import { OnboardingStep1 } from '@/app/components/onboarding/OnboardingStep1';
import { OnboardingStep2 } from '@/app/components/onboarding/OnboardingStep2';
import { OnboardingStep3 } from '@/app/components/onboarding/OnboardingStep3';
import { useParams, useRouter } from 'next/navigation';

export default function OnboardingPage() {
  const params = useParams();
  const router = useRouter();
  const step = parseInt(params.step as string);

  const goToNextStep = () => {
    router.push(`/onboarding/${step + 1}`);
  };

  const completeFinalStep = () => {
    localStorage.setItem('onboardingComplete', 'true');
    router.push('/dashboard');
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return <OnboardingStep1 onNext={goToNextStep} />;
      case 2:
        return <OnboardingStep2 onNext={goToNextStep} />;
      case 3:
        return <OnboardingStep3 onComplete={completeFinalStep} />;
      default:
        return <OnboardingStep1 onNext={goToNextStep} />;
    }
  };

  return renderStep();
}