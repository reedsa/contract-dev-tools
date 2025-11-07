export interface Function {
  type: "function";
  name: string;
  signature: string;
  inputs: Array<{ name: string; type: string }>;
  outputs: Array<{ name: string; type: string }>;
  stateMutability: "view" | "nonpayable" | "payable";
}

export interface Event {
  type: "event";
  name: string;
  signature: string;
  anonymous: boolean;
  inputs: Array<{ name: string; type: string; indexed: boolean }>;
  topic: string;
}

export interface Contract {
  name?: string;
  address: string;
  balance: number;
  tx_count: number;
  abi: Function[] | Event[];
}
