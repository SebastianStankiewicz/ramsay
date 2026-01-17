"use client";

import { useState, useEffect } from "react";
import { ArrowLeft, Sparkles, CheckCircle2 } from "lucide-react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import SuccessAnimation from "@/app/components/SuccessAnimation";
import ApplePayModal from "@/app/components/ApplePayModal";
import { animateNumber } from "@/app/utils/animateNumber";

type Vault = {
  address: string;
  name: string;
  apr: number;
  tvl: number;
};

export default function DepositPage() {
  const router = useRouter();
  const [amount, setAmount] = useState<number>(100);
  const [vault, setVault] = useState<Vault | null>(null);
  const [isDepositing, setIsDepositing] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showApplePay, setShowApplePay] = useState(false);
  const [animatedAmount, setAnimatedAmount] = useState(100);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const MIN_DEPOSIT = 100;
  const quickAmounts = [100, 250, 500, 750, 1000];

  useEffect(() => {
    // Fetch vault data to get the actual vault address and APR
    const getVaultData = async () => {
      try {
        const response = await fetch("/api/vault", {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });
        const result = await response.json();
        if (response.ok && result.status === "ok" && result.data && result.data.length > 0) {
          setVault(result.data[0]);
        } else {
          console.error("Vault API error:", result.message || "Unknown error");
        }
      } catch (error) {
        console.error("Error fetching vault:", error);
      }
    };
    getVaultData();
  }, []);

  // Animate amount changes
  useEffect(() => {
    animateNumber(animatedAmount, amount, 400, setAnimatedAmount);
  }, [amount]);

  const handleApplePaySuccess = async () => {
    if (amount < MIN_DEPOSIT || !vault) return;
    
    setIsDepositing(true);
    setErrorMessage("");
    try {
      const userAddress = localStorage.getItem("address");
      const privateKey = localStorage.getItem("privateKey");
      
      if (!userAddress || !privateKey) {
        console.error("Missing user credentials");
        setIsDepositing(false);
        return;
      }

      const response = await fetch("/api/deposit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userAddress: userAddress,
          privateKey: privateKey,
          vaultAddress: vault.address,
          amount: amount,
        }),
      });

      const result = await response.json();
      if (response.ok) {
        setShowSuccess(true);
        setTimeout(() => {
          router.push('/dashboard');
        }, 2500);
      } else {
        console.error("Deposit failed:", result);
        setErrorMessage(result.message || "Deposit failed. Please try again.");
        setIsDepositing(false);
      }
    } catch (error) {
      console.error("Error depositing to vault:", error);
      setErrorMessage("An error occurred. Please try again.");
      setIsDepositing(false);
    }
  };

  const handleContinueClick = () => {
    if (amount < MIN_DEPOSIT) {
      setErrorMessage(`Minimum deposit is $${MIN_DEPOSIT}`);
      return;
    }
    if (!vault) return;
    setErrorMessage("");
    setShowApplePay(true);
  };

  const handleAmountChange = (newAmount: number) => {
    if (newAmount < MIN_DEPOSIT) {
      setAmount(MIN_DEPOSIT);
      setErrorMessage(`Minimum deposit is $${MIN_DEPOSIT}`);
    } else {
      setAmount(newAmount);
      setErrorMessage("");
    }
  };

  return (
    <>
      <main className="min-h-screen bg-[#F5F7FA] flex flex-col">
        {/* Header */}
        <header className="flex items-center px-6 pt-12 pb-6 bg-white/80 backdrop-blur-xl sticky top-0 z-10 border-b border-[#E8ECF1]/50">
          <button
            onClick={() => router.push('/dashboard')}
            className="p-2 -ml-2 hover:bg-[#F5F7FA] rounded-full transition-all duration-200 active:scale-95"
          >
            <ArrowLeft className="w-6 h-6 text-[#0A2540]" />
          </button>
        </header>

        <div className="flex-1 flex flex-col justify-center px-6 py-8">
          {/* Amount Display */}
          <div className="text-center mb-12 animate-bounce-in">
            <div className="mb-4">
              <span className="text-8xl font-archivo-black text-[#0A2540] tabular-nums">
                ${Math.round(animatedAmount)}
              </span>
            </div>
            {vault && (
              <div className="flex items-center justify-center gap-2 text-[#6B7C93] text-sm font-medium">
                <Sparkles className="w-4 h-4 text-[#0075FF]" />
                <span>
                  Current APR: <span className="text-[#0A2540] font-semibold">{(vault.apr * 100).toFixed(2)}%</span>
                </span>
              </div>
            )}
          </div>

          {/* Error Message */}
          {errorMessage && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm text-center animate-fade-in">
              {errorMessage}
            </div>
          )}

          {/* Slider */}
          <div className="mb-8 animate-fade-in-delay">
            <div className="flex justify-between text-xs text-[#6B7C93] mb-2">
              <span>Min: ${MIN_DEPOSIT}</span>
              <span>Max: $5000</span>
            </div>
            <input
              type="range"
              min={MIN_DEPOSIT}
              max="5000"
              step="1"
              value={amount}
              onChange={(e) => handleAmountChange(Number(e.target.value))}
              className="w-full h-2 bg-[#E8ECF1] rounded-full appearance-none cursor-pointer
                [&::-webkit-slider-thumb]:appearance-none 
                [&::-webkit-slider-thumb]:w-7 
                [&::-webkit-slider-thumb]:h-7 
                [&::-webkit-slider-thumb]:rounded-full 
                [&::-webkit-slider-thumb]:bg-gradient-to-r 
                [&::-webkit-slider-thumb]:from-[#0075FF] 
                [&::-webkit-slider-thumb]:to-[#00D4FF]
                [&::-webkit-slider-thumb]:cursor-pointer 
                [&::-webkit-slider-thumb]:shadow-xl
                [&::-webkit-slider-thumb]:border-3
                [&::-webkit-slider-thumb]:border-white
                [&::-webkit-slider-thumb]:transition-all
                [&::-webkit-slider-thumb]:hover:scale-125
                [&::-moz-range-thumb]:w-7 
                [&::-moz-range-thumb]:h-7 
                [&::-moz-range-thumb]:rounded-full 
                [&::-moz-range-thumb]:bg-gradient-to-r 
                [&::-moz-range-thumb]:from-[#0075FF] 
                [&::-moz-range-thumb]:to-[#00D4FF]
                [&::-moz-range-thumb]:border-3
                [&::-moz-range-thumb]:border-white
                [&::-moz-range-thumb]:cursor-pointer
                [&::-moz-range-thumb]:shadow-xl"
              style={{
                background: `linear-gradient(to right, #0075FF 0%, #00D4FF ${((amount - MIN_DEPOSIT) / (5000 - MIN_DEPOSIT)) * 100}%, #E8ECF1 ${((amount - MIN_DEPOSIT) / (5000 - MIN_DEPOSIT)) * 100}%, #E8ECF1 100%)`
              }}
            />
          </div>

          {/* Quick Amounts */}
          <div className="grid grid-cols-5 gap-2 mb-8 animate-fade-in-delay-2">
            {quickAmounts.map((value) => (
              <button
                key={value}
                onClick={() => handleAmountChange(value)}
                className={`py-3 rounded-xl font-semibold text-sm transition-all duration-200 active:scale-95 ${
                  amount === value
                    ? 'bg-gradient-to-r from-[#0075FF] to-[#00D4FF] text-white shadow-lg scale-105'
                    : 'bg-white text-[#0A2540] border border-[#E8ECF1] hover:border-[#0075FF] hover:scale-105 card-hover'
                }`}
              >
                ${value}
              </button>
            ))}
          </div>
        </div>

        {/* Bottom Button */}
        <div className="px-6 pb-8 pt-4 bg-white/80 backdrop-blur-xl border-t border-[#E8ECF1]/50 sticky bottom-0">
          <button
            onClick={handleContinueClick}
            disabled={amount < MIN_DEPOSIT || isDepositing || !vault}
            className="w-full bg-black text-white py-4 rounded-2xl font-semibold text-base shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-200 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-2 ripple"
          >
            <Image
              src="https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg"
              alt="Apple"
              width={1}
              height={2}
              className="w-[18px] h-auto brightness-0 invert"
            />
            <span>Pay</span>
          </button>
        </div>
      </main>

      {showApplePay && (
        <ApplePayModal
          isOpen={showApplePay}
          amount={amount}
          onClose={() => setShowApplePay(false)}
          onSuccess={handleApplePaySuccess}
        />
      )}

      {showSuccess && (
        <SuccessAnimation
          message="Deposit Successful!"
          onComplete={() => setShowSuccess(false)}
        />
      )}
    </>
  );
}
