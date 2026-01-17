import { useState } from 'react';
import { formatCurrency } from '../utils/formatCurrency';
import DepositModal from './modals/DepositModal';
import RamsayModal from './modals/RamsayModal';
import pigImage from '../assets/pig.png';

type DashboardProps = {
  balance: number;
  RamsayBalance: number;
  showDepositModal: boolean;
  showRamsayModal: boolean;
  RamsayAction: 'deposit' | 'withdraw';
  modalAmount: string;
  onDepositModalClose: () => void;
  onRamsayModalClose: () => void;
  onOpenRamsayModal: (action: 'deposit' | 'withdraw') => void;
  onModalAmountChange: (amount: string) => void;
  onAddMoney: () => void;
  onRamsayAction: () => void;
  onOpenSettings: () => void;
};

type Piggybank = {
  id: string;
  name: string;
  apr: number;
  balance: number;
};

export default function Dashboard({
  balance,
  RamsayBalance,
  showDepositModal,
  showRamsayModal,
  RamsayAction,
  modalAmount,
  onDepositModalClose,
  onRamsayModalClose,
  onOpenRamsayModal,
  onModalAmountChange,
  onAddMoney,
  onRamsayAction,
  onOpenSettings,
}: DashboardProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Sample piggybanks with different APRs
  const piggybanks: Piggybank[] = [
    {
      id: '1',
      name: 'Growth Piggybank',
      apr: 12.5,
      balance: RamsayBalance || 0,
    },
    {
      id: '2',
      name: 'Stable Piggybank',
      apr: 8.2,
      balance: 0,
    },
    {
      id: '3',
      name: 'Risk Piggybank',
      apr: -2.1,
      balance: 0,
    },
  ];

  const nextPiggybank = () => {
    setCurrentIndex((prev) => (prev + 1) % piggybanks.length);
  };

  const prevPiggybank = () => {
    setCurrentIndex((prev) => (prev - 1 + piggybanks.length) % piggybanks.length);
  };

  const goToPiggybank = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <div className="app">
      <div className="dashboard">
        <div className="dashboard-simple">
          <button className="settings-icon-btn" onClick={onOpenSettings}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="3" />
              <path d="M12 1v4m0 14v4M5.64 5.64l2.83 2.83m7.06 7.06l2.83 2.83M1 12h4m14 0h4M5.64 18.36l2.83-2.83m7.06-7.06l2.83-2.83" />
            </svg>
          </button>

          <div className="wallet-amount">
            <span className="wallet-label">Wallet</span>
            <h2 className="wallet-value">{formatCurrency(balance)}</h2>
          </div>

          <div className="piggybank-carousel-container">
            <div className="piggybank-carousel">
              <button className="carousel-arrow carousel-arrow-left" onClick={prevPiggybank}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M19 12H5M12 19l-7-7 7-7" />
                </svg>
              </button>

              <div className="piggybank-track">
                {piggybanks.map((piggybank, index) => (
                  <div
                    key={piggybank.id}
                    className={`piggybank-card ${index === currentIndex ? 'active' : ''}`}
                    style={{
                      transform: `translateX(calc(${index - currentIndex} * 100%))`,
                    }}
                  >
                    <div className="piggybank-header">
                      <h3 className="piggybank-name">{piggybank.name}</h3>
                      <div className={`piggybank-apr ${piggybank.apr >= 0 ? 'positive' : 'negative'}`}>
                        <span className="apr-value">{piggybank.apr >= 0 ? '+' : ''}{piggybank.apr}%</span>
                        <span className="apr-label">APR</span>
                      </div>
                    </div>

                    <div className="piggybank-visual">
                      <img src={pigImage} alt="Piggybank" className="piggybank-image" />
                      <div className="piggybank-balance">
                        <span className="balance-label">Balance</span>
                        <span className="balance-amount">{formatCurrency(piggybank.balance)}</span>
                      </div>
                    </div>

                    <button
                      className="piggybank-deposit-btn"
                      onClick={() => onOpenRamsayModal('deposit')}
                    >
                      <span>Deposit</span>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <path d="M12 5v14M5 12h14" />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>

              <button className="carousel-arrow carousel-arrow-right" onClick={nextPiggybank}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </button>
            </div>

            <div className="carousel-dots">
              {piggybanks.map((_, index) => (
                <button
                  key={index}
                  className={`carousel-dot ${index === currentIndex ? 'active' : ''}`}
                  onClick={() => goToPiggybank(index)}
                  aria-label={`Go to piggybank ${index + 1}`}
                />
              ))}
            </div>
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

      <RamsayModal
        isOpen={showRamsayModal}
        action={RamsayAction}
        modalAmount={modalAmount}
        balance={balance}
        RamsayBalance={RamsayBalance}
        onClose={onRamsayModalClose}
        onAmountChange={onModalAmountChange}
        onAction={onRamsayAction}
      />
    </div>
  );
}
