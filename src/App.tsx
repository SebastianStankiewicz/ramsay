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
              <div className="feature-icon">📊</div>
              <div className="feature-text">
                <span className="feature-title">Portfolio</span>
                <span className="feature-desc">Track your assets and performance</span>
              </div>
            </div>
            <div className="feature-item">
              <div className="feature-icon">💰</div>
              <div className="feature-text">
                <span className="feature-title">Earn</span>
                <span className="feature-desc">Deposit to vaults and earn yield</span>
              </div>
            </div>
            <div className="feature-item">
              <div className="feature-icon">🔄</div>
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
