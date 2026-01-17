import pigImage from '../assets/pig.png';

type Onboarding1Props = {
  onNext: () => void;
};

export default function Onboarding1({ onNext }: Onboarding1Props) {
  return (
    <div className="app">
      <div className="onboarding-screen">
        <div className="onboarding-visual-container">
          <div className="onboarding-pig-container">
            <img src={pigImage} alt="Money pig" className="onboarding-pig" />
          </div>
          <p className="onboarding-description">
            Earn high yields on your savings with Hyperliquid vaults, no crypto knowledge required.
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
