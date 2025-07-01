"use client";

import { Transaction as TransactionType } from "@/types/transactions.types";
import Transaction from "./transaction";

export default function TransactionsList({
  transactions,
}: {
  transactions: TransactionType[];
}) {
  return (
    <div className="grid gap-4">
      <div className="flex flex-col gap-4">
        {transactions.map((transaction) => (
          <Transaction key={transaction.hash} transaction={transaction} />
        ))}
      </div>
    </div>
  );
}
