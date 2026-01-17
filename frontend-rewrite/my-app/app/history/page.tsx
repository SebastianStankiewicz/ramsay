"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, ExternalLink, Clock, CheckCircle2, XCircle, Loader2 } from "lucide-react";
import { formatCurrency } from "@/app/utils/formatCurrency";
import { getWalletAddress } from "@/app/lib/wallet";

type Transaction = {
  id: number;
  tx_type: string;
  tx_hash: string;
  status: string;
  from_chain: string | null;
  to_chain: string | null;
  from_token: string | null;
  to_token: string | null;
  amount_wei: string | null;
  amount_usd: number | null;
  vault_address: string | null;
  created_at: string;
};

const CHAIN_NAMES: Record<string, string> = {
  "1": "Ethereum",
  "999": "HyperLiquid",
};

const TX_TYPE_LABELS: Record<string, string> = {
  bridge: "Bridge",
  vault_deposit: "Vault Deposit",
  vault_withdraw: "Vault Withdraw",
};

const STATUS_COLORS: Record<string, string> = {
  pending: "text-yellow-600 bg-yellow-50",
  completed: "text-green-600 bg-green-50",
  failed: "text-red-600 bg-red-50",
};

export default function HistoryPage() {
  const router = useRouter();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const userAddress = localStorage.getItem("address") || getWalletAddress();
        if (!userAddress) {
          setError("No wallet address found");
          setLoading(false);
          return;
        }

        const response = await fetch(
          `http://localhost:5069/getTransactionHistory?userAddress=${encodeURIComponent(userAddress)}&limit=50`
        );
        const result = await response.json();

        if (result.status === "ok") {
          setTransactions(result.data || []);
        } else {
          setError(result.message || "Failed to load transaction history");
        }
      } catch (err) {
        console.error("Error fetching transaction history:", err);
        setError("Failed to load transaction history");
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, []);

  const formatAddress = (address: string | null) => {
    if (!address) return "N/A";
    if (address.length <= 10) return address;
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getEtherscanUrl = (txHash: string, chainId?: string | null) => {
    if (chainId === "999") {
      return `https://explorer.hyperliquid.xyz/tx/${txHash}`;
    }
    return `https://etherscan.io/tx/${txHash}`;
  };

  const formatAmount = (amountWei: string | null, amountUsd: number | null) => {
    if (amountUsd !== null) {
      return formatCurrency(amountUsd);
    }
    if (amountWei) {
      const eth = parseFloat(amountWei) / 1e18;
      return `${eth.toFixed(6)} ETH`;
    }
    return "N/A";
  };

  return (
    <main className="min-h-screen bg-[#F5F7FA] flex flex-col">
      {/* Header */}
      <header className="flex items-center px-6 pt-12 pb-6 bg-white/80 backdrop-blur-xl sticky top-0 z-20 border-b border-[#E8ECF1]/50">
        <button
          onClick={() => router.push("/dashboard")}
          className="p-2 -ml-2 hover:bg-[#F5F7FA] rounded-full transition-all duration-200 active:scale-95"
        >
          <ArrowLeft className="w-6 h-6 text-[#0A2540]" />
        </button>
        <h1 className="text-xl font-archivo-black text-[#0A2540] ml-2">Transaction History</h1>
      </header>

      <div className="flex-1 px-6 py-6 overflow-y-auto">
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-8 h-8 text-[#0075FF] animate-spin" />
          </div>
        ) : error ? (
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <p className="text-[#6B7C93] text-center">{error}</p>
          </div>
        ) : transactions.length === 0 ? (
          <div className="bg-white rounded-2xl p-8 shadow-sm text-center">
            <Clock className="w-12 h-12 text-[#6B7C93] mx-auto mb-4" />
            <p className="text-[#6B7C93] font-medium">No transactions yet</p>
            <p className="text-[#6B7C93] text-sm mt-2">Your transaction history will appear here</p>
          </div>
        ) : (
          <div className="space-y-3">
            {transactions.map((tx) => (
              <div
                key={tx.id}
                className="bg-white rounded-2xl p-5 shadow-sm card-hover"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="text-base font-archivo-black text-[#0A2540]">
                        {TX_TYPE_LABELS[tx.tx_type] || tx.tx_type}
                      </h3>
                      <span
                        className={`px-2 py-1 rounded-lg text-xs font-medium ${
                          STATUS_COLORS[tx.status] || STATUS_COLORS.pending
                        }`}
                      >
                        {tx.status}
                      </span>
                    </div>
                    <p className="text-[#6B7C93] text-xs mb-1">
                      {formatDate(tx.created_at)}
                    </p>
                  </div>
                  {tx.tx_hash && (
                    <a
                      href={getEtherscanUrl(tx.tx_hash, tx.to_chain || tx.from_chain)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 hover:bg-[#F5F7FA] rounded-xl transition-colors"
                    >
                      <ExternalLink className="w-4 h-4 text-[#0075FF]" />
                    </a>
                  )}
                </div>

                <div className="space-y-2 pt-3 border-t border-[#E8ECF1]">
                  {tx.tx_type === "bridge" && (
                    <>
                      <div className="flex items-center justify-between">
                        <span className="text-[#6B7C93] text-xs">From</span>
                        <span className="text-[#0A2540] text-sm font-medium">
                          {CHAIN_NAMES[tx.from_chain || ""] || tx.from_chain || "N/A"}
                          {tx.from_token && ` (${tx.from_token})`}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-[#6B7C93] text-xs">To</span>
                        <span className="text-[#0A2540] text-sm font-medium">
                          {CHAIN_NAMES[tx.to_chain || ""] || tx.to_chain || "N/A"}
                          {tx.to_token && ` (${tx.to_token})`}
                        </span>
                      </div>
                    </>
                  )}

                  {tx.tx_type === "vault_deposit" && tx.vault_address && (
                    <div className="flex items-center justify-between">
                      <span className="text-[#6B7C93] text-xs">Vault</span>
                      <span className="text-[#0A2540] text-sm font-medium font-mono">
                        {formatAddress(tx.vault_address)}
                      </span>
                    </div>
                  )}

                  <div className="flex items-center justify-between">
                    <span className="text-[#6B7C93] text-xs">Amount</span>
                    <span className="text-[#0A2540] text-sm font-archivo-black">
                      {formatAmount(tx.amount_wei, tx.amount_usd)}
                    </span>
                  </div>

                  {tx.tx_hash && (
                    <div className="flex items-center justify-between">
                      <span className="text-[#6B7C93] text-xs">Transaction</span>
                      <span className="text-[#0A2540] text-sm font-mono">
                        {formatAddress(tx.tx_hash)}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
