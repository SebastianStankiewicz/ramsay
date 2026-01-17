import React from 'react';
import { OnboardingLayout } from './OnboardingLayout';
import { Wallet, Coins, Layers } from 'lucide-react';

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
      title=""
      subtitle=""
      buttonText="Create Account"
      onButtonClick={() => sendCreateAccountRequest(onNext)}
      showBack={!!onBack}
      onBack={onBack}
    >
      <div className="flex flex-col w-full gap-8">
        {/* Hero headline - same size as prior page */}
        <div className="text-left w-full">
          <div className="font-archivo-black text-white text-[4.95rem] sm:text-[3.9rem] md:text-[4.9rem] leading-[0.8] tracking-tight">
            HOW IT<br />WORKS.
          </div>
        </div>

        {/* Steps: icons start centered, then move left and text appears */}
        <div className="flex flex-col w-full gap-0">
          {/* Step 1 */}
          <div className="flex gap-4 items-start w-full group animate-step-in step-1">
            <div className="step-icon-col flex flex-col items-center flex-shrink-0">
              <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center group-hover:bg-white/25 transition-colors duration-200">
                <Wallet className="w-6 h-6 text-white" strokeWidth={2} />
              </div>
              <div className="w-px h-8 bg-white/30 my-1" />
            </div>
            <div className="step-text flex-1 min-w-0 pb-6">
              <p className="text-white font-archivo-black text-lg mb-1">Ethereum wallet</p>
              <p className="text-white/70 text-sm font-normal">We create one for you. Your keys, your control.</p>
            </div>
          </div>

          {/* Step 2 */}
          <div className="flex gap-4 items-start w-full group animate-step-in step-2">
            <div className="step-icon-col flex flex-col items-center flex-shrink-0">
              <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center group-hover:bg-white/25 transition-colors duration-200">
                <Coins className="w-6 h-6 text-white" strokeWidth={2} />
              </div>
              <div className="w-px h-8 bg-white/30 my-1" />
            </div>
            <div className="step-text flex-1 min-w-0 pb-6">
              <p className="text-white font-archivo-black text-lg mb-1">Loaded with USDC</p>
              <p className="text-white/70 text-sm font-normal">Li.fi converts <span className="font-archivo-black text-white/90">ETH → HyperLiquid</span> for you.</p>
            </div>
          </div>

          {/* Step 3 */}
          <div className="flex gap-4 items-start w-full group animate-step-in step-3">
            <div className="step-icon-col flex flex-col items-center flex-shrink-0">
              <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center group-hover:bg-white/25 transition-colors duration-200">
                <Layers className="w-6 h-6 text-white" strokeWidth={2} />
              </div>
            </div>
            <div className="step-text flex-1 min-w-0">
              <p className="text-white font-archivo-black text-lg mb-1">Staked in a vault</p>
              <p className="text-white/70 text-sm font-normal">Your HyperLiquid ETH earns yield while you sleep.</p>
            </div>
          </div>
        </div>
      </div>
    </OnboardingLayout>
  );
}
