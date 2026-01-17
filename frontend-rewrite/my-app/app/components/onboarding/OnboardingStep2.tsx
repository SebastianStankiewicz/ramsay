import React from 'react';
import { OnboardingLayout } from './OnboardingLayout';

interface OnboardingStep2Props {
  onNext: () => void;
}

const sendCreateAccountRequest = async (onNext: () => void) => {
  try {
    const response = await fetch("/api/account", {  // note no trailing slash
      method: "POST",
      headers: { "Content-Type": "application/json" },
    });
    const data = await response.json();
    if (response.ok){
      console.log("Account created successfully:", data);
      onNext(); // call your onNext callback
    } else {
      console.error("Failed:", data);
    }

  } catch (error) {
    console.error("Error creating account:", error);
  }
};


export function OnboardingStep2({ onNext }: OnboardingStep2Props) {
  return (
    <OnboardingLayout
      title="Welcome!"
      subtitle="Let's get you set up"
      buttonText="Create Account"
      onButtonClick={() => sendCreateAccountRequest(onNext)}
    />
  );
}