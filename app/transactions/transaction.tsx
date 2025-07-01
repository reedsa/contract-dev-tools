import { Transaction as TransactionType } from "@/types/transactions.types";

export default function Transaction({
  transaction,
}: {
  transaction: TransactionType;
}) {
  return (
    <div className="flex items-center gap-4 rounded-lg border p-3 bg-background/30">
      <div className="flex-1">
        <div className="flex flex-row items-center gap-2">
          <p className="text-sm font-medium">{transaction.hash}</p>
        </div>
        <div className="flex flex-row items-center space-x-2">
          <p className="text-sm font-medium">{transaction.timestamp}</p>
        </div>
        <p className="text-xs text-muted-foreground">?</p>
      </div>
    </div>
  );
}
