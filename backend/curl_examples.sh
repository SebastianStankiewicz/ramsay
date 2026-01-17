#!/bin/bash

# Base URL - adjust port if needed
BASE_URL="http://localhost:5069"

echo "=========================================="
echo "Ramsay Backend API Examples"
echo "=========================================="
echo ""
echo "To run server in MOCK MODE:"
echo "  python main.py --mock"
echo ""
echo "To run server in REAL MODE:"
echo "  python main.py"
echo ""
echo "=========================================="
echo ""

echo "=== 1. Create Account ==="
curl -X POST "http://localhost:5069/createAccount" \
  -H "Content-Type: application/json" \
  -w "\n\n"

echo "=== 2. Get Vaults ==="
curl -X GET "http://localhost:5069/getVaults" \
  -H "Content-Type: application/json" \
  -w "\n\n"

# Test values - REPLACE WITH YOUR ACTUAL VALUES
TEST_USER_ADDRESS="0xD5Bf397b557c03814b2eF5272CCb06114DC2eb8D"
TEST_PRIVATE_KEY="0xYourPrivateKeyHere"  # Replace with actual private key
TEST_VAULT_ADDRESS="0xa15099a30bbf2e68942d6f4c43d70d04faeab0a0"

echo "=== 3. Test Li.Fi API Directly (No API key needed) ==="
echo "# Test Li.Fi quote endpoint directly - Bridge 0.1 ETH from Ethereum to HyperLiquid (chain 999)"
curl -X GET "https://li.quest/v1/quote?fromChain=1&toChain=999&fromToken=0x0000000000000000000000000000000000000000&toToken=0x0000000000000000000000000000000000000000&fromAmount=100000000000000000&fromAddress=$TEST_USER_ADDRESS&toAddress=$TEST_USER_ADDRESS&slippage=0.03&integrator=ramsay" \
  -H "Content-Type: application/json" \
  -w "\n\n"

echo "=== 3b. Process Deposit (Bridge ETH to HyperLiquid via Li.Fi) ==="
echo "# Bridge 0.1 ETH from Ethereum to HyperLiquid - Gets quote and executes in one step"
curl -X POST "http://localhost:5069/processDeposit" \
  -H "Content-Type: application/json" \
  -d "{
    \"userAddress\": \"$TEST_USER_ADDRESS\",
    \"privateKey\": \"$TEST_PRIVATE_KEY\",
    \"amountWei\": \"100000000000000000\"
  }" \
  -w "\n\n"

echo "=== 5. Deposit to Vault ==="
echo "# Deposit 10 USD to vault (requires private key)"
curl -X POST "http://localhost:5069/depositToVault" \
  -H "Content-Type: application/json" \
  -d "{
    \"userAddress\": \"$TEST_USER_ADDRESS\",
    \"privateKey\": \"$TEST_PRIVATE_KEY\",
    \"vaultAddress\": \"$TEST_VAULT_ADDRESS\",
    \"amount\": 10.0
  }" \
  -w "\n\n"

echo "=== 4b. Deposit to Vault (Small Amount) ==="
echo "# Deposit 1 USD to vault (requires private key)"
curl -X POST "http://localhost:5069/depositToVault" \
  -H "Content-Type: application/json" \
  -d "{
    \"userAddress\": \"$TEST_USER_ADDRESS\",
    \"privateKey\": \"$TEST_PRIVATE_KEY\",
    \"vaultAddress\": \"$TEST_VAULT_ADDRESS\",
    \"amount\": 1.0
  }" \
  -w "\n\n"

echo "=== 6. Deposit (Test Endpoint) ==="
curl -X GET "http://localhost:5069/deposit" \
  -H "Content-Type: application/json" \
  -w "\n\n"
