import { formatCurrency } from '../utils/formatCurrency';
import DepositModal from './modals/DepositModal';
import SavingsModal from './modals/SavingsModal';

type DashboardProps = {
  balance: number;
  savingsBalance: number;
  apy: number;
  showDepositModal: boolean;
  showSavingsModal: boolean;
  savingsAction: 'deposit' | 'withdraw';
  modalAmount: string;
  onDepositModalClose: () => void;
  onSavingsModalClose: () => void;
  onOpenSavingsModal: (action: 'deposit' | 'withdraw') => void;
  onModalAmountChange: (amount: string) => void;
  onAddMoney: () => void;
  onSavingsAction: () => void;
  onOpenSettings: () => void;
};

export default function Dashboard({
  balance,
  savingsBalance,
  apy,
  showDepositModal,
  showSavingsModal,
  savingsAction,
  modalAmount,
  onDepositModalClose,
  onSavingsModalClose,
  onOpenSavingsModal,
  onModalAmountChange,
  onAddMoney,
  onSavingsAction,
  onOpenSettings,
}: DashboardProps) {
  return (
    <div className="app">
      <div className="dashboard">
        <div className="dashboard-simple">
          <button className="settings-icon-btn" onClick={onOpenSettings}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="3" />
              <path d="M12 1v6m0 6v6M5.64 5.64l4.24 4.24m4.24 4.24l4.24 4.24M1 12h6m6 0h6M5.64 18.36l4.24-4.24m4.24-4.24l4.24-4.24" />
            </svg>
          </button>
          <div className="wallet-amount">
            <span className="wallet-label">Wallet</span>
            <h2 className="wallet-value">{formatCurrency(balance)}</h2>
          </div>

          <div className="vault-amount">
            <span className="vault-label">Vault Value</span>
            <h2 className="vault-value">{formatCurrency(savingsBalance)}</h2>
          </div>

          <div className="stake-info">
            <div className="stake-row">
              <span className="stake-label">APR on Stake</span>
              <span className="stake-value">{apy}%</span>
            </div>
            <div className="stake-row">
              <span className="stake-label">Current APR</span>
              <span className="stake-value">{apy}%</span>
            </div>
          </div>

          <div className="vault-actions">
            <button className="deposit-vault-btn" onClick={() => onOpenSavingsModal('deposit')}>
              <span>Deposit to Vault</span>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M12 5v14M5 12h14" />
              </svg>
            </button>
            <button className="withdraw-vault-btn" onClick={() => onOpenSavingsModal('withdraw')}>
              <span>Withdraw from Vault</span>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M5 12h14" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <DepositModal
        isOpen={showDepositModal}
        modalAmount={modalAmount}
        onClose={onDepositModalClose}
        onAmountChange={onModalAmountChange}
        onAddMoney={onAddMoney}
      />

      <SavingsModal
        isOpen={showSavingsModal}
        action={savingsAction}
        modalAmount={modalAmount}
        balance={balance}
        savingsBalance={savingsBalance}
        onClose={onSavingsModalClose}
        onAmountChange={onModalAmountChange}
        onAction={onSavingsAction}
      />
    </div>
  );
}
