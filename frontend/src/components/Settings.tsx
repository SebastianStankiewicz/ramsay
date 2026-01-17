import { useState } from 'react';
import { formatCurrency } from '../utils/formatCurrency';

type SettingsProps = {
  walletAddress: string;
  privateKey: string;
  balance: number;
  onBack: () => void;
  onExportPrivateKey: () => void;
};

export default function Settings({
  walletAddress,
  privateKey,
  balance,
  onBack,
  onExportPrivateKey,
}: SettingsProps) {
  const [showPrivateKey, setShowPrivateKey] = useState(false);
  const [copiedAddress, setCopiedAddress] = useState(false);
  const [copiedPrivateKey, setCopiedPrivateKey] = useState(false);

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
    <div className="app">
      <div className="settings-screen">
        <header className="settings-header">
          <button className="settings-back-btn" onClick={onBack}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
          </button>
          <h1 className="settings-title">Settings</h1>
          <div style={{ width: 44 }} /> {/* Spacer for centering */}
        </header>

        <div className="settings-content">
          {/* Wallet Info Section */}
          <section className="settings-section">
            <h3 className="settings-section-title">Wallet</h3>
            
            <div className="settings-card">
              <div className="settings-row">
                <div className="settings-row-left">
                  <span className="settings-label">Wallet Address</span>
                  <span className="settings-value-mono">{formatAddress(walletAddress)}</span>
                </div>
                <button
                  className="settings-copy-btn"
                  onClick={() => copyToClipboard(walletAddress, 'address')}
                >
                  {copiedAddress ? (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M20 6L9 17l-5-5" />
                    </svg>
                  ) : (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                    </svg>
                  )}
                </button>
              </div>

              <div className="settings-row">
                <div className="settings-row-left">
                  <span className="settings-label">Balance</span>
                  <span className="settings-value">{formatCurrency(balance)}</span>
                </div>
              </div>
            </div>
          </section>

          {/* Security Section */}
          <section className="settings-section">
            <h3 className="settings-section-title">Security</h3>
            
            <div className="settings-card">
              <div className="settings-row">
                <div className="settings-row-left">
                  <span className="settings-label">Private Key</span>
                  <span className="settings-warning">Keep this secret</span>
                </div>
                <button
                  className="settings-toggle-btn"
                  onClick={() => setShowPrivateKey(!showPrivateKey)}
                >
                  {showPrivateKey ? 'Hide' : 'Show'}
                </button>
              </div>

              {showPrivateKey && (
                <div className="private-key-display">
                  <div className="private-key-value">{privateKey}</div>
                  <button
                    className="settings-export-btn"
                    onClick={() => {
                      copyToClipboard(privateKey, 'privateKey');
                      onExportPrivateKey();
                    }}
                  >
                    {copiedPrivateKey ? (
                      <>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M20 6L9 17l-5-5" />
                        </svg>
                        <span>Copied!</span>
                      </>
                    ) : (
                      <>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                          <polyline points="7 10 12 15 17 10" />
                          <line x1="12" y1="15" x2="12" y2="3" />
                        </svg>
                        <span>Copy Private Key</span>
                      </>
                    )}
                  </button>
                </div>
              )}
            </div>
          </section>

          {/* Network Section */}
          <section className="settings-section">
            <h3 className="settings-section-title">Network</h3>
            
            <div className="settings-card">
              <div className="settings-row">
                <div className="settings-row-left">
                  <span className="settings-label">Network</span>
                  <span className="settings-value">Hyperliquid</span>
                </div>
                <div className="settings-badge">
                  <div className="settings-badge-dot" />
                  <span>Connected</span>
                </div>
              </div>

              <div className="settings-row">
                <div className="settings-row-left">
                  <span className="settings-label">Chain ID</span>
                  <span className="settings-value-mono">998</span>
                </div>
              </div>
            </div>
          </section>

          {/* About Section */}
          <section className="settings-section">
            <h3 className="settings-section-title">About</h3>
            
            <div className="settings-card">
              <div className="settings-row">
                <div className="settings-row-left">
                  <span className="settings-label">Version</span>
                  <span className="settings-value">1.0.0</span>
                </div>
              </div>

              <div className="settings-row">
                <div className="settings-row-left">
                  <span className="settings-label">Powered by</span>
                  <span className="settings-value">Hyperliquid</span>
                </div>
              </div>
            </div>
          </section>

          {/* Danger Zone */}
          <section className="settings-section">
            <div className="settings-card danger">
              <div className="settings-row">
                <div className="settings-row-left">
                  <span className="settings-label">Disconnect Wallet</span>
                  <span className="settings-warning">This will clear all local data</span>
                </div>
                <button className="settings-danger-btn">
                  Disconnect
                </button>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
