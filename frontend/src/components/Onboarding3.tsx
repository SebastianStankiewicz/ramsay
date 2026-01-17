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
        <div className="onboarding-visual-container">
          <div className="onboarding-wallet-visual">
            <div className="wallet-card">
              <div className="wallet-card-glow" />
              <div className="wallet-chip" />
              <div className="wallet-lines">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="wallet-line" style={{
                    '--delay': `${i * 0.1}s`,
                  } as React.CSSProperties} />
                ))}
              </div>
            </div>
            <div className="key-visual">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4" />
              </svg>
            </div>
          </div>
          <h1 className="onboarding-title">Your Keys</h1>
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
