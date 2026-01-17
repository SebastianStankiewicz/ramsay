import sqlite3
from datetime import datetime, timedelta
import uuid

class WalletDB:
    def __init__(self, db_path="testing.db"):
        self.db_path = db_path
        self.conn = sqlite3.connect(db_path, check_same_thread=False)
        self._create_tables()

    def _create_tables(self):
        c = self.conn.cursor()
        # Users table
        c.execute("""
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            private_key TEXT NOT NULL,
            public_key TEXT NOT NULL,
            address TEXT NOT NULL UNIQUE
        )
        """)
        # Deposits table
        c.execute("""
        CREATE TABLE IF NOT EXISTS deposits (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id INTEGER NOT NULL,
            coin_amount REAL NOT NULL,
            fiat_value REAL NOT NULL,
            deposit_date TEXT NOT NULL,
            withdrawable_date TEXT NOT NULL,
            tx_hash TEXT,
            FOREIGN KEY (user_id) REFERENCES users(id)
        )
        """)
        # Transactions table for transaction history
        c.execute("""
        CREATE TABLE IF NOT EXISTS transactions (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id INTEGER NOT NULL,
            tx_type TEXT NOT NULL,
            tx_hash TEXT,
            status TEXT NOT NULL,
            from_chain TEXT,
            to_chain TEXT,
            from_token TEXT,
            to_token TEXT,
            amount_wei TEXT,
            amount_usd REAL,
            vault_address TEXT,
            metadata TEXT,
            created_at TEXT NOT NULL,
            FOREIGN KEY (user_id) REFERENCES users(id)
        )
        """)
        self.conn.commit()

    def create_user(self, private_key, public_key, address):
        c = self.conn.cursor()
        c.execute("""
            INSERT INTO users (private_key, public_key, address) VALUES (?, ?, ?)
        """, (private_key, public_key, address))
        self.conn.commit()
        return {"private_key": private_key, "public_key": public_key, "address": address}

    def get_user(self, address):
        c = self.conn.cursor()
        c.execute("SELECT * FROM users WHERE address = ?", (address,))
        row = c.fetchone()
        if not row:
            return None
        return {"id": row[0], "private_key": row[1], "public_key": row[2], "address": row[3]}

    def add_deposit(self, user_address, coin_amount, fiat_value, tx_hash=None):
        user = self.get_user(user_address)
        if not user:
            raise ValueError("User not found")
        deposit_date = datetime.now()
        withdrawable_date = deposit_date + timedelta(days=4)
        c = self.conn.cursor()
        c.execute("""
            INSERT INTO deposits (user_id, coin_amount, fiat_value, deposit_date, withdrawable_date, tx_hash)
            VALUES (?, ?, ?, ?, ?, ?)
        """, (user['id'], coin_amount, fiat_value, deposit_date.isoformat(),
              withdrawable_date.isoformat(), tx_hash))
        self.conn.commit()
        return {
            "user_id": user['id'],
            "coin_amount": coin_amount,
            "fiat_value": fiat_value,
            "deposit_date": deposit_date,
            "withdrawable_date": withdrawable_date,
            "tx_hash": tx_hash
        }

    def get_withdrawable_deposits(self, user_address):
        now = datetime.now().isoformat()
        c = self.conn.cursor()
        c.execute("""
            SELECT d.id, d.coin_amount, d.fiat_value, d.deposit_date, d.withdrawable_date, d.tx_hash
            FROM deposits d
            JOIN users u ON u.id = d.user_id
            WHERE u.address = ? AND d.withdrawable_date <= ?
        """, (user_address, now))
        rows = c.fetchall()
        return [
            {
                "id": r[0],
                "coin_amount": r[1],
                "fiat_value": r[2],
                "deposit_date": r[3],
                "withdrawable_date": r[4],
                "tx_hash": r[5]
            } for r in rows
        ]
    
    def get_all_deposits(self, user_address):
        c = self.conn.cursor()
        c.execute("""
            SELECT d.id, d.coin_amount, d.fiat_value, d.deposit_date, 
                d.withdrawable_date, d.tx_hash
            FROM deposits d
            JOIN users u ON u.id = d.user_id
            WHERE u.address = ?
            ORDER BY d.deposit_date DESC
        """, (user_address,))
        rows = c.fetchall()
        return [
            {
                "id": r[0],
                "coin_amount": r[1],
                "fiat_value": r[2],
                "deposit_date": r[3],
                "withdrawable_date": r[4],
                "tx_hash": r[5]
            } for r in rows
        ]
    
    def add_transaction(self, user_address, tx_type, tx_hash, status, from_chain=None, 
                       to_chain=None, from_token=None, to_token=None, amount_wei=None, 
                       amount_usd=None, vault_address=None, metadata=None):
        """
        Add a transaction to the history.
        
        Args:
            user_address: User's wallet address
            tx_type: Type of transaction ('bridge', 'vault_deposit', 'vault_withdraw', etc.)
            tx_hash: Transaction hash
            status: Transaction status ('pending', 'completed', 'failed')
            from_chain: Source chain (e.g., '1' for Ethereum)
            to_chain: Destination chain (e.g., '999' for HyperLiquid)
            from_token: Source token symbol/address
            to_token: Destination token symbol/address
            amount_wei: Amount in wei (as string)
            amount_usd: Amount in USD (float)
            vault_address: Vault address (for vault transactions)
            metadata: Additional JSON metadata
        """
        user = self.get_user(user_address)
        if not user:
            raise ValueError("User not found")
        
        import json
        created_at = datetime.now().isoformat()
        metadata_json = json.dumps(metadata) if metadata else None
        
        c = self.conn.cursor()
        c.execute("""
            INSERT INTO transactions (user_id, tx_type, tx_hash, status, from_chain, to_chain,
                from_token, to_token, amount_wei, amount_usd, vault_address, metadata, created_at)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        """, (user['id'], tx_type, tx_hash, status, from_chain, to_chain, from_token, 
              to_token, amount_wei, amount_usd, vault_address, metadata_json, created_at))
        self.conn.commit()
        
        return {
            "user_id": user['id'],
            "tx_type": tx_type,
            "tx_hash": tx_hash,
            "status": status,
            "created_at": created_at
        }
    
    def get_transaction_history(self, user_address, limit=50):
        """
        Get transaction history for a user.
        
        Args:
            user_address: User's wallet address
            limit: Maximum number of transactions to return
        
        Returns:
            List of transaction dictionaries (empty list if user doesn't exist or has no transactions)
        """
        try:
            c = self.conn.cursor()
            c.execute("""
                SELECT t.id, t.tx_type, t.tx_hash, t.status, t.from_chain, t.to_chain,
                    t.from_token, t.to_token, t.amount_wei, t.amount_usd, t.vault_address,
                    t.metadata, t.created_at
                FROM transactions t
                JOIN users u ON u.id = t.user_id
                WHERE u.address = ?
                ORDER BY t.created_at DESC
                LIMIT ?
            """, (user_address, limit))
            rows = c.fetchall()
            
            import json
            return [
                {
                    "id": r[0],
                    "tx_type": r[1],
                    "tx_hash": r[2],
                    "status": r[3],
                    "from_chain": r[4],
                    "to_chain": r[5],
                    "from_token": r[6],
                    "to_token": r[7],
                    "amount_wei": r[8],
                    "amount_usd": r[9],
                    "vault_address": r[10],
                    "metadata": json.loads(r[11]) if r[11] else None,
                    "created_at": r[12]
                } for r in rows
            ]
        except Exception as e:
            # Return empty list on any error (user doesn't exist, no transactions, etc.)
            print(f"Error fetching transaction history: {e}")
            return []
