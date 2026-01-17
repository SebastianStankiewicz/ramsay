import { useState } from 'react';
import './App.css';
import Welcome from './components/Welcome';
import Fund from './components/Fund';
import Processing from './components/Processing';
import Success from './components/Success';
import Dashboard from './components/Dashboard';
import Settings from './components/Settings';

type Screen = 'welcome' | 'fund' | 'processing' | 'success' | 'dashboard' | 'settings';

function App() {
  const [screen, setScreen] = useState<Screen>('welcome');
  const [fundAmount, setFundAmount] = useState('');
  const [showDepositModal, setShowDepositModal] = useState(false);
  const [showSavingsModal, setShowSavingsModal] = useState(false);
  const [savingsAction, setSavingsAction] = useState<'deposit' | 'withdraw'>('deposit');
  const [modalAmount, setModalAmount] = useState('');
  const [balance, setBalance] = useState(0);
  const [savingsBalance, setSavingsBalance] = useState(0);
  
  // Generate or load wallet address and private key
  const [walletAddress] = useState(() => {
    const saved = localStorage.getItem('walletAddress');
    if (saved) return saved;
    // Generate a placeholder address (in production, this would be from actual wallet generation)
    const address = '0x' + Array.from({ length: 40 }, () => Math.floor(Math.random() * 16).toString(16)).join('');
    localStorage.setItem('walletAddress', address);
    return address;
  });
  
  const [privateKey] = useState(() => {
    const saved = localStorage.getItem('privateKey');
    if (saved) return saved;
    // Generate a placeholder private key (in production, this would be from actual wallet generation)
    const key = '0x' + Array.from({ length: 64 }, () => Math.floor(Math.random() * 16).toString(16)).join('');
    localStorage.setItem('privateKey', key);
    return key;
  });

  const APY = 12.5;

  const handleApplePay = () => {
    const amount = parseFloat(fundAmount) || 100;
    setScreen('processing');
    setTimeout(() => {
      setBalance(prev => prev + amount);
      setScreen('success');
      setTimeout(() => setScreen('dashboard'), 2200);
    }, 2800);
  };

  const handleAddMoney = () => {
    const amount = parseFloat(modalAmount);
    if (amount > 0) {
      setBalance(prev => prev + amount);
      setShowDepositModal(false);
      setModalAmount('');
    }
  };

  const handleSavingsAction = () => {
    const amount = parseFloat(modalAmount);
    if (amount > 0) {
      if (savingsAction === 'deposit' && amount <= balance) {
        setBalance(prev => prev - amount);
        setSavingsBalance(prev => prev + amount);
      } else if (savingsAction === 'withdraw' && amount <= savingsBalance) {
        setSavingsBalance(prev => prev - amount);
        setBalance(prev => prev + amount);
      }
      setShowSavingsModal(false);
      setModalAmount('');
    }
  };

  const openSavingsModal = (action: 'deposit' | 'withdraw') => {
    setSavingsAction(action);
    setModalAmount('');
    setShowSavingsModal(true);
  };

  switch (screen) {
    case 'welcome':
      return <Welcome onGetStarted={() => setScreen('fund')} />;

    case 'fund':
      return (
        <Fund
          fundAmount={fundAmount}
          onFundAmountChange={setFundAmount}
          onBack={() => setScreen('welcome')}
          onPay={handleApplePay}
          onSkip={() => setScreen('dashboard')}
        />
      );

    case 'processing':
      return <Processing />;

    case 'success':
      return <Success amount={parseFloat(fundAmount) || 100} />;

    case 'dashboard':
      return (
        <Dashboard
          balance={balance}
          savingsBalance={savingsBalance}
          apy={APY}
          showDepositModal={showDepositModal}
          showSavingsModal={showSavingsModal}
          savingsAction={savingsAction}
          modalAmount={modalAmount}
          onDepositModalClose={() => setShowDepositModal(false)}
          onSavingsModalClose={() => setShowSavingsModal(false)}
          onOpenSavingsModal={openSavingsModal}
          onModalAmountChange={setModalAmount}
          onAddMoney={handleAddMoney}
          onSavingsAction={handleSavingsAction}
          onOpenSettings={() => setScreen('settings')}
        />
      );

    case 'settings':
      return (
        <Settings
          walletAddress={walletAddress}
          privateKey={privateKey}
          balance={balance}
          onBack={() => setScreen('dashboard')}
          onExportPrivateKey={() => {
            // Could trigger download or additional confirmation here
            console.log('Private key exported');
          }}
        />
      );

    default:
      return <Welcome onGetStarted={() => setScreen('fund')} />;
  }
}

export default App;
