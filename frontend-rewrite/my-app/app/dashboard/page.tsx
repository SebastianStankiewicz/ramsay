"use client";
import React from "react";

import Image from "next/image";
import { Settings, Lightbulb } from "lucide-react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

function page() {
  const [tvl, setTvl] = useState();
  const [apr, setApr] = useState();

  useEffect(() => {
    const getVaultData = async () => {
      try {
        const response = await fetch("/api/vault", {
          // note no trailing slash
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });

        const d = await response.json();
        const data = d.data[0];
        console.log(data);
        if (response.ok) {
          console.log("VAULT fetched successfully:", data);
          setApr(data.apr);
          setTvl(data.tvl);
        } else {
          console.error("Failed:", data);
        }
      } catch (error) {
        console.error("Error fetching vault:", error);
      }
    };

    getVaultData();
  }, []);

  const router = useRouter();

  const navigateToDepositPage = () => router.push("/deposit");
  const navigateToSettings = () => router.push("/settings");
  const navigateToHelp = () => router.push("/help");
  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 text-black p-6 flex flex-col font-sans">
      {/* Header */}
      <header className="flex justify-end w-full">
        <button
          onClick={navigateToSettings}
          className="p-2 active:scale-90 transition-transform hover:bg-gray-100 rounded-full"
        >
          <Settings className="w-6 h-6" />
        </button>
        <button
          onClick={navigateToHelp}
          className="p-2 active:scale-90 transition-transform"
        >
          <Lightbulb className="w-6 h-6" />
        </button>
      </header>

      {/* Center Display - Single Image */}
      <div className="flex-1 flex items-center justify-center">
        <div className="relative w-full max-w-sm">
          <div className="bg-white rounded-3xl shadow-lg shadow-gray-200 p-8 border border-gray-100">
            <div className="text-gray-500 text-xs uppercase tracking-wide mb-1 text-center font-medium">
              Past APR (30 days)
            </div>
            <div className="text-green-500 text-4xl font-bold mb-6 text-center">
              {Math.floor(apr * 100)} %
            </div>
            <div className="relative w-full h-48">
              <Image
                src="/assets/pig.png"
                alt="Piggy Bank"
                fill
                className="object-contain"
                priority
              />
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {/* Stats */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
          <div className="flex flex-col gap-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-500 text-sm">Total Locked Value</span>
              <span className="font-bold text-lg">
                $
                {tvl >= 1_000_000_000
                  ? +(tvl / 1_000_000_000).toFixed(1) + "B"
                  : tvl >= 1_000_000
                  ? +(tvl / 1_000_000).toFixed(1) + "M"
                  : tvl >= 1_000
                  ? +(tvl / 1_000).toFixed(1) + "K"
                  : tvl}
              </span>
            </div>
            <div className="h-px bg-gray-100"></div>
            <div className="flex justify-between items-center">
              <span className="text-gray-500 text-sm">Your Holdings</span>
              <span className="font-bold text-lg">$200</span>
            </div>
          </div>
        </div>

        {/* Bottom Actions */}
        <footer className="flex gap-3 pb-6">
          <button
            onClick={navigateToDepositPage}
            className="flex-1 bg-black text-white py-4 rounded-2xl font-semibold text-base active:scale-95 transition-transform shadow-lg shadow-gray-300"
          >
            Deposit
          </button>
          <button className="flex-1 bg-white text-black py-4 rounded-2xl font-semibold text-base active:scale-95 transition-transform border-2 border-black">
            Withdraw
          </button>
        </footer>
      </div>
    </main>
  );
}

export default page;
