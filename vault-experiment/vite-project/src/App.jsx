import { useState, useEffect } from "react";
import "./App.css";
import MetaMaskSDK from "@metamask/sdk";

const HYPERLIQUID_DOMAIN = {
  name: "Exchange",
  version: "1",
  chainId: 998, // Testnet chain
  verifyingContract: "0x0000000000000000000000000000000000000000",
};

const VAULT_TRANSFER_TYPES = {
  VaultTransfer: [
    { name: "vaultAddress", type: "address" },
    { name: "isDeposit", type: "bool" },
    { name: "usd", type: "uint256" },
    { name: "nonce", type: "uint64" },
  ],
};

function App() {
  const [account, setAccount] = useState(null);
  const [ethereum, setEthereum] = useState(null);

  const [vaultId, setVaultId] = useState(
    "0xa15099a30bbf2e68942d6f4c43d70d04faeab0a0"
  );
  const [amount, setAmount] = useState("");

  const [spotBalance, setSpotBalance] = useState(null);
  const [perpBalance, setPerpBalance] = useState(null);

  const [loadingSpot, setLoadingSpot] = useState(false);
  const [loadingPerp, setLoadingPerp] = useState(false);

  // --- Initialize MetaMask ---
  useEffect(() => {
    if (window.ethereum) setEthereum(window.ethereum);
    else {
      const MMSDK = new MetaMaskSDK({
        dappMetadata: { name: "Hyperliquid Testnet UI", url: window.location.href },
      });
      setEthereum(MMSDK.getProvider());
    }
  }, []);

  // --- Connect wallet ---
  const connectWallet = async () => {
    if (!ethereum) return alert("MetaMask not available");
    try {
      const accounts = await ethereum.request({ method: "eth_requestAccounts" });
      setAccount(accounts[0]);
      await fetchSpotBalance(accounts[0]);
      await fetchPerpBalance(accounts[0]);
    } catch (err) {
      console.error(err);
    }
  };

  // --- Fetch Spot balance ---
  const fetchSpotBalance = async (wallet) => {
    try {
      setLoadingSpot(true);
      const res = await fetch("https://api.hyperliquid-testnet.xyz/info", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "spotClearinghouseState", user: wallet }),
      });
      const data = await res.json();
      const balance = data?.balances?.find((b) => b.coin === "USDC")?.total || 0;
      setSpotBalance(Number(balance));
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingSpot(false);
    }
  };

  // --- Fetch Perp balance ---
  const fetchPerpBalance = async (wallet) => {
    try {
      setLoadingPerp(true);
      const res = await fetch("https://api.hyperliquid-testnet.xyz/info", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "clearinghouseState", user: wallet }),
      });
      const data = await res.json();
      const balance = data?.marginSummary?.accountValue || 0;
      setPerpBalance(Number(balance));
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingPerp(false);
    }
  };

  // --- Vault deposit/withdraw ---
  const vaultTransfer = async (isDeposit) => {
    if (!client || !amount || !vaultId) return alert("Missing info");
  
    try {
      // Hyperliquid expects USD in 6 decimals
      const usdAmount = Math.floor(Number(amount) * 1e6);
  
      // Build the action
      const action = {
        type: "vaultTransfer",
        vaultAddress: vaultId,
        isDeposit,
        usd: usdAmount,
      };
  
      // Use the SDK directly
      const result = await client.exchange.vaultTransfer(action);
  
      console.log("Vault transfer result:", result);
      alert(`${isDeposit ? "Deposit" : "Withdrawal"} successful!`);
  
      // Refresh balances
      await fetchSpotBalance(account, client);
      await fetchPerpBalance(account, client);
    } catch (err) {
      console.error(err);
      alert(`Vault transfer failed: ${err.message}`);
    }
  };

  return (
    <>
      <h1>Hyperliquid Testnet Dashboard</h1>
      <div className="card">
        <button onClick={connectWallet}>
          {account ? `Connected: ${account.slice(0, 6)}...${account.slice(-4)}` : "Connect Wallet"}
        </button>

        {account && (
          <>
            <p>Spot Wallet Balance: {loadingSpot ? "Loading..." : `${spotBalance ?? 0} USDC`}</p>
            <p>Perp Wallet Balance: {loadingPerp ? "Loading..." : `${perpBalance ?? 0} USDC`}</p>
          </>
        )}

        <div>
          <input
            type="text"
            placeholder="Vault ID / Address"
            value={vaultId}
            onChange={(e) => setVaultId(e.target.value)}
            style={{ width: "100%", marginBottom: "0.5rem" }}
          />
          <input
            type="number"
            placeholder="Amount (USD)"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            style={{ width: "100%", marginBottom: "0.5rem" }}
          />
        </div>

        <div style={{ display: "flex", gap: "0.5rem" }}>
          <button onClick={() => vaultTransfer(true)}>Deposit to Vault</button>
          <button onClick={() => vaultTransfer(false)}>Withdraw from Vault</button>
        </div>
      </div>
    </>
  );
}

export default App;