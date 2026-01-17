"use client";
import { useState } from "react";
import { X, Apple } from "lucide-react";

export default function Deposit() {
  const [amount, setAmount] = useState(0);

  const quickAmounts = [10, 25, 50, 75, 100];

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 p-6 flex flex-col">
      {/* Header */}
      <header className="flex justify-between items-center mb-12">
        <button className="p-2 active:scale-90 transition-transform">
          <X className="w-6 h-6" />
        </button>
        <h1 className="text-xl font-semibold">Deposit</h1>
        <div className="w-10"></div>
      </header>

      <div className="flex-1 flex flex-col justify-center">
        {/* Amount Display */}
        <div className="mb-12 overflow-hidden h-24 flex justify-center items-center">
          <div className="relative h-24 flex items-center gap-4">
            {/* Animated Amount */}
            <span
              key={amount} // triggers re-render animation
              className="text-6xl font-bold transition-all duration-300 ease-out"
            >
              ${amount}
            </span>

            {/* Last Month's APR */}
            <span className="text-xl text-gray-600">
              Last month’s APR: <span className="font-bold">12.5%</span>
            </span>
          </div>
        </div>

        {/* Slider */}
        <div className="mb-12 px-2">
          <input
            type="range"
            min="0"
            max="500"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-6 [&::-webkit-slider-thumb]:h-6 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-black [&::-webkit-slider-thumb]:cursor-pointer [&::-moz-range-thumb]:w-6 [&::-moz-range-thumb]:h-6 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-black [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:cursor-pointer"
          />
        </div>

        {/* Quick Amounts */}
        <div className="flex gap-3 mb-12">
          {quickAmounts.map((value) => (
            <button
              key={value}
              onClick={() => setAmount(value)}
              className="flex-1 py-3 bg-white rounded-xl font-semibold active:scale-95 transition-transform shadow-sm"
            >
              ${value}
            </button>
          ))}
        </div>
      </div>

      {/* Apple Pay Button */}
      <button className="w-full bg-black text-white py-5 rounded-2xl font-semibold text-lg active:scale-95 transition-transform flex items-center justify-center gap-2">
        <span className="text-2xl"></span>
        <Apple/>
        <span>Pay</span>
      </button>
    </main>
  );
}
