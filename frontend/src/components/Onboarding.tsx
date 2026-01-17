import { useState } from 'react';
import { createWallet, hasWallet, getWalletAddress, loadWallet, clearWallet } from '../lib/wallet';

type Step = 'welcome' | 'create-password' | 'fund' | 'processing' | 'done';

interface OnboardingProps {
  onComplete: () => void;
}

export function Onboarding({ onComplete }: OnboardingProps) {
  const [step, setStep] = useState<Step>(hasWallet() ? 'fund' : 'welcome');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [walletAddress, setWalletAddress] = useState<string | null>(getWalletAddress());
  const [copied, setCopied] = useState(false);
  const [copiedKey, setCopiedKey] = useState(false);
  const [showKeyPrompt, setShowKeyPrompt] = useState(false);
  const [keyPassword, setKeyPassword] = useState('');
  const [fundAmount, setFundAmount] = useState('100');

  const handleCopy = () => {
    navigator.clipboard.writeText(walletAddress || '');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleCopyPrivateKey = async () => {
    if (!keyPassword) return;
    try {
      const wallet = await loadWallet(keyPassword);
      if (wallet) {
        navigator.clipboard.writeText(wallet.privateKey);
        setCopiedKey(true);
        setTimeout(() => {
          setCopiedKey(false);
          setShowKeyPrompt(false);
          setKeyPassword('');
        }, 2000);
      } else {
        alert('Incorrect password');
      }
    } catch {
      alert('Incorrect password');
    }
  };

  const handleGenerateNewWallet = () => {
    if (confirm('This will reset your account. Make sure you have backed up any important information. Continue?')) {
      clearWallet();
      setWalletAddress(null);
      setPassword('');
      setStep('welcome');
    }
  };

  const handleCreateWallet = async () => {
    if (password.length < 8) return;
    setLoading(true);
    try {
      const wallet = await createWallet(password);
      setWalletAddress(wallet.address);
      setStep('fund');
    } catch (err) {
      console.error(err);
      alert('Failed to create account');
    }
    setLoading(false);
  };

  const handleMockFund = async () => {
    setStep('processing');
    await new Promise(r => setTimeout(r, 2000));
    setStep('done');
  };

  return (
    <div className="onboarding">
      {step === 'welcome' && (
        <div className="screen welcome-screen">
          <div className="welcome-bg">
            <div className="gradient-orb orb-1" />
            <div className="gradient-orb orb-2" />
          </div>
          <div className="welcome-content">
            <div className="logo-mark">
              <svg viewBox="0 0 48 48" fill="none">
                <rect width="48" height="48" rx="12" fill="currentColor" />
                <path d="M14 34V14h8c5 0 8 3 8 7 0 3-2 5-4 6l5 7h-5l-4-6h-3v6h-5zm5-10h3c2 0 3-1 3-3s-1-3-3-3h-3v6z" fill="#000" />
              </svg>
            </div>
            <h1 className="welcome-title">Ramsay</h1>
            <p className="welcome-subtitle">High-yield Ramsay, simplified</p>
          </div>
          <div className="welcome-footer">
            <button className="btn-primary" onClick={() => setStep('create-password')}>
              Get Started
            </button>
            <p className="terms">By continuing, you agree to our Terms of Service</p>
          </div>
        </div>
      )}

      {step === 'create-password' && (
        <div className="screen">
          <button className="back-btn" onClick={() => setStep('welcome')}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
          </button>
          <div className="screen-content">
            <div className="screen-header">
              <h2>Create Password</h2>
              <p>This secures your account. Keep it safe.</p>
            </div>
            <div className="input-wrapper">
              <input
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleCreateWallet()}
              />
              <div className="input-hint">Minimum 8 characters</div>
            </div>
          </div>
          <div className="screen-footer">
            <button
              className="btn-primary"
              onClick={handleCreateWallet}
              disabled={loading || password.length < 8}
            >
              {loading ? 'Creating...' : 'Continue'}
            </button>
          </div>
        </div>
      )}

      {step === 'fund' && (
        <div className="screen fund-screen">
          <div className="fund-header">
            <h2>Add Money</h2>
            <p>Start earning 12.5% APY</p>
          </div>

          <div className="fund-amount-display">
            <span className="currency-symbol">$</span>
            <input
              type="number"
              value={fundAmount}
              onChange={(e) => setFundAmount(e.target.value)}
              placeholder="0"
              className="amount-display-input"
            />
          </div>

          <div className="fund-presets">
            {['50', '100', '250', '500'].map((amt) => (
              <button
                key={amt}
                className={`fund-preset ${fundAmount === amt ? 'active' : ''}`}
                onClick={() => setFundAmount(amt)}
              >
                ${amt}
              </button>
            ))}
          </div>

          <div className="fund-footer">
            <button className="apple-pay-btn" onClick={handleMockFund}>
              <svg viewBox="0 0 165.521 40" className="apple-pay-logo">
                <path fill="#fff" d="M150.698 0H14.823c-.566 0-1.133 0-1.698.003-.477.004-.953.009-1.43.022-1.039.028-2.087.09-3.113.274a10.51 10.51 0 0 0-2.958.975 9.932 9.932 0 0 0-2.52 1.83A9.927 9.927 0 0 0 1.273 5.63a10.464 10.464 0 0 0-.974 2.95C.061 9.607.004 10.656-.001 11.696c-.013.477-.012.954-.012 1.43v13.748c0 .476-.001.953.012 1.43.005 1.04.062 2.09.274 3.117a10.463 10.463 0 0 0 .974 2.95 9.93 9.93 0 0 0 1.83 2.525c.753.752 1.6 1.35 2.52 1.83a10.5 10.5 0 0 0 2.958.975c1.026.183 2.074.246 3.113.273.477.014.953.02 1.43.024.565.003 1.132.003 1.698.003H150.698c.566 0 1.132 0 1.699-.003.476-.004.953-.01 1.43-.024 1.038-.027 2.085-.09 3.113-.273a10.478 10.478 0 0 0 2.958-.975 9.955 9.955 0 0 0 2.52-1.83 9.957 9.957 0 0 0 1.83-2.525c.384-.93.683-1.912.974-2.95.213-1.027.27-2.077.273-3.117.014-.477.02-.954.02-1.43.004-.566.004-1.133.004-1.699V14.824c0-.566 0-1.133-.004-1.699 0-.476-.006-.953-.02-1.43-.003-1.04-.06-2.089-.273-3.116a10.478 10.478 0 0 0-.974-2.95 9.955 9.955 0 0 0-4.35-4.355 10.478 10.478 0 0 0-2.958-.975c-1.028-.183-2.075-.246-3.113-.273-.477-.013-.954-.019-1.43-.022C151.83 0 151.264 0 150.698 0z"/>
                <path d="M150.698 2.678h.367c.454.004.908.011 1.36.022.793.022 1.719.063 2.58.211.762.13 1.38.319 1.988.595a7.292 7.292 0 0 1 1.832 1.333c.597.592 1.05 1.269 1.348 2.005.254.596.443 1.22.577 1.988.155.94.196 1.875.217 2.58.012.451.017.903.02 1.357.003.553.003 1.106.003 1.66v13.146c0 .553 0 1.106-.003 1.659-.003.455-.008.908-.02 1.359-.021.705-.062 1.64-.217 2.578a6.91 6.91 0 0 1-.577 1.989 7.332 7.332 0 0 1-1.348 2.006 7.323 7.323 0 0 1-1.832 1.333 6.94 6.94 0 0 1-1.988.594c-.861.149-1.787.189-2.58.211-.452.011-.906.018-1.36.022l-.736.003H15.19l-.738-.003c-.453-.004-.906-.011-1.358-.022-.793-.022-1.719-.062-2.58-.21a6.94 6.94 0 0 1-1.99-.595 7.29 7.29 0 0 1-1.83-1.333 7.283 7.283 0 0 1-1.35-2.006 6.89 6.89 0 0 1-.576-1.989c-.154-.938-.196-1.873-.218-2.578a70.869 70.869 0 0 1-.019-1.359c-.004-.553-.004-1.106-.004-1.659V14.429c0-.554 0-1.107.004-1.66.003-.454.007-.906.019-1.357.022-.705.064-1.64.218-2.58a6.89 6.89 0 0 1 .576-1.988 7.283 7.283 0 0 1 1.35-2.005A7.32 7.32 0 0 1 8.524 3.506a6.94 6.94 0 0 1 1.99-.595c.86-.148 1.786-.189 2.58-.21.452-.012.905-.019 1.358-.023h136.246z"/>
                <path fill="#fff" d="M43.508 26.13a4.199 4.199 0 0 1-2.011-.569 3.5 3.5 0 0 1-1.37-1.482 4.291 4.291 0 0 1-.456-1.833 4.84 4.84 0 0 1 .206-1.569c.238-.73.61-1.331 1.14-1.796a4.136 4.136 0 0 1 1.614-.948c.498-.165.999-.248 1.473-.247h.12c.749.002 1.442.16 2.037.466l-.607 1.433c-.432-.247-.963-.393-1.56-.394h-.089a2.317 2.317 0 0 0-.815.14c-.316.119-.609.311-.859.574a2.54 2.54 0 0 0-.579.975c-.12.359-.162.715-.13 1.07.024.282.096.543.217.786.149.297.351.546.605.745.267.21.584.367.943.462.302.083.6.123.895.123h.091c.597-.003 1.127-.15 1.557-.396l.608 1.433a4.12 4.12 0 0 1-2.03.526h-.001zm8.286-7.627h1.548v7.384h-1.548zm-4.89 0h4.36v1.391h-2.815v1.502h2.5v1.39h-2.5v1.71h2.815v1.391h-4.36zm-7.257 0h4.358v1.391h-2.814v1.502h2.5v1.39h-2.5v1.71h2.814v1.391h-4.358zm-5.132 0h4.166l-2.113 3.626 2.113 3.758h-1.789l-1.27-2.354-1.27 2.354h-1.788l2.112-3.758-2.112-3.626h1.951zm-6.403 7.384h1.548v-5.993h-1.914v-1.391h5.376v1.391h-1.914v5.993h-1.548zm-.456-3.607c0 .57-.095 1.089-.285 1.55a3.552 3.552 0 0 1-.784 1.197 3.507 3.507 0 0 1-1.169.775 3.756 3.756 0 0 1-1.44.282h-.158a3.759 3.759 0 0 1-1.441-.282 3.506 3.506 0 0 1-1.169-.775 3.561 3.561 0 0 1-.784-1.197 3.813 3.813 0 0 1-.284-1.55c0-.57.095-1.09.284-1.55.19-.46.455-.86.784-1.198a3.504 3.504 0 0 1 1.169-.775 3.757 3.757 0 0 1 1.441-.283h.158c.512.001.994.095 1.44.283.447.187.838.445 1.169.775.33.337.595.738.784 1.198.19.46.285.98.285 1.55zm-1.548 0c0-.323-.051-.615-.152-.873a1.932 1.932 0 0 0-.42-.666 1.818 1.818 0 0 0-.628-.42 1.92 1.92 0 0 0-.78-.157h-.158c-.282 0-.542.052-.78.157a1.818 1.818 0 0 0-.628.42 1.938 1.938 0 0 0-.42.666 2.309 2.309 0 0 0-.152.873c0 .323.051.614.152.873.1.258.243.484.42.666.176.182.39.326.628.42.238.095.498.157.78.157h.158c.282 0 .542-.052.78-.157.238-.094.452-.238.628-.42.177-.182.32-.408.42-.666.101-.259.152-.55.152-.873z"/>
                <path fill="#fff" d="M127.725 28.788h-2.079l3.683-8.8h2.145l3.683 8.8h-2.091l-.751-1.824h-3.826l-.764 1.824zm1.425-3.488h2.505l-1.234-3.024-1.271 3.024zm-12.063-1.704c0 .505-.099 1.023-.296 1.55-.198.527-.506 1.016-.923 1.464-.417.448-.952.809-1.603 1.082-.652.274-1.435.41-2.349.41h-3.328v-8.8h3.328c.914 0 1.697.136 2.349.41.651.273 1.186.634 1.603 1.082.417.448.725.937.923 1.464.197.528.296 1.045.296 1.55zm-2.012.012c0-.352-.061-.699-.181-1.04a2.41 2.41 0 0 0-.545-.885c-.241-.257-.544-.466-.91-.626-.365-.16-.797-.24-1.294-.24h-1.437v5.583h1.437c.497 0 .929-.08 1.294-.24.366-.16.669-.369.91-.626.241-.257.421-.549.545-.885.12-.341.18-.688.181-1.041z"/>
              </svg>
            </button>

            <div className="fund-alt-actions">
              <button className="fund-alt-btn" onClick={() => setShowKeyPrompt(true)}>
                Export Key
              </button>
              <span className="fund-divider">|</span>
              <button className="fund-alt-btn" onClick={handleGenerateNewWallet}>
                Reset
              </button>
            </div>

            <button className="fund-skip" onClick={() => setStep('done')}>
              Skip for now
            </button>
          </div>

          {showKeyPrompt && (
            <div className="modal-overlay" onClick={() => setShowKeyPrompt(false)}>
              <div className="modal" onClick={(e) => e.stopPropagation()}>
                <h3>Export Recovery Key</h3>
                <p>Enter your password to reveal your recovery key</p>
                <input
                  type="password"
                  placeholder="Password"
                  value={keyPassword}
                  onChange={(e) => setKeyPassword(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleCopyPrivateKey()}
                  autoFocus
                />
                <div className="modal-actions">
                  <button className="btn-ghost" onClick={() => setShowKeyPrompt(false)}>
                    Cancel
                  </button>
                  <button className="btn-primary small" onClick={handleCopyPrivateKey}>
                    {copiedKey ? 'Copied' : 'Copy Key'}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {step === 'processing' && (
        <div className="screen center">
          <div className="processing-animation">
            <div className="spinner" />
            <div className="pulse-ring" />
          </div>
          <h2>Processing</h2>
          <p>Setting up your account...</p>
        </div>
      )}

      {step === 'done' && (
        <div className="done-screen">
          <div className="done-content">
            <div className="done-tick">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                <path d="M20 6L9 17l-5-5" />
              </svg>
            </div>
            <h2 className="done-title">All set</h2>
          </div>
          <div className="done-expand" onAnimationEnd={onComplete} />
        </div>
      )}
    </div>
  );
}
