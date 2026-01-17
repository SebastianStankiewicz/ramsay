import requests
import urllib3
from hyperliquid.info import Info
from hyperliquid.exchange import Exchange
from hyperliquid.utils import constants
from flask import Flask, jsonify, request
import os
import eth_account
from eth_account.signers.local import LocalAccount
from web3 import Web3
from User import *

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
    
    # Send transaction
    tx_hash = w3.eth.send_raw_transaction(signed_txn.rawTransaction)
    
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

def create_app():
    app = Flask(__name__)
    app.config["DEBUG"] = os.getenv("FLASK_DEBUG", "true").lower() == "true"

    @app.route("/createAccount", methods=["POST"])
    def createAccount():
        #Will create a user account
        #User account will then have its wallet key pair created etc
        user = User()
        user.createKeyPair()
        
        return jsonify({"status": "ok", "message": "Account created", "data": user.getWalletDetails()})

    @app.route("/deposit")
    def deposit():
        #Deposit via moonpay or similar as eth on the eth chain 
        #Mark as validated or idk a transaction queue that will wait for this to validate OR offload this to the fron end aand only except complete TX???
        #FOR NOW THIS WILL CALL A TEST NET FAUCET
        return jsonify({"status": "ok", "message": "Flask API running"})
    
    #This can be called via like after a TX been made 
    @app.route("/processDeposit", methods=["POST"])
    def processDeposit():
        """
        Process deposit by bridging ETH from Ethereum to HyperLiquid via Li.Fi.
        Gets quote and executes the bridge transaction in one step.
        """
        data = request.get_json()
        
        user_address = data.get("userAddress")
        private_key = data.get("privateKey")
        amount_wei = data.get("amountWei")
        to_address = data.get("toAddress")  # Optional
        
        if not user_address or not private_key or not amount_wei:
            return jsonify({
                "status": "error",
                "message": "Missing required fields: userAddress, privateKey, amountWei"
            }), 400
        
        try:
            # Get quote and execute bridge in one step
            result = bridgeViaLifiAndExecute(user_address, private_key, amount_wei, to_address)
            return jsonify({
                "status": "ok",
                "message": result["message"],
                "data": result
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
    
    @app.route("/depositToVault", methods=["POST"])
    def depositToVaultRoute():
        data = request.get_json()
        print(data)
        
        user_address = data.get("userAddress")
        private_key = data.get("privateKey")
        vault_address = data.get("vaultAddress")
        usd_amount = data.get("amount")
        
        if not all([user_address, private_key, vault_address, usd_amount]):
            return jsonify({
                "status": "error",
                "message": "Missing required fields: userAddress, privateKey, vaultAddress, amount"
            }), 400
        
        try:
            result = depositToVault(user_address, private_key, vault_address, float(usd_amount))
            return jsonify({"status": "ok", "message": "Deposit successful", "data": result})
        except Exception as e:
            return jsonify({
                "status": "error",
                "message": str(e)
            }), 500


    return app
if __name__ == "__main__":
    app = create_app()
    app.run(host="0.0.0.0", port=5069)
