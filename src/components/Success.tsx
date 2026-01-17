import { formatCurrency } from '../utils/formatCurrency';

type SuccessProps = {
  amount: number;
};

export default function Success({ amount }: SuccessProps) {
  return (
    <div className="app">
      <div className="success-screen">
        <div className="success-confetti">
          {[...Array(50)].map((_, i) => (
            <div key={i} className="confetti-piece" style={{
              '--delay': `${Math.random() * 0.5}s`,
              '--x': `${Math.random() * 100}%`,
              '--rotation': `${Math.random() * 360}deg`,
            } as React.CSSProperties} />
          ))}
        </div>

        <div className="success-content">
          <div className="success-check">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
              <path d="M20 6L9 17l-5-5" />
            </svg>
          </div>
          <h2>You're all set!</h2>
          <p className="success-amount">{formatCurrency(amount)} added</p>
        </div>
      </div>
    </div>
  );
}
