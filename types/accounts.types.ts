export interface Account {
  address: Address;
  unlocked: boolean;
  balance: number;
  balance_eth: number;
  default: boolean;
  transaction_count: number;
}

export type Address = string;
