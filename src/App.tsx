import { useState } from 'react';
import { MoonPayProvider } from '@moonpay/moonpay-react';
import { Onboarding } from './components/Onboarding';
import './App.css';

const MOONPAY_API_KEY = import.meta.env.VITE_MOONPAY_API_KEY;

function App() {
  const [onboarded, setOnboarded] = useState(false);

  return (
    <MoonPayProvider apiKey={MOONPAY_API_KEY} debug>
      {!onboarded ? (
        <Onboarding onComplete={() => setOnboarded(true)} />
      ) : (
        <div className="dashboard">
          <div className="dashboard-header">
            <h1>Dashboard</h1>
          </div>

          <div className="dashboard-balance">
            <p className="balance-label">Total balance</p>
            <p className="balance-value">$0.00</p>
            <p className="balance-change">+0.00%</p>
          </div>

          <div className="feature-list">
            <div className="feature-item">
              <div className="feature-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="20" height="20">
                  <line x1="18" y1="20" x2="18" y2="10"></line>
                  <line x1="12" y1="20" x2="12" y2="4"></line>
                  <line x1="6" y1="20" x2="6" y2="14"></line>
                </svg>
              </div>
              <div className="feature-text">
                <span className="feature-title">Portfolio</span>
                <span className="feature-desc">Track your assets and performance</span>
              </div>
            </div>
            <div className="feature-item">
              <div className="feature-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="20" height="20">
                  <circle cx="12" cy="12" r="10"></circle>
                  <line x1="12" y1="8" x2="12" y2="16"></line>
                  <line x1="8" y1="12" x2="16" y2="12"></line>
                </svg>
              </div>
              <div className="feature-text">
                <span className="feature-title">Earn</span>
                <span className="feature-desc">Deposit to vaults and earn yield</span>
              </div>
            </div>
            <div className="feature-item">
              <div className="feature-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="20" height="20">
                  <polyline points="17 1 21 5 17 9"></polyline>
                  <path d="M3 11V9a4 4 0 0 1 4-4h14"></path>
                  <polyline points="7 23 3 19 7 15"></polyline>
                  <path d="M21 13v2a4 4 0 0 1-4 4H3"></path>
                </svg>
              </div>
              <div className="feature-text">
                <span className="feature-title">Trade</span>
                <span className="feature-desc">Swap tokens on HyperLiquid</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </MoonPayProvider>
  );
}

export default App;
