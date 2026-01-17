type Onboarding3Props = {
  onNext: () => void;
  onBack: () => void;
};

export default function Onboarding3({ onNext, onBack }: Onboarding3Props) {
  return (
    <div className="app">
      <div className="onboarding-screen">
        <button className="onboarding-back-btn" onClick={onBack}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
        </button>
        <div className="onboarding-content">
          <div className="onboarding-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
          </div>
          <h1 className="onboarding-title">Your Wallet, Your Control</h1>
          <p className="onboarding-description">
            We create a secure wallet for you behind the scenes. 
            You can export your private key anytime. Your funds, your keys.
          </p>
          <div className="onboarding-features">
            <div className="onboarding-feature">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20 6L9 17l-5-5" />
              </svg>
              <span>Non-custodial</span>
            </div>
            <div className="onboarding-feature">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20 6L9 17l-5-5" />
              </svg>
              <span>Export keys anytime</span>
            </div>
            <div className="onboarding-feature">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20 6L9 17l-5-5" />
              </svg>
              <span>Powered by Hyperliquid</span>
            </div>
          </div>
        </div>
        <div className="onboarding-footer">
          <button className="onboarding-btn" onClick={onNext}>
            <span>Start Earning</span>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
