# Ramsay

Ramsay is the intuative and easy to use saving app built ontop of the hyperliquid ecosystem. Abstracting away from the complexity of crypto, a user can still take advantage of the high yield saving protocols found on hyperliquid without the complexities that usually come with this. 

TLDR Allows a crypto curious user to earn yeild via hyperliquid vaults without touching any crypto!


## Setup

### Backend

```bash
cd backend
pip install -r requirements.txt
python main.py
```

Backend runs on `http://localhost:5069`

### Frontend

```bash
cd frontend-rewrite/my-app
npm install
npm run dev
```

Frontend runs on `http://localhost:3000`

## Features

- Create user accounts with Ethereum key pairs
- Deposit fiat currency (minimum $100) - no crypto knowledge required
- Automatic bridging from Ethereum to HyperLiquid via Li.Fi
- Automatic deposit to HyperLiquid vaults to earn APR
- View transaction history and balance
- Mock mode for testing

## Purpose

Ramsay simplifies access to HyperLiquid vault yields for traditional finance users. The platform handles all crypto complexity:
- Fiat deposits are converted to crypto automatically
- Funds are bridged across chains automatically
- Deposits are placed in vaults automatically
- Users only need to deposit fiat and earn APR

## API Endpoints

- `POST /createAccount` - Create new user account
- `POST /deposit` - Full deposit flow (fiat -> bridge -> vault)
- `GET /getVaults` - Get available vaults
- `GET /getUserBalance` - Get user's total balance
- `GET /getTransactionHistory` - Get user's transaction history

## Mock Mode

Start backend with `--mock` flag to simulate all transactions without executing real blockchain operations. All deposits will be logged but no actual funds will be moved.

## Database

SQLite database (`testing.db`) stores:
- User accounts
- Transaction history
- Deposit records

## Dependencies

Backend: Flask, HyperLiquid SDK, Web3.py, eth-account
Frontend: Next.js, React, TypeScript
