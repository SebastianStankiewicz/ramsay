import requests
import urllib3
from hyperliquid.info import Info
from hyperliquid.exchange import Exchange
from hyperliquid.utils import constants
from flask import Flask, jsonify, request
import os
import argparse
import eth_account
from eth_account.signers.local import LocalAccount
from web3 import Web3
from User import *
import sqlite3
from walletDB import *


walletDB = WalletDB("testing.db")

urllib3.disable_warnings(urllib3.exceptions.InsecureRequestWarning)

old_merge_environment_settings = requests.Session.merge_environment_settings

def privileged_merge_environment_settings(self, url, proxies, stream, verify, cert):
    # Force verify to False regardless of what the SDK wants
    settings = old_merge_environment_settings(self, url, proxies, stream, verify, cert)
    settings['verify'] = False
    return settings

requests.Session.merge_environment_settings = privileged_merge_environment_settings

info = Info(constants.MAINNET_API_URL, skip_ws=True)

user_state = info.user_state("0xD5Bf397b557c03814b2eF5272CCb06114DC2eb8D")
print(user_state)


#Takes a user object - will use lifi to swap this ether on eth to hyperliquid EVM eth
#Gives the user USDC on hyperliquid
def bridgeViaLifi(user_address: str, amount_wei: str, to_address: str = None):
    """
    Get a quote from Li.Fi for bridging ETH from Ethereum to HyperLiquid.
    Based on Li.Fi API documentation: https://docs.li.fi/api-reference/get-a-quote-for-a-token-transfer
    
    Args:
        user_address: User's Ethereum address (fromAddress)
        amount_wei: Amount in wei as string (fromAmount with all decimals)
        to_address: Receiving address (optional, defaults to fromAddress)
    
    Returns:
        Quote/step object from Li.Fi API
    """
    # Li.Fi API base URL
    LIFI_API_URL = "https://li.quest/v1"
    
    # If toAddress not provided, use fromAddress
    if to_address is None:
        to_address = user_address
    
    # Query parameters according to Li.Fi API docs
    params = {
        "fromChain": "1",  # Ethereum - can be chain id or chain key
        "toChain": "999",  # HyperLiquid - chain id 999 (not 998)
        "fromToken": "0x0000000000000000000000000000000000000000",  # Native ETH - can be address or symbol
        "toToken": "0x0000000000000000000000000000000000000000",  # Native ETH - can be address or symbol
        "fromAddress": user_address,  # Required
        "toAddress": to_address,  # Optional, defaults to fromAddress if not provided
        "fromAmount": amount_wei,  # Required - amount with all decimals
        "slippage": 0.03,  # 3% slippage as decimal (0.03 = 3%)
        "integrator": "ramsay"  # Tracking information
    }
    
    try:
        response = requests.get(f"{LIFI_API_URL}/quote", params=params, timeout=10)
        response.raise_for_status()
        return response.json()
    except requests.exceptions.HTTPError as e:
        # Return more detailed error information
        error_msg = f"Li.Fi API error: {e.response.status_code}"
        if e.response.text:
            try:
                error_data = e.response.json()
                error_msg += f" - {error_data}"
            except:
                error_msg += f" - {e.response.text[:200]}"
        raise Exception(error_msg)
    except Exception as e:
        raise Exception(f"Li.Fi request failed: {str(e)}")

