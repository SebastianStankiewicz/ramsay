from datetime import datetime
from enum import Enum

class DepositStatus(str, Enum):
    PENDING = "pending"
    PROCESSING = "processing"
    COMPLETED = "completed"
    FAILED = "failed"
    REFUNDED = "refunded"

class Deposit:
    def __init__(self):
        self.id = None  # internal UUID
        self.userId = None

        # Payment provider info
        self.provider = None  # e.g. "moonpay", "ramp", "coinbase"
        self.providerTxId = None
        self.providerStatus = None

        # Fiat info
        self.fiatAmount = None
        self.fiatCurrency = None  # "USD", "EUR"
        self.feesFiat = None

        # Crypto info
        self.amount = None
        self.token = None  # "ETH", "USDC"
        self.chain = None  # "ethereum", "arbitrum", "base"
        self.walletAddress = None

        # On-chain settlement
        self.txHash = None
        self.blockNumber = None
        self.confirmations = 0

        # Timestamps
        self.createdAt = datetime.utcnow()
        self.updatedAt = datetime.utcnow()
        self.completedAt = None

        # Status
        self.status = DepositStatus.PENDING
        self.failureReason = None

        # Compliance / logging
        self.ipAddress = None
        self.country = None
        self.userAgent = None

    def mark_processing(self):
        self.status = DepositStatus.PROCESSING
        self.updatedAt = datetime.utcnow()

    def mark_completed(self, tx_hash, block_number=None):
        self.status = DepositStatus.COMPLETED
        self.txHash = tx_hash
        self.blockNumber = block_number
        self.completedAt = datetime.utcnow()
        self.updatedAt = datetime.utcnow()

    def mark_failed(self, reason):
        self.status = DepositStatus.FAILED
        self.failureReason = reason
        self.updatedAt = datetime.utcnow()