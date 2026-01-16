export interface Transaction {
  id: number;
  userId: number;
  creditCardId: number;
  amount: number;
  description: string;
  createdAt: string;
}