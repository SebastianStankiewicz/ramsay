import { Wallet, HDNodeWallet } from 'ethers';

const WALLET_KEY = 'encrypted_wallet';
const PUBLIC_KEY_KEY = 'publicKey';
const PRIVATE_KEY_KEY = 'privateKey';

export async function createWallet(password: string): Promise<HDNodeWallet> {
  const wallet = Wallet.createRandom();
  const encrypted = await wallet.encrypt(password);
  localStorage.setItem(WALLET_KEY, encrypted);
  localStorage.setItem(PUBLIC_KEY_KEY, wallet.address);
  localStorage.setItem(PRIVATE_KEY_KEY, wallet.privateKey);
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
  return localStorage.getItem(PUBLIC_KEY_KEY);
}

export function getPrivateKey(): string | null {
  return localStorage.getItem(PRIVATE_KEY_KEY);
}

export function clearWallet(): void {
  localStorage.removeItem(WALLET_KEY);
  localStorage.removeItem(PUBLIC_KEY_KEY);
  localStorage.removeItem(PRIVATE_KEY_KEY);
}
