import { useState, useEffect } from "react";
import "./App.css";
import { ExchangeClient, HttpTransport, InfoClient } from "@nktkas/hyperliquid";
import { createWalletClient, custom } from "viem";
import {hyperliquidEvmTestnet} from 'viem/chains';
import { ethers } from "ethers";

function App() {
  const provider = new ethers.BrowserProvider(window.ethereum)
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
    if (window.ethereum) {
      setEthereum(window.ethereum);
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
      alert(`Connection failed: ${err.message}`);
    }
  };

  // --- Fetch Spot balance ---
  const fetchSpotBalance = async (wallet) => {
    try {
      setLoadingSpot(true);
      const transport = new HttpTransport({ isTestnet: true });
      const infoClient = new InfoClient({ transport });
      
      const data = await infoClient.spotClearinghouseState({ user: wallet });
      const balance = data?.balances?.find((b) => b.coin === "USDC")?.total || "0";
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
      const transport = new HttpTransport({ isTestnet: true });
      const infoClient = new InfoClient({ transport });
      
      const data = await infoClient.clearinghouseState({ user: wallet });
      const balance = data?.marginSummary?.accountValue || "0";
      setPerpBalance(Number(balance));
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingPerp(false);
    }
  };

  // --- Vault deposit/withdraw using nktkas SDK ---
  const vaultTransfer = async (isDeposit) => {
    if (!ethereum || !amount || !vaultId || !account)
      return alert("Missing vault address, amount, or wallet");
  
    try {
      // Create viem wallet client from MetaMask
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      
      const transport = new HttpTransport();

      const client = new ExchangeClient({transport, wallet});

      const result = await client.vaultTransfer({
        vaultAddress: vaultId,
        isDeposit: true,
        usd: amount,
      });
  
      console.log("Vault transfer result:", result);
      alert(`${isDeposit ? "Deposit" : "Withdrawal"} successful!`);
  
      await fetchSpotBalance(account);
      await fetchPerpBalance(account);
    } catch (err) {
      console.error(err);
      alert(`Vault transfer failed: ${err.message}`);
    }
  };

  const connectwalletHandler = () => {
    if (window.Ethereum) {
        provider.send("eth_requestAccounts", []).then(async () => {
            await accountChangedHandler(provider.getSigner());
        })
    } else {
        alert("Please Install Metamask!!!");
    }
}

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