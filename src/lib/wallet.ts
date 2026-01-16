import { Wallet, HDNodeWallet } from 'ethers';

const WALLET_KEY = 'encrypted_wallet';

export async function createWallet(password: string): Promise<HDNodeWallet> {
  const wallet = Wallet.createRandom();
  const encrypted = await wallet.encrypt(password);
  localStorage.setItem(WALLET_KEY, encrypted);
  return wallet;
}

export async function loadWallet(password: string): Promise<HDNodeWallet | Wallet | null> {
  const encrypted = localStorage.getItem(WALLET_KEY);
  if (!encrypted) return null;
  return Wallet.fromEncryptedJson(encrypted, password);
}

export function hasWallet(): boolean {
  return !!localStorage.getItem(WALLET_KEY);
}

export function getWalletAddress(): string | null {
  const encrypted = localStorage.getItem(WALLET_KEY);
  if (!encrypted) return null;
  try {
    const parsed = JSON.parse(encrypted);
    return parsed.address ? `0x${parsed.address}` : null;
  } catch {
    return null;
  }
}

export function clearWallet(): void {
  localStorage.removeItem(WALLET_KEY);
}
