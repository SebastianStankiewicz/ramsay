type FundProps = {
  fundAmount: string;
  onFundAmountChange: (amount: string) => void;
  onBack: () => void;
  onPay: () => void;
  onSkip: () => void;
};

export default function Fund({
  fundAmount,
  onFundAmountChange,
  onBack,
  onPay,
  onSkip,
}: FundProps) {
  return (
    <div className="app">
      <div className="fund-screen">
        <div className="fund-bg">
          <div className="gradient-orb orb-1" />
          <div className="gradient-orb orb-2" />
        </div>

        <button className="back-button" onClick={onBack}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
        </button>

        <div className="fund-content">
          <div className="fund-header">
            <h1>Add Money</h1>
            <p>Deposit fiat, earn with Hyperliquid vaults</p>
          </div>

          <div className="amount-display">
            <span className="currency-symbol">$</span>
            <input
              type="text"
              inputMode="decimal"
              placeholder="0"
              value={fundAmount}
              onChange={(e) => onFundAmountChange(e.target.value.replace(/[^0-9.]/g, ''))}
              className="amount-input"
            />
          </div>

          <div className="preset-amounts">
            {['50', '100', '250', '500'].map((amount) => (
              <button
                key={amount}
                className={`preset-btn ${fundAmount === amount ? 'active' : ''}`}
                onClick={() => onFundAmountChange(amount)}
              >
                ${amount}
              </button>
            ))}
          </div>
        </div>

        <div className="fund-footer">
          <button
            className="apple-pay-button"
            onClick={onPay}
            disabled={!fundAmount || parseFloat(fundAmount) <= 0}
          >
            <svg className="apple-logo" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
            </svg>
            <span>Pay</span>
          </button>

          <div className="alt-payment">
            <button className="link-btn">Use debit card</button>
            <span className="divider">or</span>
            <button className="link-btn">Bank transfer</button>
          </div>

          <button className="skip-btn" onClick={onSkip}>
            Skip for now
          </button>
        </div>
      </div>
    </div>
  );
}
