export enum TransactionType {
  TRANSFER = 'TRANSFER',
  PAYMENT = 'PAYMENT',
  DEPOSIT = 'DEPOSIT'
}

export enum WalletType {
  MIXX = 'Mixx',
  FLOOZ = 'Flooz'
}

export interface Transaction {
  id: string;
  type: TransactionType;
  amount: number;
  date: string; // ISO date
  description: string;
  source: WalletType;
  status: 'completed' | 'pending' | 'failed';
  recipient?: string;
}

export interface User {
  name: string;
  phone: string;
  kycVerified: boolean;
  pinSet: boolean;
}

export interface Wallet {
  type: WalletType;
  balance: number;
  currency: string;
}