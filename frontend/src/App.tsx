import { useState } from 'react';
import './App.css';
import Onboarding1 from './components/Onboarding1';
import Onboarding2 from './components/Onboarding2';
import Onboarding3 from './components/Onboarding3';
import Welcome from './components/Welcome';
import Fund from './components/Fund';
import Processing from './components/Processing';
import Success from './components/Success';
import Dashboard from './components/Dashboard';
import Settings from './components/Settings';

type Screen = 'onboarding1' | 'onboarding2' | 'onboarding3' | 'welcome' | 'fund' | 'processing' | 'success' | 'dashboard' | 'settings';

function App() {
  const [screen, setScreen] = useState<Screen>('onboarding1');
  const [fundAmount, setFundAmount] = useState('');
  const [showDepositModal, setShowDepositModal] = useState(false);
  const [showRamsayModal, setShowRamsayModal] = useState(false);
  const [RamsayAction, setRamsayAction] = useState<'deposit' | 'withdraw'>('deposit');
  const [modalAmount, setModalAmount] = useState('');
  const [balance, setBalance] = useState(0);
  const [RamsayBalance, setRamsayBalance] = useState(0);
  
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

  const handleRamsayAction = () => {
    const amount = parseFloat(modalAmount);
    if (amount > 0) {
      if (RamsayAction === 'deposit' && amount <= balance) {
        setBalance(prev => prev - amount);
        setRamsayBalance(prev => prev + amount);
      } else if (RamsayAction === 'withdraw' && amount <= RamsayBalance) {
        setRamsayBalance(prev => prev - amount);
        setBalance(prev => prev + amount);
      }
      setShowRamsayModal(false);
      setModalAmount('');
    }
  };

  const openRamsayModal = (action: 'deposit' | 'withdraw') => {
    setRamsayAction(action);
    setModalAmount('');
    setShowRamsayModal(true);
  };

  const handleOnboardingComplete = () => {
    localStorage.setItem('hasCompletedOnboarding', 'true');
    setScreen('welcome');
  };

  switch (screen) {
    case 'onboarding1':
      return <Onboarding1 onNext={() => setScreen('onboarding2')} />;

    case 'onboarding2':
    return (
        <Onboarding2
          onNext={() => setScreen('onboarding3')}
          onBack={() => setScreen('onboarding1')}
        />
      );

    case 'onboarding3':
    return (
        <Onboarding3
          onNext={handleOnboardingComplete}
          onBack={() => setScreen('onboarding2')}
        />
      );

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
          RamsayBalance={RamsayBalance}
          showDepositModal={showDepositModal}
          showRamsayModal={showRamsayModal}
          RamsayAction={RamsayAction}
          modalAmount={modalAmount}
          onDepositModalClose={() => setShowDepositModal(false)}
          onRamsayModalClose={() => setShowRamsayModal(false)}
          onOpenRamsayModal={openRamsayModal}
          onModalAmountChange={setModalAmount}
          onAddMoney={handleAddMoney}
          onRamsayAction={handleRamsayAction}
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
