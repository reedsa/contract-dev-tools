export interface Block {
  number: number;
  hash: string;
  timestamp: string;
  transactions: Transaction[];
  transactionsRoot: string;
  gasUsed: number;
  gasLimit: number;
  miner: string;
  parentHash: string;
}

export interface Transaction {
  hash: string;
  timestamp: string;
  sender: string;
  receiver: string;
  amount: number;
}
