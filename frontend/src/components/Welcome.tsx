type WelcomeProps = {
  onGetStarted: () => void;
};

export default function Welcome({ onGetStarted }: WelcomeProps) {
  return (
    <div className="app">
      <div className="welcome">
        <div className="welcome-bg">
          <div className="blob blob-1" />
          <div className="blob blob-2" />
          <div className="blob blob-3" />
          <div className="noise-overlay" />
        </div>

        <div className="welcome-content">
          <div className="logo-container">
            <div className="logo">
              <span>R</span>
            </div>
            <div className="logo-glow" />
          </div>

          <h1 className="welcome-title">Ramsay</h1>
          <p className="welcome-tagline">Money that works harder</p>

          <div className="welcome-features">
            <div className="feature-pill">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
              </svg>
              <span>Instant transfers</span>
            </div>
            <div className="feature-pill">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 2L2 7l10 5 10-5-10-5z" />
                <path d="M2 17l10 5 10-5M2 12l10 5 10-5" />
              </svg>
              <span>Powered by Hyperliquid</span>
            </div>
          </div>
        </div>

        <div className="welcome-footer">
          <button className="btn-get-started" onClick={onGetStarted}>
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
