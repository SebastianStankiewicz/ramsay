type DepositModalProps = {
  isOpen: boolean;
  modalAmount: string;
  onClose: () => void;
  onAmountChange: (amount: string) => void;
  onAddMoney: () => void;
};

export default function DepositModal({
  isOpen,
  modalAmount,
  onClose,
  onAmountChange,
  onAddMoney,
}: DepositModalProps) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-sheet" onClick={e => e.stopPropagation()}>
        <div className="modal-handle" />
        <div className="modal-header">
          <h3>Add Money</h3>
          <button className="modal-close" onClick={onClose}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="modal-body">
          <div className="modal-amount-input">
            <span className="currency">$</span>
            <input
              type="text"
              inputMode="decimal"
              placeholder="0"
              value={modalAmount}
              onChange={(e) => onAmountChange(e.target.value.replace(/[^0-9.]/g, ''))}
              autoFocus
            />
          </div>

          <div className="modal-presets">
            {['50', '100', '250', '500'].map(preset => (
              <button
                key={preset}
                className={`preset ${modalAmount === preset ? 'active' : ''}`}
                onClick={() => onAmountChange(preset)}
              >
                ${preset}
              </button>
            ))}
          </div>

          <div className="modal-features">
            <div className="feature">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
              </svg>
              <span>Instant deposits</span>
            </div>
            <div className="feature">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <path d="M8 12l2 2 4-4" />
              </svg>
              <span>No fees</span>
            </div>
          </div>
        </div>

        <button
          className="modal-submit"
          onClick={onAddMoney}
          disabled={!modalAmount || parseFloat(modalAmount) <= 0}
        >
          Continue
        </button>
      </div>
    </div>
  );
}
