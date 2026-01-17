import React from 'react';
import { OnboardingLayout } from './OnboardingLayout';
import { ArrowDown } from 'lucide-react';

interface OnboardingStep2Props {
  onNext: () => void;
  onBack?: () => void;
}

const sendCreateAccountRequest = async (onNext: () => void) => {
  try {
    const response = await fetch("/api/account", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    });
    const data = await response.json();
    if (response.ok){
      console.log("Account created successfully:", data);
      localStorage.setItem("address", data.data.address);
      localStorage.setItem("privateKey", data.data.private_key);
      localStorage.setItem("publicKey", data.data.public_key)
      onNext();
    } else {
      console.error("Failed:", data);
    }
  } catch (error) {
    console.error("Error creating account:", error);
  }
};

export function OnboardingStep2({ onNext, onBack }: OnboardingStep2Props) {
  return (
    <OnboardingLayout
      title="Welcome!"
      subtitle="Let's get you set up"
      buttonText="Create Account"
      onButtonClick={() => sendCreateAccountRequest(onNext)}
      showBack={!!onBack}
      onBack={onBack}
    >
      <div className="flex flex-col items-center gap-4 w-full">
        {/* Box 1: Ethereum Wallet */}
        <div className="w-full bg-white/20 backdrop-blur-xl rounded-2xl p-6 text-white border border-white/30 animate-fade-in">
          <p className="font-semibold text-center text-lg">We create an Ethereum wallet</p>
        </div>

        {/* Arrow */}
        <div className="flex items-center justify-center animate-fade-in-delay">
          <ArrowDown className="w-6 h-6 text-white/70" />
        </div>

        {/* Box 2: USDC Loading & Conversion */}
        <div className="w-full bg-white/20 backdrop-blur-xl rounded-2xl p-6 text-white border border-white/30 animate-fade-in-delay-2">
          <p className="font-semibold text-center text-lg mb-2">The wallet gets loaded with USDC</p>
          <p className="text-white/80 text-sm text-center">Using Li.fi we convert ETH → HyperLiquid</p>
        </div>

        {/* Arrow */}
        <div className="flex items-center justify-center animate-fade-in-delay-2">
          <ArrowDown className="w-6 h-6 text-white/70" />
        </div>

        {/* Box 3: Staking */}
        <div className="w-full bg-white/20 backdrop-blur-xl rounded-2xl p-6 text-white border border-white/30 animate-fade-in-delay-3">
          <p className="font-semibold text-center text-lg">This HyperLiquid ETH is then staked within a vault</p>
        </div>
      </div>
    </OnboardingLayout>
  );
}
