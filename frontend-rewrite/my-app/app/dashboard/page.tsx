"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Settings, Plus, TrendingUp, ArrowUpRight } from "lucide-react";
import { formatCurrency } from "@/app/utils/formatCurrency";
import { SkeletonCard } from "@/app/components/SkeletonLoader";

type Vault = {
  address: string;
  name: string;
  leader: string;
  tvl: number;
  closed: boolean;
  apr: number;
  followerCount: number;
  leaderFraction: number;
};

export default function DashboardPage() {
  const [vault, setVault] = useState<Vault | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [userBalance, setUserBalance] = useState<number>(0); // This would come from user state API
  const router = useRouter();

  useEffect(() => {
    const getVaultData = async () => {
      try {
        const response = await fetch("/api/vault", {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });

        const result = await response.json();
        if (response.ok && result.status === "ok" && result.data && result.data.length > 0) {
          // Get the first vault (there's only one hardcoded in backend)
          setVault(result.data[0]);
        } else {
          // Handle error response from backend
          console.error("Vault API error:", result.message || "Unknown error");
        }
      } catch (error) {
        console.error("Error fetching vault:", error);
      } finally {
        setIsLoading(false);
      }
    };

    getVaultData();
  }, []);

  return (
    <main className="min-h-screen bg-[#F5F7FA] flex flex-col">
      {/* Header */}
      <header className="flex justify-between items-center px-6 pt-12 pb-6 bg-white/80 backdrop-blur-xl sticky top-0 z-20 border-b border-[#E8ECF1]/50">
        <h1 className="text-2xl font-bold text-[#0A2540]">Savings</h1>
        <button
          onClick={() => router.push('/settings')}
          className="p-2 hover:bg-[#F5F7FA] rounded-full transition-all duration-200 active:scale-95"
        >
          <Settings className="w-6 h-6 text-[#6B7C93]" />
        </button>
      </header>

      {/* Main Content */}
      <div className="flex-1 px-6 py-6 overflow-y-auto">
        {/* Vault Card */}
        <div className="relative mb-6">
          {isLoading ? (
            <SkeletonCard />
          ) : vault ? (
            <div className="bg-gradient-to-br from-[#0075FF] to-[#00D4FF] rounded-3xl p-6 shadow-2xl card-hover animate-bounce-in">
              {/* Card Header */}
              <div className="flex items-start justify-between mb-6 animate-slide-in-right">
                <div>
                  <h2 className="text-white/90 text-sm font-medium mb-2">
                    {vault.name || 'Vault'}
                  </h2>
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-bold text-white tabular-nums">
                      {formatCurrency(userBalance)}
                    </span>
                  </div>
                </div>
                <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full backdrop-blur-sm transition-all ${
                  vault.apr >= 0 ? 'bg-white/20 hover:bg-white/30' : 'bg-red-500/30'
                }`}>
                  <TrendingUp className={`w-4 h-4 transition-transform ${vault.apr >= 0 ? 'text-white' : 'text-red-200 rotate-180'}`} />
                  <span className={`text-sm font-bold ${vault.apr >= 0 ? 'text-white' : 'text-red-200'}`}>
                    {vault.apr >= 0 ? '+' : ''}{(vault.apr * 100).toFixed(2)}%
                  </span>
                </div>
              </div>

              {/* Piggybank Image */}
              <div className="relative h-60 mb-6 flex items-center justify-center">
                <div className="relative w-[250px] h-[250px] animate-float">
                  <Image
                    src="/assets/pig.png"
                    alt="Savings Vault"
                    fill
                    className="object-contain drop-shadow-2xl"
                    priority
                  />
                </div>
              </div>

              {/* Balance Label */}
              <div className="text-center animate-fade-in-delay">
                <p className="text-white/70 text-xs font-medium uppercase tracking-wider mb-1">Your Balance</p>
                <p className="text-white text-lg font-semibold tabular-nums">{formatCurrency(userBalance)}</p>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-3xl p-6 shadow-sm">
              <div className="text-center">
                <p className="text-[#6B7C93] mb-2">Unable to load vault data</p>
                <p className="text-[#6B7C93] text-sm">Please try again later</p>
              </div>
            </div>
          )}
        </div>

        {/* Stats Card */}
        {vault && (
          <div className="bg-white rounded-2xl p-5 mb-6 shadow-sm card-hover animate-slide-up">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[#6B7C93] text-sm font-medium">Total Locked Value</span>
                <span className="text-[#0A2540] text-lg font-bold tabular-nums">
                  {vault.tvl >= 1_000_000_000
                    ? `$${(vault.tvl / 1_000_000_000).toFixed(1)}B`
                    : vault.tvl >= 1_000_000
                    ? `$${(vault.tvl / 1_000_000).toFixed(1)}M`
                    : vault.tvl >= 1_000
                    ? `$${(vault.tvl / 1_000).toFixed(1)}K`
                    : `$${vault.tvl.toFixed(0)}`}
                </span>
              </div>
              <div className="h-px bg-gradient-to-r from-transparent via-[#E8ECF1] to-transparent" />
              <div className="flex items-center justify-between">
                <span className="text-[#6B7C93] text-sm font-medium">Your Holdings</span>
                <span className="text-[#0A2540] text-lg font-bold tabular-nums">{formatCurrency(userBalance)}</span>
              </div>
              {vault.followerCount > 0 && (
                <>
                  <div className="h-px bg-gradient-to-r from-transparent via-[#E8ECF1] to-transparent" />
                  <div className="flex items-center justify-between">
                    <span className="text-[#6B7C93] text-sm font-medium">Followers</span>
                    <span className="text-[#0A2540] text-sm font-semibold">{vault.followerCount}</span>
                  </div>
                </>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Bottom Action Buttons */}
      <div className="px-6 pb-8 pt-4 bg-white/80 backdrop-blur-xl border-t border-[#E8ECF1]/50 sticky bottom-0">
        <div className="flex gap-3">
          <button
            onClick={() => router.push('/deposit')}
            className="flex-1 bg-gradient-to-r from-[#0075FF] to-[#00D4FF] text-white py-4 rounded-2xl font-semibold text-base flex items-center justify-center gap-2 shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-200 active:scale-[0.98] ripple gradient-shimmer"
          >
            <Plus className="w-5 h-5" strokeWidth={2.5} />
            Deposit
          </button>
          <button className="flex-1 bg-white text-[#0A2540] py-4 rounded-2xl font-semibold text-base border-2 border-[#E8ECF1] hover:border-[#0075FF] hover:text-[#0075FF] transition-all duration-200 active:scale-[0.98] flex items-center justify-center gap-2 card-hover">
            <ArrowUpRight className="w-5 h-5" strokeWidth={2.5} />
            Withdraw
          </button>
        </div>
      </div>
    </main>
  );
}
