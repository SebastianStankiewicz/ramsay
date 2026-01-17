import sqlite3
from datetime import datetime, timedelta
import uuid

class WalletDB:
    def __init__(self, db_path="testing.db"):
        self.conn = sqlite3.connect(db_path, check_same_thread=False)
        self.c = self.conn.cursor()
        self._create_tables()

    def _create_tables(self):
        # Users table
        self.c.execute("""
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            private_key TEXT NOT NULL,
            public_key TEXT NOT NULL,
            address TEXT NOT NULL UNIQUE
        )
        """)
        # Deposits table
        self.c.execute("""
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
        self.conn.commit()

    def create_user(self, private_key, public_key, address):
        self.c.execute("""
            INSERT INTO users (private_key, public_key, address) VALUES (?, ?, ?)
        """, (private_key, public_key, address))
        self.conn.commit()
        return {"private_key": private_key, "public_key": public_key, "address": address}

    def get_user(self, address):
        self.c.execute("SELECT * FROM users WHERE address = ?", (address,))
        row = self.c.fetchone()
        if not row:
            return None
        return {"id": row[0], "private_key": row[1], "public_key": row[2], "address": row[3]}

    def add_deposit(self, user_address, coin_amount, fiat_value, tx_hash=None):
        user = self.get_user(user_address)
        if not user:
            raise ValueError("User not found")
        deposit_date = datetime.now()
        withdrawable_date = deposit_date + timedelta(days=4)
        self.c.execute("""
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
        self.c.execute("""
            SELECT d.id, d.coin_amount, d.fiat_value, d.deposit_date, d.withdrawable_date, d.tx_hash
            FROM deposits d
            JOIN users u ON u.id = d.user_id
            WHERE u.address = ? AND d.withdrawable_date <= ?
        """, (user_address, now))
        rows = self.c.fetchall()
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
        self.c.execute("""
            SELECT d.id, d.coin_amount, d.fiat_value, d.deposit_date, 
                d.withdrawable_date, d.tx_hash
            FROM deposits d
            JOIN users u ON u.id = d.user_id
            WHERE u.address = ?
            ORDER BY d.deposit_date DESC
        """, (user_address,))
        rows = self.c.fetchall()
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
