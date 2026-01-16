import { useState } from 'react';
import { MoonPayBuyWidget } from '@moonpay/moonpay-react';
import { createWallet, hasWallet, getWalletAddress, loadWallet } from '../lib/wallet';
import { bridgeToHyperLiquid, waitForDeposit, type TransferStatus } from '../lib/bridge';

type Step = 'welcome' | 'create-password' | 'fund' | 'transferring' | 'done';

interface OnboardingProps {
  onComplete: () => void;
}

export function Onboarding({ onComplete }: OnboardingProps) {
  const [step, setStep] = useState<Step>(hasWallet() ? 'fund' : 'welcome');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [walletAddress, setWalletAddress] = useState<string | null>(getWalletAddress());
  const [showMoonPay, setShowMoonPay] = useState(false);
  const [copied, setCopied] = useState(false);
  const [transferStatus, setTransferStatus] = useState<TransferStatus | null>(null);
  const [storedPassword, setStoredPassword] = useState<string>('');

  const handleCopy = () => {
    navigator.clipboard.writeText(walletAddress || '');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleCreateWallet = async () => {
    if (password.length < 8) {
      alert('Password must be 8+ characters');
      return;
    }
    setLoading(true);
    try {
      const wallet = await createWallet(password);
      setWalletAddress(wallet.address);
      setStoredPassword(password);
      setStep('fund');
    } catch (err) {
      console.error(err);
      alert('Failed to create wallet');
    }
    setLoading(false);
  };

  const handleTransactionComplete = async () => {
    setShowMoonPay(false);
    setStep('transferring');

    setTransferStatus({ step: 'checking', message: 'Processing your purchase...' });

    try {
      const deposited = await waitForDeposit(walletAddress!, setTransferStatus, 180000);

      if (!deposited) {
        setTransferStatus({
          step: 'error',
          message: 'Deposit not received. Check MoonPay for status.',
        });
        return;
      }

      if (!storedPassword) {
        setTransferStatus({
          step: 'error',
          message: 'Please refresh and enter password to continue transfer',
        });
        return;
      }

      const wallet = await loadWallet(storedPassword);
      if (!wallet) {
        setTransferStatus({ step: 'error', message: 'Failed to load wallet' });
        return;
      }

      await bridgeToHyperLiquid(wallet as any, setTransferStatus);

      setStoredPassword('');

      setTimeout(() => setStep('done'), 1500);
    } catch (err) {
      console.error('Bridge error:', err);
      setTransferStatus({
        step: 'error',
        message: err instanceof Error ? err.message : 'Transfer failed',
      });
    }
  };

  const getStatusIcon = () => {
    if (!transferStatus) return null;
    switch (transferStatus.step) {
      case 'checking':
        return '🔍';
      case 'approving':
        return '✍️';
      case 'bridging':
        return '🌉';
      case 'confirming':
        return '⏳';
      case 'complete':
        return '✓';
      case 'error':
        return '!';
    }
  };

  const getStatusClass = () => {
    if (!transferStatus) return '';
    if (transferStatus.step === 'complete') return 'success';
    if (transferStatus.step === 'error') return 'error';
    return 'loading';
  };

  return (
    <div className="onboarding">
      {step === 'welcome' && (
        <div className="onboarding-step">
          <div className="onboarding-header">
            <h1>Ramsay</h1>
            <p className="subtitle">
              Buy crypto instantly with your card. Start earning yield on HyperLiquid.
            </p>
          </div>

          <div className="onboarding-content">
            <div className="feature-list">
              <div className="feature-item">
                <div className="feature-icon">💳</div>
                <div className="feature-text">
                  <span className="feature-title">Instant purchases</span>
                  <span className="feature-desc">Buy with card, Apple Pay, or bank transfer</span>
                </div>
              </div>
              <div className="feature-item">
                <div className="feature-icon">🔄</div>
                <div className="feature-text">
                  <span className="feature-title">Auto-bridge</span>
                  <span className="feature-desc">Funds move to HyperLiquid automatically</span>
                </div>
              </div>
              <div className="feature-item">
                <div className="feature-icon">📈</div>
                <div className="feature-text">
                  <span className="feature-title">Start earning</span>
                  <span className="feature-desc">Access DeFi yields in one tap</span>
                </div>
              </div>
            </div>
          </div>

          <div className="onboarding-footer">
            <button className="btn btn-primary" onClick={() => setStep('create-password')}>
              Get started
            </button>
          </div>
        </div>
      )}

      {step === 'create-password' && (
        <div className="onboarding-step">
          <div className="onboarding-header">
            <h2>Create password</h2>
            <p className="subtitle">
              This password encrypts your wallet. Keep it safe — you'll need it to access your funds.
            </p>
          </div>

          <div className="onboarding-content">
            <div className="input-group">
              <input
                type="password"
                className="input"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleCreateWallet()}
              />
            </div>
            <p className="subtitle" style={{ fontSize: '13px' }}>
              Minimum 8 characters
            </p>
          </div>

          <div className="onboarding-footer">
            <button
              className="btn btn-primary"
              onClick={handleCreateWallet}
              disabled={loading || password.length < 8}
            >
              {loading ? 'Creating wallet...' : 'Continue'}
            </button>
            <button className="btn btn-ghost" onClick={() => setStep('welcome')}>
              Back
            </button>
          </div>
        </div>
      )}

      {step === 'fund' && (
        <div className="onboarding-step">
          <div className="onboarding-header">
            <h2>Add funds</h2>
            <p className="subtitle">
              Buy ETH with your card — we'll automatically move it to HyperLiquid for you.
            </p>
          </div>

          <div className="onboarding-content">
            <div className="wallet-card" onClick={handleCopy}>
              <div className="wallet-card-label">Your wallet address</div>
              <div className="wallet-card-address">{walletAddress}</div>
              <div className={`wallet-card-hint ${copied ? 'copied' : ''}`}>
                {copied ? '✓ Copied to clipboard' : 'Tap to copy'}
              </div>
            </div>
          </div>

          <div className="onboarding-footer">
            <button className="btn btn-primary" onClick={() => setShowMoonPay(true)}>
              Buy with card
            </button>
            <button className="btn btn-ghost" onClick={() => setStep('done')}>
              I'll do this later
            </button>
          </div>

          <MoonPayBuyWidget
            variant="overlay"
            baseCurrencyCode="usd"
            currencyCode="eth"
            defaultCurrencyCode="eth"
            walletAddress={walletAddress || undefined}
            visible={showMoonPay}
            onCloseOverlay={() => setShowMoonPay(false)}
            onTransactionCompleted={handleTransactionComplete}
          />

          {showMoonPay && (
            <div className="wallet-toast" onClick={handleCopy}>
              <div>
                <div className="wallet-toast-label">{copied ? 'Copied!' : 'Your address'}</div>
                <div className="wallet-toast-address">{walletAddress}</div>
              </div>
            </div>
          )}
        </div>
      )}

      {step === 'transferring' && (
        <div className="onboarding-step">
          <div className="transfer-status">
            <div className={`status-icon ${getStatusClass()}`}>
              {getStatusIcon()}
            </div>
            <div className="status-text">
              <span className="status-title">
                {transferStatus?.step === 'error' ? 'Transfer failed' : 'Transferring funds'}
              </span>
              <span className="status-message">{transferStatus?.message}</span>
            </div>
            {transferStatus?.txHash && (
              <a
                href={`https://arbiscan.io/tx/${transferStatus.txHash}`}
                target="_blank"
                rel="noopener noreferrer"
                className="tx-link"
              >
                View on Arbiscan →
              </a>
            )}
            {transferStatus?.step === 'error' && (
              <button className="btn btn-secondary" onClick={() => setStep('fund')} style={{ marginTop: '16px' }}>
                Try again
              </button>
            )}
          </div>
        </div>
      )}

      {step === 'done' && (
        <div className="onboarding-step">
          <div className="onboarding-content" style={{ textAlign: 'center' }}>
            <div className="success-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
            </div>
            <h2>You're all set</h2>
            <p className="subtitle">Your funds are ready on HyperLiquid</p>
            <p className="wallet-hint">
              {walletAddress?.slice(0, 6)}...{walletAddress?.slice(-4)}
            </p>
          </div>

          <div className="onboarding-footer">
            <button className="btn btn-primary" onClick={onComplete}>
              Open dashboard
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