def bridgeViaLifiAndExecute(user_address: str, private_key: str, amount_wei: str, to_address: str = None):
    """
    Get a Li.Fi quote and execute the bridge transaction in one step.
    
    Args:
        user_address: User's Ethereum address
        private_key: User's private key (hex string)
        amount_wei: Amount in wei as string
        to_address: Receiving address (optional, defaults to fromAddress)
    
    Returns:
        Dictionary with quote info and transaction hash
    """
    # Get quote from Li.Fi
    quote = bridgeViaLifi(user_address, amount_wei, to_address)
    
    # Extract transaction request from quote
    transaction_request = quote.get("transactionRequest")
    if not transaction_request:
        raise Exception("No transactionRequest found in Li.Fi quote")
    
    # Create account from private key
    account: LocalAccount = eth_account.Account.from_key(private_key)
    
    # Connect to Ethereum RPC
    MAINNET_RPC = "https://eth.llamarpc.com"
    w3 = Web3(Web3.HTTPProvider(MAINNET_RPC))
    
    # Build transaction from transactionRequest
    tx = {
        "from": transaction_request["from"],
        "to": transaction_request["to"],
        "value": int(transaction_request["value"], 16) if transaction_request.get("value") else 0,
        "data": transaction_request["data"],
        "gas": int(transaction_request["gasLimit"], 16) if transaction_request.get("gasLimit") else 21000,
        "gasPrice": int(transaction_request["gasPrice"], 16) if transaction_request.get("gasPrice") else w3.eth.gas_price,
        "chainId": transaction_request["chainId"],
        "nonce": w3.eth.get_transaction_count(account.address)
    }
    
    # Sign transaction
    signed_txn = account.sign_transaction(tx)
    # eth_account v0.10+ uses raw_transaction (snake_case); older used rawTransaction
    raw_tx = getattr(signed_txn, "raw_transaction", None) or getattr(signed_txn, "rawTransaction")
    
    # Send transaction
    tx_hash = w3.eth.send_raw_transaction(raw_tx)
    
    return {
        "quote": quote,
        "txHash": tx_hash.hex(),
        "status": "pending",
        "message": "Bridge transaction submitted to network"
    }

#Will take the USDC and put into the spot wallet
def convertEvmToSpot(user_address: str, private_key: str, usd_amount: float):
    """
    Convert USDC from perp wallet (EVM) to spot wallet using the HyperLiquid SDK.
    
    Args:
        user_address: User's Ethereum address
        private_key: User's private key (hex string)
        usd_amount: Amount in USD to transfer
    
    Returns:
        Transfer result from the exchange
    """
    # Convert private key to LocalAccount
    account: LocalAccount = eth_account.Account.from_key(private_key)
    
    # Create Exchange instance
    exchange = Exchange(account, constants.TESTNET_API_URL, account_address=user_address)
    
    # Transfer from perp wallet to spot wallet
    # False means transfer FROM perp wallet TO spot wallet (EVM to spot)
    transfer_result = exchange.usd_class_transfer(usd_amount, False)
    
    return transfer_result

#Will return possible vaults - ideally we just want to hard code the "safest" vault adress
def getVaults():
    """
    Queries HyperLiquid API for top 3 vaults using the SDK Info class.
    Returns list of top 3 vaults sorted by TVL (or APR if TVL is 0).
    """
    known_vault_addresses = [
            "0x1e37a337ed460039d1b15bd3bc489de789768d5e"
    ]
        
    vaults = []
    for vault_address in known_vault_addresses:
        vault_details = info.post("/info", {"type": "vaultDetails", "vaultAddress": vault_address})
        
        followers_list = vault_details.get("followers", [])
        follower_count = len(followers_list)

        print(vault_details)
        vault_data = {
            "address": vault_address,
            "name": vault_details.get("name", ""),
            "leader": vault_details.get("leader", ""),
            "tvl": vault_details.get("maxDistributable", 0),
            "closed": vault_details.get("isClosed", False),
            "apr": vault_details.get("apr", 0),
            "followerCount": follower_count,
            "leaderFraction": vault_details.get("leaderFraction", 0)
        }
        vaults.append(vault_data)
    
    vaults.sort(key=lambda x: (x.get("tvl", 0), x.get("apr", 0)), reverse=True)
    return vaults[:3]

#For depositing the users perp usdc to a vault
def depositToVault(user_address: str, private_key: str, vault_address: str, usd_amount: float):
    """
    Deposit USD to a vault using the HyperLiquid SDK.
    
    Args:
        user_address: User's Ethereum address
        private_key: User's private key (hex string)
        vault_address: Vault address to deposit to
        usd_amount: Amount in USD (will be converted to micro-USDC)
    
    Returns:
        Transfer result from the exchange
    """
    # Convert private key to LocalAccount
    account: LocalAccount = eth_account.Account.from_key(private_key)
    
    # Create Exchange instance
    exchange = Exchange(account, constants.TESTNET_API_URL, account_address=user_address)
    
    # Convert USD to micro-USDC (1 USD = 1,000,000 micro-USDC)
    usd_micro = int(usd_amount * 1_000_000)
    
    # Transfer to vault (is_deposit=True means deposit, False means withdraw)
    transfer_result = exchange.vault_usd_transfer(vault_address, True, usd_micro)
    
    return transfer_result

