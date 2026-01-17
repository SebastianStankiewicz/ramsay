from eth_keys import keys
from eth_utils import decode_hex
import os

class User:
    def __init__(self):
        self.ethPublicKey = None
        self.ethPrivateKey = None
        self.ethAddress = None
        self.transacitons = None

    def createKeyPair(self):
        # Generate 32 random bytes
        private_key_bytes = os.urandom(32)
        
        # Create private key object
        private_key = keys.PrivateKey(private_key_bytes)
        public_key = private_key.public_key
        
        self.ethPrivateKey = private_key.to_hex()
        self.ethPublicKey = public_key.to_hex()
        self.ethAddress = public_key.to_checksum_address()

        return {
            "private_key": self.ethPrivateKey,
            "public_key": self.ethPublicKey,
            "address": self.ethAddress,
        }
    
    def createDepositTransaction(self):
        pass

    def getWalletDetails(self):
        return {
            "private_key": self.ethPrivateKey,
            "public_key": self.ethPublicKey,
            "address": self.ethAddress,
        }
        
