type Onboarding1Props = {
  onNext: () => void;
};

export default function Onboarding1({ onNext }: Onboarding1Props) {
  return (
    <div className="app">
      <div className="onboarding-screen">
        <div className="onboarding-content">
          <div className="onboarding-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 2L2 7l10 5 10-5-10-5z" />
              <path d="M2 17l10 5 10-5M2 12l10 5 10-5" />
            </svg>
          </div>
          <h1 className="onboarding-title">Welcome to Ramsay</h1>
          <p className="onboarding-description">
            Earn high yields on your savings with Hyperliquid vaults. 
            No crypto knowledge required.
          </p>
        </div>
        <div className="onboarding-footer">
          <button className="onboarding-btn" onClick={onNext}>
            <span>Get Started</span>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
