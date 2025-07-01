import { CardDescription, CardTitle } from "@/components/ui/card";
import TransactionsList from "./transactionsList";
import { Transaction } from "@/types/transactions.types";

export default async function TransactionsPage() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/transactions/`
  );
  const transactions: Transaction[] = await res.json();

  return (
    <>
      <div className="flex flex-col pt-6 pb-6 space-y-3">
        <div className="flex flex-row items-center justify-between">
          <div className="flex flex-col">
            <CardTitle>Transactions</CardTitle>
            <CardDescription>Latest transactions.</CardDescription>
          </div>
        </div>
      </div>
      <TransactionsList transactions={transactions} />
    </>
  );
}
