import { Transaction, TransactionType, WalletType } from '../types';

export const INITIAL_TRANSACTIONS: Transaction[] = [
  {
    id: 'TXN-001',
    type: TransactionType.DEPOSIT,
    amount: 15000,
    date: new Date(Date.now() - 86400000 * 2).toISOString(),
    description: 'Dépôt Agent Mixx',
    source: WalletType.MIXX,
    status: 'completed'
  },
  {
    id: 'TXN-002',
    type: TransactionType.PAYMENT,
    amount: 2500,
    date: new Date(Date.now() - 86400000).toISOString(),
    description: 'Pharmacie Centrale',
    source: WalletType.FLOOZ,
    status: 'completed'
  },
  {
    id: 'TXN-003',
    type: TransactionType.TRANSFER,
    amount: 5000,
    date: new Date(Date.now() - 3600000).toISOString(),
    description: 'Transfert vers M. Koné',
    source: WalletType.MIXX,
    recipient: '+225 07070707',
    status: 'completed'
  }
];

export const INITIAL_WALLETS = {
  [WalletType.MIXX]: { type: WalletType.MIXX, balance: 45000, currency: 'FCFA' },
  [WalletType.FLOOZ]: { type: WalletType.FLOOZ, balance: 12500, currency: 'FCFA' },
};