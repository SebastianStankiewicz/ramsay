import { formatCurrency } from '../../utils/formatCurrency';

type SavingsModalProps = {
  isOpen: boolean;
  action: 'deposit' | 'withdraw';
  modalAmount: string;
  balance: number;
  savingsBalance: number;
  onClose: () => void;
  onAmountChange: (amount: string) => void;
  onAction: () => void;
};

export default function SavingsModal({
  isOpen,
  action,
  modalAmount,
  balance,
  savingsBalance,
  onClose,
  onAmountChange,
  onAction,
}: SavingsModalProps) {
  if (!isOpen) return null;

  const available = action === 'deposit' ? balance : savingsBalance;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-sheet" onClick={e => e.stopPropagation()}>
        <div className="modal-handle" />
        <div className="modal-header">
          <h3>{action === 'deposit' ? 'Add to Savings' : 'Withdraw'}</h3>
          <button className="modal-close" onClick={onClose}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="modal-body">
          <div className="modal-available">
            <span>Available</span>
            <span className="value">{formatCurrency(available)}</span>
          </div>

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
            <button
              className="max-btn"
              onClick={() => onAmountChange(String(available))}
            >
              MAX
            </button>
          </div>
        </div>

        <button
          className="modal-submit"
          onClick={onAction}
          disabled={
            !modalAmount ||
            parseFloat(modalAmount) <= 0 ||
            (action === 'deposit' && parseFloat(modalAmount) > balance) ||
            (action === 'withdraw' && parseFloat(modalAmount) > savingsBalance)
          }
        >
          {action === 'deposit' ? 'Add to Savings' : 'Withdraw'}
        </button>
      </div>
    </div>
  );
}
