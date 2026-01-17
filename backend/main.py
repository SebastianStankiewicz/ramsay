import requests
import urllib3
from hyperliquid.info import Info
from hyperliquid.utils import constants
from flask import Flask, jsonify, request
import os
from User import *

urllib3.disable_warnings(urllib3.exceptions.InsecureRequestWarning)

old_merge_environment_settings = requests.Session.merge_environment_settings

def privileged_merge_environment_settings(self, url, proxies, stream, verify, cert):
    # Force verify to False regardless of what the SDK wants
    settings = old_merge_environment_settings(self, url, proxies, stream, verify, cert)
    settings['verify'] = False
    return settings

requests.Session.merge_environment_settings = privileged_merge_environment_settings

info = Info(constants.TESTNET_API_URL, skip_ws=True)

user_state = info.user_state("0xD5Bf397b557c03814b2eF5272CCb06114DC2eb8D")
print(user_state)

#Takes a user object - will use lifi to swap this ether on eth to hyperliquid EVM eth
#Gives the user USDC on hyperliquid
def bridgeViaLifi(user):
    pass

#Will take the USDC and put into the spot wallet
def convertEvmToSpot(user):
    pass

#Will return possible vaults - ideally we just want to hard code the "safest" vault adress
def getVaults():
    pass

#For depositing the users perp usdc to a vault
def depositToVault():
    pass

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
    @app.route("/processDeposit")
    def processDeposit():
        bridgeViaLifi()
        convertEvmToSpot()
        pass
    
    #Return there average pnl etc
    @app.route("/getVaults")
    def getVaults():
        pass
    
    @app.route("/depositToVault")
    def depositToVault():
        pass


    return app
if __name__ == "__main__":
    app = create_app()
    app.run(host="0.0.0.0", port=5069)