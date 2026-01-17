"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Copy, Check, Eye, EyeOff, Download, Shield, Network, Info, Wallet } from "lucide-react";
import { formatCurrency } from "@/app/utils/formatCurrency";
import { getWalletAddress, getPrivateKey } from "@/app/lib/wallet";

export default function SettingsPage() {
  const router = useRouter();
  const [walletAddress, setWalletAddress] = useState<string>("");
  const [privateKey, setPrivateKey] = useState<string>("");
  const [balance, setBalance] = useState<number>(200);
  const [showPrivateKey, setShowPrivateKey] = useState(false);
  const [copiedAddress, setCopiedAddress] = useState(false);
  const [copiedPrivateKey, setCopiedPrivateKey] = useState(false);

  useEffect(() => {
    // Use address from onboarding (backend creates this)
    // Fallback to wallet utility if not found
    const address = localStorage.getItem("address") || getWalletAddress();
    const key = localStorage.getItem("privateKey") || getPrivateKey();
    if (address) setWalletAddress(address);
    if (key) setPrivateKey(key);
  }, []);

  const copyToClipboard = async (text: string, type: 'address' | 'privateKey') => {
    try {
      await navigator.clipboard.writeText(text);
      if (type === 'address') {
        setCopiedAddress(true);
        setTimeout(() => setCopiedAddress(false), 2000);
      } else {
        setCopiedPrivateKey(true);
        setTimeout(() => setCopiedPrivateKey(false), 2000);
      }
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const formatAddress = (address: string) => {
    if (address.length <= 10) return address;
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  return (
    <main className="min-h-screen bg-[#F5F7FA] flex flex-col">
      {/* Header */}
      <header className="flex items-center px-6 pt-12 pb-6 bg-white">
        <button
          onClick={() => router.push('/dashboard')}
          className="p-2 -ml-2 hover:bg-gray-100 rounded-full transition-colors"
        >
          <ArrowLeft className="w-6 h-6 text-[#0A2540]" />
        </button>
        <h1 className="flex-1 text-2xl font-bold text-[#0A2540] text-center -mr-10">Settings</h1>
      </header>

      <div className="flex-1 px-6 py-6 space-y-4 overflow-y-auto">
        {/* Wallet Section */}
        <div className="bg-white rounded-2xl p-5 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <Wallet className="w-5 h-5 text-[#0075FF]" />
            <h3 className="text-lg font-bold text-[#0A2540]">Wallet</h3>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[#6B7C93] text-xs font-medium mb-1">Wallet Address</p>
                <p className="text-[#0A2540] text-sm font-semibold font-mono">{formatAddress(walletAddress)}</p>
              </div>
              <button
                onClick={() => copyToClipboard(walletAddress, 'address')}
                className="p-2 hover:bg-[#F5F7FA] rounded-xl transition-colors"
              >
                {copiedAddress ? (
                  <Check className="w-5 h-5 text-[#00D9A5]" />
                ) : (
                  <Copy className="w-5 h-5 text-[#6B7C93]" />
                )}
              </button>
            </div>
            <div className="h-px bg-[#E8ECF1]" />
            <div>
              <p className="text-[#6B7C93] text-xs font-medium mb-1">Balance</p>
              <p className="text-[#0A2540] text-lg font-bold">{formatCurrency(balance)}</p>
            </div>
          </div>
        </div>

        {/* Security Section */}
        <div className="bg-white rounded-2xl p-5 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <Shield className="w-5 h-5 text-[#0075FF]" />
            <h3 className="text-lg font-bold text-[#0A2540]">Security</h3>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[#6B7C93] text-xs font-medium mb-1">Private Key</p>
                <p className="text-[#6B7C93] text-xs">Keep this secret</p>
              </div>
              <button
                onClick={() => setShowPrivateKey(!showPrivateKey)}
                className="px-4 py-2 bg-[#F5F7FA] text-[#0A2540] rounded-xl text-sm font-semibold hover:bg-[#E8ECF1] transition-colors"
              >
                {showPrivateKey ? (
                  <span className="flex items-center gap-1.5">
                    <EyeOff className="w-4 h-4" />
                    Hide
                  </span>
                ) : (
                  <span className="flex items-center gap-1.5">
                    <Eye className="w-4 h-4" />
                    Show
                  </span>
                )}
              </button>
            </div>
            {showPrivateKey && (
              <div className="bg-[#F5F7FA] rounded-xl p-4 space-y-3">
                <p className="text-xs font-mono text-[#0A2540] break-all">{privateKey}</p>
                <button
                  onClick={() => copyToClipboard(privateKey, 'privateKey')}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-white border border-[#E8ECF1] rounded-xl text-sm font-semibold text-[#0A2540] hover:bg-[#F5F7FA] transition-colors"
                >
                  {copiedPrivateKey ? (
                    <>
                      <Check className="w-4 h-4 text-[#00D9A5]" />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <Download className="w-4 h-4" />
                      <span>Copy Private Key</span>
                    </>
                  )}
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Network Section */}
        <div className="bg-white rounded-2xl p-5 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <Network className="w-5 h-5 text-[#0075FF]" />
            <h3 className="text-lg font-bold text-[#0A2540]">Network</h3>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[#6B7C93] text-xs font-medium mb-1">Network</p>
                <p className="text-[#0A2540] text-sm font-semibold">Hyperliquid</p>
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 bg-[#00D9A5]/10 rounded-full">
                <div className="w-2 h-2 bg-[#00D9A5] rounded-full" />
                <span className="text-xs font-semibold text-[#00D9A5]">Connected</span>
              </div>
            </div>
            <div className="h-px bg-[#E8ECF1]" />
            <div>
              <p className="text-[#6B7C93] text-xs font-medium mb-1">Chain ID</p>
              <p className="text-[#0A2540] text-sm font-semibold font-mono">998</p>
            </div>
          </div>
        </div>

        {/* About Section */}
        <div className="bg-white rounded-2xl p-5 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <Info className="w-5 h-5 text-[#0075FF]" />
            <h3 className="text-lg font-bold text-[#0A2540]">About</h3>
          </div>
          <div className="space-y-4">
            <div>
              <p className="text-[#6B7C93] text-xs font-medium mb-1">Version</p>
              <p className="text-[#0A2540] text-sm font-semibold">1.0.0</p>
            </div>
            <div className="h-px bg-[#E8ECF1]" />
            <div>
              <p className="text-[#6B7C93] text-xs font-medium mb-1">Powered by</p>
              <p className="text-[#0A2540] text-sm font-semibold">Hyperliquid</p>
            </div>
          </div>
        </div>

        {/* Danger Zone */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border-2 border-[#FF3D71]/20">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[#6B7C93] text-xs font-medium mb-1">Disconnect Wallet</p>
              <p className="text-[#6B7C93] text-xs">This will clear all local data</p>
            </div>
            <button className="px-4 py-2 bg-[#FF3D71] text-white rounded-xl text-sm font-semibold hover:bg-[#FF2D61] transition-colors">
              Disconnect
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
