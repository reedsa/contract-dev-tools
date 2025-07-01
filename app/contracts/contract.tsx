import { Contract as ContractType } from "@/types/contracts.types";

export default function Contract({ contract }: { contract: ContractType }) {
  return (
    <div className="flex items-center gap-4 rounded-lg border p-3 bg-yellow-100/30">
      <div className="flex-1">
        <div className="flex flex-row items-center gap-2">
          <p className="text-sm font-medium">{contract.address}</p>
        </div>
        <div className="flex flex-row items-center space-x-2">
          <p className="text-sm font-medium">{contract.balance} ETH</p>
        </div>
        <p className="text-xs text-muted-foreground">
          {contract.transaction_count} transactions
        </p>
      </div>
    </div>
  );
}