def create_app(mock_mode=False):
    """
    Create Flask app instance.
    
    Args:
        mock_mode: If True, all deposits will default to mock mode (can be overridden per request)
    """
    app = Flask(__name__)
    app.config["DEBUG"] = os.getenv("FLASK_DEBUG", "true").lower() == "true"
    app.config["MOCK_MODE"] = mock_mode or os.getenv("MOCK_MODE", "false").lower() == "true"
    
    # Enable CORS for all routes
    @app.after_request
    def after_request(response):
        response.headers.add('Access-Control-Allow-Origin', '*')
        response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
        response.headers.add('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
        return response
    
    # Handle preflight OPTIONS requests
    @app.before_request
    def handle_preflight():
        if request.method == "OPTIONS":
            response = jsonify({})
            response.headers.add('Access-Control-Allow-Origin', '*')
            response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
            response.headers.add('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
            return response

    @app.route("/createAccount", methods=["POST"])
    def createAccount():
        #Will create a user account
        #User account will then have its wallet key pair created etc
        user = User()
        wallet = user.createKeyPair()
        walletDB.create_user(wallet['private_key'], wallet['public_key'], wallet['address'])
        return jsonify({"status": "ok", "message": "Account created", "data": user.getWalletDetails()})

    @app.route("/deposit", methods=["POST"])
    def deposit():
        """
        Full deposit flow:
        1. Record fiat deposit (MOCK - in production would integrate with MoonPay/Ramp)
        2. Bridge ETH from Ethereum wallet to HyperLiquid via Li.Fi
        3. Deposit to vault on HyperLiquid
        
        Flow: Fiat → Wallet (Ethereum) → Bridge via Li.Fi → HyperLiquid → Vault
        
        Query param or body: mock=true to simulate entire flow without real transactions
        """
        data = request.get_json()
        
        user_address = data.get("userAddress")
        private_key = data.get("privateKey")
        amount_usd = data.get("amount")  # Amount in USD
        vault_address = data.get("vaultAddress")
        # Use request mock flag, or fall back to server-wide mock mode config
        mock = data.get("mock", False) or request.args.get("mock", "false").lower() == "true" or app.config.get("MOCK_MODE", False)
        
        if not all([user_address, amount_usd, vault_address]):
            return jsonify({
                "status": "error",
                "message": "Missing required fields: userAddress, amount, vaultAddress"
            }), 400
        
        # Validate minimum deposit amount
        MIN_DEPOSIT = 100.0
        amount_usd_float = float(amount_usd)
        if amount_usd_float < MIN_DEPOSIT:
            return jsonify({
                "status": "error",
                "message": f"Minimum deposit is ${MIN_DEPOSIT} USD"
            }), 400
        
        # In mock mode, private_key is optional
        if not mock and not private_key:
            return jsonify({
                "status": "error",
                "message": "Missing required field: privateKey (not needed in mock mode)"
            }), 400
        
        try:
            # amount_usd_float already validated above
            
            # Generate mock transaction hashes if in mock mode
            import secrets
            def generate_mock_tx_hash():
                return "0x" + secrets.token_hex(32)
            
            if mock:
                # MOCK MODE: Simulate entire flow without real transactions
                mock_fiat_tx_hash = generate_mock_tx_hash()
                mock_bridge_tx_hash = generate_mock_tx_hash()
                mock_vault_tx_hash = generate_mock_tx_hash()
                
                # Step 1: Log mock fiat deposit
                try:
                    walletDB.add_transaction(
                        user_address=user_address,
                        tx_type="deposit",
                        tx_hash=mock_fiat_tx_hash,
                        status="completed",
                        amount_usd=amount_usd_float,
                        vault_address=vault_address,
                        metadata={
                            "amount": amount_usd_float,
                            "vault_address": vault_address,
                            "mock": True,
                            "step": "fiat_deposit"
                        }
                    )
                except Exception as log_error:
                    print(f"Failed to log mock deposit transaction: {log_error}")
                
                # Step 2: Convert USD to ETH (for logging purposes)
                ETH_PRICE_USD = 3000.0
                eth_amount = amount_usd_float / ETH_PRICE_USD
                amount_wei = str(int(eth_amount * 1e18))
                
                # Step 3: Log mock bridge transaction
                try:
                    walletDB.add_transaction(
                        user_address=user_address,
                        tx_type="bridge",
                        tx_hash=mock_bridge_tx_hash,
                        status="completed",
                        from_chain="1",
                        to_chain="999",
                        from_token="ETH",
                        to_token="HYPE",
                        amount_wei=amount_wei,
                        amount_usd=amount_usd_float,
                        metadata={
                            "mock": True,
                            "step": "bridge",
                            "note": "Mock bridge transaction - funds simulated on HyperLiquid"
                        }
                    )
                except Exception as log_error:
                    print(f"Failed to log mock bridge transaction: {log_error}")
                
                # Step 4: Log mock vault deposit
                try:
                    walletDB.add_transaction(
                        user_address=user_address,
                        tx_type="vault_deposit",
                        tx_hash=mock_vault_tx_hash,
                        status="completed",
                        amount_usd=amount_usd_float,
                        vault_address=vault_address,
                        metadata={
                            "mock": True,
                            "step": "vault_deposit",
                            "note": "Mock vault deposit - funds simulated in vault"
                        }
                    )
                except Exception as log_error:
                    print(f"Failed to log mock vault deposit transaction: {log_error}")
                
                # Return mock success response
                return jsonify({
                    "status": "ok",
                    "message": "Deposit flow completed (MOCK MODE)",
                    "data": {
                        "userAddress": user_address,
                        "amount": amount_usd_float,
                        "vaultAddress": vault_address,
                        "fiatDepositTxHash": mock_fiat_tx_hash,
                        "bridgeTxHash": mock_bridge_tx_hash,
                        "vaultDepositTxHash": mock_vault_tx_hash,
                        "steps": {
                            "fiat_deposit": "completed (mock)",
                            "bridge": "completed (mock)",
                            "vault_deposit": "completed (mock)"
                        },
                        "mock": True
                    }
                })
            
            # REAL MODE: Execute actual transactions
            if not private_key:
                return jsonify({
                    "status": "error",
                    "message": "privateKey required for real transactions"
                }), 400
            
            # Step 1: Log initial deposit transaction (MOCK - no actual payment processing)
            deposit_tx_id = None
            try:
                walletDB.add_transaction(
                    user_address=user_address,
                    tx_type="deposit",
                    tx_hash=None,  # Mock data - no actual transaction hash yet
                    status="pending",
                    amount_usd=amount_usd_float,
                    vault_address=vault_address,
                    metadata={
                        "amount": amount_usd_float,
                        "vault_address": vault_address,
                        "mock": True,
                        "step": "fiat_deposit"
                    }
                )
            except Exception as log_error:
                print(f"Failed to log deposit transaction: {log_error}")
            
            # Step 2: Convert USD to ETH (approximate - in production use real-time rate)
            # Rough estimate: 1 ETH ≈ $3000 USD (this should be fetched from an API in production)
            ETH_PRICE_USD = 3000.0  # TODO: Fetch from price API
            eth_amount = amount_usd_float / ETH_PRICE_USD
            amount_wei = str(int(eth_amount * 1e18))
            
            # Step 3: Bridge ETH from Ethereum to HyperLiquid via Li.Fi
            bridge_result = None
            bridge_tx_hash = None
            try:
                bridge_result = bridgeViaLifiAndExecute(
                    user_address=user_address,
                    private_key=private_key,
                    amount_wei=amount_wei
                )
                bridge_tx_hash = bridge_result.get("txHash")
                
                # Log bridge transaction
                try:
                    quote = bridge_result.get("quote", {})
                    action = quote.get("action", {})
                    walletDB.add_transaction(
                        user_address=user_address,
                        tx_type="bridge",
                        tx_hash=bridge_tx_hash,
                        status="pending",
                        from_chain=str(action.get("fromChainId", "1")),
                        to_chain=str(action.get("toChainId", "999")),
                        from_token=action.get("fromToken", {}).get("symbol", "ETH"),
                        to_token=action.get("toToken", {}).get("symbol", "HYPE"),
                        amount_wei=amount_wei,
                        amount_usd=amount_usd_float,
                        metadata={
                            "quote": quote,
                            "step": "bridge"
                        }
                    )
                except Exception as log_error:
                    print(f"Failed to log bridge transaction: {log_error}")
            except Exception as bridge_error:
                return jsonify({
                    "status": "error",
                    "message": f"Bridge failed: {str(bridge_error)}"
                }), 500
            
            # Step 4: Deposit to vault on HyperLiquid
            vault_deposit_result = None
            vault_tx_hash = None
            try:
                vault_deposit_result = depositToVault(
                    user_address=user_address,
                    private_key=private_key,
                    vault_address=vault_address,
                    usd_amount=amount_usd_float
                )
                # Handle different return types from vault_usd_transfer
                if isinstance(vault_deposit_result, dict):
                    vault_tx_hash = vault_deposit_result.get("txHash") or vault_deposit_result.get("response", {}).get("txHash")
                elif isinstance(vault_deposit_result, str):
                    # If it's a string, it might be a status message or transaction hash
                    vault_tx_hash = vault_deposit_result if vault_deposit_result.startswith("0x") else None
                else:
                    vault_tx_hash = None
                
                # Log vault deposit transaction
                try:
                    # Convert result to dict if it's a string for metadata
                    result_metadata = vault_deposit_result
                    if isinstance(vault_deposit_result, str):
                        result_metadata = {"response": vault_deposit_result}
                    elif not isinstance(vault_deposit_result, dict):
                        result_metadata = {"response": str(vault_deposit_result)}
                    
                    walletDB.add_transaction(
                        user_address=user_address,
                        tx_type="vault_deposit",
                        tx_hash=vault_tx_hash,
                        status="completed",
                        amount_usd=amount_usd_float,
                        vault_address=vault_address,
                        metadata={
                            "result": result_metadata,
                            "step": "vault_deposit"
                        }
                    )
                except Exception as log_error:
                    print(f"Failed to log vault deposit transaction: {log_error}")
            except Exception as vault_error:
                return jsonify({
                    "status": "error",
                    "message": f"Vault deposit failed: {str(vault_error)}"
                }), 500
            
            # Return success with all transaction details
            return jsonify({
                "status": "ok",
                "message": "Deposit flow completed",
                "data": {
                    "userAddress": user_address,
                    "amount": amount_usd_float,
                    "vaultAddress": vault_address,
                    "bridgeTxHash": bridge_tx_hash,
                    "vaultDepositTxHash": vault_tx_hash,
                    "steps": {
                        "fiat_deposit": "completed (mock)",
                        "bridge": "completed" if bridge_tx_hash else "pending",
                        "vault_deposit": "completed" if vault_tx_hash else "pending"
                    }
                }
            })
        except Exception as e:
            return jsonify({
                "status": "error",
                "message": str(e)
            }), 500
    
    #Return there average pnl etc
    @app.route("/getVaults", methods=["GET"])
    def getVaultsRoute():
        vaults = getVaults()
        return jsonify({"status": "ok", "message": "Vaults retrieved", "data": vaults})
    
    @app.route("/getTransactionHistory", methods=["GET"])
    def getTransactionHistoryRoute():
        """
        Get transaction history for a user.
        Query params: userAddress (required), limit (optional, default 50)
        """
        user_address = request.args.get("userAddress")
        limit = request.args.get("limit", 50, type=int)
        
        if not user_address:
            return jsonify({
                "status": "error",
                "message": "Missing required parameter: userAddress"
            }), 400
        
        try:
            transactions = walletDB.get_transaction_history(user_address, limit)
            return jsonify({
                "status": "ok",
                "message": "Transaction history retrieved",
                "data": transactions
            })
        except Exception as e:
            return jsonify({
                "status": "error",
                "message": str(e)
            }), 500
    
    @app.route("/getUserBalance", methods=["GET"])
    def getUserBalanceRoute():
        """
        Get user's total balance from completed vault deposits.
        Query params: userAddress (required)
        """
        user_address = request.args.get("userAddress")
        
        if not user_address:
            return jsonify({
                "status": "error",
                "message": "Missing required parameter: userAddress"
            }), 400
        
        try:
            balance = walletDB.get_user_balance(user_address)
            return jsonify({
                "status": "ok",
                "message": "Balance retrieved",
                "data": {
                    "balance": balance,
                    "userAddress": user_address
                }
            })
        except Exception as e:
            return jsonify({
                "status": "error",
                "message": str(e)
            }), 500

    return app

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Ramsay Flask Backend")
    parser.add_argument(
        "--mock",
        action="store_true",
        help="Run server in mock mode (all deposits will be simulated, no real transactions)"
    )
    parser.add_argument(
        "--port",
        type=int,
        default=5069,
        help="Port to run the server on (default: 5069)"
    )
    args = parser.parse_args()
    
    app = create_app(mock_mode=args.mock)
    
    if app.config.get("MOCK_MODE"):
        print("SERVER RUNNING IN MOCK MODE")

    
    app.run(host="0.0.0.0", port=args.port)
