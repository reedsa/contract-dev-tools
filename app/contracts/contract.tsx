import { Contract as ContractType } from "@/types/contracts.types";
import { useSelectedContract } from "../context/selectedContractContext";
import { cn, shortenAddress, weiToEth } from "@/lib/utils";

export default function Contract({ contract }: { contract: ContractType }) {
  const { selectedContract, setSelectedContract } = useSelectedContract();
  return (
    <div
      className={cn(
        "flex items-center gap-4 rounded-lg p-3 cursor-pointer",
        selectedContract?.address === contract.address
          ? "bg-yellow-300/50"
          : "bg-yellow-100/30",
        "hover:bg-yellow-300/50",
        "border-yellow-200 hover:border-yellow-300",
        "hover:shadow-lg",
        "focus:outline-none focus:ring-2 focus:ring-yellow-500",
        "focus:ring-offset-2",
        "focus:ring-offset-yellow-100",
        "focus:border-yellow-300",
        "focus:shadow-lg",
        "active:bg-yellow-400/50",
        "active:shadow-none",
        "active:scale-95",
        "active:transition-transform",
        "active:duration-200",
        "active:ease-in-out"
      )}
      onClick={() => setSelectedContract(contract)}
    >
      <div className="flex-1">
        <div className="flex flex-col justify-between gap-2">
          <p className="text-sm font-bold">
            {contract.name || "Unnamed Contract"}
          </p>
          <p className="text-xs">{shortenAddress(contract.address)}</p>
        </div>
        <div className="flex flex-row items-center space-x-2">
          <p className="text-xs">{weiToEth(contract.balance)} ETH</p>
        </div>
        <p className="text-xs text-muted-foreground">
          {contract.tx_count} transactions
        </p>
      </div>
    </div>
  );
}
