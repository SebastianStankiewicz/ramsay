type Onboarding2Props = {
  onNext: () => void;
  onBack: () => void;
};

export default function Onboarding2({ onNext, onBack }: Onboarding2Props) {
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
              <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
            </svg>
          </div>
          <h1 className="onboarding-title">How It Works</h1>
          <p className="onboarding-description">
            Deposit fiat currency. We automatically convert it and deposit into 
            Hyperliquid vaults. You earn high APY without managing crypto yourself.
          </p>
          <div className="onboarding-steps">
            <div className="onboarding-step">
              <div className="onboarding-step-number">1</div>
              <span>Deposit fiat</span>
            </div>
            <div className="onboarding-step">
              <div className="onboarding-step-number">2</div>
              <span>Auto-invested in vaults</span>
            </div>
            <div className="onboarding-step">
              <div className="onboarding-step-number">3</div>
              <span>Earn yield</span>
            </div>
          </div>
        </div>
        <div className="onboarding-footer">
          <button className="onboarding-btn" onClick={onNext}>
            <span>Continue</span>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
